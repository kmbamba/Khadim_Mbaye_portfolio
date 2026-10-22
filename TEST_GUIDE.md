# Guide de Test - Portfolio Admin

## 🧪 Tests à Effectuer Après Déploiement

### Préparation
1. Assurez-vous que toutes les variables d'environnement sont configurées dans Vercel (voir `VERCEL_CONFIG.md`)
2. Redéployez le projet après avoir ajouté les variables
3. Attendez que le déploiement soit terminé (statut ✓ vert)

---

## Test 1 : Connexion Admin ✅

**URL** : `https://khadim-mbaye-portfolio-egqb.vercel.app/login`

**Actions** :
1. Entrez les identifiants :
   - Username : `admin`
   - Password : `admin123`
2. Cliquez sur "Se connecter"

**Résultat Attendu** :
- ✓ Redirection vers `/admin`
- ✓ Affichage du dashboard avec statistiques
- ✓ Bouton "Déconnexion" visible en haut à droite

**Si ça échoue** :
- Vérifiez que `JWT_SECRET` est défini dans Vercel
- Vérifiez que `ADMIN_PASSWORD` est défini
- Consultez les logs : Vercel → Deployments → View Function Logs

---

## Test 2 : Upload d'Image 📸

**URL** : `https://khadim-mbaye-portfolio-egqb.vercel.app/admin`

**Actions** :
1. Cliquez sur "Projets" dans le menu
2. Cliquez sur "Ajouter un Projet"
3. Cliquez sur "Parcourir" dans la section "Image du projet"
4. Sélectionnez une image (JPG, PNG, max 5MB)
5. Attendez l'upload

**Résultat Attendu** :
- ✓ Aperçu de l'image s'affiche
- ✓ Message "Image uploadée avec succès sur Cloudinary !"
- ✓ Le champ URL contient un lien Cloudinary (commence par `https://res.cloudinary.com/`)
- ✓ Pas d'erreur dans la console (F12)

**Si ça échoue** :
- Vérifiez que `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` sont définis
- Vérifiez qu'il n'y a pas d'espaces dans les valeurs
- Regardez l'erreur exacte dans la console (F12)
- Consultez les logs Vercel

---

## Test 3 : Ajouter un Projet ➕

**Prérequis** : Image uploadée (Test 2 réussi)

**Actions** :
1. Remplissez le formulaire :
   - Titre : "Test Projet Vercel"
   - Description : "Ceci est un test"
   - Catégorie : "DevOps"
   - Tags : "test, vercel"
   - URL Démo : (optionnel)
   - URL GitHub : (optionnel)
2. Cochez "Projet vedette" (optionnel)
3. Cliquez sur "Enregistrer"

**Résultat Attendu** :
- ✓ Modal se ferme
- ✓ Le projet apparaît dans la liste des projets
- ✓ Pas d'erreur 401 dans la console

**Si ça échoue (Erreur 401)** :
- Vérifiez que `JWT_SECRET` est défini dans Vercel
- Déconnectez-vous et reconnectez-vous
- Redéployez Vercel
- Regardez les logs pour plus de détails

**Si ça échoue (Erreur 500)** :
- Vérifiez que `DATABASE_URL` et `DB_TYPE=mongodb` sont définis
- Vérifiez que MongoDB Atlas est accessible
- Consultez les logs Vercel

---

## Test 4 : Modifier un Projet ✏️

**Actions** :
1. Cliquez sur "Modifier" sur un projet existant
2. Changez le titre en "Test Modifié"
3. Cliquez sur "Enregistrer"

**Résultat Attendu** :
- ✓ Modal se ferme
- ✓ Le titre du projet est mis à jour dans la liste
- ✓ Pas d'erreur 401

**Si ça échoue** :
- Même dépannage que Test 3

---

## Test 5 : Supprimer un Projet 🗑️

**Actions** :
1. Cliquez sur "Supprimer" sur le projet de test
2. Confirmez la suppression

**Résultat Attendu** :
- ✓ Le projet disparaît de la liste
- ✓ Les statistiques sont mises à jour
- ✓ Pas d'erreur 401

**Si ça échoue** :
- Même dépannage que Test 3

---

## Test 6 : Affichage Public 🌐

