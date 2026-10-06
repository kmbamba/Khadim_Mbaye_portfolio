# 🚀 Guide de Déploiement sur Vercel

Ce guide vous explique comment déployer votre portfolio sur Vercel avec toutes les fonctionnalités.

## 📋 Prérequis

- Un compte GitHub
- Un compte Vercel (gratuit)
- Node.js installé localement (pour tester)

## 🛠️ Étape 1 : Préparer le Projet

### 1.1 Créer un Repository GitHub

```bash
# Initialiser git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: Portfolio professionnel avec admin"

# Créer un nouveau repository sur GitHub puis :
git remote add origin https://github.com/kmbamba/portfolio.git
git branch -M main
git push -u origin main
```

### 1.2 Tester Localement

```bash
# Installer les dépendances
npm install

# Lancer le serveur en mode développement
npm run dev

# Ouvrir dans le navigateur :
# - Portfolio : http://localhost:3000
# - Admin : http://localhost:3000/admin
```

## 🌐 Étape 2 : Déployer sur Vercel

### Option A : Via l'Interface Vercel (Recommandé)

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Cliquer sur "New Project"**
3. **Importer votre repository GitHub**
   - Autoriser Vercel à accéder à votre GitHub
   - Sélectionner le repository `portfolio`
4. **Configuration du projet** :
   - Framework Preset : `Other`
   - Root Directory : `./`
   - Build Command : `npm run build` (ou laisser vide)
   - Output Directory : `public`
5. **Cliquer sur "Deploy"**

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour le déploiement en production
vercel --prod
```

## 🔧 Étape 3 : Configuration des Variables d'Environnement

1. Aller dans **Settings > Environment Variables** de votre projet Vercel
2. Ajouter les variables suivantes (optionnel) :

```
NODE_ENV=production
ADMIN_PASSWORD=votre-mot-de-passe-securise
```

## 📱 Étape 4 : Accéder à votre Portfolio

Une fois déployé, vous aurez :

- **Portfolio public** : `https://votre-projet.vercel.app`
- **Panel Admin** : `https://votre-projet.vercel.app/admin`

## ⚙️ Configuration Personnalisée

### Domaine Personnalisé

1. Aller dans **Settings > Domains**
2. Ajouter votre domaine personnalisé
3. Suivre les instructions pour configurer les DNS

### Mise à Jour Automatique

Vercel redéploie automatiquement à chaque push sur GitHub !

```bash
# Faire des modifications
git add .
git commit -m "Mise à jour du portfolio"
git push

# Vercel redéploie automatiquement ! ✨
```

## 🎨 Utilisation du Panel Admin

### Accéder au Panel

1. Aller sur `https://votre-site.vercel.app/admin`
2. Gérer vos contenus en temps réel

### Fonctionnalités Disponibles

#### 📊 Tableau de Bord
- Vue d'ensemble des statistiques
- Nombre de projets, certifications, compétences

#### 📁 Gestion des Projets
- ✅ Ajouter un nouveau projet
- ✅ Modifier un projet existant
- ✅ Supprimer un projet
- ✅ Marquer comme projet vedette
- ✅ Catégoriser (Web, Mobile, Backend)
- ✅ Ajouter des tags
- ✅ Liens GitHub et démo

#### 🎓 Gestion des Certifications
- ✅ Ajouter une certification
- ✅ Modifier les détails
- ✅ Supprimer une certification
- ✅ Ajouter des liens de vérification

#### 💼 Gestion de l'Expérience
- ✅ Ajouter une expérience professionnelle
- ✅ Modifier les informations
- ✅ Supprimer une expérience
- ✅ Ajouter des réalisations

#### 🛠️ Gestion des Compétences
- ✅ Modifier les niveaux de compétences
- ✅ Mise à jour en temps réel

#### 👤 Gestion du Profil
- ✅ Modifier le nom et titre
- ✅ Mettre à jour la bio
- ✅ Changer les informations de contact
- ✅ Modifier les liens sociaux

## 🔒 Sécurité du Panel Admin

### Protection Basique (Actuellement)

