function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function openWhatsAppFromState() {
  const phone = "9334923504"; // WhatsApp number

  const f = state.formData;

  const text = `
    📸 *New Booking Enquiry*
    Name: ${f.user_name}
    Email: ${f.user_email}
    Phone: ${f.user_phone}
    Plan: ${f.plan}
    Date: ${f.event_date}

    Message:
    ${f.message}
    `;

  const encoded = encodeURIComponent(text.trim());

  const url = isMobileDevice()
    ? `whatsapp://send?phone=${phone}&text=${encoded}`
    : `https://wa.me/${phone}?text=${encoded}`;

  window.open(url, "_blank");
}

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'rose': { 700: '#be123c', 500: '#f43f5e', 900: '#881337' }, 
                'amber': { 500: '#f59e0b', 600: '#d97706', 900: '#78350f' },
                'neutral': { 950: '#0a0a0a', 900: '#171717', 800: '#262626', 100: '#f5f5f5', 50: '#fafafa' }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'], 
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'pulse-slow': {
                    '0%, 100%': { transform: 'scale(1.0)', opacity: '0.6' },
                    '50%': { transform: 'scale(1.02)', opacity: '0.7' },
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
                'pulse-slow': 'pulse-slow 20s infinite',
            }
        }
    }
};

window.selectPlan = function(planName) {
    state.selectedPlan = planName;
    renderApp();
    // Removed scroll logic as requested
};

window.updateSelectedPlan = function(planName) {
    state.selectedPlan = planName;
    renderApp();
};

window.updateFormData = function(field, value) {
    state.formData[field] = value;
};

function updateHeaderState() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const t = getThemeStyle();
    // Same logic as renderHeader but applied directly to DOM
    const headerClasses = state.isScrolled 
        ? `bg-${t.secondaryBg.substring(3)}/90 backdrop-blur-md py-4 shadow-lg` 
        : 'bg-transparent py-6';
    
    navbar.className = `fixed top-0 w-full z-40 transition-all duration-300 ${headerClasses}`;
}

window.handleContactSubmit = function(event) {
    event.preventDefault();

    // Check if offline
    if (!navigator.onLine) {
        alert("No internet connection. Please check your connection and try again.");
        return;
    }

    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;

    // Send email via EmailJS
        emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID, 
            EMAILJS_CONFIG.TEMPLATE_ID, 
            form, 
            EMAILJS_CONFIG.PUBLIC_KEY
        )
        .then(() => {
            openSuccessModal();
            form.reset();
        }, (error) => {
            alert("Failed to send message: " + JSON.stringify(error));
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        });
};

window.openSuccessModal = function() {
    document.getElementById("success-modal").classList.remove("hidden");
    document.getElementById("success-modal").classList.add("flex");
};

window.closeSuccessModal = function() {
  document.getElementById("success-modal").classList.add("hidden");
  document.getElementById("success-modal").classList.remove("flex");
};

window.toggleTheme = function() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    renderApp();
};

window.setActiveCategory = function(category) {
    state.activeCategory = category;
    state.visibleImageCount = 4;
    renderApp();
};

window.handleLoadMore = function() {
    state.visibleImageCount += 4;
    renderApp();
};
        
window.toggleFaq = (idx) => {
    state.expandedFaq = state.expandedFaq === idx ? null : idx;
    renderApp();
};

function initLoadingScreen() {
    loadingScreenElement.innerHTML = `
        <div class="relative w-24 h-24 mb-8">
            ${Icons.Camera('w-full h-full text-amber-500 animate-[spin_3s_linear_infinite]')}
        </div>
        <div class="text-2xl font-light tracking-[0.3em] mb-4 text-amber-50">CALVIN STUDIO</div>
        <div class="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div id="progress-bar" class="h-full bg-amber-500 transition-all duration-100 ease-out" style="width: 0%;"></div>
        </div>
        <div id="progress-text" class="mt-2 text-xs text-gray-500 font-mono">LOADING MEMORIES 0%</div>
    `;
    
    let progress = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    const timer = setInterval(() => {
        progress += 2;
        if (progress >= 100) {
            clearInterval(timer);
            progressBar.style.width = '100%';
            progressText.textContent = 'LOADING MEMORIES 100%';
            
            setTimeout(() => {
                loadingScreenElement.style.opacity = '0';
                setTimeout(() => {
                    loadingScreenElement.style.display = 'none';
                    renderApp();
                }, 500);
            }, 500);

        } else {
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `LOADING MEMORIES ${progress}%`;
        }
    }, 30);
}

window.onload = () => {
     // Initialize EmailJS
     if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
         emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
     }

     // Offline Detection
     const offlineBanner = document.getElementById('offline-banner');
     const successModal = document.getElementById('success-modal');

     function updateOfflineStatus() {
         if (!navigator.onLine) {
             // Show offline banner
             offlineBanner.classList.remove('hidden');
             // Hide success modal if it's showing
             successModal.classList.add('hidden');
             successModal.classList.remove('flex');
         } else {
             // Hide offline banner
             offlineBanner.classList.add('hidden');
         }
     }

     // Check initial status
     updateOfflineStatus();

     // Listen for online/offline events
     window.addEventListener('online', updateOfflineStatus);
     window.addEventListener('offline', updateOfflineStatus);

     initLoadingScreen();
     // Optimized Scroll Handler
     window.onscroll = () => {
        const newScrolled = window.scrollY > 50;
        if (newScrolled !== state.isScrolled) {
            state.isScrolled = newScrolled;
            updateHeaderState(); // Only updates navbar class, no re-render
        }
    };
};
