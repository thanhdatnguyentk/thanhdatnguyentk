import React, { useState } from 'react';
import { projects, type Project } from '../../data/projects';
import { useWorkspaceStore } from './hooks/useWorkspaceInteraction';
import { getSceneObject } from './data/sceneObjects';
import { workspaceTranslations } from './data/translations';

interface ProjectInspectorProps {
  baseUrl: string;
  onOpenProfileDrawer: () => void;
}

export const ProjectInspector: React.FC<ProjectInspectorProps> = ({
  baseUrl,
  onOpenProfileDrawer,
}) => {
  const { lang, selectedObject, selectObject } = useWorkspaceStore();
  const [botPromptIdx, setBotPromptIdx] = useState<number>(0);

  if (!selectedObject) return null;

  const sceneObj = getSceneObject(selectedObject);
  if (!sceneObj) return null;

  const t = workspaceTranslations;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  const matchedProjects: Project[] = (sceneObj.projectSlugs ?? [])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

  const renderProjectDetails = (proj: Project, compact = false) => {
    const summaryText = compact
      ? proj.description[lang] ?? proj.description.en
      : proj.longDescription[lang] ?? proj.longDescription.en;
    const roleText = proj.scope?.role?.[lang] ?? proj.scope?.role?.en ?? '';
    const domainText =
      proj.scope?.domain?.[lang] ?? proj.scope?.domain?.en ?? '';
    const highlightsList =
      proj.highlights?.[lang] ?? proj.highlights?.en ?? [];
    const techList = Array.isArray(proj.tech) ? proj.tech : [];
    const caseHref = `${cleanBase}/cases/${proj.slug}/`;

    return (
      <div key={proj.slug} className={compact ? 'ws-mini-project-card' : ''}>
        <div className="ws-mini-project-top">
          <span className="ws-mini-project-num">{proj.caseLabel}</span>
          <span className="ws-tag">{proj.category}</span>
        </div>

        <h4 className="ws-mini-project-title" style={{ marginTop: 4 }}>
          {proj.title}
        </h4>

        <p className="ws-inspector-summary" style={{ marginTop: 6 }}>
          {summaryText}
        </p>

        {!compact && (roleText || domainText) && (
          <div
            className="ws-metrics-grid"
            style={{
              marginTop: 10,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {roleText && (
              <div className="ws-metric-box">
                <div className="ws-metric-lbl">Role</div>
                <div
                  className="ws-metric-val"
                  style={{ fontSize: '11.5px', marginTop: 2 }}
                >
                  {roleText}
                </div>
              </div>
            )}
            {domainText && (
              <div className="ws-metric-box">
                <div className="ws-metric-lbl">Domain</div>
                <div
                  className="ws-metric-val"
                  style={{ fontSize: '11.5px', marginTop: 2 }}
                >
                  {domainText}
                </div>
              </div>
            )}
          </div>
        )}

        {!compact && highlightsList.length > 0 && (
          <ul
            style={{
              margin: '10px 0 0',
              paddingLeft: 18,
              fontSize: '12px',
              lineHeight: 1.55,
              opacity: 0.9,
            }}
          >
            {highlightsList.slice(0, 3).map((item, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="ws-tag-list" style={{ marginTop: 8 }}>
          {techList.slice(0, compact ? 5 : 8).map((tag) => (
            <span key={tag} className="ws-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="ws-inspector-actions" style={{ marginTop: 12 }}>
          <a href={caseHref} className="ws-cta-primary">
            <span>{t.inspector.viewCaseStudy[lang]}</span>
            <span>→</span>
          </a>
          {proj.url && (
            <a
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ws-cta-secondary"
            >
              <span>{t.inspector.viewGithub[lang]}</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>
    );
  };

  const botPrompts = [
    {
      q: t.inspector.robotPrompt1[lang],
      a: t.inspector.robotAnswer1[lang],
    },
    {
      q: t.inspector.robotPrompt2[lang],
      a: t.inspector.robotAnswer2[lang],
    },
  ];

  return (
    <aside
      className="ws-inspector-panel"
      role="dialog"
      aria-label={sceneObj.label[lang]}
    >
      <div className="ws-inspector-header">
        <div>
          <div className="ws-inspector-kicker">{sceneObj.subtitle[lang]}</div>
          <h3 className="ws-inspector-title">{sceneObj.label[lang]}</h3>
        </div>
        <button
          type="button"
          className="ws-inspector-close"
          onClick={() => selectObject(null)}
          aria-label={t.inspector.close[lang]}
          title={`${t.inspector.close[lang]} (Esc)`}
        >
          ✕
        </button>
      </div>

      <div className="ws-inspector-body">
        {/* 1. Single Project Mode */}
        {sceneObj.inspectorKind === 'single-project' &&
          matchedProjects[0] &&
          renderProjectDetails(matchedProjects[0], false)}

        {/* 2. Robot RAG Mode (RAG Film Chatbot + Interactive Scripted Prompt Demo) */}
        {sceneObj.inspectorKind === 'robot-rag' && (
          <>
            {matchedProjects[0] &&
              renderProjectDetails(matchedProjects[0], false)}
            <div className="ws-bot-chat">
              <div className="ws-inspector-kicker">
                {t.inspector.robotBadge[lang]}
              </div>
              <p className="ws-inspector-summary" style={{ fontSize: 12 }}>
                {t.inspector.robotGreeting[lang]}
              </p>
              <div className="ws-bot-prompts">
                {botPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`ws-bot-prompt-btn ${
                      botPromptIdx === idx ? 'is-active' : ''
                    }`}
                    onClick={() => setBotPromptIdx(idx)}
                  >
                    ▸ {item.q}
                  </button>
                ))}
              </div>
              <div className="ws-bot-answer">
                {botPrompts[botPromptIdx]?.a}
              </div>
            </div>
          </>
        )}

        {/* 3. Dual Galaxy or GPU Compute Mode */}
        {(sceneObj.inspectorKind === 'dual-galaxy' ||
          sceneObj.inspectorKind === 'gpu-compute') && (
          <>
            <p className="ws-inspector-summary">
              {sceneObj.inspectorKind === 'dual-galaxy'
                ? t.inspector.galaxyDualSub[lang]
                : t.inspector.gpuLabSub[lang]}
            </p>
            <div className="ws-mini-project-list">
              {matchedProjects.map((proj) => renderProjectDetails(proj, true))}
            </div>
          </>
        )}

        {/* 4. All 7 Projects Overview Mode (Main Ultrawide Monitor) */}
        {sceneObj.inspectorKind === 'all-projects' && (
          <>
            <p className="ws-inspector-summary">
              {t.inspector.allProjectsSub[lang]}
            </p>
            <div className="ws-mini-project-list">
              {projects.map((proj) => renderProjectDetails(proj, true))}
            </div>
            <div className="ws-inspector-actions">
              <a href={`${cleanBase}/cases/`} className="ws-cta-primary">
                <span>{t.controls.allProjects[lang]}</span>
                <span>→</span>
              </a>
            </div>
          </>
        )}

        {/* 5. Skills / Architecture Research Mode (Bookshelf & Whiteboard) */}
        {(sceneObj.inspectorKind === 'skills' ||
          sceneObj.inspectorKind === 'about') && (
          <>
            <p className="ws-inspector-summary">
              {t.inspector.skillsSub[lang]}
            </p>
            <div className="ws-mini-project-card">
              <div className="ws-inspector-kicker">AI / ML & Deep Learning</div>
              <div className="ws-tag-list">
                {[
                  'PyTorch',
                  'Transformers',
                  'CLIP / SigLIP',
                  'BLIP-2',
                  'YOLOv8',
                  'FAISS',
                  'Qdrant',
                  'LangChain',
                  'Hybrid RAG',
                  'Whisper ASR',
                ].map((s) => (
                  <span key={s} className="ws-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="ws-mini-project-card">
              <div className="ws-inspector-kicker">
                Systems, GPU & Full-Stack Engineering
              </div>
              <div className="ws-tag-list">
                {[
                  'Python',
                  'C++ / CUDA',
                  'Java 21 (JavaTorch)',
                  'TypeScript',
                  'Three.js / WebGL2 / WebGPU',
                  'FastAPI',
                  'Docker',
                  'Linux',
                ].map((s) => (
                  <span key={s} className="ws-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="ws-inspector-actions">
              <button
                type="button"
                className="ws-cta-primary"
                onClick={onOpenProfileDrawer}
              >
                <span>{t.controls.openDrawer[lang]}</span>
                <span>→</span>
              </button>
              <a href={`${cleanBase}/cases/about/`} className="ws-cta-secondary">
                <span>About / Dossier →</span>
              </a>
            </div>
          </>
        )}

        {/* 6. Academic Background Mode (UIT Frame & Calendar) */}
        {sceneObj.inspectorKind === 'academic' && (
          <>
            <div className="ws-mini-project-card">
              <div className="ws-inspector-kicker">
                {t.inspector.academicPeriod[lang]}
              </div>
              <h4 className="ws-mini-project-title">
                {t.inspector.academicInstitution[lang]}
              </h4>
              <p className="ws-inspector-summary" style={{ marginTop: 6 }}>
                {t.inspector.academicDegree[lang]}
              </p>
              <ul
                style={{
                  margin: '8px 0 0',
                  paddingLeft: 18,
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              >
                {t.inspector.academicHighlights[lang].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ws-inspector-actions">
              <a href={`${cleanBase}/cases/about/`} className="ws-cta-primary">
                <span>{t.inspector.viewCaseStudy[lang]}</span>
                <span>→</span>
              </a>
              <button
                type="button"
                className="ws-cta-secondary"
                onClick={onOpenProfileDrawer}
              >
                <span>{t.controls.openDrawer[lang]}</span>
              </button>
            </div>
          </>
        )}

        {/* 7. Contact & Social Dock Mode */}
        {sceneObj.inspectorKind === 'contact' && (
          <>
            <p className="ws-inspector-summary">
              {t.inspector.contactSub[lang]}
            </p>
            <div className="ws-mini-project-card">
              <div className="ws-inspector-kicker">
                {t.inspector.contactTitle[lang]}
              </div>
              <div className="ws-inspector-actions" style={{ marginTop: 6 }}>
                <a
                  href="mailto:thanhdatnguyentk@gmail.com"
                  className="ws-cta-primary"
                >
                  <span>✉ {t.inspector.emailMe[lang]}</span>
                </a>
                <a
                  href="https://github.com/thanhdatnguyentk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ws-cta-secondary"
                >
                  <span>{t.inspector.githubProfile[lang]} ↗</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/thanhdatnguyentk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ws-cta-secondary"
                >
                  <span>LinkedIn ↗</span>
                </a>
              </div>
            </div>
          </>
        )}

        {/* 8. Coffee Mug Easter Egg Mode */}
        {sceneObj.inspectorKind === 'coffee' && (
          <div className="ws-mini-project-card">
            <div className="ws-inspector-kicker">
              {t.inspector.coffeeTitle[lang]}
            </div>
            <p
              className="ws-inspector-summary"
              style={{
                fontStyle: 'italic',
                fontSize: '13.5px',
                marginTop: 6,
              }}
            >
              {t.inspector.coffeeSub[lang]}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
