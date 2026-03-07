(function() {
  'use strict';
  
  // Function to enhance quantity badges - with overflow
  function enhanceQuantityBadges() {
    // First, make sure all parent elements allow overflow
    document.querySelectorAll('.checkout-product-img-wrapper, .cart-item .col-3, .cart-item .col, .cart-item, .row.cart-item').forEach(el => {
      el.style.overflow = 'visible !important';
      el.style.setProperty('overflow', 'visible', 'important');
    });
    
    document.querySelectorAll('.checkout-product-img-wrapper .checkout-quantity').forEach(badge => {
      // Keep original size but ensure overflow
      badge.style.cssText = `
        position: absolute !important;
        top: -8px !important;
        right: -8px !important;
        width: 24px !important;
        height: 24px !important;
        background: #ef4444 !important;
        color: white !important;
        font-size: 0.8rem !important;
        font-weight: 600 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 50% !important;
        border: 2px solid white !important;
        box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3) !important;
        z-index: 10 !important;
        line-height: 1 !important;
        animation: none !important;
        transform: none !important;
        overflow: visible !important;
      `;
      
      // If quantity is 0 or empty, hide it
      if (!badge.textContent || badge.textContent.trim() === '0') {
        badge.style.display = 'none';
      } else {
        badge.style.display = 'flex';
      }
    });
  }
  
  // Function to enhance payment method logos - only overflow
  function enhancePaymentLogos() {
    // Make sure all parent elements allow overflow
    document.querySelectorAll('.checkout-page, .container, .row, .col-lg-5, .col-md-6, .order-2, .checkout-order-info, .my-3, .bg-light, .position-relative, .p-3, .cart-item-wrapper, .list-group-item, .payment-checkout-form, .payment-method-item').forEach(el => {
      el.style.overflow = 'visible !important';
      el.style.setProperty('overflow', 'visible', 'important');
    });
    
    document.querySelectorAll('.payment-method-logo').forEach((logo, index) => {
      // Keep container minimal
      logo.style.cssText = `
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin-top: 10px !important;
        padding: 4px !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        min-height: 40px !important;
        width: 80px !important;
        position: relative !important;
        overflow: visible !important;
        margin-left: auto !important;
        margin-right: 0 !important;
        opacity: 1 !important;
        visibility: visible !important;
        transition: none !important;
        z-index: 3 !important;
        transform: none !important;
      `;
      
      // Find and enhance the image inside
      const img = logo.querySelector('img');
      if (img) {
        // Remove lazy loading attributes
        img.removeAttribute('data-bb-lazy');
        img.removeAttribute('loading');
        
        // Force image to load and overflow
        const scale = index === 0 ? '1.15' : '1.2';
        img.style.cssText = `
          max-width: none !important;
          width: 120% !important;
          height: auto !important;
          max-height: 50px !important;
          object-fit: contain !important;
          opacity: 1 !important;
          visibility: visible !important;
          filter: none !important;
          position: relative !important;
          z-index: 2 !important;
          transform: scale(${scale}) !important;
          transition: none !important;
          box-shadow: none !important;
          border: none !important;
        `;
        
        // Ensure image source is correct
        const currentSrc = img.src;
        if (currentSrc && !img.complete) {
          img.onload = function() {
            this.style.opacity = '1';
          };
          
          // Reload image if needed
          if (!currentSrc || currentSrc === window.location.href) {
            if (index === 0) {
              img.src = 'https://teclab.ma/storage/payments/cod.png';
            } else {
              img.src = 'https://teclab.ma/storage/payments/bank-transfer.png';
            }
          }
        }
      }
      
      // Remove any event listeners
      logo.replaceWith(logo.cloneNode(true));
    });
  }
  
  // Function to watch for DOM changes
  function watchForChanges() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          setTimeout(enhanceQuantityBadges, 50);
          setTimeout(enhancePaymentLogos, 50);
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'style', 'class']
    });
  }
  
  // Function to update badge when quantity changes
  function watchQuantityChanges() {
    // Watch for quantity input changes
    document.querySelectorAll('.ec-checkout-quantity input').forEach(input => {
      input.addEventListener('change', function() {
        setTimeout(enhanceQuantityBadges, 50);
      });
      
      input.addEventListener('input', function() {
        setTimeout(enhanceQuantityBadges, 50);
      });
    });
    
    // Watch for +/- button clicks
    document.querySelectorAll('.ec-checkout-quantity-control').forEach(btn => {
      btn.addEventListener('click', function() {
        setTimeout(enhanceQuantityBadges, 100);
        setTimeout(enhanceQuantityBadges, 300);
      });
    });
    
    // Watch for remove cart button
    document.querySelectorAll('.remove-cart-button').forEach(btn => {
      btn.addEventListener('click', function() {
        setTimeout(enhanceQuantityBadges, 300);
      });
    });
  }
  
  // Initialize everything
  function init() {
    enhanceQuantityBadges();
    enhancePaymentLogos();
    watchQuantityChanges();
    watchForChanges();
    
    // Run again after delays
    setTimeout(enhanceQuantityBadges, 200);
    setTimeout(enhancePaymentLogos, 200);
    setTimeout(enhanceQuantityBadges, 500);
    setTimeout(enhancePaymentLogos, 500);
    
    console.log('✅ Quantity badge (with overflow) and payment logos (overflow only) loaded');
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

  // ===== CLEAN QUANTITY INPUT HANDLER =====
(function() {
    'use strict';
    
    function fixQuantityInputs() {
        // Find all quantity containers
        const containers = document.querySelectorAll('.form-group--number, .product__qty');
        
        containers.forEach(container => {
            const input = container.querySelector('input[type="number"], input.qty-input');
            if (!input) return;
            
            // Skip if already processed
            if (container.getAttribute('data-fixed') === 'true') return;
            container.setAttribute('data-fixed', 'true');
            
            // Ensure input has proper attributes
            input.setAttribute('min', '1');
            input.setAttribute('step', '1');
            
            // Get or create buttons
            let downBtn = container.querySelector('.down');
            let upBtn = container.querySelector('.up');
            
            // If buttons don't exist, create them
            if (!downBtn) {
                downBtn = document.createElement('button');
                downBtn.className = 'down';
                downBtn.type = 'button';
                downBtn.textContent = '−'; // Minus sign
                container.appendChild(downBtn);
            }
            
            if (!upBtn) {
                upBtn = document.createElement('button');
                upBtn.className = 'up';
                upBtn.type = 'button';
                upBtn.textContent = '+';
                container.appendChild(upBtn);
            }
            
            // Remove old event listeners by cloning and replacing
            const newDown = downBtn.cloneNode(true);
            const newUp = upBtn.cloneNode(true);
            downBtn.parentNode.replaceChild(newDown, downBtn);
            upBtn.parentNode.replaceChild(newUp, upBtn);
            
            // Add new event listeners
            newDown.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                let val = parseInt(input.value) || 1;
                if (val > 1) {
                    input.value = val - 1;
                    // Trigger change event
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
            
            newUp.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                let val = parseInt(input.value) || 1;
                input.value = val + 1;
                // Trigger change event
                input.dispatchEvent(new Event('change', { bubbles: true }));
            });
            
            // Input validation
            input.addEventListener('input', function(e) {
                // Remove non-numeric characters
                this.value = this.value.replace(/[^0-9]/g, '');
                if (this.value === '' || parseInt(this.value) < 1) {
                    this.value = 1;
                }
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '' || parseInt(this.value) < 1) {
                    this.value = 1;
                }
            });
        });
    }
    
    // Run immediately
    fixQuantityInputs();
    
    // Run after DOM changes
    const observer = new MutationObserver(function(mutations) {
        let shouldFix = false;
        mutations.forEach(mutation => {
            if (mutation.target.closest('.ps-table--shopping-cart') || 
                mutation.target.closest('.ps-cart__content') ||
                mutation.addedNodes.length > 0) {
                shouldFix = true;
            }
        });
        if (shouldFix) {
            setTimeout(fixQuantityInputs, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Run on clicks that might update cart
    document.addEventListener('click', function(e) {
        if (e.target.closest('.up') || e.target.closest('.down') || 
            e.target.closest('.remove-cart-button') ||
            e.target.closest('.btn-apply-coupon-code')) {
            setTimeout(fixQuantityInputs, 200);
        }
    });
    
    console.log('✅ Clean quantity input handler loaded');
})();
(function() {
    'use strict';
    
    // Function to make all counters red
    function makeCountersRed() {
        // Select all possible counter elements
        const counters = document.querySelectorAll(
            '.header__extra span, ' +
            '.ps-cart--mini span, ' +
            '.btn-compare span, ' +
            '.btn-wishlist span, ' +
            '.btn-shopping-cart span, ' +
            '.header__extra span i, ' +
            '.ps-cart--mini .header__extra span i, ' +
            '.btn-compare span i, ' +
            '.btn-wishlist span i, ' +
            '.btn-shopping-cart span i, ' +
            '.header__actions .badge, ' +
            '.cart-count, ' +
            '.wishlist-count, ' +
            '.compare-count, ' +
            '.ps-cart--mini .ps-cart__content span i'
        );
        
        counters.forEach(counter => {
            // Apply styles directly to the element
            counter.style.setProperty('background-color', '#ff0000', 'important');
            counter.style.setProperty('color', '#ffffff', 'important');
            counter.style.setProperty('border-color', '#ff0000', 'important');
            
            // If it has an inner element, style that too
            if (counter.querySelector('i')) {
                const inner = counter.querySelector('i');
                inner.style.setProperty('background-color', '#ff0000', 'important');
                inner.style.setProperty('color', '#ffffff', 'important');
            }
        });
    }
    
    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', makeCountersRed);
    } else {
        makeCountersRed();
    }
    
    // Run after any dynamic updates (cart updates, etc.)
    const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        
        mutations.forEach(mutation => {
            // Check if the mutation involves counter elements
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.matches && (
                            node.matches('.header__extra span, .ps-cart--mini span, [class*="counter"], [class*="count"]') ||
                            node.querySelector && node.querySelector('.header__extra span, .ps-cart--mini span, [class*="counter"], [class*="count"]')
                        )) {
                            shouldUpdate = true;
                        }
                    }
                });
            }
            
            // Check if text content changed (number updates)
            if (mutation.type === 'characterData' || 
                (mutation.type === 'attributes' && mutation.attributeName === 'class')) {
                shouldUpdate = true;
            }
        });
        
        if (shouldUpdate) {
            setTimeout(makeCountersRed, 50); // Small delay to ensure DOM is updated
        }
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });
    
    // Also run on clicks (cart updates often happen after clicks)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.up') || 
            e.target.closest('.down') || 
            e.target.closest('.remove-cart-button') ||
            e.target.closest('.btn-add-cart') ||
            e.target.closest('.icon-bag2') ||
            e.target.closest('[data-bb-toggle="quick-shop"]')) {
            setTimeout(makeCountersRed, 100);
            setTimeout(makeCountersRed, 300);
            setTimeout(makeCountersRed, 500);
        }
    });
    
    // Periodic check to ensure counters stay red
    setInterval(makeCountersRed, 1000);
    
})();


