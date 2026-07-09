/* ============================================================
   lucUI — Core JavaScript Library v2.0
   Premium Glass Morphism Interactivity Layer
   ============================================================ */

(function (global) {
    'use strict';

    const lucUI = {
        // Theme Management
        initTheme(doc = global.document) {
            const root = doc?.documentElement;
            const savedTheme = global.localStorage?.getItem('luc-theme') || 'dark';

            if (root) {
                root.setAttribute('data-theme', savedTheme);
            }

            doc?.querySelectorAll('[data-luc-theme-switch]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const theme = btn.getAttribute('data-luc-theme-switch');
                    this.setTheme(theme, doc);
                });
            });
        },

        setTheme(theme, doc = global.document) {
            const root = doc?.documentElement;
            if (root) {
                root.setAttribute('data-theme', theme);
            }
            global.localStorage?.setItem('luc-theme', theme);
        },

        // Modal Management
        initModals(doc = global.document) {
            doc?.querySelectorAll('[data-luc-toggle="modal"]').forEach(trigger => {
                const targetId = trigger.getAttribute('data-luc-target');
                const modal = doc.querySelector(targetId);
                if (modal) {
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.showModal(modal, doc);
                    });
                }
            });

            doc?.querySelectorAll('[data-luc-dismiss="modal"]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modal = btn.closest('.luc-modal-backdrop') || btn.closest('.luc-modal');
                    if (modal) this.hideModal(modal, doc);
                });
            });

            doc?.querySelectorAll('.luc-modal-backdrop').forEach(backdrop => {
                backdrop.addEventListener('click', (e) => {
                    if (e.target === backdrop) {
                        this.hideModal(backdrop, doc);
                    }
                });
            });

            global.addEventListener?.('keydown', (e) => {
                if (e.key === 'Escape') {
                    const activeModal = doc?.querySelector('.luc-modal-backdrop[style*="display: flex"]') ||
                                         doc?.querySelector('.luc-modal-backdrop.active');
                    if (activeModal) this.hideModal(activeModal, doc);
                }
            });
        },

        showModal(modal, doc = global.document) {
            if (!modal) return;
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            global.setTimeout(() => modal.classList.add('active'), 10);
            doc?.body && (doc.body.style.overflow = 'hidden');
        },

        hideModal(modal, doc = global.document) {
            if (!modal) return;
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            global.setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            doc?.body && (doc.body.style.overflow = '');
        },

        // Accordion Management
        initAccordions(doc = global.document) {
            doc?.querySelectorAll('.luc-accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    const item = header.closest('.luc-accordion-item');
                    const accordion = header.closest('.luc-accordion');
                    const isCollapse = accordion?.classList.contains('luc-accordion-collapse');

                    if (isCollapse) {
                        accordion.querySelectorAll('.luc-accordion-item').forEach(sibling => {
                            if (sibling !== item) sibling.classList.remove('active');
                        });
                    }

                    item?.classList.toggle('active');
                });
            });
        },

        // Dropdown Management
        initDropdowns(doc = global.document) {
            doc?.querySelectorAll('.luc-dropdown-toggle').forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const parent = toggle.closest('.luc-dropdown');
                    const isActive = parent?.classList.toggle('active');
                    toggle.setAttribute('aria-expanded', String(Boolean(isActive)));
                });
            });

            doc?.addEventListener('click', () => {
                doc.querySelectorAll('.luc-dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        },

        // Tabs Management
        initTabs(doc = global.document) {
            doc?.querySelectorAll('.luc-tabs').forEach(tabs => {
                const buttons = Array.from(tabs.querySelectorAll('.luc-tab'));
                const panels = Array.from(tabs.querySelectorAll('.luc-tab-panel'));

                if (!buttons.length || !panels.length) return;

                const activateTab = (index) => {
                    buttons.forEach((button, i) => {
                        const isActive = i === index;
                        button.classList.toggle('active', isActive);
                        button.setAttribute('aria-selected', String(isActive));
                    });

                    panels.forEach((panel, i) => {
                        const isActive = i === index;
                        panel.classList.toggle('active', isActive);
                        panel.setAttribute('aria-hidden', String(!isActive));
                    });
                };

                buttons.forEach((button, index) => {
                    button.addEventListener('click', () => {
                        const requestedIndex = Number(button.getAttribute('data-luc-tab'));
                        activateTab(Number.isInteger(requestedIndex) ? requestedIndex : index);
                    });
                    button.setAttribute('aria-selected', String(index === 0));
                });

                panels.forEach((panel, index) => {
                    panel.setAttribute('aria-hidden', String(index !== 0));
                });

                activateTab(0);
            });
        },

        // Navbar Management
        initNavbar(doc = global.document) {
            const navbar = doc?.querySelector('.luc-navbar');
            if (navbar) {
                const updateNavbar = () => {
                    navbar.classList.toggle('scrolled', global.scrollY > 20);
                };
                global.addEventListener?.('scroll', updateNavbar, { passive: true });
                updateNavbar();
            }

            doc?.querySelectorAll('.luc-navbar-toggle').forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const links = toggle.closest('.luc-navbar')?.querySelector('.luc-navbar-links');
                    const isActive = links?.classList.toggle('active');
                    toggle.setAttribute('aria-expanded', String(Boolean(isActive)));
                });
            });

            doc?.querySelectorAll('.luc-navbar-mega-trigger').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const content = trigger.querySelector('.luc-navbar-mega-content') || trigger.nextElementSibling;
                    content?.classList.toggle('active');
                });
            });

            doc?.querySelectorAll('.luc-navbar-user-avatar').forEach(avatar => {
                avatar.addEventListener('click', () => {
                    const dropdown = avatar.parentElement?.querySelector('.luc-navbar-user-dropdown');
                    dropdown?.classList.toggle('active');
                });
            });

            doc?.addEventListener('click', (event) => {
                if (event.target?.closest('.luc-navbar')) return;
                doc.querySelectorAll('.luc-navbar-links.active, .luc-navbar-user-dropdown.active, .luc-navbar-mega-content.active').forEach(el => {
                    el.classList.remove('active');
                });
            });
        },

        // Scroll Reveal
        initReveal(doc = global.document) {
            const revealSelectors = ['.luc-reveal', '.luc-reveal-up', '.luc-reveal-down', '.luc-reveal-left', '.luc-reveal-right', '.luc-reveal-scale', '.luc-reveal-rotate', '.luc-reveal-blur'];
            const revealElements = revealSelectors.flatMap(selector => Array.from(doc?.querySelectorAll(selector) || []));
            if (!revealElements.length) return;

            const applyReveal = (el) => {
                const delay = el.getAttribute('data-luc-delay') || '0ms';
                el.style.transitionDelay = delay;
            };

            if ('IntersectionObserver' in global) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const target = entry.target;
                            target.classList.add('visible');
                            observer.unobserve(target);
                        }
                    });
                }, { threshold: 0.15 });

                revealElements.forEach(el => {
                    applyReveal(el);
                    observer.observe(el);
                });
            } else {
                revealElements.forEach(el => {
                    applyReveal(el);
                    el.classList.add('visible');
                });
            }
        },

        // Toast Notifications
        toastQueue: [],
        createToast(title, body, duration = 3000) {
            const doc = global.document;
            let container = doc.querySelector('.luc-toast-container');
            if (!container) {
                container = doc.createElement('div');
                container.className = 'luc-toast-container';
                doc.body.appendChild(container);
            }

            const toast = doc.createElement('div');
            toast.className = 'luc-toast luc-glass';
            toast.innerHTML = `
                <div class="luc-toast-header">
                    <strong class="luc-toast-title">${title}</strong>
                    <button class="luc-toast-close" onclick="this.closest('.luc-toast').remove()">&times;</button>
                </div>
                <div class="luc-toast-body">${body}</div>
            `;

            container.appendChild(toast);
            global.setTimeout(() => toast.classList.add('active'), 10);

            global.setTimeout(() => {
                toast.classList.remove('active');
                global.setTimeout(() => toast.remove(), 300);
            }, duration);
        },

        // Carousel Management
        initCarousels(doc = global.document) {
            doc?.querySelectorAll('.luc-carousel').forEach(carousel => {
                const inner = carousel.querySelector('.luc-carousel-inner');
                const items = carousel.querySelectorAll('.luc-carousel-item');
                const indicators = carousel.querySelectorAll('.luc-carousel-indicator');
                const prev = carousel.querySelector('.luc-carousel-prev');
                const next = carousel.querySelector('.luc-carousel-next');
                let currentIndex = 0;

                const updateCarousel = (index) => {
                    if (index < 0) index = items.length - 1;
                    if (index >= items.length) index = 0;
                    currentIndex = index;

                    inner.style.transform = `translateX(-${currentIndex * 100}%)`;

                    indicators.forEach((ind, i) => {
                        ind.classList.toggle('active', i === currentIndex);
                    });
                };

                if (prev) prev.addEventListener('click', () => updateCarousel(currentIndex - 1));
                if (next) next.addEventListener('click', () => updateCarousel(currentIndex + 1));

                indicators.forEach((ind, i) => {
                    ind.addEventListener('click', () => updateCarousel(i));
                });
            });
        },

        // Cookie Consent Dismissal
        initCookieConsent(doc = global.document) {
            const banner = doc?.querySelector('.luc-cookie-banner');
            if (banner) {
                const acceptBtn = banner.querySelector('[data-luc-cookie="accept"]');
                if (acceptBtn) {
                    acceptBtn.addEventListener('click', () => {
                        banner.style.display = 'none';
                    });
                }
            }
        },

        // Global Initialization
        init() {
            const doc = global.document;
            this.initTheme(doc);
            this.initModals(doc);
            this.initAccordions(doc);
            this.initDropdowns(doc);
            this.initTabs(doc);
            this.initNavbar(doc);
            this.initReveal(doc);
            this.initCarousels(doc);
            this.initCookieConsent(doc);
        }
    };

    // Auto init on DOM load
    global.document?.addEventListener('DOMContentLoaded', () => lucUI.init());

    global.lucUI = lucUI;

})(window);
