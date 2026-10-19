import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';

/**
 * 5-Light Architectural Studio Hierarchy for "THE AI ENGINEER'S ATELIER"
 * Calibrated for ACESFilmicToneMapping so both Night Lab and Studio Daylight
 * preserve rich wood, slate, and architectural wall tones without clipping.
 */
export const RoomLighting: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';

  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.SpotLight>(null);
  const windowLightRef = useRef<THREE.SpotLight>(null);
  const gpuGlowRef = useRef<THREE.PointLight>(null);
  const hologramGlowRef = useRef<THREE.PointLight>(null);

  const colorHelper = useRef(new THREE.Color());
  const groundHelper = useRef(new THREE.Color());

  useFrame((_, delta) => {
    const dampSpeed = 5.0;

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.damp(
        ambientRef.current.intensity,
        isNight ? 0.44 : 0.28,
        dampSpeed,
        delta
      );
      colorHelper.current.set(isNight ? '#1e2b45' : '#f5ebe0');
      ambientRef.current.color.lerp(colorHelper.current, delta * 5);
    }

    if (hemiRef.current) {
      hemiRef.current.intensity = THREE.MathUtils.damp(
        hemiRef.current.intensity,
        isNight ? 0.48 : 0.34,
        dampSpeed,
        delta
      );
      colorHelper.current.set(isNight ? '#7ddcf7' : '#fff7ed');
      groundHelper.current.set(isNight ? '#1c2536' : '#8c7355');
      hemiRef.current.color.lerp(colorHelper.current, delta * 5);
      hemiRef.current.groundColor.lerp(groundHelper.current, delta * 5);
    }

    if (keyLightRef.current) {
      keyLightRef.current.intensity = THREE.MathUtils.damp(
        keyLightRef.current.intensity,
        isNight ? 1.05 : 0.78,
        dampSpeed,
        delta
      );
      colorHelper.current.set(isNight ? '#e2e8f0' : '#fffbeb');
      keyLightRef.current.color.lerp(colorHelper.current, delta * 5);
    }

    if (fillLightRef.current) {
      fillLightRef.current.intensity = THREE.MathUtils.damp(
        fillLightRef.current.intensity,
        isNight ? 0.92 : 0.32,
        dampSpeed,
        delta
      );
      colorHelper.current.set(isNight ? '#ffc992' : '#fde68a');
      fillLightRef.current.color.lerp(colorHelper.current, delta * 5);
    }

    if (rimLightRef.current) {
      rimLightRef.current.intensity = THREE.MathUtils.damp(
        rimLightRef.current.intensity,
        isNight ? 0.85 : 0.3,
        dampSpeed,
        delta
      );
      colorHelper.current.set(isNight ? '#7ddcf7' : '#bae6fd');
      rimLightRef.current.color.lerp(colorHelper.current, delta * 5);
    }

    if (windowLightRef.current) {
      windowLightRef.current.intensity = THREE.MathUtils.damp(
        windowLightRef.current.intensity,
        isNight ? 0.65 : 0.52,
        dampSpeed,
        delta
      );
      colorHelper.current.set(isNight ? '#7ddcf7' : '#fcd34d');
      windowLightRef.current.color.lerp(colorHelper.current, delta * 5);
    }

    if (gpuGlowRef.current) {
      gpuGlowRef.current.intensity = THREE.MathUtils.damp(
        gpuGlowRef.current.intensity,
        isNight ? 1.15 : 0.35,
        dampSpeed,
        delta
      );
    }

    if (hologramGlowRef.current) {
      hologramGlowRef.current.intensity = THREE.MathUtils.damp(
        hologramGlowRef.current.intensity,
        isNight ? 1.1 : 0.4,
        dampSpeed,
        delta
      );
    }
  });

  return (
    <group name="atelier-lighting">
      {/* 1. Studio Ambient Base */}
      <ambientLight
        ref={ambientRef}
        intensity={isNight ? 0.44 : 0.28}
        color={isNight ? '#1e2b45' : '#f5ebe0'}
      />

      {/* 2. Sky-to-Floor Hemisphere Fill */}
      <hemisphereLight
        ref={hemiRef}
        args={[
          isNight ? '#7ddcf7' : '#fff7ed',
          isNight ? '#1c2536' : '#8c7355',
          isNight ? 0.48 : 0.34,
        ]}
        position={[0, 6, 0]}
      />

      {/* 3. Main Architectural Key Light (Casts crisp soft diorama shadows) */}
      <directionalLight
        ref={keyLightRef}
        position={[6.2, 9.5, 5.4]}
        intensity={isNight ? 1.05 : 0.78}
        color={isNight ? '#e2e8f0' : '#fffbeb'}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-4.2}
        shadow-camera-right={4.2}
        shadow-camera-top={4.2}
        shadow-camera-bottom={-4.2}
        shadow-bias={-0.0005}
      />

      {/* 4. Warm Interior Fill Light (Balances cool monitors & illuminates wood/walls) */}
      <pointLight
        ref={fillLightRef}
        position={[-0.5, 2.1, -0.4]}
        intensity={isNight ? 0.92 : 0.32}
        distance={6.5}
        decay={1.6}
        color={isNight ? '#ffc992' : '#fde68a'}
      />

      {/* 5. Back-Right Rim Light (Separates cutaway walls and server rack from background) */}
      <spotLight
        ref={rimLightRef}
        position={[3.8, 5.2, -3.6]}
        angle={0.75}
        penumbra={0.9}
        intensity={isNight ? 0.85 : 0.3}
        distance={12}
        color={isNight ? '#7ddcf7' : '#bae6fd'}
      />

      {/* Window Daylight / Moonlight Beam */}
      <spotLight
        ref={windowLightRef}
        position={[-3.4, 3.0, 0.9]}
        angle={0.68}
        penumbra={0.85}
        intensity={isNight ? 0.65 : 0.52}
        distance={8.5}
        color={isNight ? '#7ddcf7' : '#fcd34d'}
      />

      {/* Practical Light: GPU Compute Station Lavender/Cyan Glow */}
      <pointLight
        ref={gpuGlowRef}
        position={[1.55, 1.15, -1.25]}
        intensity={isNight ? 1.15 : 0.35}
        distance={3.5}
        decay={2}
        color="#ac98ff"
      />

      {/* Practical Light: Milky Way Hologram Table Glow */}
      <pointLight
        ref={hologramGlowRef}
        position={[1.35, 0.95, 0.85]}
        intensity={isNight ? 1.1 : 0.4}
        distance={3.4}
        decay={2}
        color="#7ddcf7"
      />
    </group>
  );
};
