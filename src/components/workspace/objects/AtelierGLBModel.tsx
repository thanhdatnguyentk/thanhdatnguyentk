import React, { Suspense, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';

/**
 * Resolves a local 3D asset path under `public/assets/3d/...` while respecting
 * the repository's Astro `base` configuration (`/thanhdatnguyentk`).
 */
export function resolveAsset3DUrl(assetPath: string): string {
  const rawBase =
    typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL
      ? import.meta.env.BASE_URL
      : '/thanhdatnguyentk';
  const cleanBase = rawBase.replace(/\/$/, '');
  const cleanAsset = assetPath.replace(/^\/+/, '');
  if (cleanAsset.startsWith('assets/3d/')) {
    return `${cleanBase}/${cleanAsset}`;
  }
  return `${cleanBase}/assets/3d/${cleanAsset}`;
}

export interface MaterialCustomization {
  color?: string;
  roughness?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  opacity?: number;
  transparent?: boolean;
}

export interface AtelierGLBModelProps {
  /** Path relative to `public/assets/3d/`, e.g. `"workstation/desk.glb"` */
  assetPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  /** Set true for rigged/skinned models like `robot/datbot.glb` */
  skinned?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  /** Optional per-material-name PBR overrides for runtime Day/Night synchronization */
  materialOverrides?: Record<string, MaterialCustomization>;
  /** Callback invoked with the cloned scene root and GLTF animation clips */
  onSceneReady?: (
    root: THREE.Object3D,
    animations: THREE.AnimationClip[]
  ) => void;
  fallback?: React.ReactNode;
}

const LoadedGLBInstance: React.FC<
  Omit<AtelierGLBModelProps, 'fallback'>
> = ({
  assetPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  skinned = false,
  castShadow = true,
  receiveShadow = true,
  materialOverrides,
  onSceneReady,
}) => {
  const url = useMemo(() => resolveAsset3DUrl(assetPath), [assetPath]);
  const gltf = useGLTF(url);

  const clonedScene = useMemo(() => {
    const root = skinned
      ? SkeletonUtils.clone(gltf.scene)
      : gltf.scene.clone(true);

    root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = castShadow;
        mesh.receiveShadow = receiveShadow;
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => m.clone());
        } else if (mesh.material) {
          mesh.material = mesh.material.clone();
        }
      }
    });

    return root;
  }, [gltf.scene, skinned, castShadow, receiveShadow]);

  // Synchronize runtime material customizations (e.g. Day/Night mode transitions)
  useEffect(() => {
    if (!materialOverrides) return;
    clonedScene.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      const mats = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      mats.forEach((mat) => {
        if (!mat || !(mat as THREE.MeshStandardMaterial).isMeshStandardMaterial)
          return;
        const stdMat = mat as THREE.MeshStandardMaterial;
        const spec =
          materialOverrides[stdMat.name] ?? materialOverrides['*'];
        if (!spec) return;

        if (spec.color) {
          stdMat.color.set(spec.color);
        }
        if (typeof spec.roughness === 'number') {
          stdMat.roughness = Math.max(0.22, spec.roughness);
        }
        if (typeof spec.metalness === 'number') {
          stdMat.metalness = Math.min(0.36, spec.metalness);
        } else {
          stdMat.metalness = Math.min(0.36, stdMat.metalness);
        }
        if (spec.emissive) {
          stdMat.emissive.set(spec.emissive);
        }
        if (typeof spec.emissiveIntensity === 'number') {
          stdMat.emissiveIntensity = spec.emissiveIntensity;
        }
        if (typeof spec.opacity === 'number') {
          stdMat.opacity = spec.opacity;
        }
        if (typeof spec.transparent === 'boolean') {
          stdMat.transparent = spec.transparent;
        }
        stdMat.needsUpdate = true;
      });
    });
  }, [clonedScene, materialOverrides]);

  useEffect(() => {
    if (onSceneReady) {
      onSceneReady(clonedScene, gltf.animations ?? []);
    }
  }, [clonedScene, gltf.animations, onSceneReady]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

export const AtelierGLBModel: React.FC<AtelierGLBModelProps> = ({
  fallback = null,
  ...props
}) => {
  return (
    <Suspense fallback={fallback}>
      <LoadedGLBInstance {...props} />
    </Suspense>
  );
};

/**
 * Preload primary focal workstation & character GLB assets for rapid initial scene display.
 */
export function preloadPrimaryAtelierAssets(): void {
  const corePaths = [
    'workstation/desk.glb',
    'workstation/monitor.glb',
    'workstation/monitor_ultrawide.glb',
    'workstation/keyboard.glb',
    'workstation/mouse.glb',
    'workstation/desk_lamp.glb',
    'furniture/office_chair.glb',
    'electronics/gpu_workstation.glb',
    'electronics/gpu_fan_unit.glb',
    'robot/datbot.glb',
  ];
  corePaths.forEach((p) => {
    try {
      useGLTF.preload(resolveAsset3DUrl(p));
    } catch {
      // Ignore preload errors in SSR/non-browser environments
    }
  });
}
