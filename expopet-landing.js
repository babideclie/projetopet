// ===============================================
// EXPOPET LANDING PAGE - INTERACTIVE ELEMENTS
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === FAQ ACCORDION ===
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // === FLOATING DONATE BUTTON VISIBILITY ===
    const floatingDonate = document.getElementById('floatingDonate');
    
    window.addEventListener('scroll', function() {
        // Show button after scrolling 500px
        if (window.scrollY > 500) {
            floatingDonate.classList.add('visible');
        } else {
            floatingDonate.classList.remove('visible');
        }
    });

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for valid section IDs
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === ANIMATE ELEMENTS ON SCROLL (OPTIONAL) ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.stat-card, .help-card, .testimonial-card, .budget-item'
    );

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // === COUNTER ANIMATION FOR STATS (OPTIONAL ENHANCEMENT) ===
    const statNumbers = document.querySelectorAll('.urgency-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = stat.textContent;
            // Only animate if it's a pure number
            if (!isNaN(target.replace('+', ''))) {
                const num = parseInt(target.replace('+', ''));
                const increment = num / 50;
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < num) {
                        stat.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
        
        countersAnimated = true;
    }

    // Trigger counter animation when urgency section is visible
    const urgencySection = document.querySelector('.urgency');
    if (urgencySection) {
        const urgencyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });
        
        urgencyObserver.observe(urgencySection);
    }

    // === UPDATE EXTERNAL LINKS (ADD YOUR REAL LINKS HERE) ===
    // This section allows you to easily update all donation/purchase links
    const links = {
        vakinha: 'https://www.vakinha.com.br/YOUR-CAMPAIGN-ID', // Replace with real Vakinha link
        guia: 'https://pay.hotmart.com/YOUR-PRODUCT-ID', // Replace with real guide purchase link
        rifas: 'https://www.rifei.com/YOUR-RAFFLE-ID' // Replace with real raffle link
    };

    // Update all links in the page
    document.querySelectorAll('a[href="#"]').forEach(link => {
        const text = link.textContent.toLowerCase();
        
        if (text.includes('vakinha') || text.includes('doar')) {
            link.href = links.vakinha;
        } else if (text.includes('guia')) {
            link.href = links.guia;
        } else if (text.includes('rifa')) {
            link.href = links.rifas;
        }
    });

    // === CONSOLE MESSAGE FOR DEVELOPERS ===
    console.log('%c🐾 EXPOPET - Salvando Vidas 🐾', 
        'font-size: 20px; font-weight: bold; color: #b89fcd;');
    console.log('%cRemember to update the external links in expopet-landing.js!', 
        'font-size: 14px; color: #666;');
    console.log('Links to update: Vakinha URL, Guia URL, Rifas URL');
});

// === PREVENT LAYOUT SHIFT ===
// Ensure images load properly
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// === FORM VALIDATION (IF YOU ADD FORMS LATER) ===
// Helper function for future email subscription forms
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail };
}