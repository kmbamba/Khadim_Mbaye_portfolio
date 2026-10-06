// ===== DYNAMIC DATA LOADING =====
const API_URL = window.location.origin + '/api';

console.log('🔧 API URL:', API_URL);

// ===== LOAD PROFILE DATA =====
async function loadProfileData() {
    try {
        console.log('📡 Chargement du profil...');
        const response = await fetch(`${API_URL}/profile`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const profile = await response.json();
        console.log('✅ Profil chargé:', profile);
        
        // Update hero section
        document.querySelector('.hero-title .highlight').textContent = profile.name;
        document.querySelector('.typing-text').setAttribute('data-titles', JSON.stringify([
            profile.title,
            'Développeur Frontend',
            'Développeur Backend',
            'Créateur Web'
        ]));
        
        // Update about section
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            aboutText.querySelector('p').textContent = profile.bio;
        }
        
        // Update stats
        if (profile.stats) {
            document.querySelectorAll('.stat h3')[0].textContent = profile.stats.experience;
            document.querySelectorAll('.stat h3')[1].textContent = profile.stats.projects;
            document.querySelectorAll('.stat h3')[2].textContent = profile.stats.technologies;
        }
        
        // Update contact info
        document.querySelectorAll('.contact-details a')[0].href = `mailto:${profile.email}`;
        document.querySelectorAll('.contact-details a')[0].textContent = profile.email;
        document.querySelectorAll('.contact-details a')[1].href = `tel:${profile.phone}`;
        document.querySelectorAll('.contact-details a')[1].textContent = profile.phone;
        document.querySelectorAll('.contact-details p')[0].textContent = profile.location;
        
        // Update social links
        const socialLinks = document.querySelectorAll('.social-links a');
        if (socialLinks.length >= 3) {
            socialLinks[0].href = profile.github;
            socialLinks[1].href = profile.linkedin;
            socialLinks[2].href = `mailto:${profile.email}`;
        }
        
        // Update footer
        document.querySelector('.footer p').textContent = `© 2024 ${profile.name}. Tous droits réservés.`;
        
    } catch (error) {
        console.error('❌ Erreur chargement profil:', error);
    }
}

// ===== LOAD PROJECTS =====
async function loadProjects() {
    try {
        console.log('📡 Chargement des projets...');
        const response = await fetch(`${API_URL}/projects`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        console.log('✅ Projets chargés:', projects.length, 'projets');
        
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) {
            console.error('❌ Element .projects-grid non trouvé');
            return;
        }
        
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn-icon" aria-label="Voir le projet">
                            <i class="fas fa-external-link-alt"></i>
                        </a>` : ''}
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn-icon" aria-label="Voir le code">
                            <i class="fab fa-github"></i>
                        </a>` : ''}
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        console.log('✅ Projets affichés dans le DOM');
        
        // Reinitialize project filters
        initializeProjectFilters();
        
    } catch (error) {
        console.error('❌ Erreur chargement projets:', error);
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = '<p style="text-align: center; color: #ff0000;">Erreur lors du chargement des projets. Veuillez rafraîchir la page.</p>';
        }
    }
}

