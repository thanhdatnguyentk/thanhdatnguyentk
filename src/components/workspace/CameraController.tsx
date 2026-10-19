import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import {
  DEFAULT_CAMERA_PRESET,
  OBJECT_CAMERA_PRESETS,
} from './data/cameraPresets';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';

interface CameraControllerProps {
  reducedMotion: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  reducedMotion,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera, size } = useThree();
  const selectedObject = useWorkspaceStore((s) => s.selectedObject);

  // Responsive zoom factor so the miniature room fits both desktop and mobile viewports
  const responsiveScale = Math.min(
    1.12,
    Math.max(0.64, Math.min(size.width / 680, size.height / 560))
  );

  useFrame((state, delta) => {
    const preset = selectedObject
      ? OBJECT_CAMERA_PRESETS[selectedObject]
      : DEFAULT_CAMERA_PRESET;

    const dampSpeed = reducedMotion ? 18 : selectedObject ? 4.2 : 3.2;

    // Gentle pointer parallax when in default overview mode
    const parallaxX =
      !selectedObject && !reducedMotion ? state.pointer.x * 0.22 : 0;
    const parallaxY =
      !selectedObject && !reducedMotion ? state.pointer.y * 0.14 : 0;

    if (selectedObject) {
      // Smoothly move camera toward focused station preset
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        preset.position[0],
        dampSpeed,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        preset.position[1],
        dampSpeed,
        delta
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        preset.position[2],
        dampSpeed,
        delta
      );
    } else if (controlsRef.current) {
      // Subtle target parallax in overview
      const targetX = preset.target[0] + parallaxX * 0.18;
      const targetY = preset.target[1] + parallaxY * 0.12;
      const targetZ = preset.target[2] - parallaxX * 0.18;

      controlsRef.current.target.x = THREE.MathUtils.damp(
        controlsRef.current.target.x,
        targetX,
        dampSpeed,
        delta
      );
      controlsRef.current.target.y = THREE.MathUtils.damp(
        controlsRef.current.target.y,
        targetY,
        dampSpeed,
        delta
      );
      controlsRef.current.target.z = THREE.MathUtils.damp(
        controlsRef.current.target.z,
        targetZ,
        dampSpeed,
        delta
      );
    }

    if (controlsRef.current && selectedObject) {
      controlsRef.current.target.x = THREE.MathUtils.damp(
        controlsRef.current.target.x,
        preset.target[0],
        dampSpeed,
        delta
      );
      controlsRef.current.target.y = THREE.MathUtils.damp(
        controlsRef.current.target.y,
        preset.target[1],
        dampSpeed,
        delta
      );
      controlsRef.current.target.z = THREE.MathUtils.damp(
        controlsRef.current.target.z,
        preset.target[2],
        dampSpeed,
        delta
      );
    }

    // Smoothly interpolate orthographic zoom
    const targetZoom = preset.zoom * responsiveScale;
    if (Math.abs(camera.zoom - targetZoom) > 0.05) {
      camera.zoom = THREE.MathUtils.damp(
        camera.zoom,
        targetZoom,
        dampSpeed,
        delta
      );
      camera.updateProjectionMatrix();
    }

    controlsRef.current?.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.07}
      enablePan={false}
      enableZoom={true}
      minZoom={52}
      maxZoom={175}
      minPolarAngle={Math.PI / 6.2}
      maxPolarAngle={Math.PI / 2.28}
      minAzimuthAngle={-Math.PI / 12}
      maxAzimuthAngle={Math.PI / 2 + Math.PI / 12}
      target={DEFAULT_CAMERA_PRESET.target}
    />
  );
};
