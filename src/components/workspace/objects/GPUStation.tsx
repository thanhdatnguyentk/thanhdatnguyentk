import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';

export const GPUStation: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const mat = ATELIER_PALETTE[timeMode];

  const fan1Ref = useRef<THREE.Group>(null);
  const fan2Ref = useRef<THREE.Group>(null);
  const fan3Ref = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }, delta) => {
    const spinSpeed = delta * 9.5;
    if (fan1Ref.current) fan1Ref.current.rotation.z += spinSpeed;
    if (fan2Ref.current) fan2Ref.current.rotation.z += spinSpeed * 1.1;
    if (fan3Ref.current) fan3Ref.current.rotation.z += spinSpeed * 0.95;

    if (pulseRef.current) {
      const t = clock.getElapsedTime();
      pulseRef.current.opacity = 0.6 + Math.sin(t * 4.0) * 0.35;
    }
  });

  const renderCoolingFan = (
    ref: React.RefObject<THREE.Group | null>,
    yPos: number,
    ringColor: string
  ) => (
    <group position={[0, yPos, 0.365]}>
      {/* Recessed Fan Shroud Bezel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.015, 24, 1, true]} />
        <meshStandardMaterial color={mat.metalBrushed} metalness={0.75} roughness={0.28} />
      </mesh>
      {/* Glowing Fan Halo Ring */}
      <mesh>
        <torusGeometry args={[0.118, 0.013, 12, 28]} />
        <meshBasicMaterial color={ringColor} />
      </mesh>
      {/* Spinning Fan Rotor & Blades */}
      <group ref={ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.022, 14]} />
          <meshStandardMaterial color={mat.metalDark} metalness={0.7} roughness={0.3} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((bIdx) => {
          const angle = (bIdx * Math.PI * 2) / 6;
          return (
            <mesh
              key={`blade-${bIdx}`}
              position={[Math.cos(angle) * 0.062, Math.sin(angle) * 0.062, 0]}
              rotation={[0.35, 0, angle]}
            >
              <boxGeometry args={[0.066, 0.022, 0.006]} />
              <meshStandardMaterial color={mat.metalSilver} metalness={0.55} roughness={0.25} />
            </mesh>
          );
        })}
      </group>
    </group>
  );

  return (
    <InteractiveObject
      id="gpu-server"
      position={[1.68, 0.76, -1.48]}
      rotation={[0, -0.18, 0]}
      ringRadius={0.5}
      ringOffset={[0, -0.73, 0]}
    >
      {/* ── Outer Brushed Aluminum Server Chassis (Readable Gunmetal, never crushed black) ── */}
      <RoundedBox
        args={[0.7, 1.48, 0.74]}
        radius={0.035}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={mat.metalBrushed}
          roughness={0.3}
          metalness={0.74}
        />
      </RoundedBox>

      {/* Top Wood-Inlay Handle & Perforated Vent Grill */}
      <RoundedBox
        args={[0.58, 0.035, 0.58]}
        radius={0.01}
        position={[0, 0.75, 0]}
        castShadow
      >
        <meshStandardMaterial color={mat.woodWarm} roughness={0.42} />
      </RoundedBox>

      {/* Interior Dark Backplane Cavern (Visible through side glass) */}
      <mesh position={[-0.04, 0, 0]}>
        <boxGeometry args={[0.62, 1.34, 0.62]} />
        <meshStandardMaterial color="#101829" roughness={0.48} />
      </mesh>

      {/* Vertical Liquid-Cooling Manifold Tubes Inside Chassis */}
      {[-0.18, 0.18].map((zTube, tIdx) => (
        <mesh key={`tube-${tIdx}`} position={[-0.24, 0, zTube]}>
          <cylinderGeometry args={[0.014, 0.014, 1.24, 12]} />
          <meshBasicMaterial
            color={tIdx === 0 ? mat.accentCyan : mat.accentLavender}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}

      {/* 4 Horizontal CUDA / JavaTorch Tensor Compute Blades */}
      {[-0.42, -0.14, 0.14, 0.42].map((yPos, idx) => (
        <group key={`gpu-blade-${idx}`} position={[-0.06, yPos, 0]}>
          <RoundedBox args={[0.56, 0.165, 0.54]} radius={0.014} castShadow>
            <meshStandardMaterial
              color={mat.metalDark}
              metalness={0.72}
              roughness={0.28}
            />
          </RoundedBox>
          {/* Glowing Lavender / Cyan Tensor Core Bus Bar */}
          <mesh position={[-0.286, 0, 0]}>
            <boxGeometry args={[0.018, 0.042, 0.48]} />
            <meshBasicMaterial
              ref={idx === 0 ? pulseRef : undefined}
              color={idx % 2 === 0 ? mat.accentLavender : mat.accentCyan}
              transparent
              opacity={0.92}
            />
          </mesh>
          {/* Status Telemetry LEDs */}
          {[-0.18, -0.12, -0.06].map((zLed, lIdx) => (
            <mesh key={`led-${lIdx}`} position={[-0.288, 0.048, zLed]}>
              <sphereGeometry args={[0.013, 8, 8]} />
              <meshBasicMaterial
                color={lIdx === 0 ? mat.accentEmerald : mat.accentAmber}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Tempered Glass Side Panel (Facing Viewer on -X side) */}
      <mesh position={[-0.354, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.64, 1.36]} />
        <meshPhysicalMaterial
          color={mat.accentLavender}
          transparent
          opacity={0.2}
          roughness={0.08}
          metalness={0.18}
        />
      </mesh>

      {/* 3 Spinning Front Intake Cooling Fans (+Z face) */}
      {renderCoolingFan(fan1Ref, 0.36, mat.accentLavender)}
      {renderCoolingFan(fan2Ref, 0.0, mat.accentCyan)}
      {renderCoolingFan(fan3Ref, -0.36, mat.accentLavender)}

      {/* Top Telemetry Status Header Strip */}
      <mesh position={[0, 0.66, 0.372]}>
        <boxGeometry args={[0.54, 0.062, 0.012]} />
        <meshBasicMaterial color={mat.accentCyan} />
      </mesh>
    </InteractiveObject>
  );
};
