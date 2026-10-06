# Portfolio Professionnel avec Panel Admin

Un portfolio moderne et responsive avec un **panel d'administration complet** pour gérer dynamiquement vos projets, certifications, compétences et expériences. Prêt pour le déploiement sur Vercel !

## 🌟 Nouveautés

- ✅ **Panel Admin Complet** - Gérez tout votre contenu sans toucher au code
- ✅ **API REST** - Backend Express.js avec endpoints pour toutes les données
- ✅ **Déploiement Vercel** - Configuration prête pour Vercel
- ✅ **Gestion Dynamique** - Ajoutez/modifiez/supprimez projets et certifications
- ✅ **Interface Intuitive** - Admin panel moderne et facile à utiliser

## ✨ Fonctionnalités

- **Design Moderne** : Interface élégante avec animations fluides
- **Responsive** : Parfaitement adapté à tous les écrans (mobile, tablette, desktop)
- **Sections Complètes** :
  - 🏠 Page d'accueil avec effet de frappe
  - 👨‍💻 Section À propos avec statistiques
  - 💼 Compétences avec barres de progression animées
  - 🚀 Portfolio de projets avec filtres
  - 📝 Expérience professionnelle et formation (timeline)
  - 📧 Formulaire de contact
- **Animations** : Effets de scroll reveal et transitions élégantes
- **Performance** : Code optimisé et léger
- **Accessibilité** : Conforme aux standards WCAG

## 🛠️ Technologies Utilisées

### Frontend
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript Vanilla (ES6+)
- Font Awesome pour les icônes

### Backend
- Node.js
- Express.js
- REST API
- CORS

## 🚀 Installation et Lancement Local

### Installation

```bash
# Cloner le repository
git clone https://github.com/kmbamba/portfolio.git
cd portfolio

# Installer les dépendances
npm install

# Créer le fichier .env (optionnel)
cp .env.example .env
```

### Lancement en Local

```bash
# Démarrer le serveur de développement
npm run dev

# Le portfolio sera accessible sur :
# http://localhost:3000

# Le panel admin sur :
# http://localhost:3000/admin
```

### Structure du Projet

```
portfolio/
├── public/               # Fichiers statiques
│   ├── index.html       # Page principale du portfolio
│   ├── admin.html       # Panel d'administration
│   ├── styles.css       # Styles CSS
│   ├── script.js        # Scripts du portfolio
│   ├── app.js           # Chargement dynamique des données
│   └── admin.js         # Scripts du panel admin
├── server.js            # Serveur Express & API REST
├── package.json         # Dépendances du projet
├── vercel.json          # Configuration Vercel
├── .env.example         # Exemple de variables d'environnement
├── DEPLOYMENT.md        # Guide de déploiement complet
└── README.md            # Ce fichier
```

## 📝 Gestion du Contenu

### Via le Panel Admin (Recommandé)

1. Accéder à `/admin` sur votre site
2. Gérer tous vos contenus via l'interface :
   - ✅ **Projets** : Ajouter, modifier, supprimer
   - ✅ **Certifications** : Gérer vos certifications
   - ✅ **Compétences** : Ajuster les niveaux
   - ✅ **Expérience** : Ajouter des expériences professionnelles
   - ✅ **Profil** : Mettre à jour vos informations personnelles

### Fonctionnalités du Panel Admin

#### Gestion des Projets
- Titre, description, catégorie
- Upload d'images
- Tags personnalisables
- Liens GitHub et démo
- Marquer comme projet vedette

#### Gestion des Certifications
- Nom et organisation
- Date d'obtention
- ID de certification
- Lien de vérification
- Image de la certification

#### Gestion des Compétences
- Catégories personnalisables
- Niveaux ajustables (0-100%)
- Icons Font Awesome

#### Gestion de l'Expérience
- Type (Travail, Formation, Certification)
- Titre et entreprise
- Période
- Description et réalisations

#### Gestion du Profil
- Nom et titre professionnel
- Biographie
- Informations de contact
- Liens sociaux

### Personnalisation Manuelle

Si vous préférez modifier directement le code, vous pouvez éditer :
- **Données initiales** : `server.js` (lignes 20-150)
- **Styles** : `public/styles.css`
- **Structure HTML** : `public/index.html`

### Couleurs

Modifiez les variables CSS dans `styles.css` (lignes 2-12) :

```css
:root {
    --primary-color: #4A90E2;    /* Couleur principale */
    --secondary-color: #50C878;   /* Couleur secondaire */
    --accent-color: #FF6B6B;      /* Couleur d'accent */
    /* ... */
}
```

### Images

Pour ajouter vos propres images :

1. Créez un dossier `assets/images/`
2. Ajoutez vos photos de profil et captures d'écran de projets
3. Remplacez les placeholders dans `index.html` :
   - Images de projets : lignes 200, 220, 240, etc.
   - Photo de profil : ligne 55 (hero) et ligne 75 (about)

## 💾 Persistance des Données

### Options Disponibles

