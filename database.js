// ===== DATABASE MODULE =====
// Ce module permet d'utiliser différentes bases de données selon la configuration

// Import MongoDB (si disponible)
let MongoClient;
try {
    MongoClient = require('mongodb').MongoClient;
} catch (err) {
    console.log('MongoDB driver not installed. Using in-memory storage.');
}

// Configuration
const DB_TYPE = process.env.DB_TYPE || 'memory'; // memory, mongodb, json
const DB_URL = process.env.DATABASE_URL;

class Database {
    constructor() {
        this.type = DB_TYPE;
        this.client = null;
        this.db = null;
        this.data = null;
    }

    // Initialiser la connexion
    async connect() {
        if (this.type === 'mongodb' && DB_URL) {
            try {
                this.client = await MongoClient.connect(DB_URL);
                this.db = this.client.db();
                console.log('✅ Connected to MongoDB');
                return true;
            } catch (error) {
                console.error('❌ MongoDB connection failed:', error.message);
                console.log('⚠️ Falling back to in-memory storage');
                this.type = 'memory';
                return false;
            }
        } else if (this.type === 'json') {
            try {
                const fs = require('fs');
                const path = require('path');
                const dataPath = path.join(__dirname, 'data.json');
                
                if (fs.existsSync(dataPath)) {
                    this.data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
                    console.log('✅ Loaded data from data.json');
                } else {
                    this.data = this.getDefaultData();
                    console.log('⚠️ data.json not found, using default data');
                }
                return true;
            } catch (error) {
                console.error('❌ JSON file error:', error.message);
                console.log('⚠️ Falling back to in-memory storage');
                this.type = 'memory';
                return false;
            }
        } else {
            // In-memory storage
            this.data = this.getDefaultData();
            console.log('✅ Using in-memory storage');
            return true;
        }
    }

