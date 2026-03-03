// Category Sidebar - Click to Open (Marjanemall Style) with Subcategories
(function() {
    console.log('=== CATEGORY SIDEBAR INIT WITH REAL CATEGORIES ===');
    
    // Function to initialize sidebar
    function initCategorySidebar() {
        // Find the category toggle button
        const categoryToggles = document.querySelectorAll('.menu__toggle');
        let mainCategoryToggle = null;
        
        // Look for toggle with "Toutes les" text
        categoryToggles.forEach(toggle => {
            const span = toggle.querySelector('span');
            if (span && span.textContent.includes('Toutes les')) {
                mainCategoryToggle = toggle;
                console.log('Found toggle with text:', span.textContent);
            }
        });
        
        if (!mainCategoryToggle) {
            console.error('Category toggle not found');
            return;
        }
        
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
        
        // Get REAL categories from the menu
        const menuContentElement = document.querySelector('.menu__content');
        let categoriesHTML = '';
        
        if (menuContentElement) {
            const menuList = menuContentElement.querySelector('.menu--dropdown');
            if (menuList) {
                // Clone to avoid modifying original
                categoriesHTML = menuList.cloneNode(true).outerHTML;
            }
        }
        
        // If categories found, use them
        if (!categoriesHTML) {
            console.error('No categories found in menu');
            return;
        }
        
        // Build sidebar HTML
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
                    Toutes les catégories
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
            <div class="sidebar-categories">
                ${categoriesHTML}
            </div>
        `;
        
        document.body.appendChild(sidebar);
        
        // Style the sidebar
        styleSidebar(sidebar);
        
        // Setup toggle functionality
        setupSubcategoryToggles(sidebar);
        
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
            
            // Reinitialize toggles when sidebar opens
            setTimeout(() => setupSubcategoryToggles(sidebar), 100);
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
        
        console.log('Category sidebar initialized with REAL categories');
    }
    
    // Function to style sidebar elements
    function styleSidebar(sidebar) {
        // Style main menu
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
                width: 100%;
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
        
        // Style category images
        const images = sidebar.querySelectorAll('.menu--dropdown img');
        images.forEach(img => {
            img.style.marginRight = '10px';
            img.style.width = '18px';
            img.style.height = '18px';
        });
        
        // Style mega menu containers
        const megaMenus = sidebar.querySelectorAll('.mega-menu');
        megaMenus.forEach(menu => {
            menu.style.cssText = `
                display: none;
                background-color: #f9f9f9;
                border-left: 3px solid rgb(109, 158, 235);
                margin: 0;
                padding: 0;
                list-style: none;
                width: 100%;
            `;
        });
        
        // Style mega menu columns
        const megaColumns = sidebar.querySelectorAll('.mega-menu__column');
        megaColumns.forEach(column => {
            column.style.margin = '0';
            column.style.padding = '0';
        });
        
        // Style subcategory links
        const subLinks = sidebar.querySelectorAll('.mega-menu a, .mega-menu__column a');
        subLinks.forEach(link => {
            link.style.cssText = `
                padding: 10px 20px 10px 40px;
                display: block;
                color: #666;
                text-decoration: none;
                border-bottom: 1px solid #f0f0f0;
                font-size: 13px;
                transition: all 0.2s;
            `;
            
            link.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f0f0f0';
                this.style.color = 'rgb(109, 158, 235)';
                this.style.paddingLeft = '45px';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.color = '#666';
                this.style.paddingLeft = '40px';
            });
        });
    }
    
    // Function to setup subcategory toggles
    function setupSubcategoryToggles(sidebar) {
        // Find all parent items that have mega menus
        const parentItems = sidebar.querySelectorAll('li.menu-item-has-children');
        
        parentItems.forEach(item => {
            // Find existing toggle or create new one
            let toggle = item.querySelector('.sub-toggle');
            
            if (!toggle) {
                toggle = document.createElement('span');
                toggle.className = 'sub-toggle';
                toggle.innerHTML = '+';
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
                    font-weight: bold;
                    z-index: 20;
                    transition: all 0.2s;
                    background: transparent;
                    border-radius: 50%;
                `;
                
                toggle.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = 'rgba(109, 158, 235, 0.1)';
                    this.style.color = 'rgb(109, 158, 235)';
                });
                
                toggle.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = 'transparent';
                    this.style.color = '#999';
                });
                
                // Make parent item position relative for absolute positioning
                item.style.position = 'relative';
                item.appendChild(toggle);
            }
            
            // Find the mega menu
            const megaMenu = item.querySelector('.mega-menu');
            if (megaMenu) {
                // Ensure mega menu is hidden initially
                megaMenu.style.display = 'none';
                
                // Remove old click listener and add new one
                toggle.replaceWith(toggle.cloneNode(true));
                const newToggle = item.querySelector('.sub-toggle');
                
                newToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (megaMenu.style.display === 'none') {
                        megaMenu.style.display = 'block';
                        this.innerHTML = '−';
                    } else {
                        megaMenu.style.display = 'none';
                        this.innerHTML = '+';
                    }
                });
            }
        });
        
        console.log(`Setup ${parentItems.length} subcategory toggles`);
    }
    
    // Initialize sidebar
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCategorySidebar);
        } else {
            initCategorySidebar();
        }
        
        // Retry after delays
        setTimeout(initCategorySidebar, 1000);
        setTimeout(initCategorySidebar, 2000);
    }
    
    init();
    
})();
