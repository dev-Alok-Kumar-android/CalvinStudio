let currentLightboxIndex = 0;
let touchStartX = 0;
let touchStartY = 0;
let showTipsState = true;


function toggleLightboxHint() {
  showTipsState = !showTipsState;
  const hintEl = document.getElementById('lightbox-hint');
  const tipButton = document.getElementById('tip-toggle-btn');
  
  if (hintEl) {
    hintEl.classList.toggle('hidden', !showTipsState);
  }
  
  if (tipButton) {
    tipButton.innerText = showTipsState ? 'Hide Tips' : 'Show Tips';
  }

  localStorage.setItem('lightboxTips', showTipsState ? 'true' : 'false');

  const menu = document.getElementById('more-menu');
  if (menu) menu.classList.add('hidden');
}

function navigateLightbox(direction) {
  const filteredImages = getFilteredImages();
  let newIndex = currentLightboxIndex + direction;

  if (newIndex >= filteredImages.length) newIndex = 0;
  else if (newIndex < 0) newIndex = filteredImages.length - 1;

  const newImageId = filteredImages[newIndex].id;
  
  const img = document.querySelector(`#lightbox-overlay img`);
  if (img) {
    img.style.opacity = '0';
    setTimeout(() => {
      state.lightboxImageId = newImageId;
      renderLightboxOverlay();
    }, 200);
  } else {
    state.lightboxImageId = newImageId;
    renderLightboxOverlay();
  }
}

function openLightbox(imageId) {
  showTipsState = localStorage.getItem('lightboxTips') === 'true';
  state.lightboxImageId = imageId;
  let root = document.getElementById('lightbox-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'lightbox-root';
    document.body.appendChild(root);
  }
  renderLightboxOverlay();
}

function closeLightbox() {
  state.lightboxImageId = null;
  showTipsState = false; 
  renderLightboxOverlay();
}

function handleLightboxKeydown(e) {
  if (state.lightboxImageId === null) return;

  const actions = {
    ArrowLeft: () => navigateLightbox(-1),
    ArrowRight: () => navigateLightbox(1),
    ArrowUp: () => toggleImageDetails(),
    ArrowDown: () => closeLightbox(),
    Escape: () => closeLightbox()
  };

  if (actions[e.key]) {
    e.preventDefault();
    actions[e.key]();
  }
}

function toggleMoreMenu(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById('more-menu');
  if (menu) {
    menu.classList.toggle('hidden');
    if (!menu.classList.contains('hidden')) {
      setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
          if (!menu.contains(e.target)) {
            menu.classList.add('hidden');
            document.removeEventListener('click', closeMenu);
          }
        }, { once: true });
      }, 10);
    }
  }
}

async function downloadImage(url, filename = 'image') {
  const menu = document.getElementById('more-menu');

  try {
    const res = await fetch(url, { mode: 'cors' });
    const blob = await res.blob();

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
    if (menu) menu.classList.add('hidden');
  } catch (err) {
    console.error('Download failed:', err);
    alert('Download failed. Please open image and save manually.');
  }
}


function toggleImageDetails() {
  const descriptionEl = document.querySelector('.image-description');
  const bottomBar = document.getElementById('lightbox-bottom-bar');
  const container = document.querySelector('.description-container');
  const t = getThemeStyle();
  
  if (!descriptionEl || !bottomBar) return;

  const isHidden = descriptionEl.classList.contains('opacity-0');
  
  if (isHidden) {
    bottomBar.classList.add(`${t.secondaryBg}`, 'backdrop-blur-md', 'mb-6', 'mx-4', 'rounded-2xl');
    if (container) container.style.maxHeight = '200px';
    descriptionEl.classList.replace('opacity-0', 'opacity-100');
  } else {
    descriptionEl.classList.replace('opacity-100', 'opacity-0');
    if (container) container.style.maxHeight = '0';
    bottomBar.classList.remove(`${t.secondaryBg}`, 'backdrop-blur-md', 'mb-6', 'mx-4', 'rounded-2xl');
  }
}

