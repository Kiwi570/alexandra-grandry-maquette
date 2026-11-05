/* Effets propres à Alexandra Grandry (direction « Figure et fond »). Le socle gère l'ouverture, les transitions,
   l'en-tête, le menu, le mode calme, les boucles, les mesures et la bibliothèque d'effets (posés par attributs).
   Effets du plan, chacun marqué data-effet : figure-fond, forme, gouttes, gestalt-lettres, vase, respiration,
   numero, chemin-rer, cercle ; v2 : ordre (raisons qui se rangent), encre (Gestalt, au pointeur), curseur goutte.
   Modules de la bibliothèque : fil-conducteur, planches-empilees, formulaire-par-etapes. */
import { demarrer, boucle, etat, rafraichir, quand } from './socle/index.js?v=2';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const calme = () => etat.calme || document.documentElement.classList.contains('calme');
const telephone = () => innerWidth <= 760;

/* ---------- Modules de la bibliothèque ---------- */
function modules() {
  const m = $('[data-module="manifeste-mot-a-mot"]');
  if (m) import('./modules/manifeste-mot-a-mot.js?v=2').then((x) => x.init(m, { debut: 'top 75%', fin: 'center 55%', parallaxe: 0 })).catch((e) => console.warn(e));
  const p = $('[data-module="planches-empilees"]');
  if (p) import('./modules/planches-empilees.js?v=2').then((x) => x.init(p, { rotation: 0 })).catch((e) => console.warn(e));
  const fil = $('main[data-module="fil-conducteur"]');
  /* Le fil est construit après l'ouverture : son calcul ne retarde jamais l'intro. */
  const lancerFil = () => import('./modules/fil-conducteur.js?v=2').then((x) => x.init(fil, { cadre: '.conteneur', onde: 14, boucle: 30, lissage: 0.6 })).catch((e) => console.warn(e));
  if (fil && !calme()) { if (etat.pret) lancerFil(); else quand('pret', () => setTimeout(lancerFil, 120)); }
  const f = $('[data-module="formulaire-par-etapes"]');
  if (f) {
    /* Choix déjà fait selon le bouton d'où l'on vient (?public=couples). */
    const choix = new URLSearchParams(location.search).get('public');
    if (choix) { const r = f.querySelector(`input[name="public"][value="${CSS.escape(choix)}"]`); if (r) r.checked = true; }
    import('./modules/formulaire-par-etapes.js?v=2').then((x) => x.init(f, { mailto: '' })).catch((e) => console.warn(e));
  }
}

/* ---------- Accueil : figure-fond — les deux profils sont des battants qui s'ouvrent en 3D sur la photo ----------
   Ordinateur (761 px et plus, 600 px de haut) : l'ouverture est épinglée sur un écran, les portes s'ouvrent pendant
   que la coupe grandit. Téléphone : les portes s'ouvrent pendant que la figure traverse l'écran. */
function figureFond() {
  const boite = $('.figure-boite');
  if (!boite || !gsap || !ST || calme()) return;
  const mm = gsap.matchMedia();
  const portes = (tl) => tl
    .fromTo('.battant--g', { rotateY: 0 }, { rotateY: -72, ease: 'power1.inOut' }, 0)
    .fromTo('.battant--d', { rotateY: 0 }, { rotateY: 72, ease: 'power1.inOut' }, 0)
    .fromTo('.figure-photo img', { scale: 1.08 }, { scale: 1, ease: 'none' }, 0)
    .fromTo(boite, { scale: 1 }, { scale: 1.05, ease: 'none' }, 0);
  mm.add('(min-width: 761px) and (min-height: 600px)', () => {
    portes(gsap.timeline({ scrollTrigger: { trigger: '.ouv-accueil', start: 'top top', end: '+=' + Math.round(innerHeight * 0.9), pin: true, scrub: 0.7, invalidateOnRefresh: true } }));
  });
  mm.add('(max-width: 760px), (max-height: 599px)', () => {
    portes(gsap.timeline({ scrollTrigger: { trigger: boite, start: 'top 75%', end: 'bottom 25%', scrub: 0.6, invalidateOnRefresh: true } }));
  });
}

