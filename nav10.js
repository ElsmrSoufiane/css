// Complete Category Sidebar with ALL Subcategories - Mobile Optimized
(function() {
    console.log('LOADING COMPLETE CATEGORY SIDEBAR...');
    
    // Find ALL toggle buttons (desktop and mobile)
    const allToggles = document.querySelectorAll('.menu__toggle, .navigation__item, [href="#navigation-mobile"]');
    let mainToggles = [];
    
    allToggles.forEach(t => {
        const text = t.textContent || t.innerText || '';
        if (text.includes('Toutes les') || text.includes('Categories') || text.includes('Catégories')) {
            mainToggles.push(t);
        }
    });
    
    // Also find the mobile category toggle
    const mobileCategoryToggle = document.querySelector('[href="#navigation-mobile"]');
    if (mobileCategoryToggle) {
        mainToggles.push(mobileCategoryToggle);
    }
    
    if (mainToggles.length === 0) {
        console.log('Toggle not found');
        return;
    }
    
    console.log('Found ' + mainToggles.length + ' toggles');
    
    // Hide original menu content for both toggles
    const menuContents = document.querySelectorAll('.menu__content');
    menuContents.forEach(content => {
        content.style.display = 'none';
    });
    
    // COMPLETELY DISABLE THE MOBILE SIDEBAR THAT CAUSES DARKENING
    const mobileSidebar = document.getElementById('navigation-mobile');
    if (mobileSidebar) {
        mobileSidebar.style.display = 'none';
    }
    
    // Also disable any mobile sidebar panels
    document.querySelectorAll('.ps-panel--sidebar').forEach(panel => {
        if (panel.id === 'navigation-mobile') {
            panel.style.display = 'none';
        }
    });
    
    // Remove ALL old sidebars
    const oldSidebars = [
        'complete-sidebar', 
        'category-sidebar-mobile',
        'sidebar-overlay',
        'complete-overlay'
    ];
    
    oldSidebars.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
    
    // Also remove any CSS sidebar elements
    document.querySelectorAll('[class*="sidebar"]').forEach(el => {
        if (el.id && !el.id.includes('complete')) {
            el.remove();
        }
    });
    
    // Create sidebar with responsive width (NO OVERLAY)
    const sidebar = document.createElement('div');
    sidebar.id = 'complete-sidebar';
    sidebar.style.cssText = `
        position: fixed;
        top: 0;
        left: -100%;
        width: 85%;
        max-width: 320px;
        height: 100vh;
        background: white;
        z-index: 999999;
        transition: left 0.3s ease;
        overflow-y: auto !important;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch !important;
        box-shadow: 2px 0 10px rgba(0,0,0,0.2);
        display: block !important;
        visibility: visible !important;
        pointer-events: auto;
    `;
    
    // Complete categories with ALL subcategories from your HTML
    sidebar.innerHTML = `
        <div style="background:rgb(109,158,235); color:white; padding:15px 20px; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:10;">
            <h3 style="margin:0; font-size:18px;">Toutes les catégories</h3>
            <button id="close-complete" style="background:none; border:none; color:white; font-size:28px; cursor:pointer; padding:0 5px; line-height:1;">×</button>
        </div>
        <ul style="list-style:none; padding:0 0 20px 0; margin:0;">
            <!-- TUBES DE PRELEVEMENT -->
            <li style="border-bottom:1px solid #eee;">
                <a href="/product-categories/tubes-de-prelevement" style="padding:15px 20px; display:block; color:#333; text-decoration:none; font-weight:500;">TUBES DE PRELEVEMENT</a>
            </li>
            
            <!-- AIGUILLES ET ACCESSOIRES -->
            <li style="border-bottom:1px solid #eee;">
                <div style="padding:15px 20px; display:flex; justify-content:space-between; align-items:center;">
                    <a href="/product-categories/aiguilles-et-accessoires" style="color:#333; text-decoration:none; font-weight:500;">AIGUILLES ET ACCESSOIRES</a>
                    <span class="toggle-complete" style="cursor:pointer; font-size:24px; font-weight:bold; width:30px; height:30px; display:flex; align-items:center; justify-content:center; user-select:none;">+</span>
                </div>
                <ul class="sub-complete" style="list-style:none; padding:0; margin:0; display:none; background:#f9f9f9;">
                    <li><a href="/product-categories/aiguilles" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">AIGUILLES DE PRELEVEMENT</a></li>
                    <li><a href="/product-categories/accessoires-pour-aiguilles" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">ACCESSOIRES POUR AIGUILLES</a></li>
                </ul>
            </li>
            
            <!-- CONSOMMABLES DE LABORATOIRE -->
            <li style="border-bottom:1px solid #eee;">
                <div style="padding:15px 20px; display:flex; justify-content:space-between; align-items:center;">
                    <a href="/product-categories/les-lames-lamelles" style="color:#333; text-decoration:none; font-weight:500;">CONSOMMABLES DE LABORATOIRE</a>
                    <span class="toggle-complete" style="cursor:pointer; font-size:24px; font-weight:bold; width:30px; height:30px; display:flex; align-items:center; justify-content:center; user-select:none;">+</span>
                </div>
                <ul class="sub-complete" style="list-style:none; padding:0; margin:0; display:none; background:#f9f9f9;">
                    <li><a href="/product-categories/les-boites-de-petries" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES BOITES DE PETRIES</a></li>
                    <li><a href="/product-categories/les-flacons" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES FLACONS</a></li>
                    <li><a href="/product-categories/les-ecouvillones" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES ECOUVILLONES</a></li>
                    <li><a href="/product-categories/les-embouts" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES EMBOUTS</a></li>
                    <li><a href="/product-categories/les-gants" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES GANTS</a></li>
                    <li><a href="/product-categories/les-pipettes" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES PIPETTES</a></li>
                    <li><a href="/product-categories/les-seringues" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES SERINGUES</a></li>
                    <li><a href="/product-categories/les-lames-lamelles-1" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES LAMES & LAMELLES</a></li>
                    <li><a href="/product-categories/les-plaques-microplaques" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES PLAQUES & MICROPLAQUES</a></li>
                    <li><a href="/product-categories/les-cellules-de-numeration" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES CELLULES DE NUMERATION</a></li>
                    <li><a href="/product-categories/les-anses-inoculateurs-manches" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES ANSES/ INOCULATEURS/ MANCHES</a></li>
                    <li><a href="/product-categories/les-verreries" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES VERRERIES</a></li>
                    <li><a href="/product-categories/cuvettescupulesflacons-de-billes" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">CUVETTES/CUPULES/FLACONS DE BILLES</a></li>
                    <li><a href="/product-categories/micropipettes-fixes" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">MICROPIPETTES</a></li>
                    <li><a href="/product-categories/les-bouchons" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">LES BOUCHONS</a></li>
                    <li><a href="/product-categories/pro-pipettes-poires" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">PRO-PIPETTES & POIRES</a></li>
                    <li><a href="/product-categories/barreaux" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">BARREAUX</a></li>
                    <li><a href="/product-categories/tubes-a-hemolyse-tubes-a-essai-eppendorfs-lcr-coniques-cryotubes" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">TUBES À HÉMOLYSE / TUBES À ESSAI / EPPENDORFS / LCR / CONIQUES / CRYOTUBES</a></li>
                    <li><a href="/product-categories/conteneurs-de-securite" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">CONTENEURS DE SECURITE</a></li>
                    <li><a href="/product-categories/mortiers" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">MORTIERS</a></li>
                    <li><a href="/product-categories/pissettes" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">PISSETTES</a></li>
                    <li><a href="/product-categories/speculums" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">SPECULUMS</a></li>
                    <li><a href="/product-categories/sparadraps-cotons-tampons-alcools-eau-oxygenee" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">SPARADRAPS / COTONS / TAMPONS / ALCOOLS / EAU OXYGÉNÉE</a></li>
                    <li><a href="/product-categories/papiers-ph-parafilm-rouleaux-thermiques-enveloppes" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">PAPIERS PH / PARAFILM / ROULEAUX THERMIQUES / ENVELOPPES</a></li>
                    <li><a href="/product-categories/compresses-steriles" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">COMPRESSES STÉRILES</a></li>
                    <li><a href="/product-categories/draps-dexamen" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">DRAPS D’EXAMEN</a></li>
                    <li><a href="/product-categories/pinces-spatules" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">PINCES/ SPATULES</a></li>
                </ul>
            </li>
            
            <!-- REACTIFS DE LABORATOIRE -->
            <li style="border-bottom:1px solid #eee;">
                <div style="padding:15px 20px; display:flex; justify-content:space-between; align-items:center;">
                    <a href="/product-categories/reactifs-de-laboratoire" style="color:#333; text-decoration:none; font-weight:500;">REACTIFS DE LABORATOIRE</a>
                    <span class="toggle-complete" style="cursor:pointer; font-size:24px; font-weight:bold; width:30px; height:30px; display:flex; align-items:center; justify-content:center; user-select:none;">+</span>
                </div>
                <ul class="sub-complete" style="list-style:none; padding:0; margin:0; display:none; background:#f9f9f9;">
                    <li><a href="/product-categories/hematologies-sysmex" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">REACTIFS HEMATOLOGIES SYSMEX</a></li>
                    <li><a href="/product-categories/hematologies-mindray" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">REACTIFS HEMATOLOGIES MINDRAY</a></li>
                    <li><a href="/product-categories/syphilis" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">SYPHILIS</a></li>
                    <li><a href="/product-categories/reactifs-latex" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">REACTIFS LATEX</a></li>
                    <li><a href="/product-categories/groupages-sanguins" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">GROUPAGES SANGUINS</a></li>
                    <li><a href="/product-categories/bandelettes-urinaires" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">BANDELETTES URINAIRES</a></li>
                    <li><a href="/product-categories/tests-rapides" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">TESTS RAPIDES</a></li>
                    <li><a href="/product-categories/colorants" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">COLORANTS</a></li>
                    <li><a href="/product-categories/disques-dantibiotiques" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">DISQUES D'ANTIBIOTIQUES</a></li>
                    <li><a href="/product-categories/milieux-de-culture" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">MILIEUX DE CULTURE</a></li>
                    <li><a href="/product-categories/tuberculose" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">TUBERCULOSE</a></li>
                    <li><a href="/product-categories/reactifs-de-coagulation" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">REACTIFS DE COAGULATION</a></li>
                    <li><a href="/product-categories/reactifs-de-biochimie" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">REACTIFS DE BIOCHIMIE</a></li>
                </ul>
            </li>
            
            <!-- ANALYSEURS -->
            <li style="border-bottom:1px solid #eee;">
                <div style="padding:15px 20px; display:flex; justify-content:space-between; align-items:center;">
                    <a href="/product-categories/analyseurs" style="color:#333; text-decoration:none; font-weight:500;">ANALYSEURS</a>
                    <span class="toggle-complete" style="cursor:pointer; font-size:24px; font-weight:bold; width:30px; height:30px; display:flex; align-items:center; justify-content:center; user-select:none;">+</span>
                </div>
                <ul class="sub-complete" style="list-style:none; padding:0; margin:0; display:none; background:#f9f9f9;">
                    <li><a href="/product-categories/analyseurs-de-biochimie" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">ANALYSEURS DE BIOCHIMIE</a></li>
                    <li><a href="/product-categories/analyseurs-dhemoglobine-glycquee" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">ANALYSEURS D'HEMOGLOBINE GLYCQUEE</a></li>
                    <li><a href="/product-categories/analyseurs-de-coagulation" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">ANALYSEURS DE COAGULATION</a></li>
                    <li><a href="/product-categories/analyseurs-dhematologie" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">ANALYSEURS D'HEMATOLOGIE</a></li>
                    <li><a href="/product-categories/analyseur-pour-vitesse-de-sedimentation-esr-vs" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">ANALYSEUR POUR VITESSE DE SÉDIMENTATION</a></li>
                    <li><a href="/product-categories/analyseurs-de-protienes-specifiques" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">ANALYSEURS DE PROTIENES SPECIFIQUES</a></li>
                    <li><a href="/product-categories/analyseurs-delectrolytes" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">ANALYSEURS D'ELECTROLYTES</a></li>
                    <li><a href="/product-categories/analyseurs-de-gaz-du-sang" style="padding:12px 20px 12px 40px; display:block; color:#666; text-decoration:none;">ANALYSEURS DE GAZ DU SANG</a></li>
                </ul>
            </li>
            
            <!-- EQUIPEMENTS DE LABORATOIRE -->
            <li style="border-bottom:1px solid #eee;">
                <a href="/product-categories/equipements-de-laboratoire" style="padding:15px 20px; display:block; color:#333; text-decoration:none; font-weight:500;">EQUIPEMENTS DE LABORATOIRE</a>
            </li>
        </ul>
    `;
    
    document.body.appendChild(sidebar);
    
    // Setup toggle functionality
    const toggleButtons = sidebar.querySelectorAll('.toggle-complete');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const submenu = this.parentElement.nextElementSibling;
            if (submenu.style.display === 'none' || submenu.style.display === '') {
                submenu.style.display = 'block';
                this.textContent = '−';
            } else {
                submenu.style.display = 'none';
                this.textContent = '+';
            }
        });
    });
    
    // Open sidebar function
    function openSidebar() {
        sidebar.style.left = '0';
        document.body.style.overflow = 'hidden';
        console.log('Sidebar opened');
    }
    
    // Close sidebar function
    function closeSidebar() {
        sidebar.style.left = '-100%';
        document.body.style.overflow = '';
        console.log('Sidebar closed');
    }
    
    // Add click handler to ALL toggles (desktop and mobile)
    mainToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // If it's the mobile toggle, prevent the default sidebar from opening
            if (toggle.getAttribute('href') === '#navigation-mobile') {
                e.preventDefault();
            }
            
            openSidebar();
        });
    });
    
    // Close sidebar with X button
    document.getElementById('close-complete').addEventListener('click', function(e) {
        e.preventDefault();
        closeSidebar();
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        // If sidebar is open and click is outside sidebar and not on toggle buttons
        if (sidebar.style.left === '0px' && 
            !sidebar.contains(e.target) && 
            !e.target.closest('.menu__toggle') && 
            !e.target.closest('[href="#navigation-mobile"]')) {
            closeSidebar();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.style.left === '0px') {
            closeSidebar();
        }
    });
    
    // Prevent body scroll issues on mobile
    sidebar.addEventListener('touchmove', function(e) {
        e.stopPropagation();
    }, { passive: false });
    
    // Add click handler to prevent propagation from sidebar
    sidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    console.log('Complete sidebar with ALL subcategories loaded - No overlay');


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
})();
