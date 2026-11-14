/**
 * Scroll-scrubbed rescue stack.
 *
 * GSAP tweens a plain state object. Three.js reads it and draws only when
 * that state changes, the canvas resizes, or the tab is visible and the
 * section is on screen. No bloom pass, no shadow map, no transmission —
 * glow is emissive edges plus additive sprites, which stays cheap on a phone.
 *
 * DPR is capped. The chunk that imports this file is loaded after first paint.
 */
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BoxGeometry,
  CanvasTexture,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LAYERS, STEP_CAPTIONS } from '../data/offer';

const CARD_W = 3.7;
const CARD_H = 2.31;
const CARD_D = 0.2;

type LayerId = (typeof LAYERS)[number]['id'];

interface Card {
  group: Group;
  slab: MeshPhysicalMaterial;
  face: MeshBasicMaterial;
  red: MeshBasicMaterial;
  green: MeshBasicMaterial;
  beam: Mesh;
  broken: CanvasTexture;
  fixed: CanvasTexture;
  shownFixed: boolean;
}

let pokeDraw = () => {};

const state = {
  explode: 0,
  camX: 0.28,
  camY: 0.08,
  camZ: 6.15,
  lookY: 0.02,
  yaw: -0.28,
  pitch: 0.16,
  roll: -0.04,
  glitch: 0,
  scan: 0,
  fix: 0,
  agent: -1,
  agentVis: 0,
  glow: 0.2,
  live: 0,
  red: 1,
};

