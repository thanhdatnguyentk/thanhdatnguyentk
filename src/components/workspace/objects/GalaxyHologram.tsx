import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';

export const GalaxyHologram: React.FC = () => {
  const galaxyGroupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const solarOrbitRef = useRef<THREE.Group>(null);

  // Generate 1,400 3D Spiral Galaxy Stars (Sgr A* Core + 4 Logarithmic Spiral Arms)
  const { positions, colors } = useMemo(() => {
    const count = 1400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const coreColor = new THREE.Color('#fde68a');
    const armColorInner = new THREE.Color('#60a5fa');
    const armColorOuter = new THREE.Color('#a855f7');
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 1.45) * 0.48;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;
      const spinAngle = radius * 6.8;

      const randomX =
        Math.pow(Math.random(), 2.5) *
        (Math.random() < 0.5 ? 1 : -1) *
        0.09 *
        (1.1 - radius);
      const randomY =
        Math.pow(Math.random(), 3) *
        (Math.random() < 0.5 ? 1 : -1) *
        0.055 *
        (1.1 - radius);
      const randomZ =
        Math.pow(Math.random(), 2.5) *
        (Math.random() < 0.5 ? 1 : -1) *
        0.09 *
        (1.1 - radius);

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const t = Math.min(1, radius / 0.45);
      if (t < 0.28) {
        tempColor.copy(coreColor).lerp(armColorInner, t / 0.28);
      } else {
        tempColor.copy(armColorInner).lerp(armColorOuter, (t - 0.28) / 0.72);
      }

      col[i3] = tempColor.r;
      col[i3 + 1] = tempColor.g;
      col[i3 + 2] = tempColor.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (galaxyGroupRef.current) {
      galaxyGroupRef.current.rotation.y += delta * 0.42;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.65;
    }
    if (solarOrbitRef.current) {
      solarOrbitRef.current.rotation.y += delta * 1.35;
    }
  });

  return (
    <InteractiveObject
      id="galaxy-hologram"
      position={[1.38, 0.42, 0.82]}
      ringRadius={0.54}
      ringOffset={[0, -0.39, 0]}
    >
      {/* ── Cylindrical Astrometry Hologram Pedestal Base ── */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.44, 0.6, 28]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.35}
          metalness={0.78}
        />
      </mesh>

      {/* Pedestal Accent Collar */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.04, 28]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Glowing Emitter Lens Surface */}
      <mesh position={[0, 0.235, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.34, 28]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.65} />
      </mesh>

      {/* Rotating Emitter Calibration Ring */}
      <mesh
        ref={outerRingRef}
        position={[0, 0.25, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.34, 0.37, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Pedestal Front Label Plate */}
      <RoundedBox
        args={[0.28, 0.1, 0.03]}
        radius={0.008}
        position={[-0.28, 0.02, 0.26]}
        rotation={[0, -0.72, 0]}
      >
        <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
      </RoundedBox>

      {/* ── Floating 3D Milky Way Spiral Galaxy & Solar System Projection ── */}
      <group
        ref={galaxyGroupRef}
        position={[0, 0.56, 0]}
        rotation={[0.38, 0, -0.22]}
      >
        {/* Sgr A* Supermassive Core Glow */}
        <mesh>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.32}
          />
        </mesh>

        {/* 1,400 Spiral Galaxy Star Particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.024}
            vertexColors
            transparent
            opacity={0.92}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Oriion Spur / Solar System Marker Orbit Ring */}
        <group ref={solarOrbitRef} position={[0.22, 0.02, 0.12]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.058, 0.066, 24]} />
            <meshBasicMaterial
              color="#22d3ee"
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Sun & Earth Marker Spheres */}
          <mesh>
            <sphereGeometry args={[0.016, 12, 12]} />
            <meshBasicMaterial color="#fde047" />
          </mesh>
          <mesh position={[0.062, 0, 0]}>
            <sphereGeometry args={[0.012, 10, 10]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      </group>
    </InteractiveObject>
  );
};
