// Animation Utilities - Animações e transições

const AnimationManager = {
    // Configurações padrão
    defaults: {
        duration: 300,
        easing: 'ease-out',
        delay: 0
    },

    // Easings customizados
    easings: {
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },

    // Fade In
    fadeIn: function(element, options = {}) {
        const config = { ...this.defaults, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            element.style.opacity = '0';
            element.style.display = element.style.display || 'block';
            element.style.transition = `opacity ${config.duration}ms ${config.easing}`;
            
            // Force reflow
            element.offsetHeight;
            
            setTimeout(() => {
                element.style.opacity = '1';
                
                setTimeout(() => {
                    element.style.transition = '';
                    resolve();
                }, config.duration);
            }, config.delay);
        });
    },

    // Fade Out
    fadeOut: function(element, options = {}) {
        const config = { ...this.defaults, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            element.style.transition = `opacity ${config.duration}ms ${config.easing}`;
            
            setTimeout(() => {
                element.style.opacity = '0';
                
                setTimeout(() => {
                    if (config.hide !== false) {
                        element.style.display = 'none';
                    }
                    element.style.transition = '';
                    resolve();
                }, config.duration);
            }, config.delay);
        });
    },

    // Slide Up
    slideUp: function(element, options = {}) {
        const config = { ...this.defaults, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            element.style.transform = 'translateY(20px)';
            element.style.opacity = '0';
            element.style.display = element.style.display || 'block';
            element.style.transition = `all ${config.duration}ms ${config.easing}`;
            
            // Force reflow
            element.offsetHeight;
            
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                
                setTimeout(() => {
                    element.style.transition = '';
                    resolve();
                }, config.duration);
            }, config.delay);
        });
    },

    // Slide Down
    slideDown: function(element, options = {}) {
        const config = { ...this.defaults, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            element.style.transition = `all ${config.duration}ms ${config.easing}`;
            
            setTimeout(() => {
                element.style.transform = 'translateY(20px)';
                element.style.opacity = '0';
                
                setTimeout(() => {
                    if (config.hide !== false) {
                        element.style.display = 'none';
                    }
                    element.style.transition = '';
                    resolve();
                }, config.duration);
            }, config.delay);
        });
    },

    // Scale In
    scaleIn: function(element, options = {}) {
        const config = { ...this.defaults, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            element.style.transform = 'scale(0.8)';
            element.style.opacity = '0';
            element.style.display = element.style.display || 'block';
            element.style.transition = `all ${config.duration}ms ${this.easings.bounce}`;
            
            // Force reflow
            element.offsetHeight;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
                
                setTimeout(() => {
                    element.style.transition = '';
                    resolve();
                }, config.duration);
            }, config.delay);
        });
    },

    // Pulse
    pulse: function(element, options = {}) {
        const config = { duration: 600, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            element.style.transition = `transform ${config.duration}ms ${this.easings.bounce}`;
            element.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    element.style.transition = '';
                    resolve();
                }, config.duration);
            }, config.duration / 2);
        });
    },

    // Shake (para erros)
    shake: function(element, options = {}) {
        const config = { duration: 500, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            const keyframes = [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ];

            const animation = element.animate(keyframes, {
                duration: config.duration,
                easing: 'ease-in-out'
            });

            animation.onfinish = () => resolve();
        });
    },

    // Bounce In
    bounceIn: function(element, options = {}) {
        const config = { duration: 600, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            const keyframes = [
                { transform: 'scale(0)', opacity: '0' },
                { transform: 'scale(1.1)', opacity: '1' },
                { transform: 'scale(0.9)' },
                { transform: 'scale(1)' }
            ];

            element.style.display = element.style.display || 'block';

            const animation = element.animate(keyframes, {
                duration: config.duration,
                easing: 'ease-out',
                delay: config.delay
            });

            animation.onfinish = () => resolve();
        });
    },

    // Slide In from Right
    slideInRight: function(element, options = {}) {
        const config = { ...this.defaults, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            element.style.transform = 'translateX(100%)';
            element.style.opacity = '0';
            element.style.display = element.style.display || 'block';
            element.style.transition = `all ${config.duration}ms ${config.easing}`;
            
            // Force reflow
            element.offsetHeight;
            
            setTimeout(() => {
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
                
                setTimeout(() => {
                    element.style.transition = '';
                    resolve();
                }, config.duration);
            }, config.delay);
        });
    },

    // Progress Bar Animation
    animateProgress: function(element, targetWidth, options = {}) {
        const config = { duration: 1000, ...options };
        
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            element.style.width = '0%';
            element.style.transition = `width ${config.duration}ms ${this.easings.easeOut}`;
            
            // Force reflow
            element.offsetHeight;
            
            setTimeout(() => {
                element.style.width = targetWidth + '%';
                
                setTimeout(() => {
                    resolve();
                }, config.duration);
            }, config.delay || 100);
        });
    },

    // Loading Spinner
    showLoadingSpinner: function(container, options = {}) {
        const config = { 
            size: '40px',
            color: 'var(--primary-500)',
            ...options 
        };

        if (!container) return null;

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner-overlay';
        spinner.innerHTML = `
            <div class="loading-spinner" style="
                width: ${config.size};
                height: ${config.size};
                border: 3px solid rgba(59, 130, 246, 0.2);
                border-top: 3px solid ${config.color};
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        `;
        
        spinner.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(2px);
            z-index: 1000;
        `;

        container.style.position = 'relative';
        container.appendChild(spinner);

        return {
            remove: () => {
                if (spinner.parentNode) {
                    this.fadeOut(spinner, { duration: 200 }).then(() => {
                        spinner.remove();
                    });
                }
            }
        };
    },

    // Typewriter Effect
    typewriter: function(element, text, options = {}) {
        const config = { 
            speed: 50,
            cursor: true,
            ...options 
        };

        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            element.textContent = '';
            let i = 0;

            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, config.speed);
                } else {
                    if (config.cursor) {
                        element.innerHTML += '<span class="cursor">|</span>';
                    }
                    resolve();
                }
            };

            type();
        });
    },

    // Stagger Animation (para listas)
    staggerIn: function(elements, options = {}) {
        const config = { 
            delay: 100,
            animation: 'slideUp',
            ...options 
        };

        if (!elements || elements.length === 0) {
            return Promise.resolve();
        }

        const promises = Array.from(elements).map((element, index) => {
            return this[config.animation](element, {
                delay: index * config.delay,
                ...config
            });
        });

        return Promise.all(promises);
    },

    // Parallax Effect
    setupParallax: function(element, options = {}) {
        const config = {
            speed: 0.5,
            direction: 'vertical',
            ...options
        };

        if (!element) return;

        const updateParallax = () => {
            const rect = element.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * -config.speed;

            if (config.direction === 'vertical') {
                element.style.transform = `translateY(${rate}px)`;
            } else {
                element.style.transform = `translateX(${rate}px)`;
            }
        };

        window.addEventListener('scroll', updateParallax);
        
        return {
            destroy: () => {
                window.removeEventListener('scroll', updateParallax);
            }
        };
    },

    // Intersection Observer Animation
    setupScrollAnimation: function(elements, options = {}) {
        const config = {
            threshold: 0.1,
            animation: 'slideUp',
            once: true,
            ...options
        };

        if (!elements) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this[config.animation](entry.target, config);
                    
                    if (config.once) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: config.threshold
        });

        const elementList = Array.isArray(elements) ? elements : [elements];
        elementList.forEach(element => {
            if (element) {
                observer.observe(element);
            }
        });

        return observer;
    },

    // Utility: Check if animations are enabled
    isAnimationEnabled: function() {
        return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    // Utility: Safe animate (respects user preferences)
    safeAnimate: function(animationFunction, ...args) {
        if (this.isAnimationEnabled()) {
            return animationFunction.apply(this, args);
        } else {
            // Skip animation, just show/hide element
            const element = args[0];
            if (element && animationFunction.name.includes('In') || animationFunction.name.includes('Up')) {
                element.style.display = 'block';
                element.style.opacity = '1';
                element.style.transform = 'none';
            }
            return Promise.resolve();
        }
    }
};

// CSS Animations (injected into head)
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-10px); }
            70% { transform: translateY(-5px); }
            90% { transform: translateY(-2px); }
        }
        
        .cursor {
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-out;
        }
        
        .slide-up {
            animation: slideUp 0.6s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0; 
                transform: translateY(20px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Export for global use
if (typeof window !== 'undefined') {
    window.AnimationManager = AnimationManager;
}

