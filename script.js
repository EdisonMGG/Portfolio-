// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}


// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(11, 17, 33, 0.95)';
    } else {
        navbar.style.background = 'rgba(11, 17, 33, 0.85)';
    }
});


// Smooth Scrolling for Anchors (Polyfill for older browsers/stricter control)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Offset for fixed navbar
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});


// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .hero-content, .hero-image-wrapper').forEach(section => {
    // Initial state set in JS to avoid accessibility issues if JS fails
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Contact Form & Modal Logic
const contactForm = document.getElementById('contactForm');
const hiddenIframe = document.getElementById('hidden_iframe');
const thankYouModal = document.getElementById('thankYouModal');
const closeModalBtn = document.getElementById('closeModalBtn');
let submitted = false;

if (contactForm) {
    contactForm.addEventListener('submit', () => {
        submitted = true;
        // Button loading state could be added here
        const btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';
        }
    });
}

if (hiddenIframe) {
    hiddenIframe.addEventListener('load', () => {
        if (submitted) {
            // Show modal
            if (thankYouModal) {
                thankYouModal.style.display = 'flex';
            }

            // Reset form
            if (contactForm) {
                contactForm.reset();
                const btn = contactForm.querySelector('button[type="submit"]');
                if (btn) {
                    btn.innerHTML = 'Send Message';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }
            }

            submitted = false;
        }
    });
}

if (closeModalBtn && thankYouModal) {
    closeModalBtn.addEventListener('click', () => {
        thankYouModal.style.display = 'none';
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === thankYouModal) {
            thankYouModal.style.display = 'none';
        }
    });
}