Le portfolio supporte 3 méthodes de stockage :

#### 1. **Mémoire (Par défaut)** ⚡
- Données stockées en RAM
- ⚠️ Perdues au redémarrage
- Parfait pour le développement
- Configuration : `DB_TYPE=memory` dans `.env`

#### 2. **Fichier JSON** 📄
- Données sauvegardées dans `data.json`
- Persistance locale
- Idéal pour petits projets
- Configuration : `DB_TYPE=json` dans `.env`

#### 3. **MongoDB** 🍃
- Base de données complète
- Parfait pour la production
- Configuration :
  ```env
  DB_TYPE=mongodb
  DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
  ```

### Configurer MongoDB (Recommandé pour Production)

1. **Créer un compte MongoDB Atlas** (gratuit)
   - Aller sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Créer un cluster gratuit

2. **Obtenir la connection string**
   - Cliquer sur "Connect"
   - Choisir "Connect your application"
   - Copier la connection string

3. **Ajouter dans `.env`** :
   ```env
   DB_TYPE=mongodb
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

4. **Ajouter dans Vercel** :
   - Settings > Environment Variables
   - Ajouter `DB_TYPE` et `DATABASE_URL`

5. **Installer le driver** :
   ```bash
   npm install mongodb
   ```

## 📧 Configuration du Formulaire de Contact

Le formulaire envoie les données à l'API `/api/contact`. Pour recevoir les emails :

### Option A : Intégrer un Service Email

Modifier `server.js` pour utiliser nodemailer :

```bash
npm install nodemailer
```

Ajouter dans `.env` :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application
```

### Option B : Services Tiers (Plus Simple)

- **[EmailJS](https://www.emailjs.com/)** - Gratuit, facile
- **[SendGrid](https://sendgrid.com/)** - API puissante
- **[Resend](https://resend.com/)** - Moderne et simple

## 🌐 Déploiement sur Vercel

### Déploiement Rapide

1. **Pusher sur GitHub** :
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Déployer sur Vercel** :
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "New Project"
   - Importer votre repository GitHub
   - Cliquer sur "Deploy"

3. **Accéder à votre site** :
   - Portfolio : `https://votre-projet.vercel.app`
   - Admin : `https://votre-projet.vercel.app/admin`

📖 **Guide Complet** : Voir [DEPLOYMENT.md](DEPLOYMENT.md) pour les instructions détaillées

### Autres Options de Déploiement

- **Netlify** : Compatible mais nécessite une configuration supplémentaire pour l'API
- **Railway** : Parfait pour Node.js avec base de données
- **Render** : Alternative gratuite à Heroku

## 📱 Responsive Design

Le portfolio s'adapte automatiquement aux résolutions suivantes :
- 📱 Mobile : < 576px
- 📱 Tablette : 576px - 968px
- 💻 Desktop : > 968px

## ⚡ Optimisation SEO

Pour améliorer le référencement :

1. Modifiez les meta tags dans `<head>` :
```html
<meta name="description" content="Votre description">
<meta name="keywords" content="vos, mots, clés">
```

2. Ajoutez un fichier `robots.txt` :
```
User-agent: *
Allow: /
Sitemap: https://votre-site.com/sitemap.xml
```

3. Créez un `sitemap.xml` pour indexer vos pages

## 🎨 Fonctionnalités Bonus (À Ajouter)

- Mode sombre (code disponible commenté dans `script.js`)
- Blog intégré
- Multilingue (FR/EN)
- Animations avancées avec GSAP
- Particules en arrière-plan
- Effet de curseur personnalisé

## 📚 Documentation Complète

- **[API.md](API.md)** - Documentation complète de l'API REST
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guide détaillé de déploiement sur Vercel
- **README.md** - Ce fichier (vue d'ensemble du projet)

## 🔗 Liens Utiles

- [Express.js Documentation](https://expressjs.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Font Awesome Icons](https://fontawesome.com/icons)

## 📝 Scripts NPM

```bash
npm run dev      # Lancer le serveur en développement
npm run build    # Build pour la production
npm start        # Lancer le serveur en production
```

## 🌟 Fonctionnalités Avancées à Ajouter

- [ ] Authentification JWT pour le panel admin
- [ ] Upload d'images (Cloudinary, AWS S3)
- [ ] Blog intégré
- [ ] Mode sombre
- [ ] Multilingue (i18n)
- [ ] Analytics intégré
- [ ] Export PDF du CV
- [ ] Recherche de projets
- [ ] Filtres avancés
- [ ] Comments sur les projets

## 🤝 Contribution

Les suggestions et améliorations sont les bienvenues ! N'hésitez pas à créer une issue ou une pull request.

## 📞 Support

Si vous avez des questions, contactez-moi via :
- GitHub : [@kmbamba](https://github.com/kmbamba)
- Email : votre.email@example.com

---

**Bon courage pour votre recherche d'emploi ! 🚀**

*Développé avec ❤️ pour impressionner les recruteurs*
