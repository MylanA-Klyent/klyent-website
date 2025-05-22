// CONTACT PAGE SCRIPT
// ------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Animation des sections au scroll
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.contact-main, .faq-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    };
    
    // Validation du formulaire
    const initFormValidation = () => {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            const consentCheckbox = document.getElementById('consent');
            
            // Reset des erreurs
            const allInputs = [nameInput, emailInput, subjectInput, messageInput];
            allInputs.forEach(input => {
                input.classList.remove('error');
                const errorMsg = input.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
            
            // Validation du nom
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Veuillez entrer votre nom');
                isValid = false;
            }
            
            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Veuillez entrer une adresse email valide');
                isValid = false;
            }
            
            // Validation du sujet
            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'Veuillez entrer un sujet');
                isValid = false;
            }
            
            // Validation du message
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                showError(messageInput, 'Veuillez entrer un message (10 caractères minimum)');
                isValid = false;
            }
            
            // Validation du consentement
            if (!consentCheckbox.checked) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.innerText = 'Vous devez accepter la politique de confidentialité';
                errorMsg.style.color = 'var(--error)';
                errorMsg.style.fontSize = '0.8rem';
                errorMsg.style.marginTop = '0.25rem';
                
                consentCheckbox.parentElement.appendChild(errorMsg);
                isValid = false;
            }
            
            if (isValid) {
                // Simuler l'envoi du formulaire
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                
                submitBtn.disabled = true;
                submitBtn.innerText = 'Envoi en cours...';
                
                // Simule une requête API (remplacer par un vrai appel API dans un environnement de production)
                setTimeout(() => {
                    // Réinitialiser le formulaire
                    contactForm.reset();
                    
                    // Afficher un message de succès
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerText = 'Votre message a été envoyé avec succès! Nous vous répondrons sous peu.';
                    successMessage.style.background = 'var(--success-bg)';
                    successMessage.style.color = 'var(--success)';
                    successMessage.style.padding = '1rem';
                    successMessage.style.borderRadius = '4px';
                    successMessage.style.marginTop = '1rem';
                    
                    // Insérer le message après le formulaire
                    contactForm.parentElement.insertBefore(successMessage, contactForm.nextSibling);
                    
                    // Rétablir le bouton
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    
                    // Supprimer le message après quelques secondes
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 0.5s ease';
                        
                        setTimeout(() => {
                            successMessage.remove();
                        }, 500);
                    }, 5000);
                }, 1500);
            }
        });
        
        // Fonction d'affichage des erreurs
        function showError(input, message) {
            input.classList.add('error');
            input.style.borderColor = 'var(--error)';
            
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.innerText = message;
            errorMsg.style.color = 'var(--error)';
            errorMsg.style.fontSize = '0.8rem';
            errorMsg.style.marginTop = '0.25rem';
            
            input.parentElement.appendChild(errorMsg);
        }
    };
    
    // FAQ accordéon
    const initFaqAccordion = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            // Masquer les réponses par défaut
            if (answer && !item.classList.contains('active')) {
                answer.style.display = 'none';
            }
            
            // Ajouter l'événement de clic
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Fermer tous les autres accordéons
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('p');
                            if (otherAnswer) {
                                otherAnswer.style.display = 'none';
                                otherAnswer.style.maxHeight = '0';
                            }
                        }
                    });
                    
                    // Basculer l'état actuel
                    if (isActive) {
                        item.classList.remove('active');
                        answer.style.display = 'none';
                        answer.style.maxHeight = '0';
                    } else {
                        item.classList.add('active');
                        answer.style.display = 'block';
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
                
                // Ajouter une icône pour indiquer l'interaction
                question.style.position = 'relative';
                question.style.cursor = 'pointer';
                question.style.paddingRight = '30px';
                
                const icon = document.createElement('span');
                icon.innerHTML = '+';
                icon.style.position = 'absolute';
                icon.style.right = '0';
                icon.style.top = '0';
                icon.style.fontSize = '1.2rem';
                icon.style.fontWeight = 'bold';
                icon.style.transition = 'transform 0.3s ease';
                
                question.appendChild(icon);
                
                // Mettre à jour l'icône lors du clic
                question.addEventListener('click', () => {
                    if (item.classList.contains('active')) {
                        icon.innerHTML = '−';
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.innerHTML = '+';
                        icon.style.transform = 'rotate(0)';
                    }
                });
            }
        });
    };
    
    // Initialiser toutes les fonctionnalités
    animateOnScroll();
    initFormValidation();
    initMap();
    initFaqAccordion();
    
    // Ajouter des variables CSS pour les couleurs d'erreur et de succès si elles n'existent pas déjà
    const root = document.documentElement;
    
    if (!getComputedStyle(root).getPropertyValue('--error')) {
        root.style.setProperty('--error', '#e74c3c');
        root.style.setProperty('--error-bg', '#fdecea');
        root.style.setProperty('--success', '#2ecc71');
        root.style.setProperty('--success-bg', '#e8f8f0');
    }
}); 