export async function mountRescue(): Promise<void> {
  const root = document.documentElement;
  if (root.classList.contains('reduce-motion') || root.classList.contains('no-webgl')) return;

  const canvas = document.querySelector<HTMLCanvasElement>('#rescue-canvas');
  const pin = document.querySelector<HTMLElement>('#pin');
  const sceneEl = document.querySelector<HTMLElement>('#scene');
  const steps = [...document.querySelectorAll<HTMLElement>('#steps .step')];
  const caption = document.querySelector<HTMLElement>('#mcap');
  if (!canvas || !pin || !sceneEl) {
    root.classList.add('no-webgl');
    return;
  }

  const narrow = window.matchMedia('(max-width: 860px)').matches;
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !narrow,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: false,
    stencil: false,
  });
  if (!renderer.getContext()) {
    root.classList.add('no-webgl');
    return;
  }

  const dprCap = narrow ? 1.25 : 1.5;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.28;

  const scene = new Scene();
  scene.environmentIntensity = 1.25;
  const camera = new PerspectiveCamera(30, 1, 0.08, 40);

  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.05).texture;
  pmrem.dispose();

  scene.add(new HemisphereLight(0xf7fbff, 0x2a2118, 1.45));
  const key = new DirectionalLight(0xffffff, 3.6);
  key.position.set(5.2, 7.4, 6.5);
  scene.add(key);
  const fill = new DirectionalLight(0xd5e2f4, 1.7);
  fill.position.set(-6, 2.2, 5);
  scene.add(fill);
  const rim = new DirectionalLight(0xe4ff8a, 2.4);
  rim.position.set(-2.5, 3.5, -4);
  scene.add(rim);
  const limeLight = new PointLight(0xc8f560, 8, 16, 2);
  limeLight.position.set(0.2, -0.2, 2.4);
  scene.add(limeLight);
  const redLight = new PointLight(0xff3355, 7, 12, 2);
  redLight.position.set(1.4, 0.6, 2);
  scene.add(redLight);

  const glow = new Sprite(
    new SpriteMaterial({
      map: radialTex('rgba(200,245,96,0.55)', 'rgba(200,245,96,0)'),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      blending: AdditiveBlending,
    }),
  );
  glow.scale.set(9.2, 6.4, 1);
  glow.position.set(0.1, 0.15, -1.7);
  scene.add(glow);

  const redGlow = new Sprite(
    new SpriteMaterial({
      map: radialTex('rgba(255,70,90,0.45)', 'rgba(255,70,90,0)'),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      blending: AdditiveBlending,
    }),
  );
  redGlow.scale.set(6.5, 4.2, 1);
  redGlow.position.set(0.8, 0.2, -1.2);
  scene.add(redGlow);

  const shade = new Sprite(
    new SpriteMaterial({
      map: radialTex('rgba(0,0,0,0.55)', 'rgba(0,0,0,0)'),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  shade.scale.set(6.2, 2.4, 1);
  shade.position.set(0, -1.25, -0.35);
  scene.add(shade);

  const stack = new Group();
  scene.add(stack);
  const plates = mountPlates(scene);
  const mascots = mountMascots(stack);
  let scrollP = 0;
  let scanAt = 0.18;
  let fixAt = 0.42;
  let launchAt = 0.78;

  try {
    await document.fonts.load('600 40px "Geist Mono Variable"');
    await document.fonts.ready;
  } catch {
    /* canvas falls back to the generic monospace stack */
  }

  const texW = narrow ? 900 : 1280;
  const cards: Card[] = LAYERS.map((layer) => makeCard(layer.id, layer.name, layer.bad, layer.ok, texW, renderer));
  cards.forEach((card) => stack.add(card.group));

  const agent = makeAgent();
  stack.add(agent.group);

  const sheenMap = sheenTex();
  const sheenMat = new MeshBasicMaterial({
    map: sheenMap,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    blending: AdditiveBlending,
    opacity: 0.42,
  });
  for (const card of cards) {
    const sheen = new Mesh(new PlaneGeometry(CARD_W * 0.92, CARD_H * 0.92), sheenMat);
    sheen.position.z = CARD_D / 2 + 0.034;
    card.group.add(sheen);
  }

  let onscreen = true;
  let scheduled = false;
  const io = new IntersectionObserver(
    ([entry]) => {
      onscreen = !!entry?.isIntersecting;
      if (onscreen && !document.hidden) draw();
    },
    { rootMargin: '120px' },
  );
  io.observe(pin);

  let painted = false;
  function draw() {
    scheduled = false;
    if (document.hidden || !onscreen) return;
    apply();
    renderer.render(scene, camera);
    if (!painted) {
      painted = true;
      sceneEl.classList.add('is-live');
    }
  }

  function requestDraw() {
    if (scheduled || document.hidden || !onscreen) return;
    scheduled = true;
    requestAnimationFrame(draw);
  }
  pokeDraw = requestDraw;

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w < 2 || h < 2) return;
    const cap = window.matchMedia('(max-width: 860px)').matches ? 1.25 : 1.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    requestDraw();
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(sceneEl);
  resize();

  function setStep(n: number) {
    steps.forEach((el, i) => {
      el.classList.toggle('on', i === n);
      el.classList.toggle('done', i < n);
    });
    if (caption) caption.textContent = STEP_CAPTIONS[n] ?? '';
  }

  function apply() {
    stack.rotation.set(state.pitch, state.yaw, state.roll);
    const mid = (cards.length - 1) / 2;
    cards.forEach((card, i) => {
      const spread = state.explode;
      const y = (mid - i) * (0.055 + spread * 0.7);
      const x = (i - mid) * spread * 0.05 + Math.sin(i * 2.4) * 0.07 * state.glitch;
      const z = (mid - i) * 0.025 * (1 - spread);
      const k = state.fix - i;
      const bump = k > 0 && k < 1 ? Math.sin(k * Math.PI) : 0;
      card.group.position.set(x, y, z + bump * 0.55);
      card.group.scale.setScalar(1 + bump * 0.075);

      const fixedAmt = MathUtils.smoothstep(k, 0.28, 0.8);
      card.red.opacity = (1 - fixedAmt) * (0.28 + 0.45 * Math.max(state.red, spread));
      card.green.opacity = fixedAmt * 0.62;
      card.slab.emissive.setHex(fixedAmt > 0.5 ? 0x3ddc97 : 0xff3b55);
      card.slab.emissiveIntensity = 0.35 + fixedAmt * 0.85 + (1 - fixedAmt) * 0.35 * state.red;

      const u = MathUtils.clamp(state.scan - i, 0, 1);
      const beamOn = u > 0.03 && u < 0.97 && spread > 0.35;
      card.beam.visible = beamOn;
      card.beam.position.y = (0.5 - u) * CARD_H;

      const wantFixed = fixedAmt >= 0.62;
      if (wantFixed !== card.shownFixed) {
        card.shownFixed = wantFixed;
        card.face.map = wantFixed ? card.fixed : card.broken;
        card.face.needsUpdate = true;
      }
    });

    const spot = agentSpot(state.agent);
    const vis = state.agentVis;
    const usePhoto = mascots.ready;
    agent.group.visible = !usePhoto && vis > 0.03;
    agent.group.position.set(spot.x, spot.y, spot.z);
    agent.group.scale.setScalar(0.25 + vis * 0.85);
    agent.light.intensity = usePhoto ? 0 : vis * 6;
    if (usePhoto) {
      const launch = state.live;
      mascots.group.visible = vis > 0.03 || launch > 0.05;
      mascots.group.position.set(spot.x, spot.y + 0.15, spot.z + 0.15);
      const s = 0.35 + Math.max(vis, launch) * 1.15;
      mascots.group.scale.setScalar(s);
      const scanW = segment(scrollP, scanAt, fixAt);
      const fixW = segment(scrollP, fixAt, launchAt);
      const liveW = segment(scrollP, launchAt, 1);
      mascots.mats[0].opacity = scanW * Math.max(vis, 0.35);
      mascots.mats[1].opacity = fixW * Math.max(vis, 0.2);
      mascots.mats[2].opacity = liveW;
    }
    plates.sync(scrollP, scanAt, fixAt, launchAt);

    const fit = camera.aspect < 0.85 ? 1.28 : camera.aspect < 1.15 ? 1.1 : 1;
    camera.position.set(state.camX, state.camY, state.camZ * fit);
    camera.lookAt(0, state.lookY, 0);

    limeLight.intensity = 8 + state.glow * 42;
    redLight.intensity = 8 * state.red;
    glow.material.opacity = 0.38 + state.glow * 0.7;
    redGlow.material.opacity = 0.34 * state.red;
    sceneEl.style.setProperty('--live', state.live.toFixed(3));
  }

  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
  tl.to(state, { glitch: 1, duration: 0.12, ease: 'steps(2)' }, 0)
    .to(state, { glitch: 0.35, duration: 0.08, ease: 'steps(1)' }, 0.12)
    .to(state, { glitch: 0, duration: 0.1 }, 0.22);

  tl.addLabel('scan', 0.42);
  tl.to(
    state,
    {
      explode: 1,
      yaw: -0.12,
      pitch: 0.52,
      roll: -0.28,
      camX: 0.15,
      camY: 0.42,
      camZ: 6.85,
      lookY: 0,
      duration: 1.15,
      ease: 'power2.inOut',
    },
    'scan',
  );
  tl.to(state, { scan: LAYERS.length, duration: 1.05, ease: 'power1.inOut' }, 'scan+=0.55');

  tl.addLabel('fix', 'scan+=1.85');
  LAYERS.forEach((_, i) => {
    const at = i * 0.78;
    tl.to(state, { agent: i, agentVis: 1, duration: 0.24, ease: 'power2.out' }, `fix+=${at}`);
    tl.to(state, { fix: i + 1, duration: 0.32, ease: 'power1.inOut' }, `fix+=${(at + 0.2).toFixed(3)}`);
    tl.to(state, { agentVis: 0, duration: 0.16, ease: 'power2.in' }, `fix+=${(at + 0.52).toFixed(3)}`);
  });
  tl.to(state, { camX: -0.85, yaw: 0.12, duration: LAYERS.length * 0.78, ease: 'none' }, 'fix');

  tl.addLabel('launch', `fix+=${(LAYERS.length * 0.78 + 0.15).toFixed(3)}`);
  tl.to(
    state,
    {
      explode: 0,
      yaw: 0.02,
      pitch: 0.04,
      roll: 0,
      camX: 0,
      camY: 0.02,
      camZ: 6.15,
      lookY: 0,
      glow: 1,
      live: 1,
      red: 0,
      agentVis: 0,
      scan: LAYERS.length,
      duration: 1.15,
      ease: 'power3.inOut',
    },
    'launch',
  );
  tl.to(state, { glow: 1, live: 1, duration: 0.4 }, 'launch+=1.15');

  const duration = tl.duration();
  scanAt = (tl.labels.scan ?? 0) / duration;
  fixAt = (tl.labels.fix ?? 0) / duration;
  launchAt = (tl.labels.launch ?? 1) / duration;

  const paint = () => {
    scrollP = tl.progress();
    const step = scrollP < scanAt ? 0 : scrollP < fixAt ? 1 : scrollP < launchAt ? 2 : 3;
    setStep(step);
    requestDraw();
  };
  tl.eventCallback('onUpdate', paint);

  ScrollTrigger.create({
    trigger: pin,
    start: 'top top',
    end: () => `+=${Math.round(window.innerHeight * (window.matchMedia('(max-width: 860px)').matches ? 3.6 : 4.6))}`,
    pin: true,
    scrub: 0.65,
    anticipatePin: 1,
    animation: tl,
    onUpdate: paint,
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) requestDraw();
  });

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    root.classList.add('no-webgl');
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });

  apply();
  renderer.render(scene, camera);
  setStep(0);
}

