// ===== API BASE URL =====
const API_URL = window.location.origin + '/api';

// ===== IMAGE UPLOAD HANDLER =====
async function handleImageUpload(fileInputId, urlInputId, previewId) {
    const fileInput = document.getElementById(fileInputId);
    const urlInput = document.getElementById(urlInputId);
    const preview = document.getElementById(previewId);
    
    const file = fileInput.files[0];
    if (!file) return;
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
    
    // Upload to server
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        if (result.success) {
            urlInput.value = window.location.origin + result.url;
            alert('Image uploadée avec succès !');
        } else {
            alert('Erreur lors de l\'upload');
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('Erreur lors de l\'upload');
    }
}

// Attach upload handlers
document.addEventListener('DOMContentLoaded', () => {
    const projectImageFile = document.getElementById('project-image-file');
    if (projectImageFile) {
        projectImageFile.addEventListener('change', () => {
            handleImageUpload('project-image-file', 'project-image', 'project-image-preview');
        });
    }
    
    const certImageFile = document.getElementById('certification-image-file');
    if (certImageFile) {
        certImageFile.addEventListener('change', () => {
            handleImageUpload('certification-image-file', 'certification-image', 'certification-image-preview');
        });
    }
});

// ===== NAVIGATION =====
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        
        // Update active menu item
        document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show section
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(section).classList.add('active');
    });
});

