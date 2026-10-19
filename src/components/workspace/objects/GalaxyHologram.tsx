import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';

export const GalaxyHologram: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const mat = ATELIER_PALETTE[timeMode];

  const galaxyGroupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerGyroRef = useRef<THREE.Mesh>(null);
  const solarOrbitRef = useRef<THREE.Group>(null);

  // Generate 1,500 3D Spiral Galaxy Stars (Sgr A* Core + 4 Logarithmic Spiral Arms)
  const { positions, colors } = useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const coreColor = new THREE.Color('#ffc992');
    const armColorInner = new THREE.Color('#7ddcf7');
    const armColorOuter = new THREE.Color('#ac98ff');
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 1.45) * 0.5;
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

      const t = Math.min(1, radius / 0.46);
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
    if (innerGyroRef.current) {
      innerGyroRef.current.rotation.x += delta * 0.48;
      innerGyroRef.current.rotation.y -= delta * 0.35;
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
      {/* ── Cylindrical Astrometry Hologram Pedestal Base (Wood & Brushed Metal) ── */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.44, 0.6, 32]} />
        <meshStandardMaterial
          color={mat.metalBrushed}
          roughness={0.32}
          metalness={0.72}
        />
      </mesh>

      {/* Warm Walnut Trim Band around Pedestal */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.405, 0.415, 0.12, 32]} />
        <meshStandardMaterial
          color={mat.woodWarm}
          roughness={0.42}
          metalness={0.1}
        />
      </mesh>

      {/* Pedestal Top Emitter Collar */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.41, 0.4, 0.045, 32]} />
        <meshStandardMaterial
          color={mat.metalDark}
          metalness={0.82}
          roughness={0.22}
        />
      </mesh>

      {/* Glowing Emitter Lens Surface */}
      <mesh position={[0, 0.236, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color="#1e3a8a" transparent opacity={0.7} />
      </mesh>

      {/* Rotating Emitter Calibration Ring */}
      <mesh
        ref={outerRingRef}
        position={[0, 0.25, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.34, 0.375, 36]} />
        <meshBasicMaterial
          color={mat.accentCyan}
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Pedestal Front Telemetry Badge */}
      <RoundedBox
        args={[0.28, 0.1, 0.032]}
        radius={0.008}
        position={[-0.28, -0.06, 0.26]}
        rotation={[0, -0.72, 0]}
      >
        <meshStandardMaterial
          color={mat.metalDark}
          metalness={0.65}
          roughness={0.28}
        />
      </RoundedBox>

      {/* ── Floating 3D Milky Way Spiral Galaxy & Astrometry Gyro Rings ── */}
      <group
        ref={galaxyGroupRef}
        position={[0, 0.58, 0]}
        rotation={[0.38, 0, -0.22]}
      >
        {/* Outer Astrometric Coordinate Ring */}
        <mesh ref={innerGyroRef}>
          <torusGeometry args={[0.48, 0.005, 10, 48]} />
          <meshBasicMaterial
            color={mat.accentLavender}
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Sgr A* Supermassive Core Glow */}
        <mesh>
          <sphereGeometry args={[0.058, 16, 16]} />
          <meshBasicMaterial color={mat.accentAmber} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.115, 16, 16]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.36}
          />
        </mesh>

        {/* 1,500 Spiral Galaxy Star Particles */}
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
            size={0.025}
            vertexColors
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Orion Spur / Solar System Marker Orbit Ring */}
        <group ref={solarOrbitRef} position={[0.22, 0.02, 0.12]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.058, 0.068, 24]} />
            <meshBasicMaterial
              color={mat.accentCyan}
              side={THREE.DoubleSide}
              transparent
              opacity={0.92}
            />
          </mesh>
          {/* Sun & Earth Marker Spheres */}
          <mesh>
            <sphereGeometry args={[0.017, 12, 12]} />
            <meshBasicMaterial color={mat.accentAmber} />
          </mesh>
          <mesh position={[0.062, 0, 0]}>
            <sphereGeometry args={[0.013, 10, 10]} />
            <meshBasicMaterial color={mat.accentCyan} />
          </mesh>
        </group>
      </group>
    </InteractiveObject>
  );
};