/* ---------- Accueil : les raisons arrivent en désordre et se rangent au défilement (effet « ordre ») ---------- */
function ordre() {
  const t = $('.raisons .mmm__texte');
  if (!t || !gsap || !ST || !window.SplitText || calme()) return;
  const split = new window.SplitText(t, { type: 'words', wordsClass: 'mot-ordre' });
  const h = (i, k) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  /* Une seule fois, à l'entrée dans l'écran : les mots épars se rangent, puis restent à leur place. */
  gsap.fromTo(split.words,
    { x: (i) => (h(i, 1) - 0.5) * 70, y: (i) => (h(i, 2) - 0.5) * 46, rotate: (i) => (h(i, 3) - 0.5) * 22, opacity: 0.28 },
    { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1.5, ease: 'power3.out', stagger: { each: 0.025, from: 'random' },
      scrollTrigger: { trigger: t, start: 'top 88%', once: true } });
}

/* ---------- Gestalt : l'encre du fond bouge sous le pointeur et au défilement (WebGL, effet « encre ») ---------- */
function encre() {
  const fig = $('.ouv-gestalt__fond');
  const img = fig && fig.querySelector('img');
  if (!img || calme() || /[?&]sanswebgl\b/.test(location.search)) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'encre-canvas'; canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: false });
  if (!gl) return;
  const vs = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
  const fs = `precision mediump float;varying vec2 v;uniform sampler2D t;uniform vec2 r;uniform vec2 ir;uniform vec2 m;uniform float f;uniform float ph;
void main(){
  vec2 uv=v; vec2 a=vec2(r.x/r.y,1.);
  vec2 d=(uv-m)*a; float l=length(d);
  float ang=f*exp(-l*l*9.);
  float c=cos(ang),s=sin(ang); d=mat2(c,-s,s,c)*d; uv=m+d/a;
  uv+=vec2(sin(uv.y*7.+ph),cos(uv.x*6.-ph*.8))*.006;
  float ra=r.x/r.y, ri=ir.x/ir.y; vec2 sc=ra>ri?vec2(1.,ri/ra):vec2(ra/ri,1.);
  vec2 q=(uv-.5)*sc+.5; q.y=1.-q.y;
  gl_FragColor=texture2D(t,clamp(q,.001,.999));
}`;
  const sh = (ty, src) => { const o = gl.createShader(ty); gl.shaderSource(o, src); gl.compileShader(o); return o; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const lp = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
  const U = (n) => gl.getUniformLocation(pr, n);
  const tex = gl.createTexture();
  let pret = false;
  const charger = () => {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); } catch { return; }
    gl.uniform2f(U('ir'), img.naturalWidth, img.naturalHeight);
    pret = true; fig.appendChild(canvas); fig.insertBefore(canvas, fig.querySelector('.mention-ia'));
  };
  (img.complete && img.naturalWidth ? Promise.resolve() : img.decode().catch(() => {})).then(charger);
  const taille = () => { const b = fig.getBoundingClientRect(); canvas.width = Math.max(2, Math.round(b.width)); canvas.height = Math.max(2, Math.round(b.height)); };
  new ResizeObserver(taille).observe(fig); taille();
  /* Pointeur lissé ; la force du tourbillon vient de sa vitesse et retombe en moins d'une seconde. */
  const m = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }; let force = 0, phase = 0, defil = 0;
  const bouger = (cx, cy) => { const b = fig.getBoundingClientRect(); const nx = (cx - b.left) / b.width, ny = 1 - (cy - b.top) / b.height;
    force = Math.min(2.2, force + Math.hypot(nx - m.tx, ny - m.ty) * 9); m.tx = nx; m.ty = ny; };
  fig.closest('section').addEventListener('pointermove', (e) => bouger(e.clientX, e.clientY), { passive: true });
  if (ST) ST.create({ trigger: fig.closest('section'), start: 'top top', end: 'bottom top', onUpdate: (st) => { defil = st.progress * 6; } });
  boucle(canvas, (dt) => {
    if (!pret) return;
    m.x += (m.tx - m.x) * Math.min(1, dt * 6); m.y += (m.ty - m.y) * Math.min(1, dt * 6);
    force = force < 0.004 ? 0 : force * Math.pow(0.03, dt);
    phase += (defil - phase) * Math.min(1, dt * 4);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(U('r'), canvas.width, canvas.height); gl.uniform2f(U('m'), m.x, m.y);
    gl.uniform1f(U('f'), force); gl.uniform1f(U('ph'), phase);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, { lourde: true });
}

