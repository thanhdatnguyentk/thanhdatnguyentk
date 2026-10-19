import { useMemo } from 'react';
import {
  DEFAULT_CAMERA_PRESET,
  OBJECT_CAMERA_PRESETS,
  type CameraPreset,
  type InteractiveObjectId,
} from '../data/cameraPresets';

export function useCameraFocus(selectedObject: InteractiveObjectId | null): CameraPreset {
  return useMemo(() => {
    if (!selectedObject) return DEFAULT_CAMERA_PRESET;
    return OBJECT_CAMERA_PRESETS[selectedObject] ?? DEFAULT_CAMERA_PRESET;
  }, [selectedObject]);
}
