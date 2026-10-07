const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Configuration upload d'images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Importer le module database
const database = require('./database');

// Initialiser la base de données
database.connect().then(() => {
    console.log('✅ Database connected successfully');
}).catch(err => {
    console.error('❌ Database connection failed:', err);
});

// ===== ROUTE D'UPLOAD D'IMAGE =====
app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ 
            success: true, 
            url: imageUrl,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// ===== API ROUTES =====

// GET - Récupérer toutes les données du profil
app.get('/api/profile', async (req, res) => {
    try {
        const data = await database.getAllData();
        res.json(data.profile || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Mettre à jour le profil
app.put('/api/profile', async (req, res) => {
    try {
        await database.updateProfile(req.body);
        res.json({ success: true, profile: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Récupérer tous les projets
app.get('/api/projects', async (req, res) => {
    try {
        console.log('Fetching projects...');
        const { category, featured } = req.query;
        let projects = await database.getCollection('projects');
        console.log(`Found ${projects.length} projects`);
        
        if (category && category !== 'all') {
            projects = projects.filter(p => p.category === category);
        }
        
        if (featured === 'true') {
            projects = projects.filter(p => p.featured);
        }
        
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET - Récupérer un projet par ID
app.get('/api/projects/:id', async (req, res) => {
    try {
        const projects = await database.getCollection('projects');
        const project = projects.find(p => p.id === parseInt(req.params.id));
        if (!project) {
            return res.status(404).json({ error: 'Projet non trouvé' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Créer un nouveau projet
app.post('/api/projects', async (req, res) => {
    try {
        const projects = await database.getCollection('projects');
        const newProject = {
            id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
            ...req.body,
            createdAt: new Date().toISOString()
        };
        await database.addItem('projects', newProject);
        res.status(201).json({ success: true, project: newProject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Mettre à jour un projet
app.put('/api/projects/:id', async (req, res) => {
    try {
        await database.updateItem('projects', req.params.id, req.body);
        res.json({ success: true, project: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - Supprimer un projet
app.delete('/api/projects/:id', async (req, res) => {
    try {
        await database.deleteItem('projects', req.params.id);
        res.json({ success: true, message: 'Projet supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Récupérer toutes les certifications
app.get('/api/certifications', async (req, res) => {
    try {
        const certifications = await database.getCollection('certifications');
        res.json(certifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Créer une nouvelle certification
app.post('/api/certifications', async (req, res) => {
    try {
        const certifications = await database.getCollection('certifications');
        const newCert = {
            id: certifications.length > 0 ? Math.max(...certifications.map(c => c.id)) + 1 : 1,
            ...req.body
        };
        await database.addItem('certifications', newCert);
        res.status(201).json({ success: true, certification: newCert });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Mettre à jour une certification
app.put('/api/certifications/:id', async (req, res) => {
    try {
        await database.updateItem('certifications', req.params.id, req.body);
        res.json({ success: true, certification: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - Supprimer une certification
app.delete('/api/certifications/:id', async (req, res) => {
    try {
        await database.deleteItem('certifications', req.params.id);
        res.json({ success: true, message: 'Certification supprimée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Récupérer toutes les compétences
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await database.getCollection('skills');
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Mettre à jour les compétences
app.put('/api/skills', async (req, res) => {
    try {
        // Pour skills, on remplace tout le tableau
        const data = await database.getAllData();
        data.skills = req.body;
        res.json({ success: true, skills: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Récupérer toutes les expériences
app.get('/api/experience', async (req, res) => {
    try {
        const experience = await database.getCollection('experience');
        res.json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Créer une nouvelle expérience
app.post('/api/experience', async (req, res) => {
    try {
        const experience = await database.getCollection('experience');
        const newExp = {
            id: experience.length > 0 ? Math.max(...experience.map(e => e.id)) + 1 : 1,
            ...req.body
        };
        await database.addItem('experience', newExp);
        res.status(201).json({ success: true, experience: newExp });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Mettre à jour une expérience
app.put('/api/experience/:id', async (req, res) => {
    try {
        await database.updateItem('experience', req.params.id, req.body);
        res.json({ success: true, experience: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - Supprimer une expérience
app.delete('/api/experience/:id', async (req, res) => {
    try {
        await database.deleteItem('experience', req.params.id);
        res.json({ success: true, message: 'Expérience supprimée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Récupérer toutes les données
app.get('/api/data', async (req, res) => {
    try {
        const data = await database.getAllData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Envoyer un message de contact
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Ici vous pouvez intégrer un service d'email
    console.log('Message reçu:', { name, email, subject, message });
    
    res.json({ 
        success: true, 
        message: 'Message envoyé avec succès !' 
    });
});

// POST - Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    const adminUsername = 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (username === adminUsername && password === adminPassword) {
        // Generate JWT token
        const token = jwt.sign(
            { username, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            success: true,
            token,
            message: 'Connexion réussie'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Identifiants incorrects'
        });
    }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token invalide' });
    }
}

// Serve index.html for the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve admin page (redirect to login if no token)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Quelque chose s\'est mal passé !' });
});

// Start server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        console.log(`📊 Admin accessible sur http://localhost:${PORT}/admin`);
        console.log(`☁️  Database: ${process.env.DB_TYPE}`);
    });
}

// Export for Vercel
module.exports = app;
