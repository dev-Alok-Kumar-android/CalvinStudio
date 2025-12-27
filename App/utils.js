const getThumbnailUrl = (url) => {
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
        // Inject Cloudinary transformations for thumbnails
        // q_auto: automatic quality, f_auto: automatic format (webp/avif), c_fill: crop to fill
        return url.replace('/upload/', '/upload/c_fill,w_400,h_400,q_auto,f_auto/');
    }
    // Fallback for non-Cloudinary images (like the Hero image from jdmagicbox)
    return url;
};

const getFullUrl = (url) => {
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
        // q_auto: automatic quality, f_auto: automatic format
        return url.replace('/upload/', '/upload/q_auto,f_auto/');
    }
    return url;
};

function getPortfolioImages() {
  return RAW_PORTFOLIO_IMAGES.map(img => ({
    ...img,
    fullUrl: getFullUrl(img.url),
    thumbnailUrl: getThumbnailUrl(img.url)
  }));
}

const getFilteredImages = () => {
    const images = getPortfolioImages();
    return state.activeCategory === 'All' 
        ? images 
        : images.filter(img => img.category === state.activeCategory);
};
const getCategories = () => ['All', ...new Set(getPortfolioImages().map(img => img.category))];
