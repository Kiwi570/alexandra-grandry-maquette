# Maquette : Alexandra Grandry, Gestalt-thérapeute et sophrologue à Chatou

Maquette v1 du site d'Alexandra Grandry (site actuel : alexandragrandry.com, Wix).
Adresse de la maquette : https://alexandra-grandry-maquette.vercel.app (non indexée par Google).

## Direction artistique : « Figure et fond »

Tirée de ses propres mots : la Gestalt, c'est « donner forme ». Papier ivoire, encre vert profond, terre cuite douce.
Titres en Fraunces (doux, italique pour les mots clés), texte en Figtree. Polices hébergées avec le site (licence OFL, fichiers dans `assets/fonts/`).

Le logo est une **proposition** : un vase de Rubin (deux profils face à face, la coupe entre eux), dessiné en code. Le site actuel n'a pas de logo.

## Pages

| Page | Ouverture | Effet propre |
|---|---|---|
| Accueil | Texte à gauche, deux profils d'encre (battants) et la coupe qui laisse voir la photo | `figure-fond` (portes en 3D épinglées), `ordre`, `forme` (signature WebGL, « Pour qui » épinglé) |
| Accompagnements | Très grand titre, sommaire en pastilles, bandeau de galets | `gouttes`, `cercle` (fiche Groupe) |
| La Gestalt-thérapie | Fond encre sombre, le mot « Gestalt » qui se rassemble | `gestalt-lettres`, `encre` (WebGL au pointeur), `vase` (vase de Rubin) |
| La sophrologie | Image à gauche avec le cercle de respiration | `respiration` (lumière et ronds sur l'eau) |
| Contact et rendez-vous | Numéro de téléphone en très grand, bandeau panoramique | `numero`, `chemin-rer` (plan schématique) |
| 404 | « Cette page n'a pas encore pris forme » | |

Les 9 pages du site actuel sont toutes reprises : Couples, Enfant, Adolescent, Familles et Groupe sont regroupées dans **Accompagnements** (une fiche chacune, avec lien direct `/accompagnements#couples`, etc.).

Sur tout le site : fil d'encre (module fil conducteur), voile de transition à bord d'encre, curseur goutte à la souris.

Modules de la bibliothèque réutilisés : fil conducteur, planches empilées (existentielle, humaniste, relationnelle), formulaire par étapes (demande de rendez-vous). Effets du socle : lignes, cascade, rideau, parallaxe, zoom, trace, onde, magnétique, incline.

## Fiche récapitulative : ce qu'Alexandra Grandry doit fournir

| Information | État |
|---|---|
| Mentions légales : nom, statut, adresse professionnelle, SIRET, e-mail, téléphone | à compléter |
| Hébergeur (à reprendre dans les mentions légales) : Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis (vérifié sur vercel.com/legal/privacy-notice le 05/11/2026) | prêt |
| Politique de confidentialité (formulaire de contact, RGPD) | à compléter |
| Assurance responsabilité civile professionnelle | à compléter |
| Tarif des séances pour enfants, pour adolescents, et de sophrologie | à compléter |
| Rythme et durée des séances pour adolescents | à compléter |
| Dates des prochains groupes (un lundi par mois) | à compléter |
| Horaires du cabinet (aucun statut « ouvert maintenant » n'est affiché sans eux) | à compléter |
| Logo : valider le monogramme proposé ou fournir le sien | à valider |
| Titre : la maquette dit « Gestalt-thérapeute », jamais « psychothérapeute » (titre réglementé, décret 2010-534) | à confirmer |
| Crédits des illustrations générées (voir ci-dessous) | à reporter |

## Points relevés sur le site actuel

- Le titre de chaque page affiche « My Site », et les adresses sont du type « copie-de-enfant ».
- « Registre National des Compétences Professionelles » : l'intitulé officiel est *Répertoire national des certifications professionnelles* (corrigé en « certifiée RNCP »).
- L'EAGT est nommée de deux façons (« of » et « for ») : la maquette retient *European Association for Gestalt Therapy*.
- Une photo de produit Playmobil (page Familles) a été écartée (droits de marque), comme les photos de banque d'images Wix.
- Menu « More » vide ; pas de mentions légales.

## Images

- Photo réelle : le portrait d'Alexandra Grandry (site actuel).
- Toutes les autres images sont des **illustrations générées avec Grok** : elles portent la mention « Illustration générée », y compris sur les images de partage. **Garder cette mention sur le site final.**
- Grok a rendu les images en 1168 px : pour les grands écrans, régénérer en 2K les images d'ouverture si possible.
- Portrait : demander à Alexandra Grandry une version en haute définition, à la lumière plus neutre (le fichier actuel tire vers le rose).
- v2 : trois illustrations régénérées pour varier les sujets (herbes sous la brise, tiges entrelacées, banc de jardin).

## À retirer à la mise en ligne définitive

- `noindex` : balise robots dans `source/gabarits/commun.mjs` et en-tête `X-Robots-Tag` dans `vercel.json`.
- Le formulaire de demande simulé (ou le brancher sur un vrai service), les mentions « Démonstration » et « à compléter ».
- Garder : la mention « Illustration générée ».

## Travailler sur la maquette

```
node outils/generer.mjs                      pages HTML à partir de donnees/ et source/
node ../bibliotheque-maquettes/images/partage.mjs   images de partage
node _audit/audit.mjs                        audit standard avant chaque livraison
```

Ne jamais modifier les fichiers `.html` à la main : ils sont réécrits par `generer.mjs`. Les textes sont dans `donnees/textes/fr.json`, les accompagnements dans `donnees/publics.json`.
