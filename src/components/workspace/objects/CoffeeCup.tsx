import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';

export const CoffeeCup: React.FC = () => {
  const steam1Ref = useRef<THREE.Mesh>(null);
  const steam2Ref = useRef<THREE.Mesh>(null);
  const steam3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const animateSteam = (
      mesh: THREE.Mesh | null,
      phase: number,
      xBase: number
    ) => {
      if (!mesh) return;
      const progress = (t * 0.55 + phase) % 1;
      mesh.position.y = 0.08 + progress * 0.16;
      mesh.position.x = xBase + Math.sin(t * 2.5 + phase * 4) * 0.012;
      mesh.scale.setScalar(0.65 + progress * 0.65);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(progress * Math.PI) * 0.42;
    };

    animateSteam(steam1Ref.current, 0.0, -0.01);
    animateSteam(steam2Ref.current, 0.33, 0.012);
    animateSteam(steam3Ref.current, 0.66, 0.0);
  });

  return (
    <InteractiveObject
      id="coffee-mug"
      position={[-0.24, 0.99, -0.82]}
      ringRadius={0.14}
      ringOffset={[0, -0.02, 0]}
    >
      {/* Cork Coaster */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <cylinderGeometry args={[0.062, 0.062, 0.008, 20]} />
        <meshStandardMaterial color="#b45309" roughness={0.85} />
      </mesh>

      {/* Ceramic Mug Body */}
      <mesh position={[0, 0.028, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.044, 0.038, 0.09, 20]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.25} />
      </mesh>

      {/* Mug Handle */}
      <mesh position={[0.044, 0.028, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.024, 0.006, 10, 20, Math.PI]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.25} />
      </mesh>

      {/* Dark Espresso Surface */}
      <mesh position={[0, 0.068, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.039, 20]} />
        <meshStandardMaterial color="#3b1d0a" roughness={0.2} />
      </mesh>

      {/* Rising Animated 3D Steam Puffs */}
      <mesh ref={steam1Ref} position={[-0.01, 0.1, 0]}>
        <sphereGeometry args={[0.014, 10, 10]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.35} />
      </mesh>
      <mesh ref={steam2Ref} position={[0.012, 0.14, 0]}>
        <sphereGeometry args={[0.016, 10, 10]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.3} />
      </mesh>
      <mesh ref={steam3Ref} position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.018, 10, 10]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.25} />
      </mesh>
    </InteractiveObject>
  );
};
