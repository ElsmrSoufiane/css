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
    
    // Fonction pour nettoyer et extraire le nombre correctement
    function extractNumber(text) {
        if (!text) return null;
        
        console.log('🔢 Texte original:', text);
        
        // 1. Enlève "DH" et les espaces
        let cleaned = text.replace(/DH|MAD|€|\$|dhs|dirham/gi, '').trim();
        console.log('🔢 Après suppression devise:', cleaned);
        
        // 2. Gère le format "1,050.00" (virgule comme séparateur milliers, point comme décimale)
        // Si on a une virgule ET un point
        if (cleaned.includes(',') && cleaned.includes('.')) {
            // Si la virgule est avant le point (séparateur milliers)
            const lastPointIndex = cleaned.lastIndexOf('.');
            const lastCommaIndex = cleaned.lastIndexOf(',');
            
            if (lastCommaIndex < lastPointIndex) {
                // Format: 1,050.00 → virgule = séparateur milliers, point = décimale
                // Enlève toutes les virgules (séparateurs milliers)
                cleaned = cleaned.replace(/,/g, '');
                console.log('🔢 Virgules (séparateurs) enlevées ->', cleaned);
            } else {
                // Format: 1.050,00 → point = séparateur milliers, virgule = décimale
                cleaned = cleaned.replace(/\./g, '').replace(',', '.');
                console.log('🔢 Points enlevés, virgule -> point ->', cleaned);
            }
        }
        // 3. Gère seulement virgule (peut être séparateur OU décimale)
        else if (cleaned.includes(',')) {
            // Vérifie si c'est un séparateur de milliers (ex: "1,050")
            const parts = cleaned.split(',');
            if (parts.length === 2 && parts[1].length === 3) {
                // "1,050" → séparateur milliers
                cleaned = cleaned.replace(',', '');
                console.log('🔢 Virgule = séparateur milliers ->', cleaned);
            } else {
                // "1050,50" → virgule décimale
                cleaned = cleaned.replace(',', '.');
                console.log('🔢 Virgule = décimale ->', cleaned);
            }
        }
        // 4. Gère seulement point
        else if (cleaned.includes('.')) {
            // Vérifie si c'est un séparateur de milliers (ex: "1.050")
            const parts = cleaned.split('.');
            if (parts.length === 2 && parts[1].length === 3) {
                // "1.050" → séparateur milliers
                cleaned = cleaned.replace(/\./g, '');
                console.log('🔢 Point = séparateur milliers ->', cleaned);
            }
            // Sinon c'est une décimale, on garde le point
        }
        
        // 5. Enlève tous les caractères non numériques sauf le point décimal
        cleaned = cleaned.replace(/[^\d.-]/g, '');
        
        // 6. Gère les cas où il y a plusieurs points (ex: "1.050.00" - erreur de format)
        const points = (cleaned.match(/\./g) || []).length;
        if (points > 1) {
            // Garde le dernier point comme décimale, enlève les autres
            const lastPointIndex = cleaned.lastIndexOf('.');
            const beforeLast = cleaned.substring(0, lastPointIndex).replace(/\./g, '');
            const afterLast = cleaned.substring(lastPointIndex);
            cleaned = beforeLast + afterLast;
            console.log('🔢 Points multiples corrigés ->', cleaned);
        }
        
        console.log('🔢 Après nettoyage final:', cleaned);
        
        // 7. Parse en nombre
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
        
        // Formater le total pour l'affichage (avec séparateur milliers)
        const formattedTotal = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
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
        
        if (total >= THRESHOLD) {
            if (shouldShowPopup(total)) {
                showPopup(total);
            }
        }
    }
    
    function initProgressBar() {
        const total = getTotalFromDOM();
        if (total !== null) {
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
    
    // Exécution
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProgressBar);
    } else {
        initProgressBar();
    }
    
    // Écouter les clics
    document.addEventListener('click', function(e) {
        if (e.target.closest(SELECTORS.quantityButtons)) {
            setTimeout(initProgressBar, 500);
            setTimeout(initProgressBar, 1000);
        }
    });
    
    // Vérification périodique
    setInterval(initProgressBar, 2000);
    
    console.log('✅ Script prêt! Teste avec: window.testExtract("1,050.00 DH")');
    
})();
