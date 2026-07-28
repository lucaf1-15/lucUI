/* ============================================================
   lucUI — Core JavaScript Library v2.0
   Accessible interactions and reactive prism lighting
   ============================================================ */

(function (global) {
    'use strict';

    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const lucUI = {
        version: '2.0.1',
        initialized: false,
        activeModal: null,
        modalTrigger: null,
        commandTrigger: null,
        toastQueue: [],
        initializedDocuments: new WeakSet(),

        safeStorage: {
            get(key) {
                try { return global.localStorage?.getItem(key); } catch (_error) { return null; }
            },
            set(key, value) {
                try { global.localStorage?.setItem(key, value); } catch (_error) { /* Storage is optional. */ }
            }
        },

        getFocusable(container) {
            return Array.from(container?.querySelectorAll(focusableSelector) || [])
                .filter(element => {
                    if (element.hidden || element.getAttribute('aria-hidden') === 'true') return false;
                    const view = element.ownerDocument?.defaultView;
                    const style = view?.getComputedStyle?.(element);
                    return !style || (style.display !== 'none' && style.visibility !== 'hidden');
                });
        },

        initTheme(doc = global.document) {
            const root = doc?.documentElement;
            if (!root) return;

            const declaredTheme = root.getAttribute('data-theme');
            const savedTheme = this.safeStorage.get('luc-theme');
            const systemTheme = global.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            const theme = savedTheme || declaredTheme || systemTheme;
            this.setTheme(theme, doc, false);

            doc.querySelectorAll('[data-luc-theme-switch]').forEach(button => {
                button.addEventListener('click', () => {
                    this.setTheme(button.getAttribute('data-luc-theme-switch'), doc);
                });
            });
        },

        setTheme(theme, doc = global.document, persist = true) {
            const allowedThemes = ['light', 'dark', 'midnight', 'sunrise'];
            const selectedTheme = allowedThemes.includes(theme) ? theme : 'dark';
            const root = doc?.documentElement;
            if (!root) return;

            root.setAttribute('data-theme', selectedTheme);
            root.style.colorScheme = ['light', 'sunrise'].includes(selectedTheme) ? 'light' : 'dark';

            doc.querySelectorAll('[data-luc-theme-switch]').forEach(button => {
                const selected = button.getAttribute('data-luc-theme-switch') === selectedTheme;
                button.setAttribute('aria-pressed', String(selected));
            });

            if (persist) this.safeStorage.set('luc-theme', selectedTheme);
            root.dispatchEvent(new global.CustomEvent('luc:themechange', { detail: { theme: selectedTheme } }));
        },

        resolveTarget(selector, doc = global.document) {
            if (!selector || !doc) return null;
            try { return doc.querySelector(selector); } catch (_error) { return null; }
        },

        initModals(doc = global.document) {
            doc?.querySelectorAll('[data-luc-toggle="modal"]').forEach(trigger => {
                const modal = this.resolveTarget(trigger.getAttribute('data-luc-target'), doc);
                if (!modal) return;
                trigger.setAttribute('aria-haspopup', 'dialog');
                trigger.setAttribute('aria-expanded', 'false');
                if (modal.id) trigger.setAttribute('aria-controls', modal.id);
                trigger.addEventListener('click', event => {
                    event.preventDefault();
                    this.showModal(modal, doc, trigger);
                });
            });

            doc?.querySelectorAll('[data-luc-dismiss="modal"]').forEach(button => {
                button.addEventListener('click', event => {
                    event.preventDefault();
                    const modal = button.closest('.luc-modal-backdrop') || button.closest('.luc-modal');
                    if (modal) this.hideModal(modal, doc);
                });
            });

            doc?.querySelectorAll('.luc-modal-backdrop').forEach(backdrop => {
                backdrop.addEventListener('click', event => {
                    if (event.target === backdrop) this.hideModal(backdrop, doc);
                });
            });

            doc?.addEventListener('keydown', event => {
                if (!this.activeModal) return;
                if (event.key === 'Escape') {
                    event.preventDefault();
                    this.hideModal(this.activeModal, doc);
                } else if (event.key === 'Tab') {
                    this.trapFocus(event, this.activeModal);
                }
            });
        },

        trapFocus(event, container) {
            const focusable = this.getFocusable(container);
            const doc = container?.ownerDocument || global.document;
            if (!focusable.length) {
                event.preventDefault();
                const dialog = container.querySelector?.('.luc-modal, .luc-command') || container;
                dialog.setAttribute?.('tabindex', '-1');
                dialog.focus?.();
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = doc.activeElement;
            if (!container.contains(active)) {
                event.preventDefault();
                first.focus();
            } else if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            }
        },

        showModal(modal, doc = global.document, trigger = doc?.activeElement) {
            if (!modal) return;
            this.modalTrigger = trigger && typeof trigger.focus === 'function' ? trigger : null;
            this.activeModal = modal;
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            const dialog = modal.matches?.('.luc-modal') ? modal : modal.querySelector?.('.luc-modal, [role="dialog"]');
            if (dialog) {
                dialog.setAttribute('role', 'dialog');
                dialog.setAttribute('aria-modal', 'true');
                dialog.setAttribute('tabindex', dialog.getAttribute('tabindex') || '-1');
            }
            const frame = global.requestAnimationFrame || (callback => global.setTimeout(callback, 0));
            frame(() => modal.classList.add('active'));
            this.modalTrigger?.setAttribute?.('aria-expanded', 'true');
            if (doc?.body) {
                doc.body.dataset.lucPreviousOverflow = doc.body.style.overflow;
                doc.body.style.overflow = 'hidden';
            }
            global.setTimeout(() => {
                if (!modal.classList.contains('active')) return;
                const target = modal.querySelector?.('[autofocus]') || this.getFocusable(modal)[0] || dialog || modal;
                if (target === modal) modal.setAttribute('tabindex', '-1');
                target.focus?.();
            }, 30);
            modal.dispatchEvent(new global.CustomEvent('luc:modalshow'));
        },

        hideModal(modal, doc = global.document) {
            if (!modal) return;
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            if (this.activeModal === modal) this.activeModal = null;
            if (doc?.body) {
                doc.body.style.overflow = doc.body.dataset.lucPreviousOverflow || '';
                delete doc.body.dataset.lucPreviousOverflow;
            }
            global.setTimeout(() => {
                if (!modal.classList.contains('active')) modal.style.display = 'none';
            }, 300);
            const trigger = this.modalTrigger;
            this.modalTrigger = null;
            trigger?.setAttribute?.('aria-expanded', 'false');
            trigger?.focus?.();
            modal.dispatchEvent(new global.CustomEvent('luc:modalhide'));
        },

        initDropdowns(doc = global.document) {
            const closeAll = except => {
                doc?.querySelectorAll('.luc-dropdown.open, .luc-dropdown.active').forEach(dropdown => {
                    if (dropdown === except) return;
                    dropdown.classList.remove('open', 'active');
                    dropdown.querySelector('.luc-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
                    dropdown.querySelector('.luc-dropdown-menu')?.setAttribute('aria-hidden', 'true');
                });
            };

            doc?.querySelectorAll('.luc-dropdown-toggle').forEach((toggle, dropdownIndex) => {
                const dropdown = toggle.closest('.luc-dropdown');
                const menu = dropdown?.querySelector('.luc-dropdown-menu');
                const initiallyOpen = dropdown?.classList.contains('open') || dropdown?.classList.contains('active');
                toggle.setAttribute('aria-expanded', String(Boolean(initiallyOpen)));
                toggle.setAttribute('aria-haspopup', 'menu');
                if (!toggle.matches('button, input, a[href]')) {
                    toggle.setAttribute('role', toggle.getAttribute('role') || 'button');
                    toggle.setAttribute('tabindex', toggle.getAttribute('tabindex') || '0');
                    toggle.addEventListener('keydown', event => {
                        if (!['Enter', ' '].includes(event.key)) return;
                        event.preventDefault();
                        toggle.click();
                    });
                }
                if (menu) {
                    if (!menu.id) menu.id = `luc-dropdown-menu-${dropdownIndex + 1}`;
                    menu.setAttribute('role', menu.getAttribute('role') || 'menu');
                    menu.setAttribute('aria-hidden', String(!initiallyOpen));
                    toggle.setAttribute('aria-controls', menu.id);
                    menu.querySelectorAll('.luc-dropdown-item').forEach(item => {
                        item.setAttribute('role', item.getAttribute('role') || 'menuitem');
                        if (!item.matches('a[href], button, input, select, textarea, [tabindex]')) {
                            item.setAttribute('tabindex', '-1');
                        }
                    });
                }
                toggle.addEventListener('click', event => {
                    event.preventDefault();
                    event.stopPropagation();
                    const dropdown = toggle.closest('.luc-dropdown');
                    if (!dropdown) return;
                    const isOpen = dropdown.classList.contains('open') || dropdown.classList.contains('active');
                    const willOpen = !isOpen;
                    closeAll(dropdown);
                    dropdown.classList.toggle('open', willOpen);
                    dropdown.classList.toggle('active', willOpen);
                    toggle.setAttribute('aria-expanded', String(willOpen));
                    dropdown.querySelector('.luc-dropdown-menu')?.setAttribute('aria-hidden', String(!willOpen));
                });
                toggle.addEventListener('keydown', event => {
                    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
                    event.preventDefault();
                    if (toggle.getAttribute('aria-expanded') !== 'true') toggle.click();
                    const items = Array.from(toggle.closest('.luc-dropdown')?.querySelectorAll('.luc-dropdown-item') || []);
                    const target = event.key === 'ArrowUp' ? items.at(-1) : items[0];
                    target?.focus();
                });
            });

            doc?.addEventListener('click', () => closeAll());
            doc?.addEventListener('keydown', event => {
                const dropdown = event.target?.closest?.('.luc-dropdown');
                if (event.key === 'Escape' && dropdown) {
                    closeAll();
                    dropdown.querySelector('.luc-dropdown-toggle')?.focus();
                    return;
                }
                if (!dropdown || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
                const items = Array.from(dropdown.querySelectorAll('.luc-dropdown-item'));
                if (!items.length) return;
                event.preventDefault();
                const current = Math.max(0, items.indexOf(event.target));
                let index = current;
                if (event.key === 'ArrowDown') index = (current + 1) % items.length;
                if (event.key === 'ArrowUp') index = (current - 1 + items.length) % items.length;
                if (event.key === 'Home') index = 0;
                if (event.key === 'End') index = items.length - 1;
                items[index].focus();
            });
        },

        initTabs(doc = global.document) {
            doc?.querySelectorAll('.luc-tabs').forEach((tabs, groupIndex) => {
                const buttons = Array.from(tabs.querySelectorAll('.luc-tab'));
                const panels = Array.from(tabs.querySelectorAll('.luc-tab-panel'));
                if (!buttons.length || !panels.length) return;

                const activate = (index, focus = false) => {
                    const safeIndex = Math.max(0, Math.min(index, buttons.length - 1));
                    buttons.forEach((button, itemIndex) => {
                        const active = itemIndex === safeIndex;
                        button.classList.toggle('active', active);
                        button.setAttribute('aria-selected', String(active));
                        button.setAttribute('tabindex', active ? '0' : '-1');
                    });
                    panels.forEach((panel, itemIndex) => {
                        const active = itemIndex === safeIndex;
                        panel.classList.toggle('active', active);
                        panel.setAttribute('aria-hidden', String(!active));
                        panel.hidden = !active;
                    });
                    if (focus) buttons[safeIndex].focus();
                };

                buttons.forEach((button, index) => {
                    const panel = panels[index];
                    const buttonId = button.id || `luc-tab-${groupIndex}-${index}`;
                    const panelId = panel?.id || `luc-panel-${groupIndex}-${index}`;
                    button.id = buttonId;
                    button.setAttribute('role', 'tab');
                    button.setAttribute('aria-controls', panelId);
                    if (panel) {
                        panel.id = panelId;
                        panel.setAttribute('role', 'tabpanel');
                        panel.setAttribute('aria-labelledby', buttonId);
                    }
                    button.addEventListener('click', () => {
                        const requested = Number(button.getAttribute('data-luc-tab'));
                        activate(Number.isInteger(requested) ? requested : index);
                    });
                    button.addEventListener('keydown', event => {
                        const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
                        if (!keys.includes(event.key)) return;
                        event.preventDefault();
                        let next = index;
                        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
                        if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
                        if (event.key === 'Home') next = 0;
                        if (event.key === 'End') next = buttons.length - 1;
                        activate(next, true);
                    });
                });

                tabs.querySelector('.luc-tab-list')?.setAttribute('role', 'tablist');
                const current = Math.max(0, buttons.findIndex(button => button.classList.contains('active')));
                activate(current);
            });
        },

        initNavbar(doc = global.document) {
            doc?.querySelectorAll('.luc-navbar').forEach(navbar => {
                const update = () => navbar.classList.toggle('scrolled', global.scrollY > 20);
                global.addEventListener?.('scroll', update, { passive: true });
                update();
            });

            doc?.querySelectorAll('.luc-navbar-toggle').forEach(toggle => {
                const links = toggle.closest('.luc-navbar')?.querySelector('.luc-navbar-links');
                if (links && !links.id) links.id = `luc-navbar-links-${Math.random().toString(36).slice(2, 9)}`;
                if (links?.id) toggle.setAttribute('aria-controls', links.id);
                toggle.setAttribute('aria-expanded', String(Boolean(links?.classList.contains('active'))));
                toggle.addEventListener('click', () => {
                    const links = toggle.closest('.luc-navbar')?.querySelector('.luc-navbar-links');
                    const active = links?.classList.toggle('active');
                    toggle.setAttribute('aria-expanded', String(Boolean(active)));
                });
            });

            doc?.querySelectorAll('.luc-navbar-mega-trigger').forEach(trigger => {
                trigger.addEventListener('click', event => {
                    event.preventDefault();
                    const content = trigger.querySelector('.luc-navbar-mega-content') || trigger.nextElementSibling;
                    const active = content?.classList.toggle('active');
                    trigger.setAttribute('aria-expanded', String(Boolean(active)));
                });
            });

            doc?.querySelectorAll('.luc-navbar-user-avatar').forEach(avatar => {
                avatar.addEventListener('click', () => {
                    const dropdown = avatar.parentElement?.querySelector('.luc-navbar-user-dropdown');
                    const active = dropdown?.classList.toggle('active');
                    avatar.setAttribute('aria-expanded', String(Boolean(active)));
                });
            });

            doc?.addEventListener('click', event => {
                if (event.target?.closest('.luc-navbar')) return;
                doc.querySelectorAll('.luc-navbar-links.active, .luc-navbar-user-dropdown.active, .luc-navbar-mega-content.active')
                    .forEach(element => {
                        element.classList.remove('active');
                        const trigger = element.closest('.luc-navbar')?.querySelector(`[aria-controls="${element.id}"]`) ||
                            element.parentElement?.querySelector('[aria-expanded="true"]');
                        trigger?.setAttribute('aria-expanded', 'false');
                    });
            });
            doc?.addEventListener('keydown', event => {
                if (event.key !== 'Escape') return;
                doc.querySelectorAll('.luc-navbar-links.active, .luc-navbar-user-dropdown.active, .luc-navbar-mega-content.active')
                    .forEach(element => element.classList.remove('active'));
                doc.querySelectorAll('.luc-navbar [aria-expanded="true"]').forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
            });
        },

        initReveal(doc = global.document) {
            const selector = '.luc-reveal, .luc-reveal-up, .luc-reveal-down, .luc-reveal-left, .luc-reveal-right, .luc-reveal-scale, .luc-reveal-rotate, .luc-reveal-blur';
            const elements = Array.from(doc?.querySelectorAll(selector) || []);
            if (!elements.length) return;
            const reducedMotion = global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
            if (reducedMotion || !('IntersectionObserver' in global)) {
                elements.forEach(element => element.classList.add('visible'));
                return;
            }
            const observer = new global.IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
            elements.forEach(element => {
                element.style.transitionDelay = element.getAttribute('data-luc-delay') || '0ms';
                observer.observe(element);
            });
        },

        initPrism(doc = global.document) {
            if (global.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
            let frame = 0;
            const requestFrame = global.requestAnimationFrame || (callback => global.setTimeout(callback, 16));
            global.addEventListener?.('pointermove', event => {
                if (frame) return;
                frame = requestFrame(() => {
                    doc.documentElement.style.setProperty('--luc-pointer-x', `${event.clientX}px`);
                    doc.documentElement.style.setProperty('--luc-pointer-y', `${event.clientY}px`);
                    frame = 0;
                });
            }, { passive: true });

            doc?.querySelectorAll('[data-luc-spotlight], .luc-prism').forEach(surface => {
                surface.addEventListener('pointermove', event => {
                    const bounds = surface.getBoundingClientRect();
                    surface.style.setProperty('--luc-spot-x', `${event.clientX - bounds.left}px`);
                    surface.style.setProperty('--luc-spot-y', `${event.clientY - bounds.top}px`);
                    surface.style.setProperty('--luc-spot-opacity', '1');
                }, { passive: true });
                surface.addEventListener('pointerleave', () => surface.style.setProperty('--luc-spot-opacity', '0'));
            });
        },

        initCopy(doc = global.document) {
            doc?.querySelectorAll('[data-luc-copy]').forEach(button => {
                button.addEventListener('click', async () => {
                    const selector = button.getAttribute('data-luc-copy');
                    const target = this.resolveTarget(selector, doc);
                    const value = target?.value || target?.textContent || '';
                    if (!value) return;
                    try {
                        if (typeof global.navigator?.clipboard?.writeText === 'function') {
                            await global.navigator.clipboard.writeText(value.trim());
                        } else {
                            const textarea = doc.createElement('textarea');
                            textarea.value = value.trim();
                            textarea.setAttribute('readonly', '');
                            textarea.style.position = 'fixed';
                            textarea.style.opacity = '0';
                            doc.body.appendChild(textarea);
                            textarea.select();
                            const copied = doc.execCommand?.('copy');
                            textarea.remove();
                            if (!copied) throw new Error('Clipboard access is unavailable');
                        }
                        button.setAttribute('data-luc-copied', 'true');
                        const label = button.getAttribute('aria-label');
                        button.setAttribute('aria-label', button.getAttribute('data-luc-copy-success') || 'Copied');
                        global.setTimeout(() => {
                            if (label) button.setAttribute('aria-label', label);
                            else button.removeAttribute('aria-label');
                            button.removeAttribute('data-luc-copied');
                        }, 1600);
                    } catch (_error) {
                        button.setAttribute('data-luc-copied', 'false');
                    }
                });
            });
        },

        initAccordions(doc = global.document) {
            /* Native <details> accordions need no JavaScript. This keeps the
               original div-based API working for existing lucUI projects. */
            doc?.querySelectorAll('.luc-accordion-header, .luc-accordion-trigger').forEach(header => {
                if (header.matches('summary') && header.closest('details')) return;
                const item = header.closest('.luc-accordion-item');
                const body = item?.querySelector('.luc-accordion-body, .luc-accordion-content');
                const hasNativeKeyboardActivation = header.matches('button, input, summary, a[href]');
                if (!hasNativeKeyboardActivation) {
                    header.setAttribute('role', 'button');
                    header.setAttribute('tabindex', '0');
                }
                if (body && !body.id) body.id = `luc-accordion-panel-${Math.random().toString(36).slice(2, 9)}`;
                if (body?.id) header.setAttribute('aria-controls', body.id);
                const sync = active => {
                    header.setAttribute('aria-expanded', String(active));
                    if (body) body.hidden = !active;
                };
                sync(Boolean(item?.classList.contains('active')));
                const toggle = () => {
                    const item = header.closest('.luc-accordion-item');
                    const accordion = header.closest('.luc-accordion');
                    if (!item) return;
                    if (accordion?.classList.contains('luc-accordion-collapse')) {
                        accordion.querySelectorAll('.luc-accordion-item.active').forEach(sibling => {
                            if (sibling === item) return;
                            sibling.classList.remove('active');
                            const siblingHeader = sibling.querySelector('.luc-accordion-header, .luc-accordion-trigger');
                            siblingHeader?.setAttribute('aria-expanded', 'false');
                            const siblingBody = sibling.querySelector('.luc-accordion-body, .luc-accordion-content');
                            if (siblingBody) siblingBody.hidden = true;
                        });
                    }
                    const active = item.classList.toggle('active');
                    sync(active);
                };
                header.addEventListener('click', toggle);
                if (!hasNativeKeyboardActivation) {
                    header.addEventListener('keydown', event => {
                        if (!['Enter', ' '].includes(event.key)) return;
                        event.preventDefault();
                        toggle();
                    });
                }
            });

            doc?.querySelectorAll('.luc-accordion-collapse').forEach(accordion => {
                accordion.querySelectorAll('details.luc-accordion-item').forEach(item => {
                    item.addEventListener('toggle', () => {
                        if (!item.open) return;
                        accordion.querySelectorAll('details.luc-accordion-item[open]').forEach(sibling => {
                            if (sibling !== item) sibling.open = false;
                        });
                    });
                });
            });
        },

        initToastTriggers(doc = global.document) {
            doc?.querySelectorAll('[data-luc-toast]').forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const title = trigger.getAttribute('data-luc-toast-title') || 'lucUI';
                    const message = trigger.getAttribute('data-luc-toast-message') || trigger.getAttribute('data-luc-toast') || '';
                    const variant = trigger.getAttribute('data-luc-toast-variant') || 'info';
                    const duration = Number(trigger.getAttribute('data-luc-toast-duration')) || 3600;
                    this.createToast(title, message, duration, variant);
                });
            });
        },

        initScrollProgress(doc = global.document) {
            const indicators = Array.from(doc?.querySelectorAll('[data-luc-scroll-progress]') || []);
            if (!indicators.length) return;
            const update = () => {
                const root = doc.documentElement;
                const maximum = Math.max(1, root.scrollHeight - root.clientHeight);
                const progress = Math.min(1, Math.max(0, global.scrollY / maximum));
                indicators.forEach(indicator => {
                    indicator.style.setProperty('--luc-scroll-progress', String(progress));
                    if (indicator.getAttribute('role') === 'progressbar') {
                        indicator.setAttribute('aria-valuemin', indicator.getAttribute('aria-valuemin') || '0');
                        indicator.setAttribute('aria-valuemax', indicator.getAttribute('aria-valuemax') || '100');
                        indicator.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
                    }
                });
            };
            global.addEventListener?.('scroll', update, { passive: true });
            global.addEventListener?.('resize', update, { passive: true });
            update();
        },

        initCommands(doc = global.document) {
            const palette = doc?.querySelector('.luc-command-backdrop');
            if (!palette) return;
            const input = palette.querySelector('.luc-command-search');
            const items = Array.from(palette.querySelectorAll('.luc-command-item'));
            const dialog = palette.querySelector('.luc-command') || palette;
            const list = palette.querySelector('.luc-command-list');
            if (!dialog.id) dialog.id = 'luc-command-dialog';
            dialog.setAttribute('role', 'dialog');
            dialog.setAttribute('aria-modal', 'true');
            dialog.setAttribute('tabindex', dialog.getAttribute('tabindex') || '-1');
            palette.setAttribute('aria-hidden', palette.classList.contains('active') ? 'false' : 'true');
            if (list) {
                if (!list.id) list.id = 'luc-command-list';
                list.setAttribute('role', 'listbox');
            }
            if (input && list) {
                input.setAttribute('role', 'combobox');
                input.setAttribute('aria-autocomplete', 'list');
                input.setAttribute('aria-controls', list.id);
                input.setAttribute('aria-expanded', String(palette.classList.contains('active')));
            }
            items.forEach((item, index) => {
                if (!item.id) item.id = `luc-command-option-${index + 1}`;
                item.setAttribute('role', 'option');
                item.setAttribute('aria-selected', 'false');
                item.setAttribute('tabindex', '-1');
            });
            let selectedIndex = -1;

            const visibleItems = () => items.filter(item => !item.hidden);
            const select = index => {
                const available = visibleItems();
                if (!available.length) {
                    selectedIndex = -1;
                    input?.removeAttribute('aria-activedescendant');
                    return;
                }
                selectedIndex = (index + available.length) % available.length;
                items.forEach(item => {
                    const selected = item === available[selectedIndex];
                    item.classList.toggle('active', selected);
                    item.setAttribute('aria-selected', String(selected));
                });
                input?.setAttribute('aria-activedescendant', available[selectedIndex].id);
                available[selectedIndex].scrollIntoView?.({ block: 'nearest' });
            };

            const open = trigger => {
                this.commandTrigger = trigger || doc.activeElement;
                palette.classList.add('active');
                palette.setAttribute('aria-hidden', 'false');
                input?.setAttribute('aria-expanded', 'true');
                doc.querySelectorAll('[data-luc-toggle="command"]').forEach(button => {
                    button.setAttribute('aria-expanded', String(button === trigger));
                });
                selectedIndex = -1;
                if (input) input.value = '';
                filter('');
                input?.focus();
            };
            const close = () => {
                palette.classList.remove('active');
                palette.setAttribute('aria-hidden', 'true');
                input?.setAttribute('aria-expanded', 'false');
                input?.removeAttribute('aria-activedescendant');
                doc.querySelectorAll('[data-luc-toggle="command"]').forEach(button => button.setAttribute('aria-expanded', 'false'));
                items.forEach(item => {
                    item.classList.remove('active');
                    item.setAttribute('aria-selected', 'false');
                });
                this.commandTrigger?.focus?.();
                this.commandTrigger = null;
            };
            const filter = query => {
                const normalized = query.trim().toLowerCase();
                items.forEach(item => {
                    item.hidden = !item.textContent.toLowerCase().includes(normalized);
                    item.classList.remove('active');
                    item.setAttribute('aria-selected', 'false');
                });
                selectedIndex = -1;
                input?.removeAttribute('aria-activedescendant');
            };

            doc.querySelectorAll('[data-luc-toggle="command"]').forEach(trigger => {
                trigger.setAttribute('aria-haspopup', 'dialog');
                trigger.setAttribute('aria-controls', dialog.id);
                trigger.setAttribute('aria-expanded', String(palette.classList.contains('active')));
                trigger.addEventListener('click', event => { event.preventDefault(); open(trigger); });
            });
            palette.querySelectorAll('[data-luc-dismiss="command"]').forEach(button => button.addEventListener('click', close));
            palette.addEventListener('click', event => { if (event.target === palette) close(); });
            input?.addEventListener('input', () => filter(input.value));
            items.forEach(item => item.addEventListener('click', () => {
                const target = this.resolveTarget(item.getAttribute('data-luc-command-target'), doc);
                close();
                target?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
            }));
            doc.addEventListener('keydown', event => {
                const shortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
                if (shortcut) {
                    event.preventDefault();
                    palette.classList.contains('active') ? close() : open();
                } else if (event.key === 'Escape' && palette.classList.contains('active')) {
                    close();
                } else if (event.key === 'Tab' && palette.classList.contains('active')) {
                    this.trapFocus(event, palette);
                } else if (palette.classList.contains('active') && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                    event.preventDefault();
                    const count = visibleItems().length;
                    if (!count) return;
                    if (event.key === 'ArrowDown') select(selectedIndex + 1);
                    if (event.key === 'ArrowUp') select(selectedIndex < 0 ? count - 1 : selectedIndex - 1);
                    if (event.key === 'Home') select(0);
                    if (event.key === 'End') select(count - 1);
                } else if (event.key === 'Enter' && palette.classList.contains('active') && selectedIndex >= 0) {
                    event.preventDefault();
                    visibleItems()[selectedIndex]?.click();
                }
            });
        },

        createToast(title, body, duration = 3600, variant = 'info') {
            const doc = global.document;
            if (!doc?.body) return null;
            let container = doc.querySelector('.luc-toast-container');
            if (!container) {
                container = doc.createElement('div');
                container.className = 'luc-toast-container luc-toast-container-bottom-right';
                container.setAttribute('aria-live', 'polite');
                doc.body.appendChild(container);
            }

            const variants = ['info', 'success', 'warning', 'error', 'gold'];
            const safeVariant = variants.includes(variant) ? variant : 'info';
            const safeDuration = Math.min(30000, Math.max(1000, Number(duration) || 3600));
            const toast = doc.createElement('div');
            toast.className = `luc-toast luc-toast-${safeVariant}`;
            toast.setAttribute('role', safeVariant === 'error' ? 'alert' : 'status');
            const content = doc.createElement('div');
            content.className = 'luc-toast-content luc-toast-body';
            const heading = doc.createElement('strong');
            heading.className = 'luc-toast-title';
            heading.textContent = String(title);
            const message = doc.createElement('p');
            message.className = 'luc-toast-message';
            message.textContent = String(body);
            const close = doc.createElement('button');
            close.className = 'luc-toast-close';
            close.type = 'button';
            close.setAttribute('aria-label', 'Dismiss notification');
            close.textContent = '×';
            const progress = doc.createElement('span');
            progress.className = 'luc-toast-progress';
            progress.style.animationDuration = `${safeDuration}ms`;
            content.append(heading, message);
            toast.append(content, close, progress);
            container.appendChild(toast);
            this.toastQueue.push(toast);

            const dismiss = () => {
                if (!toast.isConnected) return;
                toast.classList.add('removing');
                global.setTimeout(() => {
                    toast.remove();
                    this.toastQueue = this.toastQueue.filter(item => item !== toast);
                }, 280);
            };
            close.addEventListener('click', dismiss);
            global.setTimeout(dismiss, safeDuration);
            return toast;
        },

        initCarousels(doc = global.document) {
            doc?.querySelectorAll('.luc-carousel').forEach((carousel, carouselIndex) => {
                const inner = carousel.querySelector('.luc-carousel-inner');
                const items = Array.from(carousel.querySelectorAll('.luc-carousel-item'));
                const indicators = Array.from(carousel.querySelectorAll('.luc-carousel-indicator')).slice(0, items.length);
                if (!inner || !items.length) return;
                const initial = Math.max(0, items.findIndex(item => item.classList.contains('active')));
                carousel.setAttribute('role', carousel.getAttribute('role') || 'region');
                carousel.setAttribute('aria-roledescription', 'carousel');
                let current = initial;
                const update = index => {
                    current = (index + items.length) % items.length;
                    inner.style.transform = `translateX(-${current * 100}%)`;
                    items.forEach((item, itemIndex) => {
                        const inactive = itemIndex !== current;
                        item.classList.toggle('active', !inactive);
                        item.setAttribute('aria-hidden', String(inactive));
                        item.querySelectorAll(focusableSelector).forEach(control => {
                            if (inactive) {
                                if (!control.hasAttribute('data-luc-tabindex')) control.setAttribute('data-luc-tabindex', control.getAttribute('tabindex') || '');
                                control.setAttribute('tabindex', '-1');
                            } else if (control.hasAttribute('data-luc-tabindex')) {
                                const original = control.getAttribute('data-luc-tabindex');
                                original ? control.setAttribute('tabindex', original) : control.removeAttribute('tabindex');
                                control.removeAttribute('data-luc-tabindex');
                            }
                        });
                    });
                    indicators.forEach((indicator, itemIndex) => {
                        if (!items[itemIndex].id) items[itemIndex].id = `luc-carousel-${carouselIndex + 1}-slide-${itemIndex + 1}`;
                        indicator.classList.toggle('active', itemIndex === current);
                        indicator.setAttribute('aria-pressed', String(itemIndex === current));
                        indicator.setAttribute('aria-label', indicator.getAttribute('aria-label') || `Go to slide ${itemIndex + 1}`);
                        indicator.setAttribute('aria-controls', items[itemIndex].id);
                    });
                };
                const previous = carousel.querySelector('.luc-carousel-prev');
                const next = carousel.querySelector('.luc-carousel-next');
                previous?.setAttribute('aria-label', previous.getAttribute('aria-label') || 'Previous slide');
                next?.setAttribute('aria-label', next.getAttribute('aria-label') || 'Next slide');
                previous?.addEventListener('click', () => update(current - 1));
                next?.addEventListener('click', () => update(current + 1));
                indicators.forEach((indicator, index) => {
                    const hasNativeKeyboardActivation = indicator.matches('button, input, a[href]');
                    if (!hasNativeKeyboardActivation) {
                        indicator.setAttribute('role', indicator.getAttribute('role') || 'button');
                        indicator.setAttribute('tabindex', indicator.getAttribute('tabindex') || '0');
                        indicator.addEventListener('keydown', event => {
                            if (!['Enter', ' '].includes(event.key)) return;
                            event.preventDefault();
                            update(index);
                        });
                    }
                    indicator.addEventListener('click', () => update(index));
                });
                carousel.addEventListener('keydown', event => {
                    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
                    if (event.target?.matches?.('input, textarea, select, [contenteditable="true"]')) return;
                    event.preventDefault();
                    update(event.key === 'ArrowLeft' ? current - 1 : current + 1);
                });
                update(initial);
            });
        },

        initCookieConsent(doc = global.document) {
            doc?.querySelectorAll('.luc-cookie-banner').forEach(banner => {
                const key = banner.getAttribute('data-luc-cookie-key') || 'luc-cookie-consent';
                if (this.safeStorage.get(key) === 'accepted') {
                    banner.hidden = true;
                    return;
                }
                banner.querySelector('[data-luc-cookie="accept"]')?.addEventListener('click', () => {
                    this.safeStorage.set(key, 'accepted');
                    banner.hidden = true;
                });
            });
        },

        init(doc = global.document) {
            if (!doc || this.initializedDocuments.has(doc)) return;
            if (!doc.body) {
                doc.addEventListener('DOMContentLoaded', () => this.init(doc), { once: true });
                return;
            }
            this.initializedDocuments.add(doc);
            this.initialized = true;
            this.initTheme(doc);
            this.initModals(doc);
            this.initAccordions(doc);
            this.initDropdowns(doc);
            this.initTabs(doc);
            this.initNavbar(doc);
            this.initReveal(doc);
            this.initPrism(doc);
            this.initCopy(doc);
            this.initToastTriggers(doc);
            this.initCommands(doc);
            this.initCarousels(doc);
            this.initCookieConsent(doc);
            this.initScrollProgress(doc);
            doc.documentElement.classList.add('luc-ready');
            doc.dispatchEvent(new global.CustomEvent('luc:ready', { detail: { version: this.version } }));
        }
    };

    if (global.document?.readyState === 'loading') {
        global.document.addEventListener('DOMContentLoaded', () => lucUI.init(), { once: true });
    } else {
        lucUI.init();
    }

    global.lucUI = lucUI;
})(window);
