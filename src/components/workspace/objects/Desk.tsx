import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';

export const Desk: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';
  const chairRef = useRef<THREE.Group>(null);
  const engineerHeadRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (chairRef.current) {
      chairRef.current.rotation.y = Math.sin(t * 0.55) * 0.08;
    }
    if (engineerHeadRef.current) {
      engineerHeadRef.current.rotation.y = Math.sin(t * 0.8) * 0.14;
      engineerHeadRef.current.rotation.x = Math.sin(t * 1.1) * 0.04;
    }
  });

  return (
    <group name="engineer-desk-station">
      {/* ── Main Standing Desk Tabletop (Walnut / Warm Oak) ── */}
      <RoundedBox
        args={[2.75, 0.075, 1.15]}
        radius={0.025}
        smoothness={4}
        position={[0.12, 0.92, -1.18]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={isNight ? '#5c3a21' : '#854d0e'}
          roughness={0.42}
          metalness={0.08}
        />
      </RoundedBox>

      {/* Rear Desk RGB/Cyan Ambilight Strip */}
      <mesh position={[0.12, 0.915, -1.75]}>
        <boxGeometry args={[2.65, 0.022, 0.025]} />
        <meshBasicMaterial color={isNight ? '#22d3ee' : '#f59e0b'} />
      </mesh>

      {/* Motorized Dual-Column Metal Desk Legs */}
      {[-1.08, 1.32].map((xPos, idx) => (
        <group key={`leg-${idx}`} position={[xPos, 0, -1.18]}>
          {/* Vertical Column */}
          <RoundedBox
            args={[0.09, 0.88, 0.12]}
            radius={0.015}
            position={[0, 0.45, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#1e293b"
              roughness={0.35}
              metalness={0.75}
            />
          </RoundedBox>
          {/* Horizontal Foot Runner */}
          <RoundedBox
            args={[0.12, 0.045, 0.96]}
            radius={0.015}
            position={[0, 0.025, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#0f172a"
              roughness={0.35}
              metalness={0.8}
            />
          </RoundedBox>
        </group>
      ))}

      {/* Under-Desk Cable Management Tray & Subwoofer */}
      <RoundedBox
        args={[0.32, 0.36, 0.38]}
        radius={0.03}
        position={[-0.78, 0.19, -1.32]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5} />
      </RoundedBox>

      {/* ── Extended Felt Desk Mat ── */}
      <RoundedBox
        args={[1.42, 0.012, 0.56]}
        radius={0.005}
        position={[0.12, 0.962, -1.04]}
        receiveShadow
      >
        <meshStandardMaterial color="#0f172a" roughness={0.88} />
      </RoundedBox>

      {/* ── Custom 75% Mechanical Keyboard with Color Keycaps ── */}
      <group position={[0.04, 0.978, -0.96]} rotation={[0.05, 0, 0]}>
        {/* Anodized Aluminum Case */}
        <RoundedBox args={[0.46, 0.026, 0.18]} radius={0.008} castShadow>
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.3}
            metalness={0.65}
          />
        </RoundedBox>
        {/* RGB Underglow */}
        <mesh position={[0, -0.008, 0]}>
          <boxGeometry args={[0.465, 0.006, 0.185]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Keycap Matrix */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 12 }).map((__, col) => {
            const isEsc = row === 0 && col === 0;
            const isEnter = row === 2 && col === 11;
            const isSpace = row === 4 && col >= 3 && col <= 7;
            if (row === 4 && col > 3 && col <= 7) return null;
            const keyColor = isEsc
              ? '#ef4444'
              : isEnter
              ? '#06b6d4'
              : col === 0 || col === 11
              ? '#334155'
              : '#cbd5e1';
            const width = isSpace ? 0.15 : 0.028;
            const xOff = isSpace
              ? -0.2 + 5 * 0.035
              : -0.2 + col * 0.035;
            const zOff = -0.065 + row * 0.032;
            return (
              <mesh
                key={`key-${row}-${col}`}
                position={[xOff, 0.017, zOff]}
                castShadow
              >
                <boxGeometry args={[width, 0.012, 0.025]} />
                <meshStandardMaterial color={keyColor} roughness={0.45} />
              </mesh>
            );
          })
        )}
      </group>

      {/* Wireless Ergonomic Mouse */}
      <RoundedBox
        args={[0.075, 0.032, 0.115]}
        radius={0.015}
        position={[0.42, 0.978, -0.96]}
        castShadow
      >
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
      </RoundedBox>

      {/* ── Articulated Warm Architect Desk Lamp (Left Rear Corner) ── */}
      <group position={[-1.08, 0.96, -1.42]} rotation={[0, 0.45, 0]}>
        {/* Heavy Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.11, 0.12, 0.04, 20]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Lower Stem */}
        <mesh position={[-0.04, 0.28, 0]} rotation={[0, 0, 0.2]} castShadow>
          <cylinderGeometry args={[0.016, 0.016, 0.52, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[0.08, 0.62, 0]} rotation={[0, 0, -0.55]} castShadow>
          <cylinderGeometry args={[0.014, 0.014, 0.46, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Lamp Shade */}
        <mesh
          position={[0.24, 0.72, 0]}
          rotation={[0, 0, -0.35]}
          castShadow
        >
          <coneGeometry args={[0.11, 0.16, 20, 1, true]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.6}
            roughness={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Glowing Warm Tungsten Bulb */}
        <mesh position={[0.22, 0.68, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
      </group>

      {/* ── Studio Headphones on Stand (Left Front Desk) ── */}
      <group position={[-1.05, 0.96, -0.88]}>
        <mesh position={[0, 0.015, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.07, 0.025, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.14, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.25, 10]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.22, 0]} rotation={[0, 0.3, 0]}>
          <torusGeometry args={[0.065, 0.014, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
      </group>

      {/* ── Ergonomic Mesh Chair & Seated AI Engineer Character ── */}
      <group ref={chairRef} position={[0.08, 0.02, -0.26]}>
        {/* 5-Star Base & Casters */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.04, 0.36, 14]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.25} />
        </mesh>
        {[0, 1, 2, 3, 4].map((legIdx) => {
          const angle = (legIdx * Math.PI * 2) / 5;
          return (
            <mesh
              key={`caster-${legIdx}`}
              position={[Math.cos(angle) * 0.18, 0.05, Math.sin(angle) * 0.18]}
              rotation={[0, -angle, Math.PI / 2]}
              castShadow
            >
              <cylinderGeometry args={[0.018, 0.018, 0.36, 10]} />
              <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
            </mesh>
          );
        })}

        {/* Seat Cushion */}
        <RoundedBox
          args={[0.52, 0.07, 0.5]}
          radius={0.025}
          position={[0, 0.44, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </RoundedBox>

        {/* Armrests */}
        {[-0.27, 0.27].map((ax, i) => (
          <RoundedBox
            key={`arm-${i}`}
            args={[0.045, 0.22, 0.28]}
            radius={0.012}
            position={[ax, 0.56, -0.02]}
            castShadow
          >
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </RoundedBox>
        ))}

        {/* Ergonomic Backrest & Headrest (facing -Z toward the monitors) */}
        <RoundedBox
          args={[0.46, 0.62, 0.06]}
          radius={0.025}
          position={[0, 0.82, 0.23]}
          rotation={[-0.08, 0, 0]}
          castShadow
        >
          <meshStandardMaterial color="#0f172a" roughness={0.65} />
        </RoundedBox>
        <RoundedBox
          args={[0.28, 0.14, 0.05]}
          radius={0.02}
          position={[0, 1.21, 0.25]}
          castShadow
        >
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </RoundedBox>

        {/* Stylized Miniature AI Engineer Avatar (Seated, facing monitors) */}
        <group position={[0, 0.52, 0.02]}>
          {/* Torso (Dark Tech Hoodie with Cyan Accent Stripe) */}
          <RoundedBox
            args={[0.34, 0.42, 0.22]}
            radius={0.06}
            position={[0, 0.22, 0.02]}
            castShadow
          >
            <meshStandardMaterial color="#1e293b" roughness={0.65} />
          </RoundedBox>
          {/* Arms reaching toward keyboard */}
          {[-0.2, 0.2].map((sx, idx) => (
            <RoundedBox
              key={`eng-arm-${idx}`}
              args={[0.09, 0.1, 0.34]}
              radius={0.035}
              position={[sx, 0.22, -0.16]}
              rotation={[0.2, idx === 0 ? -0.15 : 0.15, 0]}
              castShadow
            >
              <meshStandardMaterial color="#334155" roughness={0.6} />
            </RoundedBox>
          ))}
          {/* Head & Glasses */}
          <group ref={engineerHeadRef} position={[0, 0.54, 0]}>
            <RoundedBox
              args={[0.23, 0.24, 0.23]}
              radius={0.07}
              castShadow
            >
              <meshStandardMaterial color="#f1c27d" roughness={0.55} />
            </RoundedBox>
            {/* Stylized Dark Hair */}
            <RoundedBox
              args={[0.245, 0.11, 0.245]}
              radius={0.04}
              position={[0, 0.09, 0.01]}
              castShadow
            >
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </RoundedBox>
            {/* Cyan Over-Ear Headphones on Character */}
            <mesh position={[0, 0.03, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.055, 0.055, 0.27, 16]} />
              <meshStandardMaterial color="#06b6d4" metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