Le panel admin est accessible publiquement. Pour le protéger :

### Option 1 : Ajouter une Authentification (Recommandé)

Installer un middleware d'authentification :

```bash
npm install bcryptjs jsonwebtoken
```

Créer un système de login simple dans `server.js`

### Option 2 : Utiliser Vercel Password Protection

1. Aller dans **Settings > Deployment Protection**
2. Activer "Password Protection"
3. Définir un mot de passe

### Option 3 : Restreindre par IP

Dans `vercel.json`, ajouter :

```json
{
  "routes": [
    {
      "src": "/admin",
      "headers": {
        "x-vercel-ip-country": "FR"
      }
    }
  ]
}
```

## 💾 Persistance des Données

⚠️ **Important** : Actuellement, les données sont stockées en mémoire. Elles seront perdues lors d'un redéploiement.

### Solutions pour la Persistance

#### Option 1 : MongoDB Atlas (Gratuit)

```bash
npm install mongodb
```

1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un cluster gratuit
3. Obtenir la connection string
4. Ajouter dans les variables d'environnement Vercel :
```
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/portfolio
```

#### Option 2 : Vercel KV (Redis)

```bash
npm install @vercel/kv
```

1. Activer Vercel KV dans votre projet
2. Utiliser pour stocker les données

#### Option 3 : PostgreSQL (Supabase/Neon)

```bash
npm install pg
```

1. Créer une base de données sur [Supabase](https://supabase.com) ou [Neon](https://neon.tech)
2. Ajouter la connection string dans Vercel

#### Option 4 : Fichier JSON (Simple mais limité)

Créer un fichier `data.json` et le commiter dans Git. Attention : nécessite un redéploiement à chaque modification.

## 📊 Analytique et SEO

### Google Analytics

Ajouter dans `public/index.html` avant `</head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Meta Tags SEO

Modifier dans `public/index.html` :

```html
<meta name="description" content="Portfolio de [Votre Nom] - Développeur Full Stack">
<meta name="keywords" content="développeur, full stack, portfolio, react, node.js">
<meta property="og:title" content="[Votre Nom] - Portfolio">
<meta property="og:description" content="Développeur Full Stack passionné">
<meta property="og:image" content="https://votre-site.vercel.app/og-image.jpg">
<meta property="og:url" content="https://votre-site.vercel.app">
<meta name="twitter:card" content="summary_large_image">
```

## 🎯 Performance et Optimisation

### Image Optimization

Utiliser des services comme :
- [Cloudinary](https://cloudinary.com) (gratuit)
- [ImageKit](https://imagekit.io) (gratuit)
- [Vercel Image Optimization](https://vercel.com/docs/concepts/image-optimization)

### CDN et Cache

Vercel gère automatiquement :
- ✅ CDN global
- ✅ Cache optimisé
- ✅ Compression Gzip/Brotli
- ✅ HTTP/2

## 🐛 Dépannage

### Erreur 404 sur les Routes API

Vérifier `vercel.json` :
```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### Les Données ne se Chargent Pas

1. Vérifier les logs : `vercel logs`
2. Vérifier l'URL de l'API dans le code
3. Vérifier les CORS dans `server.js`

### Erreur de Build

```bash
# Tester localement
npm run build
npm start

# Vérifier les logs Vercel
vercel logs --follow
```

## 📚 Resources Utiles

- [Documentation Vercel](https://vercel.com/docs)
- [Guide Node.js sur Vercel](https://vercel.com/docs/runtimes#official-runtimes/node-js)
- [Variables d'Environnement](https://vercel.com/docs/concepts/projects/environment-variables)
- [Domaines Personnalisés](https://vercel.com/docs/concepts/projects/domains)

## 🎉 Félicitations !

Votre portfolio est maintenant en ligne ! 🚀

- ✅ Site web professionnel
- ✅ Panel admin pour gérer le contenu
- ✅ Déploiement automatique
- ✅ Certificat SSL gratuit
- ✅ Performance optimale

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifier les logs Vercel
2. Consulter la documentation
3. Ouvrir une issue sur GitHub
