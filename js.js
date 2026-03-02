(function() {
    'use strict';
    
    console.log('🚀 Script de popup démarré - Version 2.0');
    
    // Configuration
    const SELECTORS = {
        total: '.ps-block--shopping-total .ps-block__content h3 span',
        container: '.ps-block--shopping-total',
        quantityButtons: '.up, .down, .remove-cart-button'
    };
    
    const THRESHOLD = 1000;
    const STORAGE_KEY = 'cart_popup_shown_for_total';
    
    // Solution ULTIME pour extraire le nombre
    function extractNumber(text) {
        if (!text) return null;
        
        console.log('📥 Texte brut:', text);
        
        // Méthode 1: Regex pour trouver le premier nombre
        let matches = text.match(/[\d\s,]+(?:\.\d+)?/);
        if (!matches) return null;
        
        let numberStr = matches[0];
        console.log('🔢 Nombre brut:', numberStr);
        
        // Enlève tous les espaces et virgules, garde le point
        numberStr = numberStr.replace(/\s/g, '').replace(/,/g, '');
        console.log('🧹 Nettoyé:', numberStr);
        
        let number = parseFloat(numberStr);
        console.log('💯 Résultat final:', number);
        
        return isNaN(number) ? null : number;
    }
    
    function getTotalFromDOM() {
        const el = document.querySelector(SELECTORS.total);
        if (!el) {
            console.log('❌ Élément .ps-block--shopping-total .ps-block__content h3 span non trouvé');
            
            // Backup: cherche tous les spans qui pourraient contenir un prix
            const allSpans = document.querySelectorAll('span');
            for (let span of allSpans) {
                if (span.textContent.includes('DH') || span.textContent.match(/\d+[\s,.]*\d+/)) {
                    console.log('🔍 Span trouvé:', span.textContent.trim());
                    return extractNumber(span.textContent);
                }
            }
            return null;
        }
        
        let text = el.textContent.trim();
        console.log('📝 Texte trouvé:', text);
        
        return extractNumber(text);
    }
    
    function showPopup(total) {
        if (document.getElementById('threshold-popup')) return;
        
        localStorage.setItem(STORAGE_KEY, total.toString());
        
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
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { opacity: 0; transform: translate(-50%, -60%); }
                to { opacity: 1; transform: translate(-50%, -50%); }
            }
        `;
        document.head.appendChild(style);
        
        popup.innerHTML = `
            <div style="font-size: 50px; margin-bottom: 20px;">🎉</div>
            <h2 style="margin: 0 0 15px 0; font-size: 28px;">Félicitations !</h2>
            <p style="margin: 0 0 20px 0; font-size: 18px; line-height: 1.5;">
                Votre panier a atteint <strong>${THRESHOLD} DH</strong> !<br>
                Total actuel : <strong>${total} DH</strong>
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
            ">Super !</button>
        `;
        
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
        
        overlay.onclick = () => {
            popup.remove();
            overlay.remove();
        };
        
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        setTimeout(() => {
            if (document.getElementById('threshold-popup')) {
                document.getElementById('threshold-popup').remove();
                document.getElementById('popup-overlay')?.remove();
            }
        }, 10000);
    }
    
    function checkTotal() {
        const total = getTotalFromDOM();
        if (total && total >= THRESHOLD) {
            const lastTotal = localStorage.getItem(STORAGE_KEY);
            if (!lastTotal || Math.abs(total - parseFloat(lastTotal)) > 0.01) {
                showPopup(total);
            }
        }
    }
    
    // Fonction de test
    window.forcePopup = function() {
        showPopup(1050);
    };
    
    window.debugTotal = function() {
        const total = getTotalFromDOM();
        console.log('💰 Total actuel:', total);
        return total;
    };
    
    // Exécution
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkTotal);
    } else {
        checkTotal();
    }
    
    // Réessayer plusieurs fois
    setTimeout(checkTotal, 1000);
    setTimeout(checkTotal, 3000);
    
    // Observer les clics
    document.addEventListener('click', function(e) {
        if (e.target.closest('.up') || e.target.closest('.down')) {
            setTimeout(checkTotal, 500);
        }
    });
    
    console.log('✅ Script chargé! Tapez window.forcePopup() pour tester');
    console.log('📊 Tapez window.debugTotal() pour voir le total actuel');
    
})();
