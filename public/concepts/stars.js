(() => {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.25 + 0.25,
    v: Math.random() * 0.0001 + 0.00002,
    a: Math.random() * 0.5 + 0.2,
    tint: Math.random() > 0.82 ? '#67e8f9' : Math.random() > 0.7 ? '#c4b5fd' : '#ffffff',
  }));
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
  };
  const draw = () => {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      if (!reduce) s.y -= s.v;
      if (s.y < 0) s.y = 1;
      ctx.globalAlpha = s.a;
      ctx.fillStyle = s.tint;
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r * (window.devicePixelRatio || 1), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reduce && !document.hidden) requestAnimationFrame(draw);
  };
  resize();
  draw();
  addEventListener('resize', () => { resize(); if (reduce) draw(); });
})();
