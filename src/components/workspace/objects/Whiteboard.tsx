import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from '../InteractiveObject';

export const Whiteboard: React.FC = () => {
  const boardTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 380;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0c1425';
      ctx.fillRect(0, 0, 640, 380);

      // Subtle dot grid
      ctx.fillStyle = '#1e293b';
      for (let x = 24; x < 620; x += 28) {
        for (let y = 24; y < 360; y += 28) {
          ctx.fillRect(x, y, 2, 2);
        }
      }

      // Header
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('ARCH // MULTIMODAL RAG + TRANSFORMER ATTENTION', 24, 38);

      // Diagram Nodes
      const nodes: Array<[number, number, string, string]> = [
        [40, 95, 'CLIP / BLIP-2', '#22d3ee'],
        [40, 195, 'WHISPER ASR', '#38bdf8'],
        [240, 145, 'FAISS + BM25', '#a855f7'],
        [440, 95, 'CROSS-ATTN', '#34d399'],
        [440, 195, 'LLM SYNTHESIS', '#f59e0b'],
      ];

      // Connecting Edges
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(180, 125);
      ctx.lineTo(240, 170);
      ctx.moveTo(180, 225);
      ctx.lineTo(240, 180);
      ctx.moveTo(380, 170);
      ctx.lineTo(440, 125);
      ctx.moveTo(380, 180);
      ctx.lineTo(440, 225);
      ctx.stroke();

      nodes.forEach(([nx, ny, label, col]) => {
        ctx.fillStyle = '#111c35';
        ctx.fillRect(nx, ny, 145, 56);
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(nx, ny, 145, 56);

        ctx.fillStyle = col;
        ctx.font = 'bold 14px monospace';
        ctx.fillText(label, nx + 12, ny + 34);
      });

      // Loss & Recall Curve at bottom
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, 330);
      ctx.bezierCurveTo(180, 320, 260, 275, 580, 270);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px monospace';
      ctx.fillText('Recall@10 = 0.89   |   Latency p95 = 42ms', 40, 355);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <InteractiveObject
      id="whiteboard"
      position={[0.38, 2.32, -2.08]}
      ringRadius={0.42}
      ringOffset={[0, 0, 0.04]}
    >
      {/* Brushed Aluminum Board Frame */}
      <RoundedBox
        args={[1.28, 0.78, 0.04]}
        radius={0.015}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#1e293b" metalness={0.65} roughness={0.3} />
      </RoundedBox>

      {/* Glass Architecture Board Canvas */}
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[1.21, 0.71]} />
        <meshBasicMaterial map={boardTexture ?? undefined} />
      </mesh>

      {/* Bottom Marker Tray & Dry-Erase Markers */}
      <RoundedBox
        args={[0.55, 0.025, 0.06]}
        radius={0.005}
        position={[0, -0.4, 0.035]}
      >
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
      </RoundedBox>
      {['#22d3ee', '#a855f7', '#34d399'].map((col, idx) => (
        <mesh
          key={`marker-${idx}`}
          position={[-0.12 + idx * 0.12, -0.382, 0.042]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.008, 0.008, 0.08, 10]} />
          <meshBasicMaterial color={col} />
        </mesh>
      ))}
    </InteractiveObject>
  );
};
