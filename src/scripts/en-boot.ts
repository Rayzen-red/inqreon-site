/** Page behavior that does not need Three.js: terminal, pricing, compare slider, reveals. */
import { PRICES, formatRange } from '../data/prices';

const reduce = () => document.documentElement.classList.contains('reduce-motion');
const ru = () => document.documentElement.lang === 'ru';

const canObserve = () => typeof IntersectionObserver === 'function';

export function initEnPage(): void {
  document.documentElement.classList.add('js');
  if (!canObserve()) document.documentElement.classList.add('no-io');
  initNav();
  initProgressFallback();
  initTerminal();
  initPricing();
  initCompare();
  initReveals();
  initPipe();
  initRescue();
}

function initNav(): void {
  const nav = document.querySelector<HTMLElement>('#nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initProgressFallback(): void {
  const bar = document.querySelector<HTMLElement>('#progress');
  if (!bar || CSS.supports('animation-timeline: scroll()')) return;
  const paint = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  paint();
  window.addEventListener('scroll', paint, { passive: true });
}

function initTerminal(): void {
  const body = document.querySelector<HTMLElement>('#termBody');
  const status = document.querySelector<HTMLElement>('#termStatus');
  const term = document.querySelector<HTMLElement>('#term');
  const toggle = document.querySelector<HTMLButtonElement>('#replay');
  if (!body || !status || !term || !toggle) return;

  const lines: Array<['info' | 'ok' | 'err' | 'fix', string]> = [
    ['info', '$ open your-app --preview'],
    ['ok', 'preview looks great'],
    ['info', '$ deploy --production'],
    ['err', 'auth: redirect loop after sign-in'],
    ['err', 'db: row-level security disabled'],
    ['err', 'stripe: webhook signature not verified'],
    ['err', 'build: env vars missing in production'],
    ['fix', ''],
    ['ok', 'auth: sessions persist, reset email arrives'],
    ['ok', 'db: RLS policies on every table'],
    ['ok', 'stripe: webhooks verified, test payment passed'],
    ['ok', 'deploy: live on your-domain.com'],
  ];

  let timers: number[] = [];
  let playing = false;

  const line = (kind: 'info' | 'ok' | 'err', text: string) => {
    const row = document.createElement('div');
    row.className = `tl ${kind}`;
    const ic = document.createElement('span');
    ic.className = 'ic';
    ic.textContent = kind === 'err' ? '✗' : kind === 'ok' ? '✓' : '›';
    const tx = document.createElement('span');
    tx.className = 'tx';
    tx.textContent = text;
    row.append(ic, tx);
    return row;
  };

  const setStatus = (good: boolean) => {
    status.className = `status ${good ? 'good' : 'bad'}`;
    status.textContent = good ? (ru() ? 'ЖИВО' : 'LIVE') : (ru() ? 'СБОЙ' : 'BROKEN');
  };

  const finish = () => {
    timers.forEach((id) => window.clearTimeout(id));
    timers = [];
    body.replaceChildren();
    for (const [kind, text] of lines) {
      if (kind === 'fix' || kind === 'err') continue;
      body.append(line(kind, text));
    }
    setStatus(true);
    playing = false;
    toggle.textContent = ru() ? '↻ Ещё раз' : '↻ Replay';
  };

  const play = () => {
    timers.forEach((id) => window.clearTimeout(id));
    timers = [];
    body.replaceChildren();
    if (reduce()) {
      finish();
      return;
    }
    playing = true;
    setStatus(false);
    toggle.textContent = ru() ? 'Пропустить' : 'Skip';
    let delay = 180;
    for (const [kind, text] of lines) {
      if (kind === 'fix') {
        delay += 380;
        timers.push(
          window.setTimeout(() => {
            term.classList.remove('glitch');
            void term.offsetWidth;
            term.classList.add('glitch');
          }, delay),
        );
        delay += 360;
        timers.push(
          window.setTimeout(() => {
            body.querySelectorAll('.err').forEach((node) => node.remove());
          }, delay),
        );
        continue;
      }
      delay += kind === 'err' ? 300 : 220;
      const snapKind = kind;
      const snapText = text;
      timers.push(window.setTimeout(() => body.append(line(snapKind, snapText)), delay));
    }
    timers.push(
      window.setTimeout(() => {
        setStatus(true);
        playing = false;
        toggle.textContent = ru() ? '↻ Ещё раз' : '↻ Replay';
      }, delay + 160),
    );
  };

  toggle.addEventListener('click', () => {
    if (playing) finish();
    else play();
  });
  if (reduce()) finish();
  else play();
}

function initPricing(): void {
  const amount = document.querySelector<HTMLElement>('#fixAmt');
  const desc = document.querySelector<HTMLElement>('#tierDesc');
  const radios = [...document.querySelectorAll<HTMLInputElement>('input[name="tier"]')];
  if (!amount || !desc || radios.length === 0) return;

  const sync = () => {
    const picked = radios.find((radio) => radio.checked) ?? radios[0];
    if (!picked) return;
    amount.textContent = picked.dataset.price ?? formatRange(PRICES.fix.small.min, PRICES.fix.small.max);
    desc.textContent = picked.dataset.desc ?? '';
  };
  radios.forEach((radio) => radio.addEventListener('change', sync));
  sync();

  document.querySelectorAll<HTMLElement>('.pc').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function initCompare(): void {
  const ba = document.querySelector<HTMLElement>('#ba');
  const range = document.querySelector<HTMLInputElement>('#baRange');
  if (!ba || !range) return;
  let frame = 0;
  const sync = () => {
    ba.style.setProperty('--pos', `${range.value}%`);
    range.setAttribute('aria-valuetext', `${range.value}%`);
  };
  range.addEventListener('input', sync);
  sync();
  if (reduce()) return;

  let cancel = false;
  const stop = () => {
    cancel = true;
    if (frame) cancelAnimationFrame(frame);
  };
  range.addEventListener('pointerdown', stop, { once: true });
  range.addEventListener('keydown', stop, { once: true });
  if (!canObserve()) return;

  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting || cancel) return;
      io.disconnect();
      const started = performance.now();
      const tick = (now: number) => {
        if (cancel) return;
        const t = (now - started) / 1000;
        let value = 50;
        if (t < 0.9) value = 50 + (78 - 50) * ease(t / 0.9);
        else if (t < 2) value = 78 + (26 - 78) * ease((t - 0.9) / 1.1);
        else if (t < 2.8) value = 26 + (50 - 26) * ease((t - 2) / 0.8);
        else {
          range.value = '50';
          sync();
          return;
        }
        range.value = String(Math.round(value));
        sync();
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    },
    { threshold: 0.55 },
  );
  io.observe(ba);
}

