import { create } from 'zustand';
import type { Lang } from '../../../data/projects';
import type { InteractiveObjectId } from '../data/cameraPresets';

export type TimeMode = 'day' | 'night';

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
  timeMode: 'night',
  selectedObject: null,
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
