/**
 * Fichier principal - Point d'entrée de l'application
 * Importe et initialise tous les modules
 */
import { initTheme, toggleTheme } from './theme-manager.js';
import { initMobileMenu } from './mobile-menu.js';
import { onDOMReady, debounce } from './utils.js';

// Fonction principale d'initialisation
function initApp() {
    console.log('Initialisation de l\'application...');
    
    // Initialisation du gestionnaire de thème
    initTheme(); // Initialiser explicitement le thème
    
    // Initialisation du menu mobile
    initMobileMenu();
    
    // Ajout de l'écouteur pour le bouton de changement de thème (utilisation de la délégation)
    document.addEventListener('click', function(event) {
        // Remonter dans le DOM pour trouver un parent .theme-toggle
        const toggleButton = event.target.closest('.theme-toggle');
        if (toggleButton) {
            console.log('Clic sur le bouton de thème détecté via délégation!');
            toggleTheme(); // Appelle la fonction importée pour changer le thème
        }
    });
    
    // Initialiser l'adaptation du logo au thème (si nécessaire)
    // initLogoThemeAdapter(); // Cette fonction semble obsolète car le logo est SVG maintenant
    
    // Gestion des événements de redimensionnement (optionnel)
    // window.addEventListener('resize', debounce(() => {
    //     console.log('Fenêtre redimensionnée');
    // }, 250));
    
    console.log('Application initialisée avec succès!');
}

// Lancer l'initialisation une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', initApp);

// Exporter les fonctions pour l'utilisation dans d'autres modules (si nécessaire)
export { initApp };


/* Fonction pour adapter le logo au thème - Semble obsolète avec le logo SVG actuel
function initLogoThemeAdapter() {
    const updateLogoColors = () => {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        console.log('État du thème détecté:', isDarkMode ? 'sombre' : 'clair');
        
        const logos = document.querySelectorAll('img.logo-img'); // Cible les anciennes images
        
        logos.forEach(logo => {
            // Ajuster les classes en fonction du thème
            if (isDarkMode) {
                logo.classList.add('dark-logo');
                logo.classList.remove('light-logo');
            } else {
                logo.classList.add('light-logo');
                logo.classList.remove('dark-logo');
            }
        });
    };
    
    // Observer les changements de thème
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'data-theme') {
                console.log('Changement de thème détecté:', document.documentElement.getAttribute('data-theme'));
                updateLogoColors();
            }
        });
    });
    
    // Surveiller les changements d'attribut sur l'élément html
    observer.observe(document.documentElement, { attributes: true });
    
    // Appliquer les couleurs initiales
    updateLogoColors();
}
*/

// Gestion du thème clair/sombre
document.addEventListener('DOMContentLoaded', () => {
  // Initialisation du thème
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  let currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Mise à jour du texte du bouton en fonction du thème actuel
  updateThemeToggleText();
  
  // Gestionnaire d'événement pour le bouton de changement de thème
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggleText();
  });
  
  function updateThemeToggleText() {
    themeToggle.textContent = currentTheme === 'dark' ? 'Mode Clair' : 'Mode Sombre';
  }
  
  // Animation au scroll des sections
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.card');
  
  // Attribuer des indices aux cartes pour l'animation séquentielle
  cards.forEach((card, index) => {
    card.style.setProperty('--card-index', index % 4);  // Réinitialise pour chaque groupe de 4
  });
  
  // Observer les sections pour les animations au scroll
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Effet de suivi du curseur
  const cursorEffect = document.createElement('div');
  cursorEffect.classList.add('cursor-effect');
  
  // N'activer l'effet que sur les écrans desktop
  if (window.innerWidth >= 992) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Mettre à jour la position de l'effet après le curseur
      document.body.style.setProperty('--cursor-x', `${mouseX}px`);
      document.body.style.setProperty('--cursor-y', `${mouseY}px`);
      
      // Animation CSS pour suivre le curseur
      requestAnimationFrame(() => {
        document.body.style.setProperty('--cursor-x', `${mouseX}px`);
        document.body.style.setProperty('--cursor-y', `${mouseY}px`);
      });
    });
  }
  
  // Ajout d'une classe spéciale sur les cartes et boutons pour un effet subtil
  const interactiveElements = document.querySelectorAll('.card, .btn, h2, .nav-links a');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      document.body.style.setProperty('--hover-active', '1');
    });
    
    element.addEventListener('mouseleave', () => {
      document.body.style.setProperty('--hover-active', '0');
    });
  });
  
  // Animation du code dans la section hero
  const codeVisual = document.querySelector('.code-visual');
  if (codeVisual) {
    // Animation de saisie progressive du code (effet typing)
    const codeText = codeVisual.textContent;
    codeVisual.textContent = '';
    
    let charIndex = 0;
    
    function typeCode() {
      if (charIndex < codeText.length) {
        codeVisual.textContent += codeText.charAt(charIndex);
        charIndex++;
        setTimeout(typeCode, Math.random() * 30 + 10); // Vitesse aléatoire pour un effet plus naturel
      }
    }
    
    // Commencer l'animation avec un délai
    setTimeout(() => {
      codeVisual.style.opacity = '0.35';
      typeCode();
    }, 1000);
  }
}); 