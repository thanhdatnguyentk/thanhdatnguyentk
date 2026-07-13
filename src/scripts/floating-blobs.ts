/**
 * Floating Blobs Animation System
 * ---------------------------------
 * Replaces static CSS oscillation with smooth drift + mouse interaction.
 * Each blob moves toward a random target inside its bounds, then picks a
 * new target. A gentle parallax attraction/repulsion responds to the cursor.
 *
 * Auto-discovers elements matching `.floating-blob` and `.parallax-blob`
 * under sections with `[data-floating-bg]`.
 *
 * Respects prefers-reduced-motion.
 */

interface Blob {
  el: HTMLElement;
  bounds: DOMRect;
  // current x/y in pixels (offset from element's natural position)
  x: number;
  y: number;
  // velocity (px/s for smoothing)
  vx: number;
  vy: number;
  // random target inside bounds (px from bounds top-left)
  tx: number;
  ty: number;
  // timing
  nextTargetAt: number;
  speed: number;
  // base color for tinted glows
  scale: number;
  scaleTarget: number;
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initFloatingBlobs() {
  if (prefersReducedMotion) return;

  // Find all blob candidates: every element with .ambient-blob or .floating-blob
  const blobs = Array.from(document.querySelectorAll<HTMLElement>(
    '.ambient-blob, .floating-blob, .contact__blob'
  ));
  if (blobs.length === 0) return;

  const live: Blob[] = blobs.map((el, idx) => {
    const parent = el.parentElement!;
    const bounds = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const elW = rect.width;
    const elH = rect.height;

    const speed = 30 + Math.random() * 30; // px/sec drift speed
    const initialX = (idx % 3) * 40 - 40;
    const initialY = Math.random() * 60;

    return {
      el,
      bounds,
      x: initialX,
      y: initialY,
      vx: 0,
      vy: 0,
      tx: 0,
      ty: 0,
      nextTargetAt: 0,
      speed,
      scale: 1,
      scaleTarget: 1,
    };
  });

  let mouseX = -1000;
  let mouseY = -1000;
  let lastTime = performance.now();

  function onMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  // Only listen on devices with a real cursor
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  function pickTarget(blob: Blob, time: number) {
    if (time < blob.nextTargetAt) return;

    // Pick a random position within bounds (account for element size)
    // Bounds inset so blob stays mostly visible
    const bx = blob.bounds.width * 0.1;
    const by = blob.bounds.height * 0.1;
    const bw = blob.bounds.width * 0.8 - blob.el.offsetWidth;
    const bh = blob.bounds.height * 0.8 - blob.el.offsetHeight;

    blob.tx = bx + Math.random() * bw;
    blob.ty = by + Math.random() * bh;

    // Schedule next target change (every 4-8 sec)
    blob.nextTargetAt = time + 4000 + Math.random() * 4000;
  }

  function tick(now: number) {
    const dt = Math.min((now - lastTime) / 1000, 0.05); // cap dt at 50ms
    lastTime = now;

    for (const blob of live) {
      // Recompute bounds on first frame (in case layout shifted)
      if (blob === live[0]) {
        const parent = blob.el.parentElement;
        if (parent) blob.bounds = parent.getBoundingClientRect();
      }

      pickTarget(blob, now);

      // Compute desired delta toward target
      const dx = blob.tx - blob.x;
      const dy = blob.ty - blob.y;

      // Smooth approach (ease-out via lerp)
      const ease = 0.6;
      blob.vx += (dx * 0.02 * ease - blob.vx) * 0.1;
      blob.vy += (dy * 0.02 * ease - blob.vy) * 0.1;

      // Apply velocity
      blob.x += blob.vx * dt * (blob.speed / 20);
      blob.y += blob.vy * dt * (blob.speed / 20);

      // Mouse repulsion — push blob away from cursor if close
      const rect = blob.el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const repulseRadius = 240;
      const dxm = cx - mouseX;
      const dym = cy - mouseY;
      const distSq = dxm * dxm + dym * dym;
      const radiusSq = repulseRadius * repulseRadius;

      if (distSq < radiusSq && distSq > 100) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / repulseRadius) * 0.4;
        blob.x += (dxm / dist) * force * dt * 60;
        blob.y += (dym / dist) * force * dt * 60;
        blob.scaleTarget = 1.15;
      } else {
        blob.scaleTarget = 1;
      }

      // Smooth scale interpolation
      blob.scale += (blob.scaleTarget - blob.scale) * 0.08;

      // Apply transform with parallax scroll baked in (scrollY offset)
      const translateY = blob.y - window.scrollY * 0.15;
      blob.el.style.transform =
        `translate3d(${blob.x.toFixed(1)}px, ${translateY.toFixed(1)}px, 0) scale(${blob.scale.toFixed(3)})`;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  // Recompute bounds on resize
  let resizeT: number | null = null;
  window.addEventListener('resize', () => {
    if (resizeT !== null) clearTimeout(resizeT);
    resizeT = window.setTimeout(() => {
      for (const blob of live) {
        const parent = blob.el.parentElement;
        if (parent) blob.bounds = parent.getBoundingClientRect();
      }
    }, 200);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFloatingBlobs);
} else {
  initFloatingBlobs();
}