/* ---------- Curseur goutte : traînée d'encre qui s'efface (souris seulement, jamais en mode calme) ---------- */
function trainee() {
  if (calme() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const c = document.createElement('canvas');
  c.className = 'trainee'; c.setAttribute('aria-hidden', 'true'); c.setAttribute('data-audit-ignorer', ''); c.setAttribute('data-souris', '');
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  let W = 0, H = 0; const dpr = Math.min(devicePixelRatio || 1, 1.5);
  const taille = () => { W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  addEventListener('resize', taille); taille();
  const pts = []; let dernier = null;
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    if (e.target.closest && e.target.closest('input, textarea, select, [data-menu], .ouv-gestalt, .cadre, .appel, .pied, .ouv-contact')) { dernier = null; return; }
    const p = { x: e.clientX, y: e.clientY, v: 1 };
    if (dernier) { const d = Math.hypot(p.x - dernier.x, p.y - dernier.y); if (d < 6) return; p.r = Math.max(1.6, 5.5 - d * 0.04); } else p.r = 4;
    pts.push(p); dernier = p; if (pts.length > 48) pts.shift();
  }, { passive: true });
  boucle(c, (dt) => {
    ctx.clearRect(0, 0, W, H);
    for (let i = pts.length - 1; i >= 0; i--) { const p = pts[i]; p.v -= dt * 1.6; if (p.v <= 0) { pts.splice(i, 1); continue; }
      ctx.globalAlpha = p.v * 0.26; ctx.fillStyle = '#1e3a32'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.6 + p.v * 0.4), 0, Math.PI * 2); ctx.fill(); }
  });
}

/* ---------- Accueil : forme d'encre (signature, WebGL avec repli canvas 2D) ---------- */
const POIDS = [ /* part de terre cuite de chaque goutte, par public */
  [0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0], [0, 1, 0, 1, 1, 0, 0], [1, 0, 1, 0, 1, 0, 0],
];
function hexRvb(h) { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }

