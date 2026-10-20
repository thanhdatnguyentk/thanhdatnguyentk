# 3D Asset Research & Replacement Plan — "The AI Engineer's Atelier"

## 1. Creative & Technical Direction

- **Art Direction**: *Premium Cozy Futuristic Isometric AI Atelier* — a handcrafted miniature architectural diorama combining warm walnut/oak wood, brushed graphite metal, muted slate/cream plastics, and controlled cyan (`#7DDCF7`), lavender (`#AC98FF`), and warm amber (`#FFC992`) accents.
- **Licensing Policy**:
  - Prioritize **CC0 1.0 Universal (Public Domain)** assets from **Quaternius**, **Kenney**, **Poly Haven**, and **CreativeTrio**.
  - Accept **CC-BY 3.0 / 4.0** assets from verified creators via **Poly Pizza / Google Poly Archive** with full creator attribution recorded in [`docs/3d-asset-credits.md`](./3d-asset-credits.md) and [`docs/3d-asset-manifest.json`](./3d-asset-manifest.json).
  - Zero proprietary, non-commercial-only, or editorial-only assets.
- **Runtime & Normalization Requirements**:
  - All selected GLB models are processed through our deterministic normalization pipeline (`scripts/normalize-glb-assets.py`) to unify scale (meters), ground pivot (`minY = 0`, `centerX = 0`, `centerZ = 0`), clean node hierarchies, and harmonize PBR material roughness/metalness so runtime **Day/Night lighting** works seamlessly without baked-lighting conflicts.

---

## 2. Candidate Shortlist by Priority Category

### PRIORITY 1 — MAIN WORKSTATION (Desk, Dual/Triple Monitors, Keyboard, Mouse, Desk Lamp, Accessories)

#### 1.1 Main Workstation Desk
| Field | Candidate 1A (Selected Primary) | Candidate 1B (Selected Secondary / Drawer Unit) | Candidate 1C (Alternative) |
| :--- | :--- | :--- | :--- |
| **Asset Name** | Adjustable Standing Desk (`desk_jeff.glb`) | Craftsman Computer Desk (`desk_quaternius.glb`) | Office Desk (`kenney_desk.glb`) |
| **Source URL** | `https://poly.pizza/m/7Z0bva7ec1s` (`https://static.poly.pizza/be656f2b-22ce-4c84-af9b-5f0356a62b1f.glb`) | `https://poly.pizza/m/V86Go2rlnq` (`https://static.poly.pizza/91c2bf8d-0876-4801-abd3-8dd5d017ecbd.glb`) | `https://kenney.nl/assets/furniture-kit` (`Models/GLTF format/desk.glb`) |
| **Original Creator** | jeff cobesign | Quaternius (Tomás Laulhé) | Kenney Vleugels (Kenney.nl) |
| **License** | CC-BY 3.0 | CC0 1.0 Public Domain | CC0 1.0 Public Domain |
| **Attribution** | "Adjustable Desk by jeff cobesign [CC-BY 3.0] via Poly Pizza" | Not required (CC0), credited in docs | Not required (CC0), credited in docs |
| **Download Format** | `.glb` (glTF 2.0 binary) | `.glb` (glTF 2.0 binary) | `.glb` (glTF 2.0 binary) |
| **File Size** | 289.4 KB (raw) → ~142 KB (normalized) | 132.7 KB | 14.7 KB |
| **Triangle Count** | 9,908 tris (23 meshes) | 2,640 tris (5 meshes: `Desk`, `Desk_Drawer1..4`) | 198 tris (2 meshes) |
| **Texture / Materials** | 5 untextured PBR materials (`BlackWood`, `BlackCoatSteel`, `GrayPlastic`, `WhiteSteelScrew`, `BlackPlastic`) | 2 untextured PBR materials (`Wood`, `DarkWood`) | 2 untextured PBR materials (`wood`, `metal`) |
| **Visual Suitability** | **Excellent** — motorized dual-column standing desk with beveled tabletop, telescoping steel legs, levelers, and controller pad. | **Very Good** — warm stylized wooden desk with 4 articulated drawers. | **Good** — clean low-poly silhouette, slightly simpler geometry. |
| **Technical Suitability** | Clean multi-material separation; easy to re-tint tabletop to warm walnut and frame to brushed graphite. | Clean node hierarchy (`Desk_Drawer1..4`); ideal for side drawer integration or compact desk. | Ultra-lightweight fallback. |
| **Download Verified** | Yes — Verified & inspected locally | Yes — Verified & inspected locally | Yes — Verified & inspected locally |
| **Planned Location** | Main focal workstation at `[0.12, 0.0, -1.18]` (`public/assets/3d/workstation/desk.glb`) | Under-desk / side drawer cabinet module | Not used in primary render |

