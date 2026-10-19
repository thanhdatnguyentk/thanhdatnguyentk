import React, { useEffect } from 'react';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';
import { useReducedMotion } from './hooks/useReducedMotion';
import type { Lang } from './data/translations';
import { WorkspaceCanvas } from './WorkspaceCanvas';
import { WorkspaceControls } from './WorkspaceControls';
import { ProjectInspector } from './ProjectInspector';
import './styles/workspace.css';

interface WorkspaceAppProps {
  baseUrl?: string;
}

export const WorkspaceApp: React.FC<WorkspaceAppProps> = ({
  baseUrl = '/thanhdatnguyentk',
}) => {
  const reducedMotion = useReducedMotion();
  const timeMode = useWorkspaceStore((s) => s.timeMode);
  const lite2DMode = useWorkspaceStore((s) => s.lite2DMode);
  const setLang = useWorkspaceStore((s) => s.setLang);
  const selectObject = useWorkspaceStore((s) => s.selectObject);
  const setLite2DMode = useWorkspaceStore((s) => s.setLite2DMode);

  // 1. Synchronize language with existing Astro document.documentElement.dataset.lang & localStorage
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const readCurrentLang = (): Lang => {
      const docLang = document.documentElement.dataset.lang;
      if (docLang === 'en' || docLang === 'vi' || docLang === 'ja') {
        return docLang;
      }
      try {
        const saved = localStorage.getItem('portfolio_lang');
        if (saved === 'en' || saved === 'vi' || saved === 'ja') {
          return saved;
        }
      } catch {
        // ignore storage errors
      }
      return 'en';
    };

    setLang(readCurrentLang());

    const observer = new MutationObserver(() => {
      setLang(readCurrentLang());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-lang'],
    });

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'portfolio_lang') {
        setLang(readCurrentLang());
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorage);
    };
  }, [setLang]);

  // 2. Check WebGL capability and toggle 2D SVG Fallback container visibility
  useEffect(() => {
    if (typeof document === 'undefined') return;
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      if (!gl) {
        setLite2DMode(true);
      }
    } catch {
      setLite2DMode(true);
    }
  }, [setLite2DMode]);

  // 3. Synchronize visibility of #svg-room-fallback when switching between 3D and 2D Lite mode
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const fallbackEl =
      document.getElementById('svg-room-fallback') ||
      document.getElementById('workspace-svg-fallback');
    if (fallbackEl) {
      fallbackEl.style.display = lite2DMode ? 'block' : 'none';
    }
  }, [lite2DMode]);

  // 4. Synchronize Day/Night mode with existing #room-wrap container attribute
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const roomWrap = document.getElementById('room-wrap');
    if (roomWrap) {
      roomWrap.setAttribute(
        'data-time-mode',
        timeMode === 'night' ? 'night' : 'afternoon'
      );
    }
  }, [timeMode]);

  // 5. Escape key closes Project Inspector & resets camera focus
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectObject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectObject]);

  // Helper to toggle/open the existing Astro Profile Drawer (#home-contents.is-drawer-open)
  const handleOpenProfileDrawer = () => {
    if (typeof document === 'undefined') return;
    const openBtn = document.getElementById('open-drawer-pill');
    if (openBtn) {
      openBtn.click();
      return;
    }
    const homeContents = document.getElementById('home-contents');
    if (homeContents) {
      homeContents.classList.toggle('is-drawer-open');
    }
  };

  return (
    <div
      className="workspace-3d-shell"
      data-time-mode={timeMode}
      style={
        lite2DMode
          ? {
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              pointerEvents: 'none',
            }
          : undefined
      }
    >
      {!lite2DMode && <WorkspaceCanvas reducedMotion={reducedMotion} />}

      <WorkspaceControls onOpenProfileDrawer={handleOpenProfileDrawer} />

      {!lite2DMode && (
        <ProjectInspector
          baseUrl={baseUrl}
          onOpenProfileDrawer={handleOpenProfileDrawer}
        />
      )}
    </div>
  );
};

export default WorkspaceApp;
