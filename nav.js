// Category Sidebar - Click to Open (Marjanemall Style) with Subcategories
(function() {
    console.log('=== CATEGORY SIDEBAR INIT 2 ===');
    
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
                    <li class="menu-item-has-children">
                        <a href="/product-categories/aiguilles-et-accessoires">AIGUILLES ET ACCESSOIRES</a>
                        <span class="sub-toggle"></span>
                        <ul class="mega-menu">
                            <li><a href="/product-categories/aiguilles">AIGUILLES DE PRELEVEMENT</a></li>
                            <li><a href="/product-categories/accessoires-pour-aiguilles">ACCESSOIRES POUR AIGUILLES</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children">
                        <a href="/product-categories/les-lames-lamelles">CONSOMMABLES DE LABORATOIRE</a>
                        <span class="sub-toggle"></span>
                        <ul class="mega-menu">
                            <li><a href="/product-categories/les-boites-de-petries">LES BOITES DE PETRIES</a></li>
                        </ul>
                    </li>
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
                ">×</button>
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
        
        // Style all category links
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
        
        // Style subcategory links
        const subLinks = sidebar.querySelectorAll('.mega-menu a, .sub-menu a');
        subLinks.forEach(link => {
            link.style.cssText = `
                padding: 10px 20px 10px 40px;
                display: block;
                color: #666;
                text-decoration: none;
                border-bottom: 1px solid #f5f5f5;
                font-size: 13px;
                transition: all 0.2s;
            `;
            
            link.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f9f9f9';
                this.style.color = 'rgb(109, 158, 235)';
                this.style.paddingLeft = '45px';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.color = '#666';
                this.style.paddingLeft = '40px';
            });
        });
        
        // Style mega menu containers
        const megaMenus = sidebar.querySelectorAll('.mega-menu');
        megaMenus.forEach(menu => {
            menu.style.cssText = `
                display: none;
                background-color: #fafafa;
                border-left: 3px solid rgb(109, 158, 235);
                margin: 0;
                padding: 5px 0;
                list-style: none;
            `;
        });
        
        // Style sub-toggle buttons
        const subToggles = sidebar.querySelectorAll('.sub-toggle');
        subToggles.forEach(toggle => {
            toggle.style.cssText = `
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #999;
                font-size: 20px;
                z-index: 10;
                transition: transform 0.2s;
            `;
            toggle.textContent = '+';
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
        
        // Initialize subcategory toggles
        function initSubToggles() {
            const toggles = sidebar.querySelectorAll('.sub-toggle');
            
            toggles.forEach(toggle => {
                // Remove any existing click listeners
                toggle.removeEventListener('click', toggleClickHandler);
                // Add new click listener
                toggle.addEventListener('click', toggleClickHandler);
            });
        }
        
        // Toggle click handler
        function toggleClickHandler(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const toggle = e.currentTarget;
            const parentLi = toggle.closest('li.menu-item-has-children');
            
            if (!parentLi) return;
            
            // Find the mega menu or sub-menu
            const subMenu = parentLi.querySelector('.mega-menu, .sub-menu');
            
            if (subMenu) {
                if (subMenu.style.display === 'none' || subMenu.style.display === '') {
                    // Open submenu
                    subMenu.style.display = 'block';
                    toggle.textContent = '−';
                    toggle.style.transform = 'translateY(-50%) rotate(0deg)';
                } else {
                    // Close submenu
                    subMenu.style.display = 'none';
                    toggle.textContent = '+';
                    toggle.style.transform = 'translateY(-50%) rotate(0deg)';
                }
            }
            
            console.log('Toggle clicked for:', parentLi.querySelector('a')?.textContent);
        }
        
        // Initialize toggles after sidebar is created
        initSubToggles();
        
        // Re-initialize toggles if new content is added (for dynamic content)
        const observer = new MutationObserver(function() {
            initSubToggles();
        });
        
        observer.observe(sidebar, { childList: true, subtree: true });
        
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
