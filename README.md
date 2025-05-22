# Kamyko Website

Site web pour Kamyko, une agence spécialisée dans le développement de solutions e-commerce sur mesure.

## Structure du projet

```
├── index.html          # Page d'accueil du site
├── styles/             # Dossier pour les fichiers CSS
│   └── main.css        # Styles principaux avec variables CSS
├── images/             # Dossier pour les illustrations et images
│   ├── logo.svg        # Logo de Kamyko
│   ├── hero-illustration.svg
│   ├── dev-illustration.svg
│   ├── maintenance-illustration.svg
│   ├── audit-illustration.svg
│   └── conseil-illustration.svg
└── js/                 # Dossier pour les scripts JavaScript
    ├── main.js         # Point d'entrée principal
    ├── theme-manager.js # Gestion du thème clair/sombre
    ├── mobile-menu.js  # Gestion du menu mobile
    └── utils.js        # Fonctions utilitaires
```

## Caractéristiques

- Design responsive adapté à tous les appareils (desktop, tablette, mobile)
- Utilisation de variables CSS pour faciliter la personnalisation des couleurs et styles
- Animations et transitions pour améliorer l'expérience utilisateur
- Illustrations SVG vectorielles pour un rendu optimal sur tous les écrans
- Menu mobile avec animation pour la navigation sur petits écrans
- Mode sombre/clair avec préférence système et persistance via localStorage
- Architecture JavaScript modulaire pour une meilleure maintenance
- Conformité aux bonnes pratiques Green IT

## Architecture JavaScript

Le code JavaScript est organisé selon une architecture modulaire pour améliorer la lisibilité, la testabilité et la maintenance :

- **main.js** : Point d'entrée qui initialise tous les modules
- **theme-manager.js** : Gestion du thème clair/sombre
- **mobile-menu.js** : Gestion du menu mobile et des interactions
- **utils.js** : Fonctions utilitaires réutilisables

Chaque module suit le patron de conception Singleton et expose une instance unique via `export default`.
L'utilisation des modules ES6 permet d'éviter la pollution de l'espace global et facilite la gestion des dépendances.

## Mode sombre/clair

Le site dispose d'un système de thème clair/sombre qui respecte les étapes suivantes :
1. Détection automatique des préférences système de l'utilisateur
2. Possibilité de basculer manuellement entre les deux modes via le bouton dans la navigation
3. Sauvegarde du choix de l'utilisateur dans le localStorage pour le maintenir entre les visites

## Pratiques Green IT

Ce projet applique plusieurs principes d'éco-conception web :

- **Optimisation des images** : Utilisation de SVG légers pour toutes les illustrations
- **Spécification des dimensions des images** : Ajout des attributs width et height pour éviter les décalages de mise en page
- **Lazy loading** : Chargement différé des images qui ne sont pas immédiatement visibles à l'écran
- **Chargement optimisé des polices** : Préchargement et gestion du fallback pour éviter le FOIT (Flash Of Invisible Text)
- **Architecture modulaire** : Chargement uniquement des scripts nécessaires
- **Utilisation de variables CSS** : Facilite la maintenance et réduit la taille du code CSS
- **Design adaptatif** : Adaptation à tous les appareils pour une expérience optimale
- **Mode sombre** : Réduction de la consommation d'énergie sur les écrans OLED/AMOLED
- **Optimisation des événements** : Utilisation de debounce pour les événements fréquents comme le redimensionnement

## Personnalisation

Le design utilise des variables CSS pour faciliter la personnalisation. Vous pouvez modifier les couleurs principales du site en modifiant les valeurs dans la section `:root` du fichier `styles/main.css`.

Pour personnaliser le thème sombre, modifiez les variables dans le sélecteur `[data-theme="dark"]`.

## Développement local

Pour travailler sur ce projet localement, clonez simplement ce dépôt et ouvrez le fichier `index.html` dans votre navigateur.

```bash
git clone [url-du-depot]
cd Kamyko-website
```

## Credits

- Design et développement : [Votre nom]
- Illustrations : Créées spécifiquement pour Kamyko