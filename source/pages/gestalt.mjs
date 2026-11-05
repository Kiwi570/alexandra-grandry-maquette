/* La Gestalt-thérapie · ouverture sombre et mot « Gestalt » qui se rassemble, frise d'origine tracée,
   ici et maintenant, « pas seulement avec les mots », vase de Rubin (effet « vase »), trois qualificatifs
   en planches empilées (module planches-empilees), appel. */
import { html, brut } from '../../outils/gabarit.mjs';
import { ouvertureGestalt } from '../gabarits/ouvertures.mjs';
import { profilGauche, profilDroit, coupe } from '../gabarits/vase.mjs';

export const page = { cle: 'gestalt', fichier: 'gestalt-therapie', imagePartage: 'grok/gestalt-ouverture-1280.webp', modulesCss: ['planches-empilees', 'fil-conducteur'], fil: true };

export default (c) => {
  const q = (k) => c.t('gestalt.qualites.' + k);
  const planches = [['e', 'grok/gestalt-existentielle', '50% 50%'], ['h', 'grok/gestalt-humaniste', '50% 50%'], ['r', 'grok/gestalt-relationnelle', '50% 50%']];
  return html`
${ouvertureGestalt(c)}

<section class="origine conteneur" id="origine" data-fil="gauche">
  <div>
    <p class="surtitre" data-anime>${c.t('gestalt.origine.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('gestalt.origine.titre')}</h2>
    <p data-anime>${c.t('gestalt.origine.texte')}</p>
  </div>
  <div class="frise" role="img" aria-label="${c.s('gestalt.origine.frise')}" data-visuel>
    <svg class="frise__trait" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M20 80 C 140 10, 260 120, 360 60 S 520 20, 580 70" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
    <ol class="frise__dates" data-anime="cascade" aria-hidden="true">
      <li><strong>${c.t('gestalt.origine.d1')}</strong><span>${c.t('gestalt.origine.l1')}</span></li>
      <li><strong>${c.t('gestalt.origine.d2')}</strong><span>${c.t('gestalt.origine.l2')}</span></li>
    </ol>
  </div>
</section>

<section class="ici" id="ici-et-maintenant" data-fil="gauche">
  <div class="conteneur ici__grille">
    ${c.media({ nom: 'grok/gestalt-ici', alt: c.s('gestalt.ici.alt'), classe: 'ici__media', sizes: '(max-width: 760px) 100vw, 38vw', attrs: 'data-fx="onde"' })}
    <div class="ici__texte">
      <h2 class="ici__titre" data-anime="lignes"><span>${c.t('gestalt.ici.titre')}</span></h2>
      <p data-anime>${c.t('gestalt.ici.texte')}</p>
    </div>
  </div>
</section>

<section class="corps conteneur" id="corps" data-fil="droite">
  <div class="corps__texte">
    <h2 data-anime="lignes">${c.t('gestalt.corps.titre')}</h2>
    <p data-anime>${c.t('gestalt.corps.texte')}</p>
    <ul class="corps__mots" data-anime="cascade">${[1, 2, 3, 4, 5, 6].map((n) => html`<li>${c.t('gestalt.corps.m' + n)}</li>`)}</ul>
  </div>
  ${c.media({ nom: 'grok/gestalt-corps', alt: c.s('gestalt.corps.alt'), cadrage: '50% 0%', classe: 'corps__media', sizes: '(max-width: 760px) 100vw, 36vw', attrs: 'data-fx="parallaxe"' })}
</section>

<section class="vase" id="donner-forme" data-vase="visages" data-fil="droite">
  <div class="conteneur vase__grille">
    <div class="vase__figure">
      <svg class="vase__svg" viewBox="0 0 1000 1000" role="img" aria-label="${c.s('gestalt.vase.desc')}" data-effet="vase" focusable="false">
        <rect class="vase__fond" width="1000" height="1000"></rect>
        <path class="vase__coupe" d="${brut(coupe)}"></path>
        <path class="vase__profil vase__profil--g" d="${brut(profilGauche)}"></path>
        <path class="vase__profil vase__profil--d" d="${brut(profilDroit)}"></path>
      </svg>
    </div>
    <div class="vase__texte">
      <h2 data-anime="lignes">${c.t('gestalt.vase.titre')}</h2>
      <p data-anime>${c.t('gestalt.vase.texte')}</p>
      <p data-anime><button type="button" class="bouton bouton--contour" data-vase-bouton aria-pressed="false" data-libelle-coupe="${c.s('gestalt.vase.bouton')}" data-libelle-visages="${c.s('gestalt.vase.boutonRetour')}">${c.t('gestalt.vase.bouton')}</button></p>
      <p class="note" data-anime>${c.t('gestalt.vase.note')}</p>
    </div>
  </div>
</section>

<section class="ple qualites" data-module="planches-empilees" id="qualites" aria-labelledby="qualites-titre">
  <div class="ple__tete conteneur">
    <p class="surtitre">${q('surtitre')}</p>
    <h2 class="ple__titre" id="qualites-titre" data-anime="lignes">${q('titre')}</h2>
  </div>
  <div class="ple__pile conteneur">
    ${planches.map(([k, img, cad], i) => html`<article class="ple__planche" data-epingle data-tient aria-labelledby="ple-${k}" data-effet="planche">
      <div class="ple__contenu">
        <p class="ple__cartouche"><span>${c.t('gestalt.qualites.planche', { n: i + 1 })}</span></p>
        <h3 class="ple__nom" id="ple-${k}">${q(k + 'Titre')}</h3>
        <p class="ple__texte">${q(k + 'Texte')}</p>
      </div>
      <div class="ple__visuel">${c.media({ nom: img, alt: c.s('gestalt.qualites.' + k + 'Alt'), cadrage: cad, classe: 'ple__media', sizes: '(max-width: 760px) 100vw, 40vw' })}</div>
    </article>`)}
  </div>
</section>

<section class="appel-court conteneur" id="appel">
  <svg class="appel-court__forme" viewBox="-1 -1 2 2" aria-hidden="true" data-fx="trace" data-visuel><path d="M-0.8 0.1 C -0.7 -0.6, 0.1 -0.85, 0.6 -0.45 S 0.95 0.55, 0.2 0.75 S -0.9 0.75, -0.8 0.1" fill="none" stroke="currentColor" stroke-width="0.03" stroke-linecap="round"/></svg>
  <div>
    <h2 data-anime="lignes">${c.t('gestalt.appel.titre')}</h2>
    <p data-anime>${c.t('gestalt.appel.texte')}</p>
    <p class="actions" data-anime>${c.lien('contact', { ancre: 'demande', classe: 'bouton', texte: c.t('commun.actionEntete'), attrs: 'data-fil-point="0.5 0.5" data-fil-boucle' })} ${c.lien('accompagnements', { classe: 'lien-fleche', texte: c.t('pages.accompagnements.nav') })}</p>
  </div>
</section>
`;
};
