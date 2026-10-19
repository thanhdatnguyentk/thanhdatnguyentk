import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';

export const RoomShell: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';

  // Procedural LAB-01 Header Sign Texture
  const labSignTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, 512, 128);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, 496, 112);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 34px monospace';
      ctx.fillText('DAT.AI // LAB-01', 28, 58);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '20px monospace';
      ctx.fillText('VISION · RAG · GPU COMPUTE · ASTROPHYSICS', 28, 96);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const wallMainColor = isNight ? '#161f33' : '#ebe4d8';
  const wallTrimColor = isNight ? '#0f172a' : '#d6cbb9';
  const floorBaseColor = isNight ? '#111827' : '#d4c5b0';
  const plankColorA = isNight ? '#1e293b' : '#c7a983';
  const plankColorB = isNight ? '#192335' : '#be9d76';

  return (
    <group name="room-shell">
      {/* ── Architectural Cutaway Foundation Slab ── */}
      <RoundedBox
        args={[4.76, 0.28, 4.76]}
        radius={0.05}
        smoothness={4}
        position={[0, -0.15, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color={isNight ? '#0b0f1a' : '#334155'}
          roughness={0.7}
          metalness={0.2}
        />
      </RoundedBox>

      {/* Subtle Glowing Rim around Diorama Base */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[4.78, 0.018, 4.78]} />
        <meshBasicMaterial
          color={isNight ? '#22d3ee' : '#d97706'}
          transparent
          opacity={isNight ? 0.55 : 0.35}
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
          color={floorBaseColor}
          roughness={0.65}
          metalness={0.08}
        />
      </mesh>

      {/* Stylized Hardwood Floor Planks */}
      {Array.from({ length: 14 }).map((_, i) => {
        const zPos = -2.08 + i * 0.32;
        return (
          <mesh
            key={`plank-${i}`}
            position={[0, 0.006, zPos]}
            receiveShadow
          >
            <boxGeometry args={[4.48, 0.008, 0.295]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? plankColorA : plankColorB}
              roughness={0.58}
              metalness={0.06}
            />
          </mesh>
        );
      })}

      {/* Under-Desk Woven Studio Rug */}
      <RoundedBox
        args={[2.65, 0.02, 1.85]}
        radius={0.01}
        smoothness={2}
        position={[0.12, 0.014, -0.58]}
        receiveShadow
      >
        <meshStandardMaterial
          color={isNight ? '#1e2b45' : '#cbd5e1'}
          roughness={0.92}
        />
      </RoundedBox>
      <RoundedBox
        args={[2.45, 0.022, 1.65]}
        radius={0.008}
        smoothness={2}
        position={[0.12, 0.016, -0.58]}
        receiveShadow
      >
        <meshStandardMaterial
          color={isNight ? '#0f172a' : '#94a3b8'}
          roughness={0.9}
        />
      </RoundedBox>

      {/* ── Back Cutaway Wall (Z = -2.22) ── */}
      <RoundedBox
        args={[4.72, 3.25, 0.22]}
        radius={0.04}
        smoothness={4}
        position={[0, 1.5, -2.25]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={wallMainColor}
          roughness={0.78}
          metalness={0.05}
        />
      </RoundedBox>

      {/* Acoustic Wood Slat Accent Panel on Back-Left Wall */}
      <group position={[-1.45, 1.55, -2.12]}>
        {Array.from({ length: 11 }).map((_, idx) => (
          <mesh
            key={`slat-${idx}`}
            position={[-0.45 + idx * 0.09, 0, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.055, 2.85, 0.04]} />
            <meshStandardMaterial
              color={isNight ? '#78350f' : '#b45309'}
              roughness={0.55}
            />
          </mesh>
        ))}
      </group>

      {/* ── Left Cutaway Wall (X = -2.25) with Window Cutout ── */}
      {/* Bottom Wall Section below Window */}
      <RoundedBox
        args={[0.22, 1.05, 4.52]}
        radius={0.03}
        smoothness={3}
        position={[-2.25, 0.52, 0.08]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={wallMainColor} roughness={0.78} />
      </RoundedBox>

      {/* Top Wall Header above Window */}
      <RoundedBox
        args={[0.22, 0.55, 4.52]}
        radius={0.03}
        smoothness={3}
        position={[-2.25, 2.85, 0.08]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={wallMainColor} roughness={0.78} />
      </RoundedBox>

      {/* Back Pillar of Left Wall (behind Window) */}
      <RoundedBox
        args={[0.22, 1.65, 2.05]}
        radius={0.03}
        smoothness={3}
        position={[-2.25, 1.82, -1.15]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={wallMainColor} roughness={0.78} />
      </RoundedBox>

      {/* Front Pillar of Left Wall (in front of Window) */}
      <RoundedBox
        args={[0.22, 1.65, 0.92]}
        radius={0.03}
        smoothness={3}
        position={[-2.25, 1.82, 1.88]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={wallMainColor} roughness={0.78} />
      </RoundedBox>

      {/* ── Architectural Window & Dynamic Day/Night Sky Diorama (Z = 0.65) ── */}
      <group position={[-2.16, 1.82, 0.65]}>
        {/* Outer Frame & Sill */}
        <mesh position={[0.04, -0.78, 0]} castShadow>
          <boxGeometry args={[0.24, 0.06, 1.62]} />
          <meshStandardMaterial color={wallTrimColor} roughness={0.5} />
        </mesh>
        <mesh position={[0.02, 0.78, 0]}>
          <boxGeometry args={[0.18, 0.05, 1.6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        {/* Window Mullion Bars */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.06, 1.52, 0.04]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0.02, 0.15, 0]}>
          <boxGeometry args={[0.05, 0.04, 1.52]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>

        {/* Exterior Sky Backdrop Plane */}
        <mesh position={[-0.06, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.52, 1.52]} />
          <meshBasicMaterial
            color={isNight ? '#070b19' : '#bae6fd'}
          />
        </mesh>

        {/* Celestial Body: Crescent Moon (Night) or Warm Sun (Day) */}
        <mesh
          position={[-0.04, isNight ? 0.42 : 0.38, isNight ? 0.35 : -0.28]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <circleGeometry args={[isNight ? 0.16 : 0.22, 32]} />
          <meshBasicMaterial
            color={isNight ? '#fef08a' : '#f59e0b'}
          />
        </mesh>

        {/* Night Stars in Window */}
        {isNight &&
          [
            [-0.45, 0.48],
            [-0.2, 0.55],
            [0.1, 0.32],
            [0.48, 0.22],
            [-0.38, -0.1],
            [0.25, 0.58],
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
          [-0.52, -0.45, 0.22, 0.55],
          [-0.25, -0.38, 0.26, 0.68],
          [0.05, -0.48, 0.24, 0.48],
          [0.36, -0.35, 0.28, 0.72],
        ].map(([zOff, yOff, w, h], idx) => (
          <mesh
            key={`bldg-${idx}`}
            position={[-0.03, yOff, zOff]}
          >
            <boxGeometry args={[0.02, h, w]} />
            <meshBasicMaterial
              color={isNight ? '#111c38' : '#64748b'}
            />
          </mesh>
        ))}

        {/* Glass Pane with Subtle Reflection */}
        <mesh position={[0.03, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshPhysicalMaterial
            color={isNight ? '#38bdf8' : '#fef3c7'}
            transparent
            opacity={0.14}
            roughness={0.1}
            metalness={0.1}
            transmission={0.6}
          />
        </mesh>
      </group>

      {/* Baseboard Trims along Back and Left Walls */}
      <mesh position={[0.08, 0.08, -2.12]}>
        <boxGeometry args={[4.45, 0.14, 0.04]} />
        <meshStandardMaterial color={wallTrimColor} roughness={0.6} />
      </mesh>
      <mesh position={[-2.12, 0.08, 0.08]}>
        <boxGeometry args={[0.04, 0.14, 4.45]} />
        <meshStandardMaterial color={wallTrimColor} roughness={0.6} />
      </mesh>

      {/* Top LED Cove Lighting Strip on Back Wall */}
      <mesh position={[0.1, 2.98, -2.11]}>
        <boxGeometry args={[4.2, 0.035, 0.04]} />
        <meshBasicMaterial
          color={isNight ? '#38bdf8' : '#fbbf24'}
        />
      </mesh>

      {/* Lab Identifier Badge on Back Wall Top-Right */}
      <group position={[1.48, 2.68, -2.11]}>
        <RoundedBox args={[1.15, 0.28, 0.04]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#090d16" roughness={0.3} metalness={0.5} />
        </RoundedBox>
        {labSignTexture && (
          <mesh position={[0, 0, 0.024]}>
            <planeGeometry args={[1.1, 0.25]} />
            <meshBasicMaterial map={labSignTexture} />
          </mesh>
        )}
      </group>

      {/* Potted Floor Monstera / Palm Plant in Front-Left Corner */}
      <group position={[-1.72, 0.02, 1.65]}>
        {/* Ceramic Planter Pot */}
        <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.24, 0.18, 0.46, 20]} />
          <meshStandardMaterial
            color={isNight ? '#334155' : '#f8fafc'}
            roughness={0.45}
          />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 16]} />
          <meshStandardMaterial color="#292524" roughness={0.9} />
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
            <sphereGeometry args={[0.17, 14, 10]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#10b981' : '#059669'}
              roughness={0.55}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
