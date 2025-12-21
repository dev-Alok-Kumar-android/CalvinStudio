function handleLightboxKeydown(e) {
  // Defensive guard: only process keys if the lightbox is active
  if (state.lightboxImageId === null) return;

  const blockedKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Escape"];
  if (blockedKeys.includes(e.key)) {
    e.preventDefault();
  }

  switch (e.key) {
    case "ArrowLeft":
      navigateLightbox(-1);
      break;
    case "ArrowRight":
      navigateLightbox(1);
      break;
    case "ArrowDown":
      closeLightbox();
      break;
    case "ArrowUp":
      toggleImageDetails();
      break;
    case "Escape":
      closeLightbox();
      break;
  }
}

function toggleImageDetails() {
  const descriptionEl = document.querySelector('.image-description');
  const bottomBar = document.getElementById('lightbox-bottom-bar');
  if (descriptionEl && bottomBar) {
    const isHidden = descriptionEl.classList.contains('opacity-0');
    const upperElements = bottomBar.querySelector('.upper-elements');
    const descriptionContainer = bottomBar.querySelector('.description-container');
    
    if (isHidden) {
      bottomBar.classList.remove('bottom-0', 'bg-gradient-to-t', 'from-black/80', 'to-transparent');
      bottomBar.classList.add('bottom-10', 'bg-black/90', 'backdrop-blur-sm');
      
      if (upperElements) upperElements.style.transform = 'translateY(-2rem)';
      if (descriptionContainer) descriptionContainer.style.maxHeight = '10rem';
      
      setTimeout(() => {
        descriptionEl.classList.remove('opacity-0');
        descriptionEl.classList.add('opacity-100');
      }, 250);
    } else {
      descriptionEl.classList.remove('opacity-100');
      descriptionEl.classList.add('opacity-0');
      
      if (descriptionContainer) descriptionContainer.style.maxHeight = '0';
      if (upperElements) upperElements.style.transform = 'translateY(0)';
      
      bottomBar.classList.remove('bottom-20', 'bg-black/90', 'backdrop-blur-sm');
      bottomBar.classList.add('bottom-0', 'bg-gradient-to-t', 'from-black/80', 'to-transparent');
    }
  }
}

/**
 * Global helper to close the menu when clicking outside
 */
function closeMenuOnOutsideClick(event) {
  const menu = document.getElementById('more-menu');
  const trigger = document.getElementById('more-menu-trigger');
  
  if (menu && !menu.contains(event.target) && !trigger.contains(event.target)) {
    menu.classList.add('hidden');
    document.removeEventListener('click', closeMenuOnOutsideClick);
  }
}

function toggleMoreMenu(event) {
  // Prevent the click from immediately triggering the "closeLightbox" background click
  if (event) event.stopPropagation();

  const menu = document.getElementById('more-menu');
  if (menu) {
    const isOpening = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');

    if (isOpening) {
      // Small delay to ensure the click that opened the menu doesn't trigger the close listener
      setTimeout(() => {
        document.addEventListener('click', closeMenuOnOutsideClick);
      }, 10);
    } else {
      document.removeEventListener('click', closeMenuOnOutsideClick);
    }
  }
}

function viewImage() {
  const filteredImages = getFilteredImages();
  const currentImage = filteredImages[currentLightboxIndex];
  if (currentImage) {
    window.open(currentImage.fullUrl, '_blank');
    const menu = document.getElementById('more-menu');
    if (menu) menu.classList.add('hidden');
    document.removeEventListener('click', closeMenuOnOutsideClick);
  }
}

function downloadImage() {
  const filteredImages = getFilteredImages();
  const currentImage = filteredImages[currentLightboxIndex];
  if (currentImage) {
    const link = document.createElement('a');
    link.href = currentImage.fullUrl;
    link.download = currentImage.title || 'image';
    link.click();
    const menu = document.getElementById('more-menu');
    if (menu) menu.classList.add('hidden');
    document.removeEventListener('click', closeMenuOnOutsideClick);
  }
}

function handleTouchStart(e) {
  if (!e.touches || e.touches.length !== 1) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
  if (!touchStartX) return;

  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;

  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;

  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) navigateLightbox(-1);
    else navigateLightbox(1);
  }

  if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx)) {
    if (dy > 0) closeLightbox();
    else toggleImageDetails();
  }

  touchStartX = 0;
  touchStartY = 0;
}

