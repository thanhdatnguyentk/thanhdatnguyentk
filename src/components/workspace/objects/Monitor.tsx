import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';
import { useWorkspaceStore } from '../hooks/useWorkspaceInteraction';
import { ATELIER_PALETTE } from './materials';
import {
  AtelierGLBModel,
  type MaterialCustomization,
} from './AtelierGLBModel';

function createScreenTexture(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  w = 512,
  h = 320
): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    draw(ctx, w, h);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export const MonitorsAndDisplays: React.FC = () => {
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const mat = ATELIER_PALETTE[timeMode];

  const monitorOverrides = useMemo<Record<string, MaterialCustomization>>(
    () => ({
      Plastic1Monitor1: {
        color: mat.metalBrushed,
        roughness: 0.28,
        metalness: 0.72,
      },
      Screen1Monitor1: {
        color: mat.metalDark,
        roughness: 0.22,
        metalness: 0.55,
      },
      Mat: {
        color: mat.metalBrushed,
        roughness: 0.26,
        metalness: 0.76,
      },
    }),
    [mat]
  );

  // 1. Main Ultrawide Monitor Screen Texture (All 7 Projects Command Center)
  const mainScreenTex = useMemo(
    () =>
      createScreenTexture((ctx, w, h) => {
        ctx.fillStyle = '#0d1422';
        ctx.fillRect(0, 0, w, h);

        // Top Bar
        ctx.fillStyle = '#182338';
        ctx.fillRect(0, 0, w, 34);
        ctx.fillStyle = '#7ddcf7';
        ctx.font = 'bold 15px monospace';
        ctx.fillText('ATELIER // 7 ENGINEERING CASE STUDIES HUB', 16, 22);

        // Project Grid Cards
        const labels = [
          ['01 VIDEO RETRIEVAL', '#7ddcf7', 'AIC-26 LEAD'],
          ['02 MILKY WAY 3D', '#60a5fa', 'WEBGL2 / GPU'],
          ['03 JAVATORCH', '#ac98ff', 'TENSOR ENGINE'],
          ['04 HYBRID RAG BOT', '#34d399', 'FAISS + BM25'],
          ['05 YOLOV8 TRAFFIC', '#ffc992', '30+ FPS CV'],
          ['06 UIT_PINANCE', '#fde68a', 'SHARPE 1.8+'],
        ];
        labels.forEach(([title, color, metric], i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x = 16 + col * 162;
          const y = 48 + row * 124;

          ctx.fillStyle = '#182338';
          ctx.fillRect(x, y, 150, 110);
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, 150, 110);

          ctx.fillStyle = color;
          ctx.font = 'bold 12px monospace';
          ctx.fillText(title, x + 10, y + 26);

          ctx.fillStyle = '#f4f7fb';
          ctx.font = '11px monospace';
          ctx.fillText(metric, x + 10, y + 48);

          // Mini sparkline bar
          ctx.fillStyle = color;
          ctx.fillRect(x + 10, y + 72, 95 + (i % 3) * 15, 8);
          ctx.fillStyle = '#334155';
          ctx.fillRect(x + 10, y + 88, 125, 6);
        });
      }, 512, 300),
    []
  );

  // 2. Left Video Retrieval System Monitor Texture (AIC-26 Lead)
  const videoScreenTex = useMemo(
    () =>
      createScreenTexture((ctx, w, h) => {
        ctx.fillStyle = '#0d1422';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#182338';
        ctx.fillRect(0, 0, w, 36);
        ctx.fillStyle = '#7ddcf7';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('AIC-26 // MULTIMODAL VIDEO RETRIEVAL', 14, 24);

        // Search Query Box
        ctx.fillStyle = '#131d31';
        ctx.fillRect(14, 48, w - 28, 34);
        ctx.strokeStyle = '#7ddcf7';
        ctx.strokeRect(14, 48, w - 28, 34);
        ctx.fillStyle = '#f4f7fb';
        ctx.font = '13px monospace';
        ctx.fillText('QUERY: "cyclist crossing red light in rain" -> <50ms', 24, 70);

        // Keyframe Grid with Similarity Badges
        const frames = [
          ['KF_0412', '0.94', '#7ddcf7'],
          ['KF_0415', '0.91', '#38bdf8'],
          ['KF_1089', '0.88', '#ac98ff'],
          ['KF_2104', '0.86', '#34d399'],
          ['KF_3092', '0.84', '#ffc992'],
          ['KF_4410', '0.82', '#60a5fa'],
        ];
        frames.forEach(([id, score, col], idx) => {
          const c = idx % 3;
          const r = Math.floor(idx / 3);
          const fx = 14 + c * 162;
          const fy = 96 + r * 102;
          ctx.fillStyle = '#182338';
          ctx.fillRect(fx, fy, 150, 90);
          ctx.strokeStyle = col;
          ctx.lineWidth = 2;
          ctx.strokeRect(fx, fy, 150, 90);

          ctx.fillStyle = col;
          ctx.fillRect(fx + 8, fy + 8, 56, 20);
          ctx.fillStyle = '#0d1422';
          ctx.font = 'bold 12px monospace';
          ctx.fillText(score, fx + 16, fy + 22);

          ctx.fillStyle = '#f4f7fb';
          ctx.font = '12px monospace';
          ctx.fillText(id, fx + 10, fy + 76);
        });
      }),
    []
  );

  // 3. Right Quantitative Finance Monitor Texture (UIT_PINANCE)
  const financeScreenTex = useMemo(
    () =>
      createScreenTexture((ctx, w, h) => {
        ctx.fillStyle = '#0d1422';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#182338';
        ctx.fillRect(0, 0, w, 34);
        ctx.fillStyle = '#ffc992';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('UIT_PINANCE // QUANT ALGO TERMINAL', 14, 23);

        // Candlestick Bars
        const candles = [
          [140, 210, 160, 195, true],
          [130, 190, 175, 145, false],
          [115, 180, 130, 168, true],
          [100, 175, 112, 155, true],
          [90, 160, 140, 105, false],
          [75, 150, 95, 138, true],
          [60, 130, 72, 118, true],
          [50, 120, 62, 105, true],
        ];
        candles.forEach(([high, low, open, close, bull], i) => {
          const cx = 38 + i * 56;
          const color = bull ? '#34d399' : '#fb7185';
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(cx, high);
          ctx.lineTo(cx, low);
          ctx.stroke();

          ctx.fillStyle = color;
          const top = Math.min(open as number, close as number);
          const height = Math.max(
            12,
            Math.abs((close as number) - (open as number))
          );
          ctx.fillRect(cx - 14, top, 28, height);
        });

        ctx.fillStyle = '#ffc992';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('SHARPE: 1.84  |  WIN RATE: 62.4%  |  ACTIVE', 18, 282);
      }),
    []
  );

  // 4. Wall CCTV YOLOv8 Traffic Monitor Texture
  const cctvScreenTex = useMemo(
    () =>
      createScreenTexture((ctx, w, h) => {
        ctx.fillStyle = '#0d1422';
        ctx.fillRect(0, 0, w, h);

        // Road lanes
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(80, h);
        ctx.lineTo(210, 50);
        ctx.moveTo(430, h);
        ctx.lineTo(300, 50);
        ctx.stroke();

        // YOLOv8 Bounding Boxes
        const boxes: Array<[number, number, number, number, string, string]> = [
          [130, 110, 95, 68, 'CAR 0.96', '#34d399'],
          [265, 145, 110, 78, 'TRUCK 0.92', '#ffc992'],
          [185, 210, 82, 62, 'MOTO 0.89', '#7ddcf7'],
        ];
        boxes.forEach(([bx, by, bw, bh, lbl, col]) => {
          ctx.strokeStyle = col;
          ctx.lineWidth = 3;
          ctx.strokeRect(bx, by, bw, bh);
          ctx.fillStyle = col;
          ctx.fillRect(bx, by - 20, 88, 20);
          ctx.fillStyle = '#0d1422';
          ctx.font = 'bold 12px monospace';
          ctx.fillText(lbl, bx + 4, by - 6);
        });

        ctx.fillStyle = '#ffc992';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('YOLOv8 + ByteTrack // 34.2 FPS LIVE', 16, 28);
      }),
    []
  );

  return (
    <group name="workspace-monitors">
      {/* ── 1. MAIN ULTRAWIDE MONITOR (All 7 Projects Hub) ── */}
      <InteractiveObject
        id="main-monitor"
        position={[0.12, 1.46, -1.36]}
        ringRadius={0.42}
        ringOffset={[0, -0.46, 0.1]}
      >
        {/* Real 3D Curved-Stand Monitor GLB Hardware (Poly by Google, CC-BY 3.0) */}
        <AtelierGLBModel
          assetPath="workstation/monitor_ultrawide.glb"
          position={[0, -0.515, -0.02]}
          scale={[1.52, 1.0, 1.0]}
          materialOverrides={monitorOverrides}
        />

        {/* Ultrawide Display Bezel Frame & Replaceable Custom Project UI Texture */}
        <RoundedBox
          args={[1.06, 0.55, 0.036]}
          radius={0.016}
          position={[0, 0.01, 0.01]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={mat.metalDark}
            metalness={0.62}
            roughness={0.32}
          />
        </RoundedBox>
        <mesh position={[0, 0.01, 0.03]}>
          <planeGeometry args={[1.0, 0.49]} />
          <meshBasicMaterial map={mainScreenTex ?? undefined} color="#ffffff" />
        </mesh>

        {/* Monitor Top Screenbar Light */}
        <RoundedBox
          args={[0.46, 0.026, 0.038]}
          radius={0.008}
          position={[0, 0.295, 0.024]}
        >
          <meshStandardMaterial
            color={mat.metalBrushed}
            metalness={0.72}
            roughness={0.25}
          />
        </RoundedBox>
        <mesh position={[0, 0.28, 0.038]}>
          <boxGeometry args={[0.42, 0.009, 0.01]} />
          <meshBasicMaterial color={mat.accentAmber} />
        </mesh>
      </InteractiveObject>

      {/* ── 2. LEFT MONITOR: Video Retrieval System (AIC-26 Lead) ── */}
      <InteractiveObject
        id="video-monitor"
        position={[-0.78, 1.41, -1.14]}
        rotation={[0, 0.34, 0]}
        ringRadius={0.35}
        ringOffset={[0, -0.42, 0.05]}
      >
        {/* Real 3D Beveled Monitor GLB Hardware (Zsky, CC-BY 3.0) */}
        <AtelierGLBModel
          assetPath="workstation/monitor.glb"
          position={[0, -0.465, -0.02]}
          scale={[1.02, 1.0, 1.0]}
          materialOverrides={monitorOverrides}
        />

        {/* Slim Bezel & Replaceable AIC-26 Video Retrieval UI Texture */}
        <RoundedBox
          args={[0.75, 0.47, 0.03]}
          radius={0.014}
          position={[0, 0, 0.01]}
          castShadow
        >
          <meshStandardMaterial
            color={mat.metalDark}
            metalness={0.58}
            roughness={0.32}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.027]}>
          <planeGeometry args={[0.69, 0.41]} />
          <meshBasicMaterial map={videoScreenTex ?? undefined} />
        </mesh>

        {/* Cyan Status LED */}
        <mesh position={[0.31, -0.21, 0.028]}>
          <sphereGeometry args={[0.01, 10, 10]} />
          <meshBasicMaterial color={mat.accentCyan} />
        </mesh>
      </InteractiveObject>

      {/* ── 3. RIGHT MONITOR: UIT_PINANCE Quant Trading Terminal ── */}
      <InteractiveObject
        id="finance-display"
        position={[1.02, 1.41, -1.12]}
        rotation={[0, -0.34, 0]}
        ringRadius={0.35}
        ringOffset={[0, -0.42, 0.05]}
      >
        {/* Real 3D Beveled Monitor GLB Hardware (Zsky, CC-BY 3.0) */}
        <AtelierGLBModel
          assetPath="workstation/monitor.glb"
          position={[0, -0.465, -0.02]}
          scale={[1.0, 1.0, 1.0]}
          materialOverrides={monitorOverrides}
        />

        {/* Slim Bezel & Replaceable UIT_PINANCE UI Texture */}
        <RoundedBox
          args={[0.73, 0.46, 0.03]}
          radius={0.014}
          position={[0, 0, 0.01]}
          castShadow
        >
          <meshStandardMaterial
            color={mat.metalDark}
            metalness={0.58}
            roughness={0.32}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.027]}>
          <planeGeometry args={[0.67, 0.4]} />
          <meshBasicMaterial map={financeScreenTex ?? undefined} />
        </mesh>
      </InteractiveObject>

      {/* ── 4. WALL CCTV MONITOR: YOLOv8 Traffic Monitoring ── */}
      <InteractiveObject
        id="cctv-display"
        position={[-0.78, 2.38, -2.06]}
        rotation={[0.08, 0, 0]}
        ringRadius={0.34}
        ringOffset={[0, 0, 0.04]}
      >
        <RoundedBox args={[0.84, 0.52, 0.046]} radius={0.016} castShadow>
          <meshStandardMaterial
            color={mat.metalBrushed}
            metalness={0.62}
            roughness={0.3}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[0.77, 0.45]} />
          <meshBasicMaterial map={cctvScreenTex ?? undefined} />
        </mesh>
      </InteractiveObject>

      {/* ── 5. UIT ACADEMIC DOSSIER & RESEARCH VOLUMES (Real 3D book_stack.glb) ── */}
      <InteractiveObject
        id="desk-calendar"
        position={[-0.48, 0.96, -0.96]}
        rotation={[0, 0.28, 0]}
        ringRadius={0.18}
        ringOffset={[0, -0.01, 0]}
      >
        <AtelierGLBModel
          assetPath="props/book_stack.glb"
          position={[0, -0.012, 0]}
          scale={0.95}
          materialOverrides={{
            carpetDarker: { color: mat.accentLavender, roughness: 0.38 },
            carpetWhite: { color: mat.ceramicWhite, roughness: 0.34 },
            plant: { color: mat.accentEmerald, roughness: 0.38 },
            metal: { color: mat.accentAmber, roughness: 0.32 },
          }}
        />
      </InteractiveObject>

      {/* ── 6. CONTACT & SOCIAL SMART TABLET DOCK ── */}
      <InteractiveObject
        id="mail-dock"
        position={[1.16, 1.02, -0.82]}
        rotation={[0, -0.35, 0]}
        ringRadius={0.2}
        ringOffset={[0, -0.05, 0]}
      >
        <RoundedBox
          args={[0.21, 0.036, 0.15]}
          radius={0.01}
          position={[0, -0.02, 0]}
          castShadow
        >
          <meshStandardMaterial
            color={mat.metalBrushed}
            metalness={0.62}
            roughness={0.3}
          />
        </RoundedBox>
        <RoundedBox
          args={[0.185, 0.145, 0.016]}
          radius={0.008}
          position={[0, 0.05, 0.01]}
          rotation={[-0.35, 0, 0]}
          castShadow
        >
          <meshStandardMaterial
            color={mat.metalDark}
            metalness={0.7}
            roughness={0.22}
          />
        </RoundedBox>
        <mesh position={[0, 0.052, 0.02]} rotation={[-0.35, 0, 0]}>
          <planeGeometry args={[0.16, 0.12]} />
          <meshBasicMaterial color={mat.accentCyan} />
        </mesh>
      </InteractiveObject>
    </group>
  );
};