#### 1.2 Workstation Monitors (Center Command Hub, Left AIC-26 Video Search, Right UIT_PINANCE, Wall CCTV)
| Field | Candidate 1D (Selected Side & CCTV Monitors) | Candidate 1E (Selected Center Ultrawide Chassis) | Candidate 1F (Alternative) |
| :--- | :--- | :--- | :--- |
| **Asset Name** | Stylized Beveled Monitor (`monitor_zsky.glb`) | Curved Stand Studio Display (`monitor_google.glb`) | Flat Display (`kenney_computerScreen.glb`) |
| **Source URL** | `https://poly.pizza/m/Qyw8JFtZF0` (`https://static.poly.pizza/6c463197-7b41-4adc-ba6a-158ddca043be.glb`) | `https://poly.pizza/m/5qZ5IaClHHw` (`https://static.poly.pizza/167a91d0-f44e-446e-8600-ff85d2e12c6e.glb`) | `https://kenney.nl/assets/furniture-kit` (`Models/GLTF format/computerScreen.glb`) |
| **Original Creator** | Zsky | Poly by Google | Kenney Vleugels |
| **License** | CC-BY 3.0 | CC-BY 3.0 | CC0 1.0 Public Domain |
| **Attribution** | "Monitor by Zsky [CC-BY 3.0] via Poly Pizza" | "Monitor by Poly by Google [CC-BY 3.0] via Poly Pizza" | Not required (CC0) |
| **Download Format** | `.glb` | `.glb` | `.glb` |
| **File Size** | 12.9 KB | 7.5 KB | 6.3 KB |
| **Triangle Count** | 136 tris (1 mesh, 2 primitives) | 292 tris (1 mesh) | 72 tris (1 mesh) |
| **Texture / Materials** | 2 PBR materials (`Plastic1Monitor1` bezel/stand, `Screen1Monitor1` display surface) | 1 PBR material (`Mat`) | 2 PBR materials (`metalDark`, `metal`) |
| **Visual Suitability** | **Excellent** — dedicated bezel/stand and screen material slots, clean modern profile. | **Excellent** — tapered aluminum L-stand and slim display housing. | **Good** — compact low-poly monitor. |
| **Technical Suitability** | Screen face aligns cleanly with our custom HTML5 Canvas `CanvasTexture` overlay for AIC-26 Video Retrieval & UIT_PINANCE. | Scales cleanly to ultrawide aspect ratio while keeping live 7-project hub `CanvasTexture`. | Lightweight alternative. |
| **Download Verified** | Yes — Verified & inspected locally | Yes — Verified & inspected locally | Yes — Verified & inspected locally |
| **Planned Location** | Left (`[-0.78, 1.41, -1.14]`) & Right (`[1.02, 1.41, -1.12]`) desk monitors (`public/assets/3d/workstation/monitor.glb`) | Center Ultrawide (`[0.12, 1.46, -1.36]`) (`public/assets/3d/workstation/monitor_ultrawide.glb`) | Backup |