function segment(p: number, start: number, end: number): number {
  const feather = 0.07;
  const inn = start <= 0 ? 1 : MathUtils.smoothstep(p, start - feather, start + feather);
  const out = end >= 1 ? 1 : 1 - MathUtils.smoothstep(p, end - feather, end + feather);
  return MathUtils.clamp(inn * out, 0, 1);
}

/** State renders sit behind the code-driven cards. The mascot photos replace the placeholder robot once they decode. */
function mountPlates(scene: Scene): { sync: (p: number, a: number, b: number, c: number) => void } {
  const names = ['layers-broken', 'layers-scanning', 'layers-fixing', 'layers-reassembled'] as const;
  const mats = names.map(() => {
    const mat = new MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    });
    const mesh = new Mesh(new PlaneGeometry(5.1, 2.86), mat);
    mesh.position.set(0.15, 0.1, -1.15);
    mesh.renderOrder = -1;
    scene.add(mesh);
    return mat;
  });
  let ready = false;
  const loader = new TextureLoader();
  void Promise.all(names.map((name) => loadPlain(loader, `/images/en/${name}-800w.webp`))).then((textures) => {
    textures.forEach((tex, i) => {
      const mat = mats[i];
      if (!mat) return;
      mat.map = tex;
      mat.needsUpdate = true;
    });
    ready = true;
    pokeDraw();
  }).catch(() => {
    ready = false;
  });
  return {
    sync(p, a, b, c) {
      if (!ready) return;
      const weights = [segment(p, 0, a), segment(p, a, b), segment(p, b, c), segment(p, c, 1)];
      mats.forEach((mat, i) => {
        mat.opacity = (weights[i] ?? 0) * 0.38;
      });
    },
  };
}

