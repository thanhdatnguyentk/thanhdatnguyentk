import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { InteractiveObject } from '../InteractiveObject';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';
import {
  AtelierGLBModel,
  type MaterialCustomization,
} from './AtelierGLBModel';

export const Bookshelf: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';
  const mat = ATELIER_PALETTE[timeMode];

  const shelfOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      mat20: { color: mat.woodWarm, roughness: 0.42, metalness: 0.08 },
      mat23: { color: mat.woodTrim, roughness: 0.46, metalness: 0.14 },
      mat19: { color: mat.accentAmber, roughness: 0.36, metalness: 0.12 },
      mat22: { color: mat.accentLavender, roughness: 0.42, metalness: 0.12 },
      mat21: { color: mat.ceramicWhite, roughness: 0.34, metalness: 0.08 },
      mat17: { color: mat.fabricSlate, roughness: 0.42, metalness: 0.18 },
      mat18: {
        color: mat.accentCyan,
        emissive: mat.accentCyan,
        emissiveIntensity: isNight ? 0.3 : 0.08,
        roughness: 0.28,
      },
    }),
    [mat, isNight]
  );

  const bookStackOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      carpetDarker: { color: mat.accentLavender, roughness: 0.42 },
      carpetWhite: { color: mat.ceramicWhite, roughness: 0.38 },
      plant: { color: mat.accentEmerald, roughness: 0.42 },
      metal: { color: mat.accentCyan, roughness: 0.32 },
    }),
    [mat]
  );

  const plantOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      Black: { color: mat.ceramicWhite, roughness: 0.32, metalness: 0.08 },
      Brown: { color: mat.woodTrim, roughness: 0.82, metalness: 0.04 },
      Plant_Green: {
        color: mat.foliagePrimary,
        roughness: 0.48,
        metalness: 0.05,
      },
    }),
    [mat]
  );

  return (
    <group name="atelier-bookshelf-and-plants">
      <InteractiveObject
        id="bookshelf"
        position={[-1.84, 1.02, -1.18]}
        ringRadius={0.5}
        ringOffset={[0.05, -0.98, 0]}
      >
        {/* ── 1. Real 3D Modern Architectural Bookshelf & Books GLB (Wanja Pflüger, CC-BY 3.0) ── */}
        <AtelierGLBModel
          assetPath="furniture/bookshelf.glb"
          position={[0, -1.01, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[0.72, 1.0, 0.58]}
          materialOverrides={shelfOverrides}
        />

        {/* ── 2. Real 3D Technical Reference Book Stack GLB (Kenney, CC0) ── */}
        <AtelierGLBModel
          assetPath="props/book_stack.glb"
          position={[0.06, 0.97, 0.04]}
          rotation={[0, Math.PI / 2, 0]}
          scale={1.18}
          materialOverrides={bookStackOverrides}
        />

        {/* ── 3. Real 3D Potted Shelf Plant GLB on Top Shelf (Quaternius, CC0) ── */}
        <AtelierGLBModel
          assetPath="props/houseplant_small.glb"
          position={[0.02, 0.96, -0.28]}
          scale={0.92}
          materialOverrides={plantOverrides}
        />

        {/* Glowing Neural Tensor Cube Trophy on Top Shelf */}
        <group position={[0.02, 1.06, 0.32]} rotation={[0.3, 0.5, 0.2]}>
          <RoundedBox args={[0.135, 0.135, 0.135]} radius={0.022}>
            <meshStandardMaterial
              color={mat.accentCyan}
              emissive="#0284c7"
              emissiveIntensity={isNight ? 0.75 : 0.3}
              metalness={0.32}
              roughness={0.22}
            />
          </RoundedBox>
        </group>
      </InteractiveObject>
    </group>
  );
};
