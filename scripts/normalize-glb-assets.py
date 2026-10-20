#!/usr/bin/env python3
"""
Deterministic GLB Asset Normalization & Material Harmonization Pipeline
for "The AI Engineer's Atelier" (Interactive 3D Isometric Portfolio).

Performs:
1. Binary glTF 2.0 inspection (header, JSON chunk, BIN chunk, accessors, primitives).
2. World-space bounding box calculation across all node transforms.
3. Canonical unit scale, Y-rotation alignment, X/Z centering, and floor/desk grounding (minY = 0)
   via a clean root wrapper node (`__AtelierNormalizedRoot`), preserving all child nodes
   and animation targets (such as `Fan_1`, `Fan_2`, and `RobotArmature`).
4. Cohesive PBR material harmonization to the shared Atelier palette:
   - Wood: Warm medium-brown walnut/oak, soft roughness (0.38–0.44)
   - Metal: Dark graphite & brushed slate, moderate roughness (0.28–0.36), metallic (0.62–0.78)
   - Plastic: Muted navy, cream, and light gray, roughness (0.35–0.55)
   - Technology: Controlled cyan (#7DDCF7) and lavender (#AC98FF) accents
   - Decor: Warm amber (#FFC992) and botanical emerald (#10B981) accents
5. Exports optimized 4-byte-aligned GLB files to `public/assets/3d/...` and generates
   `docs/3d-asset-manifest.json` + `docs/3d-asset-credits.md`.
"""

import json
import math
import os
import struct
from typing import Any, Dict, List, Tuple

RAW_DIR = "/home/datnt/.gemini/antigravity-cli/brain/4670b177-1467-4cea-a0a4-1d4465a9c450/scratch/raw_glbs"
REPO_ROOT = "/home/datnt/thanhdatnguyentk"
PUBLIC_3D_DIR = os.path.join(REPO_ROOT, "public", "assets", "3d")
DOCS_DIR = os.path.join(REPO_ROOT, "docs")


def hex_to_rgba(hex_str: str, alpha: float = 1.0) -> List[float]:
    h = hex_str.lstrip("#")
    # Convert sRGB hex to linear RGB for glTF 2.0 pbrMetallicRoughness.baseColorFactor
    sr = int(h[0:2], 16) / 255.0
    sg = int(h[2:4], 16) / 255.0
    sb = int(h[4:6], 16) / 255.0
    lin = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return [round(lin(sr), 5), round(lin(sg), 5), round(lin(sb), 5), round(alpha, 4)]


# Shared Atelier Material Palette (Linear RGB for glTF 2.0 baseColorFactor)
PALETTE = {
    "wood_warm": (hex_to_rgba("#8b4e24"), 0.08, 0.40),
    "wood_trim": (hex_to_rgba("#6c3a18"), 0.08, 0.44),
    "wood_oak": (hex_to_rgba("#a1622f"), 0.06, 0.42),
    "metal_dark": (hex_to_rgba("#1e293b"), 0.72, 0.32),
    "metal_graphite": (hex_to_rgba("#32425e"), 0.68, 0.30),
    "metal_silver": (hex_to_rgba("#94a3b8"), 0.78, 0.24),
    "plastic_navy": (hex_to_rgba("#2e3f5c"), 0.14, 0.48),
    "plastic_slate": (hex_to_rgba("#475569"), 0.15, 0.45),
    "plastic_cream": (hex_to_rgba("#e2e8f0"), 0.10, 0.36),
    "ceramic_white": (hex_to_rgba("#f1f5f9"), 0.08, 0.26),
    "tech_cyan": (hex_to_rgba("#7ddcf7"), 0.35, 0.22),
    "tech_lavender": (hex_to_rgba("#ac98ff"), 0.35, 0.22),
    "decor_amber": (hex_to_rgba("#ffc992"), 0.25, 0.28),
    "decor_emerald": (hex_to_rgba("#10b981"), 0.06, 0.50),
    "soil_brown": (hex_to_rgba("#452715"), 0.04, 0.82),
    "espresso_dark": (hex_to_rgba("#291306"), 0.10, 0.18),
    "glass_tinted": (hex_to_rgba("#ac98ff", 0.26), 0.18, 0.10),
}


def mat_mul(A: List[float], B: List[float]) -> List[float]:
    return [
        sum(A[row + k * 4] * B[k + col * 4] for k in range(4))
        for col in range(4)
        for row in range(4)
    ]


