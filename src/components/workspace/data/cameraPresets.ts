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

export const DEFAULT_CAMERA_PRESET: CameraPreset = {
  position: [9.2, 8.2, 9.2],
  target: [0, 1.05, -0.25],
  zoom: 112,
  zoomMultiplier: 1.0,
};

export const OBJECT_CAMERA_PRESETS: Record<InteractiveObjectId, CameraPreset> = {
  'main-monitor': {
    position: [5.2, 4.6, 5.6],
    target: [0.12, 1.28, -1.36],
    zoom: 158,
    zoomMultiplier: 1.42,
  },
  'video-monitor': {
    position: [4.8, 4.5, 5.4],
    target: [-0.78, 1.24, -1.14],
    zoom: 164,
    zoomMultiplier: 1.48,
  },
  'galaxy-hologram': {
    position: [5.8, 4.6, 5.8],
    target: [1.38, 0.72, 0.82],
    zoom: 162,
    zoomMultiplier: 1.45,
  },
  'gpu-server': {
    position: [6.2, 4.8, 5.6],
    target: [1.68, 0.65, -1.48],
    zoom: 152,
    zoomMultiplier: 1.38,
  },
  'cctv-display': {
    position: [5.4, 5.2, 5.6],
    target: [-0.78, 2.15, -2.06],
    zoom: 158,
    zoomMultiplier: 1.42,
  },
  'finance-display': {
    position: [5.4, 4.5, 5.4],
    target: [1.02, 1.24, -1.12],
    zoom: 164,
    zoomMultiplier: 1.48,
  },
  'ai-robot': {
    position: [4.8, 4.2, 5.0],
    target: [0.64, 0.96, -0.86],
    zoom: 172,
    zoomMultiplier: 1.54,
  },
  bookshelf: {
    position: [5.8, 4.8, 5.8],
    target: [-1.84, 0.95, -1.16],
    zoom: 146,
    zoomMultiplier: 1.32,
  },
  whiteboard: {
    position: [5.6, 5.2, 5.6],
    target: [0.38, 2.1, -2.08],
    zoom: 152,
    zoomMultiplier: 1.36,
  },
  'desk-calendar': {
    position: [4.8, 4.1, 4.9],
    target: [-0.46, 0.88, -0.92],
    zoom: 172,
    zoomMultiplier: 1.54,
  },
  'coffee-mug': {
    position: [4.6, 4.0, 4.8],
    target: [-0.24, 0.86, -0.82],
    zoom: 176,
    zoomMultiplier: 1.58,
  },
  'mail-dock': {
    position: [5.0, 4.1, 5.0],
    target: [1.16, 0.88, -0.82],
    zoom: 170,
    zoomMultiplier: 1.52,
  },
};
