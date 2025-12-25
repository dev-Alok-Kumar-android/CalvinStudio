function getThemeStyle() {
  return THEMES[state.theme];
}

function renderHeader() {
    const t = getThemeStyle();
    
    const headerClasses = state.isScrolled 
        ? `${t.secondaryBg.substring(3)}/90 backdrop-blur-md py-4 shadow-lg` 
        : 'bg-transparent py-6';

    return `
        <nav id="navbar" class="fixed top-0 w-full z-40 transition-all duration-300 ${headerClasses}">
            <div class="container mx-auto px-6 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <img src="${getLogoSvg()}" alt="Calvin Studio Logo" class="h-12 scale-[1.6] translate-x-[20px] object-cover">
                </div>
                <div class="flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
                    <div class="flex gap-8 max-md:hidden">
                        ${NAVBAR_ITEMS.map(link => `
                            <a 
                                href="${link.href}" 
                                onclick="window.scrollToSection(event, ${JSON.stringify(link).replace(/"/g, '&quot;')})"
                                class="font-semibold tracking-wider uppercase hover:text-${t.accentColor}-${t.accentShade} transition-colors ${t.text} drop-shadow-[0_8px_10px_rgba(0,0,0,0.6)]"
                            >
                                ${link.name}
                            </a>
                        `).join('')}
                    </div>

                    <button 
                        id="theme-toggle"
                        class="p-2 rounded-full ${t.secondaryBg} border ${t.border} ${t.accent} transition-all duration-300 hover:scale-105"
                        onclick="window.toggleTheme()"
                    >
                        ${state.theme === 'dark' ? Icons.Moon('w-5 h-5') : Icons.Sun('w-5 h-5')}
                    </button>

                    <button
                        id="mobile-menu-button"
                        class="md:hidden p-2 rounded-full ${t.secondaryBg} border ${t.border} ${t.accent} transition-all duration-300 hover:scale-105"
                        onclick="window.toggleMobileMenu()"
                    >
                        ${Icons.Menu('w-6 h-6')}
                    </button>
                </div>
            </div>
        </nav>

        <div
            id="mobile-menu"
            class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm hidden md:hidden transition-all duration-300"
            onclick="if(event.target === this) toggleMobileMenu()"
        >
            <div class="absolute top-24 left-0 right-0 mx-6 rounded-2xl p-8 ${t.secondaryBg}/95 backdrop-blur-xl border ${t.border} shadow-2xl text-center space-y-8 transform transition-transform duration-300">
                ${NAVBAR_ITEMS.map(link => `
                    <a
                        href="${link.href}"
                        onclick="window.scrollToSection(event, ${JSON.stringify(link).replace(/"/g, '&quot;')})"
                        class="block text-xl font-bold uppercase tracking-[0.2em] ${t.text} hover:text-${t.accentColor}-${t.accentShade} transition-all active:scale-95"
                    >
                        ${link.name}
                    </a>
                `).join('')}
                
                <div class="pt-4 border-t ${t.border} opacity-50">
                    <p class="text-[10px] uppercase tracking-widest ${t.text}">Calvin Studio • 2025</p>
                </div>
            </div>
        </div>
    `;
}
        
function renderHero() {
    const t = getThemeStyle();
    const accentClasses = `text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-${t.accentColor}-${t.accentShade}`;

    return `
        <section id="home" class="relative h-screen flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 z-0">
                <!-- Hero Image -->
                <img 
                    src="${getHeroImage()}" 
                    alt="Calvin Studio Interior" 
                    class="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow" 
                    style="animation-duration: 20s;"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-${t.bg.substring(3)} via-${t.bg.substring(3)}/50 to-transparent"></div>
            </div>

            <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 text-center px-4 max-w-4xl w-full">
                <h2 class="text-5xl md:text-7xl lg:text-8xl font-serif font-bold ${accentClasses} mb-6 leading-tight animate-fade-in-up delay-100">
                    Calvin <span class="${accentClasses}">Studio</span>
                </h2>
                <p class="text-${t.accent} text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light animate-fade-in-up delay-200">
                    We Capture <span class="font-semibold">Memories</span>...
                </p>
                <p class="text-${t.accent}-400 uppercase tracking-[0.4em] text-sm mb-4 animate-fade-in-up">Est. 2018 • Patna, Bihar</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
                    <a href="#gallery" class="px-8 py-3 bg-${t.accentColor}-${t.accentShade} text-white rounded-full font-medium tracking-wide transition-all transform hover:scale-105 shadow-lg shadow-${t.accentColor}-900/20">
                        View Gallery
                    </a>
                    <a href="#contact" class="px-8 py-3 border border-current bg-transparent ${t.text} rounded-full font-medium tracking-wide hover:bg-white/10 transition-all">
                        Book Now
                    </a>
                </div>
            </div>
        </section>
    `;
}