function mountMascots(stack: Group): { group: Group; mats: SpriteMaterial[]; ready: boolean } {
  const group = new Group();
  group.visible = false;
  const mats = ['bot-scan', 'bot-fix', 'bot-launch'].map(() => {
    const mat = new SpriteMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    });
    const sprite = new Sprite(mat);
    sprite.scale.set(1.35, 1.35, 1);
    group.add(sprite);
    return mat;
  });
  stack.add(group);
  const api = { group, mats, ready: false };
  void Promise.all(['bot-scan', 'bot-fix', 'bot-launch'].map((name) => loadKeyed(`/images/en/${name}-800w.webp`))).then(
    (textures) => {
      textures.forEach((tex, i) => {
        const mat = mats[i];
        if (!mat) return;
        mat.map = tex;
        mat.needsUpdate = true;
      });
      api.ready = true;
      pokeDraw();
    },
  ).catch(() => {
    api.ready = false;
  });
  return api;
}

function loadPlain(loader: TextureLoader, url: string) {
  return new Promise<ReturnType<TextureLoader['load']>>((resolve, reject) => {
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = SRGBColorSpace;
        resolve(tex);
      },
      undefined,
      () => reject(new Error(url)),
    );
  });
}

function loadKeyed(url: string): Promise<CanvasTexture> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const max = 640;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        reject(new Error('2d'));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const px = image.data;
      for (let i = 0; i < px.length; i += 4) {
        const r = px[i] ?? 0;
        const g = px[i + 1] ?? 0;
        const b = px[i + 2] ?? 0;
        const peak = Math.max(r, g, b);
        const alpha = peak < 14 ? 0 : Math.min(255, ((peak - 14) / 36) * 255);
        px[i + 3] = alpha;
      }
      ctx.putImageData(image, 0, 0);
      const tex = new CanvasTexture(canvas);
      tex.colorSpace = SRGBColorSpace;
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onerror = () => reject(new Error(url));
    img.src = url;
  });
}

