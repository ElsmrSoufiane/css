(function() {
    'use strict';
    
    console.log('🚀 Script de popup - VERSION FINALE 3.0');
    console.log('💰 Seuil configuré:', 1000, 'DH');
    
    // Configuration
    const SELECTORS = {
        total: '.ps-block--shopping-total .ps-block__content h3 span',
        container: '.ps-block--shopping-total',
        quantityButtons: '.up, .down, .remove-cart-button'
    };
    
    const THRESHOLD = 1000;
    const STORAGE_KEY = 'cart_popup_shown_for_total';
    
    // Fonction ULTRA-SIMPLE pour extraire le nombre
    function extractNumber(text) {
        if (!text) return null;
        
        console.log('📥 Texte reçu:', text);
        
        // Méthode 1: Supprimer tout ce qui n'est pas chiffre
        // "1,050.00 DH" → "105000"
        let onlyDigits = text.replace(/[^0-9]/g, '');
        console.log('🔢 Chiffres seuls:', onlyDigits);
        
        // Convertir en nombre
        let number = parseInt(onlyDigits, 10);
        console.log('💯 Nombre brut:', number);
        
        // Si le nombre est trop grand (plus de 3 chiffres après les milliers)
        // "105000" → on divise par 100 car il y avait .00 à la fin
        if (text.includes('.00') || text.includes(',00')) {
            number = number / 100;
            console.log('💰 Après division par 100:', number);
        }
        
        // Vérification finale
        if (number > 1000000) {
            // Si encore trop grand, on divise par 1000
            number = number / 1000;
            console.log('💰 Après division par 1000:', number);
        }
        
        console.log('💰 Total final:', number);
        return number;
    }
    
    // Fonction pour obtenir le total
    function getTotalFromDOM() {
        // Chercher l'élément spécifique
        let el = document.querySelector('.ps-block--shopping-total .ps-block__content h3 span');
        
        // Si pas trouvé, chercher tous les spans qui contiennent "DH"
        if (!el) {
            console.log('🔍 Recherche élargie...');
            const allSpans = document.querySelectorAll('span');
            for (let span of allSpans) {
                if (span.textContent.includes('DH')) {
                    el = span;
                    console.log('✅ Span trouvé avec DH:', span.textContent.trim());
                    break;
                }
            }
        }
        
        if (!el) {
            console.log('❌ Aucun élément trouvé');
            return null;
        }
        
        let text = el.textContent.trim();
        console.log('📝 Texte à analyser:', text);
        
        return extractNumber(text);
    }
    
    // Fonction pour afficher le popup
    function showPopup(total) {
        console.log('🎉 AFFICHAGE POPUP POUR:', total);
        
        if (document.getElementById('threshold-popup')) {
            console.log('⚠️ Popup déjà affiché');
            return;
        }
        
        // Sauvegarder dans localStorage
        localStorage.setItem(STORAGE_KEY, total.toString());
        
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
        
        if (total && total >= THRESHOLD) {
            const lastTotal = localStorage.getItem(STORAGE_KEY);
            
            if (!lastTotal || Math.abs(total - parseFloat(lastTotal)) > 1) {
                showPopup(total);
            }
        }
    }
    
    // Fonctions de test
    window.testPopup = function() {
        showPopup(1050);
    };
    
    window.testExtract = function(text) {
        console.log('🧪 Test extraction pour:', text);
        return extractNumber(text);
    };
    
    window.forceCheck = function() {
        console.log('🔍 Vérification forcée...');
        checkAndShowPopup();
    };
    
    window.debugTotal = function() {
        const total = getTotalFromDOM();
        console.log('💰 Total actuel:', total);
        return total;
    };
    
    // Exécution
    console.log('🔄 Vérification initiale...');
    setTimeout(checkAndShowPopup, 500);
    setTimeout(checkAndShowPopup, 1000);
    setTimeout(checkAndShowPopup, 2000);
    
    // Surveiller les clics
    document.addEventListener('click', function(e) {
        if (e.target.closest('.up') || e.target.closest('.down') || e.target.closest('.remove')) {
            console.log('👆 Changement quantité détecté');
            setTimeout(checkAndShowPopup, 800);
        }
    });
    
    // Vérification périodique
    setInterval(checkAndShowPopup, 3000);
    
    console.log('✅ Script chargé! Commandes:');
    console.log('  testPopup() - Afficher popup test');
    console.log('  testExtract("1,050 DH") - Tester extraction');
    console.log('  debugTotal() - Voir total actuel');
    console.log('  forceCheck() - Forcer vérification');
    
})();
