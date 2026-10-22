# Changelog - Corrections Upload & Admin

## Date : 22 Octobre 2026

## 🐛 Problèmes Résolus

### 1. Upload d'Image (Erreur 500)
**Problème** : L'upload d'image échouait avec une erreur 500 sur `/api/upload`

**Cause** : La route `/api/upload` n'avait pas la vérification JWT token (`verifyToken` middleware)

**Solution** : 
- Ajouté `verifyToken` middleware à la route `/api/upload`
- Réorganisé le code pour définir `verifyToken` avant son utilisation
- Ajouté plus de détails dans les messages d'erreur pour debug

### 2. Ajout de Projet (Erreur 401)
**Problème** : Impossible d'ajouter un projet - Erreur 401 Unauthorized

**Cause** : Les headers d'autorisation étaient bien envoyés mais pas reconnus par le serveur

**Solution** :
- Vérifié que toutes les routes POST/PUT/DELETE utilisent `verifyToken`
- Vérifié que `admin.js` utilise `getAuthHeaders()` pour toutes les requêtes

### 3. Suppression de Projet (Erreur 401)
**Problème** : Impossible de supprimer un projet - Erreur 401 Unauthorized

**Cause** : Même problème que l'ajout

**Solution** :
- Confirmé que la route DELETE utilise bien `verifyToken`
- Confirmé que `admin.js` envoie bien le token dans le header

## 🔧 Modifications Techniques

### Fichiers Modifiés

#### `server.js`
- Déplacé la fonction `verifyToken` avant son utilisation
- Ajouté `verifyToken` middleware à `/api/upload`
- Amélioré les messages d'erreur pour inclure les détails
- Ordre des définitions : verifyToken → routes → login

#### `public/admin.js`
- Amélioré la gestion des erreurs dans `handleImageUpload`
- Ajouté plus de logs console pour debug
- Les headers sont maintenant corrects pour FormData (pas de Content-Type manuel)

### Documentation Ajoutée

#### `VERCEL_CONFIG.md`
Guide complet pour configurer les variables d'environnement sur Vercel :
- 7 variables d'environnement nécessaires
- Instructions pas à pas pour les ajouter
- Guide de vérification des fonctionnalités
- Recommandations de sécurité
- Section dépannage

## ✅ Tests à Effectuer (Local)

1. **Upload d'Image** ✓
   - Se connecter sur `/admin`
   - Ajouter un projet
   - Sélectionner une image
   - Vérifier que l'upload réussit et retourne une URL Cloudinary

2. **Ajout de Projet** ✓
   - Remplir le formulaire de projet
   - Vérifier que le projet apparaît dans la liste

3. **Suppression de Projet** ✓
   - Cliquer sur "Supprimer"
   - Vérifier que le projet disparaît

4. **Modification de Projet** ✓
   - Cliquer sur "Modifier"
   - Changer les informations
   - Vérifier que les changements sont sauvegardés

## 🚀 Déploiement sur Vercel

### Prérequis
Toutes les variables d'environnement doivent être configurées dans Vercel :

```
DATABASE_URL = mongodb+srv://Bamba:bamba6789@cluster0.topbtjf.mongodb.net/portfolio
DB_TYPE = mongodb
JWT_SECRET = khadim-mbaye-secret-key-2026-portfolio
ADMIN_PASSWORD = admin123
CLOUDINARY_CLOUD_NAME = de0ncdsc2
CLOUDINARY_API_KEY = 589738915686359
CLOUDINARY_API_SECRET = QwYOnouvAiwlPWLgWySr2sSOpcg
```

### Étapes
1. Commiter et pousser les changements sur GitHub
2. Aller dans Vercel Dashboard
3. Ajouter les variables d'environnement (voir `VERCEL_CONFIG.md`)
4. Redéployer le projet
5. Tester toutes les fonctionnalités

## 📝 Notes Importantes

### Sécurité
⚠️ En production, vous devez :
- Changer `ADMIN_PASSWORD` pour un mot de passe fort
- Régénérer `JWT_SECRET` avec une clé aléatoire
- Ne jamais commiter le fichier `.env` dans Git (déjà dans `.gitignore`)

### Cloudinary
- Les images sont stockées dans le dossier `portfolio/` sur Cloudinary
- Transformation automatique : 800x600px max
- Formats acceptés : jpg, jpeg, png, gif, webp
- Taille max : 5MB

### MongoDB Atlas
- Base de données : `portfolio`
- Collections : `projects`, `certifications`, `skills`, `experience`
- Connexion sécurisée via MongoDB Atlas

## 🔍 Debug

Si un problème persiste en production :

1. **Vérifier les logs Vercel**
   - Deployments → View Function Logs
   - Chercher les erreurs 500 ou 401

2. **Vérifier les variables d'environnement**
   - Settings → Environment Variables
   - S'assurer que les 7 variables sont définies

3. **Test de connexion**
   - MongoDB : Vérifier que `DATABASE_URL` est accessible
   - Cloudinary : Vérifier les credentials sur cloudinary.com

4. **Redéployer sans cache**
   - Deployments → Redeploy
   - Décocher "Use existing Build Cache"

## 📞 Support

En cas de problème persistant :
1. Consulter `VERCEL_CONFIG.md`
2. Vérifier les logs dans Vercel
3. Tester en local avec `npm run dev`
4. Comparer les variables `.env` (local) vs Vercel (production)
