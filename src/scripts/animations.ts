/**
 * Mild Sugar Design Interactive Controller (EN / VI / JA Synchronized)
 * Powers:
 * 0. Instant Language Switcher (EN / VI / JA) persisted in localStorage
 * 1. Morphing 3-dot orange menu (#menu-toggle-btn / #header-menu)
 * 2. Home orange loading cover (#home-loading)
 * 3. Interactive AI Room (Afternoon/Night toggle + Slide-out profile drawer)
 * 4. Full-screen Case Showcase switcher (wheel, touch swipe, keyboard, dot nav, ?case= query)
 * 5. 220px Orange Floating Stalker Cursor ("Hey!" & "View Detail ↗")
 * 6. Editorial single page word-by-word reveal & Orange Curtain transition
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =====================================================================
   0. Instant Language Switcher (EN / VI / JA)
   ===================================================================== */
function initLanguageSwitcher() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-set-lang]');
  if (buttons.length === 0) return;

  function applyLang(lang: 'en' | 'vi' | 'ja') {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    try {
      localStorage.setItem('portfolio_lang', lang);
    } catch {}
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = btn.dataset.setLang;
      if (lang === 'en' || lang === 'vi' || lang === 'ja') {
        applyLang(lang);
      }
    });
  });
}

/* =====================================================================
   1. Morphing 3-Dot Orange Header Menu
   ===================================================================== */
function initHeaderMenu() {
  const btn = document.getElementById('menu-toggle-btn');
  const menu = document.getElementById('header-menu');
  if (!btn || !menu) return;

  function setMenuOpen(open: boolean) {
    btn!.setAttribute('aria-expanded', String(open));
    menu!.classList.toggle('is-open', open);
    if (open) {
      menu!.removeAttribute('inert');
    } else {
      menu!.setAttribute('inert', '');
    }
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    if (!menu.contains(target) && !btn.contains(target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });
}

/* =====================================================================
   2. Home Orange Loading Cover & Interactive Room + Drawer
   ===================================================================== */
function initHomeExperience() {
  const loading = document.getElementById('home-loading');
  const contents = document.getElementById('home-contents');
  const roomWrap = document.getElementById('room-wrap');
  const trigger = document.getElementById('character-trigger');
  const openPill = document.getElementById('open-drawer-pill');
  const closeBtn = document.getElementById('close-drawer-btn');
  const timeBtn = document.getElementById('time-toggle-btn');

  if (loading) {
    const alreadyShown = sessionStorage.getItem('msd_intro_shown') === '1';
    if (prefersReducedMotion || alreadyShown) {
      loading.classList.add('is-hidden');
    } else {
      const hide = () => {
        loading.classList.add('is-hidden');
        sessionStorage.setItem('msd_intro_shown', '1');
      };
      setTimeout(hide, 950);
      loading.addEventListener('click', hide, { once: true });
    }
  }

  if (!contents) return;

  // Auto-detect Afternoon vs Night mode from current hour
  if (roomWrap && timeBtn) {
    const hour = new Date().getHours();
    let mode: 'afternoon' | 'night' = hour >= 18 || hour < 6 ? 'night' : 'afternoon';
    const lblAfternoon = timeBtn.querySelector<HTMLElement>('.time-lbl-afternoon');
    const lblNight = timeBtn.querySelector<HTMLElement>('.time-lbl-night');

    const applyTimeMode = (m: 'afternoon' | 'night') => {
      roomWrap.setAttribute('data-time-mode', m);
      if (lblAfternoon && lblNight) {
        lblAfternoon.style.display = m === 'afternoon' ? 'inline' : 'none';
        lblNight.style.display = m === 'night' ? 'inline' : 'none';
      }
    };

    applyTimeMode(mode);

    timeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mode = mode === 'afternoon' ? 'night' : 'afternoon';
      applyTimeMode(mode);
    });
  }

  function setDrawerOpen(open: boolean) {
    contents!.classList.toggle('is-drawer-open', open);
    if (trigger) {
      trigger.setAttribute('aria-expanded', String(open));
    }
    if (openPill) {
      const openSpan = openPill.querySelector<HTMLElement>('.drawer-lbl-open');
      const hideSpan = openPill.querySelector<HTMLElement>('.drawer-lbl-hide');
      if (openSpan && hideSpan) {
        openSpan.style.display = open ? 'none' : 'inline';
        hideSpan.style.display = open ? 'inline' : 'none';
      }
    }
  }

  if (trigger) {
    trigger.addEventListener('click', () => {
      const isOpen = contents.classList.contains('is-drawer-open');
      setDrawerOpen(!isOpen);
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = contents.classList.contains('is-drawer-open');
        setDrawerOpen(!isOpen);
      }
    });
  }

  if (openPill) {
    openPill.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = contents.classList.contains('is-drawer-open');
      setDrawerOpen(!isOpen);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => setDrawerOpen(false));
  }
}

/* =====================================================================
   3. Full-Screen Case Showcase Switcher (/cases/)
   ===================================================================== */
