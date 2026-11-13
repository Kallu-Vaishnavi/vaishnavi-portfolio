/* ============================================================
   VAISHNAVI PORTFOLIO
   ELITE EDITION 5.0
   Premium Interactive Portfolio Experience
 
   Libraries:
   - GSAP
   - GSAP ScrollTrigger
   - Lenis Smooth Scroll
   - Bootstrap
 
   Custom cursor: DISABLED
   ============================================================ */
 
(() => {
    "use strict";
 
    /* ========================================================
       01. CONFIGURATION
    ======================================================== */
 
    const CONFIG = {
        smoothScroll: true,
        animations: true,
        cardTilt: true,
        magneticButtons: true,
        scrollReveal: true,
        mobileMenu: true,
        customCursor: false
    };
 
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
 
    const isMobile = window.matchMedia(
        "(max-width: 768px)"
    ).matches;
 
    const isTouchDevice = window.matchMedia(
        "(pointer: coarse)"
    ).matches;
 
    let lenis = null;
 
    /* ========================================================
       02. DOM HELPERS
    ======================================================== */
 
    const $ = (selector, parent = document) =>
        parent.querySelector(selector);
 
    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];
 
    const addEvent = (element, event, callback, options) => {
        if (element) {
            element.addEventListener(event, callback, options);
        }
    };
 
    /* ========================================================
       03. INITIALIZATION
    ======================================================== */
 
    function initializePortfolio() {
 
        initializePreloader();
        initializeNavigation();
        initializeMobileMenu();
        initializeScrollProgress();
        initializeSmoothScroll();
        // Signature GSAP motion below replaces the older overlapping reveal/tilt triggers.
        initializeMagneticButtons();
        initializeProjectInteractions();
        initializeImageLoading();
        initializeTimeline();
        initializeContactInteractions();
        initializeCurrentYear();
        initializeAccessibility();
        initializeSkillLearningResources();
 
        initializeEliteMotionLayer();
        initializeSpotlightTracking();
        initializeHeroDepth();
        initializeSectionNavigationPolish();
        initializeSignatureMotion();
        waitForPortraitAndAnimate();
 
 
        console.log(
            "%c VAISHNAVI PORTFOLIO ",
            "background:#668cff;color:white;padding:8px 14px;border-radius:5px;font-weight:bold;"
        );
 
        console.log("Elite Edition 5.0 initialized successfully.");
    }
 
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializePortfolio,
            { once: true }
        );
    } else {
        initializePortfolio();
    }
 
    /* ========================================================
       04. PRELOADER
    ======================================================== */
 
    function initializePreloader() {
 
        const preloader = $(".preloader");
 
        if (!preloader) return;
 
        let preloaderHidden = false;
 
        function hidePreloader() {
 
            if (preloaderHidden) return;
 
            preloaderHidden = true;
 
            if (window.gsap && !prefersReducedMotion) {
 
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.65,
                    ease: "power2.out",
                    onComplete: () => {
                        preloader.style.display = "none";
                    }
                });
 
            } else {
 
                preloader.style.opacity = "0";
 
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 300);
 
            }
        }
 
        if (document.readyState === "complete") {
 
            setTimeout(hidePreloader, 300);
 
        } else {
 
            addEvent(window, "load", () => {
                setTimeout(hidePreloader, 300);
            }, { once: true });
 
        }
 
        // Safety fallback: never leave the visitor stuck.
        setTimeout(hidePreloader, 4000);
    }
 
    /* ========================================================
       05. NAVIGATION
    ======================================================== */
 
    function initializeNavigation() {
 
        const navbar = $(".site-nav");
 
        const navLinks = $$(".nav-center a");
 
        function updateNavbar() {
 
            if (!navbar) return;
 
            navbar.classList.toggle(
                "nav-scrolled",
                window.scrollY > 40
            );
        }
 
        addEvent(window, "scroll", updateNavbar, {
            passive: true
        });
 
        updateNavbar();
 
        // Highlight the current navigation section.
 
        const sections = $$(
            "#home, #about, #education, #expertise, #projects, #experience, #certifications, #contact"
        );
 
        if (!("IntersectionObserver" in window)) return;
 
        const observer = new IntersectionObserver(
            entries => {
 
                entries.forEach(entry => {
 
                    if (!entry.isIntersecting) return;
 
                    const currentId = entry.target.id;
 
                    navLinks.forEach(link => {
 
                        const active =
                            link.getAttribute("href") === `#${currentId}`;
 
                        link.classList.toggle("active", active);
 
                        if (active) {
                            link.setAttribute(
                                "aria-current",
                                "location"
                            );
                        } else {
                            link.removeAttribute("aria-current");
                        }
 
                    });
 
                });
 
            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );
 
        sections.forEach(section => {
            observer.observe(section);
        });
    }
 
    /* ========================================================
       06. MOBILE NAVIGATION
    ======================================================== */
 
    function initializeMobileMenu() {
 
        if (!CONFIG.mobileMenu) return;
 
        const menuButton = $(".mobile-menu");
        const navigation = $(".nav-center");
 
        if (!menuButton || !navigation) return;
 
        menuButton.setAttribute("aria-expanded", "false");
 
        function closeMenu() {
 
            document.body.classList.remove("menu-open");
 
            navigation.classList.remove("menu-visible");
 
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
 
        function toggleMenu() {
 
            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";
 
            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );
 
            navigation.classList.toggle(
                "menu-visible",
                !isOpen
            );
 
            document.body.classList.toggle(
                "menu-open",
                !isOpen
            );
        }
 
        addEvent(menuButton, "click", toggleMenu);
 
        $$(".nav-center a").forEach(link => {
 
            addEvent(link, "click", closeMenu);
 
        });
 
        addEvent(document, "keydown", event => {
 
            if (event.key === "Escape") {
                closeMenu();
            }
 
        });
 
        addEvent(window, "resize", () => {
 
            if (window.innerWidth > 768) {
                closeMenu();
            }
 
        });
 
    }
 
    /* ========================================================
       07. SMOOTH SCROLL
    ======================================================== */
 
    function initializeSmoothScroll() {
 
        if (!CONFIG.smoothScroll) return;
 
        if (prefersReducedMotion) return;
 
        if (!window.Lenis) {
            console.warn("Lenis library not found.");
            return;
        }
 
        lenis = new Lenis({
            duration: 1.15,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.2,
            easing: t =>
                Math.min(
                    1,
                    1.001 - Math.pow(2, -10 * t)
                )
        });
 
        if (window.gsap && window.ScrollTrigger) {
 
            gsap.registerPlugin(ScrollTrigger);
 
            lenis.on("scroll", ScrollTrigger.update);
 
            gsap.ticker.add(time => {
                lenis.raf(time * 1000);
            });
 
            gsap.ticker.lagSmoothing(0);
 
        } else {
 
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
 
            requestAnimationFrame(raf);
 
        }
 
        // Smooth internal navigation.
 
        $$('a[href^="#"]').forEach(link => {
 
            addEvent(link, "click", event => {
 
                const targetId = link.getAttribute("href");
 
                if (!targetId || targetId === "#") return;
 
                const target = $(targetId);
 
                if (!target) return;
 
                event.preventDefault();
 
                lenis.scrollTo(target, {
                    offset: -85,
                    duration: 1.2
                });
 
            });
 
        });
 
    }
 
    /* ========================================================
       08. SCROLL PROGRESS
    ======================================================== */
 
    function initializeScrollProgress() {
 
        const progress = $(".scroll-progress");
 
        if (!progress) return;
 
        function updateProgress() {
 
            const totalHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;
 
            const percentage = totalHeight > 0
                ? window.scrollY / totalHeight
                : 0;
 
            progress.style.width =
                `${percentage * 100}%`;
 
            progress.setAttribute(
                "aria-valuenow",
                Math.round(percentage * 100)
            );
 
        }
 
        addEvent(window, "scroll", updateProgress, {
            passive: true
        });
 
        updateProgress();
    }
 
    /* ========================================================
       09. HERO ANIMATIONS
    ======================================================== */
 
    function initializeHeroAnimations() {
 
        if (!CONFIG.animations || prefersReducedMotion) return;
 
        if (!window.gsap) return;
 
        const heroElements = [
            ".availability",
            ".hero-intro",
            ".hero-name",
            ".hero-role",
            ".hero-description",
            ".hero-buttons",
            ".hero-socials",
            ".portrait-frame"
        ];
 
        const availableElements = heroElements.filter(
            selector => $(selector)
        );
 
        if (!availableElements.length) return;
 
        gsap.from(availableElements, {
            opacity: 0,
            y: 35,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.2,
            clearProps: "all"
        });
 
    }
 
    /* ========================================================
       10. SCROLL REVEAL ANIMATIONS
    ======================================================== */
 
    function initializeScrollAnimations() {
 
        if (!CONFIG.scrollReveal) return;
 
        if (prefersReducedMotion) return;
 
        const elements = $$(
            ".door, .education-card, .project-showcase, .certificate, .timeline-content"
        );
 
        if (!elements.length) return;
 
        // GSAP implementation.
 
        if (window.gsap && window.ScrollTrigger) {
 
            gsap.registerPlugin(ScrollTrigger);
 
            elements.forEach((element, index) => {
 
                gsap.fromTo(
                    element,
                    {
                        opacity: 0,
                        y: 45
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.85,
                        delay: (index % 3) * 0.07,
                        ease: "power3.out",
                        clearProps: "transform",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 88%",
                            once: true
                        }
                    }
                );
 
            });
 
            ScrollTrigger.refresh();
 
            return;
        }
 
        // Native browser fallback.
 
        if (!("IntersectionObserver" in window)) return;
 
        const observer = new IntersectionObserver(
            entries => {
 
                entries.forEach(entry => {
 
                    if (!entry.isIntersecting) return;
 
                    entry.target.classList.add(
                        "elite-visible"
                    );
 
                    observer.unobserve(entry.target);
 
                });
 
            },
            {
                threshold: 0.12
            }
        );
 
        elements.forEach(element => {
 
            element.classList.add("elite-reveal");
 
            observer.observe(element);
 
        });
 
    }
 
    /* ========================================================
       11. 3D CARD TILT
    ======================================================== */
 
    function initializeCardTilt() {
 
        if (!CONFIG.cardTilt) return;
 
        if (prefersReducedMotion || isTouchDevice) return;
 
        const cards = $$(
            ".door, .education-card, .project-showcase, .certificate"
        );
 
        cards.forEach(card => {
 
            addEvent(card, "mousemove", event => {
 
                const rect = card.getBoundingClientRect();
 
                if (!rect.width || !rect.height) return;
 
                const x =
                    (event.clientX - rect.left) / rect.width;
 
                const y =
                    (event.clientY - rect.top) / rect.height;
 
                const rotateY = (x - 0.5) * 7;
 
                const rotateX = (0.5 - y) * 7;
 
                card.style.transform =
                    `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
 
            });
 
            addEvent(card, "mouseleave", () => {
 
                card.style.transform = "";
 
            });
 
        });
 
    }
 
    /* ========================================================
       12. MAGNETIC BUTTONS
    ======================================================== */
 
    function initializeMagneticButtons() {
 
        if (!CONFIG.magneticButtons) return;
 
        if (prefersReducedMotion || isTouchDevice) return;
 
        const buttons = $$(
            ".hero-buttons a, .nav-contact, .contact-button"
        );
 
        buttons.forEach(button => {
 
            addEvent(button, "mousemove", event => {
 
                const rect = button.getBoundingClientRect();
 
                const x =
                    event.clientX - rect.left - rect.width / 2;
 
                const y =
                    event.clientY - rect.top - rect.height / 2;
 
                button.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.15}px)`;
 
            });
 
            addEvent(button, "mouseleave", () => {
 
                button.style.transform = "";
 
            });
 
        });
 
    }
 
    /* ========================================================
       13. PROJECT INTERACTIONS
    ======================================================== */
 
    function initializeProjectInteractions() {
 
        const projects = $$(".project-showcase");
 
        projects.forEach(project => {
 
            addEvent(project, "mouseenter", () => {
 
                project.classList.add("project-hovered");
 
            });
 
            addEvent(project, "mouseleave", () => {
 
                project.classList.remove("project-hovered");
 
            });
 
        });
 
    }
 
    /* ========================================================
       14. IMAGE LOADING
    ======================================================== */
 
    function initializeImageLoading() {
 
        const images = $$(
            ".portrait-frame img, .project-visual img"
        );
 
        images.forEach(image => {
 
            function markLoaded() {
 
                image.classList.add("image-loaded");
 
            }
 
            if (image.complete) {
 
                markLoaded();
 
            } else {
 
                addEvent(image, "load", markLoaded, {
                    once: true
                });
 
                addEvent(image, "error", () => {
 
                    image.classList.add("image-error");
 
                    console.warn(
                        "Unable to load image:",
                        image.src
                    );
 
                }, {
                    once: true
                });
 
            }
 
        });
 
    }
 
    /* ========================================================
       15. TIMELINE INTERACTIONS
    ======================================================== */
 
    function initializeTimeline() {
 
        const timelineItems = $$(".timeline-content");
 
        timelineItems.forEach(item => {
 
            addEvent(item, "mouseenter", () => {
 
                item.classList.add("timeline-active");
 
            });
 
            addEvent(item, "mouseleave", () => {
 
                item.classList.remove("timeline-active");
 
            });
 
        });
 
    }
 
    /* ========================================================
       16. CONTACT INTERACTIONS
    ======================================================== */
 
    function initializeContactInteractions() {
 
        const emailLinks = $$('a[href^="mailto:"]');
 
        emailLinks.forEach(link => {
 
            link.setAttribute(
                "aria-label",
                "Send an email"
            );
 
        });
 
        const phoneLinks = $$('a[href^="tel:"]');
 
        phoneLinks.forEach(link => {
 
            link.setAttribute(
                "aria-label",
                "Call contact"
            );
 
        });
 
    }
 
    /* ========================================================
       17. AUTOMATIC COPYRIGHT YEAR
    ======================================================== */
 
    function initializeCurrentYear() {
 
        const yearElements = $$("[data-current-year]");
 
        yearElements.forEach(element => {
 
            element.textContent =
                new Date().getFullYear();
 
        });
 
    }
 
    /* ========================================================
       18. ACCESSIBILITY
    ======================================================== */
 
    function initializeAccessibility() {
 
        // Ensure navigation links are keyboard accessible.
 
        $$(".nav-center a").forEach(link => {
 
            if (!link.hasAttribute("tabindex")) {
                link.setAttribute("tabindex", "0");
            }
 
        });
 
        // Respect reduced-motion settings.
 
        if (prefersReducedMotion) {
 
            document.documentElement.classList.add(
                "reduced-motion"
            );
 
        }
 
        // Close mobile navigation using Escape.
 
        addEvent(document, "keydown", event => {
 
            if (event.key !== "Escape") return;
 
            document.body.classList.remove("menu-open");
 
            const navigation = $(".nav-center");
            const button = $(".mobile-menu");
 
            if (navigation) {
                navigation.classList.remove("menu-visible");
            }
 
            if (button) {
                button.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
 
        });
 
    }
 
 
    /* ========================================================
       19. ELITE MOTION LAYER — ADDITIVE ENHANCEMENTS
       ======================================================== */
 
    function initializeEliteMotionLayer() {
        document.documentElement.classList.add("js-motion-ready");
 
        if (prefersReducedMotion) {
            document.documentElement.classList.add("reduced-motion");
            return;
        }
 
        const revealTargets = $$(
            ".section-heading, .section-description, .about-content, " +
            ".education-card, .project-showcase, .door, .timeline-content, " +
            ".certificate, .contact-content"
        );
 
        if (!revealTargets.length) return;
 
        // Native observer fallback: safe even when GSAP is unavailable.
        if (!("IntersectionObserver" in window)) {
            revealTargets.forEach(element => {
                element.classList.add("is-motion-visible");
            });
            return;
        }
 
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-motion-visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -7% 0px"
        });
 
        revealTargets.forEach(element => {
            element.classList.add("motion-reveal");
            revealObserver.observe(element);
        });
    }
 
    /* ========================================================
       20. POINTER SPOTLIGHT — DESKTOP ONLY
       ======================================================== */
 
    function initializeSpotlightTracking() {
        if (prefersReducedMotion || isTouchDevice) return;
 
        const spotlightTargets = $$(".door, .certificate, .project-showcase");
 
        spotlightTargets.forEach(card => {
            card.setAttribute("data-elite-spotlight", "");
 
            addEvent(card, "pointermove", event => {
                const rect = card.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
 
                card.style.setProperty("--spot-x", `${x}%`);
                card.style.setProperty("--spot-y", `${y}%`);
            }, { passive: true });
 
            addEvent(card, "pointerleave", () => {
                card.style.setProperty("--spot-x", "50%");
                card.style.setProperty("--spot-y", "50%");
            });
        });
    }
 
    /* ========================================================
       21. HERO DEPTH — SUBTLE POINTER PARALLAX
       ======================================================== */
 
    function initializeHeroDepth() {
        if (prefersReducedMotion || isTouchDevice || isMobile) return;
 
        const hero = $("#home");
        const portrait = $(".portrait-frame");
        const heroCopy = $(".hero-content, .hero-copy");
 
        if (!hero) return;
 
        let frameRequested = false;
        let pointerX = 0;
        let pointerY = 0;
 
        addEvent(hero, "pointermove", event => {
            const rect = hero.getBoundingClientRect();
            pointerX = ((event.clientX - rect.left) / rect.width) - 0.5;
            pointerY = ((event.clientY - rect.top) / rect.height) - 0.5;
 
            if (frameRequested) return;
            frameRequested = true;
 
            requestAnimationFrame(() => {
                if (portrait) {
                    portrait.style.setProperty(
                        "--hero-rotate-y",
                        `${pointerX * 3.2}deg`
                    );
                    portrait.style.setProperty(
                        "--hero-rotate-x",
                        `${pointerY * -2.4}deg`
                    );
                    portrait.style.transform =
                        `perspective(1100px) rotateY(${pointerX * 3.2}deg) rotateX(${pointerY * -2.4}deg)`;
                }
 
                if (heroCopy) {
                    heroCopy.style.setProperty(
                        "--hero-copy-shift",
                        `${pointerX * -4}px`
                    );
                }
 
                frameRequested = false;
            });
        }, { passive: true });
 
        addEvent(hero, "pointerleave", () => {
            if (portrait) portrait.style.transform = "";
            if (heroCopy) heroCopy.style.removeProperty("--hero-copy-shift");
        });
    }
 
    /* ========================================================
       22. SECTION NAVIGATION POLISH
       ======================================================== */
 
    function initializeSectionNavigationPolish() {
        const links = $$(".nav-center a[href^='#']");
        if (!links.length) return;
 
        links.forEach(link => {
            addEvent(link, "focus", () => {
                link.classList.add("nav-keyboard-focus");
            });
 
            addEvent(link, "blur", () => {
                link.classList.remove("nav-keyboard-focus");
            });
        });
 
        // Keep the active state accurate when the page is restored from cache.
        addEvent(window, "pageshow", () => {
            window.dispatchEvent(new Event("scroll"));
        });
    }
 
 
 
    /* ========================================================
       23. SIGNATURE MOTION SYSTEM — COORDINATED GSAP
       ======================================================== */
 
    function initializeSignatureMotion() {
        if (prefersReducedMotion) return;
 
        document.documentElement.classList.add("motion-ready");
 
        const hasGSAP = !!(window.gsap && window.ScrollTrigger);
 
        if (hasGSAP) {
            gsap.registerPlugin(ScrollTrigger);
            initializeSignatureHeroTimeline();
            initializeSignatureSectionReveals();
            initializeSignatureCardMotion();
            initializeSignatureScrollAtmosphere();
            ScrollTrigger.refresh();
        } else {
            initializeSignatureObserverFallback();
        }
    }
 
    function initializeSignatureHeroTimeline() {
        if (!window.gsap) return;
 
        const hero = $("#home");
        if (!hero) return;
 
        const intro = null;
        const greeting = $(".hero-intro", hero);
        const title = $(".hero-name", hero);
        const role = $(".hero-role", hero);
        const description = $(".hero-description", hero);
        const actions = $(".hero-buttons", hero);
        const socials = $(".hero-socials", hero);
        const location = $(".hero-location", hero);
        const portrait = $(".portrait-frame", hero);
        const chips = $$(".floating-tech-card, .floating-caption", hero);
 
        const sequence = [
            intro, greeting, title, role, description,
            actions, socials, location
        ].filter(Boolean);
 
        if (!sequence.length) return;
 
        gsap.set(sequence, { autoAlpha: 0, y: 26 });
        if (chips.length) gsap.set(chips, { autoAlpha: 0, y: 14 });
 
        const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            delay: .12
        });
 
        timeline
            .to(intro, { autoAlpha: 1, y: 0, duration: .65 }, 0)
            .to(greeting, { autoAlpha: 1, y: 0, duration: .7 }, .08)
            .to(title, { autoAlpha: 1, y: 0, duration: 1.05, ease: "power4.out" }, .16)
            .to(role, { autoAlpha: 1, y: 0, duration: .75 }, .34)
            .to(description, { autoAlpha: 1, y: 0, duration: .8 }, .46)
            .to(actions, { autoAlpha: 1, y: 0, duration: .7 }, .58)
            .to(socials, { autoAlpha: 1, y: 0, duration: .65 }, .68)
            .to(location, { autoAlpha: 1, y: 0, duration: .65 }, .74);
 
        // Portrait entrance is controlled by initializePortraitSignatureAnimation().
 
        if (chips.length) {
            timeline.to(chips, {
                autoAlpha: 1,
                y: 0,
                duration: .7,
                stagger: .12,
                ease: "back.out(1.35)"
            }, .9);
        }
    }
 
    function initializeSignatureSectionReveals() {
        const sections = $$(".about, .education, .expertise, .projects, .journey, .certifications, .contact");
 
        sections.forEach(section => {
            const heading = $(".section-heading", section);
            const label = $(".section-label", section);
            const description = $(".section-description", section);
            const cards = $$(".education-card, .door, .project-showcase, .timeline-content, .certificate", section);
 
            if (label) {
                gsap.fromTo(label,
                    { autoAlpha: 0, y: 15 },
                    {
                        autoAlpha: 1, y: 0, duration: .65, ease: "power3.out",
                        scrollTrigger: { trigger: label, start: "top 88%", once: true }
                    }
                );
            }
 
            if (heading) {
                gsap.fromTo(heading,
                    { autoAlpha: 0, y: 34, filter: "blur(7px)" },
                    {
                        autoAlpha: 1, y: 0, filter: "blur(0px)",
                        duration: .95, ease: "power3.out",
                        scrollTrigger: { trigger: heading, start: "top 86%", once: true }
                    }
                );
            }
 
            if (description) {
                gsap.fromTo(description,
                    { autoAlpha: 0, y: 20 },
                    {
                        autoAlpha: 1, y: 0, duration: .75, delay: .08,
                        ease: "power3.out",
                        scrollTrigger: { trigger: description, start: "top 90%", once: true }
                    }
                );
            }
 
            if (cards.length) {
                gsap.fromTo(cards,
                    { autoAlpha: 0, y: 42, scale: .985 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: .82,
                        stagger: { each: .105, from: "start" },
                        ease: "power3.out",
                        clearProps: "filter",
                        scrollTrigger: {
                            trigger: cards[0].parentElement,
                            start: "top 84%",
                            once: true
                        }
                    }
                );
            }
        });
    }
 
    function initializeSignatureCardMotion() {
        if (isTouchDevice || isMobile) return;
 
        const cards = $$(".education-card, .skills-grid > .door, .projects-grid .project-showcase, .certifications-grid .certificate");
 
        cards.forEach(card => {
            let bounds = null;
 
            addEvent(card, "pointerenter", () => {
                bounds = card.getBoundingClientRect();
                gsap.to(card, {
                    y: -5,
                    duration: .45,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            });
 
            addEvent(card, "pointermove", event => {
                if (!bounds) bounds = card.getBoundingClientRect();
 
                const px = (event.clientX - bounds.left) / bounds.width - .5;
                const py = (event.clientY - bounds.top) / bounds.height - .5;
 
                gsap.to(card, {
                    rotateY: px * 3.2,
                    rotateX: py * -3.2,
                    transformPerspective: 1000,
                    transformOrigin: "center center",
                    duration: .35,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });
 
            addEvent(card, "pointerleave", () => {
                bounds = null;
                gsap.to(card, {
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    duration: .75,
                    ease: "elastic.out(1, .65)",
                    overwrite: "auto"
                });
            });
        });
    }
 
    function initializeSignatureScrollAtmosphere() {
        if (!window.gsap || !window.ScrollTrigger) return;
 
        const heroVisual = $(".hero-visual");
        if (heroVisual && !isMobile) {
            gsap.to(heroVisual, {
                y: -24,
                ease: "none",
                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "bottom top",
                    scrub: .8
                }
            });
        }
 
        // Gentle section background drift; no layout-affecting properties.
        $$(".section-label").forEach(label => {
            gsap.fromTo(label,
                { x: -8 },
                {
                    x: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: label,
                        start: "top bottom",
                        end: "top 55%",
                        scrub: .6
                    }
                }
            );
        });
    }
 
    function initializeSignatureObserverFallback() {
        const targets = $$(".section-label, .section-heading, .section-description, .education-card, .door, .project-showcase, .timeline-content, .certificate");
 
        if (!("IntersectionObserver" in window)) {
            targets.forEach(target => target.classList.add("motion-in"));
            return;
        }
 
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("motion-in");
                currentObserver.unobserve(entry.target);
            });
        }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
 
        targets.forEach(target => {
            target.classList.add("motion-fade-up");
            observer.observe(target);
        });
    }
 
 
 
 
    /* ========================================================
       24. PORTRAIT SIGNATURE ANIMATION — FINAL POLISH
       ======================================================== */
 
    function initializePortraitSignatureAnimation() {
        const portrait = $(".hero-visual .portrait-frame");
        const image = $(".hero-visual .portrait-frame img");
        if (!portrait || !image || prefersReducedMotion) return;
 
        // Always leave the portrait visible if GSAP is missing or fails.
        portrait.style.opacity = "1";
        image.style.opacity = "1";
 
        if (!window.gsap) return;
 
        gsap.killTweensOf([portrait, image]);
 
        gsap.fromTo(portrait,
            {
                autoAlpha: 0,
                y: 42,
                scale: .94,
                rotateX: 5,
                filter: "blur(10px)"
            },
            {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                filter: "blur(0px)",
                duration: 1.55,
                delay: .2,
                ease: "power4.out",
                clearProps: "filter"
            }
        );
 
        gsap.fromTo(image,
            { scale: 1.105, y: 16, filter: "saturate(.82) brightness(.88)" },
            {
                scale: 1.015,
                y: 0,
                filter: "saturate(1.04) brightness(1)",
                duration: 1.9,
                delay: .28,
                ease: "power3.out",
                clearProps: "filter"
            }
        );
 
        // Slow floating motion is subtle enough not to distract from the portrait.
        gsap.to(portrait, {
            y: -7,
            duration: 4.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2
        });
 
        if (window.ScrollTrigger && !isMobile) {
            gsap.to(image, {
                yPercent: -2.2,
                scale: 1.055,
                ease: "none",
                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }
    }
 
    /* Re-run the portrait entrance once the image is decoded, avoiding a blank first frame. */
    function waitForPortraitAndAnimate() {
        const image = $(".hero-visual .portrait-frame img");
        if (!image) return;
 
        if (image.complete && image.naturalWidth > 0) {
            initializePortraitSignatureAnimation();
            return;
        }
 
        image.addEventListener("load", initializePortraitSignatureAnimation, { once: true });
        image.addEventListener("error", () => {
            const frame = $(".hero-visual .portrait-frame");
            if (frame) frame.style.opacity = "1";
        }, { once: true });
    }
 
 
 
 
    /* ========================================================
       25. SKILL TOPIC RESOURCE DIALOG
       Click a skill topic to open its GFG learning/practice and
       relevant LeetCode practice links in a compact accessible dialog.
       ======================================================== */
 
    function initializeSkillLearningResources() {
        const topicButtons = $$(".skill-topic");
        if (!topicButtons.length) return;
 
        const dialog = document.createElement("div");
        dialog.className = "learning-dialog";
        dialog.id = "skillLearningDialog";
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("aria-labelledby", "learningDialogTitle");
        dialog.setAttribute("aria-hidden", "true");
 
        dialog.innerHTML = `
            <div class="learning-dialog-panel" role="document">
                <button class="learning-dialog-close" type="button" aria-label="Close learning resources">
                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                </button>
                <p class="learning-dialog-kicker">Continue learning</p>
                <h3 class="learning-dialog-title" id="learningDialogTitle">Topic resources</h3>
                <p class="learning-dialog-copy">Choose a learning resource or move straight to coding practice.</p>
                <div class="learning-dialog-links"></div>
            </div>
        `;
        document.body.appendChild(dialog);
 
        const title = $("#learningDialogTitle", dialog);
        const links = $(".learning-dialog-links", dialog);
        const closeButton = $(".learning-dialog-close", dialog);
        let lastFocused = null;
 
        const resourceItems = [
            {
                key: "learn",
                title: "Learn on GeeksforGeeks",
                subtitle: "Tutorials, explanations and examples",
                icon: "bi-book-half",
                attribute: "data-learn-url"
            },
            {
                key: "practice",
                title: "Practice on GeeksforGeeks",
                subtitle: "Topic exercises and coding problems",
                icon: "bi-code-slash",
                attribute: "data-practice-url"
            },
            {
                key: "leetcode",
                title: "Solve on LeetCode",
                subtitle: "Interview-style coding practice",
                icon: "bi-braces",
                attribute: "data-leetcode-url"
            }
        ];
 
        function openDialog(button) {
            lastFocused = button;
            const topic = button.dataset.topic || "Selected topic";
            title.textContent = `${topic} resources`;
            links.innerHTML = "";
 
            resourceItems.forEach(item => {
                const url = button.getAttribute(item.attribute);
                if (!url) return;
 
                const anchor = document.createElement("a");
                anchor.className = "learning-resource-link";
                anchor.href = url;
                anchor.target = "_blank";
                anchor.rel = "noopener noreferrer";
                anchor.innerHTML = `
                    <span>
                        <strong>${item.title}</strong>
                        <small>${item.subtitle}</small>
                    </span>
                    <i class="bi ${item.icon}" aria-hidden="true"></i>
                `;
                links.appendChild(anchor);
            });
 
            dialog.classList.add("is-open");
            dialog.setAttribute("aria-hidden", "false");
            document.body.classList.add("learning-dialog-open");
            closeButton.focus();
        }
 
        function closeDialog() {
            dialog.classList.remove("is-open");
            dialog.setAttribute("aria-hidden", "true");
            document.body.classList.remove("learning-dialog-open");
            if (lastFocused) lastFocused.focus();
        }
 
        topicButtons.forEach(button => {
            addEvent(button, "click", () => openDialog(button));
        });
 
        addEvent(closeButton, "click", closeDialog);
        addEvent(dialog, "click", event => {
            if (event.target === dialog) closeDialog();
        });
 
        addEvent(document, "keydown", event => {
            if (!dialog.classList.contains("is-open")) return;
            if (event.key === "Escape") {
                closeDialog();
                return;
            }
 
            if (event.key === "Tab") {
                const focusable = $$("a[href], button", dialog);
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
 
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    }
 
 
})();