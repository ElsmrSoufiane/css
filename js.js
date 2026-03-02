(function() {
    'use strict';
    
    console.log('🚀 Script de popup - VERSION FINALE 4.0');
    console.log('💰 Seuil configuré:', 1000, 'DH');
    
    // Configuration
    const SELECTORS = {
        total: '.ps-block--shopping-total .ps-block__content h3 span',
        container: '.ps-block--shopping-total',
        quantityButtons: '.up, .down, .remove-cart-button'
    };
    
    const THRESHOLD = 1000;
    const STORAGE_KEY = 'cart_popup_shown_for_total';
    const POPUP_SHOWN_SESSION = 'cart_popup_shown_session';
    
    // Fonction ULTRA-SIMPLE pour extraire le nombre
    function extractNumber(text) {
        if (!text) return null;
        
        // Supprimer tout ce qui n'est pas chiffre
        let onlyDigits = text.replace(/[^0-9]/g, '');
        
        // Convertir en nombre
        let number = parseInt(onlyDigits, 10);
        
        // Ajuster pour les décimales
        if (text.includes('.00') || text.includes(',00')) {
            number = number / 100;
        }
        
        return number;
    }
    
    // Fonction pour obtenir le total
    function getTotalFromDOM() {
        let el = document.querySelector('.ps-block--shopping-total .ps-block__content h3 span');
        
        if (!el) {
            const allSpans = document.querySelectorAll('span');
            for (let span of allSpans) {
                if (span.textContent.includes('DH')) {
                    el = span;
                    break;
                }
            }
        }
        
        if (!el) return null;
        
        let text = el.textContent.trim();
        return extractNumber(text);
    }
    
    // Vérifier si le popup a déjà été affiché dans cette session
    function hasPopupBeenShown() {
        return sessionStorage.getItem(POPUP_SHOWN_SESSION) === 'true';
    }
    
    // Marquer le popup comme affiché
    function markPopupAsShown() {
        sessionStorage.setItem(POPUP_SHOWN_SESSION, 'true');
    }
    
    // Réinitialiser le marqueur de popup
    function resetPopupMarker() {
        sessionStorage.removeItem(POPUP_SHOWN_SESSION);
    }
    
    // Fonction pour afficher le popup
    function showPopup(total) {
        if (document.getElementById('threshold-popup')) return;
        if (hasPopupBeenShown()) {
            console.log('⏭️ Popup déjà affiché dans cette session');
            return;
        }
        
        console.log('🎉 AFFICHAGE POPUP POUR:', total);
        
        // Sauvegarder dans localStorage et sessionStorage
        localStorage.setItem(STORAGE_KEY, total.toString());
        markPopupAsShown();
        
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
            font-size: 16px;
        `;
        
        // Style pour l'animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { opacity: 0; transform: translate(-50%, -60%); }
                to { opacity: 1; transform: translate(-50%, -50%); }
            }
        `;
        document.head.appendChild(style);
        
        // Contenu du popup
        popup.innerHTML = `
            <div style="font-size: 50px; margin-bottom: 20px;">🎉</div>
            <h2 style="margin: 0 0 15px 0; font-size: 28px;">Félicitations !</h2>
            <p style="margin: 0 0 20px 0; font-size: 18px; line-height: 1.5;">
                Votre panier a atteint <strong>${THRESHOLD} DH</strong> !<br>
                Total actuel : <strong>${Math.round(total)} DH</strong>
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
                border: none;
            ">Super !</button>
        `;
        
        // Overlay
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
        `;
        
        overlay.onclick = function() {
            popup.remove();
            overlay.remove();
        };
        
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        // Auto-fermeture
        setTimeout(() => {
            if (document.getElementById('threshold-popup')) {
                document.getElementById('threshold-popup').remove();
                document.getElementById('popup-overlay')?.remove();
            }
        }, 8000);
    }
    
    // Vérification du seuil
    function checkAndShowPopup() {
        const total = getTotalFromDOM();
        
        if (!total) return;
        
        // Si le total est en dessous du seuil, réinitialiser le marqueur
        if (total < THRESHOLD) {
            resetPopupMarker();
            return;
        }
        
        // Si le total est au-dessus du seuil et que le popup n'a pas été affiché
        if (total >= THRESHOLD && !hasPopupBeenShown()) {
            showPopup(total);
        }
    }
    
    // Fonctions de test
    window.testPopup = function() {
        showPopup(1050);
    };
    
    window.resetPopup = function() {
        resetPopupMarker();
        console.log('🔄 Marqueur de popup réinitialisé');
    };
    
    window.debugTotal = function() {
        const total = getTotalFromDOM();
        console.log('💰 Total actuel:', total);
        console.log('🚩 Popup déjà affiché:', hasPopupBeenShown());
        return total;
    };
    
    // Exécution
    console.log('🔄 Vérification initiale...');
    
    // Vérifier au chargement
    setTimeout(checkAndShowPopup, 500);
    
    // Surveiller les clics (moins fréquent)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.up') || e.target.closest('.down') || 
            e.target.closest('.remove-cart-button') || e.target.closest('.btn-apply-coupon-code')) {
            setTimeout(checkAndShowPopup, 500);
        }
    });
    
    // Vérification périodique (mais moins fréquente)
    setInterval(checkAndShowPopup, 5000); // Toutes les 5 secondes au lieu de 3
    
    console.log('✅ Script chargé! Commandes:');
    console.log('  testPopup() - Afficher popup test');
    console.log('  resetPopup() - Réinitialiser le marqueur');
    console.log('  debugTotal() - Voir total actuel et état');
    
})();