function creerRendu(canvas) {
  const sansWebgl = /[?&]sanswebgl\b/.test(location.search);
  const gl = sansWebgl ? null : canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  const encre = hexRvb('#1e3a32'), terre = hexRvb('#b4613f');
  if (!gl) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    return {
      webgl: false,
      dessiner(b, w, t) {
        const W = canvas.width, H = canvas.height, s = Math.min(W, H) / 2 / 0.7;
        ctx.clearRect(0, 0, W, H);
        b.forEach(([x, y, r], i) => {
          if (r <= 0.005) return;
          ctx.fillStyle = w[i] > 0.5 ? '#b4613f' : '#1e3a32';
          ctx.beginPath(); ctx.arc(W / 2 + x * s, H / 2 - y * s, r * s * (1 + 0.02 * Math.sin(t + i)), 0, Math.PI * 2); ctx.fill();
        });
      },
    };
  }
  const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs = `precision mediump float;
uniform vec2 u_res;uniform vec3 u_b[7];uniform float u_w[7];uniform float u_t;uniform vec3 u_e;uniform vec3 u_c;uniform vec4 u_box;
void main(){
  vec2 uv=(gl_FragCoord.xy*2.-u_res)/min(u_res.x,u_res.y)*.7;
  if(uv.x<u_box.x||uv.x>u_box.z||uv.y<u_box.y||uv.y>u_box.w){gl_FragColor=vec4(0.);return;}
  float fe=0.,fc=0.;
  for(int i=0;i<7;i++){vec3 b=u_b[i];if(b.z<.004)continue;vec2 d=uv-b.xy;float v=b.z*b.z/(dot(d,d)+.0004);fe+=v*(1.-u_w[i]);fc+=v*u_w[i];}
  float f=fe+fc;
  float n=sin(uv.x*6.3+u_t*.7)*sin(uv.y*5.1-u_t*.55)*.06+sin((uv.x+uv.y)*11.+u_t*.4)*.025;
  float a=smoothstep(.93,1.03,f+n*f);
  vec3 col=mix(u_e,u_c,smoothstep(.38,.62,fc/max(f,.0001)));
  gl_FragColor=vec4(col*a,a);
}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (n) => gl.getUniformLocation(pr, n);
  const U = { res: u('u_res'), b: u('u_b'), w: u('u_w'), t: u('u_t'), e: u('u_e'), c: u('u_c'), box: u('u_box') };
  gl.uniform3fv(U.e, encre); gl.uniform3fv(U.c, terre);
  gl.clearColor(0, 0, 0, 0);
  return {
    webgl: true,
    dessiner(b, w, t) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform3fv(U.b, new Float32Array(b.flat()));
      gl.uniform1fv(U.w, new Float32Array(w));
      gl.uniform1f(U.t, t);
      /* Cadre de dessin : le shader sort tout de suite hors de la zone des gouttes. */
      let x0 = 9, y0 = 9, x1 = -9, y1 = -9;
      b.forEach(([x, y, r]) => { if (r < 0.004) return; const m = r * 2.4 + 0.08; x0 = Math.min(x0, x - m); x1 = Math.max(x1, x + m); y0 = Math.min(y0, y - m); y1 = Math.max(y1, y + m); });
      gl.uniform4f(U.box, x0, y0, x1, y1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
  };
}

function forme() {
  const section = $('.publics');
  if (!section || !gsap || !ST || calme()) return;
  let configs;
  try { configs = JSON.parse(section.dataset.formes); } catch { return; }
  section.classList.add('publics--scene');
  const canvas = $('.publics__canvas', section);
  let rendu = null;
  try { rendu = creerRendu(canvas); } catch (err) { console.warn('[forme]', err); }
  if (rendu && rendu.webgl) section.classList.add('publics--webgl');
  const details = $$('.public', section), liste = $$('.publics__liste li', section);
  const n = configs.length;
  let cible = 0, courant = 0, actif = -1;
  const actuel = configs[0].map((b) => b.slice());
  const poids = POIDS[0].slice();
  const activer = (i) => {
    if (i === actif) return;
    actif = i;
    details.forEach((d, k) => d.classList.toggle('actif', k === i));
    liste.forEach((d, k) => d.classList.toggle('actif', k === i));
  };
  activer(0);
  /* Taille du canvas : mesurée au redimensionnement seulement, jamais pendant le défilement. */
  const dpr = Math.min(window.devicePixelRatio || 1, telephone() ? 1 : 1.25);
  const taille = () => { const r = canvas.getBoundingClientRect(); canvas.width = Math.max(2, Math.round(r.width * dpr)); canvas.height = Math.max(2, Math.round(r.height * dpr)); };
  new ResizeObserver(taille).observe(canvas);
  taille();
  ST.create({
    trigger: section, start: 'top top', end: () => '+=' + Math.round(innerHeight * (n - 1) * 0.5), pin: '.publics__scene', scrub: false,
    invalidateOnRefresh: true,
    onUpdate: (s) => { cible = s.progress * (n - 1); activer(Math.round(cible)); },
  });
  const lisse = (x) => x * x * (3 - 2 * x);
  if (!rendu) return;
  boucle(canvas, (dt, t) => {
    /* Suivi de la cible selon le temps écoulé (même vitesse sur un appareil lent). */
    courant += (cible - courant) * Math.min(1, dt * 5);
    const k = Math.min(n - 2, Math.floor(courant)), f = lisse(Math.min(1, Math.max(0, courant - k)));
    const a = configs[k], b = configs[k + 1];
    for (let i = 0; i < 7; i++) {
      const respire = 1 + 0.035 * Math.sin(t * 1.1 + i * 1.7);
      actuel[i][0] = a[i][0] + (b[i][0] - a[i][0]) * f + 0.012 * Math.sin(t * 0.6 + i);
      actuel[i][1] = a[i][1] + (b[i][1] - a[i][1]) * f + 0.012 * Math.cos(t * 0.5 + i * 2);
      actuel[i][2] = (a[i][2] + (b[i][2] - a[i][2]) * f) * respire;
      poids[i] = POIDS[k][i] + (POIDS[k + 1][i] - POIDS[k][i]) * f;
    }
    rendu.dessiner(actuel, poids, t);
  }, { lourde: true });
}

/* ---------- Accompagnements : gouttes du sommaire qui bougent au défilement ; cercle du groupe ---------- */
function gouttesDefilement() {
  const nav = $('.ouv-accomp__sommaire');
  if (!nav || !gsap || !ST || calme()) return;
  $$('.pastille', nav).forEach((p, i) => gsap.fromTo(p, { y: 0, rotate: 0 }, { y: (i % 2 ? -1 : 1) * 10, rotate: (i % 2 ? -1 : 1) * 40, ease: 'none', scrollTrigger: { trigger: '.ouv-accomp', start: 'top top', end: 'bottom top', scrub: 0.5 } }));
}
function cercle() {
  const c = $('[data-effet="cercle"]');
  if (!c) return;
  const g = $('.cercle__points', c);
  let angle = 0, pousse = 0;
  if (ST && !calme()) ST.create({ trigger: c, start: 'top bottom', end: 'bottom top', onUpdate: (s) => { pousse = s.progress * 90; } });
  boucle(c, (dt) => { angle = (angle + dt * 9) % 360; g.setAttribute('transform', `rotate(${(angle + pousse).toFixed(2)})`); });
}

/* ---------- Gestalt : le vase qui bascule entre figure et fond ---------- */
function vase() {
  const s = $('.vase');
  if (!s) return;
  const bouton = $('[data-vase-bouton]', s);
  const montrer = (etatVase, instant = false) => {
    s.dataset.vase = etatVase;
    if (bouton) { bouton.setAttribute('aria-pressed', String(etatVase === 'coupe')); bouton.textContent = etatVase === 'coupe' ? bouton.dataset.libelleVisages : bouton.dataset.libelleCoupe; }
    if (!gsap || calme()) return;
    const coupe = etatVase === 'coupe';
    gsap.to($('.vase__coupe', s), { opacity: coupe ? 1 : 0, duration: instant ? 0 : 0.7, ease: 'power2.inOut', overwrite: true });
    gsap.to($$('.vase__profil', s), { opacity: coupe ? 0 : 1, duration: instant ? 0 : 0.7, ease: 'power2.inOut', overwrite: true });
  };
  let force = null;
  bouton && bouton.addEventListener('click', () => { force = s.dataset.vase === 'coupe' ? 'visages' : 'coupe'; montrer(force); });
  if (!gsap || !ST || calme()) return;
  /* Au défilement : les profils glissent l'un vers l'autre, puis la coupe prend leur place. */
  gsap.fromTo($$('.vase__profil', s), { x: (i) => (i ? 60 : -60) }, { x: 0, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'center center', scrub: 0.6 } });
  ST.create({ trigger: s, start: 'center 55%', end: 'bottom top', onEnter: () => { if (!force) montrer('coupe'); }, onLeaveBack: () => { if (!force) montrer('visages'); } });
}

/* ---------- Sophrologie : cercle de respiration ---------- */
function respiration() {
  const s = $('.souffle');
  if (!s) return;
  const anneaux = $$('.souffle__anneau', s), mot = $('[data-souffle-mot]', s), bouton = $('[data-souffle-bouton]');
  const inspire = mot ? mot.textContent : '', expire = document.documentElement.lang === 'fr' ? 'Expirez' : 'Breathe out';
  let guide = false, phase = '';
  const CYCLE = 10, INSP = 4; /* 4 s pour inspirer, 6 s pour expirer : démonstration */
  if (bouton) {
    bouton.addEventListener('click', () => {
      guide = !guide;
      bouton.setAttribute('aria-pressed', String(guide));
      bouton.textContent = guide ? bouton.dataset.libelleArreter : bouton.dataset.libelleEssayer;
      if (mot) mot.setAttribute('aria-live', guide ? 'polite' : 'off');
    });
  }
  if (mot) mot.setAttribute('aria-live', 'off');
  if (ST && gsap && !calme()) gsap.fromTo(s, { y: 0 }, { y: -40, ease: 'none', scrollTrigger: { trigger: '.ouv-sophro', start: 'top top', end: 'bottom top', scrub: 0.5 } });
  /* La lumière de la page suit le souffle ; à chaque expiration, des ronds naissent sur l'eau de la photo. */
  const lumiere = $('.ouv-sophro__lumiere'), ronds = $$('.ronds span'), photo = $('.ouv-sophro__photo img');
  const rider = () => ronds.forEach((r, i) => r.animate([{ transform: 'scale(.25)', opacity: 0.9 }, { transform: 'scale(1.9)', opacity: 0 }],
    { duration: 2600, delay: i * 520, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'both' }));
  boucle(s, (dt, t) => {
    const p = t % CYCLE;
    const x = p < INSP ? p / INSP : 1 - (p - INSP) / (CYCLE - INSP);
    const e = 0.5 - 0.5 * Math.cos(Math.PI * x);
    const amp = guide ? 0.34 : 0.2;
    anneaux.forEach((a, i) => { a.style.transform = `scale(${(0.78 + amp * e * (i ? 0.7 : 1)).toFixed(4)})`; });
    if (lumiere) lumiere.style.opacity = (0.15 + 0.7 * e).toFixed(3);
    if (photo) photo.style.transform = `scale(${(1.02 + 0.025 * e).toFixed(4)})`;
    const nouvelle = p < INSP ? 'in' : 'out';
    if (nouvelle !== phase) { phase = nouvelle; if (mot) mot.textContent = nouvelle === 'in' ? inspire : expire; if (nouvelle === 'out' && !calme()) rider(); }
  });
}

/* ---------- Contact : chiffres du numéro au défilement, trajet RER → cabinet ---------- */
function numeroDefilement() {
  const n = $('.ouv-contact__numero');
  if (!n || !gsap || !ST || calme()) return;
  gsap.fromTo($$('.chiffre', n), { y: 0 }, { y: (i) => (i % 2 ? -14 : 10), ease: 'none', scrollTrigger: { trigger: '.ouv-contact', start: 'top top', end: 'bottom top', scrub: 0.5 } });
}
function cheminRer() {
  const svg = $('[data-effet="chemin-rer"]');
  if (!svg || !gsap || !ST || calme()) return;
  const chemin = $('[data-chemin]', svg);
  const L = chemin.getTotalLength();
  /* Points du trajet calculés une fois : rien n'est mesuré pendant le défilement. */
  const pts = Array.from({ length: 61 }, (_, i) => chemin.getPointAtLength((L * i) / 60));
  const marcheur = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  marcheur.setAttribute('r', '9'); marcheur.setAttribute('class', 'plan__marcheur'); marcheur.setAttribute('fill', '#1e3a32'); marcheur.setAttribute('aria-hidden', 'true');
  svg.insertBefore(marcheur, $('.plan__gare', svg));
  const o = { p: 0 };
  const placer = () => { const q = pts[Math.round(o.p * 60)]; marcheur.setAttribute('cx', q.x.toFixed(1)); marcheur.setAttribute('cy', q.y.toFixed(1)); };
  placer();
  gsap.fromTo(chemin, { strokeDashoffset: 0 }, { strokeDashoffset: -26, ease: 'none', scrollTrigger: { trigger: svg, start: 'top 85%', end: 'bottom 30%', scrub: 0.5 } });
  gsap.fromTo(o, { p: 0 }, { p: 1, ease: 'none', onUpdate: placer, scrollTrigger: { trigger: svg, start: 'top 80%', end: 'center 40%', scrub: 0.6 } });
}

/* ---------- Gestalt : les lettres se défont doucement au défilement ---------- */
function lettresDefilement() {
  const mot = $('.ouv-gestalt__mot');
  if (!mot || !gsap || !ST || calme()) return;
  gsap.fromTo($$('.lettre', mot), { y: 0, rotate: 0 }, { y: (i) => [-30, 24, -18, 34, -26, 16, -22][i % 7], rotate: (i) => [-6, 4, -3, 7, -5, 3, -4][i % 7], ease: 'none', scrollTrigger: { trigger: '.ouv-gestalt', start: 'top top', end: 'bottom top', scrub: 0.6 } });
}

/* ---------- Ouvertures propres à chaque page (fin de l'intro, ou retrait du voile) ---------- */
function ouverturePage(tl, t0) {
  /* Page reconnue à sa section d'ouverture (une section épinglée est enveloppée par ScrollTrigger). */
  const page = ['ouv-accueil', 'ouv-accomp', 'ouv-gestalt', 'ouv-sophro', 'ouv-contact'].find((k) => document.querySelector('.' + k)) || '';
  if (page.includes('ouv-accueil')) {
    tl.fromTo('.ouv-ligne', { yPercent: 108, opacity: 1 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, t0)
      .fromTo('.ouv-accueil [data-intro]', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power2.out' }, t0 + 0.2)
      .fromTo('.figure-photo', { clipPath: 'inset(46% 40% 46% 40%)', opacity: 1 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.9, ease: 'power3.inOut' }, t0)
      .fromTo('.battant--g', { rotateY: -80, opacity: 1 }, { rotateY: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }, t0)
      .fromTo('.battant--d', { rotateY: 80, opacity: 1 }, { rotateY: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }, t0);
  } else if (page.includes('ouv-accomp')) {
    tl.fromTo('.ouv-accomp__sommaire li', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'bounce.out' }, t0)
      .fromTo('.ouv-accomp__sommaire .pastille', { scale: 0.3 }, { scale: 1, duration: 0.6, stagger: 0.07, ease: 'back.out(2)' }, t0 + 0.2);
  } else if (page.includes('ouv-gestalt')) {
    const L = $$('.ouv-gestalt__mot .lettre-in');
    tl.fromTo(L, { x: (i) => [-140, 90, -60, 160, -120, 70, -90][i % 7], y: (i) => [-90, 120, -140, 60, 110, -100, 80][i % 7], rotate: (i) => [-40, 30, -20, 50, -35, 25, -30][i % 7], opacity: 0 },
      { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'power3.out' }, t0)
      .fromTo('.ouv-gestalt [data-intro]', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, t0 + 0.4);
  } else if (page.includes('ouv-sophro')) {
    tl.fromTo('.souffle', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, t0);
  } else if (page.includes('ouv-contact')) {
    const n = $('.ouv-contact__numero'), ch = $$('.ouv-contact__numero .chiffre'), plume = $('.ouv-contact__numero .plume');
    const pas = 0.11, total = ch.length * pas;
    tl.fromTo(ch, { opacity: 0, clipPath: 'inset(-20% 100% -20% 0)' }, { opacity: 1, clipPath: 'inset(-20% 0% -20% 0)', duration: 0.24, stagger: pas, ease: 'none' }, t0);
    if (plume && n) tl.fromTo(plume, { x: 0, opacity: 1 }, { x: () => n.getBoundingClientRect().width, opacity: 1, duration: total + 0.1, ease: 'none' }, t0)
      .to(plume, { opacity: 0, duration: 0.3 }, t0 + total + 0.1);
  }
  return tl;
}
const ELEMENTS_OUVERTURE = '.ouv-ligne, .ouv-accueil [data-intro], .figure-photo, .battant, .ouv-accomp__sommaire li, .ouv-accomp__sommaire .pastille, .ouv-gestalt__mot .lettre-in, .ouv-gestalt [data-intro], .souffle, .ouv-contact__numero .chiffre, .ouv-contact__numero .plume';

demarrer({
  preparer() {
    modules();
    figureFond();
    ordre();
    encre();
    trainee();
    forme();
    gouttesDefilement();
    cercle();
    vase();
    respiration();
    numeroDefilement();
    cheminRer();
    lettresDefilement();
    rafraichir();
  },
  /* Intro (environ 2,2 s) : les gouttes d'encre rejoignent deux profils, la coupe entre eux se colore,
     puis les profils s'écartent et le panneau s'efface sur l'ouverture propre à la page. */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    const gouttes = $$('.intro-gouttes circle');
    const cibles = [[150, 160], [260, 360], [120, 560], [280, 760], [150, 930]];
    gouttes.forEach((g, i) => {
      const x = +g.getAttribute('cx'), droite = x > 500, c = cibles[i % 5];
      tl.to(g, { attr: { cx: droite ? 1000 - c[0] : c[0], cy: c[1], r: 0 }, duration: 0.7, ease: 'power2.in' }, 0.05 + i * 0.025);
    });
    tl.to('.intro-tache', { attr: { r: 300 }, duration: 0.7, stagger: 0.04, ease: 'power2.out' }, 0.45)
      .fromTo('.intro-coupe', { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.95)
      .to('.intro-face--g', { x: -420, duration: 0.7, ease: 'power3.in' }, 1.3)
      .to('.intro-face--d', { x: 420, duration: 0.7, ease: 'power3.in' }, 1.3)
      .to('.intro-coupe', { scale: 1.6, transformOrigin: '50% 50%', opacity: 0, duration: 0.6, ease: 'power2.in' }, 1.35)
      .to('.ouverture-nom, .ouverture-ligne', { y: -12, opacity: 0, duration: 0.4 }, 1.35)
      .to('.ouverture-panneau', { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 1.6);
    return ouverturePage(tl, 1.55);
  },
  etatFinal() {
    if (!gsap) return;
    gsap.set(ELEMENTS_OUVERTURE, { clearProps: 'transform,opacity,clipPath' });
  },
  arrivee() {
    if (!gsap) return;
    ouverturePage(gsap.timeline({ delay: 0.12 }), 0);
  },
});
