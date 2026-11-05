# Ce qui a changé

Chaque version ajoute sa partie en tête de ce fichier, construite en comparant l'archive précédente et la nouvelle, jamais de mémoire.

## v2 — plus vivante (pack signature)

Construit en comparant l'archive v1 et la v2, fichier par fichier.

**Nouveaux effets**
- **Accueil, ouverture** : les deux profils sont devenus deux battants. À l'arrivée, ils se referment sur la coupe ; au défilement, ils s'ouvrent en 3D comme une porte sur la photo. La section est épinglée sur ordinateur ; sur téléphone, l'ouverture se fait au passage.
- **Accueil, « Ce qui peut amener à consulter »** : les mots arrivent épars et de travers, puis se rangent à l'entrée dans l'écran (effet « ordre »). « (re) » est entouré d'un trait à la main.
- **Gestalt, ouverture** : l'encre du fond tourbillonne sous le pointeur et ondule au défilement, en WebGL (effet « encre »).
- **Sophrologie, ouverture** : la lumière de la page suit la respiration du cercle, la photo respire, et des ronds naissent sur l'eau à chaque expiration.
- **Contact** : le numéro s'écrit chiffre après chiffre, avec une plume qui avance.
- **Fil d'encre** : le module fil conducteur relie les sections et se termine sur un bouton de rendez-vous, avec une boucle. Il est présent sur l'accueil, Accompagnements, Gestalt et sophrologie, et remplace les petits traits des fiches Accompagnements.
- **Transitions entre pages** : le voile monte avec un bord d'encre irrégulier et des gouttes.
- **Curseur goutte**, à la souris seulement : une traînée d'encre légère qui s'efface, absente des champs, du menu et des fonds sombres.

**Images**
- Trois illustrations régénérées : herbes sous la brise (carte sophrologie de l'accueil), deux tiges entrelacées (planche « Relationnelle »), banc de jardin (« Des outils pour le quotidien »).
- Textes alternatifs mis à jour, anciennes sources retirées.

**Technique**
- Version des fichiers ?v=2.
- Effets « ordre » et « encre » ajoutés à la liste de l'audit.
- Le module manifeste mot à mot n'est plus utilisé sur l'accueil ; ses styles servent toujours à la mise en page.

## v1 — la base

**Direction « Figure et fond »**
- Papier ivoire, encre vert profond, terre cuite douce ; titres Fraunces, texte Figtree, hébergés avec le site.
- Logo proposé : un vase de Rubin (deux profils face à face). Il sert aussi d'icône, d'image du voile et de pied de page.

**Pages**
- Accueil, Accompagnements, La Gestalt-thérapie, La sophrologie, Contact et rendez-vous, 404.
- Les pages Couples, Enfant, Adolescent, Familles et Groupe du site actuel sont regroupées dans Accompagnements, une fiche chacune, avec un lien direct.
- Chaque page a une ouverture différente :
  - accueil : deux profils et une coupe ;
  - Accompagnements : très grand titre et sommaire en pastilles ;
  - Gestalt : fond sombre et mot qui se rassemble ;
  - sophrologie : cercle de respiration ;
  - contact : numéro en très grand.

**Mouvement**
- Intro sur chaque arrivée : des gouttes d'encre rejoignent deux profils, la coupe entre eux se colore, puis le panneau s'efface (moins de 3 s, passable).
- Neuf effets propres :
  - figure-fond, et forme (la forme d'encre WebGL qui mue selon les publics, dans une section épinglée) ;
  - gouttes et cercle (Accompagnements) ;
  - gestalt-lettres et vase de Rubin (Gestalt) ;
  - respiration (sophrologie) ;
  - numéro qui se trace, et trajet RER vers cabinet (contact).
- Modules de la bibliothèque : manifeste mot à mot, planches empilées, formulaire par étapes.
- Effets du socle : lignes, cascade, rideau, parallaxe, zoom, trace, onde.

**Fonctionnalités**
- Six fiches d'accompagnement avec le cadre et le tarif au recto, et un bouton qui préremplit la demande (`/contact?public=couples#demande`).
- Demande de rendez-vous simulée en quatre étapes, avec mention des données.
- Plan schématique de la gare au cabinet, tableau des tarifs et FAQ pratique.

**Images**
- Portrait réel d'Alexandra Grandry.
- 31 illustrations générées, toutes marquées « Illustration générée ».
- Images de partage 1200 × 630 pour chaque page.

**Mise en ligne**
- noindex, en-têtes de sécurité et `.vercelignore`.
- Fiche de ce qu'il reste à fournir dans le README.