function initCaseShowcase() {
  const showcase = document.getElementById('case-showcase');
  if (!showcase) return;

  const backgrounds = Array.from(
    showcase.querySelectorAll<HTMLElement>('.p-case-contents__background')
  );
  const slides = Array.from(
    showcase.querySelectorAll<HTMLElement>('.p-case-contents__main')
  );
  const navButtons = Array.from(
    showcase.querySelectorAll<HTMLButtonElement>('.p-case-contents__nav .button')
  );
  const prevBtn = document.getElementById('case-prev-btn');
  const nextBtn = document.getElementById('case-next-btn');
  const counterEl = document.getElementById('case-counter');

  const total = slides.length;
  if (total === 0) return;

  let currentIndex = 1;
  let isTransitioning = false;

  function goToSlide(targetIdx: number) {
    const normalized = ((targetIdx - 1 + total) % total) + 1;
    currentIndex = normalized;

    backgrounds.forEach((bg) => {
      const idx = Number(bg.dataset.background);
      bg.classList.toggle('is-active', idx === currentIndex);
    });

    slides.forEach((slide) => {
      const idx = Number(slide.dataset.list);
      slide.classList.toggle('is-active', idx === currentIndex);
    });

    navButtons.forEach((btn) => {
      const idx = Number(btn.dataset.nav);
      btn.classList.toggle('is-current', idx === currentIndex);
    });

    if (counterEl) {
      counterEl.textContent = `${currentIndex} / ${total}`;
    }
  }

  const params = new URLSearchParams(window.location.search);
  const caseParam = params.get('case');
  if (caseParam) {
    if (caseParam.toLowerCase() === 'contact') {
      goToSlide(total);
    } else if (/^\d+$/.test(caseParam)) {
      goToSlide(Number(caseParam));
    } else {
      const matched = slides.find((s) => s.dataset.caseId === caseParam);
      if (matched && matched.dataset.list) {
        goToSlide(Number(matched.dataset.list));
      }
    }
  }

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = Number(btn.dataset.nav);
      if (target) goToSlide(target);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  window.addEventListener(
    'wheel',
    (e) => {
      if (isTransitioning) return;
      if (Math.abs(e.deltaY) < 24) return;
      isTransitioning = true;
      if (e.deltaY > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
      setTimeout(() => {
        isTransitioning = false;
      }, 650);
    },
    { passive: true }
  );

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    }
  });

  let touchStartY = 0;
  showcase.addEventListener(
    'touchstart',
    (e) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    },
    { passive: true }
  );

  showcase.addEventListener(
    'touchend',
    (e) => {
      const touchEndY = e.changedTouches[0]?.clientY ?? 0;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 45) {
        if (diff > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
      }
    },
    { passive: true }
  );
}

/* =====================================================================
   4. Floating 220px Orange Stalker Cursor
   ===================================================================== */
function initStalkerCursor() {
  if (prefersReducedMotion) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  const stalker = document.getElementById('stalker-cursor');
  const stalkerText = document.getElementById('stalker-text');
  const stalkerArrow = document.getElementById('stalker-arrow');
  if (!stalker || !stalkerText || !stalkerArrow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;
  let isVisible = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-stalker]');
    if (target) {
      const mode = target.dataset.stalker;
      isVisible = true;
      stalker.classList.add('is-visible');
      if (mode === 'detail') {
        stalker.classList.add('is-detail');
        stalkerText.textContent = 'View Detail';
        stalkerArrow.style.display = 'block';
      } else {
        stalker.classList.remove('is-detail');
        stalkerText.textContent = 'Hey!';
        stalkerArrow.style.display = 'none';
      }
    } else if (isVisible) {
      isVisible = false;
      stalker.classList.remove('is-visible');
    }
  });

  function tick() {
    curX += (mouseX - curX) * 0.16;
    curY += (mouseY - curY) * 0.16;
    const scale = isVisible ? 1 : 0.35;
    stalker!.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%) scale(${scale})`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* =====================================================================
   5. Single Editorial Headline Reveal & Orange Curtain Transition
   ===================================================================== */
function initSingleAndTransitions() {
  const single = document.getElementById('single-page');
  if (single) {
    requestAnimationFrame(() => {
      setTimeout(() => {
        single.classList.add('is-ready');
      }, 60);
    });
  }

  const curtain = document.getElementById('page-transition');
  if (!curtain || prefersReducedMotion) return;

  document.querySelectorAll<HTMLAnchorElement>('a[data-nav-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || link.target === '_blank' || e.metaKey || e.ctrlKey) {
        return;
      }
      e.preventDefault();
      curtain.classList.add('is-active');
      setTimeout(() => {
        window.location.href = href;
      }, 320);
    });
  });
}

function init() {
  initLanguageSwitcher();
  initHeaderMenu();
  initHomeExperience();
  initCaseShowcase();
  initStalkerCursor();
  initSingleAndTransitions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}