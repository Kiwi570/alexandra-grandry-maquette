/* Accueil · direction « Figure et fond ».
   Ouverture figure-fond, présentation (portrait révélé), manifeste des raisons (module manifeste-mot-a-mot),
   « Pour qui » épinglé avec la forme d'encre WebGL (effet signature « forme »), deux approches, pratique encadrée,
   déroulé (frise tracée), appel final. Chaque section a au moins un effet au défilement, aussi sur téléphone. */
import { html, brut } from '../../outils/gabarit.mjs';
import { ouvertureAccueil } from '../gabarits/ouvertures.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'grok/accueil-ouverture-640.webp', modulesCss: ['manifeste-mot-a-mot', 'fil-conducteur'], fil: true };

const formeSvg = (cfg, classe = '') => html`<svg class="forme-svg ${classe}" viewBox="-1 -1 2 2" aria-hidden="true" focusable="false">${cfg.filter((b) => b[2] > 0).map(([x, y, r]) => html`<circle cx="${x}" cy="${-y}" r="${r}"></circle>`)}</svg>`;

export default (c) => {
  const publics = c.donnees.publics;
  const formes = c.donnees.formes;
  return html`
${ouvertureAccueil(c)}

<section class="presentation conteneur" id="presentation" data-fil="gauche">
  <div class="presentation__portrait">
    ${c.media({ nom: 'portrait', alt: 'Alexandra Grandry, Gestalt-thérapeute et sophrologue', cadrage: '50% 36%', classe: 'portrait-media', sizes: '(max-width: 760px) 80vw, 34vw', attrs: 'data-anime="rideau"' })}
    <svg class="presentation__trait" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M6 40 C 90 6, 170 58, 250 26 S 360 16, 394 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
  </div>
  <div class="presentation__texte">
    <p class="surtitre" data-anime>${c.t('accueil.presentation.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('accueil.presentation.titre')}</h2>
    <p data-anime>${c.t('accueil.presentation.texte1')}</p>
    <p data-anime>${c.t('accueil.presentation.texte2')}</p>
    <ul class="titres" data-anime="cascade">
      <li>${c.t('accueil.presentation.t1')}</li>
      <li>${c.t('accueil.presentation.t2')}</li>
      <li>${c.t('accueil.presentation.t3')}</li>
      <li>${c.t('accueil.presentation.t4')}</li>
    </ul>
  </div>
</section>

<section class="mmm raisons" id="raisons" aria-labelledby="raisons-titre">
  <div class="mmm__fond" aria-hidden="true">${c.media({ nom: 'grok/accueil-raisons', alt: '', classe: 'raisons-fond', sizes: '100vw' })}</div>
  <div class="mmm__cadre conteneur">
    <p class="surtitre">${c.t('accueil.raisons.surtitre')}</p>
    <h2 id="raisons-titre" class="raisons__titre" data-anime="lignes">${c.t('accueil.raisons.titre')}</h2>
    <p class="mmm__texte" data-effet="ordre">${c.t('accueil.raisons.texte')}</p>
    <p class="mmm__signature">${c.t('accueil.raisons.note')}</p>
    <p class="raisons__aussi" data-anime>${c.t('accueil.raisons.aussi1')} <span class="re-trouver"><span class="re">(re)<svg class="re__cercle" viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M18 34 C 14 14, 62 4, 98 14 S 112 48, 66 54 S 6 50, 22 22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></span>${c.t('accueil.raisons.aussi2')}</span></p>
    <p class="raisons__ponctuel" data-anime>${c.t('accueil.raisons.ponctuel')}</p>
  </div>
</section>

<section class="publics" id="pour-qui" data-fil="gauche" aria-labelledby="publics-titre" data-formes='${brut(JSON.stringify(publics.map((p) => formes[p.cle])))}'>
  <div class="publics__scene">
    <div class="conteneur publics__tete">
      <p class="surtitre">${c.t('accueil.publics.surtitre')}</p>
      <h2 id="publics-titre" data-anime="lignes">${c.t('accueil.publics.titre')}</h2>
      <p class="publics__intro">${c.t('accueil.publics.intro')}</p>
    </div>
    <div class="conteneur publics__corps">
      <div class="publics__forme" data-effet="forme" data-visuel>
        <canvas class="publics__canvas" aria-hidden="true" data-audit-ignorer></canvas>
        ${formeSvg(formes.adultes, 'forme-svg--repli')}
      </div>
      <div class="publics__details">
        ${publics.map((p, i) => html`<article class="public" data-public="${i}" id="pour-qui-${p.cle}">
          <div class="public__forme">${formeSvg(formes[p.cle])}</div>
          <p class="public__etape">${c.t('accueil.publics.etape', { n: i + 1 })}</p>
          <h3 class="public__nom">${p.nom}</h3>
          <p class="public__phrase">${p.phrase}</p>
          <p class="public__tarif">${p.tarif.startsWith('à') ? html`<span class="prix-manquant" data-prix>${c.t('commun.tarifManquant')}</span>` : html`<strong data-prix>${p.tarif}</strong> <span>${p.tarifDetail}</span>`}</p>
          <ul class="public__cadre">${p.cadre.filter((x) => !x.startsWith('Séance de')).slice(0, 2).map((x) => html`<li>${x}</li>`)}</ul>
          <p>${c.lien('accompagnements', { ancre: p.cle, classe: 'lien-fleche', texte: html`${c.t('accueil.publics.voir')}<span class="visuellement-cache"> : ${p.nom}</span>` })}</p>
        </article>`)}
      </div>
      <ol class="publics__liste" aria-hidden="true">${publics.map((p, i) => html`<li data-index="${i}"><span class="publics__num">0${i + 1}</span><span class="publics__nom">${p.nom}</span><span class="publics__prix">${p.tarif.startsWith('à') ? '—' : p.tarif}</span></li>`)}</ol>
    </div>
  </div>
</section>

<section class="approches conteneur" id="approches" data-fil="droite">
  <div class="approches__tete">
    <p class="surtitre" data-anime>${c.t('accueil.approches.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('accueil.approches.titre')}</h2>
  </div>
  <div class="approches__grille" data-anime="cascade">
    <article class="approche" data-survol="incline" data-survol-force="4">
      ${c.media({ nom: 'grok/accueil-gestalt', alt: c.s('accueil.approches.gestaltAlt'), classe: 'approche__media', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-fx="parallaxe"' })}
      <h3>${c.t('accueil.approches.gestaltTitre')}</h3>
      <p>${c.t('accueil.approches.gestaltTexte')}</p>
      <p>${c.lien('gestalt', { classe: 'lien-fleche', texte: c.t('accueil.approches.gestaltLien') })}</p>
    </article>
    <article class="approche approche--decale" data-survol="incline" data-survol-force="4">
      ${c.media({ nom: 'grok/accueil-sophrologie', alt: c.s('accueil.approches.sophroAlt'), classe: 'approche__media', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-fx="parallaxe"' })}
      <h3>${c.t('accueil.approches.sophroTitre')}</h3>
      <p>${c.t('accueil.approches.sophroTexte')}</p>
      <p>${c.lien('sophrologie', { classe: 'lien-fleche', texte: c.t('accueil.approches.sophroLien') })}</p>
    </article>
  </div>
</section>

<section class="cadre" id="cadre" data-fil="droite">
  <div class="conteneur cadre__grille">
    <div class="cadre__texte">
      <p class="surtitre" data-anime>${c.t('accueil.cadre.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('accueil.cadre.titre')}</h2>
      <blockquote class="cadre__conviction" data-anime="mots"><p>${c.t('accueil.cadre.conviction')}</p></blockquote>
      <dl class="cadre__liste" data-anime="cascade">
        <div><dt>${c.t('accueil.cadre.supervisionTitre')}</dt><dd>${c.t('accueil.cadre.supervisionTexte')}</dd></div>
        <div><dt>${c.t('accueil.cadre.rechercheTitre')}</dt><dd>${c.t('accueil.cadre.rechercheTexte')}</dd></div>
        <div><dt>${c.t('accueil.cadre.deontoTitre')}</dt><dd>${c.t('accueil.cadre.deontoTexte')}</dd></div>
      </dl>
    </div>
    ${c.media({ nom: 'grok/accueil-cadre', alt: c.s('accueil.cadre.alt'), classe: 'cadre__media', sizes: '(max-width: 760px) 100vw, 42vw', attrs: 'data-fx="onde"' })}
  </div>
</section>

<section class="deroule conteneur" id="deroule" data-fil="gauche">
  <div class="deroule__tete">
    <p class="surtitre" data-anime>${c.t('accueil.deroule.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('accueil.deroule.titre')}</h2>
  </div>
  <div class="deroule__grille">
    ${c.media({ nom: 'grok/accueil-deroule', alt: c.s('accueil.deroule.alt'), classe: 'deroule__media', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-fx="zoom"' })}
    <div class="deroule__frise">
      <svg class="deroule__trait" viewBox="0 0 40 600" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M20 4 C 34 120, 6 220, 20 300 S 34 480, 20 596" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
      <ol class="deroule__etapes" data-anime="cascade">
        <li><h3>${c.t('accueil.deroule.e1Titre')}</h3><p>${c.t('accueil.deroule.e1Texte')}</p></li>
        <li><h3>${c.t('accueil.deroule.e2Titre')}</h3><p>${c.t('accueil.deroule.e2Texte')}</p></li>
        <li><h3>${c.t('accueil.deroule.e3Titre')}</h3><p>${c.t('accueil.deroule.e3Texte')}</p></li>
      </ol>
      <p class="deroule__tarif" data-anime data-fil-point="0.02 0.5" data-fil-boucle><strong data-prix>80 €</strong> ${c.t('accueil.deroule.tarif')}</p>
      <p class="note" data-anime>${c.t('commun.visio')}</p>
    </div>
  </div>
</section>

<section class="appel" id="appel" data-gouttiere="#14271f">
  ${c.media({ nom: 'grok/accueil-appel', alt: c.s('accueil.appel.alt'), classe: 'appel__fond', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="12"' })}
  <div class="conteneur appel__contenu">
    <h2 data-anime="lignes">${c.t('accueil.appel.titre')}</h2>
    <p data-anime>${c.t('accueil.appel.texte')}</p>
    <p class="appel__actions" data-anime>
      <a class="bouton bouton--clair" href="tel:${c.site.contact.telephoneLien}" data-survol="magnetique">${c.t('commun.appeler')} ${c.site.contact.telephone}</a>
      <a class="bouton bouton--contour-clair" href="mailto:${c.site.contact.email}">${c.t('commun.ecrire')}</a>
      ${c.lien('contact', { ancre: 'demande', classe: 'lien-fleche lien-fleche--clair', texte: c.t('accueil.appel.demande') })}
    </p>
  </div>
</section>
`;
};