#### 1.3 Mechanical Keyboard & Ergonomic Mouse
| Field | Candidate 1G (Selected Keyboard) | Candidate 1H (Alternative Keyboard) | Candidate 1I (Selected Mouse) | Candidate 1J (Alternative Mouse) |
| :--- | :--- | :--- | :--- | :--- |
| **Asset Name** | Sculpted Mechanical Keyboard (`keyboard_safayan.glb`) | Standard Keyboard (`keyboard_google.glb`) | Sculpted Ergonomic Mouse (`mouse_creativetrio.glb`) | Low-Poly Mouse (`kenney_computerMouse.glb`) |
| **Source URL** | `https://poly.pizza/m/fOy2zvPJAj-` (`https://static.poly.pizza/1f6cf483-4859-4fda-a706-5bbeb005dd45.glb`) | `https://poly.pizza/m/3oFfQCSsUmQ` (`https://static.poly.pizza/8dc7a33e-9ed8-4e01-a7a1-b3717ac35c51.glb`) | `https://poly.pizza/m/V2Ebx3pvo4` (`https://static.poly.pizza/c0123ed1-38d1-4532-a711-3fccdc42fe25.glb`) | `https://kenney.nl/assets/furniture-kit` (`Models/GLTF format/computerMouse.glb`) |
| **Original Creator** | Alex Safayan | Poly by Google | CreativeTrio | Kenney Vleugels |
| **License** | CC-BY 3.0 | CC-BY 3.0 | CC0 1.0 Public Domain | CC0 1.0 Public Domain |
| **Attribution** | "Keyboard by Alex Safayan [CC-BY 3.0] via Poly Pizza" | "Keyboard by Poly by Google [CC-BY 3.0]" | Not required (CC0) | Not required (CC0) |
| **Download Format** | `.glb` | `.glb` | `.glb` | `.glb` |
| **File Size** | 117.0 KB | 136.8 KB | 15.9 KB | 5.7 KB |
| **Triangle Count** | 808 tris (67 meshes) | 1,972 tris (1 mesh) | 100 tris (1 mesh) | 71 tris (1 mesh) |
| **Texture / Materials** | 4 PBR materials (keycaps, dark modifiers, slate aluminum case, accent keys) | 1 material | 1 PBR material | 1 PBR material |
| **Visual Suitability** | **Outstanding** — 67 individual keycap and case meshes with 4 color-coded materials at only 808 tris. | Good, but single material lacks keycap contrast. | **Excellent** — smooth curved ergonomic shell. | Good low-poly silhouette. |
| **Technical Suitability** | Fits directly onto desk mat (`[0.04, 0.97, -0.96]`). | Higher triangle count for less material separation. | Fits right of keyboard (`[0.42, 0.97, -0.96]`). | Very small payload. |
| **Download Verified** | Yes — Verified & inspected locally | Yes — Verified & inspected locally | Yes — Verified & inspected locally | Yes — Verified & inspected locally |
| **Planned Location** | Center desk mat (`public/assets/3d/workstation/keyboard.glb`) | Not used | Right desk mat (`public/assets/3d/workstation/mouse.glb`) | Not used |

