/**
 * Gestionnaire de thème - Gère le basculement entre les modes clair et sombre
 */
class ThemeManager {
    constructor() {
        this.htmlElement = document.documentElement;
        this.toggleButtons = document.querySelectorAll('.theme-toggle'); // Sélectionner tous les boutons
        console.log('ThemeManager initialisé');
    }
    
    /**
     * Initialise le gestionnaire de thème
     */
    init() {
        console.log('Initialisation du gestionnaire de thème');
        this.loadSavedTheme();
        // Met à jour le texte du bouton initialement
        this.updateToggleButtonText();
        
        // Ajouter directement des écouteurs d'événements aux boutons de thème
        this.setupEventListeners();
    }
    
    /**
     * Configure les écouteurs d'événements sur les boutons de thème
     */
    setupEventListeners() {
        // Sélectionner à nouveau les boutons pour s'assurer qu'ils sont tous trouvés
        this.toggleButtons = document.querySelectorAll('.theme-toggle');
        
        // Ajouter un gestionnaire d'événement à chaque bouton
        this.toggleButtons.forEach(button => {
            if (button) {
                // Supprimer tout écouteur précédent pour éviter les doublons
                button.removeEventListener('click', this.toggleTheme.bind(this));
                // Ajouter le nouvel écouteur
                button.addEventListener('click', this.toggleTheme.bind(this));
                console.log('Écouteur d\'événement ajouté au bouton de thème:', button);
            }
        });
    }
    
    /**
     * Met à jour le texte de tous les boutons de thème
     */
    updateToggleButtonText() {
        const currentTheme = this.htmlElement.getAttribute('data-theme');
        const buttonText = currentTheme === 'dark' ? 'Mode Clair' : 'Mode Sombre';
        console.log(`Mise à jour du texte des boutons de thème à : ${buttonText}`);
        // S'assure de sélectionner les boutons à nouveau au cas où le DOM a changé (menu mobile)
        this.toggleButtons = document.querySelectorAll('.theme-toggle'); 
        this.toggleButtons.forEach(button => {
            if (button) { // Vérifie si le bouton existe encore
                 button.textContent = buttonText;
            }
        });
    }
    
    /**
     * Charge le thème sauvegardé ou utilise la préférence système
     */
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        console.log('Thème sauvegardé:', savedTheme);
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Vérifie si l'utilisateur a une préférence de thème au niveau du système
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            console.log('Préférence système pour le thème sombre:', prefersDarkScheme);
            
            if (prefersDarkScheme) {
                this.setTheme('dark');
            } else {
                this.setTheme('light');
            }
        }
    }
    
    /**
     * Bascule entre les thèmes clair et sombre
     */
    toggleTheme() {
        const currentTheme = this.htmlElement.getAttribute('data-theme');
        console.log('Basculement du thème actuel:', currentTheme);
        
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log('Nouveau thème:', newTheme);
        
        this.setTheme(newTheme);
        return newTheme; // Retourne le nouveau thème pour les tests
    }
    
    /**
     * Définit le thème et le sauvegarde dans le localStorage
     * @param {string} theme - 'light' ou 'dark'
     */
    setTheme(theme) {
        console.log('Application du thème:', theme);
        this.htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Met à jour le texte du bouton après avoir changé le thème
        this.updateToggleButtonText();
    }
}

// Créer une instance du gestionnaire de thème
const themeManager = new ThemeManager();

// Fonction d'initialisation pour être utilisée dans main.js
export function initTheme() {
    console.log('Fonction initTheme appelée');
    themeManager.init();
    
    // Vérifier les boutons après un court délai pour s'assurer que le DOM est complètement chargé
    setTimeout(() => {
        themeManager.setupEventListeners();
    }, 100);
}

// Fonction pour basculer le thème, à utiliser comme callback pour les événements
export function toggleTheme() {
    console.log('Fonction toggleTheme globale appelée');
    return themeManager.toggleTheme();
}

// Exporter également l'instance pour une utilisation directe
export default themeManager; 