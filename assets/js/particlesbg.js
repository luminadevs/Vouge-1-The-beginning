// particlesbg.js – Cryptic glowing particle field with breathing energy pulse

const canvas = document.getElementById('bg');
if (!canvas) {
  console.warn("Canvas #bg not found – background animation skipped");
} else {
  const ctx = canvas.getContext('2d', { alpha: true });

  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Adaptive particle count (good balance between perf & density)
  const baseCount = Math.floor((w * h) / 16000);
  const particleCount = Math.min(300, Math.max(140, baseCount));

  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.0,
      vy: (Math.random() - 0.5) * 1.0,
      size: Math.random() * 2.6 + 0.9,
      hue: 188 + Math.random() * 55,          // cyan → deep blue range
      alphaBase: Math.random() * 0.48 + 0.28
    });
  }

  let pulse = 0.28;
  let pulseTarget = 0.28;

  // Slow breathing pulse
  setInterval(() => {
    pulseTarget = Math.random() * 0.72 + 0.12;
  }, 2200);

  function animate() {
    ctx.fillStyle = 'rgba(0, 4, 18, 0.46)';
    ctx.fillRect(0, 0, w, h);

    pulse += (pulseTarget - pulse) * 0.032;

    const globalIntensity = 0.40 + pulse * 0.62;

    particles.forEach(p => {
      p.x += p.vx * (1.0 + pulse * 2.4);
      p.y += p.vy * (1.0 + pulse * 2.4);

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      const alpha = p.alphaBase * (0.52 + pulse * 1.05) * globalIntensity;
      ctx.globalAlpha = Math.min(0.99, alpha);

      ctx.fillStyle = `hsla(${p.hue}, 88%, 65%, ${alpha})`;
      const half = p.size * 0.5;
      ctx.fillRect(p.x - half, p.y - half, p.size, p.size);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();
}