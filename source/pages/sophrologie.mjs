/* La sophrologie · ouverture image à gauche avec le cercle de respiration (effet « respiration »),
   trois outils en cascade avec parallaxe, outils du quotidien sur fond d'image, appel. */
import { html } from '../../outils/gabarit.mjs';
import { ouvertureSophrologie } from '../gabarits/ouvertures.mjs';

export const page = { cle: 'sophrologie', fichier: 'sophrologie', imagePartage: 'grok/sophro-respiration-800.webp', modulesCss: ['fil-conducteur'], fil: true };

export default (c) => {
  const o = (k) => c.t('sophrologie.corps.' + k);
  const outils = [['o1', 'grok/sophro-respiration'], ['o2', 'grok/sophro-relachement'], ['o3', 'grok/sophro-visualisation']];
  return html`
${ouvertureSophrologie(c)}

<section class="outils conteneur" id="corps-esprit" data-fil="gauche">
  <div class="outils__tete">
    <p class="surtitre" data-anime>${o('surtitre')}</p>
    <h2 data-anime="lignes">${o('titre')}</h2>
    <p data-anime>${o('texte')}</p>
  </div>
  <ol class="outils__liste" data-anime="cascade">
    ${outils.map(([k, img], i) => html`<li class="outil">
      ${c.media({ nom: img, alt: c.s('sophrologie.corps.' + k + 'Alt'), classe: 'outil__media', sizes: '(max-width: 760px) 100vw, 30vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
      <p class="outil__num" aria-hidden="true">0${i + 1}</p>
      <h3>${o(k + 'Titre')}</h3>
      <p>${o(k + 'Texte')}</p>
    </li>`)}
  </ol>
</section>

<section class="quotidien" id="quotidien">
  ${c.media({ nom: 'grok/sophro-quotidien', alt: c.s('sophrologie.quotidien.alt'), classe: 'quotidien__fond', sizes: '100vw', attrs: 'data-fx="zoom" data-fx-force="14"' })}
  <div class="conteneur quotidien__contenu">
    <div class="quotidien__carte">
      <h2 data-anime="lignes">${c.t('sophrologie.quotidien.titre')}</h2>
      <p data-anime>${c.t('sophrologie.quotidien.texte')}</p>
    </div>
  </div>
</section>

<section class="appel-court conteneur" id="appel">
  <svg class="appel-court__forme" viewBox="-1 -1 2 2" aria-hidden="true" data-fx="trace" data-visuel><circle cx="0" cy="0" r="0.8" fill="none" stroke="currentColor" stroke-width="0.03"/><circle cx="0" cy="0" r="0.55" fill="none" stroke="currentColor" stroke-width="0.02"/></svg>
  <div>
    <h2 data-anime="lignes">${c.t('sophrologie.appel.titre')}</h2>
    <p data-anime>${c.t('sophrologie.appel.texte')}</p>
    <p class="actions" data-anime>${c.lien('contact', { ancre: 'demande', params: 'public=adultes', classe: 'bouton', texte: c.t('commun.actionEntete'), attrs: 'data-fil-point="0.5 0.5" data-fil-boucle' })} ${c.lien('gestalt', { classe: 'lien-fleche', texte: c.t('pages.gestalt.nav') })}</p>
  </div>
</section>
`;
};
