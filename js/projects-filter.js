/**
 * Filtrage des projets sur la page projets
 */
document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments nécessaires
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Fonction pour filtrer les projets
    function filterProjects(category) {
        projectCards.forEach(card => {
            // Récupérer la catégorie du projet
            const cardCategory = card.getAttribute('data-category');
            
            // Masquer ou afficher le projet en fonction du filtre
            if (category === 'all' || cardCategory === category) {
                // Ajouter une classe pour l'animation de fade-in
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.classList.add('visible');
                }, 10);
            } else {
                card.classList.remove('visible');
                card.classList.add('hidden');
            }
        });
    }
    
    // Ajouter des écouteurs d'événements aux boutons de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Récupérer la catégorie du filtre
            const filterValue = button.getAttribute('data-filter');
            
            // Filtrer les projets
            filterProjects(filterValue);
        });
    });
    
    // Initialiser avec tous les projets visibles
    projectCards.forEach(card => {
        card.classList.add('visible');
    });
    
    // Effet d'apparition au scroll pour les cartes de projet
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }, 100);
            }
        });
    }, { threshold: 0.1 });
    
    // Observer chaque carte de projet
    projectCards.forEach(card => {
        observer.observe(card);
        card.style.opacity = '0';
        card.classList.add('project-card-animated');
    });
    
    // Animation au survol des tags technologiques
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-5px)';
            tag.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
            tag.style.boxShadow = 'none';
        });
    });
    
    // Animation de survol des cartes de témoignages
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            card.style.borderColor = 'var(--accent-color)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
            card.style.borderColor = 'var(--border-color)';
        });
    });
    
    // Animation pour les boutons de filtre
    filterButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active')) {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active')) {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            }
        });
    });
});

// Ajouter des styles CSS pour l'animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .project-card-animated {
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes appear {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}); 