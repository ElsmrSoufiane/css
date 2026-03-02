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
    
    // Fonction SIMPLIFIÉE pour extraire le nombre
    function extractNumber(text) {
        if (!text) return null;
        
        console.log('🔢 Texte original:', text);
        
        // 1. Garde UNIQUEMENT les chiffres
        // "1,050.00 DH" → "105000"
        let onlyNumbers = text.replace(/[^\d]/g, '');
        console.log('🔢 Seulement les chiffres:', onlyNumbers);
        
        // 2. Convertit en nombre
        // "105000" → 105000 (mais on veut 1050.00)
        let number = parseInt(onlyNumbers, 10);
        
        // 3. Si le nombre est trop grand, c'est qu'il y avait des décimales
        // On divise par 100 si le texte original contenait des décimales (.00 ou ,00)
        if (text.includes('.') || text.includes(',')) {
            // Vérifie si c'est formaté avec 2 décimales
            if (text.match(/[.,]\d{2}\s*DH/)) {
                number = number / 100;
                console.log('🔢 Division par 100 (décimales détectées):', number);
            }
        }
        
        console.log('🔢 Nombre final:', number);
        return number;
    }
    
    // Alternative encore plus simple : prendre tout ce qui est avant "DH" et enlever les séparateurs
    function extractNumberSimple(text) {
        if (!text) return null;
        
        console.log('🔢 Texte original:', text);
        
        // Prend tout ce qui est avant "DH"
        let beforeDH = text.split('DH')[0].trim();
        console.log('🔢 Avant DH:', beforeDH);
        
        // Enlève tous les caractères non chiffres
        let onlyNumbers = beforeDH.replace(/[^\d]/g, '');
        console.log('🔢 Chiffres seuls:', onlyNumbers);
        
        // Convertit en nombre
        let number = parseInt(onlyNumbers, 10);
        
        // Ajuste pour les décimales (si le format a 2 chiffres après le dernier séparateur)
        let match = beforeDH.match(/[.,](\d{2})$/);
        if (match) {
            // Si on a des décimales à la fin, on divise par 100
            number = number / 100;
            console.log('🔢 Décimales détectées, division par 100:', number);
        }
        
        console.log('🔢 Nombre final:', number);
        return number;
    }
    
    // Utilise la version simple
    const extractNumber = extractNumberSimple;
    
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
    }
    
    function shouldShowPopup(total) {
        if (total < THRESHOLD) return false;
        
        const lastTotal = getLastPopupTotal();
        
        if (!lastTotal) return true;
        
        // Arrondir pour éviter les problèmes de floating point
        const roundedTotal = Math.round(total * 100) / 100;
        const roundedLast = Math.round(lastTotal * 100) / 100;
        
        return roundedTotal > roundedLast || roundedTotal !== roundedLast;
    }
    
    function showPopup(total) {
        if (document.getElementById('threshold-popup')) return;
        
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
        
        // Formater le total pour l'affichage
        const formattedTotal = total.toFixed(2).replace('.', ',');
        
        popup.innerHTML = `
            <div style="font-size: 50px; margin-bottom: 20px;">🎉</div>
            <h2 style="margin: 0 0 15px 0; font-size: 28px;">Félicitations !</h2>
            <p style="margin: 0 0 20px 0; font-size: 18px; line-height: 1.5;">
                Votre panier a atteint <strong>${THRESHOLD} DH</strong> !<br>
                Total actuel : <strong>${formattedTotal} DH</strong><br>
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
        
        console.log('📊 Vérification - Total:', total, 'Seuil:', THRESHOLD);
        
        if (total >= THRESHOLD) {
            console.log('🎯 Seuil atteint!');
            if (shouldShowPopup(total)) {
                showPopup(total);
            }
        } else {
            console.log('📉 En dessous du seuil');
        }
    }
    
    function initProgressBar() {
        console.log('🔄 Initialisation...');
        const total = getTotalFromDOM();
        if (total !== null) {
            console.log('💰 Total extrait:', total);
            checkThreshold(total);
        } else {
            console.log('❌ Total non trouvé');
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
    
    // Exécution
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProgressBar);
    } else {
        initProgressBar();
    }
    
    // Écouter les clics
    document.addEventListener('click', function(e) {
        if (e.target.closest(SELECTORS.quantityButtons)) {
            console.log('👆 Clic sur bouton quantité');
            setTimeout(initProgressBar, 500);
            setTimeout(initProgressBar, 1000);
        }
    });
    
    // Vérification périodique
    setInterval(initProgressBar, 2000);
    
    console.log('✅ Script prêt! Teste avec: window.testExtract("1,050.00 DH")');
    
})();
