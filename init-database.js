// Script pour initialiser MongoDB avec les données
require('dotenv').config();
const database = require('./database');

const initialData = {
  projects: [
    {
      id: 1,
      title: "Pipeline DevSecOps complet sur AWS EKS",
      description: "Pipeline CI/CD automatisé complet : webhook GitHub → Quality Gate SonarQube → scan Trivy → push Docker Hub → déploiement Kubernetes. Cluster AWS EKS provisionné avec Terraform (VPC multi-AZ, IAM), supervision Prometheus/Grafana avec dashboards versionnés.",
      image: "https://raw.githubusercontent.com/kubernetes/community/master/icons/svg/resources/labeled/deploy.svg",
      category: "devops",
      tags: ["Jenkins", "SonarQube", "Trivy", "Kubernetes", "Terraform", "AWS EKS", "Prometheus", "Grafana", "Helm"],
      demoUrl: "",
      githubUrl: "https://github.com/kmbamba/projet_portfolio",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Natt - Plateforme de Tontine Digitale 🇸🇳",
      description: "Application fintech full-stack de gestion de tontines pour l'UEMOA : authentification OTP/JWT, rate limiting, algorithme Fisher-Yates pour tirage équitable. Pipeline CI/CD sécurisé avec GitHub Actions, analyse SonarQube et scan Trivy.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
      category: "devops",
      tags: ["MERN Stack", "Docker", "GitHub Actions", "SonarQube", "Trivy", "JWT", "MongoDB"],
      demoUrl: "",
      githubUrl: "https://github.com/kmbamba/Tontine-Digital",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "Infrastructure AWS sécurisée - Bastion Host",
      description: "VPC public/privé avec Bastion Host : serveur EC2 exposé, web server accessible uniquement via Bastion. Security Groups à moindre privilège, code Terraform structuré avec modules et documentation complète.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      category: "cloud",
      tags: ["Terraform", "AWS EC2", "VPC", "IAM", "Security Groups", "IaC"],
      demoUrl: "",
      githubUrl: "https://github.com/kmbamba/Terraform-Aws",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      title: "Portfolio Full Stack avec Admin Panel",
      description: "Portfolio professionnel avec panel d'administration complet : gestion dynamique des projets, certifications et compétences via API REST. Déployé sur Kubernetes dans le pipeline DevSecOps.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      category: "web",
      tags: ["React", "Express.js", "Node.js", "MongoDB", "API REST", "Kubernetes"],
      demoUrl: "",
      githubUrl: "https://github.com/kmbamba/portfolio-full-stack",
      featured: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      title: "MiniBank - API REST Bancaire",
      description: "API REST bancaire sécurisée avec authentification JWT, gestion de comptes et transactions. Interface React.js moderne.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
      category: "web",
      tags: ["Node.js", "Express", "MongoDB", "JWT", "React.js"],
      demoUrl: "",
      githubUrl: "https://github.com/kmbamba/Minibank",
      featured: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 6,
      title: "Maguita Skin - E-commerce Cosmétique",
      description: "Site e-commerce complet pour produits cosmétiques avec système de paiement et gestion des stocks.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      category: "web",
      tags: ["React", "Node.js", "E-commerce"],
      demoUrl: "",
      githubUrl: "https://github.com/kmbamba/maguita-skin",
      featured: false,
      createdAt: new Date().toISOString()
    }
  ],
  certifications: [
    {
      id: 1,
      name: "AWS Certified Cloud Practitioner",
      organization: "Amazon Web Services",
      date: "Juillet 2026",
      credentialId: "CLF-C02",
      credentialUrl: "https://www.credly.com/badges/6e15674e-5469-4296-973d-1ac6377e739f/public_url",
      image: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
      description: "Certification AWS Cloud Practitioner validant les connaissances fondamentales du cloud AWS"
    },
    {
      id: 2,
      name: "AWS Solutions Architect – Associate (en cours)",
      organization: "Amazon Web Services",
      date: "Prévu : Déc. 2026 / Jan. 2027",
      credentialId: "SAA-C03",
      credentialUrl: "",
      image: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
      description: "Certification AWS Solutions Architect Associate en préparation"
    }
  ],
  skills: [
    {
      category: "Cloud AWS",
      icon: "fas fa-cloud",
      items: [
        { name: "EC2, VPC, IAM", level: 85 },
        { name: "S3, Route 53", level: 80 },
        { name: "ELB/ALB, Auto Scaling", level: 80 },
        { name: "EKS (Kubernetes)", level: 85 },
        { name: "AWS Cloud Practitioner", level: 100 }
      ]
    },
    {
      category: "IaC & Conteneurs",
      icon: "fas fa-server",
      items: [
        { name: "Terraform (modules, state)", level: 90 },
        { name: "Docker & Docker Compose", level: 90 },
        { name: "Kubernetes & Helm", level: 85 },
        { name: "Infrastructure as Code", level: 90 }
      ]
    },
    {
      category: "CI/CD & Sécurité",
      icon: "fas fa-lock",
      items: [
        { name: "Jenkins", level: 85 },
        { name: "GitHub Actions", level: 85 },
        { name: "SonarQube (Quality Gate)", level: 80 },
        { name: "Trivy (Scan vulnérabilités)", level: 80 }
      ]
    },
    {
      category: "Observabilité & Dev",
      icon: "fas fa-chart-line",
      items: [
        { name: "Prometheus & Grafana", level: 80 },
        { name: "AlertManager", level: 75 },
        { name: "Linux & Git", level: 90 },
        { name: "MERN Stack (Node.js, React)", level: 85 }
      ]
    }
  ],
  experience: [
    {
      id: 1,
      type: "work",
      title: "Cloud & DevOps Engineer (Projets)",
      company: "Projets Personnels & Formations",
      period: "Mars 2026 - Présent",
      description: "Conception et déploiement d'infrastructures cloud AWS et pipelines DevSecOps complets avec Kubernetes, Terraform et outils de sécurité.",
      achievements: [
        "Déployé un pipeline DevSecOps complet sur AWS EKS : Jenkins, SonarQube, Trivy, Kubernetes avec Helm",
        "Provisionné et géré cluster EKS avec Terraform (VPC multi-AZ, IAM, Node Groups, Load Balancers)",
        "Mis en place supervision Prometheus/Grafana avec dashboards personnalisés et AlertManager",
        "Développé Natt (plateforme fintech) : MERN Stack avec CI/CD GitHub Actions, Docker multi-stage",
        "Créé infrastructure AWS sécurisée avec Bastion Host et Security Groups à moindre privilège"
      ]
    },
    {
      id: 2,
      type: "education",
      title: "Formation Cloud & DevOps",
      company: "Orange Digital Center Sénégal",
      period: "Mars - Juillet 2026",
      description: "Formation intensive en Cloud AWS, DevOps, Terraform, Kubernetes et CI/CD sécurisé.",
      achievements: [
        "Maîtrise de Terraform (modules, state management, workspaces)",
        "Déploiement et gestion de clusters Kubernetes/EKS",
        "Pipelines CI/CD avec Jenkins, GitHub Actions, SonarQube, Trivy",
        "Observabilité avec Prometheus, Grafana, AlertManager",
        "Certification AWS Cloud Practitioner obtenue"
      ]
    },
    {
      id: 3,
      type: "education",
      title: "Formation Développeur Full Stack",
      company: "Simplon Sénégal",
      period: "Juillet - Octobre 2025",
      description: "Formation intensive développement web full-stack avec JavaScript, Node.js, React et MongoDB.",
      achievements: [
        "Développement MERN Stack (MongoDB, Express, React, Node.js)",
        "APIs REST avec authentification JWT et sécurité",
        "Conteneurisation avec Docker et Docker Compose",
        "Versionning Git et collaboration GitHub"
      ]
    },
    {
      id: 4,
      type: "education",
      title: "Master 1 Sécurité des SI & Monétique",
      company: "ISI, Dakar",
      period: "2024 - 2025",
      description: "Formation en sécurité des systèmes d'information et technologies de paiement.",
      achievements: []
    },
    {
      id: 5,
      type: "education",
      title: "Licence Informatique de Gestion",
      company: "UCAO (Moyenne 14,61/20)",
      period: "2021 - 2024",
      description: "Formation en développement logiciel, bases de données et gestion de projets informatiques.",
      achievements: []
    }
  ],
  profile: {
    name: "Khadim Mbaye",
    title: "Cloud & DevOps Engineer Junior",
    bio: "Cloud & DevOps junior certifié AWS Cloud Practitioner (SAA-C03 en préparation), avec de solides compétences en Terraform, Kubernetes/EKS et CI/CD sécurisé. J'ai conçu et déployé de bout en bout un pipeline DevSecOps sur AWS EKS avec supervision Prometheus/Grafana. Développeur principal de Natt, plateforme fintech de tontine digitale (MERN) pour l'UEMOA.",
    email: "mbaye.khadim.dev@gmail.com",
    phone: "+221 77 615 74 58",
    location: "Dakar, Sénégal 🇸🇳",
    github: "https://github.com/kmbamba",
    linkedin: "https://linkedin.com/in/khadim-mbaye-88ab00329",
    twitter: "https://twitter.com/kmbamba",
    stats: {
      experience: "1+",
      projects: "6+",
      technologies: "20+"
    }
  }
};

async function initDatabase() {
  try {
    console.log('🔄 Connexion à MongoDB...');
    await database.connect();
    
    console.log('📝 Insertion des projets...');
    for (const project of initialData.projects) {
      await database.addItem('projects', project);
    }
    
    console.log('🏆 Insertion des certifications...');
    for (const cert of initialData.certifications) {
      await database.addItem('certifications', cert);
    }
    
    console.log('💪 Insertion des compétences...');
    for (const skill of initialData.skills) {
      await database.addItem('skills', skill);
    }
    
    console.log('👔 Insertion des expériences...');
    for (const exp of initialData.experience) {
      await database.addItem('experience', exp);
    }
    
    console.log('👤 Insertion du profil...');
    await database.updateProfile(initialData.profile);
    
    console.log('✅ Base de données initialisée avec succès !');
    console.log(`   - ${initialData.projects.length} projets`);
    console.log(`   - ${initialData.certifications.length} certifications`);
    console.log(`   - ${initialData.skills.length} catégories de compétences`);
    console.log(`   - ${initialData.experience.length} expériences`);
    
    await database.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

initDatabase();
