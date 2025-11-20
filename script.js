// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6366f1'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6366f1',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Typing animation for hero subtitle
const typingTexts = [
    'Web Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Creative Thinker'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeWriter() {
    const currentText = typingTexts[currentTextIndex];
    const typingElement = document.querySelector('.typing-text');

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseTime);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 35, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-fill');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (barTop < windowHeight - 50) {
            bar.style.width = bar.style.width || '0%';
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .contact-item, .stat').forEach(el => {
    observer.observe(el);
});

// Contact form validation and submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission (in a real app, you'd send this to a server)
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
}

// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        animateSkillBars();
        animateOnScroll();
    }, 10);
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    animateOnScroll();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Floating animation for tech icons
function addFloatingAnimation() {
    const icons = document.querySelectorAll('.icon-wrapper');
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('floating');
    });
}

// Pulse animation for stats
function addPulseAnimation() {
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.3}s`;
        stat.classList.add('pulse');
    });
}

// Fade in animation for sections
function addFadeInAnimation() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Bounce animation for buttons on hover
function addButtonBounce() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('bounce');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('bounce');
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    addFloatingAnimation();
    addPulseAnimation();
    addFadeInAnimation();
    addButtonBounce();
});

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: #fff;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        background: rgba(34, 197, 94, 0.9);
        border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .notification.error {
        background: rgba(239, 68, 68, 0.9);
        border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(15, 15, 35, 0.98);
        backdrop-filter: blur(20px);
        padding: 2rem;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    body.loaded .hero-content {
        animation: slideInLeft 1s ease-out;
    }

    body.loaded .hero-image {
        animation: slideInRight 1s ease-out 0.3s both;
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* New animations */
    .floating {
        animation: floating 3s ease-in-out infinite;
    }

    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .fade-in {
        animation: fadeIn 1s ease-out forwards;
        opacity: 0;
    }

    @keyframes fadeIn {
        to { opacity: 1; }
    }

    .bounce {
        animation: bounce 0.6s ease;
    }

    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
        40%, 43% { transform: translate3d(0, -8px, 0); }
        70% { transform: translate3d(0, -4px, 0); }
        90% { transform: translate3d(0, -2px, 0); }
    }
`;
document.head.appendChild(style);