#### 1.4 Architect Desk Lamp & Studio Speakers
| Field | Candidate 1K (Selected Desk Lamp) | Candidate 1L (Alternative Desk Lamp) | Candidate 1M (Selected Studio Speakers) |
| :--- | :--- | :--- | :--- |
| **Asset Name** | Articulated Architect Lamp (`lamp_safayan.glb`) | Modern Desk Lamp (`lamp_quaternius.glb`) | Studio Monitor Speaker (`kenney_speakerSmall.glb`) |
| **Source URL** | `https://poly.pizza/m/0iZSZezOQxC` (`https://static.poly.pizza/8fefc37b-c3c7-4743-9a7c-d33dcc445602.glb`) | `https://poly.pizza/m/uJDWrSJGVH` (`https://static.poly.pizza/2e1ab34a-eab6-4751-930f-6e3b4f5319a8.glb`) | `https://kenney.nl/assets/furniture-kit` (`Models/GLTF format/speakerSmall.glb`) |
| **Original Creator** | Alex Safayan | Quaternius | Kenney Vleugels |
| **License** | CC-BY 3.0 | CC0 1.0 Public Domain | CC0 1.0 Public Domain |
| **Attribution** | "Desk Lamp by Alex Safayan [CC-BY 3.0] via Poly Pizza" | Not required (CC0) | Not required (CC0) |
| **Download Format** | `.glb` | `.glb` | `.glb` |
| **File Size** | 66.7 KB | 12.5 KB | 14.9 KB |
| **Triangle Count** | 856 tris (10 meshes) | 356 tris (1 mesh) | 220 tris (1 mesh) |
| **Texture / Materials** | 5 PBR materials (warm shade, articulated arms, dark joints, silver springs, glowing bulb) | 3 PBR materials (`Black`, `LightMetal`, `White`) | 2 PBR materials (`wood`, `metalMedium`) |
| **Visual Suitability** | **Outstanding** — classic spring-arm architect lamp with warm emissive bulb material. | **Very Good** — sleek curved modern neck lamp. | **Excellent** — wood-cabinet studio monitor speaker matching our walnut desk. |
| **Technical Suitability** | Bulb material (`mat12`) can be driven dynamically by `timeMode` (warm tungsten glow at night). | Lightweight alternative. | Instanced left/right on desk corners. |
| **Download Verified** | Yes — Verified & inspected locally | Yes — Verified & inspected locally | Yes — Verified & inspected locally |
| **Planned Location** | Left rear desk (`[-1.08, 0.96, -1.42]`, `public/assets/3d/workstation/desk_lamp.glb`) | Bookshelf / secondary accent lamp | Left/Right desk audio monitors (`public/assets/3d/workstation/speaker.glb`) |

---

### PRIORITY 2 — GAMING PC / GPU WORKSTATION

| Field | Candidate 2A (Selected Primary Chassis) | Candidate 2B (Selected Dual-Fan GPU & Rotor Module) | Candidate 2C (Alternative Tower) |
| :--- | :--- | :--- | :--- |
| **Asset Name** | Glass-Panel Gaming PC Tower (`pc_safayan.glb`) | Dual-Fan GPU & Cooling Unit (`pc_pgonarg_cc0.glb`) | Sci-Fi Server Console (`scifi_computer_quaternius_cc0.glb`) |
| **Source URL** | `https://poly.pizza/m/5cN7W4ufoII` (`https://static.poly.pizza/c106ad08-24b4-4d2e-88ee-632d9635faeb.glb`) | `https://poly.pizza/m/i45v5trpyR` (`https://static.poly.pizza/94cc02b3-3cd1-447a-b79a-2ae808b78391.glb`) | `https://github.com/trebeljahr/quaternius-showcase/blob/main/public/glb/modular_sci_fi/Props_Computer.glb` |
| **Original Creator** | Alex Safayan | pgonarg | Quaternius |
| **License** | CC-BY 3.0 | CC0 1.0 Public Domain | CC0 1.0 Public Domain |
| **Attribution** | "Gaming PC by Alex Safayan [CC-BY 3.0] via Poly Pizza" | Not required (CC0) | Not required (CC0) |
| **Download Format** | `.glb` | `.glb` | `.glb` |
| **File Size** | 340.5 KB | 55.7 KB | 41.1 KB |
| **Triangle Count** | 2,616 tris (145 meshes) | 756 tris (5 named meshes: `Fan_1`, `Fan_2`, `Output`, `PCI`, `Body`) | 624 tris (1 mesh) |
| **Texture / Materials** | 16 PBR materials including translucent glass side panel (`mat24` alpha `0.4`), motherboard, GPU, RAM, PSU shroud, and cyan/lavender accents | 6 PBR materials (`Material`..`Material.005`) | 5 PBR materials (`Main`, `DarkGrey`, `Accent`, `Black`, `DarkAccent`) |
| **Visual Suitability** | **Outstanding** — authentic custom PC tower with tempered glass window, visible internal motherboard/GPU/cooling blocks, and front ventilation. | **Excellent** — contains separated `Fan_1` and `Fan_2` rotor meshes that can be rotated in `useFrame`! | **Good** — stylized sci-fi server rack. |
| **Technical Suitability** | Preserves `gpu-server` interactive station at `[1.68, 0.76, -1.48]` while rotating actual fan geometry (`Fan_1`, `Fan_2` + intake rotors) in `useFrame`. | `Fan_1` and `Fan_2` nodes provide real GLB fan blade geometry for continuous rotation. | Good auxiliary rack prop. |
| **Download Verified** | Yes — Verified & inspected locally | Yes — Verified & inspected locally | Yes — Verified & inspected locally |
| **Planned Location** | Right of desk (`[1.68, 0.0, -1.48]`, `public/assets/3d/electronics/gpu_workstation.glb` & `gpu_fan_unit.glb`) | Integrated spinning fan nodes inside GPU workstation | Not used |

