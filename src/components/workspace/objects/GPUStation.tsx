import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';

export const GPUStation: React.FC = () => {
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
      pulseRef.current.opacity = 0.55 + Math.sin(t * 4.0) * 0.35;
    }
  });

  const renderCoolingFan = (
    ref: React.RefObject<THREE.Group | null>,
    yPos: number,
    ringColor: string
  ) => (
    <group position={[0, yPos, 0.36]}>
      {/* Glowing RGB Fan Ring */}
      <mesh>
        <torusGeometry args={[0.115, 0.012, 12, 28]} />
        <meshBasicMaterial color={ringColor} />
      </mesh>
      {/* Spinning Fan Rotor & Blades */}
      <group ref={ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.02, 14]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((bIdx) => {
          const angle = (bIdx * Math.PI * 2) / 6;
          return (
            <mesh
              key={`blade-${bIdx}`}
              position={[Math.cos(angle) * 0.062, Math.sin(angle) * 0.062, 0]}
              rotation={[0.35, 0, angle]}
            >
              <boxGeometry args={[0.065, 0.022, 0.006]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
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
      {/* ── Outer Anodized Aluminum Server Chassis ── */}
      <RoundedBox
        args={[0.68, 1.46, 0.72]}
        radius={0.03}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.32}
          metalness={0.78}
        />
      </RoundedBox>

      {/* Interior Dark Backplane Cavern (Visible through side glass) */}
      <mesh position={[-0.04, 0, 0]}>
        <boxGeometry args={[0.62, 1.32, 0.62]} />
        <meshStandardMaterial color="#060913" roughness={0.5} />
      </mesh>

      {/* 4 Horizontal CUDA / JavaTorch Tensor Compute Blades */}
      {[-0.42, -0.14, 0.14, 0.42].map((yPos, idx) => (
        <group key={`gpu-blade-${idx}`} position={[-0.06, yPos, 0]}>
          <RoundedBox args={[0.56, 0.16, 0.54]} radius={0.012} castShadow>
            <meshStandardMaterial
              color="#1e293b"
              metalness={0.7}
              roughness={0.3}
            />
          </RoundedBox>
          {/* Glowing Violet / Cyan Tensor Core Bus Bar */}
          <mesh position={[-0.285, 0, 0]}>
            <boxGeometry args={[0.015, 0.038, 0.46]} />
            <meshBasicMaterial
              ref={idx === 0 ? pulseRef : undefined}
              color={idx % 2 === 0 ? '#a855f7' : '#22d3ee'}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Status Telemetry LEDs */}
          {[-0.18, -0.12, -0.06].map((zLed, lIdx) => (
            <mesh key={`led-${lIdx}`} position={[-0.285, 0.045, zLed]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshBasicMaterial
                color={lIdx === 0 ? '#22c55e' : '#38bdf8'}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Tempered Glass Side Panel (Facing Viewer on -X side) */}
      <mesh position={[-0.345, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.64, 1.36]} />
        <meshPhysicalMaterial
          color="#a855f7"
          transparent
          opacity={0.18}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* 3 Spinning Front Intake Cooling Fans (+Z face) */}
      {renderCoolingFan(fan1Ref, 0.36, '#a855f7')}
      {renderCoolingFan(fan2Ref, 0.0, '#22d3ee')}
      {renderCoolingFan(fan3Ref, -0.36, '#a855f7')}

      {/* Top Telemetry Status Header Strip */}
      <mesh position={[0, 0.66, 0.362]}>
        <boxGeometry args={[0.52, 0.06, 0.01]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>
    </InteractiveObject>
  );
};
