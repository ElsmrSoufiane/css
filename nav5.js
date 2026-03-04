(function() {
    console.log('LOADING COMPLETE CATEGORY SIDEBAR...');
    
    // Find ALL toggle buttons
    const allToggles = document.querySelectorAll('.menu__toggle');
    let mainToggles = [];
    
    allToggles.forEach(t => {
        if (t.textContent.includes('Toutes les')) {
            mainToggles.push(t);
        }
    });
    
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
    
    // Remove ALL old sidebars and overlays
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
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'complete-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999998;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: auto;
    `;
    document.body.appendChild(overlay);
    
    // Create sidebar with responsive width
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
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Small delay for better animation
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        console.log('Sidebar opened');
    }
    
    // Close sidebar function
    function closeSidebar() {
        sidebar.style.left = '-100%';
        overlay.style.opacity = '0';
        document.body.style.overflow = '';
        
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
        
        console.log('Sidebar closed');
    }
    
    // Add click handler to ALL toggles (both header and sticky nav)
    mainToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openSidebar();
        });
    });
    
    // Close sidebar with X button
    document.getElementById('close-complete').addEventListener('click', function(e) {
        e.preventDefault();
        closeSidebar();
    });
    
    // Close sidebar on overlay click
    overlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeSidebar();
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
    
    console.log('Complete sidebar with ALL subcategories loaded - Mobile optimized');
})();
