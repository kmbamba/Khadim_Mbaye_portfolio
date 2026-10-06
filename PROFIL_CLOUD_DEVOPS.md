# 👨‍💻 Khadim Mbaye - Cloud & DevOps Engineer Junior

## 🎯 Profil Professionnel

**Cloud & DevOps Junior** certifié AWS Cloud Practitioner, spécialisé en **Terraform**, **Kubernetes/EKS** et **CI/CD sécurisé**. Recherche un premier poste en **Cloud Engineering**, **DevOps** ou **Solutions Architecture**.

---

## 📧 Contact

- **Email** : mbaye.khadim.dev@gmail.com
- **Téléphone** : +221 77 615 74 58
- **Localisation** : Dakar, Sénégal 🇸🇳
- **LinkedIn** : [linkedin.com/in/khadim-mbaye-88ab00329](https://linkedin.com/in/khadim-mbaye-88ab00329)
- **GitHub** : [@kmbamba](https://github.com/kmbamba)
- **Disponibilité** : Immédiate — CDI, stage ou alternance — Ouvert au remote

---

## 🏆 Certifications

### ✅ AWS Certified Cloud Practitioner
**Amazon Web Services** | Juillet 2026  
[Vérifier sur Credly](https://www.credly.com/users/khadim-mbaye)

### 🎯 AWS Certified Solutions Architect – Associate (en cours)
**Amazon Web Services** | SAA-C03  
Examen prévu : Déc. 2026 / Janv. 2027

---

## 💼 Compétences Techniques

### ☁️ Cloud AWS
- **Services** : EC2, VPC, IAM, S3, Route 53, ELB/ALB, Auto Scaling, EKS
- **Niveau** : Certifié Cloud Practitioner, SAA-C03 en préparation

### 🏗️ IaC & Conteneurs
- **Terraform** : Modules, state management, workspaces ⭐⭐⭐⭐⭐ (90%)
- **Docker** : Docker Compose, multi-stage builds ⭐⭐⭐⭐⭐ (90%)
- **Kubernetes** : Pods, Deployments, Services, Helm ⭐⭐⭐⭐ (85%)
- **AWS EKS** : Provisioning, Node Groups, LoadBalancer ⭐⭐⭐⭐ (85%)

### 🔄 CI/CD & Sécurité
- **Jenkins** : Pipelines, webhooks, automatisation ⭐⭐⭐⭐ (85%)
- **GitHub Actions** : Workflows, secrets, runners ⭐⭐⭐⭐ (85%)
- **SonarQube** : Quality Gates, analyse de code ⭐⭐⭐⭐ (80%)
- **Trivy** : Scan de vulnérabilités containers ⭐⭐⭐⭐ (80%)

### 📊 Observabilité
- **Prometheus** : Métriques, PromQL ⭐⭐⭐⭐ (80%)
- **Grafana** : Dashboards, visualisation ⭐⭐⭐⭐ (80%)
- **AlertManager** : Gestion des alertes ⭐⭐⭐ (75%)

### 💻 Développement
- **JavaScript/Node.js** : Express, API REST ⭐⭐⭐⭐ (85%)
- **React.js** : Hooks, Context, composants ⭐⭐⭐⭐ (85%)
- **Bases de données** : MongoDB, MySQL ⭐⭐⭐⭐ (80%)

### 🛠️ Outils & Systèmes
- **Linux** : Administration, scripting ⭐⭐⭐⭐⭐ (90%)
- **Git/GitHub** : Workflows, branching, PR ⭐⭐⭐⭐⭐ (90%)
- **WSL2** : Environnement de développement ⭐⭐⭐⭐ (85%)

---

## 🚀 Projets Cloud & DevOps Phares

### 1. Pipeline DevSecOps Complet sur AWS EKS ⭐⭐⭐
**[github.com/kmbamba/projet_portfolio](https://github.com/kmbamba/projet_portfolio)**

**🎯 Objectif** : Déployer une application MERN sur Kubernetes avec un pipeline CI/CD sécurisé complet

**🏗️ Architecture** :
```
GitHub → Webhook → Jenkins → SonarQube (Quality Gate) → Trivy (Scan) 
  → Docker Hub → Kubernetes (EKS) → Prometheus/Grafana
```

**✨ Réalisations** :
- ✅ Pipeline automatisé de bout en bout avec Jenkins
- ✅ Quality Gate SonarQube obligatoire (bloque si < seuil)
- ✅ Scan de sécurité Trivy sur images Docker
- ✅ Cluster AWS EKS provisionné avec Terraform :
  - VPC multi-AZ (haute disponibilité)
  - IAM Roles & Policies (sécurité)
  - Node Groups (scaling)
  - LoadBalancer AWS (exposition)
- ✅ Migration Helm vers Terraform `helm_release` :
  - Éliminé les échecs `terraform destroy`
  - Load Balancers AWS correctement gérés
- ✅ Supervision Prometheus/Grafana :
  - Dashboards versionnés en ConfigMaps
  - AlertManager configuré (matchers namespace)
  - Métriques cluster et applications

**🔧 Technologies** :  
`Jenkins` `SonarQube` `Trivy` `Docker` `Kubernetes` `Terraform` `AWS EKS` `Prometheus` `Grafana` `Helm`

**💡 Points Forts** :
- Architecture production-ready complète
- Sécurité intégrée (scan + quality gate)
- Observabilité avancée (métriques + alertes)
- IaC 100% Terraform (reproductible)

---

### 2. Natt - Plateforme de Tontine Digitale 🇸🇳 ⭐⭐
**[github.com/kmbamba/Tontine-Digital](https://github.com/kmbamba/Tontine-Digital)**

**🎯 Objectif** : Application fintech full-stack pour digitaliser les tontines (épargne rotative) en Afrique de l'Ouest

**✨ Réalisations** :
- ✅ Développeur principal du projet
- ✅ Stack MERN complète (MongoDB, Express, React, Node.js)
- ✅ Authentification sécurisée :
  - OTP (One-Time Password)
  - JWT (JSON Web Tokens)
  - Rate limiting anti-bruteforce
- ✅ Algorithme Fisher-Yates pour tirage au sort équitable
- ✅ Module de gestion de groupes de tontine
- ✅ Pipeline CI/CD GitHub Actions :
  - Tests automatiques
  - Analyse qualité SonarQube
  - Scan vulnérabilités Trivy
  - Build et push Docker Hub
- ✅ Architecture Docker multi-stage (optimisée)

**🔧 Technologies** :  
`MERN Stack` `Docker` `GitHub Actions` `SonarQube` `Trivy` `JWT` `MongoDB`

**💡 Points Forts** :
- Application métier complète pour l'UEMOA
- Sécurité DevSecOps intégrée
- Code production-ready
- Impact social (fintech africaine)

---

### 3. Infrastructure AWS Sécurisée - Bastion Host ⭐
**[github.com/kmbamba/Terraform-Aws](https://github.com/kmbamba/Terraform-Aws)**

**🎯 Objectif** : Déployer une infrastructure AWS sécurisée avec architecture à moindre privilège

**🏗️ Architecture** :
```
Internet
   ↓
Bastion Host (EC2 public)
   ↓ SSH uniquement
Web Server (EC2 privé)
```

**✨ Réalisations** :
- ✅ VPC avec subnets public/privé
- ✅ Bastion Host EC2 exposé (SSH depuis Internet)
- ✅ Web Server isolé (accessible uniquement via Bastion)
- ✅ Security Groups à moindre privilège :
  - Bastion : SSH (port 22) depuis Internet
  - Web : SSH depuis Bastion uniquement
- ✅ Code Terraform structuré :
  - `providers.tf`, `variables.tf`, `main.tf`, `outputs.tf`
  - Documentation complète
  - README avec concepts expliqués

**🔧 Technologies** :  
`Terraform` `AWS EC2` `VPC` `IAM` `Security Groups` `IaC`

**💡 Points Forts** :
- Architecture sécurisée par design
- Principe du moindre privilège
- Infrastructure as Code reproductible
- Documentation pédagogique

---

## 🎓 Formation

### Formation Cloud & DevOps
**Orange Digital Center Sénégal** | Mars - Juillet 2026
- Terraform, Kubernetes, AWS, Jenkins, CI/CD
- Prometheus, Grafana, observabilité
- Pratiques DevOps et sécurité

### Formation Développeur Full Stack
**Simplon Sénégal** | Juillet - Octobre 2025
- MERN Stack (MongoDB, Express, React, Node.js)
- APIs REST, authentification JWT
- Docker, Docker Compose, Git

### Master 1 Sécurité des SI & Monétique
**ISI, Dakar** | 2024 - 2025
- Sécurité des systèmes d'information
- Technologies de paiement

### Licence Informatique de Gestion
**UCAO** | 2021 - 2024 | Moyenne : 14,61/20
- Développement logiciel
- Bases de données
- Gestion de projets IT

---

## 🌟 Ce Qui Me Distingue

### 1. 🎖️ Certification AWS Officielle
- Certifié AWS Cloud Practitioner
- SAA-C03 (Solutions Architect) en préparation
- Connaissances cloud validées officiellement

### 2. 🏗️ Projets Production-Ready
- Pipeline DevSecOps complet (rare pour un junior)
- Architecture AWS multi-AZ haute disponibilité
- Observabilité Prometheus/Grafana avancée
- Sécurité OWASP intégrée

### 3. 🔒 Focus Sécurité DevSecOps
- SonarQube Quality Gates
- Trivy scan de vulnérabilités
- Security Groups moindre privilège
- Authentification JWT + Rate limiting

### 4. 📚 Documentation Technique
- READMEs complets avec architectures
- Concepts expliqués (pédagogique)
- Code commenté et structuré
- Bonnes pratiques IaC

### 5. 🇸🇳 Contexte Local
- Solutions pour le marché africain (fintech)
- Compréhension UEMOA
- Bilingue Français/Wolof
- Anglais technique

---

## 📊 Statistiques

- **Projets GitHub** : 6+ repositories publics
- **Technologies maîtrisées** : 20+
- **Certifications** : 1 obtenue + 1 en cours
- **Formations** : 4 (diplômantes + certifiantes)
- **Langues** : Français (courant), Anglais (technique), Wolof (courant)

---

## 🎯 Objectifs de Carrière

### Poste Recherché
**Cloud Engineer / DevOps Engineer / Solutions Architect Junior**

### Type de Contrat
- CDI, Stage ou Alternance
- Ouvert au remote
- Mobilité internationale possible

### Secteurs d'Intérêt
- ☁️ Cloud Computing
- 🔄 DevOps / SRE
- 🏦 Fintech
- 🚀 Startups tech
- 🏢 ESN / Cabinets conseil

### Environnements Techniques Recherchés
- AWS (EC2, EKS, VPC, S3, etc.)
- Kubernetes / Docker
- Terraform / IaC
- Jenkins / GitHub Actions
- Prometheus / Grafana

---

## 💡 Projets Futurs

### Court Terme (3 mois)
- [ ] Obtenir AWS Solutions Architect Associate (SAA-C03)
- [ ] Déployer Natt en production
- [ ] Ajouter CI/CD sur projets existants
- [ ] Obtenir certification IELTS/TOEFL

### Moyen Terme (6-12 mois)
- [ ] Certifications Kubernetes (CKA/CKAD)
- [ ] Terraform Associate
- [ ] Contributions open-source
- [ ] Blog technique DevOps
- [ ] Mentoring junior developers

### Long Terme (1-3 ans)
- [ ] AWS Solutions Architect Professional
- [ ] DevOps Engineer Senior
- [ ] Conférences techniques
- [ ] Formation/Teaching

---

## 📝 Recommandations

### Pour Recruteurs

**Pourquoi me choisir ?**
1. ✅ **Certification AWS officielle** (Cloud Practitioner)
2. ✅ **Projet DevSecOps complet** (pipeline end-to-end sur EKS)
3. ✅ **Forte orientation sécurité** (SonarQube, Trivy, IAM)
4. ✅ **IaC Terraform avancé** (modules, state, helm_release)
5. ✅ **Observabilité** (Prometheus/Grafana/AlertManager)
6. ✅ **Double compétence** Cloud & Dev (MERN Stack)
7. ✅ **Disponibilité immédiate**

**Profil idéal pour** :
- Équipe Cloud/DevOps en croissance
- Migration vers AWS/Kubernetes
- Mise en place CI/CD sécurisé
- Projets Infrastructure as Code
- Fintech / Startups tech

---

## 🔗 Liens Utiles

- **Portfolio** : (en cours de déploiement)
- **GitHub** : [github.com/kmbamba](https://github.com/kmbamba)
- **LinkedIn** : [linkedin.com/in/khadim-mbaye-88ab00329](https://linkedin.com/in/khadim-mbaye-88ab00329)
- **Email** : mbaye.khadim.dev@gmail.com
- **CV** : Disponible sur demande

---

## 🎉 Résumé

**Profil** : Cloud & DevOps Engineer Junior  
**Expertise** : Terraform | Kubernetes/EKS | CI/CD | AWS  
**Certifications** : AWS Cloud Practitioner (SAA-C03 en cours)  
**Localisation** : Dakar, Sénégal 🇸🇳  
**Disponibilité** : Immédiate  
**Mobilité** : Remote-friendly

**Signature technique** :
```hcl
resource "cloud_engineer" "khadim_mbaye" {
  name            = "Khadim Mbaye"
  specialization  = ["Terraform", "Kubernetes", "AWS", "CI/CD"]
  certification   = ["AWS Cloud Practitioner"]
  availability    = "immediate"
  remote_ready    = true
  
  tags = {
    DevOps     = "true"
    Cloud      = "AWS"
    IaC        = "Terraform"
    Container  = "Kubernetes"
    CI_CD      = "Jenkins"
    Security   = "DevSecOps"
  }
}
```

---

**🚀 Prêt à relever de nouveaux défis Cloud & DevOps ! 🚀**

*Profil mis à jour : Janvier 2027*