---

### PRIORITY 3 — OFFICE CHAIR

| Field | Candidate 3A (Selected Primary) | Candidate 3B (Alternative Executive) | Candidate 3C (Alternative Gaming) |
| :--- | :--- | :--- | :--- |
| **Asset Name** | Ergonomic Office Chair (`chair_quaternius_cc0.glb`) | Executive Leather Chair (`chair_zsky.glb`) | High-Back Gaming Chair (`chair_gaming_ilic.glb`) |
| **Source URL** | `https://poly.pizza/m/UfKvrZBK6C` (`https://static.poly.pizza/ac2301f3-af86-435a-885a-d8f1a32f9f76.glb`) | `https://poly.pizza/m/hW11P9DDXa` (`https://static.poly.pizza/08501afc-f719-4755-bb1c-6757c13f5b56.glb`) | `https://poly.pizza/m/5osCtu2pLwv` (`https://static.poly.pizza/2a9f239b-a659-4e60-b2a2-1ecb9a1b15bc.glb`) |
| **Original Creator** | Quaternius (Tomás Laulhé) | Zsky | Vladimir Ilic |
| **License** | CC0 1.0 Public Domain | CC-BY 3.0 | CC-BY 3.0 |
| **Attribution** | Not required (CC0), credited in docs | "Office Chair by Zsky [CC-BY 3.0]" | "Gaming Chair by Vladimir Ilic [CC-BY 3.0]" |
| **Download Format** | `.glb` | `.glb` | `.glb` |
| **File Size** | 113.0 KB | 112.9 KB | 378.6 KB |
| **Triangle Count** | 2,116 tris (1 mesh, 3 primitives) | 1,624 tris (1 mesh) | 4,742 tris (52 meshes) |
| **Texture / Materials** | 3 PBR materials (`Grey` metal star base, `Black` armrests/wheels, `Chair` slate-navy cushion `[0.04, 0.14, 0.34]`) | 1 PBR material (`LeatherExecutiveChair1`) | 5 PBR materials (bright red/orange racing stripes) |
| **Visual Suitability** | **Outstanding** — sculpted ergonomic backrest, contoured seat cushion, curved armrests, gas-lift cylinder, and 5-wheel caster base; native slate-navy upholstery matches our Atelier palette! | **Good** — nice silhouette, but single material slot makes wheel/cushion separation harder. | **Fair** — racing stripes feel too "gaming room" rather than cozy AI atelier. |
| **Technical Suitability** | Already grounded at `minY = 0.000`, height `1.128m`; subtle swivel animation in `useFrame` without blocking desk monitors. | Requires origin offset (`minY = -0.350`). | Heavy mesh count (52 nodes). |
| **Download Verified** | Yes — Verified & inspected locally | Yes — Verified & inspected locally | Yes — Verified & inspected locally |
| **Planned Location** | In front of desk (`[0.08, 0.01, -0.26]`, `public/assets/3d/furniture/office_chair.glb`) | Not used | Not used |