function renderLightbox(image) {
  const t = getThemeStyle();
  const images = getFilteredImages();
  const accentClasses = `text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-${t.accentColor}-${t.accentShade}`;
  
  return `
    <div id="lightbox-overlay" role="dialog" aria-modal="true" class="fixed inset-0 z-[100] bg-neutral-950/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div class="relative w-full h-full flex flex-col items-center justify-center"
           ontouchstart="handleTouchStart(event)" ontouchend="handleTouchEnd(event)">
        
        <img src="${image.fullUrl}" alt="${image.title}"
             class="max-h-full max-w-full object-contain transition-opacity duration-300 shadow-2xl" />


        <div class="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <div class="flex items-center space-x-4">
            <button onclick="closeLightbox()" aria-label="Close" class="text-white/80 hover:text-white transition-colors">
              ${Icons.XCircle ? Icons.XCircle('w-8 h-8') : '✕ Close'}
            </button>
            <div class="text-white/70 text-sm font-mono tracking-tighter">
              ${currentLightboxIndex + 1} / ${images.length}
            </div>
          </div>


          <div class="relative">
            <button onclick="toggleMoreMenu(event)" class="text-white/80 hover:text-white p-2 bg-white/10 rounded-full transition-all">
               ${Icons.MoreVertical ? Icons.MoreVertical('w-6 h-6') : '⋮'}
            </button>
            <div id="more-menu" class="absolute right-0 top-full mt-3 rounded-xl hidden z-[110] min-w-[180px] ${t.secondaryBg} ${t.border} shadow-2xl overflow-hidden border">
              <button onclick="window.open('${image.fullUrl}', '_blank')" class="w-full p-4 text-left text-sm ${t.text} hover:bg-white/5 transition-colors">View Original</button>
              <button onclick="downloadImage('${image.fullUrl}', '${image.title}')" class="w-full p-4 text-left text-sm ${t.text} hover:bg-white/5 border-t ${t.border}">Download</button>
              <button onclick="toggleImageDetails()" class="w-full p-4 text-left text-sm ${t.text} hover:bg-white/5 border-t ${t.border}">Toggle Details</button>
              <button id="tip-toggle-btn" onclick="toggleLightboxHint()" class="w-full p-4 text-left text-sm ${t.text} hover:bg-white/5 border-t ${t.border}">
                ${showTipsState ? 'Hide Tips' : 'Show Tips'}
              </button>
              <button onclick="closeLightbox()" class="w-full p-4 text-left text-sm text-red-400 hover:bg-red-400/5 border-t ${t.border}">Close Lightbox</button>
            </div>
          </div>
        </div>


        <button onclick="navigateLightbox(-1)" class="invisible md:visible opacity-40 absolute left-4 p-4 text-white/50 hover:text-white hover:opacity-100 transition-all">
          ${Icons.ChevronLeft ? Icons.ChevronLeft('w-12 h-12') : '❮'}
        </button>
        <button onclick="navigateLightbox(1)" class="invisible md:visible opacity-40 absolute right-4 p-4 text-white/50 hover:text-white hover:opacity-100 transition-all">
          ${Icons.ChevronRight ? Icons.ChevronRight('w-12 h-12') : '❯'}
        </button>


        <div id="lightbox-bottom-bar" class="absolute bottom-0 left-0 right-0 p-8 transition-all duration-300 pointer-events-none">
          <div class="pointer-events-auto">
            <h3 class="${accentClasses} text-2xl font-serif font-bold">${image.title}</h3>
            <p class="${t.accent} text-xs uppercase tracking-[0.3em] mt-1">${image.category}</p>
            
            <div class="description-container overflow-hidden transition-all duration-500 mt-4" style="max-height: 0;">
              <p class="image-description ${t.text} text-sm leading-relaxed opacity-0 transition-opacity">
                ${image.description || 'No description provided.'}
              </p>
            </div>

            <p id="lightbox-hint" class="mt-4 text-[10px] uppercase tracking-widest text-white/40 pointer-events-auto ${showTipsState ? '' : 'hidden'}">
              💡 Navigation tips:
              <span class="block md:inline">
                 ⬅  ➡ to navigate · ↑ for details · Esc to close
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderLightboxOverlay() {
  const root = document.getElementById('lightbox-root');
  if (!root) return;

  const filteredImages = getFilteredImages();
  const index = filteredImages.findIndex(img => img.id === state.lightboxImageId);

  if (state.lightboxImageId === null || index === -1) {
    root.innerHTML = '';
    document.body.style.overflow = '';
    document.removeEventListener("keydown", handleLightboxKeydown);
    return;
  }

  currentLightboxIndex = index;
  root.innerHTML = renderLightbox(filteredImages[index]);
  
  document.body.style.overflow = 'hidden';
  document.addEventListener("keydown", handleLightboxKeydown);
}

function handleTouchStart(e) { touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; }
function handleTouchEnd(e) {
  if (!touchStartX) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 50) navigateLightbox(dx > 0 ? -1 : 1);
  else if (Math.abs(dy) > 50) dy < 0 ? toggleImageDetails() : closeLightbox();
  touchStartX = 0;
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
window.toggleLightboxHint = toggleLightboxHint;
window.toggleImageDetails = toggleImageDetails;
window.toggleMoreMenu = toggleMoreMenu;
window.handleTouchStart = handleTouchStart;
window.handleTouchEnd = handleTouchEnd;
window.renderLightboxOverlay = renderLightboxOverlay;