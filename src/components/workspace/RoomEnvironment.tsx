import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';

export const RoomEnvironment: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';
  const dustRef = useRef<THREE.Points>(null);

  // Subtle floating laboratory atmospheric motes
  const dustPositions = useMemo(() => {
    const count = 75;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4.0;
      arr[i * 3 + 1] = 0.25 + Math.random() * 2.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (dustRef.current) {
      const t = clock.getElapsedTime();
      dustRef.current.rotation.y = t * 0.03;
      dustRef.current.position.y = Math.sin(t * 0.6) * 0.04;
    }
  });

  return (
    <group name="room-environment">
      {/* Grounded Miniature Diorama Contact Shadows */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={isNight ? 0.58 : 0.42}
        scale={6.5}
        blur={2.1}
        far={3.5}
        resolution={512}
        color={isNight ? '#020617' : '#334155'}
      />

      {/* Atmospheric Laboratory Motes */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color={isNight ? '#38bdf8' : '#f59e0b'}
          transparent
          opacity={isNight ? 0.42 : 0.28}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