function renderLightbox(image) {
    if (!image) return '';

    return `
            <div id="lightbox-overlay"
                 class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm
                        flex items-center justify-center p-4">

              <div id="lightbox-image-container"
                   class="group relative w-full h-full flex items-center justify-center"
                   onclick="if(event.target === this) closeLightbox()"
                   ontouchstart="handleTouchStart(event)"
                   ontouchend="handleTouchEnd(event)">

                <img id="lightbox-image-${image.id}"
                  src="${image.fullUrl}"
                  alt="${image.title}"
                  onerror="this.onerror=null; this.src='https://placehold.co/800x600/171717/ffffff?text=Image+Not+Found';"
                  class="max-h-full max-w-full object-contain transition-opacity duration-300"
                />

                <div class="lightbox-toolbar absolute top-0 left-0 right-0 p-4 flex items-center justify-between
                            bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
                  <div class="flex items-center space-x-4 pointer-events-auto">
                    <button onclick="closeLightbox()"
                            class="text-white p-2 rounded-full bg-black/30 hover:text-rose-400">
                      ${Icons.XCircle('w-6 h-6')}
                    </button>
                    <span class="text-white text-sm font-medium">
                      ${currentLightboxIndex + 1} / ${getFilteredImages().length}
                    </span>
                  </div>
                  <div class="flex items-center space-x-2 pointer-events-auto">
                    <div class="relative">
                      <button id="more-menu-trigger" onclick="toggleMoreMenu(event)" class="text-white p-2 rounded bg-black/30 hover:bg-black/50" title="More Options">
                        ⋮
                      </button>
                      <div id="more-menu" class="absolute right-0 top-full mt-2 bg-black/80 rounded p-2 hidden z-10">
                        <button onclick="viewImage()" class="block text-white p-1 hover:bg-black/50 w-full text-left">🖼 View Image</button>
                        <button onclick="downloadImage()" class="block text-white p-1 hover:bg-black/50 w-full text-left"> Download </button>
                        <button onclick="toggleImageDetails()" class="block text-white p-1 hover:bg-black/50 w-full text-left">ℹ️ Toggle Details</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button onclick="navigateLightbox(-1)"
                        class="lightbox-ui absolute left-4 top-1/2 -translate-y-1/2
                               opacity-0 hover:opacity-100 transition-opacity duration-300 text-white p-3 rounded-full
                               bg-black/40 hover:bg-black/60 pointer-events-auto">
                  ${Icons.ChevronLeft('w-10 h-10')}
                </button>

                <button onclick="navigateLightbox(1)"
                        class="lightbox-ui absolute right-4 top-1/2 -translate-y-1/2
                               opacity-0 hover:opacity-100 transition-opacity duration-300 text-white p-3 rounded-full
                               bg-black/40 hover:bg-black/60 pointer-events-auto">
                  ${Icons.ChevronRight('w-10 h-10')}
                </button>

                <div id="lightbox-bottom-bar" class="lightbox-ui absolute bottom-0 left-0 right-0 p-6
                            bg-gradient-to-t from-black/80 to-transparent transition-all duration-700 pointer-events-none">
                  <div class="upper-elements transition-transform duration-500 pointer-events-auto">
                    <h3 class="text-white mt-5 text-xl font-serif font-bold">
                      ${image.title}
                    </h3>
                    <p class="text-amber-500 text-sm">${image.category}</p>
                  </div>
                  <div class="description-container overflow-hidden transition-all duration-500 pointer-events-auto" style="max-height: 0;">
                    <p class="image-description text-white/70 text-sm opacity-0 transition-opacity duration-300 mt-2">
                      ${image.description || 'No description available'}
                    </p>
                  </div>
                  <p class="text-white/50 text-xs mt-3 md:hidden">
                    Swipe left / right to navigate, up to toggle details, down to close.
                  </p>
                </div>
              </div>
            </div>
    `;
}

function renderLightboxOverlay() {
  let lightboxRoot = document.getElementById('lightbox-root');
  const filteredImages = getFilteredImages();
  const imageIndex = filteredImages.findIndex(img => img.id === state.lightboxImageId);

  if (state.lightboxImageId === null || imageIndex === -1) {
    lightboxRoot.innerHTML = '';
    document.body.style.overflow = '';
    document.removeEventListener("keydown", handleLightboxKeydown);
    document.removeEventListener('click', closeMenuOnOutsideClick);
    return;
  }

  currentLightboxIndex = imageIndex;
  const currentImage = filteredImages[currentLightboxIndex];
  lightboxRoot.innerHTML = renderLightbox(currentImage);
  document.body.style.overflow = 'hidden';
  document.addEventListener("keydown", handleLightboxKeydown);
}

function openLightbox(imageId) {
    state.lightboxImageId = imageId;
    document.body.style.overflow = 'hidden';
    history.pushState({ lightbox: true }, "");
    renderLightboxOverlay();
    const img = document.getElementById(`lightbox-image-${imageId}`);
    if (img) {
      img.style.opacity = 0;
      setTimeout(() => img.style.opacity = 1, 10);
    }
}

function closeLightbox(fromPopstate = false) {
    state.lightboxImageId = null;
    document.removeEventListener('click', closeMenuOnOutsideClick);
    renderLightboxOverlay();
    document.body.style.overflow = '';
    if (!fromPopstate) {
      history.back();
    }
}

window.addEventListener("popstate", () => {
  if (state.lightboxImageId !== null) {
    closeLightbox(true);
  }
});

function navigateLightbox(direction) {
    const filteredImages = getFilteredImages();
    let newIndex = currentLightboxIndex + direction;
    if (newIndex >= filteredImages.length) newIndex = 0;
    else if (newIndex < 0) newIndex = filteredImages.length - 1;
    
    // Clean up menu state on navigation
    document.removeEventListener('click', closeMenuOnOutsideClick);
    
    const currentImg = document.getElementById(`lightbox-image-${state.lightboxImageId}`);
    if (currentImg) {
      currentImg.style.opacity = 0;
      setTimeout(() => {
        state.lightboxImageId = filteredImages[newIndex].id;
        renderLightboxOverlay();
        const newImg = document.getElementById(`lightbox-image-${state.lightboxImageId}`);
        if (newImg) {
          newImg.style.opacity = 0;
          setTimeout(() => newImg.style.opacity = 1, 10);
        }
      }, 300);
    } else {
      state.lightboxImageId = filteredImages[newIndex].id;
      renderLightboxOverlay();
    }
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
window.toggleImageDetails = toggleImageDetails;
window.toggleMoreMenu = toggleMoreMenu;
window.viewImage = viewImage;
window.downloadImage = downloadImage;
window.handleTouchStart = handleTouchStart;
window.handleTouchEnd = handleTouchEnd;
window.handleLightboxKeydown = handleLightboxKeydown;