**URL** : `https://khadim-mbaye-portfolio-egqb.vercel.app/`

**Actions** :
1. Ouvrez le site en navigation privée (ou déconnectez-vous)
2. Scrollez pour voir toutes les sections

**Résultat Attendu** :
- ✓ Le nouveau projet apparaît dans la section "Projets"
- ✓ Toutes les sections se chargent (Projets, Compétences, Expériences, Certifications)
- ✓ Pas de message "Chargement..."
- ✓ Les images des projets s'affichent

**Si les projets ne s'affichent pas** :
- Vérifiez que `DATABASE_URL` est correcte
- Vérifiez que `DB_TYPE=mongodb`
- Ouvrez la console (F12) et cherchez les erreurs
- Vérifiez que l'API répond : `https://khadim-mbaye-portfolio-egqb.vercel.app/api/projects`

---

## Test 7 : Certifications 🎓

**Actions** :
1. Dans l'admin, cliquez sur "Certifications"
2. Cliquez sur "Ajouter une Certification"
3. Remplissez et uploadez une image
4. Enregistrez

**Résultat Attendu** :
- ✓ Upload fonctionne
- ✓ Certification ajoutée
- ✓ Apparaît sur le site public dans la section "Certifications"

---

## Test 8 : Expériences 💼

**Actions** :
1. Cliquez sur "Expériences"
2. Cliquez sur "Modifier" sur une expérience
3. Changez la description
4. Enregistrez

**Résultat Attendu** :
- ✓ Modifications sauvegardées
- ✓ Apparaissent sur le site public

---

## Test 9 : Compétences 🛠️

**Actions** :
1. Cliquez sur "Compétences"
2. Changez le niveau d'une compétence avec le slider
3. Vérifiez l'update automatique

**Résultat Attendu** :
- ✓ Le pourcentage change immédiatement
- ✓ Apparaît sur le site public

---

## Test 10 : Déconnexion 🚪

**Actions** :
1. Cliquez sur "Déconnexion" en haut à droite
2. Confirmez

**Résultat Attendu** :
- ✓ Redirection vers `/login`
- ✓ Impossible d'accéder à `/admin` sans se reconnecter

---

## 📊 Récapitulatif

| Test | Description | Statut |
|------|-------------|--------|
| 1 | Connexion Admin | ⬜ |
| 2 | Upload Image | ⬜ |
| 3 | Ajouter Projet | ⬜ |
| 4 | Modifier Projet | ⬜ |
| 5 | Supprimer Projet | ⬜ |
| 6 | Affichage Public | ⬜ |
| 7 | Certifications | ⬜ |
| 8 | Expériences | ⬜ |
| 9 | Compétences | ⬜ |
| 10 | Déconnexion | ⬜ |

---

## 🆘 Problèmes Fréquents

### Erreur 401 partout
**Cause** : JWT_SECRET manquant ou invalide  
**Solution** : Ajoutez `JWT_SECRET` dans Vercel et redéployez

### Erreur 500 sur Upload
**Cause** : Variables Cloudinary manquantes  
**Solution** : Ajoutez les 3 variables Cloudinary et redéployez

### Les projets ne s'affichent pas
**Cause** : DATABASE_URL ou DB_TYPE incorrect  
**Solution** : Vérifiez les variables MongoDB dans Vercel

### "Chargement..." qui ne disparaît pas
**Cause** : L'API ne répond pas  
**Solution** : Testez l'API directement : `/api/projects`, `/api/skills`, etc.

---

## ✅ Tous les Tests Réussis ?

Si tous les tests passent :
1. 🎉 Félicitations ! Votre portfolio est opérationnel
2. 🔐 Changez le mot de passe admin en production (voir `VERCEL_CONFIG.md`)
3. 🔑 Régénérez le JWT_SECRET pour plus de sécurité
4. 📱 Partagez votre portfolio : `https://khadim-mbaye-portfolio-egqb.vercel.app/`

---

## 📞 Support

Si des tests échouent :
1. Consultez `VERCEL_CONFIG.md` pour les variables d'environnement
2. Consultez `FIXES_CHANGELOG.md` pour comprendre les corrections
3. Vérifiez les logs Vercel : Deployments → View Function Logs
4. Testez en local avec `npm run dev` pour comparer
