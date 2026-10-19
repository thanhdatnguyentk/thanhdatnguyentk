import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';

export const RoomShell: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';
  const mat = ATELIER_PALETTE[timeMode];

  // Procedural ATELIER // LAB-01 Header Sign Texture
  const labSignTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0d1422';
      ctx.fillRect(0, 0, 512, 128);
      ctx.strokeStyle = '#7ddcf7';
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, 496, 112);

      ctx.fillStyle = '#7ddcf7';
      ctx.font = 'bold 32px monospace';
      ctx.fillText('ATELIER // DAT.AI LAB', 26, 56);

      ctx.fillStyle = '#ffc992';
      ctx.font = '20px monospace';
      ctx.fillText('VISION · RAG · CUDA · ASTROPHYSICS', 26, 94);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <group name="room-shell">
      {/* ── Architectural Multi-Tiered Diorama Plinth Base ── */}
      {/* Lower Stepped Plinth Pedestal */}
      <RoundedBox
        args={[4.96, 0.16, 4.96]}
        radius={0.05}
        smoothness={4}
        position={[0, -0.28, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color={mat.plinthLower}
          roughness={0.62}
          metalness={0.28}
        />
      </RoundedBox>

      {/* Upper Chamfered Foundation Slab */}
      <RoundedBox
        args={[4.78, 0.24, 4.78]}
        radius={0.045}
        smoothness={4}
        position={[0, -0.13, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color={mat.plinthUpper}
          roughness={0.55}
          metalness={0.22}
        />
      </RoundedBox>

      {/* Luminous Architectural Plinth Accent Seam */}
      <mesh position={[0, -0.015, 0]}>
        <boxGeometry args={[4.81, 0.022, 4.81]} />
        <meshBasicMaterial
          color={mat.plinthRim}
          transparent
          opacity={isNight ? 0.72 : 0.48}
        />
      </mesh>

      {/* Main Interior Floor Surface */}
      <mesh
        position={[0, 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[4.52, 4.52]} />
        <meshStandardMaterial
          color={mat.floorBase}
          roughness={0.58}
          metalness={0.08}
        />
      </mesh>

      {/* Handcrafted Warm Timber Floor Planks */}
      {Array.from({ length: 14 }).map((_, i) => {
        const zPos = -2.08 + i * 0.32;
        return (
          <mesh
            key={`plank-${i}`}
            position={[0, 0.006, zPos]}
            receiveShadow
          >
            <boxGeometry args={[4.48, 0.009, 0.298]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? mat.plankA : mat.plankB}
              roughness={0.52}
              metalness={0.06}
            />
          </mesh>
        );
      })}

      {/* Layered Woven Atelier Studio Rug under Desk & Chair */}
      <RoundedBox
        args={[2.78, 0.022, 1.98]}
        radius={0.012}
        smoothness={2}
        position={[0.14, 0.014, -0.54]}
        receiveShadow
      >
        <meshStandardMaterial color={mat.rugOuter} roughness={0.88} />
      </RoundedBox>
      <RoundedBox
        args={[2.54, 0.025, 1.74]}
        radius={0.01}
        smoothness={2}
        position={[0.14, 0.017, -0.54]}
        receiveShadow
      >
        <meshStandardMaterial color={mat.rugInner} roughness={0.85} />
      </RoundedBox>

      {/* ── Back Cutaway Wall (Z = -2.25) with Top Architectural Cap ── */}
      <RoundedBox
        args={[4.74, 3.26, 0.24]}
        radius={0.04}
        smoothness={4}
        position={[0, 1.5, -2.25]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={mat.wallMain}
          roughness={0.72}
          metalness={0.06}
        />
      </RoundedBox>

      {/* Top Cutaway Trim Cap on Back Wall */}
      <RoundedBox
        args={[4.76, 0.06, 0.26]}
        radius={0.015}
        position={[0, 3.14, -2.25]}
      >
        <meshStandardMaterial
          color={mat.wallTrim}
          roughness={0.5}
          metalness={0.15}
        />
      </RoundedBox>

      {/* Acoustic Warm Walnut Slat Panel on Back-Left Wall */}
      <group position={[-1.46, 1.56, -2.11]}>
        {/* Recessed Backboard */}
        <mesh position={[0, 0, -0.015]}>
          <boxGeometry args={[1.08, 2.88, 0.02]} />
          <meshStandardMaterial color={mat.wallTrim} roughness={0.7} />
        </mesh>
        {Array.from({ length: 11 }).map((_, idx) => (
          <mesh
            key={`slat-${idx}`}
            position={[-0.45 + idx * 0.09, 0, 0.01]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.056, 2.86, 0.042]} />
            <meshStandardMaterial
              color={mat.woodSlat}
              roughness={0.48}
              metalness={0.08}
            />
          </mesh>
        ))}
      </group>

      {/* ── Left Cutaway Wall (X = -2.25) with Window Cutout ── */}
      {/* Bottom Wall Section below Window */}
      <RoundedBox
        args={[0.24, 1.06, 4.54]}
        radius={0.03}
        smoothness={3}
        position={[-2.25, 0.52, 0.08]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={mat.wallMain} roughness={0.72} />
      </RoundedBox>

      {/* Top Wall Header above Window */}
      <RoundedBox
        args={[0.24, 0.56, 4.54]}
        radius={0.03}
        smoothness={3}
        position={[-2.25, 2.85, 0.08]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={mat.wallMain} roughness={0.72} />
      </RoundedBox>

      {/* Top Cutaway Trim Cap on Left Wall */}
      <RoundedBox
        args={[0.26, 0.06, 4.56]}
        radius={0.015}
        position={[-2.25, 3.14, 0.08]}
      >
        <meshStandardMaterial
          color={mat.wallTrim}
          roughness={0.5}
          metalness={0.15}
        />
      </RoundedBox>

      {/* Back Pillar of Left Wall (behind Window) */}
      <RoundedBox
        args={[0.24, 1.65, 2.06]}
        radius={0.03}
        smoothness={3}
        position={[-2.25, 1.82, -1.15]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={mat.wallMain} roughness={0.72} />
      </RoundedBox>

      {/* Front Pillar of Left Wall (in front of Window) */}
      <RoundedBox
        args={[0.24, 1.65, 0.94]}
        radius={0.03}
        smoothness={3}
        position={[-2.25, 1.82, 1.88]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={mat.wallMain} roughness={0.72} />
      </RoundedBox>

      {/* ── Architectural Window & Dynamic Day/Night Sky Diorama (Z = 0.65) ── */}
      <group position={[-2.15, 1.82, 0.65]}>
        {/* Warm Timber Interior Window Sill */}
        <RoundedBox
          args={[0.28, 0.065, 1.68]}
          radius={0.012}
          position={[0.05, -0.78, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={mat.woodWarm} roughness={0.45} />
        </RoundedBox>

        {/* Outer Anodized Window Frame */}
        <mesh position={[0.02, 0.78, 0]}>
          <boxGeometry args={[0.2, 0.055, 1.62]} />
          <meshStandardMaterial color={mat.metalDark} roughness={0.35} metalness={0.6} />
        </mesh>

        {/* Window Mullion Bars */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.06, 1.52, 0.042]} />
          <meshStandardMaterial color={mat.metalDark} roughness={0.35} metalness={0.6} />
        </mesh>
        <mesh position={[0.02, 0.16, 0]}>
          <boxGeometry args={[0.05, 0.042, 1.52]} />
          <meshStandardMaterial color={mat.metalDark} roughness={0.35} metalness={0.6} />
        </mesh>

        {/* Subtle Top Venetian Blind Valance Slats */}
        {[0.64, 0.56, 0.48].map((by, bIdx) => (
          <mesh
            key={`blind-${bIdx}`}
            position={[0.05, by, 0]}
            rotation={[0, 0, 0.25]}
          >
            <boxGeometry args={[0.04, 0.012, 1.48]} />
            <meshStandardMaterial color={mat.woodTrim} roughness={0.5} />
          </mesh>
        ))}

        {/* Exterior Sky Backdrop Plane */}
        <mesh position={[-0.06, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.52, 1.52]} />
          <meshBasicMaterial
            color={isNight ? '#0d182e' : '#bae6fd'}
          />
        </mesh>

        {/* Celestial Body: Luminous Moon (Night) or Golden Sun (Day) */}
        <mesh
          position={[-0.04, isNight ? 0.36 : 0.34, isNight ? 0.34 : -0.28]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <circleGeometry args={[isNight ? 0.17 : 0.23, 32]} />
          <meshBasicMaterial
            color={isNight ? '#fef08a' : '#f59e0b'}
          />
        </mesh>

        {/* Night Stars in Window */}
        {isNight &&
          [
            [-0.45, 0.38],
            [-0.2, 0.42],
            [0.1, 0.3],
            [0.48, 0.22],
            [-0.38, -0.08],
            [0.25, 0.44],
          ].map(([sz, sy], idx) => (
            <mesh
              key={`star-${idx}`}
              position={[-0.04, sy, sz]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <circleGeometry args={[0.018, 12]} />
              <meshBasicMaterial color="#e0f2fe" />
            </mesh>
          ))}

        {/* Distant Skyline Silhouette in Window */}
        {[
          [-0.52, -0.45, 0.22, 0.56],
          [-0.25, -0.38, 0.26, 0.68],
          [0.05, -0.48, 0.24, 0.48],
          [0.36, -0.35, 0.28, 0.72],
        ].map(([zOff, yOff, w, h], idx) => (
          <mesh key={`bldg-${idx}`} position={[-0.03, yOff, zOff]}>
            <boxGeometry args={[0.02, h, w]} />
            <meshBasicMaterial
              color={isNight ? '#1b2a4a' : '#64748b'}
            />
          </mesh>
        ))}

        {/* Glass Pane with Subtle Reflection */}
        <mesh position={[0.03, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshPhysicalMaterial
            color={isNight ? '#7ddcf7' : '#fef3c7'}
            transparent
            opacity={0.16}
            roughness={0.1}
            metalness={0.1}
            transmission={0.6}
          />
        </mesh>

        {/* Soft Volumetric Window Light Shaft Entering the Atelier */}
        <mesh
          position={[0.62, -0.32, 0]}
          rotation={[0, 0, -0.42]}
        >
          <planeGeometry args={[1.35, 1.42]} />
          <meshBasicMaterial
            color={isNight ? '#7ddcf7' : '#fde68a'}
            transparent
            opacity={isNight ? 0.045 : 0.085}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Baseboard Trims along Back and Left Walls */}
      <mesh position={[0.08, 0.08, -2.11]}>
        <boxGeometry args={[4.46, 0.14, 0.045]} />
        <meshStandardMaterial color={mat.wallTrim} roughness={0.55} />
      </mesh>
      <mesh position={[-2.11, 0.08, 0.08]}>
        <boxGeometry args={[0.045, 0.14, 4.46]} />
        <meshStandardMaterial color={mat.wallTrim} roughness={0.55} />
      </mesh>

      {/* Top Architectural Cove Lighting Strip on Back Wall */}
      <mesh position={[0.1, 2.98, -2.1]}>
        <boxGeometry args={[4.25, 0.04, 0.045]} />
        <meshBasicMaterial
          color={isNight ? mat.accentCyan : mat.accentAmber}
        />
      </mesh>

      {/* Lab Identifier Badge on Back Wall Top-Right */}
      <group position={[1.48, 2.68, -2.1]}>
        <RoundedBox args={[1.18, 0.3, 0.045]} radius={0.02} smoothness={2}>
          <meshStandardMaterial
            color="#0d1422"
            roughness={0.3}
            metalness={0.55}
          />
        </RoundedBox>
        {labSignTexture && (
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[1.12, 0.26]} />
            <meshBasicMaterial map={labSignTexture} />
          </mesh>
        )}
      </group>

      {/* Framed Architectural Research Print on Left Wall Rear Pillar */}
      <group position={[-2.11, 1.92, -1.52]} rotation={[0, Math.PI / 2, 0]}>
        <RoundedBox args={[0.62, 0.78, 0.03]} radius={0.01} castShadow>
          <meshStandardMaterial color={mat.metalDark} roughness={0.4} metalness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[0.54, 0.7]} />
          <meshStandardMaterial color={isNight ? '#182338' : '#f8fafc'} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.04, 0.021]}>
          <ringGeometry args={[0.11, 0.16, 24]} />
          <meshBasicMaterial color={mat.accentCyan} />
        </mesh>
      </group>

      {/* Potted Floor Monstera / Palm Plant in Front-Left Corner */}
      <group position={[-1.72, 0.02, 1.65]}>
        {/* Ceramic Planter Pot with Wood Stand Rim */}
        <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.19, 0.46, 22]} />
          <meshStandardMaterial
            color={mat.ceramicWhite}
            roughness={0.35}
            metalness={0.08}
          />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.23, 0.23, 0.04, 16]} />
          <meshStandardMaterial color="#3b281e" roughness={0.9} />
        </mesh>
        {/* Lush Foliage Leaves */}
        {[
          [0, 0.68, 0, 0.2, 0, 0.1],
          [0.14, 0.62, 0.1, -0.35, 0.6, -0.3],
          [-0.14, 0.64, 0.08, -0.3, -0.5, 0.35],
          [0.08, 0.72, -0.14, 0.4, 0.3, -0.2],
          [-0.1, 0.58, -0.12, 0.35, -0.4, 0.25],
        ].map(([x, y, z, rx, ry, rz], idx) => (
          <mesh
            key={`leaf-${idx}`}
            position={[x, y, z]}
            rotation={[rx, ry, rz]}
            castShadow
          >
            <sphereGeometry args={[0.175, 14, 10]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? mat.foliagePrimary : mat.foliageSecondary}
              roughness={0.48}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