(function () {
      "use strict";
      
      // CRITICAL: Check if sidebar already exists
      if (document.getElementById('ultimate-sidebar')) {
        console.log("Sidebar already exists in DOM, skipping...");
        return;
      }

      // Global flag to prevent multiple executions
      if (window.ultimateSidebarCreated) {
        console.log("Sidebar already created, skipping...");
        return;
      }
      window.ultimateSidebarCreated = true;

      console.log("🔵 Creating single category sidebar");

      function initSidebar() {
        console.log("🔵 initSidebar called");
        
        // Double-check sidebar doesn't exist
        if (document.getElementById('ultimate-sidebar')) {
          console.log("Sidebar already in DOM, aborting");
          return;
        }

        // Remove any existing overlays
        const oldOverlays = document.querySelectorAll('.ultimate-sidebar-overlay');
        oldOverlays.forEach(el => el.remove());

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'ultimate-sidebar-overlay';
        overlay.style.cssText = `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: rgba(0, 0, 0, 0.7) !important;
          z-index: 999999 !important;
          display: none !important;
          cursor: pointer !important;
          transition: opacity 0.3s ease !important;
          opacity: 0 !important;
        `;
        document.body.appendChild(overlay);

        // Create sidebar
        const sidebar = document.createElement("div");
        sidebar.id = "ultimate-sidebar";
        sidebar.style.cssText = `
          position: fixed !important;
          top: 0 !important;
          left: -100% !important;
          width: min(350px, 85%) !important;
          height: 100vh !important;
          background: white !important;
          z-index: 1000000 !important;
          box-shadow: 2px 0 10px rgba(0,0,0,0.2) !important;
          transition: left 0.3s ease !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          visibility: visible !important;
          opacity: 1 !important;
          display: block !important;
          pointer-events: auto !important;
        `;

        // COMPLETE CATEGORIES HTML WITH ALL SUBCATEGORIES
        sidebar.innerHTML = `
          <div style="background:rgb(109,158,235); color:white; padding:15px 20px; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:10;">
            <h3 style="margin:0; font-size:18px; color:white;">Toutes les catégories</h3>
            <button id="close-ultimate" style="background:none; border:none; color:white; font-size:30px; cursor:pointer; padding:0 10px; line-height:1;">×</button>
          </div>
          <ul style="list-style:none; padding:0; margin:0;">
            <!-- TUBES DE PRELEVEMENT -->
            <li style="border-bottom:1px solid #eee;">
              <a href="/product-categories/tubes-de-prelevement" style="padding:15px 20px; display:block; color:#333; text-decoration:none; font-weight:500;">TUBES DE PRELEVEMENT</a>
            </li>

            <!-- AIGUILLES ET ACCESSOIRES -->
            <li class="category-item" style="border-bottom:1px solid #eee;">
              <div class="category-header" data-target="submenu-aiguilles" style="padding:15px 20px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
                <span style="color:#333; font-weight:500;">AIGUILLES ET ACCESSOIRES</span>
                <span class="arrow" style="color:#666; font-size:12px;">▼</span>
              </div>
              <ul id="submenu-aiguilles" class="submenu" style="list-style:none; padding:0; margin:0; display:none; background:#f8f8f8;">
                <li><a href="/product-categories/aiguilles" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">AIGUILLES DE PRELEVEMENT</a></li>
                <li><a href="/product-categories/accessoires-pour-aiguilles" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">ACCESSOIRES POUR AIGUILLES</a></li>
              </ul>
            </li>

            <!-- CONSOMMABLES DE LABORATOIRE -->
            <li class="category-item" style="border-bottom:1px solid #eee;">
              <div class="category-header" data-target="submenu-consommables" style="padding:15px 20px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
                <span style="color:#333; font-weight:500;">CONSOMMABLES DE LABORATOIRE</span>
                <span class="arrow" style="color:#666; font-size:12px;">▼</span>
              </div>
              <ul id="submenu-consommables" class="submenu" style="list-style:none; padding:0; margin:0; display:none; background:#f8f8f8;">
                <li><a href="/product-categories/les-boites-de-petries" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES BOITES DE PETRIES</a></li>
                <li><a href="/product-categories/les-flacons" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES FLACONS</a></li>
                <li><a href="/product-categories/les-ecouvillones" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES ECOUVILLONES</a></li>
                <li><a href="/product-categories/les-embouts" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES EMBOUTS</a></li>
                <li><a href="/product-categories/les-gants" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES GANTS</a></li>
                <li><a href="/product-categories/les-pipettes" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES PIPETTES</a></li>
                <li><a href="/product-categories/les-seringues" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES SERINGUES</a></li>
                <li><a href="/product-categories/les-lames-lamelles-1" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES LAMES & LAMELLES</a></li>
                <li><a href="/product-categories/les-plaques-microplaques" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES PLAQUES & MICROPLAQUES</a></li>
                <li><a href="/product-categories/les-cellules-de-numeration" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES CELLULES DE NUMERATION</a></li>
                <li><a href="/product-categories/les-anses-inoculateurs-manches" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES ANSES/ INOCULATEURS/ MANCHES</a></li>
                <li><a href="/product-categories/les-verreries" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES VERRERIES</a></li>
                <li><a href="/product-categories/cuvettescupulesflacons-de-billes" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">CUVETTES/CUPULES/FLACONS DE BILLES</a></li>
                <li><a href="/product-categories/micropipettes-fixes" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">MICROPIPETTES</a></li>
                <li><a href="/product-categories/les-bouchons" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">LES BOUCHONS</a></li>
                <li><a href="/product-categories/pro-pipettes-poires" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">PRO-PIPETTES & POIRES</a></li>
                <li><a href="/product-categories/barreaux" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">BARREAUX</a></li>
                <li><a href="/product-categories/tubes-a-hemolyse-tubes-a-essai-eppendorfs-lcr-coniques-cryotubes" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">TUBES À HÉMOLYSE / TUBES À ESSAI / EPPENDORFS / LCR / CONIQUES / CRYOTUBES</a></li>
                <li><a href="/product-categories/conteneurs-de-securite" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">CONTENEURS DE SECURITE</a></li>
                <li><a href="/product-categories/mortiers" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">MORTIERS</a></li>
                <li><a href="/product-categories/pissettes" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">PISSETTES</a></li>
                <li><a href="/product-categories/speculums" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">SPECULUMS</a></li>
                <li><a href="/product-categories/sparadraps-cotons-tampons-alcools-eau-oxygenee" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">SPARADRAPS / COTONS / TAMPONS / ALCOOLS / EAU OXYGÉNÉE</a></li>
                <li><a href="/product-categories/papiers-ph-parafilm-rouleaux-thermiques-enveloppes" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">PAPIERS PH / PARAFILM / ROULEAUX THERMIQUES / ENVELOPPES</a></li>
                <li><a href="/product-categories/compresses-steriles" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">COMPRESSES STÉRILES</a></li>
                <li><a href="/product-categories/draps-dexamen" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">DRAPS D’EXAMEN</a></li>
                <li><a href="/product-categories/pinces-spatules" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">PINCES/ SPATULES</a></li>
              </ul>
            </li>

            <!-- REACTIFS DE LABORATOIRE -->
            <li class="category-item" style="border-bottom:1px solid #eee;">
              <div class="category-header" data-target="submenu-reactifs" style="padding:15px 20px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
                <span style="color:#333; font-weight:500;">REACTIFS DE LABORATOIRE</span>
                <span class="arrow" style="color:#666; font-size:12px;">▼</span>
              </div>
              <ul id="submenu-reactifs" class="submenu" style="list-style:none; padding:0; margin:0; display:none; background:#f8f8f8;">
                <!-- SYSMEX Subcategory -->
                <li class="subcategory-item" style="border-bottom:1px solid #ddd;">
                  <div class="subcategory-header" data-target="submenu-sysmex" style="padding:12px 20px 12px 40px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#f0f0f0;">
                    <span style="color:#444; font-weight:500;">REACTIFS HEMATOLOGIES SYSMEX</span>
                    <span class="sub-arrow" style="color:#666; font-size:10px;">▼</span>
                  </div>
                  <ul id="submenu-sysmex" class="submenu-level2" style="list-style:none; padding:0; margin:0; display:none; background:#e8e8e8;">
                    <li><a href="/product-categories/sysmex-xtxs" style="padding:10px 20px 10px 60px; display:block; color:#666; text-decoration:none;">SYSMEX XT/XS</a></li>
                    <li><a href="/product-categories/sysmex-kx" style="padding:10px 20px 10px 60px; display:block; color:#666; text-decoration:none;">SYSMEX KX</a></li>
                    <li><a href="/product-categories/sysmex-xn" style="padding:10px 20px 10px 60px; display:block; color:#666; text-decoration:none;">SYSMEX XN</a></li>
                  </ul>
                </li>
                <!-- MINDRAY Subcategory -->
                <li class="subcategory-item" style="border-bottom:1px solid #ddd;">
                  <div class="subcategory-header" data-target="submenu-mindray" style="padding:12px 20px 12px 40px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#f0f0f0;">
                    <span style="color:#444; font-weight:500;">REACTIFS HEMATOLOGIES MINDRAY</span>
                    <span class="sub-arrow" style="color:#666; font-size:10px;">▼</span>
                  </div>
                  <ul id="submenu-mindray" class="submenu-level2" style="list-style:none; padding:0; margin:0; display:none; background:#e8e8e8;">
                    <li><a href="/product-categories/mindray-bc-6800" style="padding:10px 20px 10px 60px; display:block; color:#666; text-decoration:none;">MINDRAY BC-6800</a></li>
                    <li><a href="/product-categories/mindray-bc-5800" style="padding:10px 20px 10px 60px; display:block; color:#666; text-decoration:none;">MINDRAY BC-5800</a></li>
                    <li><a href="/product-categories/mindray-bc-5390" style="padding:10px 20px 10px 60px; display:block; color:#666; text-decoration:none;">MINDRAY BC-5390</a></li>
                  </ul>
                </li>
                <li><a href="/product-categories/syphilis" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">SYPHILIS</a></li>
                <li><a href="/product-categories/reactifs-latex" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">REACTIFS LATEX</a></li>
                <li><a href="/product-categories/groupages-sanguins" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">GROUPAGES SANGUINS</a></li>
                <li><a href="/product-categories/bandelettes-urinaires" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">BANDELETTES URINAIRES</a></li>
                <li><a href="/product-categories/tests-rapides" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">TESTS RAPIDES</a></li>
                <li><a href="/product-categories/colorants" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">COLORANTS</a></li>
                <li><a href="/product-categories/disques-dantibiotiques" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">DISQUES D'ANTIBIOTIQUES</a></li>
                <li><a href="/product-categories/milieux-de-culture" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">MILIEUX DE CULTURE</a></li>
                <li><a href="/product-categories/tuberculose" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">TUBERCULOSE</a></li>
                <li><a href="/product-categories/reactifs-de-coagulation" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">REACTIFS DE COAGULATION</a></li>
                <li><a href="/product-categories/reactifs-de-biochimie" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">REACTIFS DE BIOCHIMIE</a></li>
              </ul>
            </li>

            <!-- ANALYSEURS -->
            <li class="category-item" style="border-bottom:1px solid #eee;">
              <div class="category-header" data-target="submenu-analyseurs" style="padding:15px 20px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
                <span style="color:#333; font-weight:500;">ANALYSEURS</span>
                <span class="arrow" style="color:#666; font-size:12px;">▼</span>
              </div>
              <ul id="submenu-analyseurs" class="submenu" style="list-style:none; padding:0; margin:0; display:none; background:#f8f8f8;">
                <li><a href="/product-categories/analyseurs-de-biochimie" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">ANALYSEURS DE BIOCHIMIE</a></li>
                <li><a href="/product-categories/analyseurs-dhemoglobine-glycquee" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">ANALYSEURS D'HEMOGLOBINE GLYCQUEE</a></li>
                <li><a href="/product-categories/analyseurs-de-coagulation" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">ANALYSEURS DE COAGULATION</a></li>
                <li><a href="/product-categories/analyseurs-dhematologie" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">ANALYSEURS D'HEMATOLOGIE</a></li>
                <li><a href="/product-categories/analyseur-pour-vitesse-de-sedimentation-esr-vs" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">ANALYSEUR POUR VITESSE DE SÉDIMENTATION (ESR / VS)</a></li>
                <li><a href="/product-categories/analyseurs-de-protienes-specifiques" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">ANALYSEURS DE PROTIENES SPECIFIQUES</a></li>
                <li><a href="/product-categories/analyseurs-delectrolytes" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">ANALYSEURS D'ELECTROLYTES</a></li>
                <li><a href="/product-categories/analyseurs-de-gaz-du-sang" style="padding:12px 20px 12px 40px; display:block; color:#555; text-decoration:none;">ANALYSEURS DE GAZ DU SANG</a></li>
              </ul>
            </li>

            <!-- EQUIPEMENTS DE LABORATOIRE -->
            <li style="border-bottom:1px solid #eee;">
              <a href="/product-categories/equipements-de-laboratoire" style="padding:15px 20px; display:block; color:#333; text-decoration:none; font-weight:500;">EQUIPEMENTS DE LABORATOIRE</a>
            </li>
          </ul>
        `;

        document.body.appendChild(sidebar);

        // Mobile detection
        function isMobile() {
          return window.innerWidth <= 768;
        }

        // Adjust sidebar width based on screen
        function adjustSidebarWidth() {
          if (isMobile()) {
            sidebar.style.width = '85%';
          } else {
            sidebar.style.width = '350px';
          }
        }

        // Toggle functions for main categories
        function toggleSubmenu(header) {
          const targetId = header.getAttribute('data-target');
          const submenu = document.getElementById(targetId);
          const arrow = header.querySelector('.arrow');
          
          if (submenu) {
            if (submenu.style.display === 'block') {
              submenu.style.display = 'none';
              if (arrow) arrow.textContent = '▼';
            } else {
              submenu.style.display = 'block';
              if (arrow) arrow.textContent = '▲';
            }
          }
        }

        // Toggle functions for subcategories (level 2)
        function toggleSubSubmenu(header) {
          const targetId = header.getAttribute('data-target');
          const submenu = document.getElementById(targetId);
          const arrow = header.querySelector('.sub-arrow');
          
          if (submenu) {
            if (submenu.style.display === 'block') {
              submenu.style.display = 'none';
              if (arrow) arrow.textContent = '▼';
            } else {
              submenu.style.display = 'block';
              if (arrow) arrow.textContent = '▲';
            }
          }
        }

        // Add click handlers for main categories
        sidebar.querySelectorAll('.category-header').forEach(header => {
          header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSubmenu(this);
          });
        });

        // Add click handlers for subcategories
        sidebar.querySelectorAll('.subcategory-header').forEach(header => {
          header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSubSubmenu(this);
          });
        });

        // Find triggers
        function findTriggers() {
          const triggers = [];
          
          // Main menu toggle
          const menuToggle = document.querySelector('.menu__toggle');
          if (menuToggle) triggers.push(menuToggle);
          
          // Mobile category button
          const mobileCat = document.querySelector('[href="#navigation-mobile"]');
          if (mobileCat) triggers.push(mobileCat);
          
          // "Acheter par rayon" text
          document.querySelectorAll('span, div, a').forEach(el => {
            if (el.textContent && el.textContent.includes('Acheter par rayon')) {
              if (!triggers.includes(el)) triggers.push(el);
            }
          });
          
          return triggers;
        }

        const triggers = findTriggers();
        console.log(`Found ${triggers.length} unique triggers`);

        // Open function
        function openSidebar(e) {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          
          console.log('Opening sidebar');
          
          adjustSidebarWidth();
          sidebar.style.left = '0';
          overlay.style.display = 'block';
          overlay.style.opacity = '1';
          document.body.style.overflow = 'hidden';
        }

        // Close function
        function closeSidebar() {
          console.log('Closing sidebar');
          sidebar.style.left = '-100%';
          overlay.style.opacity = '0';
          
          setTimeout(() => {
            if (overlay.style.opacity === '0') {
              overlay.style.display = 'none';
            }
          }, 300);
          
          document.body.style.overflow = '';
        }

        // Remove any existing listeners first
        triggers.forEach(trigger => {
          trigger.removeEventListener('click', openSidebar);
          trigger.addEventListener('click', openSidebar);
        });

        // Close handlers
        const closeBtn = document.getElementById('close-ultimate');
        if (closeBtn) {
          closeBtn.removeEventListener('click', closeSidebar);
          closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebar();
          });
        }

        // Close on overlay click
        overlay.removeEventListener('click', closeSidebar);
        overlay.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          closeSidebar();
        });

        // Close on escape key
        document.removeEventListener('keydown', handleEscape);
        function handleEscape(e) {
          if (e.key === 'Escape' && sidebar.style.left === '0px') {
            closeSidebar();
          }
        }
        document.addEventListener('keydown', handleEscape);

        // Prevent clicks inside sidebar from closing it
        sidebar.addEventListener('click', (e) => {
          e.stopPropagation();
        });

        console.log('✅ Single sidebar created successfully');
      }

      // Run when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
      } else {
        initSidebar();
      }
    })();

