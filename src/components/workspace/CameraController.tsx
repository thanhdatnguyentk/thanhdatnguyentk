import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import {
  ATELIER_DESKTOP_OFFSET,
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

  const isDesktop = size.width >= 1024;
  const isTablet = size.width >= 768 && size.width < 1024;

  // Responsive scale tuned so the miniature room occupies 65–75% of the composition on desktop
  // and fits cleanly on tablet (768x1024) and mobile (390x844) without clipping.
  const responsiveScale = isDesktop
    ? Math.min(1.14, Math.max(0.92, Math.min(size.width / 1420, size.height / 860)))
    : isTablet
    ? Math.min(0.84, Math.max(0.68, size.width / 1020))
    : Math.min(0.56, Math.max(0.42, size.width / 820));

  useFrame((state, delta) => {
    const preset = selectedObject
      ? OBJECT_CAMERA_PRESETS[selectedObject]
      : DEFAULT_CAMERA_PRESET;

    const dampSpeed = reducedMotion ? 18 : selectedObject ? 4.2 : 3.2;

    // Gentle pointer parallax when in default overview mode
    const parallaxX =
      !selectedObject && !reducedMotion ? state.pointer.x * 0.16 : 0;
    const parallaxY =
      !selectedObject && !reducedMotion ? state.pointer.y * 0.1 : 0;

    // Apply asymmetric editorial offset on desktop when in overview mode so
    // the 3D room sits toward the center-right and balances the left typography.
    const offsetX =
      !selectedObject && isDesktop ? ATELIER_DESKTOP_OFFSET[0] : 0;
    const offsetY =
      !selectedObject && isDesktop
        ? ATELIER_DESKTOP_OFFSET[1]
        : !selectedObject && !isDesktop
        ? -0.15
        : 0;
    const offsetZ =
      !selectedObject && isDesktop ? ATELIER_DESKTOP_OFFSET[2] : 0;

    if (selectedObject) {
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
    }

    if (controlsRef.current) {
      const targetX = preset.target[0] + offsetX + parallaxX * 0.14;
      const targetY = preset.target[1] + offsetY + parallaxY * 0.1;
      const targetZ = preset.target[2] + offsetZ - parallaxX * 0.14;

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
      minZoom={56}
      maxZoom={280}
      minPolarAngle={Math.PI / 5.8}
      maxPolarAngle={Math.PI / 2.32}
      minAzimuthAngle={-Math.PI / 14}
      maxAzimuthAngle={Math.PI / 2 + Math.PI / 14}
      target={DEFAULT_CAMERA_PRESET.target}
    />
  );
};
