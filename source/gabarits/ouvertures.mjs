/* Ouvertures des pages : une composition par modèle de page, jamais un gabarit commun.
   Chacune garde les conventions du premier écran : un seul h1, [data-action-principale], [data-info-cle],
   image chargée en priorité, et son mouvement marqué data-effet (liste « effets » de _audit/config.json). */
import { html, brut } from '../../outils/gabarit.mjs';
import { profilGauche, profilDroit } from './vase.mjs';

const tel = (c) => html`<a class="lien-tel" href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a>`;

/* Accueil · papier ivoire, texte à gauche, deux profils d'encre à droite dont la coupe laisse voir la photo.
   Mouvement « figure-fond » : les profils sont deux battants ; à l'arrivée ils se referment sur la coupe,
   au défilement (section épinglée sur ordinateur) ils s'ouvrent en 3D comme une porte sur la photo. */
export function ouvertureAccueil(c) {
  return html`<section class="ouv-accueil" id="debut" data-plein-ecran>
  <div class="ouv-accueil__texte">
    <p class="surtitre" data-anime="gsap" data-intro>${c.t('accueil.hero.surtitre')}</p>
    <h1 class="ouv-accueil__titre"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap" data-superpose>${c.t('accueil.hero.titre1')}</span></span><span class="ligne-masque"><span class="ouv-ligne ouv-ligne--italique" data-anime="gsap" data-superpose>${c.t('accueil.hero.titre2')}</span></span></h1>
    <p class="ouv-accueil__accroche" data-anime="gsap" data-intro>${c.tb('accueil.hero.accroche')}</p>
    <p class="ouv-accueil__chapo" data-anime="gsap" data-intro>${c.t('accueil.hero.texte')}</p>
    <p class="actions" data-anime="gsap" data-intro>${c.lien('contact', { ancre: 'demande', classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })} ${tel(c)}</p>
    <p class="info-cle" data-info-cle data-anime="gsap" data-intro>${c.t('accueil.hero.info')}</p>
  </div>
  <div class="ouv-accueil__figure">
    <div class="figure-boite" data-effet="figure-fond" role="img" aria-label="${c.s('accueil.hero.figure')}">
      ${c.media({ nom: 'grok/accueil-ouverture', alt: c.s('accueil.hero.alt'), cadrage: '40% 50%', priorite: true, classe: 'figure-photo', sizes: '(max-width: 760px) 90vw, 46vw', attrs: 'data-anime="gsap"' })}
      <div class="battant battant--g" data-anime="gsap" aria-hidden="true"><svg viewBox="0 0 500 1000" preserveAspectRatio="none" focusable="false"><path class="figure-profil" d="${brut(profilGauche)}"/></svg></div>
      <div class="battant battant--d" data-anime="gsap" aria-hidden="true"><svg viewBox="500 0 500 1000" preserveAspectRatio="none" focusable="false"><path class="figure-profil" d="${brut(profilDroit)}"/></svg></div>
    </div>
  </div>
</section>`;
}

/* Accompagnements · fond sable, très grand titre, sommaire en pastilles d'encre, puis bandeau de galets.
   Mouvement « gouttes » : six gouttes tombent sur le titre et deviennent les pastilles du sommaire. */
export function ouvertureAccompagnements(c) {
  const publics = c.donnees.publics;
  return html`<section class="ouv-accomp" id="debut">
  <div class="conteneur ouv-accomp__tete">
    <h1 class="ouv-accomp__titre" data-anime="lignes">${c.t('accompagnements.titre')}</h1>
    <div class="ouv-accomp__cote">
      <p data-anime>${c.t('accompagnements.intro')}</p>
      <p class="actions" data-anime>${c.lien('contact', { ancre: 'demande', classe: 'bouton', texte: c.t('commun.actionEntete'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
      <p class="info-cle" data-info-cle data-anime>${c.t('accompagnements.info')}</p>
    </div>
  </div>
  <nav class="conteneur ouv-accomp__sommaire" aria-label="${c.s('accompagnements.sommaire')}">
    <ul>${publics.map((p, i) => html`<li style="--i:${i}" data-anime="gsap"><a href="#${p.cle}" data-sans-transition><span class="pastille pastille--${p.cle}" aria-hidden="true" data-effet="gouttes"></span>${p.nom}</a></li>`)}</ul>
  </nav>
  ${c.media({ nom: 'grok/accompagnements-ouverture', alt: c.s('accompagnements.alt'), priorite: true, classe: 'ouv-accomp__bandeau', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
</section>`;
}

/* La Gestalt-thérapie · fond encre sombre plein écran, composition centrée, le mot « Gestalt » en très grand.
   Mouvement « gestalt-lettres » : des fragments épars se rassemblent en lettres, puis se défont doucement au défilement. */
