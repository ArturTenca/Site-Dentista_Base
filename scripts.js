// Init Icons
lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });

// Navbar Interaction
const nav = document.getElementById('navbar');
const navBg = document.getElementById('nav-bg');
const navContainer = document.getElementById('nav-container');
const logoText = document.getElementById('logo-text');
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelectorAll('.nav-link');

function updateNav() {
    if(!nav || !navBg) return;
    
    // Check if we are on the homepage or an internal page
    const isHomePage = document.body.classList.contains('home-page');
    
    if (window.scrollY > 50 || !isHomePage) {
        // Scrolled State OR internal page state
        nav.classList.add('pt-[10px]', 'px-[10px]');
        navBg.classList.remove('inset-0', 'bg-transparent');
        navBg.classList.add('top-[10px]', 'left-[10px]', 'right-[10px]', 'bottom-auto', 'h-20', 'rounded-[15px]', 'bg-white/60', 'backdrop-blur-lg', 'border', 'border-neutral-100', 'shadow-sm');
        
        if (navContainer) {
            navContainer.classList.remove('bg-white/5', 'border-white/10');
            navContainer.classList.add('bg-neutral-100/50', 'border-neutral-200');
        }
        
        if (logoText) {
            // Toggle Logo Text to Black
            logoText.classList.remove('text-white');
            logoText.classList.add('text-neutral-950');
        }

        if (navLinks) {
            navLinks.forEach(el => {
                if(!el.classList.contains('bg-cyan-50')) {
                    el.classList.remove('text-white/90', 'hover:text-white');
                    el.classList.add('text-neutral-600', 'hover:text-neutral-900');
                }
            });
        }
        
        if (mobileToggle) {
            mobileToggle.classList.remove('text-white');
            mobileToggle.classList.add('text-neutral-900');
        }

    } else if (isHomePage) {
        // Top State (Home Page Only)
        nav.classList.remove('pt-[10px]', 'px-[10px]');
        navBg.classList.remove('top-[10px]', 'left-[10px]', 'right-[10px]', 'bottom-auto', 'h-20', 'rounded-[15px]', 'bg-white/60', 'backdrop-blur-lg', 'border', 'border-neutral-100', 'shadow-sm');
        navBg.classList.add('inset-0', 'bg-transparent');
        
        if(navContainer) {
            navContainer.classList.add('bg-white/5', 'border-white/10');
            navContainer.classList.remove('bg-neutral-100/50', 'border-neutral-200');
        }

        if (logoText) {
            // Toggle Logo Text to White
            logoText.classList.add('text-white');
            logoText.classList.remove('text-neutral-950');
        }

        if (navLinks) {
            navLinks.forEach(el => {
                el.classList.add('text-white/90', 'hover:text-white');
                el.classList.remove('text-neutral-600', 'hover:text-neutral-900');
            });
        }

        if (mobileToggle) {
            mobileToggle.classList.add('text-white');
            mobileToggle.classList.remove('text-neutral-900');
        }
    }
}
window.addEventListener('scroll', updateNav);
updateNav(); // Init

// Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if(!menu) return;
    if (menu.classList.contains('opacity-0')) {
        menu.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        menu.classList.add('opacity-0', 'pointer-events-none');
    }
}
if(document.getElementById('mobile-toggle')) {
    document.getElementById('mobile-toggle').addEventListener('click', toggleMobileMenu);
}

// Comparison Slider
const slider = document.getElementById('comparisonSlider');
const overlay = document.getElementById('comparisonOverlay');
const handle = document.getElementById('comparisonHandle');
const beforeImg = document.getElementById('comparisonImageBefore');
let isDown = false;

function updateSlider(x) {
    if(!slider) return;
    const rect = slider.getBoundingClientRect();
    let pos = ((x - rect.left) / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    overlay.style.width = `${pos}%`;
    handle.style.left = `${pos}%`;
}

if(slider) {
    slider.addEventListener('mousedown', () => isDown = true);
    window.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mousemove', (e) => { if(isDown) updateSlider(e.clientX) });
    
    slider.addEventListener('touchstart', (e) => { isDown = true; updateSlider(e.touches[0].clientX); }, {passive: true});
    window.addEventListener('touchend', () => isDown = false);
    slider.addEventListener('touchmove', (e) => { if(isDown) updateSlider(e.touches[0].clientX); }, {passive: true});

    // Sync image width
    const syncWidth = () => { if(beforeImg) beforeImg.style.width = `${slider.offsetWidth}px`; }
    window.addEventListener('resize', syncWidth);
    syncWidth();
}

// Number Counter Animation
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            const duration = 2000;
            let startTime = null;
            
            function updateCounter(currentTime) {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easeProgress = progress * (2 - progress); // easeOutQuad
                let current = Math.floor(easeProgress * target);
                
                if (target >= 1000 && current >= target) {
                    entry.target.textContent = '1000';
                } else {
                    entry.target.textContent = current;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            requestAnimationFrame(updateCounter);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.js-counter').forEach(el => counterObserver.observe(el));

// Intersection Observer for Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));
