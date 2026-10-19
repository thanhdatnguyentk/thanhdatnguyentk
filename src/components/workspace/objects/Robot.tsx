import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';

export const Robot: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const mat = ATELIER_PALETTE[timeMode];

  const floatRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (floatRef.current) {
      floatRef.current.position.y = Math.sin(t * 2.8) * 0.028;
    }
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        pointer.x * 0.35 + Math.sin(t * 1.4) * 0.12,
        0.08
      );
      headRef.current.rotation.z = Math.sin(t * 1.9) * 0.05;
    }
    const blink = Math.sin(t * 1.7) > 0.96 ? 0.15 : 1.0;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = blink;
      rightEyeRef.current.scale.y = blink;
    }
  });

  return (
    <InteractiveObject
      id="ai-robot"
      position={[0.64, 1.02, -0.86]}
      rotation={[0, -0.28, 0]}
      ringRadius={0.22}
      ringOffset={[0, -0.05, 0]}
    >
      {/* Charging Pad Base on Desk */}
      <mesh position={[0, -0.035, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.125, 0.14, 0.024, 24]} />
        <meshStandardMaterial
          color={mat.metalBrushed}
          metalness={0.72}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[0, -0.021, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.085, 0.108, 24]} />
        <meshBasicMaterial color={mat.accentEmerald} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Companion Droid Body (DatBot-01) */}
      <group ref={floatRef}>
        {/* Lower Torso Pod */}
        <RoundedBox
          args={[0.165, 0.145, 0.145]}
          radius={0.048}
          position={[0, 0.072, 0]}
          castShadow
        >
          <meshStandardMaterial
            color={mat.ceramicWhite}
            roughness={0.24}
            metalness={0.14}
          />
        </RoundedBox>

        {/* Chest Core Indicator (RAG Vector Pulse) */}
        <mesh position={[0, 0.072, 0.074]}>
          <circleGeometry args={[0.026, 16]} />
          <meshBasicMaterial color={mat.accentEmerald} />
        </mesh>

        {/* Articulated Head & Visor */}
        <group ref={headRef} position={[0, 0.215, 0]}>
          <RoundedBox
            args={[0.215, 0.155, 0.165]}
            radius={0.052}
            castShadow
          >
            <meshStandardMaterial
              color={mat.ceramicWhite}
              roughness={0.22}
              metalness={0.14}
            />
          </RoundedBox>

          {/* Glossy Face Visor */}
          <RoundedBox
            args={[0.178, 0.102, 0.022]}
            radius={0.026}
            position={[0, 0.005, 0.076]}
          >
            <meshStandardMaterial
              color="#0d1422"
              roughness={0.1}
              metalness={0.8}
            />
          </RoundedBox>

          {/* Expressive Glowing Cyan Eyes */}
          <mesh ref={leftEyeRef} position={[-0.042, 0.008, 0.089]}>
            <capsuleGeometry args={[0.014, 0.014, 8, 12]} />
            <meshBasicMaterial color={mat.accentCyan} />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.042, 0.008, 0.089]}>
            <capsuleGeometry args={[0.014, 0.014, 8, 12]} />
            <meshBasicMaterial color={mat.accentCyan} />
          </mesh>

          {/* Side Ear Cups */}
          {[-0.11, 0.11].map((ex, eIdx) => (
            <mesh
              key={`ear-${eIdx}`}
              position={[ex, 0.005, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.028, 0.028, 0.016, 14]} />
              <meshStandardMaterial color={mat.accentCyan} metalness={0.6} roughness={0.25} />
            </mesh>
          ))}

          {/* Top Telemetry Antenna */}
          <mesh position={[0.05, 0.105, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.06, 8]} />
            <meshStandardMaterial color={mat.metalSilver} metalness={0.8} />
          </mesh>
          <mesh position={[0.05, 0.14, 0]}>
            <sphereGeometry args={[0.015, 10, 10]} />
            <meshBasicMaterial color={mat.accentEmerald} />
          </mesh>
        </group>
      </group>
    </InteractiveObject>
  );
};
