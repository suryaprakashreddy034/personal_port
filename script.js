document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: Stop observing once visible
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for anchor links (if browser doesn't support smooth behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple typing effect for role
    const roleEl = document.querySelector('.typing-effect');
    if (roleEl) {
        const text = roleEl.textContent;
        roleEl.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                roleEl.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Typing speed
            }
        }
        
        // Start typing effect slightly after page load
        setTimeout(typeWriter, 1000);
    }
});
