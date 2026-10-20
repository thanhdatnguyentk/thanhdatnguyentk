import React, { useCallback, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';
import {
  AtelierGLBModel,
  type MaterialCustomization,
} from './AtelierGLBModel';

export const GPUStation: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';
  const mat = ATELIER_PALETTE[timeMode];

  const fan1Ref = useRef<THREE.Group>(null);
  const fan2Ref = useRef<THREE.Group>(null);
  const fan3Ref = useRef<THREE.Group>(null);
  const glbFanMeshesRef = useRef<THREE.Object3D[]>([]);

  // Center the local geometry pivot of Fan_1 and Fan_2 inside gpu_fan_unit.glb so they spin in place
  const handleGpuFanUnitReady = useCallback((root: THREE.Object3D) => {
    const fans: THREE.Object3D[] = [];
    root.traverse((obj) => {
      if (
        (obj as THREE.Mesh).isMesh &&
        (obj.name.includes('Fan_1') || obj.name.includes('Fan_2'))
      ) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry = mesh.geometry.clone();
        mesh.geometry.computeBoundingBox();
        const bbox = mesh.geometry.boundingBox;
        if (bbox) {
          const center = new THREE.Vector3();
          bbox.getCenter(center);
          mesh.geometry.translate(-center.x, -center.y, -center.z);
          mesh.position.add(center);
        }
        fans.push(mesh);
      }
    });
    glbFanMeshesRef.current = fans;
  }, []);

  useFrame((_, delta) => {
    const spinSpeed = delta * 9.5;
    if (fan1Ref.current) fan1Ref.current.rotation.z += spinSpeed;
    if (fan2Ref.current) fan2Ref.current.rotation.z += spinSpeed * 1.1;
    if (fan3Ref.current) fan3Ref.current.rotation.z += spinSpeed * 0.95;

    for (const fanMesh of glbFanMeshesRef.current) {
      fanMesh.rotation.y += spinSpeed;
    }
  });

  const towerOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      mat23: { color: mat.metalBrushed, roughness: 0.3, metalness: 0.74 },
      mat24: {
        color: mat.accentLavender,
        opacity: 0.24,
        transparent: true,
        roughness: 0.1,
        metalness: 0.2,
      },
      mat17: { color: mat.metalDark, roughness: 0.34, metalness: 0.68 },
      mat16: { color: mat.fabricSlate, roughness: 0.42, metalness: 0.35 },
      mat21: { color: mat.ceramicWhite, roughness: 0.3, metalness: 0.15 },
      mat3: {
        color: mat.accentCyan,
        emissive: mat.accentCyan,
        emissiveIntensity: isNight ? 0.65 : 0.25,
        roughness: 0.22,
      },
      mat8: {
        color: mat.accentLavender,
        emissive: mat.accentLavender,
        emissiveIntensity: isNight ? 0.55 : 0.2,
        roughness: 0.25,
      },
      mat9: {
        color: mat.accentLavender,
        emissive: mat.accentLavender,
        emissiveIntensity: isNight ? 0.45 : 0.15,
      },
      mat10: { color: mat.accentEmerald, roughness: 0.35 },
      mat12: {
        color: mat.accentCyan,
        emissive: mat.accentCyan,
        emissiveIntensity: isNight ? 0.5 : 0.2,
      },
      mat5: { color: mat.accentAmber, roughness: 0.28 },
    }),
    [mat, isNight]
  );

  const gpuCardOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      'Material.003': {
        color: mat.metalBrushed,
        roughness: 0.28,
        metalness: 0.75,
      },
      'Material.002': {
        color: mat.metalDark,
        roughness: 0.32,
        metalness: 0.68,
      },
      'Material.001': {
        color: mat.accentCyan,
        emissive: mat.accentCyan,
        emissiveIntensity: isNight ? 0.55 : 0.2,
      },
      'Material.005': { color: mat.accentAmber, metalness: 0.7, roughness: 0.25 },
      'Material.004': { color: mat.metalSilver, metalness: 0.8, roughness: 0.22 },
    }),
    [mat, isNight]
  );

  const renderCoolingFan = (
    ref: React.RefObject<THREE.Group | null>,
    yPos: number,
    ringColor: string
  ) => (
    <group position={[0.02, yPos, 0.415]}>
      {/* Recessed Fan Shroud Bezel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.112, 0.112, 0.015, 24, 1, true]} />
        <meshStandardMaterial
          color={mat.metalBrushed}
          metalness={0.35}
          roughness={0.28}
        />
      </mesh>
      {/* Restrained Emissive Fan Halo Ring */}
      <mesh>
        <torusGeometry args={[0.102, 0.01, 12, 28]} />
        <meshBasicMaterial color={ringColor} />
      </mesh>
      {/* Spinning Fan Rotor & Blades */}
      <group ref={ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.02, 14]} />
          <meshStandardMaterial
            color={mat.metalDark}
            metalness={0.35}
            roughness={0.3}
          />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((bIdx) => {
          const angle = (bIdx * Math.PI * 2) / 6;
          return (
            <mesh
              key={`blade-${bIdx}`}
              position={[Math.cos(angle) * 0.052, Math.sin(angle) * 0.052, 0]}
              rotation={[0.35, 0, angle]}
            >
              <boxGeometry args={[0.056, 0.018, 0.006]} />
              <meshStandardMaterial
                color={mat.metalSilver}
                metalness={0.35}
                roughness={0.25}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );

  return (
    <InteractiveObject
      id="gpu-server"
      position={[1.68, 0.76, -1.48]}
      rotation={[0, -0.18, 0]}
      ringRadius={0.5}
      ringOffset={[0, -0.73, 0]}
    >
      {/* ── 1. Real 3D Glass-Panel Gaming PC / GPU Workstation Tower GLB (Alex Safayan, CC-BY 3.0) ── */}
      <AtelierGLBModel
        assetPath="electronics/gpu_workstation.glb"
        position={[0, -0.74, 0]}
        scale={[1.04, 1.02, 0.54]}
        materialOverrides={towerOverrides}
      />

      {/* ── 2. Real 3D Dual-Fan CUDA GPU Module GLB with Spinning Fan_1 & Fan_2 Rotors (pgonarg, CC0) ── */}
      <AtelierGLBModel
        assetPath="electronics/gpu_fan_unit.glb"
        position={[-0.08, -0.12, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.88}
        materialOverrides={gpuCardOverrides}
        onSceneReady={handleGpuFanUnitReady}
      />

      {/* ── 3. Front Intake Cooling Fans (+Z bezel) ── */}
      {renderCoolingFan(fan1Ref, 0.28, mat.accentLavender)}
      {renderCoolingFan(fan2Ref, -0.02, mat.accentCyan)}
      {renderCoolingFan(fan3Ref, -0.32, mat.accentLavender)}
    </InteractiveObject>
  );
};