---

### PRIORITY 4 — BOOKSHELF AND PROPS (Bookshelf, Books, Plants, Coffee Mug)

| Field | Candidate 4A (Selected Bookshelf) | Candidate 4B (Alternative Bookshelf) | Candidate 4C (Selected Plants) | Candidate 4D (Selected Coffee Mug) |
| :--- | :--- | :--- | :--- | :--- |
| **Asset Name** | Modern Bookshelf & Props (`bookshelf_pfluger.glb`) | Wooden Bookcase with Books (`bookshelf_quaternius_cc0.glb`) | Potted Houseplants (`plant_quaternius1_cc0.glb` & `plant_quaternius2_cc0.glb`) | Ceramic Coffee Mug (`mug_kenney_cc0.glb`) |
| **Source URL** | `https://poly.pizza/m/15B0ihXkg3C` (`https://static.poly.pizza/91537fb2-45d2-4b08-b060-7347a52b70ab.glb`) | `https://poly.pizza/m/tACDGJ4CGW` (`https://static.poly.pizza/7d59d0aa-6447-4bbb-afc7-0452e9a34353.glb`) | `https://poly.pizza/m/bfLOqIV5uP` & `https://poly.pizza/m/f6GPjbEgg0` | `https://poly.pizza/m/M2sVC8jbmi` (`https://static.poly.pizza/1a3b3f0c-c4af-464f-9cfa-de5117a615c4.glb`) |
| **Original Creator** | Wanja Pflüger | Quaternius | Quaternius | Kenney Vleugels |
| **License** | CC-BY 3.0 | CC0 1.0 Public Domain | CC0 1.0 Public Domain | CC0 1.0 Public Domain |
| **Attribution** | "Bookshelf by Wanja Pflüger [CC-BY 3.0] via Poly Pizza" | Not required (CC0) | Not required (CC0) | Not required (CC0) |
| **Download Format** | `.glb` | `.glb` | `.glb` | `.glb` |
| **File Size** | 355.7 KB | 575.6 KB | 16.2 KB & 10.4 KB | 11.2 KB |
| **Triangle Count** | 3,440 tris (92 meshes) | 10,948 tris (3 meshes) | 449 tris & 245 tris | 136 tris (1 mesh) |
| **Texture / Materials** | 7 PBR materials (warm wood frame, dark metal accents, colorful book spines, storage boxes) | 11 PBR materials (`Wood1`, `Wood2`, `DarkWood`, `Cover1..6`, `Pages`, `Metal`) | 3 PBR materials (`Black` pot, `Brown` soil, `Plant_Green` foliage) | 2 PBR materials (`_defaultMat` ceramic cup, `brownDarkest` espresso liquid) |
| **Visual Suitability** | **Outstanding** — modern open architectural shelving with curated book stacks and storage boxes at 3,440 tris. | **Very Good** — classical heavy bookcase with doors (10.9k tris). | **Excellent** — organic low-poly foliage in dark ceramic planters. | **Excellent** — contoured mug with handle and dark coffee fill. |
| **Technical Suitability** | Fits left cutaway wall (`[-1.84, 0.0, -1.16]`) and preserves `bookshelf` interactive station. | Also extracted `kenney_books.glb` (62 tris) & `kenney_cardboardBoxClosed.glb` (60 tris) for extra shelf detailing. | Placed on floor corner, bookshelf top, and window ledge. | Preserves animated rising steam puffs & `coffee-mug` hotspot at `[-0.24, 0.99, -0.82]`. |
| **Download Verified** | Yes — Verified & inspected locally | Yes — Verified & inspected locally | Yes — Verified & inspected locally | Yes — Verified & inspected locally |
| **Planned Location** | `public/assets/3d/furniture/bookshelf.glb` | `public/assets/3d/props/book_stack.glb` | `public/assets/3d/props/houseplant_large.glb` & `houseplant_small.glb` | `public/assets/3d/props/coffee_mug.glb` |

