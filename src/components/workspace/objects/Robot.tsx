import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';

export const Robot: React.FC = () => {
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
    // Periodic friendly eye blink
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
        <cylinderGeometry args={[0.12, 0.135, 0.022, 24]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.022, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.085, 0.105, 24]} />
        <meshBasicMaterial color="#34d399" side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Companion Droid Body (DatBot-01) */}
      <group ref={floatRef}>
        {/* Lower Torso Pod */}
        <RoundedBox
          args={[0.16, 0.14, 0.14]}
          radius={0.045}
          position={[0, 0.07, 0]}
          castShadow
        >
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.25}
            metalness={0.15}
          />
        </RoundedBox>

        {/* Chest Core Indicator (RAG Vector Pulse) */}
        <mesh position={[0, 0.07, 0.072]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>

        {/* Articulated Head & Visor */}
        <group ref={headRef} position={[0, 0.21, 0]}>
          <RoundedBox
            args={[0.21, 0.15, 0.16]}
            radius={0.05}
            castShadow
          >
            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.22}
              metalness={0.15}
            />
          </RoundedBox>

          {/* Glossy Black Face Visor */}
          <RoundedBox
            args={[0.175, 0.1, 0.02]}
            radius={0.025}
            position={[0, 0.005, 0.075]}
          >
            <meshStandardMaterial
              color="#020617"
              roughness={0.1}
              metalness={0.8}
            />
          </RoundedBox>

          {/* Expressive Glowing Cyan/Emerald Eyes */}
          <mesh ref={leftEyeRef} position={[-0.042, 0.008, 0.088]}>
            <capsuleGeometry args={[0.014, 0.014, 8, 12]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.042, 0.008, 0.088]}>
            <capsuleGeometry args={[0.014, 0.014, 8, 12]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>

          {/* Top Telemetry Antenna */}
          <mesh position={[0.05, 0.1, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.06, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} />
          </mesh>
          <mesh position={[0.05, 0.135, 0]}>
            <sphereGeometry args={[0.014, 10, 10]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
        </group>
      </group>
    </InteractiveObject>
  );
};
