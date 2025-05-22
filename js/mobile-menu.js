/**
 * Gestionnaire de menu mobile - Version simplifiée et robuste
 */

// Fonction principale d'initialisation du menu mobile
export function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    // État initial : menu fermé
    let menuOpen = false;
    
    // Point de rupture mobile (en pixels)
    const MOBILE_BREAKPOINT = 768;
    
    // Fonction pour vérifier si on est en mode mobile
    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }
    
    // Fonction pour ouvrir le menu
    function openMenu() {
        if (menuOpen || !isMobile()) return; // Ne rien faire si déjà ouvert ou si on n'est pas en mobile
        
        // 1. Mise à jour de l'état
        menuOpen = true;
        
        // 2. Modifier l'apparence du bouton (hamburger -> croix)
        mobileMenuBtn.classList.add('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        
        // 3. Afficher et configurer le menu mobile
        // Ajouter une classe spécifique au menu mobile pour pouvoir le styler différemment
        navLinks.classList.add('mobile-active');
        
        // Appliquer les styles du menu mobile
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0'; // S'assurer qu'il couvre toute la largeur
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'var(--surface-color)';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        navLinks.style.zIndex = '1000';
        navLinks.style.borderRadius = '0 0 8px 8px';
        
        // 4. Configurer les liens dans le menu mobile
        const navItems = navLinks.querySelectorAll('li');
        navItems.forEach(item => {
            item.style.margin = '0.5rem 0';
            item.style.width = '100%';
            
            const link = item.querySelector('a');
            if (link) {
                link.style.display = 'block';
                link.style.padding = '0.5rem 0';
                link.style.fontSize = '1rem';
                link.style.textAlign = 'center';
                link.style.width = '100%';
            }
        });
        
        // 5. Ajouter les actions de navigation si elles existent
        if (navActions) {
            // S'assurer qu'il n'y a pas déjà un conteneur d'actions
            const existingContainer = navLinks.querySelector('.mobile-actions-container');
            if (existingContainer) {
                navLinks.removeChild(existingContainer);
            }
            
            // Créer le conteneur pour les actions
            const mobileActionsContainer = document.createElement('div');
            mobileActionsContainer.className = 'mobile-actions-container';
            
            // Styles du conteneur
            mobileActionsContainer.style.display = 'flex';
            mobileActionsContainer.style.flexDirection = 'column';
            mobileActionsContainer.style.alignItems = 'center';
            mobileActionsContainer.style.width = '100%';
            mobileActionsContainer.style.marginTop = '1rem';
            mobileActionsContainer.style.paddingTop = '1rem';
            mobileActionsContainer.style.borderTop = '1px solid var(--border-color, #ddd)';
            
            // Cloner les actions
            const actionsClone = navActions.cloneNode(true);
            
            // Styles du clone
            actionsClone.style.display = 'flex';
            actionsClone.style.flexDirection = 'column';
            actionsClone.style.alignItems = 'center';
            actionsClone.style.width = '100%';
            actionsClone.style.gap = '0.5rem';
            
            // Configurer le bouton de thème s'il existe
            const themeToggle = actionsClone.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.style.margin = '0.5rem auto';
                themeToggle.style.width = '100%';
                themeToggle.style.maxWidth = '200px';
                themeToggle.style.padding = '0.5rem';
            }
            
            // Configurer le bouton d'action s'il existe
            const actionButton = actionsClone.querySelector('.btn');
            if (actionButton) {
                actionButton.style.width = '100%';
                actionButton.style.maxWidth = '200px';
                actionButton.style.textAlign = 'center';
                actionButton.style.margin = '0.5rem auto';
                actionButton.style.padding = '0.5rem 1rem';
            }
            
            // Ajouter le clone au conteneur et le conteneur au menu
            mobileActionsContainer.appendChild(actionsClone);
            navLinks.appendChild(mobileActionsContainer);
        }
        
        // Ajouter l'écouteur pour les clics extérieurs seulement quand le menu est ouvert
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
        }, 10);
    }
    
    // Fonction pour fermer le menu
    function closeMenu() {
        if (!menuOpen) return; // Ne rien faire si déjà fermé
        
        // 1. Mise à jour de l'état
        menuOpen = false;
        
        // 2. Modifier l'apparence du bouton (croix -> hamburger)
        mobileMenuBtn.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // 3. Masquer et réinitialiser le menu
        navLinks.classList.remove('mobile-active');
        
        // Réinitialiser tous les styles appliqués
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.right = '';
        navLinks.style.width = '';
        navLinks.style.backgroundColor = '';
        navLinks.style.padding = '';
        navLinks.style.boxShadow = '';
        navLinks.style.zIndex = '';
        navLinks.style.borderRadius = '';
        
        // 4. Réinitialiser les styles des liens
        const navItems = navLinks.querySelectorAll('li');
        navItems.forEach(item => {
            item.style.margin = '';
            item.style.width = '';
            
            const link = item.querySelector('a');
            if (link) {
                link.style.display = '';
                link.style.padding = '';
                link.style.fontSize = '';
                link.style.textAlign = '';
                link.style.width = '';
            }
        });
        
        // 5. Supprimer le conteneur des actions de navigation
        const mobileActionsContainer = navLinks.querySelector('.mobile-actions-container');
        if (mobileActionsContainer) {
            navLinks.removeChild(mobileActionsContainer);
        }
        
        // Supprimer l'écouteur de clics extérieurs quand le menu est fermé
        document.removeEventListener('click', handleOutsideClick);
    }
    
    // Gestionnaire pour les clics extérieurs
    function handleOutsideClick(event) {
        // Ne réagir que si le menu est ouvert et le clic est à l'extérieur du menu et du bouton
        if (menuOpen && 
            !navLinks.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            
            // Fermer le menu sans déclencher d'autres événements
            closeMenu();
        }
    }
    
    // Gestionnaire de clic sur le bouton du menu
    mobileMenuBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Gestionnaire de clic sur les liens du menu
    const menuLinks = navLinks.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile() && menuOpen) {
                closeMenu();
            }
        });
    });
    
    // Gestionnaire de redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        if (!isMobile() && menuOpen) {
            // Si on passe en mode desktop et que le menu mobile est ouvert, on le ferme
            closeMenu();
        } else if (isMobile()) {
            // S'assurer que le bouton est visible en mode mobile
            mobileMenuBtn.style.display = 'block';
        } else {
            // S'assurer que le bouton est caché en mode desktop
            mobileMenuBtn.style.display = '';
        }
    });
    
    // Appliquer les styles initiaux en fonction de la taille de l'écran
    if (isMobile()) {
        // En mode mobile au chargement, s'assurer que le menu est fermé
        closeMenu();
        mobileMenuBtn.style.display = 'block';
    } else {
        // En mode desktop au chargement
        mobileMenuBtn.style.display = 'none';
    }
}

// Export par défaut
export default initMobileMenu; 