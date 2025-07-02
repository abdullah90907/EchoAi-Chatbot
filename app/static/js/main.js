// EchoAI Main JavaScript

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Add loading states to forms
    addLoadingStates();
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Initialize animations
    initializeAnimations();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Initialize navbar scroll effect
    initializeNavbarScroll();
}

/**
 * Initialize navbar scroll effects
 */
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 16));
    }
}

/**
 * Add loading states to forms
 */
function addLoadingStates() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
                submitBtn.disabled = true;
                
                // Reset after 30 seconds as failsafe
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 30000);
            }
        });
    });
}

/**
 * Add smooth scrolling for anchor links
 */
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize scroll animations
 */
function initializeAnimations() {
    // Enhanced Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe all feature cards and stat items
    const animateElements = document.querySelectorAll('.feature-card, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add parallax effect to hero section
    initializeParallax();
    
    // Initialize number animations for stats
    initializeNumberAnimations();
    
    // Add floating elements animation
    initializeFloatingElements();
}

/**
 * Initialize parallax effects
 */
function initializeParallax() {
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const floatingCard = document.querySelector('.floating-card');
        
        if (heroSection) {
            // Parallax effect for hero background
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (floatingCard) {
            // Floating card parallax
            floatingCard.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.01}deg)`;
        }
    }, 16));
}

/**
 * Initialize floating elements
 */
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-card, .feature-icon');
    
    floatingElements.forEach((element, index) => {
        // Add random floating animation delay
        element.style.animationDelay = `${index * 0.5}s`;
        
        // Add mouse move effect
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) rotate(${x * 0.02}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
}

/**
 * Add keyboard shortcuts
 */
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + / for help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            showKeyboardShortcuts();
        }
        
        // Escape to close modals/alerts
        if (e.key === 'Escape') {
            const alerts = document.querySelectorAll('.alert');
            alerts.forEach(alert => {
                if (alert.style.display !== 'none') {
                    alert.style.display = 'none';
                }
            });
        }
    });
}

/**
 * Show keyboard shortcuts modal
 */
function showKeyboardShortcuts() {
    const shortcuts = [
        { key: 'Ctrl + /', description: 'Show keyboard shortcuts' },
        { key: 'Escape', description: 'Close alerts/modals' },
        { key: 'Enter', description: 'Submit forms' },
        { key: 'Tab', description: 'Navigate between elements' }
    ];
    
    let shortcutsList = shortcuts.map(shortcut => 
        `<div class="d-flex justify-content-between mb-2">
            <kbd>${shortcut.key}</kbd>
            <span>${shortcut.description}</span>
        </div>`
    ).join('');
    
    showModal('Keyboard Shortcuts', shortcutsList);
}

/**
 * Show a modal with custom content
 */
function showModal(title, content) {
    const modalHtml = `
        <div class="modal fade" id="customModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('customModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    if (typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(document.getElementById('customModal'));
        modal.show();
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success', duration = 3000) {
    const toastHtml = `
        <div class="toast align-items-center text-white bg-${type} border-0 position-fixed" 
             style="top: 20px; right: 20px; z-index: 1055;">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-${getToastIcon(type)} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                        data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    const toastElement = toastContainer.lastElementChild;
    
    if (typeof bootstrap !== 'undefined') {
        const toast = new bootstrap.Toast(toastElement, { delay: duration });
        toast.show();
        
        // Remove toast element after hiding
        toastElement.addEventListener('hidden.bs.toast', function() {
            toastElement.remove();
        });
    } else {
        // Fallback without Bootstrap
        setTimeout(() => {
            toastElement.remove();
        }, duration);
    }
}

/**
 * Create toast container if it doesn't exist
 */
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'position-fixed';
    container.style.cssText = 'top: 20px; right: 20px; z-index: 1055;';
    document.body.appendChild(container);
    return container;
}

/**
 * Get icon for toast type
 */
function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('Copied to clipboard!', 'success');
            return true;
        } catch (err) {
            showToast('Failed to copy to clipboard', 'error');
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

/**
 * Format text with basic markdown-style formatting
 */
function formatText(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Animate number counting
 */
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (range * progress));
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

/**
 * Initialize number animations for stats
 */
function initializeNumberAnimations() {
    const statNumbers = document.querySelectorAll('.stat-item h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const finalNumber = parseInt(entry.target.textContent.replace(/[^\d]/g, ''));
                if (!isNaN(finalNumber)) {
                    animateNumber(entry.target, 0, finalNumber, 2000);
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    });
    
    statNumbers.forEach(el => observer.observe(el));
}

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNumberAnimations);
} else {
    initializeNumberAnimations();
}

// Export functions for global use
window.EchoAI = {
    showToast,
    copyToClipboard,
    formatText,
    debounce,
    throttle,
    isInViewport,
    animateNumber,
    showModal
};