function agentSpot(t: number): { x: number; y: number; z: number } {
  if (t < 0) return { x: -2.6, y: 1.4, z: 0.8 };
  const i0 = Math.max(0, Math.min(LAYERS.length - 1, Math.floor(t)));
  const i1 = Math.min(LAYERS.length - 1, i0 + 1);
  const f = MathUtils.clamp(t - i0, 0, 1);
  const mid = (LAYERS.length - 1) / 2;
  const spread = state.explode;
  const yOf = (i: number) => (mid - i) * (0.055 + spread * 0.7);
  const arc = Math.sin(f * Math.PI) * 0.55;
  return {
    x: -1.45,
    y: yOf(i0) + (yOf(i1) - yOf(i0)) * f + 0.22 + arc,
    z: 0.85,
  };
}

function makeCard(id: LayerId, name: string, bad: string, ok: string, texW: number, renderer: WebGLRenderer): Card {
  const group = new Group();
  const slab = new MeshPhysicalMaterial({
    color: 0x161c28,
    metalness: 0.78,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.7,
    specularIntensity: 1,
    emissive: 0xff3b55,
    emissiveIntensity: 0.4,
  });
  const body = new Mesh(new RoundedBoxGeometry(CARD_W, CARD_H, CARD_D, 4, 0.1), slab);
  group.add(body);

  const broken = paint(id, name, bad, false, texW);
  const fixed = paint(id, name, ok, true, texW);
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  for (const tex of [broken, fixed]) tex.anisotropy = maxAniso;

  const face = new MeshBasicMaterial({ map: broken, transparent: true, toneMapped: false });
  const faceMesh = new Mesh(new PlaneGeometry(CARD_W - 0.16, CARD_H - 0.16), face);
  faceMesh.position.z = CARD_D / 2 + 0.012;
  group.add(faceMesh);

  const red = new MeshBasicMaterial({
    map: washTex('255,72,86', 0.55),
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    opacity: 0.7,
  });
  const redMesh = new Mesh(new PlaneGeometry(CARD_W - 0.18, CARD_H - 0.18), red);
  redMesh.position.z = CARD_D / 2 + 0.02;
  group.add(redMesh);

  const green = new MeshBasicMaterial({
    map: washTex('61,220,151', 0.5),
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    opacity: 0,
  });
  const greenMesh = new Mesh(new PlaneGeometry(CARD_W - 0.18, CARD_H - 0.18), green);
  greenMesh.position.z = CARD_D / 2 + 0.022;
  group.add(greenMesh);

  const beamMat = new MeshBasicMaterial({
    map: beamTex(),
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    blending: AdditiveBlending,
    opacity: 0.95,
  });
  const beam = new Mesh(new PlaneGeometry(CARD_W * 1.02, 0.22), beamMat);
  beam.position.z = CARD_D / 2 + 0.04;
  beam.visible = false;
  group.add(beam);
  group.traverse((obj) => {
    obj.renderOrder = 2;
  });

  return { group, slab, face, red, green, beam, broken, fixed, shownFixed: false };
}

function makeAgent(): { group: Group; light: PointLight } {
  const group = new Group();
  const bodyMat = new MeshPhysicalMaterial({
    color: 0x12161c,
    metalness: 0.4,
    roughness: 0.28,
    emissive: 0xc8f560,
    emissiveIntensity: 0.55,
    clearcoat: 1,
  });
  const body = new Mesh(new BoxGeometry(0.42, 0.32, 0.18), bodyMat);
  group.add(body);
  const eyeMat = new MeshBasicMaterial({ color: 0xe8ff9a, toneMapped: false });
  const left = new Mesh(new SphereGeometry(0.045, 16, 12), eyeMat);
  left.position.set(-0.09, 0.02, 0.1);
  const right = new Mesh(new SphereGeometry(0.045, 16, 12), eyeMat);
  right.position.set(0.09, 0.02, 0.1);
  group.add(left, right);
  const stalk = new Mesh(
    new CylinderGeometry(0.012, 0.012, 0.16, 8),
    new MeshBasicMaterial({ color: 0xc8f560, toneMapped: false }),
  );
  stalk.position.set(0, 0.24, 0);
  const bulb = new Mesh(new SphereGeometry(0.04, 12, 10), new MeshBasicMaterial({ color: 0xeaff9a, toneMapped: false }));
  bulb.position.set(0, 0.34, 0);
  group.add(stalk, bulb);
  const light = new PointLight(0xc8f560, 0, 3.2, 2);
  light.position.set(0, 0, 0.3);
  group.add(light);
  const halo = new Sprite(
    new SpriteMaterial({
      map: radialTex('rgba(200,245,96,0.9)', 'rgba(200,245,96,0)'),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      blending: AdditiveBlending,
    }),
  );
  halo.scale.set(0.9, 0.9, 1);
  group.add(halo);
  return { group, light };
}

