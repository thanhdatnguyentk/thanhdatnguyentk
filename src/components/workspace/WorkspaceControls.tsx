import React, { useState } from 'react';
import { useWorkspaceStore, type SceneObjectId } from './hooks/useWorkspaceInteraction';
import { workspaceTranslations } from './data/translations';
import { getSceneObject } from './data/sceneObjects';
import { projects } from '../../data/projects';

interface WorkspaceControlsProps {
  onOpenProfileDrawer: () => void;
}

const PROJECT_TO_STATION: Record<string, SceneObjectId> = {
  'video-retrieval': 'video-monitor',
  'milky-way': 'galaxy-hologram',
  javatorch: 'gpu-server',
  'rag-chatbot': 'ai-robot',
  'traffic-monitoring': 'cctv-display',
  'uit-pinance': 'finance-display',
  'solar-simulation': 'galaxy-hologram',
};

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

  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);

  const t = workspaceTranslations;
  const hoveredMeta = hoveredObject ? getSceneObject(hoveredObject) : undefined;
  const rawBase = import.meta.env.BASE_URL || '/thanhdatnguyentk/';
  const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  const handleSelectStation = (id: SceneObjectId) => {
    setProjectsMenuOpen(false);
    selectObject(selectedObject === id ? null : id);
  };

  return (
    <>
      {/* ── Top Refined Minimal Utility Controls ── */}
      <div className="ws-hud-top">
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

      {/* ── Asymmetric Editorial Hero Identity (Left Column on Desktop) ── */}
      {!lite2DMode && (
        <aside
          className={`ws-editorial-hero ${
            selectedObject ? 'is-compact' : ''
          }`}
          aria-label="Engineer Introduction"
        >
          <div className="ws-badge">
            <span className="ws-badge-dot" />
            <span>{t.heroEyebrow[lang]}</span>
          </div>

          <p className="ws-editorial-kicker">
            <span className="ws-kicker-line" />
            <span>{t.heroGreeting[lang]}</span>
          </p>

          <h1 className="ws-editorial-title">{t.heroTitle[lang]}</h1>

          <p className="ws-editorial-subtitle">{t.heroSubtitle[lang]}</p>

          <div className="ws-editorial-actions">
            <button
              type="button"
              className="ws-editorial-cta ws-editorial-cta-primary"
              onClick={() => handleSelectStation('main-monitor')}
            >
              <span>✦</span>
              <span>{t.heroPrimaryCta[lang]}</span>
            </button>

            <button
              type="button"
              className="ws-editorial-cta ws-editorial-cta-secondary"
              onClick={onOpenProfileDrawer}
            >
              <span>◈</span>
              <span>{t.heroSecondaryCta[lang]}</span>
            </button>
          </div>

          <div className="ws-editorial-metrics">
            <button
              type="button"
              className="ws-metric-chip"
              onClick={() => handleSelectStation('video-monitor')}
            >
              <span className="ws-metric-val">AIC-26</span>
              <span className="ws-metric-lbl">Video Retrieval</span>
            </button>
            <button
              type="button"
              className="ws-metric-chip"
              onClick={() => handleSelectStation('galaxy-hologram')}
            >
              <span className="ws-metric-val">WebGL2</span>
              <span className="ws-metric-lbl">Milky Way 3D</span>
            </button>
            <button
              type="button"
              className="ws-metric-chip"
              onClick={() => handleSelectStation('gpu-server')}
            >
              <span className="ws-metric-val">CUDA</span>
              <span className="ws-metric-lbl">JavaTorch GPU</span>
            </button>
          </div>

          <div className="ws-editorial-hint">
            <span className="ws-hint-dot" />
            <span>{t.instructionHint[lang]}</span>
          </div>
        </aside>
      )}

      {/* ── Clean Hover Status Pill (Top-Center when hovering a 3D object) ── */}
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

      {/* ── Premium Floating Project Dock (Bottom Center) ── */}
      {!lite2DMode && (
        <div className="ws-hud-bottom">
          {/* Expandable All-7-Projects Popover Menu */}
          {projectsMenuOpen && (
            <div
              className="ws-dock-popover"
              role="dialog"
              aria-label={t.dock.projectsMenuTitle[lang]}
            >
              <div className="ws-dock-popover-head">
                <span className="ws-dock-popover-title">
                  {t.dock.projectsMenuTitle[lang]}
                </span>
                <button
                  type="button"
                  className="ws-dock-popover-close"
                  onClick={() => setProjectsMenuOpen(false)}
                  aria-label="Close project menu"
                >
                  ✕
                </button>
              </div>
              <div className="ws-dock-popover-grid">
                {projects.map((proj) => {
                  const stationId =
                    PROJECT_TO_STATION[proj.id] || 'main-monitor';
                  const isActive = selectedObject === stationId;
                  return (
                    <div
                      key={proj.id}
                      className={`ws-dock-proj-item ${
                        isActive ? 'is-active' : ''
                      }`}
                    >
                      <button
                        type="button"
                        className="ws-dock-proj-focus"
                        onClick={() => handleSelectStation(stationId)}
                      >
                        <span className="ws-dock-proj-num">
                          {proj.icon} #{proj.number}
                        </span>
                        <span className="ws-dock-proj-name">
                          {proj.title[lang]}
                        </span>
                        <span className="ws-dock-proj-sub">
                          {t.dock.inspectIn3D[lang]}
                        </span>
                      </button>
                      <a
                        href={`${baseUrl}projects/${proj.slug}/`}
                        className="ws-dock-proj-link"
                        title={t.dock.openCaseStudy[lang]}
                      >
                        ↗
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Unified Floating Atelier Dock Bar */}
          <nav
            className="ws-atelier-dock"
            aria-label={t.controls.quickJump[lang]}
          >
            <button
              type="button"
              className={`ws-dock-btn ${
                !selectedObject && !projectsMenuOpen ? 'is-active' : ''
              }`}
              onClick={() => {
                setProjectsMenuOpen(false);
                resetCamera();
              }}
            >
              <span className="ws-dock-icon">⬡</span>
              <span>{t.dock.exploreLab[lang]}</span>
            </button>

            <button
              type="button"
              className={`ws-dock-btn ${
                projectsMenuOpen || selectedObject === 'main-monitor'
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => setProjectsMenuOpen((prev) => !prev)}
              aria-expanded={projectsMenuOpen}
            >
              <span className="ws-dock-icon">✦</span>
              <span>{t.dock.allProjects[lang]}</span>
            </button>

            <span className="ws-dock-divider" aria-hidden="true" />

            <button
              type="button"
              className={`ws-dock-btn ${
                selectedObject === 'whiteboard' ? 'is-active' : ''
              }`}
              onClick={() => handleSelectStation('whiteboard')}
            >
              <span className="ws-dock-icon">◈</span>
              <span>{t.dock.aboutMe[lang]}</span>
            </button>

            <button
              type="button"
              className={`ws-dock-btn ${
                selectedObject === 'bookshelf' ? 'is-active' : ''
              }`}
              onClick={() => handleSelectStation('bookshelf')}
            >
              <span className="ws-dock-icon">📚</span>
              <span>{t.dock.skills[lang]}</span>
            </button>

            <button
              type="button"
              className={`ws-dock-btn ${
                selectedObject === 'mail-dock' ? 'is-active' : ''
              }`}
              onClick={() => handleSelectStation('mail-dock')}
            >
              <span className="ws-dock-icon">✉</span>
              <span>{t.dock.contact[lang]}</span>
            </button>

            {selectedObject && (
              <>
                <span className="ws-dock-divider" aria-hidden="true" />
                <button
                  type="button"
                  className="ws-dock-btn ws-dock-btn-reset"
                  onClick={() => {
                    setProjectsMenuOpen(false);
                    resetCamera();
                  }}
                >
                  <span className="ws-dock-icon">↺</span>
                  <span>{t.dock.resetCamera[lang]}</span>
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};
