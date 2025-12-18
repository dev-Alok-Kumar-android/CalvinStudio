function handleLightboxKeydown(e) {
  if (state.lightboxImageId === null) return;

  switch (e.key) {
    case "ArrowLeft":
      navigateLightbox(-1);
      break;
    case "ArrowRight":
      navigateLightbox(1);
      break;
    case "Enter":
        confirmDownload();
      break;
    case "ArrowUp":
      // zoom in functionality could be added here
      zoomInLightbox();
      break;
    case "ArrowDown":
      // zoom out functionality could be added here
      zoomOutLightbox();
        break;
    case "Escape":
      closeLightbox();
      break;
  }
}

function zoomInLightbox() {
  // Placeholder for zoom in functionality
  console.log("Zoom In triggered");
  const lightboxImage = document.getElementById(`lightbox-image-${state.lightboxImageId}`);
  if (lightboxImage) {
    lightboxImage.style.transform = "scale(1.2)";
  }
}

function zoomOutLightbox() {
  // Placeholder for zoom out functionality
  console.log("Zoom Out triggered");
    const lightboxImage = document.getElementById(`lightbox-image-${state.lightboxImageId}`);
    if (lightboxImage) {
        lightboxImage.style.transform = "scale(1)";
    }
}

function toggleLightboxUI() {
  lightboxUIVisible = !lightboxUIVisible;
  document.querySelectorAll('.lightbox-ui').forEach(el => {
    el.style.opacity = lightboxUIVisible ? '1' : '0';
    el.style.pointerEvents = lightboxUIVisible ? 'auto' : 'none';
  });
}

function confirmDownload() {
  if (state.lightboxImageId === null) return;

  const image = getFilteredImages().find(img => img.id === state.lightboxImageId);
  if (!image) return;

  const link = document.createElement('a');
  link.href = image.fullUrl;
  link.download = `${image.title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
  document.body.appendChild(link);

    if (confirm("Do you want to view/download this image?")) {
        link.click();
        document.body.removeChild(link);
    } else {
        document.body.removeChild(link);
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

  // horizontal swipe only
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      navigateLightbox(-1); // swipe right → previous
    } else {
      navigateLightbox(1);  // swipe left → next
    }
  }

  touchStartX = 0;
  touchStartY = 0;
}

function renderLightbox(image) {
    if (!image) return '';
    const counterText = `${currentLightboxIndex + 1} / ${getFilteredImages().length}`;

    return `
            <div id="lightbox-overlay"
                 class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm
                        flex items-center justify-center p-4">

              <!-- 👇 THIS is the swipe + keyboard container -->
              <div id="lightbox-image-container"
                   class="group relative w-full h-full flex items-center justify-center"
                   onclick="toggleLightboxUI()"
                   ontouchstart="handleTouchStart(event)"
                   ontouchend="handleTouchEnd(event)">

                <img
                  src="${image.fullUrl}"
                  alt="${image.title}"
                  class="max-h-full max-w-full object-contain transition-opacity duration-300"
                />

                <!-- Top bar -->
                <div class="lightbox-ui absolute top-0 left-0 right-0 p-4 flex justify-between items-center
                            bg-gradient-to-b from-black/70 to-transparent">
                  <button onclick="closeLightbox()"
                          class="text-white p-2 rounded-full bg-black/30 hover:text-rose-400">
                    ${Icons.XCircle('w-6 h-6')}
                  </button>
                  <span class="text-white text-sm font-medium">
                    ${currentLightboxIndex + 1} / ${getFilteredImages().length}
                  </span>
                </div>

                <!-- Prev -->
                <button onclick="navigateLightbox(-1)"
                        class="lightbox-ui absolute left-4 top-1/2 -translate-y-1/2
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-3 rounded-full
                               bg-black/40 hover:bg-black/60">
                  ${Icons.ChevronLeft('w-8 h-8')}
                </button>

                <!-- Next -->
                <button onclick="navigateLightbox(1)"
                        class="lightbox-ui absolute right-4 top-1/2 -translate-y-1/2
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-3 rounded-full
                               bg-black/40 hover:bg-black/60">
                  ${Icons.ChevronRight('w-8 h-8')}
                </button>

                <!-- Bottom bar -->
                <div class="lightbox-ui absolute bottom-0 left-0 right-0 p-6
                            bg-gradient-to-t from-black/80 to-transparent">
                  <h3 class="text-white text-xl font-serif font-bold">
                    ${image.title}
                  </h3>
                  <p class="text-amber-500 text-sm">${image.category}</p>
                  <p class="text-white/50 text-xs mt-1 md:hidden">
                    Swipe left / right
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
    return;
  }

  currentLightboxIndex = imageIndex;
  const currentImage = filteredImages[currentLightboxIndex];
  lightboxRoot.innerHTML = renderLightbox(currentImage);
  document.body.style.overflow = 'hidden';

  // ✅ keyboard support
  document.addEventListener("keydown", handleLightboxKeydown);
}

function openLightbox(imageId) {
    state.lightboxImageId = imageId;
    renderLightboxOverlay();
}

function closeLightbox() {
    state.lightboxImageId = null;
    renderLightboxOverlay();
}

function navigateLightbox(direction) {
    const filteredImages = getFilteredImages();
    let newIndex = currentLightboxIndex + direction;
    if (newIndex >= filteredImages.length) newIndex = 0;
    else if (newIndex < 0) newIndex = filteredImages.length - 1;
    state.lightboxImageId = filteredImages[newIndex].id;
    renderLightboxOverlay();
}
