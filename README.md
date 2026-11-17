# English Adventure

Une petite application ludique pour découvrir l'anglais sur une tablette Android.

## Fonctionnalités

- Leçons illustrées sur les couleurs et les animaux.
- Prononciation des mots en anglais grâce à la voix du navigateur.
- Deux jeux de 10 questions : quiz de vocabulaire et reconnaissance à l'écoute.
- Diamants, récompenses et suivi de progression.
- Sauvegarde locale sur la tablette.
- Installation comme application (PWA) et mise en cache pour une utilisation hors connexion après le premier chargement.
- Espace parents avec code d'accès et réglage du son.

## Déploiement

Le site est statique : aucun serveur ni commande de compilation n'est nécessaire.
Pour Netlify, connecter ce dépôt GitHub et choisir le dossier de publication `.` (racine du dépôt), sans commande de build.

Chaque nouveau commit sur la branche principale peut déclencher un nouveau déploiement Netlify si le dépôt y est connecté.

## Installation sur Android

1. Ouvrir l'adresse du site Netlify dans Chrome sur la tablette.
2. Utiliser le menu de Chrome puis « Installer l'application » ou « Ajouter à l'écran d'accueil ».
3. Lancer English Adventure depuis l'icône créée.

## Espace parents

Le code initial est **2468**. Le modifier depuis l'espace parents après la première ouverture.
Ce code est une barrière simple contre les ouvertures accidentelles, pas une protection de sécurité forte.

## Données et confidentialité

La progression reste dans le stockage local du navigateur de la tablette. Aucun compte, publicité, achat intégré, traceur ou lien externe n'est utilisé par l'application.
