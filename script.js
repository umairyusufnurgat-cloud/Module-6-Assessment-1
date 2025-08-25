// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Hero Image Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animated Counter for Statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stats section
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                }
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('destinations-grid') || 
                    entry.target.classList.contains('features-grid')) {
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Elements to observe for animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .zoom-in, .stats-section, .destinations-grid, .features-grid');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to elements
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
    });

    document.querySelectorAll('.destination-card').forEach((card, index) => {
        card.classList.add('zoom-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.classList.add('slide-left');
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Newsletter Form Handling
    const newsletterForm = document.querySelector('.newsletter-form form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate form submission
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = 'Subscribing...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = 'Subscribed!';
                    button.style.background = '#27ae60';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.background = '';
                        this.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Loading Animation for Images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Add loading class for CSS styling
        img.classList.add('loading');
    });

    // Hero Scroll Button Functionality
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const featuredSection = document.querySelector('#featured');
            if (featuredSection) {
                featuredSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Card Hover Effects
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social Media Links Animation
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

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

    // Lazy Loading for Images (if Intersection Observer is supported)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Arrow keys for hero slider navigation
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const heroSection = document.querySelector('.hero');
            if (heroSection && isElementInViewport(heroSection)) {
                if (e.key === 'ArrowRight') {
                    nextSlide();
                } else {
                    // Previous slide
                    slides[currentSlide].classList.remove('active');
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    slides[currentSlide].classList.add('active');
                }
            }
        }
    });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Performance optimization: Debounce scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Navbar background change
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Parallax effect
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Add custom cursor effect for interactive elements
    document.querySelectorAll('a, button, .destination-card').forEach(element => {
        element.style.cursor = 'pointer';
    });

    console.log('Travel World website initialized successfully! 🌍✈️');
});
