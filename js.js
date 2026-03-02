(function() {
    'use strict';
    
    // Configuration
    const SELECTORS = {
        total: '.ps-block--shopping-total .ps-block__content h3 span',
        container: '.ps-block--shopping-total',
        quantityButtons: '.up, .down, .remove-cart-button',
        quantityInputs: 'input[name="quantity"]',
        cartForm: '.form--shopping-cart'
    };
    
    // Constante pour le seuil
    const THRESHOLD = 1000;
    
    // Clé pour le localStorage
    const STORAGE_KEY = 'cart_popup_shown_for_total';
    
    // Fonction pour nettoyer et extraire le nombre du texte
    function extractNumber(text) {
        if (!text) return null;
        // Remplace la virgule par un point et garde seulement les chiffres, points et tirets
        let cleaned = text.replace(/[^\d,.-]/g, '').replace(',', '.');
        // Gère les cas où il y a plusieurs points
        let parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts[0] + '.' + parts.slice(1).join('');
        }
        return parseFloat(cleaned);
    }
    
    // Fonction pour extraire le total du HTML
    function getTotalFromDOM() {
        const el = document.querySelector(SELECTORS.total);
        if (!el) return null;
        
        let text = el.textContent.trim();
        let total = extractNumber(text);
        
        return isNaN(total) ? null : total;
    }
    
    // Fonction pour obtenir le dernier total pour lequel le popup a été affiché
    function getLastPopupTotal() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? parseFloat(stored) : null;
    }
    
    // Fonction pour sauvegarder le total pour lequel le popup a été affiché
    function savePopupTotal(total) {
        localStorage.setItem(STORAGE_KEY, total.toString());
        console.log('Popup total saved:', total); // Debug
    }
    
    // Fonction pour vérifier si le popup doit être affiché pour ce total
    function shouldShowPopup(total) {
        if (total < THRESHOLD) {
            console.log('Total below threshold:', total); // Debug
            return false;
        }
        
        const lastTotal = getLastPopupTotal();
        console.log('Last total:', lastTotal, 'Current total:', total); // Debug
        
        // Afficher si :
        // 1. Jamais affiché auparavant
        // 2. Le total a augmenté au-dessus du seuil
        // 3. Le total est différent du dernier enregistré (pour gérer les changements)
        if (!lastTotal) {
            console.log('First time showing popup'); // Debug
            return true;
        }
        
        // Si le total actuel est supérieur au dernier total enregistré
        if (total > lastTotal) {
            console.log('Total increased, showing popup'); // Debug
            return true;
        }
        
        // Si le total est différent (pour les cas où on change de produit mais même montant)
        if (total !== lastTotal) {
            console.log('Total changed, showing popup'); // Debug
            return true;
        }
        
        return false;
    }
    
    // Fonction pour afficher le popup
    function showPopup(total) {
        // Vérifier si le popup existe déjà
        if (document.getElementById('threshold-popup')) {
            console.log('Popup already exists'); // Debug
            return;
        }
        
        console.log('Showing popup for total:', total); // Debug
        
        // Sauvegarder le total pour lequel on affiche le popup
        savePopupTotal(total);
        
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
        
        // Contenu du popup avec le total actuel
        popup.innerHTML = `
            <div style="font-size: 50px; margin-bottom: 20px; color: white;">🎉</div>
            <h2 style="margin: 0 0 15px 0; font-size: 28px;">Félicitations !</h2>
            <p style="margin: 0 0 20px 0; font-size: 18px; line-height: 1.5; color: white;">
                Votre panier a atteint <strong>${THRESHOLD} DH</strong> !<br>
                Total actuel : <strong>${total} DH</strong><br>
                Profitez de nos avantages exclusifs.
            </p>
            <button onclick="this.closest('#threshold-popup').remove(); document.getElementById('popup-overlay')?.remove();" style="
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
            background: rgba(0,0,0,0.5);
            z-index: 9998;
            animation: fadeIn 0.3s ease-out;
        `;
        
        // Fermer le popup quand on clique sur l'overlay
        overlay.onclick = function() {
            document.getElementById('threshold-popup')?.remove();
            this.remove();
        };
        
        // Ajouter au document
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
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
        if (total === null) return;
        
        console.log('Checking threshold for total:', total); // Debug
        
        if (total >= THRESHOLD) {
            if (shouldShowPopup(total)) {
                showPopup(total);
            } else {
                console.log('Popup should not show for this total'); // Debug
            }
        } else {
            console.log('Total below threshold, no popup'); // Debug
        }
    }
    
    // Fonction pour appliquer le total à la barre (si nécessaire)
    function setProgressBar(total) {
        const container = document.querySelector(SELECTORS.container);
        if (!container || total === null) return;
        
        // Arrondir à 2 décimales
        total = Math.round(total * 100) / 100;
        container.style.setProperty('--total', total);
        
        // Vérifier le seuil pour le popup
        checkThreshold(total);
        
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
    
    // Fonction pour observer les changements de quantité
    function observeQuantityChanges() {
        // Observer les changements sur les inputs de quantité
        const quantityInputs = document.querySelectorAll(SELECTORS.quantityInputs);
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                console.log('Quantity input changed'); // Debug
                setTimeout(initProgressBar, 500); // Attendre que le total soit mis à jour
            });
        });
    }
    
    // Fonction pour observer les mutations du DOM
    function observeDOMChanges() {
        const targetNode = document.querySelector(SELECTORS.container) || document.body;
        
        const observer = new MutationObserver(function(mutations) {
            // Vérifier si le total a changé
            const total = getTotalFromDOM();
            if (total !== null) {
                console.log('DOM mutation detected, checking total:', total); // Debug
                checkThreshold(total);
            }
        });
        
        observer.observe(targetNode, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['textContent', 'innerText']
        });
    }
    
    // ===== EXÉCUTION MULTIPLE POUR ÊTRE SÛR =====
    
    // 1. Exécution immédiate
    if (document.readyState === 'loading') {
        setTimeout(initProgressBar, 50);
    } else {
        initProgressBar();
    }
    
    // 2. DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        initProgressBar();
        observeQuantityChanges();
    });
    
    // 3. Load complet
    window.addEventListener('load', function() {
        setTimeout(initProgressBar, 100);
        observeQuantityChanges();
        observeDOMChanges();
    });
    
    // 4. Clics sur les boutons de quantité
    document.addEventListener('click', function(e) {
        if (e.target.closest(SELECTORS.quantityButtons)) {
            console.log('Quantity button clicked'); // Debug
            // Attendre plus longtemps pour laisser le temps à l'AJAX de se compléter
            setTimeout(initProgressBar, 800);
            // Deuxième tentative au cas où
            setTimeout(initProgressBar, 1500);
        }
    });
    
    // 5. Soumissions de formulaire
    document.addEventListener('submit', function(e) {
        if (e.target.closest(SELECTORS.cartForm)) {
            console.log('Cart form submitted'); // Debug
            setTimeout(initProgressBar, 800);
            setTimeout(initProgressBar, 1500);
        }
    });
    
    // 6. Observer les changements AJAX (si votre site utilise AJAX)
    const originalFetch = window.fetch;
    if (originalFetch) {
        window.fetch = function() {
            return originalFetch.apply(this, arguments).then(response => {
                // Vérifier si c'est une requête liée au panier
                if (arguments[0] && arguments[0].includes('cart') || arguments[0].includes('panier')) {
                    console.log('Cart AJAX request detected'); // Debug
                    setTimeout(initProgressBar, 500);
                }
                return response;
            });
        };
    }
    
    // 7. Vérification périodique (toutes les 2 secondes)
    setInterval(initProgressBar, 2000);
    
    // 8. Vérification plus fréquente pendant les 10 premières secondes
    // (pour capturer les mises à jour initiales)
    for (let i = 1; i <= 5; i++) {
        setTimeout(initProgressBar, i * 300);
    }
    
    // 9. Réinitialiser le localStorage (optionnel - pour tester)
    // localStorage.removeItem(STORAGE_KEY);
    
})();
