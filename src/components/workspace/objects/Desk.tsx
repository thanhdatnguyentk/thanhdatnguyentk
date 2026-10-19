import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';

export const Desk: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const isNight = timeMode === 'night';
  const mat = ATELIER_PALETTE[timeMode];
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
      {/* ── Main Standing Desk Tabletop (Warm Walnut / Natural Oak) ── */}
      <RoundedBox
        args={[2.78, 0.078, 1.18]}
        radius={0.026}
        smoothness={4}
        position={[0.12, 0.92, -1.18]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={mat.woodWarm}
          roughness={0.38}
          metalness={0.08}
        />
      </RoundedBox>

      {/* Chamfered Wood Edge Trim */}
      <RoundedBox
        args={[2.8, 0.024, 1.2]}
        radius={0.01}
        position={[0.12, 0.9, -1.18]}
      >
        <meshStandardMaterial color={mat.woodTrim} roughness={0.45} />
      </RoundedBox>

      {/* Rear Desk Warm/Cyan Ambilight Strip */}
      <mesh position={[0.12, 0.918, -1.76]}>
        <boxGeometry args={[2.68, 0.024, 0.026]} />
        <meshBasicMaterial color={isNight ? mat.accentCyan : mat.accentAmber} />
      </mesh>

      {/* Motorized Dual-Column Brushed Metal Desk Legs */}
      {[-1.08, 1.32].map((xPos, idx) => (
        <group key={`leg-${idx}`} position={[xPos, 0, -1.18]}>
          {/* Vertical Column */}
          <RoundedBox
            args={[0.095, 0.88, 0.125]}
            radius={0.016}
            position={[0, 0.45, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={mat.metalBrushed}
              roughness={0.32}
              metalness={0.72}
            />
          </RoundedBox>
          {/* Horizontal Foot Runner */}
          <RoundedBox
            args={[0.13, 0.048, 0.98]}
            radius={0.016}
            position={[0, 0.025, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={mat.metalDark}
              roughness={0.35}
              metalness={0.78}
            />
          </RoundedBox>
        </group>
      ))}

      {/* Under-Desk Acoustic WorkstationSubwoofer & Cable Tray */}
      <RoundedBox
        args={[0.34, 0.38, 0.4]}
        radius={0.03}
        position={[-0.78, 0.2, -1.32]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={mat.metalDark}
          roughness={0.38}
          metalness={0.55}
        />
      </RoundedBox>

      {/* ── Extended Merino Wool Felt Desk Mat ── */}
      <RoundedBox
        args={[1.46, 0.014, 0.58]}
        radius={0.006}
        position={[0.12, 0.963, -1.04]}
        receiveShadow
      >
        <meshStandardMaterial
          color={isNight ? '#1c2840' : '#334155'}
          roughness={0.86}
        />
      </RoundedBox>

      {/* ── Custom 75% Mechanical Keyboard with Sculpted Keycaps ── */}
      <group position={[0.04, 0.98, -0.96]} rotation={[0.05, 0, 0]}>
        {/* Anodized Aluminum Case */}
        <RoundedBox args={[0.46, 0.028, 0.185]} radius={0.008} castShadow>
          <meshStandardMaterial
            color={mat.metalBrushed}
            roughness={0.28}
            metalness={0.68}
          />
        </RoundedBox>
        {/* Rotary Brass Encoder Knob */}
        <mesh position={[0.2, 0.02, -0.065]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.016, 14]} />
          <meshStandardMaterial color={mat.accentAmber} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Subtle Cyan Underglow */}
        <mesh position={[0, -0.008, 0]}>
          <boxGeometry args={[0.468, 0.006, 0.19]} />
          <meshBasicMaterial color={mat.accentCyan} />
        </mesh>
        {/* Keycap Matrix */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 12 }).map((__, col) => {
            const isEsc = row === 0 && col === 0;
            const isEnter = row === 2 && col === 11;
            const isSpace = row === 4 && col >= 3 && col <= 7;
            if (row === 4 && col > 3 && col <= 7) return null;
            if (row === 0 && col === 11) return null; // rotary knob slot
            const keyColor = isEsc
              ? '#ffc992'
              : isEnter
              ? '#7ddcf7'
              : col === 0 || col === 11
              ? '#475569'
              : '#e2e8f0';
            const width = isSpace ? 0.15 : 0.028;
            const xOff = isSpace
              ? -0.2 + 5 * 0.035
              : -0.2 + col * 0.035;
            const zOff = -0.065 + row * 0.032;
            return (
              <mesh
                key={`key-${row}-${col}`}
                position={[xOff, 0.018, zOff]}
                castShadow
              >
                <boxGeometry args={[width, 0.012, 0.025]} />
                <meshStandardMaterial color={keyColor} roughness={0.42} />
              </mesh>
            );
          })
        )}
      </group>

      {/* Wireless Ergonomic Mouse & Scroll Wheel */}
      <group position={[0.42, 0.98, -0.96]}>
        <RoundedBox args={[0.076, 0.034, 0.118]} radius={0.016} castShadow>
          <meshStandardMaterial
            color={mat.metalBrushed}
            roughness={0.3}
            metalness={0.45}
          />
        </RoundedBox>
        <mesh position={[0, 0.018, -0.028]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.012, 12]} />
          <meshStandardMaterial color={mat.accentCyan} />
        </mesh>
      </group>

      {/* ── Articulated Warm Architect Desk Lamp (Left Rear Corner) ── */}
      <group position={[-1.08, 0.96, -1.42]} rotation={[0, 0.45, 0]}>
        {/* Heavy Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.115, 0.125, 0.042, 20]} />
          <meshStandardMaterial
            color={mat.metalBrushed}
            metalness={0.72}
            roughness={0.28}
          />
        </mesh>
        {/* Lower Stem */}
        <mesh position={[-0.04, 0.28, 0]} rotation={[0, 0, 0.2]} castShadow>
          <cylinderGeometry args={[0.016, 0.016, 0.52, 12]} />
          <meshStandardMaterial
            color={mat.metalSilver}
            metalness={0.8}
            roughness={0.22}
          />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[0.08, 0.62, 0]} rotation={[0, 0, -0.55]} castShadow>
          <cylinderGeometry args={[0.014, 0.014, 0.46, 12]} />
          <meshStandardMaterial
            color={mat.metalSilver}
            metalness={0.8}
            roughness={0.22}
          />
        </mesh>
        {/* Lamp Shade */}
        <mesh
          position={[0.24, 0.72, 0]}
          rotation={[0, 0, -0.35]}
          castShadow
        >
          <coneGeometry args={[0.115, 0.165, 22, 1, true]} />
          <meshStandardMaterial
            color={mat.metalBrushed}
            metalness={0.62}
            roughness={0.32}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Glowing Warm Tungsten Bulb */}
        <mesh position={[0.22, 0.68, 0]}>
          <sphereGeometry args={[0.048, 16, 16]} />
          <meshBasicMaterial color={mat.accentAmber} />
        </mesh>
      </group>

      {/* ── Studio Headphones on Stand (Left Front Desk) ── */}
      <group position={[-1.05, 0.96, -0.88]}>
        <mesh position={[0, 0.015, 0]} castShadow>
          <cylinderGeometry args={[0.062, 0.072, 0.026, 16]} />
          <meshStandardMaterial
            color={mat.metalBrushed}
            metalness={0.65}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.14, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.25, 10]} />
          <meshStandardMaterial
            color={mat.metalSilver}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.22, 0]} rotation={[0, 0.3, 0]}>
          <torusGeometry args={[0.066, 0.015, 12, 24, Math.PI]} />
          <meshStandardMaterial color={mat.metalDark} roughness={0.38} />
        </mesh>
      </group>

      {/* ── Ergonomic Mesh Chair & Seated AI Engineer Character ── */}
      <group ref={chairRef} position={[0.08, 0.02, -0.26]}>
        {/* 5-Star Base & Casters */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.036, 0.042, 0.36, 14]} />
          <meshStandardMaterial
            color={mat.metalBrushed}
            metalness={0.78}
            roughness={0.25}
          />
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
              <meshStandardMaterial
                color={mat.metalDark}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          );
        })}

        {/* Seat Cushion */}
        <RoundedBox
          args={[0.52, 0.072, 0.5]}
          radius={0.025}
          position={[0, 0.44, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={mat.fabricSlate} roughness={0.65} />
        </RoundedBox>

        {/* Armrests */}
        {[-0.27, 0.27].map((ax, i) => (
          <RoundedBox
            key={`arm-${i}`}
            args={[0.046, 0.22, 0.28]}
            radius={0.012}
            position={[ax, 0.56, -0.02]}
            castShadow
          >
            <meshStandardMaterial color={mat.metalBrushed} roughness={0.45} />
          </RoundedBox>
        ))}

        {/* Ergonomic Backrest & Headrest */}
        <RoundedBox
          args={[0.46, 0.62, 0.062]}
          radius={0.025}
          position={[0, 0.82, 0.23]}
          rotation={[-0.08, 0, 0]}
          castShadow
        >
          <meshStandardMaterial color={mat.metalDark} roughness={0.58} />
        </RoundedBox>
        <RoundedBox
          args={[0.28, 0.14, 0.052]}
          radius={0.02}
          position={[0, 1.21, 0.25]}
          castShadow
        >
          <meshStandardMaterial color={mat.fabricSlate} roughness={0.55} />
        </RoundedBox>

        {/* Stylized Miniature AI Engineer Avatar (Seated, facing monitors) */}
        <group position={[0, 0.52, 0.02]}>
          {/* Torso (Atelier Slate Jacket with Cyan Collar Trim) */}
          <RoundedBox
            args={[0.34, 0.42, 0.22]}
            radius={0.06}
            position={[0, 0.22, 0.02]}
            castShadow
          >
            <meshStandardMaterial color="#2b3d5e" roughness={0.58} />
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
              <meshStandardMaterial color="#3b4f75" roughness={0.55} />
            </RoundedBox>
          ))}
          {/* Head & Headphones */}
          <group ref={engineerHeadRef} position={[0, 0.54, 0]}>
            <RoundedBox
              args={[0.23, 0.24, 0.23]}
              radius={0.07}
              castShadow
            >
              <meshStandardMaterial color="#f3c68f" roughness={0.52} />
            </RoundedBox>
            {/* Stylized Dark Hair */}
            <RoundedBox
              args={[0.245, 0.11, 0.245]}
              radius={0.04}
              position={[0, 0.09, 0.01]}
              castShadow
            >
              <meshStandardMaterial color="#1a2438" roughness={0.75} />
            </RoundedBox>
            {/* Cyan Over-Ear Headphones on Character */}
            <mesh position={[0, 0.03, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.056, 0.056, 0.275, 16]} />
              <meshStandardMaterial
                color={mat.accentCyan}
                metalness={0.5}
                roughness={0.28}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
