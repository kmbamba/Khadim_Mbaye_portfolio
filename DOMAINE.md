# Guide : Configurer un Domaine Personnalisé

Ce guide vous explique comment ajouter votre propre nom de domaine à votre portfolio hébergé sur Vercel.

## 🌐 Pourquoi un domaine personnalisé ?

Au lieu de `khadim-mbaye-portfolio-egqb.vercel.app`, vous pouvez avoir :
- ✅ `khadim-mbaye.com`
- ✅ `khadimmb.dev`
- ✅ `devops-khadim.cloud`

**Avantages** :
- Plus professionnel
- Facile à mémoriser
- Meilleur pour le SEO
- Renforce votre marque personnelle

## 💰 Acheter un domaine

### Fournisseurs recommandés :

#### 1. **Namecheap** (Recommandé)
- 🌐 [namecheap.com](https://www.namecheap.com)
- Prix : ~10-15$/an pour .com
- Bon service client
- Interface simple

#### 2. **Google Domains / Squarespace**
- 🌐 [domains.google.com](https://domains.google.com) → Maintenant Squarespace
- Prix : ~12$/an
- Intégration facile

#### 3. **OVH** (Pour l'Afrique)
- 🌐 [ovh.com](https://www.ovh.com/sn/)
- Accepte Mobile Money
- Support francophone
- Prix : ~5000 FCFA/an pour certains TLD

#### 4. **Cloudflare Registrar**
- 🌐 [cloudflare.com](https://www.cloudflare.com)
- Prix au coût (pas de marge)
- Sécurité incluse

### Extensions recommandées :
- `.com` - Universel (12-15$/an)
- `.dev` - Pour développeurs (12$/an)
- `.cloud` - Pour Cloud Engineers (15-20$/an)
- `.tech` - Technologie (10$/an)
- `.io` - Startups tech (30-40$/an)
- `.sn` - Sénégal (~5000 FCFA/an via OVH Sénégal)

## 🔧 Configuration sur Vercel

### Étape 1 : Ajouter le domaine dans Vercel

1. Connectez-vous à [vercel.com](https://vercel.com)
2. Sélectionnez votre projet **khadim-mbaye-portfolio**
3. Allez dans **Settings** → **Domains**
4. Cliquez sur **Add Domain**
5. Entrez votre domaine (ex: `khadim-mbaye.dev`)
6. Cliquez sur **Add**

Vercel vous donnera les enregistrements DNS à configurer.

### Étape 2 : Configurer les DNS

Vercel vous propose 2 méthodes :

#### Méthode A : DNS de Vercel (Recommandé - Plus simple)

**Configuration automatique**

Chez votre fournisseur de domaine (Namecheap, OVH, etc.) :

1. Allez dans **Domain Management** / **Gestion DNS**
2. Changez les **Nameservers** par ceux de Vercel :
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
3. Sauvegardez

✅ **Avantages** : Configuration automatique, SSL gratuit, CDN inclus

#### Méthode B : Vos DNS actuels (Manuel)

Si vous voulez garder vos DNS actuels, ajoutez ces enregistrements :

**Pour le domaine racine (`khadim-mbaye.dev`)** :
```
Type : A
Nom : @
Valeur : 76.76.21.21
TTL : 3600
```

**Pour www (`www.khadim-mbaye.dev`)** :
```
Type : CNAME
Nom : www
Valeur : cname.vercel-dns.com
TTL : 3600
```

### Étape 3 : Attendre la propagation DNS

⏳ **Temps d'attente** : 5 minutes à 48 heures (généralement < 1 heure)

Vérifiez l'état dans **Vercel** → **Domains** :
- ⏳ En attente : Configuration en cours
- ✅ Actif : Domaine configuré et accessible

### Étape 4 : Vérifier le SSL (HTTPS)

Vercel configure automatiquement le certificat SSL **Let's Encrypt** gratuit.

Vérifiez que votre site est accessible en HTTPS :
- ✅ `https://votre-domaine.com` (cadenas vert)

## 🔍 Vérifier la configuration DNS

### Outils en ligne :

1. **DNS Checker**
   - 🌐 [dnschecker.org](https://dnschecker.org)
   - Vérifiez la propagation mondiale de vos DNS

2. **What's My DNS**
   - 🌐 [whatsmydns.net](https://www.whatsmydns.net)
   - Visualisation géographique

3. **MX Toolbox**
   - 🌐 [mxtoolbox.com/SuperTool.aspx](https://mxtoolbox.com/SuperTool.aspx)
   - Diagnostics DNS complets

### Commandes terminal :

```bash
# Vérifier les enregistrements A
nslookup votre-domaine.com

# Vérifier les CNAME
nslookup www.votre-domaine.com

# Ping
ping votre-domaine.com
```

## 📧 Configurer les emails (Optionnel)

Vous pouvez avoir des emails professionnels avec votre domaine :

### Option 1 : Google Workspace (Payant)
- Prix : 6$/mois
- Gmail professionnel : `contact@votre-domaine.com`
- 🌐 [workspace.google.com](https://workspace.google.com)

### Option 2 : Zoho Mail (Gratuit)
- Gratuit jusqu'à 5 utilisateurs
- 🌐 [zoho.com/mail](https://www.zoho.com/mail/)

### Option 3 : Forwarder (Gratuit)
- Rediriger vers votre Gmail personnel
- Configuration dans votre fournisseur de domaine

## 🚨 Problèmes courants

### ❌ Erreur "Domain not found"
**Solution** : Attendez la propagation DNS (jusqu'à 48h)

### ❌ "SSL Certificate Error"
**Solution** : 
- Attendez 30 minutes après l'ajout du domaine
- Vérifiez que les DNS pointent vers Vercel
- Dans Vercel → Settings → Domains → Refresh SSL

### ❌ "This site can't be reached"
**Solution** :
- Vérifiez les enregistrements DNS (A et CNAME)
- Testez avec `nslookup votre-domaine.com`
- Vérifiez que les nameservers sont corrects

### ❌ Le www ne fonctionne pas
**Solution** :
- Ajoutez l'enregistrement CNAME pour `www`
- Dans Vercel, ajoutez à la fois `domaine.com` et `www.domaine.com`

## 🎯 Recommandations finales

1. **Choisissez un nom court** : Plus facile à retenir
2. **Évitez les chiffres/tirets** : `khadim-mbaye.dev` > `khadim2024.dev`
3. **Préférez .dev ou .com** : Extensions professionnelles
4. **Activez WHOIS Privacy** : Protégez vos infos personnelles (généralement gratuit)
5. **Renouvelez automatiquement** : Pour ne pas perdre votre domaine

## 📝 Checklist de configuration

- [ ] Domaine acheté
- [ ] Nameservers configurés sur Vercel (ou DNS A/CNAME ajoutés)
- [ ] Domaine ajouté dans Vercel → Domains
- [ ] Propagation DNS terminée (✅ statut actif dans Vercel)
- [ ] Site accessible en HTTPS
- [ ] www redirige vers le domaine principal
- [ ] Mettre à jour les meta tags dans `index.html` avec votre nouveau domaine
- [ ] Mettre à jour les URLs dans le README

## 🌟 Exemple final

Après configuration réussie, votre portfolio sera accessible sur :
- ✅ `https://khadim-mbaye.dev`
- ✅ `https://www.khadim-mbaye.dev` (redirige vers le principal)
- ✅ Panel admin : `https://khadim-mbaye.dev/admin`

Votre ancien lien Vercel fonctionnera toujours : `khadim-mbaye-portfolio-egqb.vercel.app`

---

**Besoin d'aide ?** Contactez le support Vercel (très réactif !) : [vercel.com/support](https://vercel.com/support)
