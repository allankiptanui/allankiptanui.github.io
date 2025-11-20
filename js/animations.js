// Advanced animations and effects

class PortfolioAnimations {
    constructor() {
        this.initializeTypingEffect();
        this.initializeCounterAnimation();
        this.initializeParallaxEffect();
        this.initializeSkillBars();
    }
    
    // Typing effect for hero section
    initializeTypingEffect() {
        const typingElement = document.querySelector('.typing-effect');
        if (!typingElement) return;
        
        const texts = JSON.parse(typingElement.getAttribute('data-texts') || '[]');
        if (texts.length === 0) return;
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingDelay = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingDelay = 500;
            }
            
            setTimeout(type, typingDelay);
        }
        
        setTimeout(type, 1000);
    }
    
    // Animated counters for statistics
    initializeCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        if (counters.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Parallax effect for background elements
    initializeParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Animate skill bars on scroll
    initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        if (skillBars.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const level = skillBar.getAttribute('data-level');
                    skillBar.style.width = level + '%';
                    skillBar.classList.add('animated');
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});

// Additional animation utilities
const AnimationUtils = {
    // Fade in elements sequentially
    staggerFadeIn: (elements, delay = 100) => {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * delay);
        });
    },
    
    // Create a wave effect
    waveEffect: (elements, delay = 100) => {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('wave');
                setTimeout(() => element.classList.remove('wave'), 600);
            }, index * delay);
        });
    },
    
    // Toggle dark/light mode (for future use)
    toggleTheme: () => {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Update theme toggle button
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        }
    }
};

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
}