export function ouvertureGestalt(c) {
  const mot = c.s('gestalt.mot');
  return html`<section class="ouv-gestalt" id="debut" data-gouttiere="#14271f">
  ${c.media({ nom: 'grok/gestalt-ouverture', alt: c.s('gestalt.alt'), cadrage: '50% 50%', cadrageMobile: '50% 50%', priorite: true, classe: 'ouv-gestalt__fond', sizes: '100vw', attrs: 'data-effet="encre" data-souris' })}
  <div class="ouv-gestalt__contenu conteneur">
    <h1 class="ouv-gestalt__titre"><span class="visuellement-cache">${c.t('gestalt.titre')}</span><span class="ouv-gestalt__mot" aria-hidden="true" data-effet="gestalt-lettres">${[...mot].map((l, i) => html`<span class="lettre" style="--i:${i}"><span class="lettre-in" data-anime="gsap">${l}</span></span>`)}</span></h1>
    <p class="ouv-gestalt__sous" data-anime="gsap" data-intro><em>${c.t('gestalt.sous')}</em></p>
    <p class="ouv-gestalt__texte" data-anime="gsap" data-intro>${c.t('gestalt.texte')}</p>
    <p class="actions" data-anime="gsap" data-intro>${c.lien('contact', { ancre: 'demande', classe: 'bouton bouton--clair', texte: c.t('commun.actionEntete'), attrs: 'data-action-principale' })}</p>
    <p class="info-cle" data-info-cle data-anime="gsap" data-intro>${c.t('gestalt.info')}</p>
  </div>
</section>`;
}

/* La sophrologie · fond sable uni, image à gauche et texte à droite, le cercle de respiration posé sur l'image.
   Mouvement « respiration » : le cercle s'ouvre et se referme lentement ; un bouton guide une respiration. */
export function ouvertureSophrologie(c) {
  return html`<section class="ouv-sophro" id="debut">
  <span class="ouv-sophro__lumiere" aria-hidden="true" data-audit-ignorer></span>
  <div class="ouv-sophro__visuel">
    <span class="ronds" aria-hidden="true" data-audit-ignorer><span></span><span></span><span></span></span>
    ${c.media({ nom: 'grok/sophrologie-ouverture', alt: c.s('sophrologie.alt'), cadrage: '40% 50%', priorite: true, classe: 'ouv-sophro__photo', sizes: '(max-width: 760px) 100vw, 46vw' })}
    <div class="souffle" data-anime="gsap" data-effet="respiration" role="img" aria-label="${c.s('sophrologie.cercle')}">
      <span class="souffle__anneau souffle__anneau--2" aria-hidden="true"></span>
      <span class="souffle__anneau" aria-hidden="true"></span>
      <span class="souffle__mot" aria-live="polite" data-souffle-mot>${c.t('sophrologie.inspirez')}</span>
    </div>
  </div>
  <div class="ouv-sophro__texte">
    <h1 data-anime="lignes">${c.t('sophrologie.titre')}</h1>
    <p data-anime>${c.t('sophrologie.texte')}</p>
    <p class="actions" data-anime>${c.lien('contact', { ancre: 'demande', classe: 'bouton', texte: c.t('commun.actionEntete'), attrs: 'data-action-principale' })}
      <button type="button" class="bouton bouton--contour" data-souffle-bouton data-libelle-essayer="${c.s('sophrologie.essayer')}" data-libelle-arreter="${c.s('sophrologie.arreter')}" aria-pressed="false">${c.t('sophrologie.essayer')}</button></p>
    <p class="info-cle" data-info-cle data-anime>${c.t('sophrologie.info')}</p>
    <p class="note" data-anime>${c.t('sophrologie.tarif')} ${c.t('sophrologie.demo')}</p>
  </div>
</section>`;
}

/* Contact · ouverture compacte sur fond vert profond, le numéro de téléphone en très grand, bandeau panoramique dessous.
   Mouvement « numero » : le numéro se trace, chiffre après chiffre, comme à l'encre. */
export function ouvertureContact(c) {
  const chiffres = c.site.contact.telephone;
  return html`<section class="ouv-contact" id="debut" data-gouttiere="#1e3a32">
  <div class="conteneur ouv-contact__grille">
    <div>
      <h1 data-anime="lignes">${c.t('contact.titre')}</h1>
      <p data-anime>${c.t('contact.texte')}</p>
    </div>
    <div class="ouv-contact__joindre">
      <a class="ouv-contact__numero" href="tel:${c.site.contact.telephoneLien}" data-action-principale aria-label="${c.s('contact.numero')}">${[...chiffres].map((ch, i) => html`<span class="chiffre${ch === ' ' ? ' chiffre--espace' : ''}" style="--i:${i}" aria-hidden="true" data-anime="gsap" data-effet="numero">${ch === ' ' ? ' ' : ch}</span>`)}<span class="plume" aria-hidden="true" data-anime="gsap" data-ephemere></span></a>
      <p><a class="ouv-contact__email" href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
      <p class="info-cle" data-info-cle>${c.t('contact.info')}</p>
    </div>
  </div>
  ${c.media({ nom: 'grok/contact-ouverture', alt: c.s('contact.alt'), priorite: true, classe: 'ouv-contact__bandeau', sizes: '100vw', attrs: 'data-anime="rideau"' })}
</section>`;
}
