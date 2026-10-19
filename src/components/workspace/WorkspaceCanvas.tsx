import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { DEFAULT_CAMERA_PRESET } from './data/cameraPresets';
import { WorkspaceScene } from './WorkspaceScene';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';

interface WorkspaceCanvasProps {
  reducedMotion: boolean;
}

export const WorkspaceCanvas: React.FC<WorkspaceCanvasProps> = ({
  reducedMotion,
}) => {
  const selectObject = useWorkspaceStore((s) => s.selectObject);

  return (
    <div className="workspace-3d-canvas-wrap">
      <Canvas
        orthographic
        shadows
        dpr={[1, 2]}
        camera={{
          position: DEFAULT_CAMERA_PRESET.position,
          zoom: DEFAULT_CAMERA_PRESET.zoom,
          near: -30,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
        }}
        onPointerMissed={() => selectObject(null)}
      >
        <Suspense fallback={null}>
          <WorkspaceScene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};