def trs_to_mat(t: List[float], r: List[float], s: List[float]) -> List[float]:
    x, y, z, w = r
    xx, yy, zz = x * x, y * y, z * z
    xy, xz, yz = x * y, x * z, y * z
    wx, wy, wz = w * x, w * y, w * z
    sx, sy, sz = s
    return [
        (1 - 2 * (yy + zz)) * sx, 2 * (xy + wz) * sx,       2 * (xz - wy) * sx,       0.0,
        2 * (xy - wz) * sy,       (1 - 2 * (xx + zz)) * sy, 2 * (yz + wx) * sy,       0.0,
        2 * (xz + wy) * sz,       2 * (yz - wx) * sz,       (1 - 2 * (xx + yy)) * sz, 0.0,
        t[0],                     t[1],                     t[2],                     1.0,
    ]


def transform_pt(M: List[float], p: List[float]) -> List[float]:
    x, y, z = p
    return [
        M[0] * x + M[4] * y + M[8] * z + M[12],
        M[1] * x + M[5] * y + M[9] * z + M[13],
        M[2] * x + M[6] * y + M[10] * z + M[14],
    ]


def compute_bounds(jdata: Dict[str, Any], root_indices: List[int]) -> Tuple[List[float], List[float], int]:
    nodes = jdata.get("nodes", [])
    meshes = jdata.get("meshes", [])
    accessors = jdata.get("accessors", [])
    mins = [1e9, 1e9, 1e9]
    maxs = [-1e9, -1e9, -1e9]
    total_tris = 0

    def visit(n_idx: int, parent_mat: List[float]) -> None:
        nonlocal total_tris
        n = nodes[n_idx]
        if "matrix" in n:
            local_mat = n["matrix"]
        else:
            t = n.get("translation", [0.0, 0.0, 0.0])
            r = n.get("rotation", [0.0, 0.0, 0.0, 1.0])
            s = n.get("scale", [1.0, 1.0, 1.0])
            local_mat = trs_to_mat(t, r, s)
        world_mat = mat_mul(parent_mat, local_mat)
        if "mesh" in n:
            m = meshes[n["mesh"]]
            for p in m.get("primitives", []):
                if "indices" in p:
                    total_tris += accessors[p["indices"]].get("count", 0) // 3
                elif "POSITION" in p.get("attributes", {}):
                    total_tris += accessors[p["attributes"]["POSITION"]].get("count", 0) // 3
                pos_idx = p.get("attributes", {}).get("POSITION")
                if pos_idx is not None:
                    acc = accessors[pos_idx]
                    amin, amax = acc.get("min"), acc.get("max")
                    if amin and amax:
                        for cx in (amin[0], amax[0]):
                            for cy in (amin[1], amax[1]):
                                for cz in (amin[2], amax[2]):
                                    wp = transform_pt(world_mat, [cx, cy, cz])
                                    for i in range(3):
                                        mins[i] = min(mins[i], wp[i])
                                        maxs[i] = max(maxs[i], wp[i])
        for c in n.get("children", []):
            visit(c, world_mat)

    ident = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]
    for rn in root_indices:
        visit(rn, ident)
    return mins, maxs, total_tris


def y_rot_quat(deg: float) -> List[float]:
    rad = math.radians(deg)
    return [0.0, round(math.sin(rad / 2.0), 6), 0.0, round(math.cos(rad / 2.0), 6)]


def apply_material_mapping(jdata: Dict[str, Any], mat_map: Dict[str, str]) -> None:
    for m in jdata.get("materials", []):
        name = m.get("name", "")
        key = mat_map.get(name, mat_map.get("*", ""))
        if not key or key not in PALETTE:
            continue
        rgba, metal, rough = PALETTE[key]
        if "pbrMetallicRoughness" not in m:
            m["pbrMetallicRoughness"] = {}
        m["pbrMetallicRoughness"]["baseColorFactor"] = list(rgba)
        m["pbrMetallicRoughness"]["metallicFactor"] = metal
        m["pbrMetallicRoughness"]["roughnessFactor"] = rough
        if rgba[3] < 1.0:
            m["alphaMode"] = "BLEND"
            m["doubleSided"] = True


