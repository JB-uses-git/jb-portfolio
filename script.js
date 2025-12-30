// ===================================
// SMOOTH SCROLL & NAVIGATION
// ===================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Update active link
            updateActiveLink(this);
        }
    });
});

// Update active navigation link
function updateActiveLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MOBILE NAVIGATION TOGGLE
// ===================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===================================
// INTERSECTION OBSERVER FOR SECTIONS
// ===================================

// Update active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===================================
// SCROLL ANIMATIONS (AOS Alternative)
// ===================================

const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations
animateOnScroll();

// ===================================
// TYPING EFFECT
// ===================================

const typingText = document.querySelector('.typing-text');
const titles = [
    'Front-End Developer',
    'Web Engineer',
    'React Developer',
    'UI/UX Enthusiast'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function typeTitle() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingDelay = 500;
    }
    
    setTimeout(typeTitle, typingDelay);
}

// Start typing effect after page load
setTimeout(typeTitle, 1000);

// ===================================
// SCROLL TO TOP ON PAGE LOAD
// ===================================

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ===================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ===================================

const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translate(0, ${scrolled * speed}px)`;
    });
});

// ===================================
// PROJECT CARDS TILT EFFECT (SUBTLE)
// ===================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ===================================
// SKILL CATEGORY STAGGER ANIMATION
// ===================================

const skillCategories = document.querySelectorAll('.skill-category');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(category);
});

// ===================================
// COPY EMAIL TO CLIPBOARD
// ===================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copied!';
        tooltip.style.position = 'fixed';
        tooltip.style.top = '20px';
        tooltip.style.right = '20px';
        tooltip.style.padding = '12px 24px';
        tooltip.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        tooltip.style.color = 'white';
        tooltip.style.borderRadius = '50px';
        tooltip.style.fontWeight = '600';
        tooltip.style.zIndex = '10000';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(tooltip);
        
        // Animate in
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
        
        // Copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            // Animate out and remove
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 300);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
            tooltip.textContent = 'Failed to copy';
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 300);
            }, 2000);
        });
    });
});

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

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

// Apply debounce to heavy scroll handlers
const debouncedScroll = debounce(() => {
    // Any heavy scroll calculations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);

// ===================================
// PRELOADER (OPTIONAL)
// ===================================

window.addEventListener('load', () => {
    // Add any preloader logic here if needed
    document.body.classList.add('loaded');
});

// ===================================
// EASTER EGG: KONAMI CODE
// ===================================

let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            
            // Add rainbow animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLooking at the code? I like your style! 🚀', 'font-size: 14px; color: #764ba2;');
console.log('%cFeel free to reach out if you want to collaborate!', 'font-size: 12px; color: #a1a1aa;');

// ===================================
// SMOOTH REVEAL ON SCROLL
// ===================================

// Add stagger delay to elements with data-aos-delay
document.querySelectorAll('[data-aos-delay]').forEach(element => {
    const delay = element.getAttribute('data-aos-delay');
    element.style.transitionDelay = `${delay}ms`;
});
