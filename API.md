# 📡 Documentation de l'API REST

Cette documentation décrit tous les endpoints disponibles pour gérer le contenu de votre portfolio.

## Base URL

```
http://localhost:3000/api          # Local
https://votre-site.vercel.app/api  # Production
```

## 📋 Table des Matières

- [Profile](#profile)
- [Projects](#projects)
- [Certifications](#certifications)
- [Skills](#skills)
- [Experience](#experience)
- [Contact](#contact)

---

## 👤 Profile

### Get Profile
Récupère les informations du profil.

```http
GET /api/profile
```

**Response:**
```json
{
  "name": "Votre Nom",
  "title": "Développeur Full Stack",
  "bio": "...",
  "email": "email@example.com",
  "phone": "+33 6 12 34 56 78",
  "location": "Paris, France",
  "github": "https://github.com/kmbamba",
  "linkedin": "https://linkedin.com/in/...",
  "twitter": "https://twitter.com/...",
  "stats": {
    "experience": "2+",
    "projects": "15+",
    "technologies": "10+"
  }
}
```

### Update Profile
Met à jour les informations du profil.

```http
PUT /api/profile
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Nouveau Nom",
  "title": "Nouveau Titre",
  "bio": "Nouvelle bio..."
}
```

**Response:**
```json
{
  "success": true,
  "profile": { ... }
}
```

---

## 📁 Projects

### Get All Projects
Récupère tous les projets.

```http
GET /api/projects
```

**Query Parameters:**
- `category` (optional): Filter by category (web, mobile, backend, all)
- `featured` (optional): Filter featured projects (true/false)

**Examples:**
```http
GET /api/projects?category=web
GET /api/projects?featured=true
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Plateforme E-commerce",
    "description": "...",
    "image": "https://...",
    "category": "web",
    "tags": ["React", "Node.js"],
    "demoUrl": "https://...",
    "githubUrl": "https://github.com/...",
    "featured": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Single Project
Récupère un projet spécifique par ID.

```http
GET /api/projects/:id
```

**Response:**
```json
{
  "id": 1,
  "title": "Plateforme E-commerce",
  "description": "...",
  ...
}
```

### Create Project
Crée un nouveau projet.

```http
POST /api/projects
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Mon Nouveau Projet",
  "description": "Description du projet",
  "image": "https://...",
  "category": "web",
  "tags": ["React", "Node.js"],
  "demoUrl": "https://...",
  "githubUrl": "https://github.com/...",
  "featured": false
}
```

**Response:**
```json
{
  "success": true,
  "project": { ... }
}
```

### Update Project
Met à jour un projet existant.

```http
PUT /api/projects/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Titre mis à jour",
  "description": "Nouvelle description"
}
```

**Response:**
```json
{
  "success": true,
  "project": { ... }
}
```

### Delete Project
Supprime un projet.

```http
DELETE /api/projects/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Projet supprimé"
}
```

---

## 🎓 Certifications

### Get All Certifications
Récupère toutes les certifications.

```http
GET /api/certifications
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "AWS Certified Developer",
    "organization": "Amazon Web Services",
    "date": "2024",
    "credentialId": "ABC123",
    "credentialUrl": "https://...",
    "image": "https://...",
    "description": "..."
  }
]
```

### Get Single Certification
Récupère une certification spécifique.

```http
GET /api/certifications/:id
```

### Create Certification
Crée une nouvelle certification.

```http
POST /api/certifications
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Nouvelle Certification",
  "organization": "Organisation",
  "date": "2024",
  "credentialId": "CERT123",
  "credentialUrl": "https://...",
  "image": "https://...",
  "description": "Description"
}
```

### Update Certification
Met à jour une certification.

```http
PUT /api/certifications/:id
Content-Type: application/json
```

### Delete Certification
Supprime une certification.

```http
DELETE /api/certifications/:id
```

---

## 💼 Skills

### Get All Skills
Récupère toutes les compétences.

```http
GET /api/skills
```

**Response:**
```json
[
  {
    "category": "Frontend",
    "icon": "fas fa-laptop-code",
    "items": [
      {
        "name": "HTML/CSS",
        "level": 90
      },
      {
        "name": "JavaScript",
        "level": 85
      }
    ]
  }
]
```

### Update Skills
Met à jour toutes les compétences.

```http
PUT /api/skills
Content-Type: application/json
```

**Request Body:**
```json
[
  {
    "category": "Frontend",
    "icon": "fas fa-laptop-code",
    "items": [...]
  }
]
```

---

## 📝 Experience

### Get All Experience
Récupère toutes les expériences.

```http
GET /api/experience
```

**Response:**
```json
[
  {
    "id": 1,
    "type": "work",
    "title": "Développeur Full Stack",
    "company": "Entreprise XYZ",
    "period": "2023 - Présent",
    "description": "...",
    "achievements": [
      "Achievement 1",
      "Achievement 2"
    ]
  }
]
```

### Create Experience
Crée une nouvelle expérience.

```http
POST /api/experience
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "work",
  "title": "Développeur Full Stack",
  "company": "Entreprise",
  "period": "2023 - Présent",
  "description": "...",
  "achievements": ["..."]
}
```

### Update Experience
Met à jour une expérience.

```http
PUT /api/experience/:id
Content-Type: application/json
```

### Delete Experience
Supprime une expérience.

```http
DELETE /api/experience/:id
```

---

## 📧 Contact

### Send Contact Message
Envoie un message de contact.

```http
POST /api/contact
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "subject": "Demande d'information",
  "message": "Bonjour, ..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message envoyé avec succès !"
}
```

---

## 📊 Get All Data

### Get Complete Dataset
Récupère toutes les données du portfolio.

```http
GET /api/data
```

**Response:**
```json
{
  "projects": [...],
  "certifications": [...],
  "skills": [...],
  "experience": [...],
  "profile": {...}
}
```

---

## 🔒 Error Responses

Toutes les erreurs suivent ce format :

```json
{
  "error": "Message d'erreur descriptif"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## 💡 Exemples d'Utilisation

### JavaScript (Fetch API)

```javascript
// Get all projects
fetch('http://localhost:3000/api/projects')
  .then(res => res.json())
  .then(data => console.log(data));

// Create a new project
fetch('http://localhost:3000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Mon Projet',
    description: 'Description',
    category: 'web',
    tags: ['React'],
    featured: false
  })
})
.then(res => res.json())
.then(data => console.log(data));

// Update a project
fetch('http://localhost:3000/api/projects/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Titre mis à jour'
  })
})
.then(res => res.json())
.then(data => console.log(data));

// Delete a project
fetch('http://localhost:3000/api/projects/1', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
```

### cURL

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Create a project
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Mon Projet","description":"...","category":"web"}'

# Update a project
curl -X PUT http://localhost:3000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Nouveau titre"}'

# Delete a project
curl -X DELETE http://localhost:3000/api/projects/1
```

---

## 🚀 Rate Limiting

Actuellement, aucune limitation de taux n'est implémentée. Pour un environnement de production, considérez l'ajout de rate limiting avec `express-rate-limit`.

## 🔐 Authentication

L'API est actuellement publique. Pour sécuriser l'accès au panel admin en production, implémentez :
- JWT Authentication
- Session-based Authentication
- OAuth2

## 📝 Notes

- Toutes les dates sont au format ISO 8601
- Les IDs sont des entiers auto-incrémentés
- Les réponses sont toujours au format JSON
- CORS est activé pour tous les domaines (à restreindre en production)
