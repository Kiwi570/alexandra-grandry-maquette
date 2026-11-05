/* Gabarit commun : head, en-tête, menu, pied de page, barre fixe du téléphone, voile.
   Les conventions data-* sont celles que lisent le socle JavaScript et l'audit (voir le README). */
import { html, brut } from '../../outils/gabarit.mjs';
import { profilGauche, profilDroit, coupe } from './vase.mjs';

/* Intro figure et fond : gouttes éparses (x, y, rayon) qui rejoignent les profils, et taches qui les remplissent. */
const GOUTTES = [[90, 120, 16], [230, 60, 10], [120, 470, 12], [40, 760, 18], [250, 900, 11], [470, 150, 9], [560, 860, 13], [770, 90, 14], [930, 300, 10], [880, 620, 17], [700, 960, 9], [960, 840, 12]];
const REMPLI_G = [[150, 160], [260, 360], [120, 560], [280, 760], [150, 930], [40, 420], [50, 60]];

const navigation = (c) => c.site.navigation.filter((cle) => c.pages[cle] && (c.pages[cle].langues || c.langues).includes(c.l));

function tete(c) {
  const p = c.page, cle = p.cle;
  const titre = c.s(`pages.${cle}.titre`), description = c.s(`pages.${cle}.description`);
  const ici = c.abs(c.url(cle));
  const imagePartage = c.abs(`/assets/partage/${p.partage === false ? 'accueil' : cle}-${c.l}.jpg`);
  const autres = c.alternatives(cle);
  const structure = c.donnees.structure ? JSON.stringify(c.donnees.structure).replace(/</g, '\\u003c') : '';
  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${titre}</title>
<meta name="description" content="${description}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${ici}">
${autres.length > 1 ? autres.map((a) => html`<link rel="alternate" hreflang="${a.l}" href="${c.abs(a.url)}">\n`) : ''}${autres.length > 1 ? html`<link rel="alternate" hreflang="x-default" href="${c.abs(c.alternatives(cle)[0].url)}">` : ''}
<style>${brut(c.critique.css)}</style>
<script>${brut(c.critique.js)}</script>
${(c.site.polices || []).map((f) => html`<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>\n`)}<link rel="stylesheet" href="${c.asset('css/socle.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
${(c.page.modulesCss || []).map((m) => html`<link rel="stylesheet" href="${c.asset('css/modules/' + m + '.css')}">
`)}
<link rel="modulepreload" href="${c.asset('js/site.js')}">
<link rel="modulepreload" href="${c.asset('js/socle/index.js')}">
<script src="/assets/vendor/gsap.min.js" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/vendor/SplitText.min.js" defer></script>
<script type="module" src="${c.asset('js/site.js')}"></script>
<meta name="theme-color" content="${c.site.couleurs.theme || c.site.couleurs.fond}">
<link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${c.site.nom}">
<meta property="og:locale" content="${c.l === 'fr' ? 'fr_FR' : c.l === 'en' ? 'en_GB' : c.l}">
<meta property="og:title" content="${titre}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${ici}">
<meta property="og:image" content="${imagePartage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${c.s(`pages.${p.partage === false ? 'accueil' : cle}.partageAlt`)}">
<meta name="twitter:card" content="summary_large_image">
${structure ? html`<script type="application/ld+json">${brut(structure)}</script>` : ''}
</head>`;
}

function entete(c) {
  const autreLangue = c.alternatives(c.page.cle).filter((a) => a.l !== c.l);
  return html`<header data-entete>
  <div class="entete-rangee">
    <a class="entete-logo" href="${c.url('accueil')}" data-libelle="${c.libelle('accueil')}"${c.page.cle === 'accueil' ? brut(' aria-current="page"') : ''}>
      <img src="/assets/images/logo.svg" alt="" width="36" height="36"><span class="entete-nom">${c.site.nom}<small>${c.t('commun.metier')}</small></span>
    </a>
    <nav data-nav aria-label="${c.s('commun.navigation')}">
      <ul>${navigation(c).filter((k) => k !== 'accueil').map((k) => html`<li>${c.lien(k)}</li>`)}</ul>
    </nav>
    <div class="entete-actions">
      ${autreLangue.map((a) => html`<a class="entete-langue" href="${a.url}" hreflang="${a.l}" lang="${a.l}" data-langue="${a.l}" aria-label="${c.s('commun.langueAutre')}">${a.l}</a>`)}
      ${c.site.actionEntete ? html`<a class="bouton entete-action" href="${c.url(c.site.actionEntete.page, c.site.actionEntete.ancre || '')}" data-libelle="${c.libelle(c.site.actionEntete.page)}"><span class="long">${c.t('commun.actionEntete')}</span><span class="court" aria-hidden="true">${c.t('commun.actionEnteteCourt')}</span></a>` : ''}
      <button type="button" data-menu-bouton aria-controls="menu" aria-expanded="false" data-libelle-ouvrir="${c.s('commun.menu')}" data-libelle-fermer="${c.s('commun.fermer')}"><span data-libelle-bouton>${c.t('commun.menu')}</span></button>
    </div>
  </div>
</header>
<div id="menu" data-menu role="dialog" aria-modal="true" aria-label="${c.s('commun.menu')}">
  <ul>${navigation(c).map((k, i) => html`<li style="--i:${i}">${c.lien(k, { classe: 'menu-lien' })}</li>`)}</ul>
  <p><a class="bouton" href="tel:${c.site.contact.telephoneLien}">${c.t('commun.appeler')} ${c.site.contact.telephone}</a></p>
  ${autreLangue.map((a) => html`<p><a class="entete-langue" href="${a.url}" hreflang="${a.l}" lang="${a.l}" data-langue="${a.l}">${c.s('commun.langueAutre')}</a></p>`)}
  <p><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></p>
</div>`;
}

function pied(c) {
  return html`<footer class="pied" id="pied">
  <div class="conteneur pied-grille">
    <div>
      <p class="pied-nom"><img src="/assets/images/logo-clair.svg" alt="" width="44" height="44"><strong>${c.site.nom}</strong></p>
      <p>${c.t('commun.metier')}</p>
      <p>${c.site.contact.adresse}<br>${c.t('commun.rer')}<br><a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a><br><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
    </div>
    <nav aria-label="${c.s('commun.sommaire')}">
      <p><strong>${c.t('commun.sommaire')}</strong></p>
      <ul>${navigation(c).map((k) => html`<li>${c.lien(k)}</li>`)}</ul>
    </nav>
    <div>
      <p><strong>${c.t('commun.confort')}</strong></p>
      <ul>
        <li><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></li>
        <li><a href="#haut" data-sans-transition>${c.t('commun.retourHaut')}</a></li>
      </ul>
    </div>
  </div>
  <div class="conteneur pied-bas"><p>${c.t('commun.mentions')}</p><p>${c.t('commun.maquette')}</p><p>© ${c.site.nom}</p></div>
</footer>`;
}

function barre(c) {
  const a = c.site.actionEntete;
  return html`<div data-barre-fixe>
  <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.t('commun.appeler')}</a>
  ${a ? html`<a class="bouton" href="${c.url(a.page, a.ancre || '')}" data-libelle="${c.libelle(a.page)}">${c.t('commun.actionEnteteCourt')}</a>` : ''}
