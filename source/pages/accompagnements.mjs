/* Accompagnements · six fiches (adultes, couples, enfants, adolescents, familles, groupe), chacune avec son cadre
   et son tarif au recto, un bouton qui préremplit la demande, et un fil d'encre qui les relie (fil conducteur).
   Groupe : cercle de points qui tourne lentement (effet « cercle »). Bon à savoir en FAQ. */
import { html, brut } from '../../outils/gabarit.mjs';
import { ouvertureAccompagnements } from '../gabarits/ouvertures.mjs';

export const page = { cle: 'accompagnements', fichier: 'accompagnements', imagePartage: 'grok/accompagnements-ouverture-1280.webp', modulesCss: ['fil-conducteur'], fil: true };

const cercle = (c) => html`<svg class="cercle" viewBox="-60 -60 120 120" role="img" aria-label="${c.s('accompagnements.cercle')}" data-effet="cercle" focusable="false">
  <circle class="cercle__trait" r="44" fill="none"></circle>
  <g class="cercle__points">${Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return html`<circle cx="${(Math.cos(a) * 44).toFixed(2)}" cy="${(Math.sin(a) * 44).toFixed(2)}" r="${i % 3 === 0 ? 6 : 5}"></circle>`; })}</g>
</svg>`;

export default (c) => {
  const publics = c.donnees.publics;
  return html`
${ouvertureAccompagnements(c)}

${publics.map((p, i) => html`<section class="fiche fiche--${i % 2 ? 'droite' : 'gauche'}" id="${p.cle}" aria-labelledby="titre-${p.cle}" data-fil="${i % 2 ? 'gauche' : 'droite'}">
  <div class="conteneur fiche__grille">
    <div class="fiche__visuel">
      ${c.media({ nom: p.image, alt: p.alt, classe: 'fiche__media', sizes: '(max-width: 760px) 100vw, 38vw', attrs: i % 2 ? 'data-anime="rideau"' : 'data-fx="parallaxe"' })}
      ${p.cle === 'groupe' ? cercle(c) : ''}
    </div>
    <div class="fiche__texte">
      <p class="fiche__num" aria-hidden="true">0${i + 1}</p>
      <h2 id="titre-${p.cle}" data-anime="lignes">${p.nom}</h2>
      <p class="fiche__phrase" data-anime>${p.phrase}</p>
      <div class="fiche__recto" data-anime>
        <p class="fiche__tarif"><span class="etiquette">${c.t('accompagnements.tarif')}</span> ${p.tarif.startsWith('à') ? html`<span class="prix-manquant" data-prix>${c.t('commun.acompleter')}</span>` : html`<strong data-prix>${p.tarif}</strong> <span>${p.tarifDetail}</span>`}</p>
        <ul class="fiche__cadre">${p.cadre.filter((x) => !x.startsWith('Séance de')).map((x) => html`<li>${x}</li>`)}</ul>
        ${p.cle === 'groupe' ? html`<p class="fiche__dates">${c.t('accompagnements.dates')}</p>` : ''}
      </div>
      ${p.texte.map((t) => html`<p data-anime>${t}</p>`)}
      ${p.signes ? html`<h3 class="fiche__sous" data-anime>${c.t('accompagnements.signes')}</h3><ul class="fiche__signes" data-anime="cascade">${p.signes.map((s) => html`<li>${s}</li>`)}</ul>` : ''}
      <p data-anime>${c.lien('contact', { ancre: 'demande', params: `public=${p.cle}`, classe: 'bouton', texte: html`${c.t(p.entretien ? 'accompagnements.entretien' : 'accompagnements.demander')}<span class="visuellement-cache"> ${c.t('accompagnements.pour', { nom: p.nom.toLowerCase() })}</span>`, attrs: 'data-survol="magnetique"' })}</p>
    </div>
  </div>
</section>`)}

<section class="pratique conteneur" id="bon-a-savoir" data-fil="droite">
  <div>
    <h2 data-anime="lignes">${c.t('accompagnements.pratique.titre')}</h2>
    ${[1, 2, 3, 4, 5].map((n) => html`<details class="faq-item" data-anime><summary>${c.t('accompagnements.pratique.q' + n)}</summary><p>${c.t('accompagnements.pratique.r' + n)}</p></details>`)}
  </div>
  ${c.media({ nom: 'grok/accompagnements-pratique', alt: c.s('accompagnements.pratique.alt'), classe: 'pratique__media', sizes: '(max-width: 760px) 100vw, 34vw', attrs: 'data-fx="parallaxe"' })}
</section>

<section class="appel-court conteneur" id="appel">
  <svg class="appel-court__forme" viewBox="-1 -1 2 2" aria-hidden="true" data-fx="trace" data-visuel><path d="M-0.8 0.1 C -0.7 -0.6, 0.1 -0.85, 0.6 -0.45 S 0.95 0.55, 0.2 0.75 S -0.9 0.75, -0.8 0.1" fill="none" stroke="currentColor" stroke-width="0.03" stroke-linecap="round"/></svg>
  <div>
    <h2 data-anime="lignes">${c.t('accompagnements.appel.titre')}</h2>
    <p data-anime>${c.t('accompagnements.appel.texte')}</p>
    <p class="actions" data-anime><a class="bouton" href="tel:${c.site.contact.telephoneLien}" data-fil-point="0.5 0.5" data-fil-boucle>${c.t('commun.appeler')} ${c.site.contact.telephone}</a> ${c.lien('contact', { ancre: 'demande', classe: 'lien-fleche', texte: c.t('accueil.appel.demande') })}</p>
  </div>
</section>
`;
};