function paint(id: LayerId, name: string, badge: string, fixed: boolean, texW: number): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = texW;
  canvas.height = Math.round(texW * (800 / 1280));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('2d');
  const s = texW / 1280;
  context.scale(s, s);
  drawCard(context, id, name, badge, fixed);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function drawCard(ctx: CanvasRenderingContext2D, id: LayerId, name: string, badge: string, fixed: boolean) {
  ctx.clearRect(0, 0, 1280, 800);
  ctx.save();
  rounded(ctx, 0, 0, 1280, 800, 40);
  ctx.clip();

  const bg = ctx.createLinearGradient(0, 0, 1280, 800);
  if (fixed) {
    bg.addColorStop(0, '#243832');
    bg.addColorStop(0.45, '#18242c');
    bg.addColorStop(1, '#101820');
  } else {
    bg.addColorStop(0, '#3a2a36');
    bg.addColorStop(0.4, '#243044');
    bg.addColorStop(1, '#141b26');
  }
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1280, 800);

  const gloss = ctx.createLinearGradient(0, 0, 400, 360);
  gloss.addColorStop(0, 'rgba(255,255,255,0.2)');
  gloss.addColorStop(0.45, 'rgba(255,255,255,0.03)');
  gloss.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gloss;
  ctx.fillRect(0, 0, 1280, 800);

  if (!fixed) {
    ctx.fillStyle = 'rgba(255,70,90,0.05)';
    for (let y = 0; y < 800; y += 8) ctx.fillRect(0, y, 1280, 2);
  } else {
    const g = ctx.createRadialGradient(180, 640, 20, 220, 680, 520);
    g.addColorStop(0, 'rgba(61,220,151,0.22)');
    g.addColorStop(1, 'rgba(61,220,151,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1280, 800);
  }

  ctx.fillStyle = fixed ? '#c8f560' : '#9aa3ae';
  rounded(ctx, 48, 46, 26, 26, 7);
  ctx.fill();

  ctx.font = '600 40px "Geist Mono Variable", ui-monospace, monospace';
  ctx.fillStyle = '#eef3f8';
  ctx.fillText(name.toUpperCase(), 92, 70);

  ctx.font = '600 34px "Geist Mono Variable", ui-monospace, monospace';
  const label = `${fixed ? '✓' : '✗'}  ${badge}`;
  const tw = ctx.measureText(label).width;
  const bw = tw + 48;
  const bx = 1280 - 44 - bw;
  ctx.beginPath();
  ctx.roundRect(bx, 36, bw, 62, 14);
  ctx.fillStyle = fixed ? 'rgba(61,220,151,0.2)' : 'rgba(255,90,95,0.2)';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = fixed ? '#5dE8b0' : '#ff7a7e';
  ctx.stroke();
  ctx.fillStyle = fixed ? '#d8ffe9' : '#ffe4e5';
  ctx.fillText(label, bx + 24, 78);

  if (id === 'ui') drawUi(ctx, fixed);
  else if (id === 'auth') drawAuth(ctx, fixed);
  else if (id === 'db') drawDb(ctx, fixed);
  else if (id === 'pay') drawPay(ctx, fixed);
  else drawDeploy(ctx, fixed);

  ctx.restore();
}

