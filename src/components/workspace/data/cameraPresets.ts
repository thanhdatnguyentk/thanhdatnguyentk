export type InteractiveObjectId =
  | 'main-monitor'
  | 'video-monitor'
  | 'galaxy-hologram'
  | 'gpu-server'
  | 'cctv-display'
  | 'finance-display'
  | 'ai-robot'
  | 'bookshelf'
  | 'whiteboard'
  | 'desk-calendar'
  | 'coffee-mug'
  | 'mail-dock';

export type SceneObjectId = InteractiveObjectId;

export interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
  zoom: number;
  zoomMultiplier: number;
}

/**
 * Asymmetric desktop target offset: shifts the isometric camera target slightly
 * toward world (-X, +Z) — which is screen-left — so the miniature 3D room sits
 * prominently in the center-right (occupying 65–75% of the viewport) while
 * leaving clean editorial space on the left for the Hero Identity typography.
 */
export const ATELIER_DESKTOP_OFFSET: [number, number, number] = [
  -1.08,
  0.04,
  1.08,
];

export const DEFAULT_CAMERA_PRESET: CameraPreset = {
  position: [9.0, 7.8, 9.0],
  target: [0.0, 1.02, -0.18],
  zoom: 160,
  zoomMultiplier: 1.0,
};

export const OBJECT_CAMERA_PRESETS: Record<InteractiveObjectId, CameraPreset> = {
  'main-monitor': {
    position: [5.2, 4.5, 5.5],
    target: [0.12, 1.32, -1.32],
    zoom: 228,
    zoomMultiplier: 1.38,
  },
  'video-monitor': {
    position: [4.8, 4.4, 5.3],
    target: [-0.78, 1.28, -1.12],
    zoom: 236,
    zoomMultiplier: 1.42,
  },
  'galaxy-hologram': {
    position: [5.6, 4.5, 5.6],
    target: [1.32, 0.72, 0.78],
    zoom: 232,
    zoomMultiplier: 1.4,
  },
  'gpu-server': {
    position: [6.0, 4.7, 5.5],
    target: [1.65, 0.72, -1.42],
    zoom: 218,
    zoomMultiplier: 1.32,
  },
  'cctv-display': {
    position: [5.3, 5.0, 5.5],
    target: [-0.78, 2.18, -2.02],
    zoom: 226,
    zoomMultiplier: 1.36,
  },
  'finance-display': {
    position: [5.3, 4.4, 5.3],
    target: [1.02, 1.28, -1.1],
    zoom: 236,
    zoomMultiplier: 1.42,
  },
  'ai-robot': {
    position: [4.7, 4.1, 4.9],
    target: [0.64, 0.98, -0.86],
    zoom: 248,
    zoomMultiplier: 1.5,
  },
  bookshelf: {
    position: [5.7, 4.7, 5.7],
    target: [-1.82, 0.98, -1.14],
    zoom: 212,
    zoomMultiplier: 1.28,
  },
  whiteboard: {
    position: [5.5, 5.0, 5.5],
    target: [0.38, 2.12, -2.04],
    zoom: 218,
    zoomMultiplier: 1.32,
  },
  'desk-calendar': {
    position: [4.7, 4.0, 4.8],
    target: [-0.46, 0.92, -0.92],
    zoom: 246,
    zoomMultiplier: 1.48,
  },
  'coffee-mug': {
    position: [4.5, 3.9, 4.7],
    target: [-0.24, 0.9, -0.82],
    zoom: 252,
    zoomMultiplier: 1.52,
  },
  'mail-dock': {
    position: [4.9, 4.0, 4.9],
    target: [1.16, 0.92, -0.82],
    zoom: 244,
    zoomMultiplier: 1.47,
  },
};
