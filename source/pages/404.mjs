/* Page 404 aux couleurs du client, avec son image en tête de page. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false };

export default (c) => html`
<section class="introuvable" id="debut">
  ${c.media({ nom: 'grok/page-404', alt: c.s('introuvable.alt'), priorite: true, classe: 'introuvable__media', sizes: '100vw', attrs: 'data-fx="zoom"' })}
  <div class="conteneur introuvable__texte">
    <h1 data-anime="lignes">${c.t('introuvable.titre')}</h1>
    <p data-anime>${c.t('introuvable.texte')}</p>
    <p data-anime>${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })}</p>
    <p class="info-cle" data-info-cle data-anime>${c.site.contact.telephone} · ${c.site.contact.adresse}</p>
  </div>
</section>
`;
