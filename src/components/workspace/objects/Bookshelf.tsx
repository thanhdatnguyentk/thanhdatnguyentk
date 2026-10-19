import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { InteractiveObject } from '../InteractiveObject';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';

export const Bookshelf: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const mat = ATELIER_PALETTE[timeMode];

  const bookSpines: Array<{
    shelfY: number;
    zOffset: number;
    height: number;
    color: string;
    tilt?: number;
  }> = [
    // Shelf 1 (Top Tech Books)
    { shelfY: 0.42, zOffset: -0.34, height: 0.24, color: '#7ddcf7' },
    { shelfY: 0.42, zOffset: -0.28, height: 0.26, color: '#fb7185' },
    { shelfY: 0.42, zOffset: -0.22, height: 0.23, color: '#ac98ff' },
    { shelfY: 0.42, zOffset: -0.16, height: 0.25, color: '#34d399' },
    { shelfY: 0.42, zOffset: -0.09, height: 0.24, color: '#ffc992', tilt: 0.14 },

    // Shelf 2 (Deep Learning & CUDA Volumes)
    { shelfY: -0.02, zOffset: -0.34, height: 0.26, color: '#60a5fa' },
    { shelfY: -0.02, zOffset: -0.28, height: 0.27, color: '#f472b6' },
    { shelfY: -0.02, zOffset: -0.22, height: 0.24, color: '#2dd4bf' },
    { shelfY: -0.02, zOffset: -0.16, height: 0.26, color: '#fde047' },
    { shelfY: -0.02, zOffset: 0.12, height: 0.25, color: '#818cf8' },
    { shelfY: -0.02, zOffset: 0.18, height: 0.23, color: '#34d399' },
    { shelfY: -0.02, zOffset: 0.24, height: 0.25, color: '#ffc992' },

    // Shelf 3 (Systems & Math)
    { shelfY: -0.46, zOffset: -0.32, height: 0.27, color: '#64748b' },
    { shelfY: -0.46, zOffset: -0.25, height: 0.27, color: '#3b4c6b' },
    { shelfY: -0.46, zOffset: -0.18, height: 0.25, color: '#38bdf8' },
    { shelfY: -0.46, zOffset: -0.11, height: 0.26, color: '#a78bfa' },
  ];

  return (
    <InteractiveObject
      id="bookshelf"
      position={[-1.84, 1.02, -1.16]}
      ringRadius={0.5}
      ringOffset={[0.05, -0.98, 0]}
    >
      {/* Brushed Steel Frame Uprights */}
      {[-0.45, 0.45].map((zPos, zIdx) =>
        [-0.18, 0.18].map((xPos, xIdx) => (
          <mesh
            key={`post-${zIdx}-${xIdx}`}
            position={[xPos, 0, zPos]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.038, 1.98, 0.038]} />
            <meshStandardMaterial
              color={mat.metalBrushed}
              metalness={0.72}
              roughness={0.28}
            />
          </mesh>
        ))
      )}

      {/* 5 Warm Oak Shelf Planks */}
      {[-0.86, -0.46, -0.02, 0.42, 0.86].map((yPos, idx) => (
        <RoundedBox
          key={`shelf-${idx}`}
          args={[0.43, 0.04, 0.96]}
          radius={0.008}
          position={[0, yPos, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={mat.woodWarm} roughness={0.44} />
        </RoundedBox>
      ))}

      {/* Color-Coded Technical Book Volumes */}
      {bookSpines.map((book, idx) => (
        <RoundedBox
          key={`book-${idx}`}
          args={[0.24, book.height, 0.048]}
          radius={0.006}
          position={[0.02, book.shelfY + 0.02 + book.height / 2, book.zOffset]}
          rotation={[book.tilt ?? 0, 0, 0]}
          castShadow
        >
          <meshStandardMaterial color={book.color} roughness={0.46} />
        </RoundedBox>
      ))}

      {/* Glowing Neural Tensor Cube Trophy on Top Shelf */}
      <group position={[0.02, 0.56, 0.22]} rotation={[0.3, 0.5, 0.2]}>
        <RoundedBox args={[0.145, 0.145, 0.145]} radius={0.022}>
          <meshStandardMaterial
            color={mat.accentCyan}
            emissive="#0284c7"
            emissiveIntensity={0.7}
            metalness={0.5}
            roughness={0.2}
          />
        </RoundedBox>
      </group>

      {/* Bottom Archive Storage Boxes */}
      {[-0.2, 0.2].map((zBox, idx) => (
        <RoundedBox
          key={`archive-${idx}`}
          args={[0.32, 0.28, 0.34]}
          radius={0.015}
          position={[0.01, -0.7, zBox]}
          castShadow
        >
          <meshStandardMaterial color={mat.fabricSlate} roughness={0.58} />
        </RoundedBox>
      ))}

      {/* Top Shelf Small Succulent Planter */}
      <group position={[0.02, 0.94, -0.22]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.082, 0.068, 0.12, 16]} />
          <meshStandardMaterial color={mat.ceramicWhite} roughness={0.36} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <sphereGeometry args={[0.086, 12, 10]} />
          <meshStandardMaterial color={mat.foliagePrimary} roughness={0.52} />
        </mesh>
      </group>
    </InteractiveObject>
  );
};
