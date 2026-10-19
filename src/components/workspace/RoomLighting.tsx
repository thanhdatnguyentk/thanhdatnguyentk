import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';

export const RoomLighting: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';

  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const deskLampRef = useRef<THREE.PointLight>(null);
  const monitorGlowRef = useRef<THREE.PointLight>(null);
  const gpuGlowRef = useRef<THREE.PointLight>(null);
  const galaxyGlowRef = useRef<THREE.PointLight>(null);
  const windowLightRef = useRef<THREE.SpotLight>(null);

  useFrame((_, delta) => {
    const speed = 4.5;

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.damp(
        ambientRef.current.intensity,
        isNight ? 0.52 : 1.05,
        speed,
        delta
      );
      ambientRef.current.color.lerp(
        new THREE.Color(isNight ? '#1e293b' : '#fff8ed'),
        Math.min(1, delta * speed)
      );
    }

    if (hemiRef.current) {
      hemiRef.current.intensity = THREE.MathUtils.damp(
        hemiRef.current.intensity,
        isNight ? 0.55 : 0.95,
        speed,
        delta
      );
    }

    if (dirLightRef.current) {
      dirLightRef.current.intensity = THREE.MathUtils.damp(
        dirLightRef.current.intensity,
        isNight ? 0.78 : 2.1,
        speed,
        delta
      );
      dirLightRef.current.color.lerp(
        new THREE.Color(isNight ? '#818cf8' : '#fff1d6'),
        Math.min(1, delta * speed)
      );
    }

    if (deskLampRef.current) {
      deskLampRef.current.intensity = THREE.MathUtils.damp(
        deskLampRef.current.intensity,
        isNight ? 2.4 : 0.7,
        speed,
        delta
      );
    }

    if (monitorGlowRef.current) {
      monitorGlowRef.current.intensity = THREE.MathUtils.damp(
        monitorGlowRef.current.intensity,
        isNight ? 1.65 : 0.45,
        speed,
        delta
      );
    }

    if (gpuGlowRef.current) {
      gpuGlowRef.current.intensity = THREE.MathUtils.damp(
        gpuGlowRef.current.intensity,
        isNight ? 1.5 : 0.4,
        speed,
        delta
      );
    }

    if (galaxyGlowRef.current) {
      galaxyGlowRef.current.intensity = THREE.MathUtils.damp(
        galaxyGlowRef.current.intensity,
        isNight ? 1.85 : 0.65,
        speed,
        delta
      );
    }

    if (windowLightRef.current) {
      windowLightRef.current.intensity = THREE.MathUtils.damp(
        windowLightRef.current.intensity,
        isNight ? 0.9 : 2.4,
        speed,
        delta
      );
      windowLightRef.current.color.lerp(
        new THREE.Color(isNight ? '#60a5fa' : '#fde68a'),
        Math.min(1, delta * speed)
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.55} color="#1e293b" />

      <hemisphereLight
        ref={hemiRef}
        args={[
          isNight ? '#38bdf8' : '#fffbeb',
          isNight ? '#090d16' : '#d6cfc2',
          0.6,
        ]}
      />

      {/* Primary Key / Shadow Light */}
      <directionalLight
        ref={dirLightRef}
        position={[6.5, 11.5, 6.5]}
        intensity={0.85}
        color="#818cf8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={28}
        shadow-camera-left={-4.5}
        shadow-camera-right={4.5}
        shadow-camera-top={4.5}
        shadow-camera-bottom={-4.5}
        shadow-bias={-0.0005}
      />

      {/* Window Exterior Key Spotlight */}
      <spotLight
        ref={windowLightRef}
        position={[-3.4, 2.8, 0.65]}
        angle={0.65}
        penumbra={0.8}
        distance={8}
        intensity={1.1}
        color="#60a5fa"
      />

      {/* Warm Amber Architect Desk Lamp */}
      <pointLight
        ref={deskLampRef}
        position={[-0.95, 1.82, -1.35]}
        color="#fbbf24"
        intensity={2.2}
        distance={4.5}
        decay={1.8}
      />

      {/* Ultrawide Monitor Cyan Screen Bounce Light */}
      <pointLight
        ref={monitorGlowRef}
        position={[0.15, 1.55, -0.95]}
        color="#38bdf8"
        intensity={1.5}
        distance={3.8}
        decay={2}
      />

      {/* GPU Server Rack Violet/Emerald Compute Glow */}
      <pointLight
        ref={gpuGlowRef}
        position={[1.55, 1.25, -1.2]}
        color="#a855f7"
        intensity={1.4}
        distance={3.5}
        decay={2}
      />

      {/* Milky Way Galaxy Hologram Pedestal Glow */}
      <pointLight
        ref={galaxyGlowRef}
        position={[1.38, 1.15, 0.82]}
        color="#60a5fa"
        intensity={1.7}
        distance={3.5}
        decay={2}
      />
    </>
  );
};