function renderStats() {
    const t = getThemeStyle();
    return `
        <section class="py-12 border-y ${t.border} ${t.secondaryBg} relative overflow-hidden">
            <div class="container mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-24 text-center">
                ${
                    [
                        { num: "200+", label: "Weddings" },
                        { num: "50+", label: "Cities" },
                        { num: "1M+", label: "Emotions" },
                        { num: "4.9", label: "Rating" }
                    ].map(stat => `
                        <div>
                            <h4 class="text-4xl font-serif font-bold ${t.heading} mb-1">${stat.num}</h4>
                            <p class="text-xs uppercase tracking-widest ${t.text}">${stat.label}</p>
                        </div>
                    `).join('')
                }
            </div>
        </section>
    `;
}

function renderAbout() {
    const t = getThemeStyle();
    // Updated About Image
    const aboutImgUrl = "https://res.cloudinary.com/dpwwoxoia/image/upload/v1765953605/AF1QipPTDwPgrKUWZWBkTlYjUhWCBTiOvZsEGayK7U66_s1360-w1360-h1020-rw_k18w07.webp";
    
    return `
        <section id="about" class="py-24 ${t.bg} overflow-hidden">
            <div class="container mx-auto px-6">
                <div class="flex flex-col lg:flex-row items-center gap-16">
                    <div class="lg:w-1/2 relative">
                        <div class="absolute top-4 -left-4 w-full h-full border-2 border-${t.accentColor}-500/30 rounded-lg"></div>
                        <img src="${aboutImgUrl}" 
                             alt="Photographer" class="relative rounded-lg shadow-2xl w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700">
                        <div class="absolute -bottom-6 -right-6 ${t.secondaryBg} p-6 shadow-xl border ${t.border} max-w-xs hidden md:block">
                            <p class="font-serif italic text-lg ${t.heading}">"Photography is the only language that can be understood anywhere in the world."</p>
                        </div>
                    </div>
                    <div class="lg:w-1/2 space-y-8">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-px bg-${t.accentColor}-500"></div>
                            <span class="text-${t.accentColor}-500 uppercase tracking-widest text-sm font-semibold">The Artist</span>
                        </div>
                        <h3 class="text-4xl md:text-5xl font-serif font-bold ${t.heading} leading-tight">Hi, I'm Aman Kumar.<br>I Tell Stories.</h3>
                        <p class="${t.text} leading-relaxed text-lg">
                            Based in the historic city of Patna, I started Calvin Studio with a simple mission: to strip away the artificiality of traditional wedding photography and reveal the raw, honest human connection underneath.
                        </p>
                        <div class="pt-4">
                            <img src="${getLogoSvg()}" alt="Signature" class="h-12 scale-[2] opacity-60 invert-[.1] origin-left">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderGallery() {
    const themeStyle = getThemeStyle();
    const filteredImages = getFilteredImages();
    const imagesToShow = filteredImages.slice(0, state.visibleImageCount);
    const hasMoreImages = state.visibleImageCount < filteredImages.length;
    const categories = getCategories();

    const filterButtons = categories.map(cat => `
        <button
            onclick="setActiveCategory('${cat}')"
            class="px-6 py-2 rounded-full text-sm font-medium transition-all ${
                state.activeCategory === cat 
                ? `bg-${themeStyle.accentColor}-500 text-white shadow-lg shadow-${themeStyle.accentColor}-500/25` 
                : `${themeStyle.secondaryBg} ${themeStyle.text} hover:opacity-80`
            }"
        >
            ${cat}
        </button>
    `).join('');

    const imageGrid = imagesToShow.map((img, index) => `
        <div 
            onclick="openLightbox(${img.id})"
            class="group relative overflow-hidden rounded-lg cursor-pointer transition-all hover:z-10 ${
                index % 3 === 0 ? 'sm:col-span-2' : ''
            } shadow-md aspect-[4/3] sm:aspect-auto"
        >
            <img 
                src="${img.thumbnailUrl}"
                alt="${img.title}"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onerror="this.src='https://placehold.co/400x400/27272a/ffffff?text=Image+Load+Failed'"
            />
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                <h4 class="text-white text-xl font-serif font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${img.title}</h4>
                <p class="text-${themeStyle.accentColor}-500 text-sm mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${img.category}</p>
            </div>
        </div>
    `).join('');

    const loadMoreButton = hasMoreImages ? `
        <div class="text-center mt-12">
            <button
                onclick="handleLoadMore()"
                class="px-10 py-3 border border-current rounded-full font-medium tracking-wide transition-all ${themeStyle.text} ${themeStyle.buttonHover}"
            >
                Load More Memories (${filteredImages.length - state.visibleImageCount} left)
            </button>
        </div>
    ` : '';

    return `
        <section id="gallery" class="py-24 px-4 ${themeStyle.secondaryBg}">
            <div class="container mx-auto">
                <div class="flex flex-col items-center mb-16">
                    <h3 class="text-3xl md:text-5xl font-serif font-bold mb-6 ${themeStyle.heading}">Our Masterpieces</h3>
                    <div class="w-20 h-1 bg-${themeStyle.accentColor}-500 mb-8"></div>
                    <div class="flex flex-wrap justify-center gap-4" id="gallery-filters">
                        ${filterButtons}
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]" id="image-grid">
                    ${imageGrid}
                </div>

                ${loadMoreButton}
            </div>
        </section>
    `;
}

function renderServices() {
    const t = getThemeStyle();
    return `
        <section id="services" class="py-24 ${t.bg} relative">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <span class="text-${t.accentColor}-500 uppercase tracking-widest text-xs font-bold">What We Do</span>
                    <h3 class="text-4xl md:text-5xl font-serif font-bold ${t.heading} mt-2">Our Expertise</h3>
                </div>
                <div class="grid md:grid-cols-3 gap-12">
                    ${
                        [
                            { title: "Wedding Photography", icon: Icons.Camera, description: "Cinematic coverage of your special day. From Haldi to Bidaai, we capture every emotion." },
                            { title: "Events & Functions", icon: Icons.Calendar, description: "Corporate events, birthdays, or cultural gatherings. Professional coverage for every occasion." },
                            { title: "Pre-Wedding Shoots", icon: Icons.Heart, description: "Tell your love story through artistic outdoor locations and creative concepts." }
                        ].map(service => `
                            <div class="text-center p-8 ${t.secondaryBg} rounded-2xl border ${t.border} hover:border-${t.accentColor}-500/50 transition-colors shadow-xl group">
                                <div class="w-16 h-16 bg-${t.accentColor}-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ${t.accent} group-hover:scale-110 transition-transform">
                                    ${service.icon('w-8 h-8')}
                                </div>
                                <h3 class="text-xl font-bold mb-4 font-serif ${t.heading}">${service.title}</h3>
                                <p class="${t.text} leading-relaxed">${service.description}</p>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        </section>
    `;
}

function renderPricing() {
    const t = getThemeStyle();
    return `
        <section id="pricing" class="py-24 ${t.secondaryBg} relative">
             <div class="container mx-auto px-4 relative z-10">
                <div class="text-center mb-16 space-y-4">
                    <span class="text-${t.accentColor}-500 uppercase tracking-widest text-xs font-bold">Investment</span>
                    <h3 class="text-4xl md:text-5xl font-serif font-bold ${t.heading}">Wedding Collections</h3>
                </div>
                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    ${PACKAGES.map((pkg, idx) => {
                        // Updated Logic: Highlight based on state.selectedPlan
                        const isSelected = state.selectedPlan === pkg.name;
                        return `
                            <div class="relative p-8 rounded-2xl ${isSelected ? `${t.bg} border-${t.accentColor}-500 shadow-2xl scale-105 z-10` : `${t.bg} border ${t.border} ${t.text} opacity-90 hover:opacity-100`} transition-all duration-300 border">
                                ${pkg.popular ? `<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-${t.accentColor}-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">Most Popular</div>` : ''}
                                <h4 class="text-2xl font-serif font-bold ${t.heading} mb-2">${pkg.name}</h4>
                                <div class="text-3xl font-bold ${pkg.popular ? `text-${t.accentColor}-500` : t.heading} mb-6">${pkg.price}</div>
                                <ul class="space-y-4 mb-8 text-sm ${t.text}">
                                    ${pkg.features.map(f => `
                                        <li class="flex items-start gap-3">
                                            ${Icons.Check(`w-5 h-5 text-${t.accentColor}-500 flex-shrink-0`)}
                                            <span>${f}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                                <button 
                                    onclick="window.selectPlan('${pkg.name}')"
                                    class="w-full py-3 rounded-lg font-medium text-sm uppercase tracking-wider transition-all ${isSelected ? t.buttonPrimary : `border ${t.border} hover:bg-${t.accentColor}-600 hover:text-white hover:border-transparent`}">
                                    ${isSelected ? 'Selected' : `Choose ${pkg.name}`}
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderFAQ() {
    const t = getThemeStyle();
    return `
        <section id="faq" class="py-24 ${t.bg}">
            <div class="container mx-auto px-4 max-w-3xl">
                <div class="text-center mb-12">
                    <h3 class="text-3xl font-serif font-bold ${t.heading}">Common Questions</h3>
                </div>
                <div class="space-y-4">
                    ${FAQS.map((faq, idx) => {
                        const isOpen = state.expandedFaq === idx;
                        return `
                            <div class="border ${t.border} rounded-lg overflow-hidden transition-all ${isOpen ? `${t.secondaryBg}` : ''}">
                                <button onclick="toggleFaq(${idx})" class="w-full flex justify-between items-center p-6 text-left focus:outline-none">
                                    <span class="font-medium ${isOpen ? t.accent : t.heading}">${faq.q}</span>
                                    ${isOpen ? Icons.Minus(`w-5 h-5 ${t.accent}`) : Icons.Plus(`w-5 h-5 ${t.text}`)}
                                </button>
                                <div class="overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}">
                                    <p class="px-6 pb-6 ${t.text} text-sm leading-relaxed">${faq.a}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </section>
    `;
}
        
function renderTestimonials() {
    const t = getThemeStyle();
    return `
        <section class="py-24 ${t.secondaryBg} relative overflow-hidden">
            <div class="container mx-auto px-6">
                <div class="flex flex-col md:flex-row gap-12 items-center">
                    <div class="md:w-1/3">
                        <span class="text-${t.accentColor}-500 uppercase tracking-widest text-xs font-bold mb-2 block">Kind Words</span>
                        <h3 class="text-4xl md:text-5xl font-serif font-bold ${t.heading} mb-6">Love Letters</h3>
                        <p class="${t.text} mb-8">Nothing makes us happier than reading the heartfelt notes from our couples. Here is what they have to say.</p>
                    </div>
                    <div class="md:w-2/3 grid gap-6 sm:grid-cols-2">
                        ${TESTIMONIALS.slice(0, 2).map(review => `
                            <div class="${t.bg} p-8 rounded-xl border ${t.border} relative group hover:-translate-y-2 transition-transform duration-300">
                                ${Icons.Quote(`w-10 h-10 text-${t.accentColor}-500/20 absolute top-6 right-6`)}
                                <p class="${t.text} italic mb-6 leading-relaxed">"${review.text}"</p>
                                <div>
                                    <h5 class="font-serif font-bold ${t.heading} text-lg">${review.name}</h5>
                                    <p class="text-xs uppercase tracking-wider text-${t.accentColor}-500">${review.role}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderContact() {
    const t = getThemeStyle();
    return `
        <section id="contact" class="py-24 ${t.bg}">
            <div class="container mx-auto px-6">
                <div class="grid lg:grid-cols-2 gap-16">
                    <div class="space-y-8">
                        <span class="text-${t.accentColor}-500 uppercase tracking-widest text-xs font-bold">Get in Touch</span>
                        <h3 class="text-4xl md:text-5xl font-serif font-bold ${t.heading}">Let's Create Magic</h3>
                        <div class="space-y-6 pt-4">
                            <div class="flex items-center cursor-pointer gap-4" onclick="window.open('tel:${phoneNumber}', '_self')">
                                <div class="w-12 h-12 rounded-full bg-${t.accentColor}-500/10 flex items-center justify-center text-${t.accentColor}-500">${Icons.Phone('w-5 h-5')}</div>
                                <div>
                                    <p class="${t.heading} font-medium">Call Us</p>
                                    <p class="${t.text} text-sm">${phoneNumber}</p>
                                </div>
                            </div>
                            <div class="flex items-center cursor-pointer gap-4" onclick="window.open('mailto:${FOOTER_LINKS[2].url}', '_self')">
                                <div class="w-12 h-12 rounded-full bg-${t.accentColor}-500/10 flex items-center justify-center text-${t.accentColor}-500">${Icons.Mail('w-5 h-5')}</div>
                                <div>
                                    <p class="${t.heading} font-medium">Email Us</p>
                                    <p class="${t.text} text-sm">${FOOTER_LINKS[2].url}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4" onclick="window.open('https://maps.app.goo.gl/xQqv9iN1ug5pb23K9', '_blank')">
                                <div class="w-12 h-12 rounded-full bg-${t.accentColor}-500/10 flex items-center justify-center text-${t.accentColor}-500">${Icons.MapPin('w-5 h-5')}</div>
                                <div>
                                    <p class="${t.heading} font-medium">Visit Studio</p>
                                    <p class="${t.text} text-sm">Noon ka Chauraha, Hazari Muhalla, Patna</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form id="contact-form" onsubmit="handleContactSubmit(event)" class="${t.secondaryBg} p-8 md:p-10 rounded-2xl border ${t.border} shadow-2xl">
                        <div class="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-xs uppercase tracking-wider ${t.text} mb-2">Name</label>
                                <input type="text" name="user_name" value="${state.formData.user_name}" autocomplete="name" oninput="window.updateFormData('user_name', this.value)" required class="w-full bg-transparent border-b ${t.border} py-2 text-sm ${t.heading} focus:border-${t.accentColor}-500 focus:outline-none transition-colors" placeholder="Your name">
                            </div>
                            <div>
                                <label class="block text-xs uppercase tracking-wider ${t.text} mb-2">Event Date</label>
                                <input type="date" name="event_date" value="${state.formData.event_date}" oninput="window.updateFormData('event_date', this.value)" class="w-full bg-transparent border-b ${t.border} py-2 text-sm ${t.heading} focus:border-${t.accentColor}-500 focus:outline-none transition-colors">
                            </div>
                        </div>

                        <div class="mb-6">
                            <label class="block text-xs uppercase tracking-wider ${t.text} mb-2">Interested Package</label>
                            <select name="plan" onchange="
                            window.updateSelectedPlan(this.value);
                            window.updateFormData('plan', this.value);
                            " class="w-full bg-transparent border-b ${t.border} py-2 text-sm ${t.heading} focus:border-${t.accentColor}-500 focus:outline-none transition-colors">
                                ${PACKAGES.map(p => `<option value="${p.name}" ${state.selectedPlan === p.name ? 'selected' : ''} class="bg-neutral-900">${p.name} Collection (${p.price})</option>`).join('')}
                                <option value="Custom" ${state.selectedPlan === 'Custom' ? 'selected' : ''} class="bg-neutral-900">Custom / Other</option>
                            </select>
                        </div>

                        <div class="mb-6">
                            <label class="block text-xs uppercase tracking-wider ${t.text} mb-2">Email Address</label>
                            <input 
                                type="email" 
                                name="user_email" 
                                value="${state.formData.user_email}" 
                                autocomplete="email"
                                oninput="window.updateFormData('user_email', this.value)" 
                                required 
                                class="w-full bg-transparent border-b py-2 text-sm ${t.heading} ${t.border} focus:outline-none invalid:focus:border-red-500" 
                                placeholder="john@example.com"
                            >
                        </div>
                        <div class="mb-6">
                            <label class="block text-xs uppercase tracking-wider ${t.text} mb-2">Phone</label>
                            <input 
                                type="tel" 
                                name="user_phone" 
                                pattern="[6-9][0-9]{9}"
                                value="${state.formData.user_phone}" 
                                autocomplete="tel"
                                oninput="window.updateFormData('user_phone', this.value)" 
                                required 
                                class="w-full bg-transparent border-b py-2 text-sm ${t.heading} ${t.border} focus:outline-none invalid:focus:border-red-500" 
                                placeholder="+91 .........."
                            >
                        </div>
                        <div class="mb-8">
                            <label class="block text-xs uppercase tracking-wider ${t.text} mb-2">Tell us your story</label>
                            <textarea name="message" rows="4" oninput="window.updateFormData('message', this.value)" required class="w-full bg-transparent border-b ${t.border} py-2 text-sm ${t.heading} focus:border-${t.accentColor}-500 focus:outline-none transition-colors" placeholder="We are planning a sunset wedding...">${state.formData.message}</textarea>
                        </div>
                        <button type="submit" class="w-full py-4 ${t.buttonPrimary} rounded-lg font-medium tracking-widest uppercase text-sm transition-all hover:shadow-lg hover:-translate-y-1">
                            Send Message
                        </button>
                    </form>
                </div>
                <div class="mt-20">
                  <h4 class="text-center text-xs uppercase tracking-widest ${t.text} opacity-60 mb-6">
                    📍 Visit Our Studio
                  </h4>

                  <div class="relative w-full h-[320px] md:h-[400px]
                              rounded-2xl overflow-hidden
                              border ${t.border}
                              shadow-2xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.3687233315322!2d85.21572877524846!3d25.592661077458597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5fc7e19d6a6b%3A0xa689f4304439cd07!2sCalvin%20Studio%20-%20Best%20Photography%20Service%20in%20Patna!5e0!3m2!1sen!2sus!4v1766650883953!5m2!1sen!2sus"
                      class="absolute inset-0 w-full h-full"
                      style="border:0;"
                      allowfullscreen
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                </div>

            </div>
        </section>
    `;
}

function renderFooter() {
    const themeStyle = getThemeStyle();
    return `
        <footer id="footer" class="pt-20 pb-10 border-t ${themeStyle.border} ${themeStyle.bg}">
            <div class="container mx-auto px-6">
                <div class="flex flex-col items-center">
                     <h2 class="text-3xl font-bold tracking-widest ${themeStyle.text} mb-4">CALVIN STUDIO<span class="${themeStyle.accent}">.</span></h2>
                    <p class="${themeStyle.text} text-center mb-8">Crafting visual legacies in Patna.<br/>  Noon ka Chauraha, Hazari Muhalla, Patna, Bihar 800001</p>
                    <p class="${themeStyle.text} mb-8"> You can contact us at :</p>
                    <div class="flex gap-4 mb-8">
                        ${FOOTER_LINKS.map(link => `
                            <a href="${link.url}" class="w-10 h-10 rounded-full ${themeStyle.secondaryBg} flex items-center justify-center ${themeStyle.text} hover:bg-${themeStyle.accentColor}-${themeStyle.accentShade} transition-colors hover:text-white">${link.icon}</a>
                        `).join('')}
                    </div>
                </div>
                <div class="pt-8 border-t ${themeStyle.border} text-center text-gray-500 text-sm">
                    <p>&copy; ${new Date().getFullYear()} Calvin Studio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

function renderApp() {
    const t = getThemeStyle();
    appElement.className = `min-h-screen font-sans transition-colors duration-500 ${t.bg} ${t.text}`;
    appElement.innerHTML = `
        ${renderHeader()}
        ${renderHero()}
        ${renderStats()}
        ${renderAbout()}
        ${renderGallery()}
        ${renderServices()}
        ${renderPricing()}
        ${renderTestimonials()}
        ${renderFAQ()}
        ${renderContact()}
        ${renderFooter()}
    `;
    if (state.lightboxImageId !== null) {
        renderLightboxOverlay();
    }
}
