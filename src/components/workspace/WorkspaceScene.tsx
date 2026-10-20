import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { RoomLighting } from './RoomLighting';
import { RoomEnvironment } from './RoomEnvironment';
import { CameraController } from './CameraController';
import { RoomShell } from './objects/RoomShell';
import { Desk } from './objects/Desk';
import { MonitorsAndDisplays } from './objects/Monitor';
import { GPUStation } from './objects/GPUStation';
import { GalaxyHologram } from './objects/GalaxyHologram';
import { Robot } from './objects/Robot';
import { Bookshelf } from './objects/Bookshelf';
import { Whiteboard } from './objects/Whiteboard';
import { CoffeeCup } from './objects/CoffeeCup';
import { preloadPrimaryAtelierAssets } from './objects/AtelierGLBModel';
import { SCENE_OBJECTS } from './data/sceneObjects';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';

interface WorkspaceSceneProps {
  reducedMotion: boolean;
}

export const WorkspaceScene: React.FC<WorkspaceSceneProps> = ({
  reducedMotion,
}) => {
  const dioramaRef = useRef<THREE.Group>(null);
  const lang = useWorkspaceStore((s) => s.lang);
  const selectedObject = useWorkspaceStore((s) => s.selectedObject);
  const hoveredObject = useWorkspaceStore((s) => s.hoveredObject);
  const selectObject = useWorkspaceStore((s) => s.selectObject);
  const hoverObject = useWorkspaceStore((s) => s.hoverObject);

  useEffect(() => {
    preloadPrimaryAtelierAssets();
  }, []);

  // Subtle interactive stations with clean beacon indicators (NO overlapping text labels by default)
  const beaconStations = SCENE_OBJECTS.filter((s) =>
    [
      'video-monitor',
      'galaxy-hologram',
      'gpu-server',
      'ai-robot',
      'cctv-display',
      'finance-display',
      'main-monitor',
      'whiteboard',
    ].includes(s.id)
  );

  // Subtle initial diorama entrance settle
  useFrame((_, delta) => {
    if (!dioramaRef.current) return;
    dioramaRef.current.position.y = THREE.MathUtils.damp(
      dioramaRef.current.position.y,
      -0.18,
      4.5,
      delta
    );
  });

  return (
    <>
      <RoomLighting />
      <CameraController reducedMotion={reducedMotion} />

      <group ref={dioramaRef} position={[0, -0.35, 0]}>
        <RoomEnvironment />
        <RoomShell />
        <Desk />
        <MonitorsAndDisplays />
        <GPUStation />
        <GalaxyHologram />
        <Robot />
        <Bookshelf />
        <Whiteboard />
        <CoffeeCup />

        {/* Subtle Diegetic 3D Beacon Indicators (Clean pulsing nodes, tooltip only on hover) */}
        {beaconStations.map((station) => {
          const isSelected = selectedObject === station.id;
          const isHovered = hoveredObject === station.id;
          const isDimmed = Boolean(selectedObject && !isSelected);
          return (
            <Html
              key={station.id}
              position={station.hotspotPosition}
              center
              zIndexRange={[8, 0]}
            >
              <button
                type="button"
                className={`ws-beacon-node ${
                  isSelected || isHovered ? 'is-active' : ''
                } ${isDimmed ? 'is-dimmed' : ''}`}
                style={{ ['--beacon-color' as string]: station.accentColor }}
                onMouseEnter={() => hoverObject(station.id)}
                onMouseLeave={() => hoverObject(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  selectObject(isSelected ? null : station.id);
                }}
                aria-label={station.label[lang]}
              >
                <span className="ws-beacon-pulse" />
                <span className="ws-beacon-core" />
                {(isHovered || isSelected) && (
                  <span className="ws-beacon-tooltip">
                    {station.shortHint[lang]}
                  </span>
                )}
              </button>
            </Html>
          );
        })}
      </group>
    </>
  );
};
