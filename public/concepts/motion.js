(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  const nodes = [...document.querySelectorAll('[data-reveal]')];
  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach((el) => io.observe(el));
  }

  document.querySelectorAll('[data-slider]').forEach((root) => {
    const slides = [...root.querySelectorAll('[data-slide]')];
    const dots = [...root.querySelectorAll('[data-dot]')];
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    if (!slides.length) return;
    let i = Math.max(0, slides.findIndex((s) => s.classList.contains('is-active')));
    let timer = 0;

    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, idx) => {
        const on = idx === i;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      dots.forEach((d, idx) => {
        const on = idx === i;
        d.classList.toggle('is-active', on);
        d.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    };

    const stop = () => { if (timer) window.clearInterval(timer); timer = 0; };
    const start = () => {
      stop();
      if (reduce || slides.length < 2) return;
      timer = window.setInterval(() => show(i + 1), 6800);
    };

    prev?.addEventListener('click', () => { show(i - 1); start(); });
    next?.addEventListener('click', () => { show(i + 1); start(); });
    dots.forEach((d, idx) => d.addEventListener('click', () => { show(idx); start(); }));

    let x0 = null;
    root.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 48) show(dx < 0 ? i + 1 : i - 1);
      x0 = null;
      start();
    }, { passive: true });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget)) start();
    });

    show(i);
    start();
  });
})();
