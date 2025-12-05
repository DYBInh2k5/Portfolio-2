// Mobile Menu Component
class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createMobileMenu();
        this.attachEventListeners();
    }

    createMobileMenu() {
        // Check if menu already exists
        if (document.getElementById('mobile-menu-overlay')) return;

        const menuHTML = `
            <!-- Mobile Menu Overlay -->
            <div id="mobile-menu-overlay" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] hidden">
                <div id="mobile-menu-sidebar" class="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-[#191933] transform translate-x-full transition-transform duration-300 ease-out overflow-y-auto">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-6 border-b border-white/10">
                        <div class="flex items-center gap-3">
                            <div class="size-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary">
                                    <path clip-rule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-white font-bold text-sm">Võ Duy Bình</h2>
                                <p class="text-white/40 text-xs">Portfolio</p>
                            </div>
                        </div>
                        <button id="mobile-menu-close" class="text-white/60 hover:text-white transition-colors">
                            <span class="material-symbols-outlined text-3xl">close</span>
                        </button>
                    </div>

                    <!-- Navigation -->
                    <nav class="p-6 space-y-2">
                        <a href="index.html" class="mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors">
                            <span class="material-symbols-outlined">home</span>
                            <span>Trang chủ</span>
                        </a>
                        <a href="about.html" class="mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors">
                            <span class="material-symbols-outlined">person</span>
                            <span>Giới thiệu</span>
                        </a>
                        <a href="skills.html" class="mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors">
                            <span class="material-symbols-outlined">psychology</span>
                            <span>Kỹ năng</span>
                        </a>
                        <a href="projects.html" class="mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors">
                            <span class="material-symbols-outlined">folder</span>
                            <span>Dự án</span>
                        </a>
                        <a href="experience.html" class="mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors">
                            <span class="material-symbols-outlined">work</span>
                            <span>Kinh nghiệm</span>
                        </a>
                        <a href="blog.html" class="mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors">
                            <span class="material-symbols-outlined">article</span>
                            <span>Blog</span>
                        </a>
                        <a href="contact.html" class="mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors">
                            <span class="material-symbols-outlined">mail</span>
                            <span>Liên hệ</span>
                        </a>
                    </nav>

                    <!-- Social Links -->
                    <div class="px-6 py-4 border-t border-white/10">
                        <p class="text-white/40 text-xs mb-3">Kết nối với tôi</p>
                        <div class="flex gap-3">
                            <a href="https://github.com" target="_blank" class="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                <span class="material-symbols-outlined text-white text-xl">code</span>
                            </a>
                            <a href="https://linkedin.com" target="_blank" class="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                <span class="material-symbols-outlined text-white text-xl">business_center</span>
                            </a>
                            <a href="mailto:voduybinh@example.com" class="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                <span class="material-symbols-outlined text-white text-xl">mail</span>
                            </a>
                        </div>
                    </div>

                    <!-- Download CV -->
                    <div class="px-6 pb-6">
                        <button class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors">
                            <span class="material-symbols-outlined">download</span>
                            <span>Tải CV</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', menuHTML);
    }

    attachEventListeners() {
        // Open menu
        const menuButtons = document.querySelectorAll('#mobile-menu-btn, [data-mobile-menu-btn]');
        menuButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.open();
            });
        });

        // Close menu
        const closeBtn = document.getElementById('mobile-menu-close');
        const overlay = document.getElementById('mobile-menu-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close();
                }
            });
        }

        // Close on menu item click
        document.querySelectorAll('.mobile-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(() => this.close(), 200);
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Highlight current page
        this.highlightCurrentPage();
    }

    open() {
        const overlay = document.getElementById('mobile-menu-overlay');
        const sidebar = document.getElementById('mobile-menu-sidebar');
        
        if (overlay && sidebar) {
            this.isOpen = true;
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Trigger animation
            setTimeout(() => {
                sidebar.style.transform = 'translateX(0)';
            }, 10);
        }
    }

    close() {
        const overlay = document.getElementById('mobile-menu-overlay');
        const sidebar = document.getElementById('mobile-menu-sidebar');
        
        if (overlay && sidebar) {
            this.isOpen = false;
            sidebar.style.transform = 'translateX(100%)';
            document.body.style.overflow = '';
            
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 300);
        }
    }

    highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuItems = document.querySelectorAll('.mobile-menu-item');
        
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('bg-primary', 'text-white');
                item.classList.remove('hover:bg-white/5');
            }
        });
    }
}

// Initialize mobile menu when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MobileMenu();
    });
} else {
    new MobileMenu();
}