</div>`;
}

function voile(c) {
  return html`<div data-voile aria-hidden="true"><svg class="voile-bord voile-bord--haut" viewBox="0 0 1200 120" preserveAspectRatio="none" focusable="false"><path d="M0 120 L0 70 C 60 40, 110 96, 170 62 C 220 34, 240 88, 300 80 C 360 72, 380 20, 450 36 C 520 52, 520 100, 590 84 C 650 70, 670 10, 740 22 C 800 32, 820 92, 880 78 C 940 64, 960 30, 1020 44 C 1080 58, 1110 96, 1200 66 L1200 120 Z"/><circle cx="262" cy="30" r="11"/><circle cx="640" cy="40" r="8"/><circle cx="975" cy="12" r="10"/></svg><svg class="voile-bord voile-bord--bas" viewBox="0 0 1200 120" preserveAspectRatio="none" focusable="false"><path d="M0 0 L0 40 C 70 70, 120 18, 190 52 C 250 82, 280 30, 340 44 C 410 60, 430 104, 500 86 C 560 70, 590 24, 650 40 C 720 58, 740 98, 810 84 C 870 72, 900 26, 960 38 C 1030 52, 1060 92, 1200 58 L1200 0 Z"/><circle cx="420" cy="104" r="9"/><circle cx="1080" cy="102" r="12"/></svg><div class="voile-contenu"><img src="/assets/images/logo-clair.svg" alt="" width="56" height="56"><span data-voile-libelle>${c.libelle(c.page.cle)}</span></div></div>`;
}

export function page(c, contenu) {
  return html`<!doctype html>
<html lang="${c.l}" data-v="${c.v}"${c.site.curseur ? brut(' data-curseur') : ''}>
${tete(c)}
<body id="haut">
${voile(c)}
<div class="ouverture-panneau" data-ouverture aria-hidden="true">
  <svg class="intro-figure" viewBox="0 0 1000 1000" focusable="false">
    <defs>
      <clipPath id="intro-clip-g"><path d="${brut(profilGauche)}"/></clipPath>
      <clipPath id="intro-clip-d"><path d="${brut(profilDroit)}"/></clipPath>
    </defs>
    <path class="intro-coupe" d="${brut(coupe)}"/>
    <g class="intro-face intro-face--g" clip-path="url(#intro-clip-g)">${REMPLI_G.map(([x, y]) => html`<circle class="intro-tache" cx="${x}" cy="${y}" r="0"></circle>`)}</g>
    <g class="intro-face intro-face--d" clip-path="url(#intro-clip-d)">${REMPLI_G.map(([x, y]) => html`<circle class="intro-tache" cx="${1000 - x}" cy="${y}" r="0"></circle>`)}</g>
    <g class="intro-gouttes">${GOUTTES.map(([x, y, r]) => html`<circle cx="${x}" cy="${y}" r="${r}"></circle>`)}</g>
  </svg>
  <p class="ouverture-nom">${c.site.nom}</p>
  <p class="ouverture-ligne">${c.t('commun.introLigne')}</p>
</div>
<a class="evitement" href="#contenu">${c.t('commun.evitement')}</a>
${entete(c)}
<main id="contenu" tabindex="-1"${c.page.fil ? brut(' data-module="fil-conducteur"') : ''}${c.page.sansAction ? brut(' data-sans-action') : ''}${c.page.sansEffet ? brut(' data-sans-effet') : ''}>
${contenu}
${c.page.fil ? brut('<template data-fil-objet><circle class="fil-goutte" r="6"></circle><circle class="fil-goutte-halo" r="13"></circle></template>') : ''}
</main>
${pied(c)}
${barre(c)}
</body>
</html>`;
}
