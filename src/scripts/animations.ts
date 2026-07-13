/**
 * Animation controllers — wired in src/layouts/Base.astro
 * Runs on every page load. Idempotent and reduced-motion aware.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =====================================================================
   Scroll reveal observer — adds `is-visible` to `.reveal` elements
   ===================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll<HTMLElement>('.reveal');
  if (reveals.length === 0) return;

  if (prefersReducedMotion) {
    reveals.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* =====================================================================
   3D tilt effect — applies to elements with `.tilt-card`
   ===================================================================== */
function initTiltCards() {
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll<HTMLElement>('.tilt-card');
  cards.forEach((card) => {
    let rafId: number | null = null;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const xPct = (cx / rect.width - 0.5) * 2;   // -1..1
      const yPct = (cy / rect.height - 0.5) * 2;  // -1..1
      const maxAngle = 6;

      card.style.setProperty('--mx', `${cx}px`);
      card.style.setProperty('--my', `${cy}px`);

      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateY(${xPct * maxAngle}deg) rotateX(${-yPct * maxAngle}deg) translateZ(0)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      card.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });
}

/* =====================================================================
   Magnetic buttons — slight pull toward cursor
   ===================================================================== */
function initMagnetic() {
  if (prefersReducedMotion) return;

  const magnets = document.querySelectorAll<HTMLElement>('.magnetic');
  magnets.forEach((el) => {
    let rafId: number | null = null;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const strength = 0.25;

      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
    });

    el.addEventListener('mouseleave', () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      el.style.transform = 'translate(0, 0)';
    });
  });
}

/* =====================================================================
   Parallax blobs — translate based on scroll position
   ===================================================================== */
function initParallaxBlobs() {
  if (prefersReducedMotion) return;

  const blobs = document.querySelectorAll<HTMLElement>('.parallax-blob');
  if (blobs.length === 0) return;

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      blobs.forEach((blob, idx) => {
        const speed = 0.15 + (idx % 3) * 0.05;
        const offset = y * speed;
        blob.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* =====================================================================
   Number counter — animates from 0 to target when in view
   ===================================================================== */
function initCounters() {
  if (prefersReducedMotion) {
    document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
      el.textContent = el.dataset.counterTarget ?? el.textContent ?? '';
    });
    return;
  }

  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.counter ?? '0', 10);
        const duration = 1500;
        const startTime = performance.now();

        function step(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased).toLocaleString();
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* =====================================================================
   Cursor follower — glowing dot following cursor
   ===================================================================== */
function initCursorFollower() {
  if (prefersReducedMotion) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  let dotX = 0;
  let dotY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let visible = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!visible) {
      dot.classList.add('is-active');
      visible = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('is-active');
    visible = false;
  });

  // Enlarge when hovering interactive elements
  const interactive = 'a, button, md-filled-button, md-outlined-button, md-filled-tonal-button, md-icon-button, .magnetic, .projects__card, .skills__card, .tilt-card';
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(interactive)) dot.classList.add('is-hover');
  });
  document.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(interactive)) dot.classList.remove('is-hover');
  });

  function tick() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();
}

/* =====================================================================
   Text scramble — scrambles target text on hover
   ===================================================================== */
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

function scramble(el: HTMLElement, finalText: string, duration = 800) {
  if (prefersReducedMotion) {
    el.textContent = finalText;
    return;
  }
  const chars = finalText.split('');
  const total = chars.length;
  const start = performance.now();
  let frame = 0;

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    let output = '';
    for (let i = 0; i < total; i++) {
      const charProgress = Math.max(0, Math.min(1, (progress * 1.4) - i / total * 0.5));
      if (charProgress === 1) {
        output += chars[i];
      } else if (charProgress > 0) {
        output += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      } else {
        output += ' ';
      }
    }
    el.textContent = output;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = finalText;
    frame++;
  }

  requestAnimationFrame(tick);
  void frame;
}

function initScramble() {
  if (prefersReducedMotion) return;
  const targets = document.querySelectorAll<HTMLElement>('[data-scramble]');
  targets.forEach((el) => {
    const original = el.dataset.scramble ?? el.textContent ?? '';
    el.classList.add('scramble-text');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scramble(el, original, 1200);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
  });
}

/* =====================================================================
   Init all
   ===================================================================== */
function init() {
  initScrollReveal();
  initTiltCards();
  initMagnetic();
  initParallaxBlobs();
  initCounters();
  initCursorFollower();
  initScramble();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}