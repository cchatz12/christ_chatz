// ===== Portfolio JavaScript =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLoader();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeTypingEffect();
});

// ===== Loader Functionality =====
function initializeLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 500);
    });
}

// ===== Navigation Functionality =====
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navItems = document.getElementById('navItems');
    
    if (mobileMenuBtn && navItems) {
        mobileMenuBtn.addEventListener('click', () => {
            navItems.classList.toggle('show');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                navItems.classList.remove('show');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (navItems) {
                    navItems.classList.remove('show');
                }
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-items a[href^="#"]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = 'var(--primary)';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();
}

// ===== Scroll Effects =====
function initializeScrollEffects() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.querySelector('header');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Show/hide FAB and header elevation on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Show/hide floating action button
        if (scrollToTopBtn) {
            if (currentScroll > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
        
        // Header elevation on scroll
        if (header) {
            if (currentScroll > 10) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
        }
    });

}

// ===== Intersection Observer Animations =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(el => {
        observer.observe(el);
    });

    // Animate chips on hover
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        chip.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Staggered animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== Typing Effect =====
function initializeTypingEffect() {
    const subtitle = document.getElementById('heroSubtitle');
    if (subtitle) {
        const text = 'Electrical & Computer Engineer | TUC Graduate';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// ===== Additional Interactive Features =====
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced hover effects for cards
    document.querySelectorAll('.card, .project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            const navItems = document.getElementById('navItems');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            
            if (navItems && navItems.classList.contains('show')) {
                navItems.classList.remove('show');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }
    });

    // Form submission handling (for contact forms if added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form handling logic here
            console.log('Form submitted');
        });
    });
});

// ===== Performance Optimization =====
(function() {
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for resize events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Optimize scroll events
    const optimizedScroll = debounce(() => {
        // Scroll-based animations
    }, 10);

    window.addEventListener('scroll', optimizedScroll);

    // Optimize resize events
    const optimizedResize = throttle(() => {
        // Responsive adjustments
    }, 250);

    window.addEventListener('resize', optimizedResize);
})();

// ===== Page Load Animations =====
window.addEventListener('load', function() {
    // Fade in body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});

// ===== Utility Functions =====
const utils = {
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element
    scrollToElement: function(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

// Export for potential external use
window.portfolioUtils = utils;
