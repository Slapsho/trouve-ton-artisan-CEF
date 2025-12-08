# 🛠️ Trouve ton Artisan

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)](https://getbootstrap.com/)
[![Sass](https://img.shields.io/badge/Sass-1.69-pink)](https://sass-lang.com/)

Plateforme web permettant aux particuliers de trouver et contacter facilement des artisans qualifiés de la région Auvergne-Rhône-Alpes.

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Lancement du projet](#-lancement-du-projet)
- [Structure du projet](#-structure-du-projet)
- [Utilisation](#-utilisation)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Sécurité](#-sécurité)
- [Contribution](#-contribution)
- [Licence](#-licence)
- [Contact](#-contact)

## 🎯 À propos

**Trouve ton Artisan** est une plateforme développée pour la région Auvergne-Rhône-Alpes visant à mettre en relation les particuliers avec des artisans locaux qualifiés dans différents domaines :

- 🏗️ **Bâtiment** : Menuisiers, plombiers, électriciens, maçons...
- 🔧 **Services** : Réparation, entretien, dépannage...
- ⚒️ **Fabrication** : Ébénistes, potiers, forgerons...
- 🍞 **Alimentation** : Boulangers, pâtissiers, fromagers...

### Objectifs du projet

- Faciliter la recherche d'artisans par catégorie ou mot-clé
- Permettre une prise de contact simple et rapide
- Valoriser l'artisanat local de la région Auvergne-Rhône-Alpes
- Offrir une expérience utilisateur optimale sur tous les supports

## ✨ Fonctionnalités

### Pages principales

- ✅ **Page d'accueil**
  - Présentation du fonctionnement en 4 étapes
  - Mise en avant des 3 artisans du mois
  - Design attractif et responsive

- ✅ **Pages par catégorie**
  - Liste des artisans par domaine d'activité
  - Filtrage automatique par catégorie
  - Affichage sous forme de cartes cliquables

- ✅ **Fiche artisan détaillée**
  - Informations complètes (nom, note, spécialité, localisation)
  - Section "À propos"
  - Lien vers le site web (si disponible)
  - Formulaire de contact intégré

- ✅ **Recherche globale**
  - Barre de recherche dans le header
  - Recherche par nom, spécialité ou ville
  - Affichage des résultats en temps réel

- ✅ **Page 404 personnalisée**
  - Design cohérent avec la charte graphique
  - Redirection simple vers l'accueil

### Fonctionnalités techniques

- 🎨 **Design responsive** (Mobile First)
- ⭐ **Système de notation** avec étoiles
- 📧 **Envoi d'emails** via formulaire de contact
- 🔍 **SEO optimisé** (meta tags, descriptions)
- ♿ **Accessibilité WCAG 2.1**
- 🔒 **Sécurité renforcée** (sanitization, validation, headers HTTP)
- ⚡ **Performance optimisée** avec Next.js

## 🛠️ Technologies utilisées

### Frontend

- **[Next.js 14](https://nextjs.org/)** - Framework React avec App Router
- **[React 18](https://reactjs.org/)** - Bibliothèque JavaScript
- **[Bootstrap 5.3](https://getbootstrap.com/)** - Framework CSS
- **[React Bootstrap](https://react-bootstrap.github.io/)** - Composants Bootstrap pour React
- **[Sass](https://sass-lang.com/)** - Préprocesseur CSS

### Backend

- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - API serverless
- **[Nodemailer](https://nodemailer.com/)** - Envoi d'emails
- **[Maildev](https://maildev.github.io/maildev/)** - Serveur SMTP local pour le développement

### Outils de développement

- **[Git](https://git-scm.com/)** - Gestion de version
- **[GitHub](https://github.com/)** - Hébergement du code source
- **[Visual Studio Code](https://code.visualstudio.com/)** - Éditeur de code
- **[Figma](https://www.figma.com/)** - Maquettes UI/UX

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 18.0 ou supérieure
- **npm** version 9.0 ou supérieure (ou yarn/pnpm)
- **Git** pour cloner le repository

Vérifier les versions installées :
```bash
node --version
npm --version
git --version
```

## 🚀 Installation

### 1. Cloner le repository
```bash
git clone https://github.com/votre-username/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet :
```bash
cp .env.example .env.local
```

Contenu du fichier `.env.local` :
```env
# Configuration email (Maildev en développement)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@trouve-ton-artisan.fr

# URL du site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Environnement
NODE_ENV=development
```

### 4. Ajouter les données des artisans

Le fichier `public/data/artisans.json` contient les données des artisans. 
Vous pouvez le modifier ou ajouter de nouveaux artisans selon le format suivant :
```json
{
  "id": 1,
  "name": "Nom de l'artisan",
  "specialty": "Spécialité",
  "category": "batiment|services|fabrication|alimentation",
  "location": "Ville",
  "rating": 4.5,
  "about": "Description de l'artisan",
  "email": "contact@artisan.fr",
  "website": "https://www.artisan.fr",
  "top": true
}
```

## 🎬 Lancement du projet

### Mode développement

#### Option 1 : Lancer tous les serveurs en une commande
```bash
npm run dev:full
```

Cette commande lance :
- Le serveur Next.js sur http://localhost:3000
- Le serveur Maildev sur http://localhost:1080

#### Option 2 : Lancer les serveurs séparément

**Terminal 1 - Serveur Next.js**
```bash
npm run dev
```

**Terminal 2 - Serveur Maildev**
```bash
npm run maildev
```

### Accéder à l'application

- **Site web** : http://localhost:3000
- **Interface Maildev** (emails) : http://localhost:1080

### Commandes disponibles
```bash
# Développement
npm run dev              # Lancer Next.js en mode développement
npm run maildev          # Lancer le serveur Maildev
npm run dev:full         # Lancer Next.js + Maildev

# Production
npm run build            # Créer le build de production
npm start                # Lancer le serveur en mode production

# Qualité du code
npm run lint             # Vérifier le code avec ESLint
npm run lint:fix         # Corriger automatiquement les erreurs ESLint

# Tests
npm test                 # Lancer les tests (si configurés)
```

## 📁 Structure du projet
```
trouve-ton-artisan/
├── public/                          # Fichiers statiques
│   ├── images/                      # Images (logo, favicon, etc.)
│   │   ├── logo.png
│   │   ├── favicon.ico
│   │   └── 404-image.png
│   └── data/                        # Données JSON
│       └── artisans.json            # Liste des artisans
│
├── src/                             # Code source
│   ├── app/                         # Pages Next.js (App Router)
│   │   ├── layout.js                # Layout principal
│   │   ├── page.js                  # Page d'accueil
│   │   ├── page.module.scss         # Styles page d'accueil
│   │   ├── globals.scss             # Styles globaux
│   │   ├── not-found.js             # Page 404
│   │   │
│   │   ├── api/                     # API Routes
│   │   │   └── contact/
│   │   │       └── route.js         # API de contact
│   │   │
│   │   ├── batiment/                # Page catégorie Bâtiment
│   │   │   └── page.js
│   │   ├── services/                # Page catégorie Services
│   │   │   └── page.js
│   │   ├── fabrication/             # Page catégorie Fabrication
│   │   │   └── page.js
│   │   ├── alimentation/            # Page catégorie Alimentation
│   │   │   └── page.js
│   │   │
│   │   ├── artisan/                 # Pages artisan
│   │   │   └── [id]/
│   │   │       └── page.js          # Fiche artisan dynamique
│   │   │
│   │   ├── recherche/               # Page de recherche
│   │   │   └── page.js
│   │   │
│   │   └── mentions-legales/        # Pages légales
│   │       ├── page.js
│   │       ├── donnees-personnelles/
│   │       ├── accessibilite/
│   │       └── cookies/
│   │
│   ├── components/                  # Composants React réutilisables
│   │   ├── Header.jsx               # En-tête du site
│   │   ├── Header.module.scss
│   │   ├── Footer.jsx               # Pied de page
│   │   ├── Footer.module.scss
│   │   ├── SearchBar.jsx            # Barre de recherche
│   │   ├── ArtisanCard.jsx          # Carte artisan
│   │   ├── ArtisanCard.module.scss
│   │   ├── ContactForm.jsx          # Formulaire de contact
│   │   ├── ContactForm.module.scss
│   │   ├── StarRating.jsx           # Composant d'étoiles
│   │   └── StarRating.module.scss
│   │
│   ├── services/                    # Services / Logique métier
│   │   └── artisanService.js        # Gestion des artisans
│   │
│   ├── utils/                       # Utilitaires
│   │   ├── validators.js            # Fonctions de validation
│   │   └── sanitize.js              # Nettoyage des données
│   │
│   └── styles/                      # Styles SCSS globaux
│       ├── variables.scss           # Variables (couleurs, polices)
│       └── mixins.scss              # Mixins (responsive, etc.)
│
├── .env.local                       # Variables d'environnement (non versionné)
├── .env.example                     # Exemple de configuration
├── .gitignore                       # Fichiers à ignorer par Git
├── next.config.js                   # Configuration Next.js
├── package.json                     # Dépendances et scripts
├── README.md                        # Documentation (ce fichier)
└── MAILDEV_GUIDE.md                 # Guide d'utilisation de Maildev
```

## 📖 Utilisation

### Rechercher un artisan

1. Utilisez la **barre de recherche** dans le header
2. Ou parcourez par **catégorie** via le menu
3. Cliquez sur une **carte artisan** pour voir les détails

### Contacter un artisan

1. Accédez à la **fiche de l'artisan**
2. Remplissez le **formulaire de contact** :
   - Votre nom
   - L'objet de votre demande
   - Votre message
3. Cliquez sur **"Envoyer"**
4. L'artisan recevra votre message par email
5. Une réponse vous sera apportée sous **48 heures**

### Tester l'envoi d'emails en développement

1. Assurez-vous que **Maildev est lancé** (`npm run maildev`)
2. Envoyez un message via le formulaire de contact
3. Consultez l'email reçu sur **http://localhost:1080**
4. Tous les emails sont capturés localement (aucun email réel envoyé)

## 🧪 Tests

### Validation W3C

Le code HTML et CSS a été validé avec les validateurs W3C :

- **HTML** : https://validator.w3.org/
- **CSS** : https://jigsaw.w3.org/css-validator/

Captures d'écran des validations disponibles dans le dossier de livraison.

### Tests manuels à effectuer

- [ ] Navigation entre les pages
- [ ] Recherche d'artisans
- [ ] Filtrage par catégorie
- [ ] Affichage responsive (mobile, tablette, desktop)
- [ ] Formulaire de contact
- [ ] Réception d'emails dans Maildev
- [ ] Page 404 (accéder à une URL inexistante)
- [ ] Validation des formulaires
- [ ] Accessibilité (navigation au clavier, lecteur d'écran)

### Tests de sécurité

- [ ] Injection XSS (essayer `<script>alert('test')</script>`)
- [ ] Validation des champs
- [ ] Sanitization des données
- [ ] Headers de sécurité HTTP

## 🚀 Déploiement

### Préparer le build de production
```bash
npm run build
```

### Option 1 : Déploiement sur Vercel (recommandé)

Vercel est la plateforme créée par les auteurs de Next.js, optimisée pour ce framework.
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

Ou via l'interface web :
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement à chaque push

**Variables d'environnement à configurer sur Vercel :**
```
SMTP_HOST=votre-serveur-smtp.com
SMTP_PORT=587
SMTP_USER=votre-email@example.com
SMTP_PASS=votre-mot-de-passe
SMTP_FROM=noreply@trouve-ton-artisan.fr
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

### Option 2 : Déploiement sur Netlify
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod
```

### Option 3 : Hébergement classique (VPS, serveur dédié)
```bash
# Builder le projet
npm run build

# Lancer en production
npm start
```

Utilisez PM2 pour maintenir l'application en vie :
```bash
# Installer PM2
npm install -g pm2

# Lancer l'application
pm2 start npm --name "trouve-ton-artisan" -- start

# Sauvegarder la configuration
pm2 save

# Configurer le démarrage automatique
pm2 startup
```

### Configuration du serveur SMTP en production

⚠️ **Important** : Maildev est uniquement pour le développement !

En production, utilisez un service SMTP professionnel :

**SendGrid (recommandé)**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=votre-api-key-sendgrid
```

**Mailgun**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=votre-username@mailgun.org
SMTP_PASS=votre-mot-de-passe
```

**Gmail (pas recommandé pour la production)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=mot-de-passe-application
```

## 🔒 Sécurité

### Mesures de sécurité implémentées

1. **Protection XSS (Cross-Site Scripting)**
   - Sanitization de toutes les entrées utilisateur
   - Échappement des caractères HTML spéciaux
   - Utilisation de `escapeHtml()` et `sanitizeInput()`

2. **Headers de sécurité HTTP**
   - `X-Frame-Options: SAMEORIGIN` (anti-clickjacking)
   - `X-Content-Type-Options: nosniff`
   - `X-XSS-Protection: 1; mode=block`
   - `Strict-Transport-Security` (HSTS)
   - `Content-Security-Policy`
   - `Referrer-Policy: origin-when-cross-origin`

3. **Validation des formulaires**
   - Validation côté client (UX)
   - Validation côté serveur (sécurité)
   - Vérification des types de données
   - Limites de longueur des champs

4. **Protection CSRF**
   - Utilisation de React Strict Mode
   - Validation des requêtes API

5. **Gestion sécurisée des données**
   - Variables d'environnement pour les secrets
   - Pas de données sensibles dans le code
   - Fichier `.env.local` dans `.gitignore`

6. **Sécurité des dépendances**
   - Audit régulier avec `npm audit`
   - Mise à jour des packages
   - Correction des vulnérabilités

7. **Protection des emails**
   - Pas d'exposition des adresses email
   - Validation des adresses email
   - Rate limiting (à implémenter si nécessaire)

8. **HTTPS obligatoire en production**
   - Redirection HTTP → HTTPS
   - Configuration SSL/TLS

### Bonnes pratiques

- 🔐 Ne jamais commiter les fichiers `.env*`
- 🔄 Mettre à jour régulièrement les dépendances
- 🛡️ Utiliser des mots de passe forts pour les services SMTP
- 📊 Monitorer les logs en production
- 🔍 Effectuer des audits de sécurité réguliers

## 🤝 Contribution

### Workflow Git

Ce projet utilise le **Git Flow** :

1. **Branche `main`** : Code de production stable
2. **Branche `develop`** : Code en développement
3. **Branches `feature/*`** : Nouvelles fonctionnalités
4. **Branches `bugfix/*`** : Corrections de bugs

### Comment contribuer

1. **Forker** le projet
2. Créer une **branche feature** :
```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
```
3. **Commiter** les changements :
```bash
   git commit -m "feat: ajout de la fonctionnalité X"
```
4. **Pusher** vers la branche :
```bash
   git push origin feature/ma-nouvelle-fonctionnalite
```
5. Ouvrir une **Pull Request**

### Convention de nommage des commits

Utiliser le format **Conventional Commits** :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, style
- `refactor:` Refactoring du code
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

Exemples :
```bash
feat: ajout du système de notation
fix: correction de l'affichage mobile
docs: mise à jour du README
style: formatage du code avec Prettier
```

### Standards de code

- ✅ Code indenté avec **2 espaces**
- ✅ Utiliser des **commentaires explicites**
- ✅ Nommer les variables en **camelCase**
- ✅ Nommer les composants en **PascalCase**
- ✅ Pas de `console.log()` en production
- ✅ Code validé par **ESLint**

## 📄 Licence

Ce projet est développé dans le cadre d'un devoir académique pour la région Auvergne-Rhône-Alpes.

Tous droits réservés © 2024 Région Auvergne-Rhône-Alpes

## 📞 Contact

### Développeur

- **Nom** : [Votre Nom]
- **Email** : [votre.email@example.com]
- **GitHub** : [@votre-username](https://github.com/votre-username)

### Région Auvergne-Rhône-Alpes

- **Site web** : https://www.auvergnerhonealpes.fr
- **Adresse** : 101 cours Charlemagne, CS 20033, 69269 LYON CEDEX 02
- **Téléphone** : +33 (0)4 26 73 40 00

---

## 🙏 Remerciements

- Région Auvergne-Rhône-Alpes pour ce projet enrichissant
- La communauté Next.js et React
- Tous les contributeurs open source des bibliothèques utilisées

---

<div align="center">
  <p>Fait avec ❤️ pour valoriser l'artisanat en Auvergne-Rhône-Alpes</p>
  <p>
    <a href="#-trouve-ton-artisan">⬆ Retour en haut</a>
  </p>
</div>