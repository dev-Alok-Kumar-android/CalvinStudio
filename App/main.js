function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function openWhatsAppFromState() {
  const phone = phoneNumber;

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
    const headerClasses = state.isScrolled 
        ? `${t.secondaryBg.substring(3)}/90 backdrop-blur-md py-4 shadow-lg` 
        : 'bg-transparent py-6';
    
    navbar.className = `fixed top-0 w-full z-40 transition-all duration-300 ${headerClasses}`;
}

window.scrollToSection = function(e, link) {
    if (link.isExternal || link.isAction || !link.href.startsWith('#')) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) window.toggleMobileMenu();
        return; 
    }

    e.preventDefault();
    const targetId = link.href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            window.toggleMobileMenu();
        }

        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

function scrollToHashIfPresent() {
  if (!location.hash) return;

  const target = document.querySelector(location.hash);
  if (!target) return;

  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "instant" });
  });
}

window.handleContactSubmit = function(event) {
    event.preventDefault();

    // Check if offline
    if (!navigator.onLine) {
        
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

window.openSuccessModal = function () {
  const modal = document.getElementById("success-modal");

  if (!navigator.onLine) return;

  modal.style.display = "flex";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

window.closeSuccessModal = function () {
  const modal = document.getElementById("success-modal");

  modal.style.display = "none";
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

window.toggleTheme = function() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    renderApp();
};

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;

  menu.classList.toggle('hidden');

  document.body.style.overflow =
    menu.classList.contains('hidden') ? '' : 'hidden';
}


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
    const t = getThemeStyle();
    const logo = getLogoSvg();

      loadingScreenElement.className = `
        fixed inset-0 z-50 flex flex-col items-center justify-center
        transition-opacity duration-500 ${t.bg} ${t.text} `;

    loadingScreenElement.innerHTML = `
        <div class="w-24 h-24 mb-8
            bg-${t.accentColor}-500
            [mask-image:url('${logo}')]
            [mask-repeat:no-repeat]
            [mask-position:center]
            [mask-size:contain]
            [-webkit-mask-image:url('${logo}')]
            [-webkit-mask-repeat:no-repeat]
            [-webkit-mask-position:center]
            [-webkit-mask-size:contain]

            [transform-style:preserve-3d]
            [animation:coin_2.2s_ease-in-out_forwards]
        "></div>

        <div class="text-2xl font-light tracking-[0.3em] mb-4 ${t.heading}">CALVIN STUDIO</div>

        <div class="w-64 h-1 ${t.secondaryBg} rounded-full overflow-hidden">
            <div id="progress-bar" class="h-full bg-${t.accentColor}-500 transition-all duration-100 ease-out" style="width: 0%;"></div>
        </div>

        <div id="progress-text" class="mt-2 text-xs ${t.text}/60 font-mono">LOADING MEMORIES 0%</div>
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
                    scrollToHashIfPresent();
                }, 500);
            }, 500);

        } else {
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `LOADING MEMORIES ${progress}%`;
        }
    }, 30);
}

window.handleBannerAction = () => {
    switch (state.banner.action) {
        case "reload":
            window.location.reload();
            break;

        case "update":
            if (window.applyAppUpdate) window.applyAppUpdate();
            else window.location.reload();
            break;

        default:
            console.log("No action defined");
            closeBanner();
            break;
    }
};

function showOfflineBanner() {
    if (state.banner.isVisible && state.banner.action === "reload") return;

    state.banner = {
        isVisible: true,
        text: "⚠️ You are offline. Some features may be unavailable.",
        bgClass: "bg-rose-600",
        textClass: "text-white",
        buttonText: "Retry",
        action: "reload"
    };
    renderBannerOnly();
}

function showOnlineBanner() {
    if (state.banner.action === "update") return;

    state.banner = {
        isVisible: true,
        text: "✅ You are back online.",
        bgClass: "bg-green-600",
        textClass: "text-white",
        buttonText: "",
        action: ""
    };
    renderBannerOnly();
    setTimeout(closeBanner, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!navigator.onLine) {
    showOfflineBanner();
  }

  window.addEventListener("offline", showOfflineBanner);
  window.addEventListener("online", showOnlineBanner);
});

function isSystemDarkTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getLogoSvg() {
  return state.theme === 'dark'
    ? 'raw/logo-dark.svg'
    : 'raw/logo-light.svg';
}



window.onload = () => {
    state.theme = isSystemDarkTheme() ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
     if (navigator.onLine && EMAILJS_CONFIG.PUBLIC_KEY) {
         emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
     }

     initLoadingScreen();
     window.onscroll = () => {
        const newScrolled = window.scrollY > 50;
        if (newScrolled !== state.isScrolled) {
            state.isScrolled = newScrolled;
            updateHeaderState();
        }
    };
};
