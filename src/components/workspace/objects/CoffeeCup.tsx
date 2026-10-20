import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';
import {
  AtelierGLBModel,
  type MaterialCustomization,
} from './AtelierGLBModel';

export const CoffeeCup: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const mat = ATELIER_PALETTE[timeMode];

  const steam1Ref = useRef<THREE.Mesh>(null);
  const steam2Ref = useRef<THREE.Mesh>(null);
  const steam3Ref = useRef<THREE.Mesh>(null);

  const mugOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      _defaultMat: {
        color: mat.ceramicWhite,
        roughness: 0.24,
        metalness: 0.08,
      },
      brownDarkest: {
        color: '#3b1d0a',
        roughness: 0.16,
        metalness: 0.1,
      },
    }),
    [mat]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const animateSteam = (
      mesh: THREE.Mesh | null,
      phase: number,
      xBase: number
    ) => {
      if (!mesh) return;
      const progress = (t * 0.55 + phase) % 1;
      mesh.position.y = 0.085 + progress * 0.16;
      mesh.position.x = xBase + Math.sin(t * 2.5 + phase * 4) * 0.012;
      mesh.scale.setScalar(0.65 + progress * 0.65);
      const steamMat = mesh.material as THREE.MeshBasicMaterial;
      steamMat.opacity = Math.sin(progress * Math.PI) * 0.42;
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
      <mesh position={[0, -0.028, 0]} receiveShadow>
        <cylinderGeometry args={[0.068, 0.068, 0.008, 20]} />
        <meshStandardMaterial color="#b45309" roughness={0.85} />
      </mesh>

      {/* Real 3D Ceramic Coffee Mug GLB (Kenney, CC0) */}
      <AtelierGLBModel
        assetPath="props/coffee_mug.glb"
        position={[0, -0.024, 0]}
        scale={0.78}
        materialOverrides={mugOverrides}
      />

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