// ===== LOAD DASHBOARD STATS =====
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_URL}/data`);
        const data = await response.json();
        
        document.getElementById('stat-projects').textContent = data.projects.length;
        document.getElementById('stat-certifications').textContent = data.certifications.length;
        document.getElementById('stat-skills').textContent = data.skills.reduce((acc, cat) => acc + cat.items.length, 0);
        document.getElementById('stat-experience').textContent = data.experience.length;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// ===== PROJECTS =====
async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const projects = await response.json();
        
        const container = document.getElementById('projects-list');
        container.innerHTML = projects.map(project => `
            <div class="item-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Catégorie:</strong> ${project.category}</p>
                <p><strong>Tags:</strong> ${project.tags.join(', ')}</p>
                ${project.featured ? '<p><strong>⭐ Projet vedette</strong></p>' : ''}
                <div class="actions">
                    <button class="btn btn-primary" onclick="editProject(${project.id})">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-danger" onclick="deleteProject(${project.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function openProjectModal(project = null) {
    const modal = document.getElementById('project-modal');
    const form = document.getElementById('project-form');
    
    if (project) {
        document.getElementById('project-modal-title').textContent = 'Modifier le Projet';
        document.getElementById('project-id').value = project.id;
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-image').value = project.image || '';
        document.getElementById('project-category').value = project.category;
        document.getElementById('project-tags').value = project.tags.join(', ');
        document.getElementById('project-demo').value = project.demoUrl || '';
        document.getElementById('project-github').value = project.githubUrl || '';
        document.getElementById('project-featured').checked = project.featured || false;
    } else {
        document.getElementById('project-modal-title').textContent = 'Nouveau Projet';
        form.reset();
    }
    
    modal.classList.add('active');
}

async function editProject(id) {
    try {
        const response = await fetch(`${API_URL}/projects/${id}`);
        const project = await response.json();
        openProjectModal(project);
    } catch (error) {
        console.error('Error loading project:', error);
    }
}

async function deleteProject(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    
    try {
        await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
        await loadProjects();
        await loadDashboardStats();
    } catch (error) {
        console.error('Error deleting project:', error);
    }
}

document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('project-id').value;
    const data = {
        title: document.getElementById('project-title').value,
        description: document.getElementById('project-description').value,
        image: document.getElementById('project-image').value,
        category: document.getElementById('project-category').value,
        tags: document.getElementById('project-tags').value.split(',').map(t => t.trim()),
        demoUrl: document.getElementById('project-demo').value,
        githubUrl: document.getElementById('project-github').value,
        featured: document.getElementById('project-featured').checked
    };
    
    try {
        if (id) {
            await fetch(`${API_URL}/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            await fetch(`${API_URL}/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        
        closeModal('project-modal');
        await loadProjects();
        await loadDashboardStats();
    } catch (error) {
        console.error('Error saving project:', error);
    }
});

// ===== CERTIFICATIONS =====
async function loadCertifications() {
    try {
        const response = await fetch(`${API_URL}/certifications`);
        const certifications = await response.json();
        
        const container = document.getElementById('certifications-list');
        container.innerHTML = certifications.map(cert => `
            <div class="item-card">
                <h3>${cert.name}</h3>
                <p><strong>${cert.organization}</strong> - ${cert.date}</p>
                <p>${cert.description || ''}</p>
                ${cert.credentialId ? `<p><strong>ID:</strong> ${cert.credentialId}</p>` : ''}
                <div class="actions">
                    <button class="btn btn-primary" onclick="editCertification(${cert.id})">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-danger" onclick="deleteCertification(${cert.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading certifications:', error);
    }
}

function openCertificationModal(certification = null) {
    const modal = document.getElementById('certification-modal');
    const form = document.getElementById('certification-form');
    
    if (certification) {
        document.getElementById('certification-modal-title').textContent = 'Modifier la Certification';
        document.getElementById('certification-id').value = certification.id;
        document.getElementById('certification-name').value = certification.name;
        document.getElementById('certification-organization').value = certification.organization;
        document.getElementById('certification-date').value = certification.date;
        document.getElementById('certification-credential').value = certification.credentialId || '';
        document.getElementById('certification-url').value = certification.credentialUrl || '';
        document.getElementById('certification-image').value = certification.image || '';
        document.getElementById('certification-description').value = certification.description || '';
    } else {
        document.getElementById('certification-modal-title').textContent = 'Nouvelle Certification';
        form.reset();
    }
    
    modal.classList.add('active');
}

async function editCertification(id) {
    try {
        const response = await fetch(`${API_URL}/certifications`);
        const certifications = await response.json();
        const certification = certifications.find(cert => cert.id === parseInt(id));
        if (certification) {
            openCertificationModal(certification);
        } else {
            console.error('Certification not found');
        }
    } catch (error) {
        console.error('Error loading certification:', error);
    }
}

async function deleteCertification(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette certification ?')) return;
    
    try {
        await fetch(`${API_URL}/certifications/${id}`, { method: 'DELETE' });
        await loadCertifications();
        await loadDashboardStats();
    } catch (error) {
        console.error('Error deleting certification:', error);
    }
}

document.getElementById('certification-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('certification-id').value;
    const data = {
        name: document.getElementById('certification-name').value,
        organization: document.getElementById('certification-organization').value,
        date: document.getElementById('certification-date').value,
        credentialId: document.getElementById('certification-credential').value,
        credentialUrl: document.getElementById('certification-url').value,
        image: document.getElementById('certification-image').value,
        description: document.getElementById('certification-description').value
    };
    
    try {
        if (id) {
            await fetch(`${API_URL}/certifications/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            await fetch(`${API_URL}/certifications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        
        closeModal('certification-modal');
        await loadCertifications();
        await loadDashboardStats();
    } catch (error) {
        console.error('Error saving certification:', error);
    }
});

// ===== EXPERIENCE =====
async function loadExperience() {
    try {
        const response = await fetch(`${API_URL}/experience`);
        const experiences = await response.json();
        
        const container = document.getElementById('experience-list');
        container.innerHTML = experiences.map(exp => `
            <div class="item-card">
                <h3>${exp.title}</h3>
                <p><strong>${exp.company}</strong></p>
                <p><strong>Période:</strong> ${exp.period}</p>
                <p>${exp.description}</p>
                <div class="actions">
                    <button class="btn btn-primary" onclick="editExperience(${exp.id})">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-danger" onclick="deleteExperience(${exp.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading experience:', error);
    }
}

function openExperienceModal(experience = null) {
    const modal = document.getElementById('experience-modal');
    const form = document.getElementById('experience-form');
    
    if (experience) {
        document.getElementById('experience-modal-title').textContent = 'Modifier l\'Expérience';
        document.getElementById('experience-id').value = experience.id;
        document.getElementById('experience-type').value = experience.type;
        document.getElementById('experience-title').value = experience.title;
        document.getElementById('experience-company').value = experience.company;
        document.getElementById('experience-period').value = experience.period;
        document.getElementById('experience-description').value = experience.description || '';
        document.getElementById('experience-achievements').value = experience.achievements ? experience.achievements.join('\n') : '';
    } else {
        document.getElementById('experience-modal-title').textContent = 'Nouvelle Expérience';
        form.reset();
    }
    
    modal.classList.add('active');
}

async function editExperience(id) {
    try {
        const response = await fetch(`${API_URL}/experience`);
        const experiences = await response.json();
        const experience = experiences.find(exp => exp.id === parseInt(id));
        if (experience) {
            openExperienceModal(experience);
        } else {
            console.error('Experience not found');
        }
    } catch (error) {
        console.error('Error loading experience:', error);
    }
}

async function deleteExperience(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) return;
    
    try {
        await fetch(`${API_URL}/experience/${id}`, { method: 'DELETE' });
        await loadExperience();
        await loadDashboardStats();
    } catch (error) {
        console.error('Error deleting experience:', error);
    }
}

document.getElementById('experience-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('experience-id').value;
    const achievementsText = document.getElementById('experience-achievements').value;
    const data = {
        type: document.getElementById('experience-type').value,
        title: document.getElementById('experience-title').value,
        company: document.getElementById('experience-company').value,
        period: document.getElementById('experience-period').value,
        description: document.getElementById('experience-description').value,
        achievements: achievementsText ? achievementsText.split('\n').filter(a => a.trim()) : []
    };
    
    try {
        if (id) {
            await fetch(`${API_URL}/experience/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            await fetch(`${API_URL}/experience`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        
        closeModal('experience-modal');
        await loadExperience();
        await loadDashboardStats();
    } catch (error) {
        console.error('Error saving experience:', error);
    }
});

// ===== SKILLS =====
async function loadSkills() {
    try {
        const response = await fetch(`${API_URL}/skills`);
        const skills = await response.json();
        
        const container = document.getElementById('skills-list');
        container.innerHTML = skills.map((category, catIndex) => `
            <div class="item-card" style="grid-column: 1 / -1;">
                <h3><i class="${category.icon}"></i> ${category.category}</h3>
                ${category.items.map((skill, skillIndex) => `
                    <div class="form-group">
                        <label>${skill.name}</label>
                        <input type="range" min="0" max="100" value="${skill.level}" 
                               onchange="updateSkillLevel(${catIndex}, ${skillIndex}, this.value)">
                        <span>${skill.level}%</span>
                    </div>
                `).join('')}
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

async function updateSkillLevel(catIndex, skillIndex, level) {
    try {
        const response = await fetch(`${API_URL}/skills`);
        const skills = await response.json();
        
        skills[catIndex].items[skillIndex].level = parseInt(level);
        
        await fetch(`${API_URL}/skills`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(skills)
        });
    } catch (error) {
        console.error('Error updating skill:', error);
    }
}

// ===== PROFILE =====
async function loadProfile() {
    try {
        const response = await fetch(`${API_URL}/profile`);
        const profile = await response.json();
        
        const form = document.getElementById('profile-form');
        form.innerHTML = `
            <div class="form-group">
                <label>Nom complet</label>
                <input type="text" id="profile-name" value="${profile.name}">
            </div>
            <div class="form-group">
                <label>Titre</label>
                <input type="text" id="profile-title" value="${profile.title}">
            </div>
            <div class="form-group">
                <label>Bio</label>
                <textarea id="profile-bio">${profile.bio}</textarea>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="profile-email" value="${profile.email}">
            </div>
            <div class="form-group">
                <label>Téléphone</label>
                <input type="tel" id="profile-phone" value="${profile.phone}">
            </div>
            <div class="form-group">
                <label>Localisation</label>
                <input type="text" id="profile-location" value="${profile.location}">
            </div>
            <div class="form-group">
                <label>GitHub URL</label>
                <input type="url" id="profile-github" value="${profile.github}">
            </div>
            <div class="form-group">
                <label>LinkedIn URL</label>
                <input type="url" id="profile-linkedin" value="${profile.linkedin}">
            </div>
            <div class="form-group">
                <label>Twitter URL</label>
                <input type="url" id="profile-twitter" value="${profile.twitter}">
            </div>
            <button type="submit" class="btn btn-success">Enregistrer le profil</button>
        `;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {
                name: document.getElementById('profile-name').value,
                title: document.getElementById('profile-title').value,
                bio: document.getElementById('profile-bio').value,
                email: document.getElementById('profile-email').value,
                phone: document.getElementById('profile-phone').value,
                location: document.getElementById('profile-location').value,
                github: document.getElementById('profile-github').value,
                linkedin: document.getElementById('profile-linkedin').value,
                twitter: document.getElementById('profile-twitter').value
            };
            
            try {
                await fetch(`${API_URL}/profile`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                alert('Profil mis à jour avec succès !');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        });
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// ===== MODAL FUNCTIONS =====
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardStats();
    loadProjects();
    loadCertifications();
    loadSkills();
    loadExperience();
    loadProfile();
});
