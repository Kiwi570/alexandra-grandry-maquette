/* Contact et rendez-vous · ouverture compacte au numéro (effet « numero »), demande en quatre étapes
   (module formulaire-par-etapes, simulée, préremplie par ?public=…), plan schématique RER → cabinet
   (effet « chemin-rer »), tarifs et modalités. */
import { html } from '../../outils/gabarit.mjs';
import { ouvertureContact } from '../gabarits/ouvertures.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/contact-ouverture-1280.webp', modulesCss: ['formulaire-par-etapes'] };

export default (c) => {
  const d = (k) => c.t('contact.demande.' + k);
  const publics = c.donnees.publics;
  const lignes = [['adultes', '45 min'], ['couples', '1 h 30'], ['familles', '1 h 30'], ['groupe', '3 h, un lundi par mois'], ['enfants', 'à compléter'], ['adolescents', 'à compléter']];
  return html`
${ouvertureContact(c)}

<section class="demande conteneur" id="demande">
  <div class="demande__cote">
    <p class="surtitre" data-anime>${d('surtitre')}</p>
    <h2 data-anime="lignes">${d('titre')}</h2>
    <p data-anime>${d('texte')}</p>
    <p class="note" data-anime>${d('simule')}</p>
    ${c.media({ nom: 'grok/contact-formulaire', alt: c.s('contact.demande.alt'), classe: 'demande__media', sizes: '(max-width: 760px) 100vw, 30vw', attrs: 'data-fx="parallaxe"' })}
  </div>
  <div class="fpe" data-module="formulaire-par-etapes" data-effet="etapes">
    <div class="fpe__carton">
      <form class="fpe__form" novalidate action="mailto:${c.site.contact.email}">
        <fieldset class="fpe__etape" data-etape="${c.s('contact.demande.e1')}">
          <legend class="fpe__legende"><h3 class="fpe__titre">${d('e1q')}</h3></legend>
          <div class="fpe__groupe fpe__cartes" data-libelle="${c.s('contact.demande.e1')}">
            ${publics.map((p) => html`<label class="fpe__carte"><input type="radio" name="public" value="${p.cle}" required><span class="fpe__icone pastille pastille--${p.cle}" aria-hidden="true"></span><span class="fpe__carte-titre">${p.nom}</span><span class="fpe__carte-texte">${p.tarif.startsWith('à') ? c.t('commun.tarifManquant') : html`${p.tarif} · ${p.tarifDetail}`}</span></label>`)}
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${c.s('contact.demande.e2')}">
          <legend class="fpe__legende"><h3 class="fpe__titre">${d('e2q')}</h3></legend>
          <div class="fpe__groupe fpe__cartes" data-libelle="${c.s('contact.demande.e2')}">
            <label class="fpe__carte"><input type="radio" name="lieu" value="cabinet" required checked><svg class="fpe__icone" viewBox="0 0 32 32" aria-hidden="true"><path d="M6 15 L16 6 L26 15 V27 H6 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13 27 V19 H19 V27" fill="none" stroke="currentColor" stroke-width="2"/></svg><span class="fpe__carte-titre">${d('cabinet')}</span><span class="fpe__carte-texte">${d('cabinetDetail')}</span></label>
            <label class="fpe__carte"><input type="radio" name="lieu" value="visio" required><svg class="fpe__icone" viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="8" width="18" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M22 14 L28 10 V22 L22 18 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span class="fpe__carte-titre">${d('visio')}</span><span class="fpe__carte-texte">${d('visioDetail')}</span></label>
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${c.s('contact.demande.e3')}">
          <legend class="fpe__legende"><h3 class="fpe__titre">${d('e3q')}</h3></legend>
          <div class="fpe__champ"><label for="f-nom">${d('nom')}</label><input id="f-nom" name="nom" autocomplete="name" required minlength="2"></div>
          <div class="fpe__champ"><label for="f-tel">${d('tel')}</label><input id="f-tel" name="tel" type="tel" autocomplete="tel" required pattern="[0-9 +().-]{10,}"></div>
          <div class="fpe__champ"><label for="f-email">${d('email')}</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
          <div class="fpe__champ"><label for="f-message">${d('message')}</label><textarea id="f-message" name="message" rows="3"></textarea></div>
          <p class="mention-donnees">${d('donnees')}</p>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${c.s('contact.demande.e4')}" data-recap>
          <legend class="fpe__legende"><h3 class="fpe__titre">${d('e4q')}</h3></legend>
          <div class="fpe__recap"></div>
          <p class="note">${d('simule')}</p>
        </fieldset>
        <div class="fpe__nav">
          <button type="button" class="bouton bouton--contour" data-precedent>${d('precedent')}</button>
          <button type="button" class="bouton" data-suivant>${d('suivant')}</button>
          <button type="submit" class="bouton">${d('envoyer')}</button>
        </div>
      </form>
      <div class="fpe__fin" hidden><h3>${d('merci')}</h3><p data-resume></p><p class="note">${d('simule')}</p><button type="button" class="bouton bouton--contour" data-recommencer>${d('recommencer')}</button></div>
    </div>
  </div>
</section>

<section class="acces" id="acces">
  <div class="conteneur acces__grille">
    <div>
      <p class="surtitre" data-anime>${c.t('contact.acces.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('contact.acces.titre')}</h2>
      <p data-anime>${c.t('contact.acces.texte')}</p>
      <p data-anime>${c.t('contact.acces.visio')}</p>
      <p class="note" data-anime>${c.t('contact.acces.note')}</p>
    </div>
    <figure class="plan" data-visuel>
      <svg class="plan__svg" viewBox="0 0 600 420" role="img" aria-label="${c.s('contact.acces.desc')}" data-effet="chemin-rer" focusable="false">
        <g class="plan__rues" aria-hidden="true">
          <path d="M-10 300 C 150 280, 300 310, 610 270"/>
          <path d="M120 -10 C 140 120, 120 260, 150 430"/>
          <path d="M420 -10 C 400 140, 440 280, 410 430"/>
          <path d="M-10 120 C 200 140, 380 100, 610 130"/>
        </g>
        <path class="plan__voie" d="M-10 360 C 180 350, 380 380, 610 340" aria-hidden="true"/>
        <path class="plan__chemin" data-chemin d="M160 350 C 200 300, 230 260, 300 230 S 400 180, 440 140"/>
        <g class="plan__gare" data-repere transform="translate(160 350)"><circle r="16"/><text y="5" text-anchor="middle">A</text></g>
        <g class="plan__cabinet" data-repere transform="translate(440 140)"><circle r="18"/><path d="M-7 4 L0 -6 L7 4 Z"/></g>
        <g class="plan__duree" transform="translate(318 206)"><rect x="-58" y="-18" width="116" height="34" rx="17"/><text y="5" text-anchor="middle">${c.s('contact.acces.duree')}</text></g>
      </svg>
      <figcaption class="plan__legende"><span class="plan__pastille plan__pastille--gare" aria-hidden="true"></span>${c.t('contact.acces.gare')}<br><span class="plan__pastille plan__pastille--cabinet" aria-hidden="true"></span>${c.t('contact.acces.cabinet')}</figcaption>
    </figure>
  </div>
</section>

<section class="tarifs conteneur" id="tarifs">
  <div class="tarifs__tete">
    <p class="surtitre" data-anime>${c.t('contact.tarifs.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('contact.tarifs.titre')}</h2>
    <p data-anime>${c.t('contact.tarifs.remboursement')}</p>
    <p data-anime>${c.t('contact.tarifs.duree')}</p>
  </div>
  <div class="tarifs__tableau" data-anime="cascade" data-visuel>
    ${lignes.map(([cle, duree]) => { const p = publics.find((x) => x.cle === cle); return html`<div class="tarifs__ligne"><span class="tarifs__forme pastille pastille--${cle}" aria-hidden="true"></span><span class="tarifs__nom">${p.nom}</span><span class="tarifs__duree">${duree}</span>${p.tarif.startsWith('à') ? html`<span class="tarifs__prix prix-manquant" data-prix>${c.t('commun.acompleter')}</span>` : html`<strong class="tarifs__prix" data-prix>${p.tarif}</strong>`}</div>`; })}
  </div>
</section>
`;
};
