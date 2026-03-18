document.addEventListener('DOMContentLoaded', () => {

    // 0. PREMIUM HERO ANIMATION (GSAP)
    function initHeroAnimation() {
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

        tl.from("#hero-subtitle", { y: 20, opacity: 0, delay: 0.5 })
            .from("#hero-title .line", {
                y: 100,
                opacity: 0,
                stagger: 0.2,
                skewY: 7,
                transformOrigin: "left top"
            }, "-=0.8")
            .from("#hero-desc", { y: 20, opacity: 0 }, "-=0.8")
            .from("#hero-cta", { y: 20, opacity: 0, scale: 0.9, duration: 1 }, "-=0.6");
    }

    initHeroAnimation();

    // 0.1 STATS COUNT-UP ANIMATION
    function initStatsAnimation() {
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'));

                    gsap.to(target, {
                        innerText: endValue,
                        duration: 2.5,
                        snap: { innerText: 1 },
                        ease: "power2.out",
                        onUpdate: function () {
                            // Optional: add commas for large numbers if needed
                            // target.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString();
                        }
                    });
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    initStatsAnimation();

    // 0.2 MAGNETIC BUTTONS
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-emerald, .btn-outline');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    initMagneticButtons();

    // 0.2 CUSTOM PREMIUM CURSOR
    function initCustomCursor() {
        if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

        const dot = document.querySelector(".cursor-dot");
        const outline = document.querySelector(".cursor-outline");

        if (!dot || !outline) return;

        const xDotSetter = gsap.quickSetter(dot, "x", "px");
        const yDotSetter = gsap.quickSetter(dot, "y", "px");
        const xOutlineSetter = gsap.quickSetter(outline, "x", "px");
        const yOutlineSetter = gsap.quickSetter(outline, "y", "px");

        window.addEventListener("mousemove", (e) => {
            xDotSetter(e.clientX - 3);
            yDotSetter(e.clientY - 3);

            gsap.to(outline, {
                x: e.clientX - 20,
                y: e.clientY - 20,
                duration: 0.5,
                ease: "power3.out"
            });
        });

        const interactiveElements = document.querySelectorAll('a, button, .service-card, .plan-card, .accordion-header');

        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                gsap.to(outline, { scale: 1.5, backgroundColor: "rgba(139, 92, 246, 0.1)", borderColor: "transparent", duration: 0.3 });
                gsap.to(dot, { scale: 0, duration: 0.3 });
            });
            el.addEventListener("mouseleave", () => {
                gsap.to(outline, { scale: 1, backgroundColor: "transparent", borderColor: "var(--primary)", duration: 0.3 });
                gsap.to(dot, { scale: 1, duration: 0.3 });
            });
        });
    }

    initCustomCursor();

    // 0.3 CARD REFINEMENTS
    function initCardRefinements() {
        const cards = document.querySelectorAll('.service-card, .plan-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.02, duration: 0.4, ease: "power2.out" });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.4, ease: "power2.out" });
            });
        });
    }

    initCardRefinements();

    // 1. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -50px 0px", threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. HEADER SCROLL EFFECT
    const header = document.getElementById('navbar');
    const emergencyBanner = document.getElementById('top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > (emergencyBanner ? emergencyBanner.offsetHeight : 100)) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. TEAM SLIDER LOGIC
    const teamData = [
        {
            name: "Dr. Ana Pavel",
            role: "Medic Veterinar Coordonator",
            quote: "La Quantas Repro Vet, fiecare pacient primeste atentie reala, explicatii clare si un plan de tratament construit cu grija.",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Dr. Maria Popescu",
            role: "Medic Primar Veterinar / Chirurgie",
            quote: "Fiecare pacient are o poveste, iar misiunea noastră este să îi oferim un final fericit și sănătos. Empatia este fundamentul practicii noastre.",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Dr. Andrei Ionescu",
            role: "Medic Specialist Medicină Internă",
            quote: "Prevenția este cheia unei vieți lungi și fericite. Ne dedicăm timpul educării proprietarilor pentru a asigura cel mai bun start în viață.",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    let currentTeamIndex = 0;
    let teamAutoScroll;
    const teamImg = document.getElementById('main-team-img');
    const teamName = document.getElementById('member-name');
    const teamRole = document.getElementById('member-role');
    const teamQuote = document.getElementById('member-quote');
    const thumbNav = document.getElementById('thumbnail-nav');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function initTeamSlider() {
        if (!teamImg) return;

        renderThumbnails();
        updateTeamSlide(0);

        prevBtn.addEventListener('click', () => {
            currentTeamIndex = (currentTeamIndex - 1 + teamData.length) % teamData.length;
            updateTeamSlide(currentTeamIndex, 'up');
            resetAutoScroll();
        });

        nextBtn.addEventListener('click', () => {
            currentTeamIndex = (currentTeamIndex + 1) % teamData.length;
            updateTeamSlide(currentTeamIndex, 'down');
            resetAutoScroll();
        });

        startAutoScroll();
    }

    function startAutoScroll() {
        teamAutoScroll = setInterval(() => {
            currentTeamIndex = (currentTeamIndex + 1) % teamData.length;
            updateTeamSlide(currentTeamIndex, 'down');
        }, 6000); // Auto-rotate every 6 seconds
    }

    function resetAutoScroll() {
        clearInterval(teamAutoScroll);
        startAutoScroll();
    }

    function renderThumbnails() {
        thumbNav.innerHTML = '';
        teamData.forEach((member, index) => {
            const btn = document.createElement('button');
            btn.className = `thumb-btn ${index === currentTeamIndex ? 'active' : ''}`;
            btn.innerHTML = `<img src="${member.image}" alt="${member.name}">`;
            btn.addEventListener('click', () => {
                const direction = index > currentTeamIndex ? 'down' : 'up';
                currentTeamIndex = index;
                updateTeamSlide(index, direction);
                resetAutoScroll();
            });
            thumbNav.appendChild(btn);
        });
    }

    function updateTeamSlide(index, direction = 'down') {
        const member = teamData[index];

        // Update Thumbnails
        document.querySelectorAll('.thumb-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        // Animation classes for image
        teamImg.style.opacity = '0';
        teamImg.style.transform = direction === 'down' ? 'translateY(20px)' : 'translateY(-20px)';

        setTimeout(() => {
            teamImg.src = member.image;
            teamName.textContent = member.name;
            teamRole.textContent = member.role;
            teamQuote.textContent = `"${member.quote}"`;

            teamImg.style.opacity = '1';
            teamImg.style.transform = 'translateY(0)';
        }, 300);
    }

    initTeamSlider();

    // 4. FRAMER-STYLE CAROUSEL LOGIC
    function initFramerCarousel() {
        const track = document.getElementById('carousel-track');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const progressContainer = document.getElementById('carousel-progress');

        if (!track || items.length === 0) return;

        let currentIndex = 0;
        const totalItems = items.length;

        // Create Progress Dots
        items.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `progress-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            progressContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.progress-dot');

        function updateButtons() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalItems - 1;
        }

        function goToSlide(index) {
            if (index < 0 || index >= totalItems) return;
            currentIndex = index;

            // GSAP for smooth horizontal spring-like motion
            gsap.to(track, {
                xPercent: -100 * currentIndex,
                duration: 0.8,
                ease: "power3.out"
            });

            // Update Dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            updateButtons();
        }

        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        // Keyboard Navigation for Carousel
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
            if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
        });

        // Initial state
        updateButtons();

        // Optional: Auto-play
        let autoPlay = setInterval(() => {
            let nextIndex = (currentIndex + 1) % totalItems;
            if (nextIndex === 0) {
                // To avoid jumping back suddenly, we can just stop or loop smoothly
                // For now, let's just loop
            }
            goToSlide(nextIndex);
        }, 5000);

        // Pause auto-play on interaction
        [prevBtn, nextBtn, progressContainer].forEach(el => {
            el.addEventListener('mouseenter', () => clearInterval(autoPlay));
        });
    }

    initFramerCarousel();

    // 5. ACCORDION LOGIC (Valori)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const accordionImages = document.querySelectorAll('.accordion-images img');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isActive = header.classList.contains('active');

            // Close all
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                if (h.nextElementSibling) {
                    h.nextElementSibling.style.maxHeight = null;
                }
            });

            // Hide all images
            accordionImages.forEach(img => img.classList.remove('active'));

            if (!isActive) {
                // Open current
                header.classList.add('active');
                const content = header.nextElementSibling;
                if (content) {
                    content.style.maxHeight = content.scrollHeight + "px";
                }

                // Show current image
                const targetId = header.getAttribute('data-target');
                const targetImg = document.getElementById(targetId);
                if (targetImg) {
                    targetImg.classList.add('active');
                }
            }
        });
    });

    // 6. FORM DEMO PREVENT DEFAULT
    const form = document.querySelector('.smart-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Programare Trimisă!';
            btn.style.backgroundColor = '#257A53';
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        });
    }
});
