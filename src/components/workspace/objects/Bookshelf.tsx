import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { InteractiveObject } from '../InteractiveObject';

export const Bookshelf: React.FC = () => {
  const bookSpines: Array<{
    shelfY: number;
    zOffset: number;
    height: number;
    color: string;
    tilt?: number;
  }> = [
    // Shelf 1 (Top Tech Books)
    { shelfY: 0.42, zOffset: -0.34, height: 0.24, color: '#0ea5e9' },
    { shelfY: 0.42, zOffset: -0.28, height: 0.26, color: '#ef4444' },
    { shelfY: 0.42, zOffset: -0.22, height: 0.23, color: '#8b5cf6' },
    { shelfY: 0.42, zOffset: -0.16, height: 0.25, color: '#10b981' },
    { shelfY: 0.42, zOffset: -0.09, height: 0.24, color: '#f59e0b', tilt: 0.14 },

    // Shelf 2 (Deep Learning & CUDA Volumes)
    { shelfY: -0.02, zOffset: -0.34, height: 0.26, color: '#3b82f6' },
    { shelfY: -0.02, zOffset: -0.28, height: 0.27, color: '#ec4899' },
    { shelfY: -0.02, zOffset: -0.22, height: 0.24, color: '#14b8a6' },
    { shelfY: -0.02, zOffset: -0.16, height: 0.26, color: '#eab308' },
    { shelfY: -0.02, zOffset: 0.12, height: 0.25, color: '#6366f1' },
    { shelfY: -0.02, zOffset: 0.18, height: 0.23, color: '#22c55e' },
    { shelfY: -0.02, zOffset: 0.24, height: 0.25, color: '#f97316' },

    // Shelf 3 (Systems & Math)
    { shelfY: -0.46, zOffset: -0.32, height: 0.27, color: '#475569' },
    { shelfY: -0.46, zOffset: -0.25, height: 0.27, color: '#1e293b' },
    { shelfY: -0.46, zOffset: -0.18, height: 0.25, color: '#0284c7' },
    { shelfY: -0.46, zOffset: -0.11, height: 0.26, color: '#7c3aed' },
  ];

  return (
    <InteractiveObject
      id="bookshelf"
      position={[-1.84, 1.02, -1.16]}
      ringRadius={0.5}
      ringOffset={[0.05, -0.98, 0]}
    >
      {/* Steel Frame Uprights */}
      {[-0.45, 0.45].map((zPos, zIdx) =>
        [-0.18, 0.18].map((xPos, xIdx) => (
          <mesh
            key={`post-${zIdx}-${xIdx}`}
            position={[xPos, 0, zPos]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.035, 1.98, 0.035]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.75}
              roughness={0.3}
            />
          </mesh>
        ))
      )}

      {/* 5 Oak Shelf Planks */}
      {[-0.86, -0.46, -0.02, 0.42, 0.86].map((yPos, idx) => (
        <RoundedBox
          key={`shelf-${idx}`}
          args={[0.42, 0.038, 0.96]}
          radius={0.008}
          position={[0, yPos, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#78350f" roughness={0.52} />
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
          <meshStandardMaterial color={book.color} roughness={0.5} />
        </RoundedBox>
      ))}

      {/* Glowing Neural Tensor Cube Trophy on Top Shelf */}
      <group position={[0.02, 0.56, 0.22]} rotation={[0.3, 0.5, 0.2]}>
        <RoundedBox args={[0.14, 0.14, 0.14]} radius={0.02}>
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.65}
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
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </RoundedBox>
      ))}

      {/* Top Shelf Small Succulent Planter */}
      <group position={[0.02, 0.94, -0.22]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.065, 0.12, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <sphereGeometry args={[0.085, 12, 10]} />
          <meshStandardMaterial color="#10b981" roughness={0.6} />
        </mesh>
      </group>
    </InteractiveObject>
  );
};
