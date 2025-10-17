// Force logo refresh script
// Run this in browser console to force reload the logo
function forceLogoRefresh() {
  const logoImages = document.querySelectorAll('img[alt*="QIS"]');
  logoImages.forEach(img => {
    const originalSrc = img.src.split('?')[0]; // Remove existing query params
    const newSrc = `${originalSrc}?v=${Date.now()}&force=true`;
    img.src = newSrc;
    console.log('Logo refreshed:', newSrc);
  });
}

// Auto-run the function
forceLogoRefresh();

// Also clear any cached images
if ('caches' in window) {
  caches.keys().then(names => {
    names.forEach(name => {
      caches.delete(name);
    });
  });
}

console.log('Logo refresh script executed. If logo still doesn\'t update, try a hard refresh (Ctrl+F5 or Cmd+Shift+R)');
