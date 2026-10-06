# Portfolio Khadim Mbaye - Cloud & DevOps Engineer Junior

Portfolio professionnel moderne avec panel d'administration complet et thème navy Cloud/DevOps.

🌐 **Site en ligne** : [https://khadim-mbaye-portfolio-egqb.vercel.app/](https://khadim-mbaye-portfolio-egqb.vercel.app/)

## 👨‍💻 À propos

**Khadim Mbaye** - Cloud & DevOps Engineer Junior  
📍 Dakar, Sénégal 🇸🇳  
📧 mbaye.khadim.dev@gmail.com  
☁️ AWS Certified Cloud Practitioner (CLF-C02)  

## 🚀 Technologies

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla)
- **Backend** : Node.js, Express.js
- **Database** : MongoDB Atlas
- **Déploiement** : Vercel
- **Design** : Navy theme professionnel Cloud/DevOps

## ✨ Fonctionnalités

- ✅ Portfolio responsive avec design navy moderne
- ✅ 6 projets Cloud/DevOps avec filtres (DevOps, Cloud/IaC, Web)
- ✅ 2 certifications AWS
- ✅ 4 catégories de compétences techniques
- ✅ 5 expériences professionnelles
- ✅ Formulaire de contact
- ✅ CV téléchargeable
- ✅ Panel d'administration complet (CRUD)
- ✅ Upload d'images
- ✅ Authentification admin
- ✅ Base de données MongoDB persistante
- ✅ SEO optimisé (Open Graph, Twitter Cards)

## 🔐 Panel Admin

URL : `/admin`  
Username : `admin`  
Password : (défini dans `ADMIN_PASSWORD` ou `admin123` par défaut)

Le panel admin permet de :
- Gérer les projets (ajouter/modifier/supprimer)
- Gérer les certifications
- Gérer les expériences
- Modifier les compétences
- Modifier le profil

## 🛠️ Installation locale

```bash
# Cloner le repo
git clone https://github.com/kmbamba/Khadim_Mbaye_portfolio.git
cd Khadim_Mbaye_portfolio

# Installer les dépendances
npm install

# Créer un fichier .env
cp .env.example .env

# Configurer MongoDB Atlas (optionnel)
# Éditer .env et ajouter votre DATABASE_URL

# Initialiser la base de données (si MongoDB)
node init-database.js

# Démarrer le serveur
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 📝 Variables d'environnement

```env
PORT=3000
NODE_ENV=development
DB_TYPE=mongodb  # ou json pour fichier local
DATABASE_URL=mongodb+srv://...
ADMIN_PASSWORD=votre_mot_de_passe
```

## 🌐 Déploiement sur Vercel

1. Connectez votre repo GitHub à Vercel
2. Configurez les variables d'environnement :
   - `DB_TYPE=mongodb`
   - `DATABASE_URL=mongodb+srv://...`
   - `NODE_ENV=production`
   - `ADMIN_PASSWORD=votre_mot_de_passe_securise`
3. Déployez automatiquement à chaque push

### Configuration d'un domaine personnalisé sur Vercel

1. Allez dans votre projet Vercel > **Settings** > **Domains**
2. Ajoutez votre domaine (ex: `khadim-mbaye.dev`)
3. Configurez les DNS chez votre fournisseur de domaine :
   - Type : `A` → Valeur : `76.76.21.21`
   - Type : `CNAME` → Nom : `www` → Valeur : `cname.vercel-dns.com`
4. Attendez la propagation DNS (~24h max)

## 📊 SEO & Analytics

- ✅ Meta tags Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Balises SEO optimisées
- 🔄 Google Analytics (décommentez le code dans `index.html` et ajoutez votre ID)

### Configurer Google Analytics

1. Créez un compte sur [analytics.google.com](https://analytics.google.com)
2. Créez une propriété et obtenez votre ID (ex: `G-XXXXXXXXXX`)
3. Dans `public/index.html`, décommentez le code Google Analytics
4. Remplacez `G-XXXXXXXXXX` par votre ID
5. Redéployez sur Vercel

## 🔒 Sécurité

- ✅ Authentification Basic Auth pour le panel admin
- ✅ Variables d'environnement pour les secrets
- ✅ Validation des uploads d'images (5MB max, formats: jpg, png, gif, webp)
- ✅ CORS configuré
- ✅ Protection contre les injections

## 📄 License

MIT License - Khadim Mbaye © 2026

## 📞 Contact

- GitHub : [@kmbamba](https://github.com/kmbamba)
- LinkedIn : [Khadim Mbaye](https://linkedin.com/in/khadim-mbaye-88ab00329)
- Email : mbaye.khadim.dev@gmail.com

---

**🌟 Si vous aimez ce projet, n'hésitez pas à mettre une étoile !**
