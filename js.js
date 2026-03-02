(function() {
    'use strict';
    
    console.log('🚀 Script de popup - VERSION FINALE 5.1 (ONE-TIME-FIX)');
    console.log('💰 Seuil configuré:', 1000, 'DH');
    console.log('✨ NOUVEAU: Le popup ne s\'affichera qu\'une seule fois et après clic sur Super, il disparaît définitivement');
    
    // Configuration
    const SELECTORS = {
        total: '.ps-block--shopping-total .ps-block__content h3 span',
        container: '.ps-block--shopping-total',
        quantityButtons: '.up, .down, .remove-cart-button'
    };
    
    const THRESHOLD = 1000;
    const STORAGE_KEY = 'cart_popup_shown_for_total';
    const POPUP_SHOWN_SESSION = 'cart_popup_shown_session';
    const POPUP_CLICKED_KEY = 'cart_popup_clicked'; // Nouvelle clé pour le clic sur Super
    
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
    
    // Vérifier si on a déjà cliqué sur Super
    function hasSuperBeenClicked() {
        return localStorage.getItem(POPUP_CLICKED_KEY) === 'true';
    }
    
    // Marquer le clic sur Super
    function markSuperAsClicked() {
        localStorage.setItem(POPUP_CLICKED_KEY, 'true');
        console.log('✅ SUPER cliqué - popup désactivé définitivement');
    }
    
    // Marquer le popup comme affiché
    function markPopupAsShown() {
        sessionStorage.setItem(POPUP_SHOWN_SESSION, 'true');
        console.log('📝 Popup marqué comme affiché dans cette session');
    }
    
    // Réinitialiser le marqueur de popup
    function resetPopupMarker() {
        sessionStorage.removeItem(POPUP_SHOWN_SESSION);
        console.log('🔄 Marqueur de session réinitialisé');
    }
    
    // Réinitialiser le clic sur Super (pour les tests)
    function resetSuperClicked() {
        localStorage.removeItem(POPUP_CLICKED_KEY);
        console.log('🔄 Marqueur SUPER réinitialisé - popup pourra s\'afficher à nouveau');
    }
    
    // Fonction pour afficher le popup
    function showPopup(total) {
        // Vérifications multiples avant d'afficher
        if (document.getElementById('threshold-popup')) {
            console.log('⏭️ Popup déjà présent sur la page');
            return;
        }
        
        if (hasSuperBeenClicked()) {
            console.log('⏭️ SUPER déjà cliqué précédemment - popup désactivé pour toujours');
            return;
        }
        
        if (hasPopupBeenShown()) {
            console.log('⏭️ Popup déjà affiché dans cette session');
            return;
        }
        
        console.log('🎉 AFFICHAGE POPUP UNIQUE POUR:', total, 'DH');
        console.log('⚠️ Ce popup ne s\'affichera qu\'une seule fois');
        
        // Sauvegarder dans sessionStorage seulement
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
            <button id="super-button" style="
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
        
        // Fonction pour fermer le popup (sans marquer Super)
        function closePopup() {
            console.log('🔒 Fermeture du popup sans clic sur Super');
            popup.remove();
            overlay.remove();
        }
        
        // Fonction pour fermer avec Super cliqué
        function closeWithSuper() {
            console.log('🎯 SUPER cliqué - fermeture et blocage permanent');
            markSuperAsClicked();
            popup.remove();
            overlay.remove();
        }
        
        overlay.onclick = closePopup;
        
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        // Ajouter l'événement au bouton Super
        document.getElementById('super-button').addEventListener('click', closeWithSuper);
        
        // Auto-fermeture sans marquer Super
        setTimeout(() => {
            if (document.getElementById('threshold-popup')) {
                console.log('⏱️ Auto-fermeture du popup (8 secondes écoulées)');
                document.getElementById('threshold-popup').remove();
                document.getElementById('popup-overlay')?.remove();
            }
        }, 8000);
    }
    
    // Vérification du seuil
    function checkAndShowPopup() {
        // Si Super a déjà été cliqué, ne rien faire
        if (hasSuperBeenClicked()) {
            return;
        }
        
        const total = getTotalFromDOM();
        
        if (!total) return;
        
        console.log('🔍 Vérification - Total:', total, 'DH | Super cliqué:', hasSuperBeenClicked(), '| Popup affiché:', hasPopupBeenShown());
        
        // Si le total est en dessous du seuil, réinitialiser le marqueur de session
        if (total < THRESHOLD) {
            resetPopupMarker();
            return;
        }
        
        // Si le total est au-dessus du seuil et que le popup n'a pas été affiché et que Super n'a pas été cliqué
        if (total >= THRESHOLD && !hasPopupBeenShown() && !hasSuperBeenClicked()) {
            showPopup(total);
        }
    }
    
    // Fonctions de test
    window.testPopup = function() {
        console.log('🧪 TEST: Affichage forcé du popup');
        showPopup(1050);
    };
    
    window.resetPopup = function() {
        resetPopupMarker();
        console.log('🔄 Marqueur de popup réinitialisé');
    };
    
    window.resetSuper = function() {
        resetSuperClicked();
        console.log('🔄 Marqueur SUPER réinitialisé - popup pourra s\'afficher à nouveau');
    };
    
    window.resetAll = function() {
        resetPopupMarker();
        resetSuperClicked();
        console.log('🔄 TOUS les marqueurs réinitialisés');
    };
    
    window.debugTotal = function() {
        const total = getTotalFromDOM();
        console.log('💰 Total actuel:', total, 'DH');
        console.log('🚩 Popup déjà affiché dans session:', hasPopupBeenShown());
        console.log('🚫 SUPER déjà cliqué (permanent):', hasSuperBeenClicked());
        return total;
    };
    
    // Exécution
    console.log('🔄 Vérification initiale...');
    console.log('🚫 État SUPER cliqué au démarrage:', hasSuperBeenClicked());
    
    // Vérifier au chargement
    setTimeout(checkAndShowPopup, 500);
    
    // Surveiller les clics (moins fréquent)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.up') || e.target.closest('.down') || 
            e.target.closest('.remove-cart-button') || e.target.closest('.btn-apply-coupon-code')) {
            console.log('👆 Clic détecté sur élément du panier');
            setTimeout(checkAndShowPopup, 500);
        }
    });
    
    // Vérification périodique (mais moins fréquente)
    setInterval(checkAndShowPopup, 5000);
    
    console.log('✅ Script chargé! NOUVELLES COMMANDES:');
    console.log('  testPopup() - Afficher popup test');
    console.log('  resetPopup() - Réinitialiser le marqueur de session');
    console.log('  resetSuper() - Réinitialiser le marqueur SUPER (pour tests)');
    console.log('  resetAll() - Réinitialiser TOUS les marqueurs');
    console.log('  debugTotal() - Voir total actuel et tous les états');
    console.log('⚠️ IMPORTANT: Après avoir cliqué sur "Super", le popup ne s\'affichera PLUS JAMAIS');
    
})();
