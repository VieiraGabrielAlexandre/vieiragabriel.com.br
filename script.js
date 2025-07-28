// Typing Effect
const titles = [
    'Desenvolvedor Full Stack',
    'Engenheiro de Software',
    'Arquiteto de Software Distribuído',
    'Especialista em Cloud',
    'Tech Lead',
    'Staff Engineer',
    'Especialista em IA',
    'Low-Code & No-Code'
];

let currentTitleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typed-text');

function typeEffect() {
    const currentTitle = titles[currentTitleIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typedTextElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentCharIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before next title
    }

    setTimeout(typeEffect, typeSpeed);
}

// Tech Cards Animation
function animateTechCards() {
    const techCards = document.querySelectorAll('.tech-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
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
}

// Intersection Observer for animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.tech-section, .specialty-card, .education-card, .timeline-item, .timeline-parallel');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax effect for floating elements
function initParallax() {
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Initialize Lucide icons
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize icons first
    initIcons();

    // Start typing effect
    setTimeout(typeEffect, 1000);

    // Initialize other features
    animateTechCards();
    animateSkillCategories();
    initSkillsCarousel();
    initSmoothScroll();
    initScrollAnimations();
    initParallax();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Skills Carousel Animation
function initSkillsCarousel() {
    const carouselRows = document.querySelectorAll('.carousel-row');

    // Add random delays to create more organic movement
    carouselRows.forEach((row, index) => {
        const randomDelay = Math.random() * 5; // 0-5 seconds random delay
        row.style.animationDelay = `-${randomDelay}s`;

        // Vary animation speeds slightly
        const baseSpeed = 60;
        const speedVariation = (Math.random() - 0.5) * 10; // ±5 seconds
        row.style.animationDuration = `${baseSpeed + speedVariation}s`;
    });

    // Add hover effects to individual pills
    const skillPills = document.querySelectorAll('.skill-pill');
    skillPills.forEach(pill => {
        pill.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });

        pill.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
}

// Skill Categories Animation
function animateSkillCategories() {
    const skillCategories = document.querySelectorAll('.skill-category');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';

                    // Animate skill tags with stagger
                    const skillTags = entry.target.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, tagIndex) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateX(0)';
                        }, tagIndex * 100);
                    });
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px) scale(0.95)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Hide skill tags initially
        const skillTags = category.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateX(-20px)';
            tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });

        observer.observe(category);
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Reinitialize icons after resize
    setTimeout(initIcons, 100);
});

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Add subtle cursor following effect
        cursor.style.transform = `translate(${mouseX * 0.01}px, ${mouseY * 0.01}px)`;
    }
});

// Add click effects to buttons
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

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);