function initReveals(): void {
  if (reduce() || !canObserve()) return;
  const nodes = [...document.querySelectorAll<HTMLElement>('.rv')];
  if (nodes.length === 0) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  nodes.forEach((node) => io.observe(node));
}

function initPipe(): void {
  const pipe = document.querySelector<HTMLElement>('#pipe');
  if (!pipe || reduce() || !canObserve()) return;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      pipe.classList.add('run');
      io.disconnect();
    },
    { threshold: 0.4 },
  );
  io.observe(pipe);
}

function initRescue(): void {
  const scroller = document.querySelector<HTMLElement>('#rescue-scroll');
  if (!scroller) return;
  scroller.querySelectorAll('img').forEach((img) => {
    if (typeof img.decode === 'function') void img.decode().catch(() => {});
  });

  const narrow = window.matchMedia('(max-width: 899px)');
  const coarse = window.matchMedia('(pointer: coarse)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supported =
    CSS.supports('animation-timeline: view()') &&
    CSS.supports('animation-range: 0% 100%') &&
    CSS.supports('view-timeline: --rescue block');
  if (narrow.matches || coarse.matches || reduce.matches || supported) return;

  scroller.classList.add('is-fallback');
  let ticking = false;
  const paint = () => {
    ticking = false;
    if (!scroller.classList.contains('is-fallback')) return;
    const rect = scroller.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const p = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
    scroller.style.setProperty('--p', p.toFixed(4));
  };
  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(paint);
  };
  paint();
  window.addEventListener('scroll', request, { passive: true });
  narrow.addEventListener('change', () => {
    scroller.classList.toggle('is-fallback', !narrow.matches && !reduce.matches);
    if (narrow.matches) scroller.style.removeProperty('--p');
    else request();
  });
}

function ease(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}
