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

    // Popup Modal Logic
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const questionsModal = document.getElementById('questionsModal');

    if (openPopupBtn && closePopupBtn && questionsModal) {
        openPopupBtn.addEventListener('click', () => {
            questionsModal.classList.add('active');
            // Slight delay to ensure display: flex is applied before opacity transition
            setTimeout(() => {
                questionsModal.style.opacity = '1';
                questionsModal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
        });
        
        closePopupBtn.addEventListener('click', () => {
            questionsModal.classList.remove('active');
        });

        // Close on outside click
        questionsModal.addEventListener('click', (e) => {
            if (e.target === questionsModal) {
                questionsModal.classList.remove('active');
            }
        });
    }

    // Form Submit Logic (Native Iframe)
    window.isSubmitting = false;
    window.handleFormLoad = function() {
        if (window.isSubmitting) {
            alert('Thank you! Your answers have been successfully submitted.');
            const reflectionForm = document.getElementById('reflectionForm');
            if (reflectionForm) reflectionForm.reset();
            const questionsModal = document.getElementById('questionsModal');
            if (questionsModal) questionsModal.classList.remove('active');
            
            const saveReflectionBtn = document.getElementById('saveReflectionBtn');
            if (saveReflectionBtn) saveReflectionBtn.innerText = "Submit Answers";
            
            window.isSubmitting = false;
        }
    };

    const reflectionForm = document.getElementById('reflectionForm');
    
    if (reflectionForm) {
        reflectionForm.addEventListener('submit', () => {
            // Fill empty fields with "N/A" to prevent Google Forms from rejecting the submission
            // in case any of the fields are marked as "Required" in the form settings.
            const textareas = reflectionForm.querySelectorAll('textarea');
            textareas.forEach(ta => {
                if (!ta.value.trim()) {
                    ta.value = "N/A";
                }
            });

            // Do NOT prevent default here. Let the browser submit it natively.
            window.isSubmitting = true;
            const saveReflectionBtn = document.getElementById('saveReflectionBtn');
            if (saveReflectionBtn) {
                saveReflectionBtn.innerText = "Submitting...";
            }
        });
    }
});