// ===== LOAD SKILLS =====
async function loadSkills() {
    try {
        console.log('📡 Chargement des compétences...');
        const response = await fetch(`${API_URL}/skills`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const skills = await response.json();
        console.log('✅ Compétences chargées:', skills.length, 'catégories');
        
        const skillsGrid = document.querySelector('.skills-grid');
        if (!skillsGrid) {
            console.error('❌ Element .skills-grid non trouvé');
            return;
        }
        
        skillsGrid.innerHTML = skills.map(category => `
            <div class="skill-category">
                <h3><i class="${category.icon}"></i> ${category.category}</h3>
                <div class="skill-items">
                    ${category.items.map(skill => `
                        <div class="skill-item">
                            <div class="skill-info">
                                <span>${skill.name}</span>
                                <span>${skill.level}%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 0" data-width="${skill.level}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        console.log('✅ Compétences affichées dans le DOM');
        
        // Reinitialize skill animations
        animateSkillBars();
        
    } catch (error) {
        console.error('❌ Erreur chargement compétences:', error);
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = '<p style="text-align: center; color: #ff0000;">Erreur lors du chargement des compétences.</p>';
        }
    }
}

// ===== LOAD EXPERIENCE =====
async function loadExperience() {
    try {
        console.log('📡 Chargement des expériences...');
        const response = await fetch(`${API_URL}/experience`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const experiences = await response.json();
        console.log('✅ Expériences chargées:', experiences.length, 'entrées');
        
        const timeline = document.querySelector('.timeline');
        if (!timeline) {
            console.error('❌ Element .timeline non trouvé');
            return;
        }
        
        timeline.innerHTML = experiences.map((exp, index) => `
            <div class="timeline-item">
                <div class="timeline-icon">
                    <i class="fas fa-${exp.type === 'work' ? 'briefcase' : exp.type === 'education' ? 'graduation-cap' : 'certificate'}"></i>
                </div>
                <div class="timeline-content">
                    <h3>${exp.title}</h3>
                    <h4>${exp.company}</h4>
                    <span class="timeline-date">${exp.period}</span>
                    <p>${exp.description}</p>
                    ${exp.achievements && exp.achievements.length > 0 ? `
                        <ul>
                            ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </div>
        `).join('');
        
        console.log('✅ Expériences affichées dans le DOM');
        
    } catch (error) {
        console.error('❌ Erreur chargement expériences:', error);
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            timeline.innerHTML = '<p style="text-align: center; color: #ff0000;">Erreur lors du chargement des expériences.</p>';
        }
    }
}

// ===== LOAD CERTIFICATIONS SECTION =====
async function loadCertifications() {
    try {
        console.log('📡 Chargement des certifications...');
        const response = await fetch(`${API_URL}/certifications`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const certifications = await response.json();
        console.log('✅ Certifications chargées:', certifications.length, 'entrées');
        
        // Find certifications grid
        const certificationsGrid = document.querySelector('.certifications-grid');
        if (!certificationsGrid) {
            console.error('❌ Element .certifications-grid non trouvé');
            return;
        }
        
        // Display certifications as cards
        certificationsGrid.innerHTML = certifications.map(cert => `
            <div class="certification-card">
                <div class="certification-badge">
                    ${cert.image ? `<img src="${cert.image}" alt="${cert.name}">` : '<i class="fas fa-certificate"></i>'}
                </div>
                <h3>${cert.name}</h3>
                <h4>${cert.organization}</h4>
                <span class="certification-date">${cert.date}</span>
                <p>${cert.description || ''}</p>
                ${cert.credentialId ? `<p style="font-size: 0.85rem; color: #999;"><strong>ID:</strong> ${cert.credentialId}</p>` : ''}
                ${cert.credentialUrl ? `<a href="${cert.credentialUrl}" target="_blank" class="certification-link">
                    Vérifier <i class="fas fa-external-link-alt"></i>
                </a>` : ''}
            </div>
        `).join('');
        
        console.log('✅ Certifications affichées dans le DOM');
        
    } catch (error) {
        console.error('❌ Erreur chargement certifications:', error);
        const certificationsGrid = document.querySelector('.certifications-grid');
        if (certificationsGrid) {
            certificationsGrid.innerHTML = '<p style="text-align: center; color: #ff0000;">Erreur lors du chargement des certifications.</p>';
        }
    }
}

// ===== INITIALIZE PROJECT FILTERS =====
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== ANIMATE SKILL BARS =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== CONTACT FORM WITH API =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert(`Merci ${formData.name} ! Votre message a été envoyé avec succès.`);
                contactForm.reset();
            } else {
                alert('Une erreur s\'est produite. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Une erreur s\'est produite. Veuillez réessayer.');
        }
    });
}

// ===== INITIALIZE ALL DATA =====
async function initializePortfolio() {
    console.log('🚀 Initialisation du portfolio...');
    console.log('📍 Document ready state:', document.readyState);
    
    try {
        await Promise.all([
            loadProfileData(),
            loadProjects(),
            loadSkills(),
            loadExperience(),
            loadCertifications()
        ]);
        
        console.log('✅ Toutes les données ont été chargées avec succès!');
        
        // Trigger scroll animations
        window.dispatchEvent(new Event('scroll'));
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
    }
}

// ===== LOAD ON PAGE READY =====
if (document.readyState === 'loading') {
    console.log('⏳ Document en cours de chargement, attente de DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    console.log('✅ Document déjà chargé, initialisation immédiate...');
    initializePortfolio();
}
