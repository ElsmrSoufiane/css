
(function() {
    'use strict';
    
    // Configuration
    const SELECTORS = {
        total: '.ps-block--shopping-total .ps-block__content h3 span',
        container: '.ps-block--shopping-total'
    };
    
    // Constante pour le seuil
    const THRESHOLD = 1000;
    
    // Variable pour suivre si le popup a déjà été affiché
    let popupShown = false;
    
    // Fonction pour extraire le total du HTML
    function getTotalFromDOM() {
        const el = document.querySelector(SELECTORS.total);
        if (!el) return null;
        
        let text = el.textContent.trim();
        // Extrait le nombre (supprime tout sauf chiffres, point, virgule, tiret)
        let numberPart = text.replace(/[^\d,.-]/g, '').replace(',', '.');
        let total = parseFloat(numberPart);
        
        return isNaN(total) ? null : total;
    }
    
    // Fonction pour afficher le popup
    function showPopup() {
        // Vérifier si le popup existe déjà
        if (document.getElementById('threshold-popup')) {
            return;
        }
        
        // Créer le popup
        const popup = document.createElement('div');
        popup.id = 'threshold-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 9999;
            text-align: center;
            font-family: Arial, sans-serif;
            animation: slideIn 0.5s ease-out;
            max-width: 400px;
            width: 90%;
        `;
        
        // Ajouter l'animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Contenu du popup
        popup.innerHTML = `
            <div style="font-size: 50px; margin-bottom: 20px; color: white;">🎉</div>
            <h2 style="margin: 0 0 15px 0; font-size: 28px;">Félicitations !</h2>
            <p style="margin: 0 0 20px 0; font-size: 18px; line-height: 1.5;color: white;">
                Votre panier a atteint <strong>${THRESHOLD} DH</strong> !<br>
                Profitez de nos avantages exclusifs.
            </p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #764ba2;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.2s;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                Super !
            </button>
        `;
        
        // Ajouter une superposition semi-transparente
        const overlay = document.createElement('div');
        overlay.id = 'popup-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color:white;
            background: rgba(0,0,0,0.5);
            z-index: 9998;
            animation: fadeIn 0.3s ease-out;
        `;
        
        // Fermer le popup quand on clique sur l'overlay
        overlay.onclick = function() {
            popup.remove();
            this.remove();
        };
        
        // Ajouter au document
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        // Marquer comme affiché
        popupShown = true;
        
        // Auto-fermeture après 10 secondes
        setTimeout(() => {
            if (document.getElementById('threshold-popup')) {
                document.getElementById('threshold-popup').remove();
                document.getElementById('popup-overlay')?.remove();
            }
        }, 10000);
    }
    
    // Fonction pour vérifier le seuil et afficher le popup
    function checkThreshold(total) {
        if (total >= THRESHOLD && !popupShown) {
            showPopup();
        } else if (total < THRESHOLD) {
            // Réinitialiser si le total redescend sous le seuil
            popupShown = false;
            
            // Supprimer le popup s'il est encore affiché
            const existingPopup = document.getElementById('threshold-popup');
            const existingOverlay = document.getElementById('popup-overlay');
            if (existingPopup) {
                existingPopup.remove();
                existingOverlay?.remove();
            }
        }
    }
    
    // Fonction pour appliquer le total à la barre
    function setProgressBar(total) {
        const container = document.querySelector(SELECTORS.container);
        if (!container || total === null) return;
        
        // Arrondir à 2 décimales
        total = Math.round(total * 100) / 100;
        container.style.setProperty('--total', total);
        
        // Vérifier le seuil pour le popup
        checkThreshold(total);
        
        // DEBUG (optionnel)
        console.log('Barre mise à jour:', total, 'DH');
    }
    
    // Fonction principale d'initialisation
    function initProgressBar() {
        const total = getTotalFromDOM();
        if (total !== null) {
            setProgressBar(total);
            return true;
        }
        return false;
    }
    
    // ===== EXÉCUTION MULTIPLE POUR ÊTRE SÛR =====
    
    // 1. Exécution immédiate (dès que le script est chargé)
    if (document.readyState === 'loading') {
        // Si le document est en train de charger, on attend un peu
        setTimeout(initProgressBar, 50);
    } else {
        // Si déjà chargé, on exécute directement
        initProgressBar();
    }
    
    // 2. À chaque fois que le DOM est prêt
    document.addEventListener('DOMContentLoaded', initProgressBar);
    
    // 3. Après chaque chargement complet (images, etc.)
    window.addEventListener('load', function() {
        setTimeout(initProgressBar, 100);
    });
    
    // 4. À chaque clic sur les boutons du panier
    document.addEventListener('click', function(e) {
        if (e.target.closest('.up') || e.target.closest('.down') || e.target.closest('.remove-cart-button')) {
            // Attendre que le DOM soit mis à jour
            setTimeout(initProgressBar, 300);
        }
    });
    
    // 5. À chaque soumission de formulaire (si le panier utilise AJAX)
    document.addEventListener('submit', function(e) {
        if (e.target.closest('.form--shopping-cart')) {
            setTimeout(initProgressBar, 500);
        }
    });
    
    // 6. MutationObserver pour surveiller les changements du total
    function observeTotalChanges() {
        const target = document.querySelector(SELECTORS.total);
        if (!target) return;
        
        const observer = new MutationObserver(function(mutations) {
            // Ne pas réagir si c'est nous qui modifions
            if (mutations.some(m => m.attributeName === 'style' && m.target === document.querySelector(SELECTORS.container))) {
                return;
            }
            initProgressBar();
        });
        
        observer.observe(target, {
            childList: true,
            characterData: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['textContent']
        });
    }
    
    // Démarrer l'observation après le chargement
    setTimeout(observeTotalChanges, 500);
    
    // 7. Vérification périodique (filet de sécurité)
    setInterval(initProgressBar, 2000);
    
})();