function drawUi(ctx: CanvasRenderingContext2D, fixed: boolean) {
  ctx.fillStyle = '#3d4c60';
  rounded(ctx, 64, 150, 64, 64, 16);
  ctx.fill();
  bar(ctx, 148, 162, 180, 18, '#8ea0b5');
  bar(ctx, 348, 166, 120, 12, '#4d5e72');
  bar(ctx, 980, 166, 160, 14, '#4d5e72');

  bar(ctx, 64, 270, 520, 36, '#f2f6fb');
  bar(ctx, 64, 324, 380, 36, '#d5deea');
  bar(ctx, 64, 390, 460, 16, '#5d6e84');
  bar(ctx, 64, 422, 340, 16, '#5d6e84');
  const bx = fixed ? 64 : 96;
  const by = fixed ? 480 : 512;
  ctx.fillStyle = fixed ? '#c8f560' : '#e8eef5';
  rounded(ctx, bx, by, 240, 64, 32);
  ctx.fill();

  const img = ctx.createLinearGradient(760, 250, 1180, 680);
  img.addColorStop(0, '#3e5168');
  img.addColorStop(1, '#243140');
  ctx.fillStyle = img;
  rounded(ctx, 760, 250, 440, 440, 28);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawAuth(ctx: CanvasRenderingContext2D, fixed: boolean) {
  field(ctx, 80, 180, 760, 'EMAIL', 'email@domain.com');
  field(ctx, 80, 320, 760, 'PASSWORD', '••••••••••');
  ctx.fillStyle = fixed ? '#c8f560' : '#8b98a8';
  rounded(ctx, 80, 470, 760, 70, 16);
  ctx.fill();
  ctx.font = '700 28px "Geist Variable", ui-sans-serif, sans-serif';
  ctx.fillStyle = fixed ? '#14200a' : '#121820';
  ctx.fillText(fixed ? 'Signed in' : 'Sign in', 360, 514);

  ctx.beginPath();
  ctx.arc(1080, 430, 92, 0, Math.PI * 2);
  ctx.lineWidth = 6;
  ctx.setLineDash(fixed ? [] : [14, 12]);
  ctx.strokeStyle = fixed ? '#3ddc97' : '#ff5a5f';
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '600 26px "Geist Mono Variable", ui-monospace, monospace';
  ctx.fillStyle = fixed ? '#b8f5d8' : '#ffc4c6';
  ctx.fillText(fixed ? 'OK' : 'LOOP', 1040, 440);
}

function drawDb(ctx: CanvasRenderingContext2D, fixed: boolean) {
  const cols = [80, 280, 860];
  ctx.font = '600 24px "Geist Mono Variable", ui-monospace, monospace';
  ctx.fillStyle = '#93a0b0';
  ['ID', 'EMAIL', 'ROLE'].forEach((label, i) => ctx.fillText(label, cols[i] ?? 0, 180));
  const rows = [
    ['01', 'a•••@client.com', fixed ? 'user' : 'user'],
    ['02', 'm•••@client.com', fixed ? 'admin' : 'admin'],
    ['03', 'j•••@client.com', 'user'],
  ];
  rows.forEach((row, r) => {
    const y = 230 + r * 110;
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    rounded(ctx, 60, y, 1160, 90, 16);
    ctx.fill();
    ctx.font = '500 32px "Geist Mono Variable", ui-monospace, monospace';
    ctx.fillStyle = '#e7eef6';
    row.forEach((cell, i) => ctx.fillText(cell, cols[i] ?? 0, y + 56));
  });
  ctx.font = '700 28px "Geist Mono Variable", ui-monospace, monospace';
  ctx.fillStyle = fixed ? '#9cf0cb' : '#ff9ea2';
  ctx.fillText(fixed ? 'ROW LEVEL SECURITY  ON' : 'ROW LEVEL SECURITY  OFF', 80, 640);
}

function drawPay(ctx: CanvasRenderingContext2D, fixed: boolean) {
  const card = ctx.createLinearGradient(70, 170, 620, 560);
  card.addColorStop(0, '#5c6d82');
  card.addColorStop(1, '#2a3544');
  ctx.fillStyle = card;
  rounded(ctx, 70, 170, 560, 340, 28);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  rounded(ctx, 110, 230, 84, 64, 10);
  ctx.fill();
  bar(ctx, 110, 420, 260, 18, 'rgba(255,255,255,0.7)');
  ctx.font = '500 30px "Geist Mono Variable", ui-monospace, monospace';
  ctx.fillStyle = '#d5deea';
  const lines = ['POST /webhook', 'stripe-signature', fixed ? 'verified  ✓' : 'not verified', 'checkout.session'];
  lines.forEach((line, i) => {
    ctx.fillStyle = !fixed && i === 2 ? '#ffb4b8' : i === 2 ? '#9cf0cb' : '#d5deea';
    ctx.fillText(line, 700, 240 + i * 78);
  });
}

function drawDeploy(ctx: CanvasRenderingContext2D, fixed: boolean) {
  ctx.font = '500 36px "Geist Mono Variable", ui-monospace, monospace';
  const lines: Array<[string, string]> = fixed
    ? [
        ['#d5deea', '$ build --prod'],
        ['#9cf0cb', '✓ build finished'],
        ['#d5deea', '$ deploy'],
        ['#9cf0cb', '✓ https://your-domain.com'],
        ['#c8f560', 'LIVE'],
      ]
    : [
        ['#d5deea', '$ build --prod'],
        ['#ffb4b8', '✗ SUPABASE_URL undefined'],
        ['#ffb4b8', '✗ STRIPE_SECRET undefined'],
        ['#d5deea', '$ deploy'],
        ['#ffb4b8', '✗ build failed'],
      ];
  lines.forEach(([color, text], i) => {
    ctx.fillStyle = color;
    ctx.fillText(text, 80, 200 + i * 90);
  });
}

function field(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, k: string, v: string) {
  ctx.font = '600 22px "Geist Mono Variable", ui-monospace, monospace';
  ctx.fillStyle = '#93a0b0';
  ctx.fillText(k, x, y);
  ctx.fillStyle = '#0e141c';
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  rounded(ctx, x, y + 16, w, 78, 14);
  ctx.fill();
  ctx.stroke();
  ctx.font = '500 32px "Geist Mono Variable", ui-monospace, monospace';
  ctx.fillStyle = '#e7eef6';
  ctx.fillText(v, x + 24, y + 66);
}

function bar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  rounded(ctx, x, y, w, h, h / 2);
  ctx.fill();
}

function rounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function radialTex(inner: string, outer: string): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d');
  const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

let sheenCached: CanvasTexture | null = null;
function sheenTex(): CanvasTexture {
  if (sheenCached) return sheenCached;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d');
  const g = ctx.createLinearGradient(0, 0, 512, 420);
  g.addColorStop(0, 'rgba(255,255,255,0.0)');
  g.addColorStop(0.38, 'rgba(255,255,255,0.0)');
  g.addColorStop(0.48, 'rgba(255,255,255,0.75)');
  g.addColorStop(0.56, 'rgba(255,255,255,0.0)');
  g.addColorStop(1, 'rgba(255,255,255,0.05)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  sheenCached = new CanvasTexture(canvas);
  sheenCached.colorSpace = SRGBColorSpace;
  return sheenCached;
}

let beamCached: CanvasTexture | null = null;
function beamTex(): CanvasTexture {
  if (beamCached) return beamCached;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, 'rgba(200,245,96,0)');
  g.addColorStop(0.45, 'rgba(230,255,180,0.15)');
  g.addColorStop(0.5, 'rgba(255,255,255,1)');
  g.addColorStop(0.55, 'rgba(200,245,96,0.2)');
  g.addColorStop(1, 'rgba(200,245,96,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 128);
  beamCached = new CanvasTexture(canvas);
  beamCached.colorSpace = SRGBColorSpace;
  return beamCached;
}

let washCache = new Map<string, CanvasTexture>();
function washTex(rgb: string, alpha: number): CanvasTexture {
  const key = `${rgb}:${alpha}`;
  const hit = washCache.get(key);
  if (hit) return hit;
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d');
  const g = ctx.createRadialGradient(16, 24, 4, 32, 64, 90);
  g.addColorStop(0, `rgba(${rgb},${alpha})`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 128);
  ctx.fillStyle = `rgba(${rgb},0.18)`;
  for (let y = 0; y < 128; y += 6) ctx.fillRect(0, y, 64, 2);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  washCache.set(key, tex);
  return tex;
}