    // Obtenir les données par défaut
    getDefaultData() {
        return {
            projects: [
                {
                    id: 1,
                    title: "Natt - Plateforme Digitale de Tontine 🇸🇳",
                    description: "Application PWA fintech qui digitalise les tontines (épargne rotative) au Sénégal. Architecture production-ready avec Docker, CI/CD, intégration Wave & Orange Money, notifications WhatsApp et push.",
                    image: "https://via.placeholder.com/400x300/4A90E2/ffffff?text=Tontine+Digital",
                    category: "web",
                    tags: ["React", "Node.js", "MongoDB", "Docker", "PWA", "GitHub Actions", "Wave API"],
                    demoUrl: "",
                    githubUrl: "https://github.com/kmbamba/Tontine-Digital",
                    featured: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    title: "Infrastructure AWS avec Terraform",
                    description: "Déploiement automatisé d'une architecture Bastion Host + Web Server sur AWS. Infrastructure as Code avec Terraform, VPC, Security Groups, et configuration complète.",
                    image: "https://via.placeholder.com/400x300/FF9900/ffffff?text=Terraform+AWS",
                    category: "backend",
                    tags: ["Terraform", "AWS", "DevOps", "IaC", "EC2", "VPC"],
                    demoUrl: "",
                    githubUrl: "https://github.com/kmbamba/Terraform-Aws",
                    featured: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    title: "Portfolio Full Stack",
                    description: "Portfolio professionnel moderne avec panel d'administration complet pour gérer dynamiquement les projets, certifications et compétences.",
                    image: "https://via.placeholder.com/400x300/667eea/ffffff?text=Portfolio",
                    category: "web",
                    tags: ["React", "Express.js", "Node.js", "API REST", "Vercel"],
                    demoUrl: "",
                    githubUrl: "https://github.com/kmbamba/portfolio-full-stack",
                    featured: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    title: "Minibank - Système Bancaire",
                    description: "Application de gestion bancaire avec fonctionnalités de comptes, transactions, et sécurité avancée.",
                    image: "https://via.placeholder.com/400x300/50C878/ffffff?text=Minibank",
                    category: "web",
                    tags: ["Node.js", "Express", "MongoDB", "JWT"],
                    demoUrl: "",
                    githubUrl: "https://github.com/kmbamba/Minibank",
                    featured: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 5,
                    title: "Maguita Skin - E-commerce Cosmétique",
                    description: "Plateforme e-commerce spécialisée dans les produits cosmétiques avec système de paiement intégré et gestion des stocks.",
                    image: "https://via.placeholder.com/400x300/FF6B6B/ffffff?text=Maguita+Skin",
                    category: "web",
                    tags: ["React", "Node.js", "E-commerce", "Stripe"],
                    demoUrl: "",
                    githubUrl: "https://github.com/kmbamba/maguita-skin",
                    featured: false,
                    createdAt: new Date().toISOString()
                }
            ],
            certifications: [
                {
                    id: 1,
                    name: "DevOps & Cloud Computing",
                    organization: "Formation Continue",
                    date: "2024",
                    credentialId: "",
                    credentialUrl: "",
                    image: "https://via.placeholder.com/200x150/FF9900/ffffff?text=DevOps",
                    description: "Formation en pratiques DevOps, CI/CD, Docker, et Cloud AWS"
                },
                {
                    id: 2,
                    name: "Full Stack JavaScript",
                    organization: "Formation Intensive",
                    date: "2023",
                    credentialId: "",
                    credentialUrl: "",
                    image: "https://via.placeholder.com/200x150/F7DF1E/ffffff?text=JavaScript",
                    description: "Maîtrise complète de la stack MERN (MongoDB, Express, React, Node.js)"
                },
                {
                    id: 3,
                    name: "Infrastructure as Code",
                    organization: "Terraform & AWS",
                    date: "2024",
                    credentialId: "",
                    credentialUrl: "",
                    image: "https://via.placeholder.com/200x150/7B42BC/ffffff?text=Terraform",
                    description: "Expertise en Infrastructure as Code avec Terraform sur AWS"
                }
            ],
            skills: [
                {
                    category: "Frontend",
                    icon: "fas fa-laptop-code",
                    items: [
                        { name: "React.js", level: 85 },
                        { name: "JavaScript (ES6+)", level: 90 },
                        { name: "HTML/CSS", level: 90 },
                        { name: "Tailwind CSS", level: 80 },
                        { name: "Vite", level: 75 }
                    ]
                },
                {
                    category: "Backend & Database",
                    icon: "fas fa-server",
                    items: [
                        { name: "Node.js", level: 90 },
                        { name: "Express.js", level: 90 },
                        { name: "MongoDB", level: 85 },
                        { name: "Mongoose", level: 85 },
                        { name: "REST API", level: 90 }
                    ]
                },
                {
                    category: "DevOps & Cloud",
                    icon: "fas fa-cloud",
                    items: [
                        { name: "Docker", level: 85 },
                        { name: "GitHub Actions (CI/CD)", level: 80 },
                        { name: "Terraform", level: 75 },
                        { name: "AWS (EC2, VPC)", level: 75 },
                        { name: "Vercel/Render", level: 80 }
                    ]
                },
                {
                    category: "Outils & Méthodologies",
                    icon: "fas fa-tools",
                    items: [
                        { name: "Git/GitHub", level: 95 },
                        { name: "JWT & Auth", level: 85 },
                        { name: "PWA", level: 80 },
                        { name: "Agile/Scrum", level: 75 },
                        { name: "SonarQube", level: 70 }
                    ]
                }
            ],
            experience: [
                {
                    id: 1,
                    type: "work",
                    title: "Développeur Full Stack & DevOps",
                    company: "Projets Personnels",
                    period: "2023 - Présent",
                    description: "Développement d'applications web complètes avec architecture production-ready, CI/CD, et déploiement cloud.",
                    achievements: [
                        "Développement de Natt (Tontine Digital) : PWA MERN avec intégration Wave/Orange Money, Docker, GitHub Actions",
                        "Infrastructure AWS avec Terraform : Déploiement IaC complet (VPC, EC2, Security Groups)",
                        "Mise en place de pipelines CI/CD avec SonarQube, Trivy, et déploiements automatisés",
                        "Développement d'APIs REST sécurisées avec JWT, rate limiting, et validation"
                    ]
                },
                {
                    id: 2,
                    type: "education",
                    title: "Formation Développeur Full Stack",
                    company: "Auto-formation & Projets Pratiques",
                    period: "2022 - 2023",
                    description: "Formation intensive en développement web moderne avec focus sur les technologies JavaScript et DevOps.",
                    achievements: [
                        "Maîtrise de la stack MERN (MongoDB, Express.js, React, Node.js)",
                        "Apprentissage des pratiques DevOps (Docker, CI/CD, Cloud)",
                        "Développement de 5+ projets complets end-to-end",
                        "Apprentissage continu des nouvelles technologies et best practices"
                    ]
                }
            ],
            profile: {
                name: "Khadim Mbaye",
                title: "Cloud & DevOps Engineer Junior",
                bio: "Cloud & DevOps junior certifié AWS Cloud Practitioner (SAA-C03 en préparation), spécialisé en Terraform, Kubernetes/EKS et CI/CD sécurisé. J'ai conçu et déployé de bout en bout un pipeline DevSecOps sur AWS EKS avec supervision Prometheus/Grafana. Développeur principal de Natt, plateforme fintech de tontine digitale (MERN) pour l'UEMOA.",
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
    }

    // Sauvegarder les données (pour JSON)
    async saveToFile() {
        if (this.type === 'json') {
            try {
                const fs = require('fs');
                const path = require('path');
                const dataPath = path.join(__dirname, 'data.json');
                fs.writeFileSync(dataPath, JSON.stringify(this.data, null, 2));
                console.log('💾 Data saved to data.json');
            } catch (error) {
                console.error('❌ Error saving data:', error.message);
            }
        }
    }

    // Obtenir toutes les données
    async getAllData() {
        if (this.type === 'mongodb' && this.db) {
            try {
                const [projects, certifications, skills, experience, profile] = await Promise.all([
                    this.db.collection('projects').find().toArray(),
                    this.db.collection('certifications').find().toArray(),
                    this.db.collection('skills').find().toArray(),
                    this.db.collection('experience').find().toArray(),
                    this.db.collection('profile').findOne()
                ]);
                return { projects, certifications, skills, experience, profile };
            } catch (error) {
                console.error('Error fetching data from MongoDB:', error);
                return this.data;
            }
        }
        return this.data;
    }

    // Obtenir une collection
    async getCollection(collectionName) {
        if (this.type === 'mongodb' && this.db) {
            try {
                return await this.db.collection(collectionName).find().toArray();
            } catch (error) {
                console.error(`Error fetching ${collectionName}:`, error);
                return this.data[collectionName] || [];
            }
        }
        return this.data[collectionName] || [];
    }

    // Ajouter un élément
    async addItem(collectionName, item) {
        if (this.type === 'mongodb' && this.db) {
            try {
                const result = await this.db.collection(collectionName).insertOne(item);
                return { ...item, _id: result.insertedId };
            } catch (error) {
                console.error(`Error adding item to ${collectionName}:`, error);
            }
        }
        
        // In-memory or JSON
        if (!this.data[collectionName]) {
            this.data[collectionName] = [];
        }
        this.data[collectionName].push(item);
        await this.saveToFile();
        return item;
    }

    // Mettre à jour un élément
    async updateItem(collectionName, id, updates) {
        if (this.type === 'mongodb' && this.db) {
            try {
                await this.db.collection(collectionName).updateOne(
                    { id: parseInt(id) },
                    { $set: updates }
                );
                return true;
            } catch (error) {
                console.error(`Error updating item in ${collectionName}:`, error);
                return false;
            }
        }
        
        // In-memory or JSON
        const index = this.data[collectionName].findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            this.data[collectionName][index] = { ...this.data[collectionName][index], ...updates };
            await this.saveToFile();
            return true;
        }
        return false;
    }

    // Supprimer un élément
    async deleteItem(collectionName, id) {
        if (this.type === 'mongodb' && this.db) {
            try {
                await this.db.collection(collectionName).deleteOne({ id: parseInt(id) });
                return true;
            } catch (error) {
                console.error(`Error deleting item from ${collectionName}:`, error);
                return false;
            }
        }
        
        // In-memory or JSON
        const index = this.data[collectionName].findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            this.data[collectionName].splice(index, 1);
            await this.saveToFile();
            return true;
        }
        return false;
    }

    // Mettre à jour le profil
    async updateProfile(updates) {
        if (this.type === 'mongodb' && this.db) {
            try {
                await this.db.collection('profile').updateOne(
                    {},
                    { $set: updates },
                    { upsert: true }
                );
                return true;
            } catch (error) {
                console.error('Error updating profile:', error);
                return false;
            }
        }
        
        // In-memory or JSON
        this.data.profile = { ...this.data.profile, ...updates };
        await this.saveToFile();
        return true;
    }

    // Fermer la connexion
    async close() {
        if (this.type === 'mongodb' && this.client) {
            await this.client.close();
            console.log('MongoDB connection closed');
        }
    }
}

// Exporter une instance unique
const database = new Database();

module.exports = database;
