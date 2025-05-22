/**
 * Fichier d'utilitaires contenant des fonctions réutilisables
 */

/**
 * Attend que le DOM soit prêt avant d'exécuter la fonction de callback
 * @param {Function} callback - Fonction à exécuter quand le DOM est prêt
 */
export function onDOMReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Applique un délai d'exécution (debounce) à une fonction
 * @param {Function} func - Fonction à exécuter
 * @param {number} wait - Délai en millisecondes
 * @returns {Function} Fonction avec délai
 */
export function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Vérifie si l'appareil est mobile
 * @returns {boolean} True si l'appareil est mobile
 */
export function isMobileDevice() {
    return window.innerWidth <= 768;
}

/**
 * Ajoute des classes à un élément
 * @param {HTMLElement} element - Élément DOM
 * @param {string|string[]} classes - Classe(s) à ajouter
 */
export function addClass(element, classes) {
    if (!element) return;
    
    if (Array.isArray(classes)) {
        element.classList.add(...classes);
    } else {
        element.classList.add(classes);
    }
}

/**
 * Supprime des classes d'un élément
 * @param {HTMLElement} element - Élément DOM
 * @param {string|string[]} classes - Classe(s) à supprimer
 */
export function removeClass(element, classes) {
    if (!element) return;
    
    if (Array.isArray(classes)) {
        element.classList.remove(...classes);
    } else {
        element.classList.remove(classes);
    }
}

/**
 * Bascule une classe sur un élément
 * @param {HTMLElement} element - Élément DOM
 * @param {string} className - Classe à basculer
 */
export function toggleClass(element, className) {
    if (!element) return;
    
    element.classList.toggle(className);
}

/**
 * Vérifie si un élément a une classe spécifique
 * @param {HTMLElement} element - Élément DOM
 * @param {string} className - Classe à vérifier
 * @returns {boolean} True si l'élément a la classe
 */
export function hasClass(element, className) {
    if (!element) return false;
    
    return element.classList.contains(className);
} 