# Asset Catalog & Normalization Specifications
ASSET_SPECS = [
    {
        "id": "desk",
        "raw_file": "desk_jeff.glb",
        "target_rel_path": "workstation/desk.glb",
        "name": "Adjustable Standing Desk",
        "creator": "jeff cobesign",
        "source_url": "https://poly.pizza/m/7Z0bva7ec1s",
        "direct_download_url": "https://static.poly.pizza/be656f2b-22ce-4c84-af9b-5f0356a62b1f.glb",
        "license": "CC-BY 3.0",
        "attribution": "Adjustable Desk by jeff cobesign [CC-BY 3.0] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/7Z0bva7ec1s)",
        "target_height": 0.94,
        "rot_y_deg": -90.0,
        "mat_map": {
            "BlackWood": "wood_warm",
            "BlackCoatSteel": "metal_graphite",
            "GrayPlastic": "metal_dark",
            "WhiteSteelScrew": "metal_silver",
            "BlackPlastic": "plastic_navy",
        },
        "modifications": "Rotated -90° Y so front edge and height controller face +Z; normalized height to 0.94m with grounded base (minY=0); remapped tabletop to warm walnut (#8B4E24) and legs to brushed graphite (#32425E).",
    },
    {
        "id": "desk_drawer",
        "raw_file": "desk_quaternius.glb",
        "target_rel_path": "workstation/desk_drawer.glb",
        "name": "Craftsman Wood Desk & Drawers",
        "creator": "Quaternius (Tomás Laulhé)",
        "source_url": "https://poly.pizza/m/V86Go2rlnq",
        "direct_download_url": "https://static.poly.pizza/91c2bf8d-0876-4801-abd3-8dd5d017ecbd.glb",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Computer Desk by Quaternius [CC0 1.0] via Poly Pizza / quaternius.com",
        "target_height": 0.90,
        "rot_y_deg": 0.0,
        "mat_map": {
            "Wood": "wood_warm",
            "DarkWood": "wood_trim",
        },
        "modifications": "Normalized height to 0.90m, centered X/Z, grounded minY=0, harmonized wood grain tones to Atelier warm walnut palette.",
    },
    {
        "id": "monitor",
        "raw_file": "monitor_zsky.glb",
        "target_rel_path": "workstation/monitor.glb",
        "name": "Beveled Studio Monitor",
        "creator": "Zsky",
        "source_url": "https://poly.pizza/m/Qyw8JFtZF0",
        "direct_download_url": "https://static.poly.pizza/6c463197-7b41-4adc-ba6a-158ddca043be.glb",
        "license": "CC-BY 3.0",
        "attribution": "Monitor by Zsky [CC-BY 3.0] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/Qyw8JFtZF0)",
        "target_height": 0.56,
        "rot_y_deg": 0.0,
        "mat_map": {
            "Plastic1Monitor1": "metal_graphite",
            "Screen1Monitor1": "metal_dark",
        },
        "modifications": "Normalized height to 0.56m, grounded base at minY=0, remapped bezel/stand to brushed graphite metal so custom CanvasTexture screen overlays cleanly.",
    },
    {
        "id": "monitor_ultrawide",
        "raw_file": "monitor_google.glb",
        "target_rel_path": "workstation/monitor_ultrawide.glb",
        "name": "Curved-Stand Ultrawide Display Chassis",
        "creator": "Poly by Google",
        "source_url": "https://poly.pizza/m/5qZ5IaClHHw",
        "direct_download_url": "https://static.poly.pizza/167a91d0-f44e-446e-8600-ff85d2e12c6e.glb",
        "license": "CC-BY 3.0",
        "attribution": "Monitor by Poly by Google [CC-BY 3.0] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/5qZ5IaClHHw)",
        "target_height": 0.62,
        "rot_y_deg": -90.0,
        "mat_map": {
            "Mat": "metal_graphite",
        },
        "modifications": "Converted from centimeter units (55.27) to meters (0.62m), rotated -90° Y so screen faces +Z, grounded stand base at minY=0, applied brushed aluminum PBR finish.",
    },
    {
        "id": "keyboard",
        "raw_file": "keyboard_safayan.glb",
        "target_rel_path": "workstation/keyboard.glb",
        "name": "Sculpted Mechanical Keyboard",
        "creator": "Alex Safayan",
        "source_url": "https://poly.pizza/m/fOy2zvPJAj-",
        "direct_download_url": "https://static.poly.pizza/1f6cf483-4859-4fda-a706-5bbeb005dd45.glb",
        "license": "CC-BY 3.0",
        "attribution": "Keyboard by Alex Safayan [CC-BY 3.0] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/fOy2zvPJAj-)",
        "target_width": 0.48,
        "rot_y_deg": 0.0,
        "mat_map": {
            "mat21": "plastic_cream",
            "mat22": "plastic_slate",
            "mat16": "metal_graphite",
            "mat9": "tech_cyan",
        },
        "modifications": "Scaled width to 0.48m, grounded base at minY=0, harmonized 67 keycap/chassis meshes to Atelier cream keycaps, slate modifiers, brushed metal frame, and cyan accent keys.",
    },
    {
        "id": "mouse",
        "raw_file": "mouse_creativetrio.glb",
        "target_rel_path": "workstation/mouse.glb",
        "name": "Ergonomic Wireless Mouse",
        "creator": "CreativeTrio",
        "source_url": "https://poly.pizza/m/V2Ebx3pvo4",
        "direct_download_url": "https://static.poly.pizza/c0123ed1-38d1-4532-a711-3fccdc42fe25.glb",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Computer Mouse by CreativeTrio [CC0 1.0] via Poly Pizza (https://poly.pizza/m/V2Ebx3pvo4)",
        "target_depth": 0.115,
        "rot_y_deg": 0.0,
        "mat_map": {
            "Material": "metal_graphite",
        },
        "modifications": "Normalized length to 0.115m, centered X/Z, grounded minY=0, applied matte graphite finish.",
    },
    {
        "id": "desk_lamp",
        "raw_file": "lamp_safayan.glb",
        "target_rel_path": "workstation/desk_lamp.glb",
        "name": "Articulated Architect Desk Lamp",
        "creator": "Alex Safayan",
        "source_url": "https://poly.pizza/m/0iZSZezOQxC",
        "direct_download_url": "https://static.poly.pizza/8fefc37b-c3c7-4743-9a7c-d33dcc445602.glb",
        "license": "CC-BY 3.0",
        "attribution": "Desk Lamp by Alex Safayan [CC-BY 3.0] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/0iZSZezOQxC)",
        "target_height": 0.68,
        "rot_y_deg": 0.0,
        "mat_map": {
            "mat19": "decor_amber",
            "mat22": "metal_graphite",
            "mat23": "metal_dark",
            "mat15": "metal_silver",
            "mat12": "decor_amber",
        },
        "modifications": "Normalized height to 0.68m, shifted origin from minY=-1.349 to minY=0, harmonized shade and articulated arms to warm amber & brushed metal.",
    },
    {
        "id": "speaker",
        "raw_file": "kenney_speakerSmall.glb",
        "target_rel_path": "workstation/speaker.glb",
        "name": "Studio Reference Monitor Speaker",
        "creator": "Kenney Vleugels (Kenney.nl)",
        "source_url": "https://kenney.nl/assets/furniture-kit",
        "direct_download_url": "https://kenney.nl/media/pages/assets/furniture-kit/440e0608a4-1677580847/kenney_furniture-kit.zip",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Speaker Small by Kenney [CC0 1.0] (https://kenney.nl/assets/furniture-kit)",
        "target_height": 0.24,
        "rot_y_deg": 0.0,
        "mat_map": {
            "wood": "wood_warm",
            "metalMedium": "metal_dark",
        },
        "modifications": "Centered X/Z origin, normalized height to 0.24m, remapped enclosure to warm walnut and acoustic baffle to dark graphite.",
    },
    {
        "id": "laptop",
        "raw_file": "kenney_laptop.glb",
        "target_rel_path": "workstation/laptop.glb",
        "name": "Auxiliary Developer Laptop",
        "creator": "Kenney Vleugels (Kenney.nl)",
        "source_url": "https://kenney.nl/assets/furniture-kit",
        "direct_download_url": "https://kenney.nl/media/pages/assets/furniture-kit/440e0608a4-1677580847/kenney_furniture-kit.zip",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Laptop by Kenney [CC0 1.0] (https://kenney.nl/assets/furniture-kit)",
        "target_width": 0.34,
        "rot_y_deg": 0.0,
        "mat_map": {
            "metalDark": "metal_dark",
            "metal": "metal_silver",
            "metalMedium": "tech_cyan",
        },
        "modifications": "Centered X/Z origin, scaled width to 0.34m, harmonized chassis to brushed aluminum and cyan screen glow.",
    },
    {
        "id": "gpu_workstation",
        "raw_file": "pc_safayan.glb",
        "target_rel_path": "electronics/gpu_workstation.glb",
        "name": "Glass-Panel GPU & Deep Learning Workstation Tower",
        "creator": "Alex Safayan",
        "source_url": "https://poly.pizza/m/5cN7W4ufoII",
        "direct_download_url": "https://static.poly.pizza/c106ad08-24b4-4d2e-88ee-632d9635faeb.glb",
        "license": "CC-BY 3.0",
        "attribution": "Gaming PC by Alex Safayan [CC-BY 3.0] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/5cN7W4ufoII)",
        "target_height": 1.42,
        "rot_y_deg": -90.0,
        "mat_map": {
            "mat23": "metal_graphite",
            "mat24": "glass_tinted",
            "mat17": "metal_dark",
            "mat16": "plastic_navy",
            "mat21": "ceramic_white",
            "mat3": "tech_cyan",
            "mat8": "tech_lavender",
            "mat9": "tech_lavender",
            "mat10": "decor_emerald",
            "mat12": "tech_cyan",
            "mat5": "decor_amber",
        },
        "modifications": "Rotated -90° Y so tempered glass side panel faces -X (viewer) and intake faces +Z; normalized height to 1.42m with minY=0; remapped red gaming accents to controlled Atelier cyan (#7DDCF7) and lavender (#AC98FF) with translucent glass panel.",
    },
    {
        "id": "gpu_fan_unit",
        "raw_file": "pc_pgonarg_cc0.glb",
        "target_rel_path": "electronics/gpu_fan_unit.glb",
        "name": "Dual-Fan CUDA GPU Module (with Separated Fan_1 & Fan_2 Rotors)",
        "creator": "pgonarg",
        "source_url": "https://poly.pizza/m/i45v5trpyR",
        "direct_download_url": "https://static.poly.pizza/94cc02b3-3cd1-447a-b79a-2ae808b78391.glb",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Gaming Computer / GPU by pgonarg [CC0 1.0] via Poly Pizza (https://poly.pizza/m/i45v5trpyR)",
        "target_width": 0.56,
        "rot_y_deg": 0.0,
        "mat_map": {
            "Material.003": "metal_graphite",
            "Material.002": "metal_dark",
            "Material.001": "tech_cyan",
            "Material.005": "decor_amber",
            "Material.004": "metal_silver",
            "Material": "plastic_navy",
        },
        "modifications": "Preserved separate `Fan_1` and `Fan_2` rotor nodes for real-time blade rotation; normalized width to 0.56m; harmonized shroud and rotor materials.",
    },
    {
        "id": "hologram_pedestal",
        "raw_file": "pedestal_quaternius_cc0.glb",
        "target_rel_path": "electronics/hologram_pedestal.glb",
        "name": "Sci-Fi Astrometry Hologram Emitter Base",
        "creator": "Quaternius (Tomás Laulhé)",
        "source_url": "https://github.com/trebeljahr/quaternius-showcase/blob/main/public/glb/modular_sci_fi/Props_Teleporter_1.glb",
        "direct_download_url": "https://raw.githubusercontent.com/trebeljahr/quaternius-showcase/main/public/glb/modular_sci_fi/Props_Teleporter_1.glb",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Props_Teleporter_1 (Modular Sci-Fi Pack) by Quaternius [CC0 1.0] (https://quaternius.com)",
        "target_width": 0.88,
        "rot_y_deg": 0.0,
        "mat_map": {
            "DarkGrey": "metal_dark",
            "Main": "metal_graphite",
            "Accent": "wood_warm",
        },
        "modifications": "Normalized diameter to 0.88m, grounded base at minY=0, harmonized outer struts to brushed graphite and accent ring to warm walnut.",
    },
    {
        "id": "office_chair",
        "raw_file": "chair_quaternius_cc0.glb",
        "target_rel_path": "furniture/office_chair.glb",
        "name": "Ergonomic Swivel Office Chair",
        "creator": "Quaternius (Tomás Laulhé)",
        "source_url": "https://poly.pizza/m/UfKvrZBK6C",
        "direct_download_url": "https://static.poly.pizza/ac2301f3-af86-435a-885a-d8f1a32f9f76.glb",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Office Chair by Quaternius [CC0 1.0] via Poly Pizza (https://poly.pizza/m/UfKvrZBK6C)",
        "target_height": 1.08,
        "rot_y_deg": 180.0,
        "mat_map": {
            "Grey": "metal_silver",
            "Black": "metal_dark",
            "Chair": "plastic_navy",
        },
        "modifications": "Normalized height to 1.08m, rotated 180° Y so seat faces the workstation desk (-Z), grounded 5-star caster base at minY=0, harmonized upholstery to Atelier slate-navy.",
    },
    {
        "id": "bookshelf",
        "raw_file": "bookshelf_pfluger.glb",
        "target_rel_path": "furniture/bookshelf.glb",
        "name": "Modern Architectural Bookshelf with Curated Volumes",
        "creator": "Wanja Pflüger",
        "source_url": "https://poly.pizza/m/15B0ihXkg3C",
        "direct_download_url": "https://static.poly.pizza/91537fb2-45d2-4b08-b060-7347a52b70ab.glb",
        "license": "CC-BY 3.0",
        "attribution": "Bookshelf by Wanja Pflüger [CC-BY 3.0] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/15B0ihXkg3C)",
        "target_height": 1.98,
        "rot_y_deg": 90.0,
        "mat_map": {
            "mat20": "wood_warm",
            "mat23": "metal_graphite",
            "mat19": "decor_amber",
            "mat22": "plastic_slate",
            "mat21": "ceramic_white",
            "mat17": "plastic_navy",
            "mat18": "tech_cyan",
        },
        "modifications": "Rotated +90° Y to align flush against the left cutaway wall (-X), scaled height to 1.98m, shifted minY from -2.357 to 0.0, harmonized shelf wood and book covers to Atelier palette.",
    },
    {
        "id": "book_stack",
        "raw_file": "kenney_books.glb",
        "target_rel_path": "props/book_stack.glb",
        "name": "Technical Reference Book Stack",
        "creator": "Kenney Vleugels (Kenney.nl)",
        "source_url": "https://kenney.nl/assets/furniture-kit",
        "direct_download_url": "https://kenney.nl/media/pages/assets/furniture-kit/440e0608a4-1677580847/kenney_furniture-kit.zip",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Books by Kenney [CC0 1.0] (https://kenney.nl/assets/furniture-kit)",
        "target_width": 0.24,
        "rot_y_deg": 0.0,
        "mat_map": {
            "carpetDarker": "tech_lavender",
            "carpetWhite": "ceramic_white",
            "plant": "decor_emerald",
            "metal": "tech_cyan",
        },
        "modifications": "Centered X/Z origin, scaled width to 0.24m, harmonized book spine colors.",
    },
    {
        "id": "houseplant_large",
        "raw_file": "plant_quaternius1_cc0.glb",
        "target_rel_path": "props/houseplant_large.glb",
        "name": "Potted Tropical Floor Plant (Houseplant_7)",
        "creator": "Quaternius (Tomás Laulhé)",
        "source_url": "https://poly.pizza/m/bfLOqIV5uP",
        "direct_download_url": "https://static.poly.pizza/1683c0b1-4dd9-4d45-910e-cf3e46f163f5.glb",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Houseplant by Quaternius [CC0 1.0] via Poly Pizza (https://poly.pizza/m/bfLOqIV5uP)",
        "target_height": 0.78,
        "rot_y_deg": 0.0,
        "mat_map": {
            "Black": "ceramic_white",
            "Brown": "soil_brown",
            "Plant_Green": "decor_emerald",
        },
        "modifications": "Normalized height to 0.78m, grounded planter base at minY=0, remapped pot to warm ceramic and foliage to rich botanical emerald.",
    },
    {
        "id": "houseplant_small",
        "raw_file": "plant_quaternius2_cc0.glb",
        "target_rel_path": "props/houseplant_small.glb",
        "name": "Potted Desk & Shelf Plant (Houseplant_1)",
        "creator": "Quaternius (Tomás Laulhé)",
        "source_url": "https://poly.pizza/m/f6GPjbEgg0",
        "direct_download_url": "https://static.poly.pizza/41d278fd-ceb3-425b-800d-ca434be134d0.glb",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Houseplant by Quaternius [CC0 1.0] via Poly Pizza (https://poly.pizza/m/f6GPjbEgg0)",
        "target_height": 0.28,
        "rot_y_deg": 0.0,
        "mat_map": {
            "Black": "ceramic_white",
            "Brown": "soil_brown",
            "Plant_Green": "decor_emerald",
        },
        "modifications": "Normalized height to 0.28m for shelf/desk placement, grounded base at minY=0, harmonized ceramic pot and foliage.",
    },
    {
        "id": "coffee_mug",
        "raw_file": "mug_kenney_cc0.glb",
        "target_rel_path": "props/coffee_mug.glb",
        "name": "Ceramic Espresso Mug",
        "creator": "Kenney Vleugels (Kenney.nl)",
        "source_url": "https://poly.pizza/m/M2sVC8jbmi",
        "direct_download_url": "https://static.poly.pizza/1a3b3f0c-c4af-464f-9cfa-de5117a615c4.glb",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Cup Tea / Coffee Mug by Kenney [CC0 1.0] via Poly Pizza (https://poly.pizza/m/M2sVC8jbmi)",
        "target_height": 0.105,
        "rot_y_deg": 0.0,
        "mat_map": {
            "_defaultMat": "ceramic_white",
            "brownDarkest": "espresso_dark",
        },
        "modifications": "Normalized height to 0.105m, centered X/Z, grounded bottom at minY=0, applied glazed ceramic white and dark roast espresso PBR materials.",
    },
    {
        "id": "datbot",
        "raw_file": "robot_quaternius_cc0.glb",
        "target_rel_path": "robot/datbot.glb",
        "name": "DatBot-01 Expressive Companion Robot (Rigged & Animated)",
        "creator": "Tomás Laulhé (Quaternius)",
        "source_url": "https://poly.pizza/m/QCm7qe9uNJ",
        "direct_download_url": "https://static.poly.pizza/7d95dbce-8c73-489b-8298-f430b1f0dbdf.glb",
        "license": "CC0 1.0 Public Domain",
        "attribution": "Animated Robot (RobotExpressive) by Tomás Laulhé (Quaternius) [CC0 1.0] via Three.js / Poly Pizza",
        "target_height": 0.36,
        "rot_y_deg": 0.0,
        "mat_map": {
            "Grey": "ceramic_white",
            "Main": "tech_cyan",
            "Black": "metal_dark",
        },
        "modifications": "Normalized height to 0.36m via non-destructive root wrapper preserving all 74 skeletal armature nodes and animation clips; harmonized body shell to ceramic white, cyan tech accents, and dark visor.",
    },
]


def pack_glb(jdata: Dict[str, Any], bin_chunk: bytes) -> bytes:
    json_bytes = json.dumps(jdata, separators=(",", ":")).encode("utf-8")
    # Pad JSON chunk with spaces (0x20) to 4-byte boundary
    json_pad = (4 - (len(json_bytes) % 4)) % 4
    json_bytes += b" " * json_pad

    # Pad BIN chunk with zeros (0x00) to 4-byte boundary
    bin_pad = (4 - (len(bin_chunk) % 4)) % 4
    bin_bytes = bin_chunk + (b"\x00" * bin_pad)

    total_len = 12 + 8 + len(json_bytes) + 8 + len(bin_bytes)
    header = struct.pack("<III", 0x46546C67, 2, total_len)
    chunk0 = struct.pack("<II", len(json_bytes), 0x4E4F534A) + json_bytes
    chunk1 = struct.pack("<II", len(bin_bytes), 0x004E4942) + bin_bytes
    return header + chunk0 + chunk1


def normalize_asset(spec: Dict[str, Any]) -> Dict[str, Any]:
    raw_path = os.path.join(RAW_DIR, spec["raw_file"])
    data = open(raw_path, "rb").read()
    magic, version, length, jlen, jtype = struct.unpack("<IIIII", data[:20])
    jdata = json.loads(data[20 : 20 + jlen].decode("utf-8"))

    # Extract BIN chunk
    bin_offset = 20 + jlen
    bin_len, bin_type = struct.unpack("<II", data[bin_offset : bin_offset + 8])
    bin_chunk = data[bin_offset + 8 : bin_offset + 8 + bin_len]

    scenes = jdata.get("scenes", [{"nodes": [0]}])
    scene0 = scenes[0]
    orig_roots = list(scene0.get("nodes", []))

    # Compute original bounds
    mins, maxs, total_tris = compute_bounds(jdata, orig_roots)
    orig_size = [maxs[i] - mins[i] for i in range(3)]

    # Determine uniform scale factor
    if "target_height" in spec:
        scale_f = spec["target_height"] / max(orig_size[1], 1e-6)
    elif "target_width" in spec:
        scale_f = spec["target_width"] / max(orig_size[0], 1e-6)
    elif "target_depth" in spec:
        scale_f = spec["target_depth"] / max(orig_size[2], 1e-6)
    else:
        scale_f = 1.0

    rot_deg = spec.get("rot_y_deg", 0.0)
    quat = y_rot_quat(rot_deg)

    # Create a temporary wrapper node with rotation + scale first to measure rotated/scaled bounds
    nodes = jdata.setdefault("nodes", [])
    wrapper_idx = len(nodes)
    wrapper_node: Dict[str, Any] = {
        "name": "__AtelierNormalizedRoot",
        "children": orig_roots,
        "scale": [round(scale_f, 6), round(scale_f, 6), round(scale_f, 6)],
    }
    if abs(rot_deg) > 1e-4:
        wrapper_node["rotation"] = quat
    nodes.append(wrapper_node)
    scene0["nodes"] = [wrapper_idx]

    # Measure bounds after rotation & scale
    r_mins, r_maxs, _ = compute_bounds(jdata, [wrapper_idx])
    r_center_x = (r_mins[0] + r_maxs[0]) / 2.0
    r_center_z = (r_mins[2] + r_maxs[2]) / 2.0
    r_min_y = r_mins[1]

    # Set translation so centerX = 0, minY = 0, centerZ = 0
    wrapper_node["translation"] = [
        round(-r_center_x, 6),
        round(-r_min_y, 6),
        round(-r_center_z, 6),
    ]

    # Verify final normalized bounds
    f_mins, f_maxs, _ = compute_bounds(jdata, [wrapper_idx])
    final_size = [round(f_maxs[i] - f_mins[i], 4) for i in range(3)]

    # Harmonize materials to shared Atelier palette
    apply_material_mapping(jdata, spec.get("mat_map", {}))

    # Write normalized GLB
    out_path = os.path.join(PUBLIC_3D_DIR, spec["target_rel_path"])
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    out_bytes = pack_glb(jdata, bin_chunk)
    with open(out_path, "wb") as f:
        f.write(out_bytes)

    return {
        "id": spec["id"],
        "name": spec["name"],
        "creator": spec["creator"],
        "license": spec["license"],
        "sourceUrl": spec["source_url"],
        "directDownloadUrl": spec["direct_download_url"],
        "attribution": spec["attribution"],
        "originalFormat": "GLB (glTF 2.0 Binary)",
        "rawSizeBytes": len(data),
        "optimizedSizeBytes": len(out_bytes),
        "localPath": f"/assets/3d/{spec['target_rel_path']}",
        "triangles": total_tris,
        "meshCount": len(jdata.get("meshes", [])),
        "materialCount": len(jdata.get("materials", [])),
        "normalizedSizeMeters": {
            "width": final_size[0],
            "height": final_size[1],
            "depth": final_size[2],
        },
        "modifications": spec["modifications"],
    }


def main() -> None:
    os.makedirs(PUBLIC_3D_DIR, exist_ok=True)
    os.makedirs(DOCS_DIR, exist_ok=True)

    manifest_items = []
    for spec in ASSET_SPECS:
        info = normalize_asset(spec)
        manifest_items.append(info)
        sz = info["normalizedSizeMeters"]
        print(
            f"[OK] {info['localPath']:42s} | {info['optimizedSizeBytes']/1024:6.1f} KB | "
            f"tris={info['triangles']:5d} | size=({sz['width']:.3f}m x {sz['height']:.3f}m x {sz['depth']:.3f}m)"
        )

    manifest_data = {
        "project": "Nguyễn Thành Đạt — The AI Engineer's Atelier",
        "generatedAt": "2026-10-19",
        "totalAssets": len(manifest_items),
        "totalTriangles": sum(i["triangles"] for i in manifest_items),
        "totalSizeBytes": sum(i["optimizedSizeBytes"] for i in manifest_items),
        "assets": manifest_items,
    }

    manifest_path = os.path.join(DOCS_DIR, "3d-asset-manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, indent=2, ensure_ascii=False)

    # Generate docs/3d-asset-credits.md
    credits_lines = [
        "# 3D Asset Credits & Provenance",
        "",
        "This portfolio (**The AI Engineer's Atelier**) integrates real downloadable 3D glTF/GLB models normalized to our shared isometric diorama scale and PBR material palette. Full provenance and creator attributions are listed below in accordance with **CC0 1.0 Universal** and **Creative Commons Attribution (CC-BY 3.0)** licenses.",
        "",
        "## Summary Metrics",
        f"- **Total Integrated 3D Assets**: {manifest_data['totalAssets']} GLB files",
        f"- **Total Scene Asset Triangles**: {manifest_data['totalTriangles']:,} triangles",
        f"- **Total Uncompressed GLB Payload**: {manifest_data['totalSizeBytes'] / 1024:.1f} KB ({manifest_data['totalSizeBytes'] / (1024*1024):.2f} MB)",
        "",
        "## Asset Attribution Table",
        "",
        "| Asset ID | Local File | Original Creator | License | Source URL | Triangles | Size |",
        "| :--- | :--- | :--- | :--- | :--- | ---: | ---: |",
    ]

    for item in manifest_items:
        credits_lines.append(
            f"| `{item['id']}` | `{item['localPath']}` | **{item['creator']}** | {item['license']} | [{item['sourceUrl']}]({item['sourceUrl']}) | {item['triangles']:,} | {item['optimizedSizeBytes']/1024:.1f} KB |"
        )

    credits_lines.extend([
        "",
        "## Required CC-BY 3.0 Attribution Notices",
        "",
    ])
    for item in manifest_items:
        if "CC-BY" in item["license"]:
            credits_lines.append(f"- **{item['name']}** (`{item['localPath']}`): {item['attribution']}. *Modifications*: {item['modifications']}")

    credits_lines.extend([
        "",
        "## CC0 1.0 Public Domain Acknowledgements",
        "",
    ])
    for item in manifest_items:
        if "CC0" in item["license"]:
            credits_lines.append(f"- **{item['name']}** (`{item['localPath']}`): {item['attribution']}. *Modifications*: {item['modifications']}")

    credits_path = os.path.join(DOCS_DIR, "3d-asset-credits.md")
    with open(credits_path, "w", encoding="utf-8") as f:
        f.write("\n".join(credits_lines) + "\n")

    print(f"\nWrote {manifest_path} and {credits_path}")


if __name__ == "__main__":
    main()
