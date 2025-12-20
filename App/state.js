// --- Configuration & Data ---

const EMAILJS_CONFIG = {
    SERVICE_ID: "service_u6g1sr8",
    TEMPLATE_ID: "template_yuih0ef",
    PUBLIC_KEY: "PNEA1jJ1kp4uvdrHS"
};

// --- Icons ---
const Icons = {
    Camera: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3L14.5 4z"/><circle cx="12" cy="13" r="3"/></svg>`,
    MapPin: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="M12 21.7c4.4-4.2 8-8.5 8-12.7A8 8 0 0 0 12 2a8 8 0 0 0-8 8c0 4.2 3.6 8.5 8 12.7z"/><circle cx="12" cy="10" r="3"/></svg>`,
    Phone: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-7.3-7.3 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.1 2h3.08a2 2 0 0 1 2 1.72 17.5 17.5 0 0 0 .8 4.31 2 2 0 0 1-.41 2.44l-1.2 1.2a13.3 13.3 0 0 0 6.7 6.7l1.2-1.2a2 2 0 0 1 2.44-.41 17.5 17.5 0 0 0 4.31.8A2 2 0 0 1 22 16.9z"/></svg>`,
    Mail: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.9 1.9 0 0 1-2.06 0L2 7"/></svg>`,
    Instagram: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
    Facebook: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    X: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    ChevronLeft: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="m15 18-6-6 6-6"/></svg>`,
    ChevronRight: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="m9 18 6-6-6-6"/></svg>`,
    Menu: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    Heart: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    Calendar: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    Aperture: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><circle cx="12" cy="12" r="10"/><path d="m14.31 8 5.74 9.94"/><path d="M9.69 8-5.74 9.94"/><path d="M16 12a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4 4z"/></svg>`,
    Sun: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    Moon: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    Download: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    Share2: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`,
    XCircle: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`,
    Quote: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="${c}"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"/></svg>`,
    Check: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><polyline points="20 6 9 17 4 12"/></svg>`,
    Plus: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
    Minus: (c) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${c}"><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
};

// --- REAL DATA ---
const MY_IMAGES = [
    "https://res.cloudinary.com/dpwwoxoia/image/upload/v1765955663/AF1QipO3AUrf-ggq6cdsopp4hLAH8XfXKXdfIrbeD_mh_s1360-w1360-h1020-rw_t9jqrl.webp", // Haldi/Rituals 0

    "https://res.cloudinary.com/dpwwoxoia/image/upload/v1765955638/AF1QipNysghjtSJx8LoSc6WRCSpvrsMVUgizcvi7R4Ll_s1360-w1360-h1020-rw_si7pex.webp", // Haldi/Rituals 1

    "https://res.cloudinary.com/dpwwoxoia/image/upload/v1765955382/calvin-studio-hazari-mohalla-patna-photo-studios-ys20dac0ws_wuzsbx.jpg", // Hero/Couple 2

    "https://res.cloudinary.com/dpwwoxoia/image/upload/v1765982972/AF1QipMGf3IlYQp3P6IuI_2v8MQyHxR6zfo42XG1xPtE_s1360-w1360-h1020-rw_rgzx9e.webp", // Bride Portrait 3

    "https://lh3.googleusercontent.com/p/AF1QipNNa2DIsICEIv0-zx_pL_BbdEp7AaVLZzRKFiyO=s1360-w1360-h1020-rw", // Mehndi/Rituals 4

    "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwp2IOZhPMOgD2gMZzoXAP8CJu0eG_3zy2XXvWIeiSeHf5IabMZIgcRAHI_jqGZ0Rm8U4JQLdvp1XtVoqSg7RXAfAB2c5aKlL3obss2AMIvK3ejhguNAWpPg6AF45tNBKi_k9WLPg=s1360-w1360-h1020-rw", // Setup/Details 5

    "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz5qbkAENbGx_iQ0EOuv-7yW4jBDYJGXQ9REPUyJtKuibrwvpf7RjAqJq9wu8OfamXf0bWE1pbPP7IRL-tLBCUU8QBursofMEwB4NTVGHTFqC1CYqjify3ygXbgEj4h-m0pfRIneA=s1360-w1360-h1020-rw", // Board/Details 6

    "https://lh3.googleusercontent.com/p/AF1QipN7DJvaPPJg8mPH9t4qgUrZ5NS_8QutzP2SkBW-=s1360-w1360-h1020-rw", // Details 7

    "https://lh3.googleusercontent.com/p/AF1QipPxjy5sQAsXIQNxZnJ9Js3gJAyGts3d5yzMX0zD=s1360-w1360-h1020-rw", // Details 8

];

const RAW_PORTFOLIO_IMAGES = [
  { id: 1, category: "Rituals", title: "Haldi Ceremony", url: MY_IMAGES[0] },
  { id: 2, category: "Rituals", title: "Traditional Moments", url: MY_IMAGES[1] },
  { id: 3, category: "Couple", title: "Together Forever", url: MY_IMAGES[2] },
  { id: 4, category: "Portrait", title: "Bridal Glow", url: MY_IMAGES[3] },
  { id: 5, category: "Rituals", title: "Mehndi Ceremony", url: MY_IMAGES[4] },

  { id: 6, category: "Details", title: "Wedding Setup", url: MY_IMAGES[5] },
  { id: 7, category: "Details", title: "Studio Board", url: MY_IMAGES[6] },
  { id: 8, category: "Details", title: "Decor Close-up", url: MY_IMAGES[7] },
  { id: 9, category: "Details", title: "Artistic Details", url: MY_IMAGES[8] },

  { id: 10, category: "Couple", title: "Candid Love", url: MY_IMAGES[2] },
  { id: 11, category: "Portrait", title: "Bride Portrait", url: MY_IMAGES[3] },
  { id: 12, category: "Events", title: "Wedding Celebration", url: MY_IMAGES[0] },
  { id: 13, category: "Events", title: "Family Moments", url: MY_IMAGES[1] },
  { id: 14, category: "Wedding", title: "Sacred Vows", url: MY_IMAGES[2] },
  { id: 15, category: "Wedding", title: "Mandap Moments", url: MY_IMAGES[0] },
  { id: 16, category: "Portrait", title: "Elegant Bride", url: MY_IMAGES[3] },
  { id: 17, category: "Rituals", title: "Wedding Traditions", url: MY_IMAGES[4] },
  { id: 18, category: "Couple", title: "Joyful Together", url: MY_IMAGES[2] },
];

// Logo paths
const logoSvg = "./raw/logo-light.svg";

const PORTFOLIO_IMAGES = RAW_PORTFOLIO_IMAGES;

const PACKAGES = [
    { name: "Silver", price: "₹45,000", features: ["1 Day Coverage", "Traditional Photo & Video", "200 Edited Photos", "Web Gallery", "1 Cinematic Teaser"] },
    { name: "Gold", price: "₹85,000", features: ["2 Days Coverage", "Candid & Traditional", "500 Edited Photos", "Drone Coverage", "Highlight Film (5-7 min)", "Premium Photobook"], popular: true },
    { name: "Platinum", price: "₹1,50,000", features: ["3+ Days Coverage", "Complete Cinematic Team", "Unlimited Photos", "Pre-Wedding Shoot", "Same Day Edit Reel", "2 Premium Photobooks", "Raw Footage"] }
];

const FAQS = [
    { q: "How far in advance should we book?", a: "We typically book 6-12 months in advance, especially for peak wedding dates in November and February." },
    { q: "Do you travel outside Patna?", a: "Absolutely! We love destination weddings. Travel and accommodation charges apply for out-of-station events." },
    { q: "When will we get our photos?", a: "We provide a sneak peek within 3 days. The full gallery is usually ready within 4-6 weeks after the final selection." },
    { q: "Can we customize the packages?", a: "Yes, every wedding is unique. We can create a custom package tailored to your specific events and requirements." }
];

const TESTIMONIALS = [
    { name: "Priya & Rahul", role: "Wedding in Patna", text: "Calvin's team was invisible yet everywhere! They captured moments we didn't even know happened. The cinematic film still makes us cry happy tears." },
    { name: "Amit Singh", role: "Corporate Event", text: "Professionalism at its peak. The lighting, the framing, everything was top notch. Highly recommended for any serious event coverage." },
    { name: "Sanya & Rohan", role: "Destination Wedding", text: "We flew them to Goa and it was the best decision. Their artistic vision is unlike any traditional photographer we've seen." }
];

const THEMES = {
    dark: {
        bg: 'bg-neutral-900',
        text: 'text-neutral-100',
        heading: 'text-neutral-50',
        accent: 'text-amber-500', 
        secondaryBg: 'bg-neutral-800',
        buttonHover: 'hover:bg-amber-600',
        border: 'border-white/10',
        accentColor: 'amber',
        accentShade: '600',
        buttonPrimary: 'bg-amber-600 hover:bg-amber-700 text-white', 
        buttonSecondary: 'border-neutral-700 hover:border-amber-500 text-white',
    },
    light: {
        bg: 'bg-neutral-50',
        text: 'text-neutral-900',
        heading: 'text-neutral-900',
        accent: 'text-rose-700', 
        secondaryBg: 'bg-white',
        buttonHover: 'hover:bg-rose-800 hover:text-white',
        border: 'border-neutral-200',
        accentColor: 'rose',
        accentShade: '700',
        buttonPrimary: 'bg-rose-700 hover:bg-rose-800 text-white',
        buttonSecondary: 'border-neutral-300 hover:border-rose-700 text-neutral-900',
    }
};

const state = {
    theme: 'dark',
    isScrolled: false,
    activeCategory: 'All',
    visibleImageCount: 4, 
    lightboxImageId: null,
    expandedFaq: null,
    selectedPlan: "Gold", // Default to Gold
    formData: {
        user_name: "",
        event_date: "",
        user_email: "",
        user_phone: "",
        plan: "Gold",
        message: ""
    }
};

let lightboxUIVisible = true;

let currentLightboxIndex = 0;

const appElement = document.getElementById('app');
const loadingScreenElement = document.getElementById('loading-screen');

// Touch event variables

let touchStartX = 0;
let touchStartY = 0;
