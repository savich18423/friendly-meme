document.addEventListener('DOMContentLoaded', function() {
    initGameFilters();
    initMobileMenu();
    initScrollEffects();
    initHoverEffects();
    initJackpotTimer();
    initGameCardAnimations();
    initFAQAccordion();
    initScrollAnimations();
    initMobileHomeButton();
    initResponsiveText();
    initSmoothScrolling();
    initPerformanceOptimization();
});

function initResponsiveText() {
    function updateText() {
        const desktopText = document.querySelector('.desktop-text');
        const mobileText = document.querySelector('.mobile-text');
        
        if (!desktopText || !mobileText) return;
        
        if (window.innerWidth <= 767) {
            desktopText.style.display = 'none';
            mobileText.style.display = 'block';
        } else {
            desktopText.style.display = 'block';
            mobileText.style.display = 'none';
        }
    }
    
    updateText();
    window.addEventListener('resize', updateText);
}

function initGameFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'translateY(0)';
            });
            
            button.classList.add('active');
            button.style.transform = 'translateY(-5px)';
            
            const filter = button.getAttribute('data-filter');
            
            gameCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) rotateX(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px) rotateX(-20deg)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!menuBtn || !mobileNav) return;
    
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuBtn.innerHTML = mobileNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });
}

function initMobileHomeButton() {
    const homeBtn = document.getElementById('mobileHomeBtn');
    
    if (homeBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                homeBtn.style.display = 'flex';
            } else {
                homeBtn.style.display = 'none';
            }
        });
        
        homeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initScrollEffects() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.mobile-nav a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        const scrollPos = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            
            const targetId = href.substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const sectionTop = targetElement.offsetTop;
                const sectionHeight = targetElement.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
}

function initHoverEffects() {
    document.querySelectorAll('.btn, .play-button, .header-btn, .filter-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '1000';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
}

function initJackpotTimer() {
    const timerElement = document.getElementById('jackpotTimer');
    if (!timerElement) return;
    
    let seconds = 23 * 86400 + 9 * 3600 + 52 * 60 + 19;
    
    function updateTimer() {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        timerElement.textContent = 
            `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        seconds--;
        if (seconds < 0) {
            seconds = 30 * 86400;
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

function initGameCardAnimations() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'card-enter 0.8s ease-out forwards';
        }, index * 100);
    });
}

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                const mobileNav = document.getElementById('mobileNav');
                const menuBtn = document.getElementById('mobileMenuBtn');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

function initPerformanceOptimization() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.opacity = '1';  
            img.style.transition = 'opacity 0.5s';
        });
    });
}
