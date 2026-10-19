import React, { useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneObjectId } from './data/cameraPresets';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';
import { getSceneObject } from './data/sceneObjects';

interface InteractiveObjectProps {
  id: SceneObjectId;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  hoverLift?: number;
  ringRadius?: number;
  ringOffset?: [number, number, number];
  children: React.ReactNode;
}

export const InteractiveObject: React.FC<InteractiveObjectProps> = ({
  id,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  hoverLift = 0.035,
  ringRadius = 0.36,
  ringOffset = [0, 0.02, 0],
  children,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);

  const selectedObject = useWorkspaceStore((s) => s.selectedObject);
  const hoveredObject = useWorkspaceStore((s) => s.hoveredObject);
  const selectObject = useWorkspaceStore((s) => s.selectObject);
  const hoverObject = useWorkspaceStore((s) => s.hoverObject);

  const isSelected = selectedObject === id;
  const isHovered = hoveredObject === id || localHover;
  const meta = getSceneObject(id);
  const accentColor = meta?.accentColor ?? '#38bdf8';

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetY =
      position[1] + (isSelected ? hoverLift * 1.35 : isHovered ? hoverLift : 0);
    const targetScale = scale * (isSelected ? 1.035 : isHovered ? 1.02 : 1);

    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      10,
      delta
    );
    const nextScale = THREE.MathUtils.damp(
      groupRef.current.scale.x,
      targetScale,
      10,
      delta
    );
    groupRef.current.scale.setScalar(nextScale);

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.9;
    }
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setLocalHover(true);
    hoverObject(id);
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setLocalHover(false);
    if (useWorkspaceStore.getState().hoveredObject === id) {
      hoverObject(null);
    }
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'auto';
    }
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectObject(isSelected ? null : id);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {children}

      {/* Subtle Selection / Hover Holographic Ring Indicator */}
      {(isHovered || isSelected) && (
        <mesh
          ref={ringRef}
          position={ringOffset}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[ringRadius * 0.84, ringRadius, 32]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={isSelected ? 0.85 : 0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};
