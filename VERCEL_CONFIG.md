# Configuration Vercel - Variables d'Environnement

## Variables à Ajouter dans le Dashboard Vercel

Pour que votre portfolio fonctionne correctement sur Vercel, vous devez ajouter les variables d'environnement suivantes :

### 1. Accédez à Vercel Dashboard
1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `khadim-mbaye-portfolio`
3. Cliquez sur **Settings** (Paramètres)
4. Cliquez sur **Environment Variables** dans le menu à gauche

### 2. Ajoutez les Variables d'Environnement

Ajoutez les variables suivantes **une par une** :

#### Base de Données MongoDB
```
Nom: DATABASE_URL
Valeur: mongodb+srv://Bamba:bamba6789@cluster0.topbtjf.mongodb.net/portfolio?retryWrites=true&w=majority
Environment: Production, Preview, Development
```

```
Nom: DB_TYPE
Valeur: mongodb
Environment: Production, Preview, Development
```

#### Authentification Admin
```
Nom: JWT_SECRET
Valeur: khadim-mbaye-secret-key-2026-portfolio
Environment: Production, Preview, Development
```

```
Nom: ADMIN_PASSWORD
Valeur: admin123
Environment: Production, Preview, Development
```

⚠️ **IMPORTANT** : Changez `ADMIN_PASSWORD` en production pour un mot de passe fort !

#### Cloudinary (Upload d'Images)
```
Nom: CLOUDINARY_CLOUD_NAME
Valeur: de0ncdsc2
Environment: Production, Preview, Development
```

```
Nom: CLOUDINARY_API_KEY
Valeur: 589738915686359
Environment: Production, Preview, Development
```

```
Nom: CLOUDINARY_API_SECRET
Valeur: QwYOnouvAiwlPWLgWySr2sSOpcg
Environment: Production, Preview, Development
```

### 3. Redéployer

Après avoir ajouté toutes les variables :
1. Allez dans l'onglet **Deployments**
2. Cliquez sur les **trois points** (...) du dernier déploiement
3. Sélectionnez **Redeploy**
4. Cochez **Use existing Build Cache** pour aller plus vite
5. Cliquez sur **Redeploy**

### 4. Vérifier que tout fonctionne

Une fois le redéploiement terminé, testez :

✅ **Upload d'Image**
- Connectez-vous à `/admin`
- Ajoutez un nouveau projet
- Uploadez une image → Devrait réussir et afficher une URL Cloudinary

✅ **Ajout de Projet**
- Après avoir uploadé l'image
- Remplissez les autres champs
- Cliquez sur "Enregistrer" → Le projet devrait apparaître dans la liste

✅ **Suppression de Projet**
- Cliquez sur "Supprimer" sur un projet
- Confirmez → Le projet devrait disparaître

✅ **Modification de Projet**
- Cliquez sur "Modifier" sur un projet
- Changez quelques infos
- Sauvegardez → Les changements devraient apparaître

### 5. Récapitulatif des Variables

| Variable | Valeur | Description |
|----------|--------|-------------|
| `DATABASE_URL` | `mongodb+srv://...` | Connexion MongoDB Atlas |
| `DB_TYPE` | `mongodb` | Type de base de données |
| `JWT_SECRET` | `khadim-mbaye-secret-key-2026-portfolio` | Clé secrète pour JWT |
| `ADMIN_PASSWORD` | `admin123` | Mot de passe admin (⚠️ À changer) |
| `CLOUDINARY_CLOUD_NAME` | `de0ncdsc2` | Nom du cloud Cloudinary |
| `CLOUDINARY_API_KEY` | `589738915686359` | Clé API Cloudinary |
| `CLOUDINARY_API_SECRET` | `QwYOnouvAiwlPWLgWySr2sSOpcg` | Secret API Cloudinary |

## Sécurité

### En Production (Recommandations)

1. **Changez le mot de passe admin** :
   - Dans Vercel, modifiez `ADMIN_PASSWORD` avec un mot de passe fort
   - Exemple : `Khadim2026!SecurePass`

2. **Régénérez le JWT_SECRET** :
   - Générez une nouvelle clé aléatoire
   - Utilisez : `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - Remplacez la valeur dans Vercel

3. **Vérifiez les accès MongoDB** :
   - Dans MongoDB Atlas, limitez les adresses IP autorisées
   - Activez uniquement l'accès depuis Vercel si possible

4. **Cloudinary** :
   - Ne partagez jamais votre API Secret publiquement
   - Activez la modération d'images si nécessaire

## Dépannage

### L'upload ne fonctionne pas
- Vérifiez que `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` et `CLOUDINARY_API_SECRET` sont bien définies
- Vérifiez qu'il n'y a pas d'espaces avant/après les valeurs
- Redéployez après avoir ajouté les variables

### Les projets ne s'affichent pas
- Vérifiez que `DATABASE_URL` est correcte
- Vérifiez que `DB_TYPE=mongodb`
- Consultez les logs Vercel : **Deployments → View Function Logs**

### Erreur 401 lors de l'ajout/suppression
- Déconnectez-vous et reconnectez-vous sur `/login`
- Vérifiez que `JWT_SECRET` est définie dans Vercel
- Redéployez

## Support

En cas de problème :
1. Consultez les logs dans Vercel : **Deployments → View Function Logs**
2. Vérifiez que toutes les 7 variables sont définies
3. Essayez de redéployer sans cache : **Redeploy → Décochez "Use existing Build Cache"**
