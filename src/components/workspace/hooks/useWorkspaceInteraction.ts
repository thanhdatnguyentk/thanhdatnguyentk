import { create } from 'zustand';
import type { Lang } from '../../../data/projects';
import type { InteractiveObjectId } from '../data/cameraPresets';

export type TimeMode = 'day' | 'night';

function getInitialTimeMode(): TimeMode {
  if (typeof window !== 'undefined') {
    try {
      const mode = new URLSearchParams(window.location.search).get('mode');
      if (mode === 'day' || mode === 'night') return mode;
    } catch {
      // ignore
    }
  }
  return 'night';
}

function getInitialFocus(): InteractiveObjectId | null {
  if (typeof window !== 'undefined') {
    try {
      const focus = new URLSearchParams(window.location.search).get('focus');
      if (focus) return focus as InteractiveObjectId;
    } catch {
      // ignore
    }
  }
  return null;
}

interface WorkspaceStoreState {
  lang: Lang;
  timeMode: TimeMode;
  selectedObject: InteractiveObjectId | null;
  hoveredObject: InteractiveObjectId | null;
  introComplete: boolean;
  lite2DMode: boolean;
  setLang: (lang: Lang) => void;
  setTimeMode: (mode: TimeMode) => void;
  toggleTimeMode: () => void;
  selectObject: (id: InteractiveObjectId | null) => void;
  hoverObject: (id: InteractiveObjectId | null) => void;
  resetCamera: () => void;
  setIntroComplete: (done: boolean) => void;
  setLite2DMode: (lite: boolean) => void;
}

export const useWorkspaceStore = create<WorkspaceStoreState>((set) => ({
  lang: 'en',
  timeMode: getInitialTimeMode(),
  selectedObject: getInitialFocus(),
  hoveredObject: null,
  introComplete: false,
  lite2DMode: false,
  setLang: (lang) => set({ lang }),
  setTimeMode: (timeMode) => set({ timeMode }),
  toggleTimeMode: () =>
    set((state) => ({
      timeMode: state.timeMode === 'day' ? 'night' : 'day',
    })),
  selectObject: (selectedObject) => set({ selectedObject }),
  hoverObject: (hoveredObject) => set({ hoveredObject }),
  resetCamera: () => set({ selectedObject: null }),
  setIntroComplete: (introComplete) => set({ introComplete }),
  setLite2DMode: (lite2DMode) => set({ lite2DMode, selectedObject: null }),
}));
