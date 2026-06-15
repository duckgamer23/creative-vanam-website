// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 17, 42, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 17, 42, 0.95)';
    }
});

// Intersection Observer for staggered fade-in animations of content elements
const animateObserverOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.why-item, .service-card, .process-step, .testimonial-card, .stat, .service-detail, .contact-left, .contact-right, .booking-left, .booking-right');
            children.forEach((child, index) => {
                child.style.opacity = '0';
                child.style.animation = `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s forwards`;
            });
            animateObserver.unobserve(entry.target);
        }
    });
}, animateObserverOptions);

// Observe sections that contain animatable children
document.querySelectorAll('section').forEach(section => {
    const children = section.querySelectorAll('.why-item, .service-card, .process-step, .testimonial-card, .stat, .service-detail, .contact-left, .contact-right, .booking-left, .booking-right');
    if (children.length > 0) {
        children.forEach(child => {
            child.style.opacity = '0';
        });
        animateObserver.observe(section);
    } else {
        // Fallback: fade in the whole section if it has no animatable children
        section.style.opacity = '0';
        const sectionObserver = new IntersectionObserver((secEntries) => {
            secEntries.forEach(secEntry => {
                if (secEntry.isIntersecting) {
                    secEntry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    sectionObserver.unobserve(secEntry.target);
                }
            });
        }, { threshold: 0.1 });
        sectionObserver.observe(section);
    }
});

// CTA Button interactions with ripple effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255,255,255,0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        const style = document.createElement('style');
        if (!document.querySelector('style[data-ripple]')) {
            style.setAttribute('data-ripple', '');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    });
}

// Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks) {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

console.log('CreativeVanam Website Loaded Successfully ✅');