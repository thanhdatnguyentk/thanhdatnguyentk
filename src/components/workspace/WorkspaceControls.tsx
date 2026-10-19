import React from 'react';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';
import { workspaceTranslations } from './data/translations';
import { SCENE_OBJECTS, getSceneObject } from './data/sceneObjects';

interface WorkspaceControlsProps {
  onOpenProfileDrawer: () => void;
}

export const WorkspaceControls: React.FC<WorkspaceControlsProps> = ({
  onOpenProfileDrawer,
}) => {
  const {
    lang,
    timeMode,
    selectedObject,
    hoveredObject,
    lite2DMode,
    toggleTimeMode,
    selectObject,
    resetCamera,
    setLite2DMode,
  } = useWorkspaceStore();

  const t = workspaceTranslations;
  const hoveredMeta = hoveredObject ? getSceneObject(hoveredObject) : undefined;

  const quickStations = SCENE_OBJECTS.filter((obj) =>
    [
      'video-monitor',
      'galaxy-hologram',
      'gpu-server',
      'ai-robot',
      'cctv-display',
      'finance-display',
      'main-monitor',
    ].includes(obj.id)
  );

  return (
    <>
      {/* Top Minimalist Scientific HUD */}
      <div className="ws-hud-top">
        <div className="ws-hud-group">
          <div className="ws-badge">
            <span className="ws-badge-dot" />
            <span>{t.heroEyebrow[lang]}</span>
          </div>
          {selectedObject && (
            <button
              type="button"
              className="ws-btn is-active"
              onClick={resetCamera}
              title={t.controls.resetCamera[lang]}
            >
              <span>↺</span>
              <span>{t.controls.resetCamera[lang]}</span>
            </button>
          )}
        </div>

        <div className="ws-hud-group">
          <button
            type="button"
            className="ws-btn"
            onClick={toggleTimeMode}
            aria-label="Toggle Day and Night lighting"
          >
            <span>
              {timeMode === 'night'
                ? t.controls.dayMode[lang]
                : t.controls.nightMode[lang]}
            </span>
          </button>

          <button
            type="button"
            className="ws-btn"
            onClick={onOpenProfileDrawer}
          >
            <span>◈</span>
            <span>{t.controls.openDrawer[lang]}</span>
          </button>

          <button
            type="button"
            className={`ws-btn ${lite2DMode ? 'is-active' : ''}`}
            onClick={() => setLite2DMode(!lite2DMode)}
          >
            <span>{lite2DMode ? '⬡' : '▣'}</span>
            <span>
              {lite2DMode
                ? t.controls.switch3D[lang]
                : t.controls.switch2D[lang]}
            </span>
          </button>
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredMeta && !selectedObject && !lite2DMode && (
        <div className="ws-hover-tooltip" role="status" aria-live="polite">
          <span
            className="ws-chip-dot"
            style={{ ['--chip-accent' as string]: hoveredMeta.accentColor }}
          />
          <span className="ws-hover-title">{hoveredMeta.label[lang]}</span>
          <span className="ws-hover-sub">— {hoveredMeta.subtitle[lang]}</span>
        </div>
      )}

      {/* Bottom Quick-Select Station Dock & Hint */}
      {!lite2DMode && (
        <div className="ws-hud-bottom">
          <div className="ws-hint-pill">
            <span>✦</span>
            <span>{t.instructionHint[lang]}</span>
          </div>

          <div
            className="ws-quick-dock"
            role="toolbar"
            aria-label={t.controls.quickJump[lang]}
          >
            {quickStations.map((station) => {
              const isSelected = selectedObject === station.id;
              return (
                <button
                  key={station.id}
                  type="button"
                  className={`ws-dock-chip ${isSelected ? 'is-selected' : ''}`}
                  style={{ ['--chip-accent' as string]: station.accentColor }}
                  onClick={() =>
                    selectObject(isSelected ? null : station.id)
                  }
                >
                  <span className="ws-chip-dot" />
                  <span>{station.shortHint[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