---

### PRIORITY 5 — MINIATURE ROBOT (DatBot-01 RAG Assistant)

| Field | Candidate 5A (Selected Primary) | Candidate 5B (Alternative) |
| :--- | :--- | :--- |
| **Asset Name** | Expressive Sci-Fi Companion Robot (`robot_expressive_cc0.glb`) | Miniature Hover Bot (`robot_connors.glb`) |
| **Source URL** | `https://github.com/mrdoob/three.js/blob/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb` (also on `https://poly.pizza/m/QCm7qe9uNJ`) | `https://poly.pizza/m/1BQyXYZ9LPz` (`https://static.poly.pizza/673a412b-4318-439a-ae37-a89f4fa7a282.glb`) |
| **Original Creator** | Tomás Laulhé (Quaternius) | Matt Connors |
| **License** | CC0 1.0 Public Domain | CC-BY 3.0 |
| **Attribution** | Not required (CC0), credited to Tomás Laulhé (Quaternius) | "Robot by Matt Connors [CC-BY 3.0] via Poly Pizza" |
| **Download Format** | `.glb` | `.glb` |
| **File Size** | 391.6 KB (`robot_quaternius_cc0.glb`) | 397.8 KB |
| **Triangle Count** | 3,237 tris (14 skinned/articulated meshes) | 5,022 tris (49 meshes) |
| **Texture / Materials** | 3 PBR materials (`Grey`, `Main`, `Black`) | 6 PBR materials |
| **Visual Suitability** | **Outstanding** — iconic friendly miniature robot with expressive eyes, antenna, articulated head/neck/arms/torso, and built-in `Idle` / `Wave` / `ThumbsUp` animations! | **Very Good** — static sci-fi droid silhouette. |
| **Technical Suitability** | Supports both native skeletal `Idle`/`Wave` clips via `useAnimations` AND pointer-tracking head/antenna glow on its desktop charging pad at `[0.64, 1.02, -0.86]`. | No skeletal rigging. |
| **Download Verified** | Yes — Verified & inspected locally | Yes — Verified & inspected locally |
| **Planned Location** | Right desktop companion pad (`[0.64, 1.02, -0.86]`, `public/assets/3d/robot/datbot.glb`) | Not used |

---

### PRIORITY 6 & 7 — ROOM ARCHITECTURE & GALAXY HOLOGRAM PEDESTAL

| Field | Candidate 7A (Selected Hologram Emitter Housing) | Candidate 7B (Alternative Pedestal) |
| :--- | :--- | :--- |
| **Asset Name** | Sci-Fi Hologram Emitter Base (`pedestal_quaternius_cc0.glb` / `Props_Teleporter_1.glb`) | Modular Space Emitter (`kenney_space-station-kit`) |
| **Source URL** | `https://github.com/trebeljahr/quaternius-showcase/blob/main/public/glb/modular_sci_fi/Props_Teleporter_1.glb` | `https://kenney.nl/assets/space-station-kit` |
| **Original Creator** | Quaternius (Tomás Laulhé) | Kenney Vleugels |
| **License** | CC0 1.0 Public Domain | CC0 1.0 Public Domain |
| **Attribution** | Not required (CC0), credited in docs | Not required (CC0) |
| **Download Format** | `.glb` | `.glb` |
| **File Size** | 39.1 KB | ~18 KB |
| **Triangle Count** | 688 tris (1 mesh, 3 primitives) | ~240 tris |
| **Texture / Materials** | 3 PBR materials (`DarkGrey`, `Accent`, `Main`) | Untextured low-poly |
| **Visual Suitability** | **Outstanding** — chamfered circular sci-fi emitter ring with radial struts and recessed lens bed, serving as the physical projector housing underneath our live 1,500-star procedural Milky Way spiral galaxy. | Simpler octagonal pad. |
| **Technical Suitability** | Keeps our real-time procedural Milky Way particle system, Sgr A* core, and Solar System orbit ring 100% live while upgrading the physical pedestal housing to a real sculpted 3D asset. | Backup |
| **Download Verified** | Yes — Verified & inspected locally | Yes — Verified |
| **Planned Location** | Front-right floor hologram station (`[1.38, 0.0, 0.82]`, `public/assets/3d/electronics/hologram_pedestal.glb`) | Not used |

