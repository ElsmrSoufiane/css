

// Category Sidebar - Click to Open (Marjanemall Style)
(function() {
    console.log('=== CATEGORY SIDEBAR INIT ===');
    
    // Function to initialize sidebar
    function initCategorySidebar() {
        // Find the category toggle button
        const categoryToggles = document.querySelectorAll('.menu__toggle');
        let mainCategoryToggle = null;
        
        // Look for toggle with "Toutes les" text
        categoryToggles.forEach(toggle => {
            const span = toggle.querySelector('span');
            if (span) {
                const text = span.textContent || '';
                console.log('Toggle text:', text);
                
                // Simple check for "Toutes les"
                if (text.includes('Toutes les')) {
                    mainCategoryToggle = toggle;
                    console.log('Found toggle with text:', text);
                }
            }
        });
        
        if (!mainCategoryToggle) {
            console.error('Category toggle not found');
            return;
        }
        
        console.log('Using toggle:', mainCategoryToggle);
        
        // Hide the original dropdown menu
        const menuContent = document.querySelector('.menu__content');
        if (menuContent) {
            menuContent.style.display = 'none';
        }
        
        // Remove existing sidebar and overlay if any
        const existingSidebar = document.getElementById('category-sidebar-mobile');
        const existingOverlay = document.getElementById('sidebar-overlay');
        if (existingSidebar) existingSidebar.remove();
        if (existingOverlay) existingOverlay.remove();
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'sidebar-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999998;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        `;
        document.body.appendChild(overlay);
        
        // Create sidebar
        const sidebar = document.createElement('div');
        sidebar.id = 'category-sidebar-mobile';
        sidebar.style.cssText = `
            position: fixed;
            top: 0;
            left: -320px;
            width: 300px;
            height: 100%;
            background-color: white;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
            z-index: 999999;
            transition: left 0.3s ease;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        `;
        
        // Get categories from the menu
        const menuContentElement = document.querySelector('.menu__content');
        let categoriesHTML = '';
        
        if (menuContentElement) {
            const menuList = menuContentElement.querySelector('.menu--dropdown');
            if (menuList) {
                categoriesHTML = menuList.outerHTML;
            } else {
                categoriesHTML = menuContentElement.innerHTML;
            }
        }
        
        // Fallback if no categories found
        if (!categoriesHTML) {
            categoriesHTML = `
                <ul class="menu--dropdown">
                    <li><a href="/product-categories/tubes-de-prelevement">TUBES DE PRELEVEMENT</a></li>
                    <li><a href="/product-categories/aiguilles-et-accessoires">AIGUILLES ET ACCESSOIRES</a></li>
                    <li><a href="/product-categories/les-lames-lamelles">CONSOMMABLES DE LABORATOIRE</a></li>
                    <li><a href="/product-categories/reactifs-de-laboratoire">REACTIFS DE LABORATOIRE</a></li>
                    <li><a href="/product-categories/analyseurs">ANALYSEURS</a></li>
                    <li><a href="/product-categories/equipements-de-laboratoire">EQUIPEMENTS DE LABORATOIRE</a></li>
                </ul>
            `;
        }
        
        // Build sidebar HTML with regular characters
        sidebar.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgb(109, 158, 235), #155f8f);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                position: sticky;
                top: 0;
                z-index: 10;
            ">
                <h3 style="
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12"></line>
                        <line x1="4" x2="20" y1="6" y2="6"></line>
                        <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                    Toutes les categories
                </h3>
                <button id="close-sidebar-btn" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background-color 0.2s;
                ">X</button>
            </div>
            <div style="padding: 10px 0;">
                ${categoriesHTML}
            </div>
        `;
        
        document.body.appendChild(sidebar);
        
        // Style the sidebar categories
        const menuList = sidebar.querySelector('.menu--dropdown');
        if (menuList) {
            menuList.style.border = 'none';
            menuList.style.boxShadow = 'none';
            menuList.style.margin = '0';
            menuList.style.padding = '0';
        }
        
        const links = sidebar.querySelectorAll('.menu--dropdown > li > a');
        links.forEach(link => {
            link.style.cssText = `
                padding: 15px 20px;
                display: flex;
                align-items: center;
                color: #333;
                text-decoration: none;
                border-bottom: 1px solid #f0f0f0;
                transition: all 0.2s;
                font-size: 14px;
                font-weight: 500;
                position: relative;
            `;
            
            link.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f5f5f5';
                this.style.paddingLeft = '25px';
                this.style.color = 'rgb(109, 158, 235)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.paddingLeft = '20px';
                this.style.color = '#333';
            });
        });
        
        const images = sidebar.querySelectorAll('.menu--dropdown img');
        images.forEach(img => {
            img.style.marginRight = '10px';
            img.style.width = '18px';
            img.style.height = '18px';
        });
        
        const closeBtn = document.getElementById('close-sidebar-btn');
        
        // Function to open sidebar
        function openSidebar(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Opening sidebar');
            sidebar.style.left = '0';
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
        }
        
        // Function to close sidebar
        function closeSidebar() {
            console.log('Closing sidebar');
            sidebar.style.left = '-320px';
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            document.body.style.overflow = '';
        }
        
        // Add click event to category toggle
        mainCategoryToggle.addEventListener('click', openSidebar);
        mainCategoryToggle.style.cursor = 'pointer';
        
        // Close button click
        if (closeBtn) {
            closeBtn.addEventListener('click', closeSidebar);
        }
        
        // Overlay click
        overlay.addEventListener('click', closeSidebar);
        
        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.style.left === '0px') {
                closeSidebar();
            }
        });
        
        // Prevent sidebar clicks from closing
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        console.log('Category sidebar initialized successfully');
    }
    
    // Try to initialize immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCategorySidebar);
    } else {
        initCategorySidebar();
    }
    
    // Retry after a short delay in case of dynamic content
    setTimeout(initCategorySidebar, 500);
    setTimeout(initCategorySidebar, 1500);
    
})();
