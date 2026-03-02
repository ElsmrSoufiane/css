(function() {
    'use strict';
    
    console.log('🚀 Script de popup démarré');
    
    // Configuration
    const SELECTORS = {
        total: '.ps-block--shopping-total .ps-block__content h3 span',
        container: '.ps-block--shopping-total',
        quantityButtons: '.up, .down, .remove-cart-button',
        quantityInputs: 'input[name="quantity"]',
        cartForm: '.form--shopping-cart'
    };
    
    const THRESHOLD = 1000;
    const STORAGE_KEY = 'cart_popup_shown_for_total';
    
    // Fonction pour extraire le nombre correctement
    function extractNumber(text) {
        if (!text) return null;
        
        console.log('🔢 Texte original:', text);
        
        // Étape 1: Enlever "DH" et les espaces
        let cleaned = text.replace(/DH|MAD|€|\$|dhs|dirham/gi, '').trim();
        console.log('🔢 Après suppression devise:', cleaned);
        
        // Étape 2: Remplacer la virgule par RIEN (pas par un point)
        // "1,050.00" → "1050.00"
        cleaned = cleaned.replace(/,/g, '');
        console.log('🔢 Après suppression virgules:', cleaned);
        
        // Étape 3: Extraire le nombre
        let number = parseFloat(cleaned);
        console.log('🔢 Nombre final:', number);
        
        return isNaN(number) ? null : number;
    }
    
    // Fonction pour extraire le total du HTML
    function getTotalFromDOM() {
        const el = document.querySelector(SELECTORS.total);
        if (!el) {
            console.log('❌ Élément total non trouvé');
            return null;
        }
        
        let text = el.textContent.trim();
        console.log('📝 Texte du total:', text);
        
        return extractNumber(text);
    }
    
    function getLastPopupTotal() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? parseFloat(stored) : null;
    }
    
    function savePopupTotal(total) {
        localStorage.setItem(STORAGE_KEY, total.toString());
        console.log('💾 Total sauvegardé:', total);
    }
    
    function shouldShowPopup(total) {
        console.log('🤔 Vérification - Total:', total, 'Seuil:', THRESHOLD);
        
        if (total < THRESHOLD) {
            console.log('📉 En dessous du seuil');
            return false;
        }
        
        const lastTotal = getLastPopupTotal();
        console.log('💾 Dernier total:', lastTotal);
        
        if (!lastTotal) {
            console.log('✅ Premier affichage');
            return true;
        }
        
        // Comparaison avec une petite marge d'erreur
        if (Math.abs(total - lastTotal) > 0.01) {
            console.log('✅ Total différent');
            return true;
        }
        
        console.log('❌ Déjà affiché');
        return false;
    }
    
    function showPopup(total) {
        console.log('🎉 Affichage du popup!');
        
        if (document.getElementById('threshold-popup')) {
            console.log('⚠️ Popup déjà existant');
            return;
        }
        
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
        
        popup.innerHTML = `
            <div style="font-size: 50px; margin-bottom: 20px;">🎉</div>
            <h2 style="margin: 0 0 15px 0; font-size: 28px;">Félicitations !</h2>
            <p style="margin: 0 0 20px 0; font-size: 18px; line-height: 1.5;">
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
        
        // Ajouter une superposition
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
        
        overlay.onclick = function() {
            document.getElementById('threshold-popup')?.remove();
            this.remove();
        };
        
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        // Auto-fermeture
        setTimeout(() => {
            if (document.getElementById('threshold-popup')) {
                document.getElementById('threshold-popup').remove();
                document.getElementById('popup-overlay')?.remove();
            }
        }, 10000);
    }
    
    function checkThreshold(total) {
        if (total === null) return;
        
        if (total >= THRESHOLD) {
            if (shouldShowPopup(total)) {
                showPopup(total);
            }
        }
    }
    
    function initProgressBar() {
        console.log('🔄 Initialisation...');
        const total = getTotalFromDOM();
        if (total !== null) {
            console.log('💰 Total extrait:', total);
            checkThreshold(total);
        }
    }
    
    // Fonctions de test
    window.testPopup = function() {
        showPopup(1050);
    };
    
    window.testExtract = function(text) {
        console.log('🧪 Test extraction:', text);
        const result = extractNumber(text);
        console.log('✅ Résultat:', result);
        return result;
    };
    
    // Exécution immédiate
    initProgressBar();
    
    // Réessayer plusieurs fois au chargement
    setTimeout(initProgressBar, 500);
    setTimeout(initProgressBar, 1000);
    setTimeout(initProgressBar, 2000);
    
    // Surveiller les clics
    document.addEventListener('click', function(e) {
        if (e.target.closest('.up') || e.target.closest('.down') || e.target.closest('.remove-cart-button')) {
            console.log('👆 Clic panier');
            setTimeout(initProgressBar, 500);
            setTimeout(initProgressBar, 1000);
        }
    });
    
    // Vérification périodique
    setInterval(initProgressBar, 3000);
    
    console.log('✅ Script prêt! Teste avec: window.testExtract("1,050.00 DH")');
    
})();