---

## 3. Summary of Total Runtime Asset Payload

| Target Path in `public/assets/3d/` | Source Candidate | Triangles | Approx. Size | License |
| :--- | :--- | ---: | ---: | :--- |
| `workstation/desk.glb` | `desk_jeff.glb` (jeff cobesign) | 9,908 | ~145 KB | CC-BY 3.0 |
| `workstation/monitor.glb` | `monitor_zsky.glb` (Zsky) | 136 | ~13 KB | CC-BY 3.0 |
| `workstation/monitor_ultrawide.glb` | `monitor_google.glb` (Poly by Google) | 292 | ~8 KB | CC-BY 3.0 |
| `workstation/keyboard.glb` | `keyboard_safayan.glb` (Alex Safayan) | 808 | ~117 KB | CC-BY 3.0 |
| `workstation/mouse.glb` | `mouse_creativetrio.glb` (CreativeTrio) | 100 | ~16 KB | CC0 1.0 |
| `workstation/desk_lamp.glb` | `lamp_safayan.glb` (Alex Safayan) | 856 | ~67 KB | CC-BY 3.0 |
| `workstation/speaker.glb` | `kenney_speakerSmall.glb` (Kenney) | 220 | ~15 KB | CC0 1.0 |
| `workstation/laptop.glb` | `kenney_laptop.glb` (Kenney) | 68 | ~6 KB | CC0 1.0 |
| `electronics/gpu_workstation.glb` | `pc_safayan.glb` (Alex Safayan) | 2,616 | ~340 KB | CC-BY 3.0 |
| `electronics/gpu_fan_unit.glb` | `pc_pgonarg_cc0.glb` (pgonarg) | 756 | ~56 KB | CC0 1.0 |
| `electronics/hologram_pedestal.glb` | `Props_Teleporter_1.glb` (Quaternius) | 688 | ~39 KB | CC0 1.0 |
| `furniture/office_chair.glb` | `chair_quaternius_cc0.glb` (Quaternius) | 2,116 | ~113 KB | CC0 1.0 |
| `furniture/bookshelf.glb` | `bookshelf_pfluger.glb` (Wanja Pflüger) | 3,440 | ~355 KB | CC-BY 3.0 |
| `props/book_stack.glb` | `kenney_books.glb` (Kenney) | 62 | ~7 KB | CC0 1.0 |
| `props/houseplant_large.glb` | `Houseplant_7.glb` (Quaternius) | 449 | ~16 KB | CC0 1.0 |
| `props/houseplant_small.glb` | `Houseplant_1.glb` (Quaternius) | 245 | ~10 KB | CC0 1.0 |
| `props/coffee_mug.glb` | `mug_kenney_cc0.glb` (Kenney) | 136 | ~11 KB | CC0 1.0 |
| `robot/datbot.glb` | `RobotExpressive.glb` (Quaternius) | 3,237 | ~391 KB | CC0 1.0 |
| **TOTAL SCENE GLB PAYLOAD** | **18 Normalized GLB Assets** | **26,133 tris** | **~1.72 MB** | **CC0 & CC-BY 3.0** |
