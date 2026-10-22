# 🚨 Incident de Sécurité - Actions Requises

## ⚠️ Que s'est-il passé ?

Des fichiers de documentation contenant des secrets (mots de passe, clés API) ont été accidentellement poussés sur GitHub. GitHub a détecté cela et vous a envoyé un email.

## ✅ Ce qui a été fait

1. ❌ Fichiers avec secrets supprimés du repo
2. ❌ Fichier `.env` nettoyé (contient maintenant des placeholders)

## 🔐 Actions URGENTES à Faire Maintenant

### 1. Régénérer le Mot de Passe MongoDB Atlas

**Pourquoi** : Le mot de passe de base de données a été exposé

**Comment** :
1. Allez sur https://cloud.mongodb.com/
2. Connectez-vous
3. Sélectionnez votre cluster `Cluster0`
4. Cliquez sur **Database Access** dans le menu à gauche
5. Trouvez l'utilisateur `Bamba`
6. Cliquez sur **Edit**
7. Cliquez sur **Edit Password**
8. Générez un nouveau mot de passe (notez-le !)
9. Cliquez sur **Update User**

**Nouvelle connexion** :
```
mongodb+srv://Bamba:NOUVEAU_MOT_DE_PASSE@cluster0.topbtjf.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 2. Régénérer les Clés Cloudinary

**Pourquoi** : Les clés API Cloudinary ont été exposées

**Comment** :
1. Allez sur https://console.cloudinary.com/
2. Connectez-vous
3. Allez dans **Settings** → **Security**
4. Section **API Keys**
5. Cliquez sur **Regenerate** pour API Secret
6. Notez la nouvelle `API Key` et `API Secret`

### 3. Générer un Nouveau JWT_SECRET

**Comment** :
```bash
# Dans votre terminal PowerShell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copiez le résultat (long string de caractères aléatoires)

### 4. Changer le Mot de Passe Admin

Choisissez un mot de passe fort :
- Minimum 12 caractères
- Mélange de majuscules, minuscules, chiffres, symboles
- Exemple : `Khadim2026!SecureP@ss`

### 5. Mettre à Jour le Fichier `.env` Local

Éditez `.env` avec les NOUVELLES valeurs :

```env
PORT=3000
NODE_ENV=development

DB_TYPE=mongodb
DATABASE_URL=mongodb+srv://Bamba:NOUVEAU_MOT_DE_PASSE_MONGODB@cluster0.topbtjf.mongodb.net/portfolio?retryWrites=true&w=majority

ADMIN_PASSWORD=VOTRE_NOUVEAU_MOT_DE_PASSE_FORT
JWT_SECRET=VOTRE_NOUVEAU_JWT_SECRET_64_CARACTERES

CLOUDINARY_CLOUD_NAME=de0ncdsc2
CLOUDINARY_API_KEY=NOUVELLE_CLE_API
CLOUDINARY_API_SECRET=NOUVEAU_SECRET_API
```

### 6. Mettre à Jour les Variables dans Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `khadim-mbaye-portfolio`
3. **Settings** → **Environment Variables**
4. **Éditez chaque variable** avec les NOUVELLES valeurs :
   - `DATABASE_URL` → Nouvelle connexion MongoDB
   - `ADMIN_PASSWORD` → Nouveau mot de passe
   - `JWT_SECRET` → Nouveau secret JWT
   - `CLOUDINARY_API_KEY` → Nouvelle clé
   - `CLOUDINARY_API_SECRET` → Nouveau secret

5. **Redéployez** : Deployments → Redeploy

### 7. Tester

Une fois tout mis à jour :
1. Testez la connexion sur https://khadim-mbaye-portfolio-egqb.vercel.app/login
2. Utilisez le NOUVEAU mot de passe admin
3. Testez l'upload d'image
4. Testez l'ajout/suppression de projets

## 📋 Checklist de Sécurité

- [ ] Mot de passe MongoDB régénéré
- [ ] Clés Cloudinary régénérées
- [ ] JWT_SECRET régénéré
- [ ] Mot de passe admin changé
- [ ] `.env` local mis à jour
- [ ] Variables Vercel mises à jour
- [ ] Vercel redéployé
- [ ] Tests effectués et fonctionnels
- [ ] Email GitHub lu et compris

## 🛡️ Prévention Future

### Fichiers à NE JAMAIS Commiter
- ✅ `.env` (déjà dans `.gitignore`)
- ✅ Fichiers avec mots de passe
- ✅ Fichiers avec clés API
- ✅ Fichiers de configuration avec secrets

### Avant de Commiter
```bash
# Vérifiez toujours ce qui va être commité
git status
git diff

# Ne commitez JAMAIS .env
git diff .env  # Si vous voyez ça, N'ajoutez PAS le fichier !
```

### Documentation
- ❌ NE PAS mettre de vraies valeurs dans les docs
- ✅ Utiliser des placeholders : `YOUR_PASSWORD_HERE`
- ✅ Utiliser des exemples fictifs : `mongodb+srv://user:password@...`

## 📞 Support

Si vous avez des questions sur la régénération des secrets :
- MongoDB Atlas : https://docs.atlas.mongodb.com/
- Cloudinary : https://cloudinary.com/documentation
- Vercel : https://vercel.com/docs

## ⏱️ Temps Estimé

- Régénération MongoDB : 2 minutes
- Régénération Cloudinary : 2 minutes  
- Génération JWT : 30 secondes
- Mise à jour Vercel : 3 minutes
- **Total : ~10 minutes**

## 🎯 Résultat Final

Une fois tout fait :
- ✅ Tous les secrets compromis sont invalidés
- ✅ Nouveaux secrets sécurisés en place
- ✅ Application fonctionne normalement
- ✅ GitHub ne détecte plus de secrets exposés
