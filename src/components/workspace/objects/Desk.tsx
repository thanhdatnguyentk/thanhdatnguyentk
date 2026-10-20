import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';
import {
  AtelierGLBModel,
  type MaterialCustomization,
} from './AtelierGLBModel';

export const Desk: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';
  const mat = ATELIER_PALETTE[timeMode];
  const chairRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (chairRef.current) {
      chairRef.current.rotation.y = Math.sin(t * 0.55) * 0.08;
    }
  });

  // Cohesive runtime PBR material overrides synchronized with Day/Night lighting
  const deskOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      BlackWood: {
        color: mat.woodWarm,
        roughness: 0.38,
        metalness: 0.08,
      },
      BlackCoatSteel: {
        color: mat.metalBrushed,
        roughness: 0.3,
        metalness: 0.72,
      },
      GrayPlastic: {
        color: mat.metalDark,
        roughness: 0.35,
        metalness: 0.55,
      },
      WhiteSteelScrew: {
        color: mat.metalSilver,
        roughness: 0.24,
        metalness: 0.8,
      },
      BlackPlastic: {
        color: mat.fabricSlate,
        roughness: 0.48,
        metalness: 0.2,
      },
    }),
    [mat]
  );

  const drawerOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      Wood: { color: mat.woodWarm, roughness: 0.4, metalness: 0.08 },
      DarkWood: { color: mat.woodTrim, roughness: 0.44, metalness: 0.08 },
    }),
    [mat]
  );

  const keyboardOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      mat21: { color: mat.ceramicWhite, roughness: 0.35, metalness: 0.1 },
      mat22: { color: mat.fabricSlate, roughness: 0.42, metalness: 0.18 },
      mat16: { color: mat.metalBrushed, roughness: 0.28, metalness: 0.68 },
      mat9: {
        color: mat.accentCyan,
        emissive: mat.accentCyan,
        emissiveIntensity: isNight ? 0.35 : 0.1,
        roughness: 0.25,
      },
    }),
    [mat, isNight]
  );

  const mouseOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      Material: {
        color: mat.metalBrushed,
        roughness: 0.28,
        metalness: 0.55,
      },
    }),
    [mat]
  );

  const lampOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      mat19: {
        color: mat.metalBrushed,
        roughness: 0.32,
        metalness: 0.65,
      },
      mat22: {
        color: mat.metalSilver,
        roughness: 0.25,
        metalness: 0.78,
      },
      mat23: {
        color: mat.metalDark,
        roughness: 0.34,
        metalness: 0.7,
      },
      mat15: {
        color: mat.metalSilver,
        roughness: 0.22,
        metalness: 0.82,
      },
      mat12: {
        color: mat.accentAmber,
        emissive: mat.accentAmber,
        emissiveIntensity: isNight ? 1.35 : 0.45,
        roughness: 0.18,
      },
    }),
    [mat, isNight]
  );

  const speakerOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      wood: { color: mat.woodWarm, roughness: 0.4, metalness: 0.08 },
      metalMedium: { color: mat.metalDark, roughness: 0.32, metalness: 0.68 },
    }),
    [mat]
  );

  const laptopOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      metalDark: { color: mat.metalDark, roughness: 0.3, metalness: 0.72 },
      metal: { color: mat.metalSilver, roughness: 0.26, metalness: 0.78 },
      metalMedium: {
        color: mat.accentCyan,
        emissive: mat.accentCyan,
        emissiveIntensity: isNight ? 0.45 : 0.15,
        roughness: 0.2,
      },
    }),
    [mat, isNight]
  );

  const chairOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      Grey: { color: mat.metalSilver, roughness: 0.26, metalness: 0.78 },
      Black: { color: mat.metalDark, roughness: 0.35, metalness: 0.62 },
      Chair: { color: mat.fabricSlate, roughness: 0.58, metalness: 0.12 },
    }),
    [mat]
  );

  return (
    <group name="engineer-desk-station">
      {/* ── 1. Real 3D Adjustable Standing Desk GLB (jeff cobesign, CC-BY 3.0) ── */}
      <AtelierGLBModel
        assetPath="workstation/desk.glb"
        position={[0.12, 0.0, -1.18]}
        scale={[1.38, 1.0, 0.85]}
        materialOverrides={deskOverrides}
      />

      {/* ── 2. Real 3D Under-Desk Craftsman Drawer Module GLB (Quaternius, CC0) ── */}
      <AtelierGLBModel
        assetPath="workstation/desk_drawer.glb"
        position={[-0.78, 0.01, -1.32]}
        scale={[0.34, 0.76, 0.52]}
        materialOverrides={drawerOverrides}
      />

      {/* Rear Desk Warm/Cyan Ambilight Strip */}
      <mesh position={[0.12, 0.935, -1.75]}>
        <boxGeometry args={[2.64, 0.022, 0.024]} />
        <meshBasicMaterial color={isNight ? mat.accentCyan : mat.accentAmber} />
      </mesh>

      {/* ── 3. Extended Merino Wool Felt Desk Mat ── */}
      <RoundedBox
        args={[1.46, 0.012, 0.58]}
        radius={0.005}
        position={[0.12, 0.946, -1.04]}
        receiveShadow
      >
        <meshStandardMaterial
          color={isNight ? '#1c2840' : '#334155'}
          roughness={0.86}
        />
      </RoundedBox>

      {/* ── 4. Real 3D Sculpted Mechanical Keyboard GLB (Alex Safayan, CC-BY 3.0) ── */}
      <group position={[0.04, 0.953, -0.96]} rotation={[0.04, 0, 0]}>
        <AtelierGLBModel
          assetPath="workstation/keyboard.glb"
          scale={[1.0, 1.45, 1.0]}
          materialOverrides={keyboardOverrides}
        />
        {/* Subtle Cyan Underglow */}
        <mesh position={[0, 0.002, 0]}>
          <boxGeometry args={[0.47, 0.004, 0.168]} />
          <meshBasicMaterial color={mat.accentCyan} />
        </mesh>
      </group>

      {/* ── 5. Real 3D Ergonomic Wireless Mouse GLB (CreativeTrio, CC0) ── */}
      <AtelierGLBModel
        assetPath="workstation/mouse.glb"
        position={[0.42, 0.953, -0.96]}
        materialOverrides={mouseOverrides}
      />

      {/* ── 6. Real 3D Articulated Architect Desk Lamp GLB (Alex Safayan, CC-BY 3.0) ── */}
      <AtelierGLBModel
        assetPath="workstation/desk_lamp.glb"
        position={[-1.08, 0.942, -1.42]}
        rotation={[0, 0.45, 0]}
        materialOverrides={lampOverrides}
      />

      {/* ── 7. Real 3D Studio Reference Monitor Speakers GLB (Kenney, CC0) ── */}
      <AtelierGLBModel
        assetPath="workstation/speaker.glb"
        position={[-1.18, 0.942, -1.24]}
        rotation={[0, 0.34, 0]}
        materialOverrides={speakerOverrides}
      />
      <AtelierGLBModel
        assetPath="workstation/speaker.glb"
        position={[1.38, 0.942, -1.24]}
        rotation={[0, -0.34, 0]}
        materialOverrides={speakerOverrides}
      />

      {/* ── 8. Real 3D Auxiliary Developer Laptop GLB (Kenney, CC0) ── */}
      <AtelierGLBModel
        assetPath="workstation/laptop.glb"
        position={[-1.06, 0.945, -1.04]}
        rotation={[0, 0.38, 0]}
        scale={0.84}
        materialOverrides={laptopOverrides}
      />

      {/* ── 9. Real 3D Ergonomic Swivel Office Chair GLB (Quaternius, CC0) ── */}
      <group ref={chairRef} position={[0.08, 0.015, -0.26]}>
        <AtelierGLBModel
          assetPath="furniture/office_chair.glb"
          materialOverrides={chairOverrides}
        />
      </group>
    </group>
  );
};
