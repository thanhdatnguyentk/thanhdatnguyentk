import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';
import {
  AtelierGLBModel,
  type MaterialCustomization,
} from './AtelierGLBModel';

export const Robot: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';
  const mat = ATELIER_PALETTE[timeMode];
  const selectedObject = useWorkspaceStore((s) => s.selectedObject);
  const hoveredObject = useWorkspaceStore((s) => s.hoveredObject);
  const isEngaged =
    selectedObject === 'ai-robot' || hoveredObject === 'ai-robot';

  const pivotRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});

  const robotOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      Grey: {
        color: mat.ceramicWhite,
        roughness: 0.24,
        metalness: 0.18,
      },
      Main: {
        color: mat.accentCyan,
        emissive: mat.accentCyan,
        emissiveIntensity: isNight ? 0.35 : 0.12,
        roughness: 0.22,
        metalness: 0.35,
      },
      Black: {
        color: '#0d1422',
        roughness: 0.12,
        metalness: 0.78,
      },
    }),
    [mat, isNight]
  );

  const handleRobotReady = useCallback(
    (root: THREE.Object3D, animations: THREE.AnimationClip[]) => {
      if (!animations || animations.length === 0) return;
      const mixer = new THREE.AnimationMixer(root);
      mixerRef.current = mixer;
      const acts: Record<string, THREE.AnimationAction> = {};
      animations.forEach((clip) => {
        acts[clip.name] = mixer.clipAction(clip);
      });
      actionsRef.current = acts;

      // Start Idle animation clip by default
      const idleClip =
        acts['RobotArmature|Robot_Idle'] ??
        acts['Idle'] ??
        Object.values(acts)[0];
      if (idleClip) {
        idleClip.reset().fadeIn(0.25).play();
      }
    },
    []
  );

  // Switch between Wave / ThumbsUp and Idle when user hovers or selects DatBot-01
  useEffect(() => {
    const acts = actionsRef.current;
    const idleClip = acts['RobotArmature|Robot_Idle'] ?? acts['Idle'];
    const waveClip =
      acts['RobotArmature|Robot_Wave'] ??
      acts['Wave'] ??
      acts['RobotArmature|Robot_ThumbsUp'];

    if (!idleClip || !waveClip) return;
    if (isEngaged) {
      idleClip.fadeOut(0.25);
      waveClip.reset().fadeIn(0.25).play();
    } else {
      waveClip.fadeOut(0.25);
      idleClip.reset().fadeIn(0.25).play();
    }
  }, [isEngaged]);

  useFrame(({ clock, pointer }, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    const t = clock.getElapsedTime();
    if (pivotRef.current) {
      pivotRef.current.rotation.y = THREE.MathUtils.lerp(
        pivotRef.current.rotation.y,
        pointer.x * 0.28 + Math.sin(t * 1.1) * 0.08,
        0.08
      );
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
      <mesh position={[0, -0.055, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.145, 0.022, 24]} />
        <meshStandardMaterial
          color={mat.metalBrushed}
          metalness={0.72}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[0, -0.042, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.09, 0.114, 24]} />
        <meshBasicMaterial color={mat.accentEmerald} side={THREE.DoubleSide} />
      </mesh>

      {/* Real 3D Expressive Animated Companion Robot GLB (Tomás Laulhé / Quaternius, CC0) */}
      <group ref={pivotRef} position={[0, -0.042, 0]}>
        <AtelierGLBModel
          assetPath="robot/datbot.glb"
          skinned
          scale={0.82}
          materialOverrides={robotOverrides}
          onSceneReady={handleRobotReady}
        />
      </group>
    </InteractiveObject>
  );
};
