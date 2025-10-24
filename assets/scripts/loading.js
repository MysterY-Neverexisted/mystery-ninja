const progressFill = document.querySelector(".loading-bar-fill");
const loadingScreen = document.querySelector(".loading-screen");

let resourceSet = new Set();
let totalResources = 0;
let loadedResources = 0;
let hideTimeout = null;

function updateProgressBar() {
    const total = Math.max(totalResources, 1);
    const percent = Math.round((loadedResources / total) * 100);

    progressFill.style.width = percent + "%";
    
	return percent;
}

function fadeOutAndRemove(delay = 1000) {
    loadingScreen.style.transition = "opacity 350ms ease";
    loadingScreen.style.opacity = "0";
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        loadingScreen.style.display = "none";
    }, delay);
}

if ("PerformanceObserver" in window) {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (!resourceSet.has(entry.name)) {
                resourceSet.add(entry.name);
                totalResources = resourceSet.size;
            }
            // every resource entry observed -> consider it loaded
            loadedResources = Math.min(totalResources, loadedResources + 1);
            setTimeout(() => {
				updateProgressBar();
			}, 1000);
        });
    });
    try {
        observer.observe({ entryTypes: ["resource"] });
    } catch (e) {
        // ignore if not supported
    }
} else {
    // fallback: count current performance resources
    resourceSet = new Set(performance.getEntriesByType?.("resource") || []);
    totalResources = resourceSet.size;
}

// Keep progress moving a little while DOM is parsing
document.addEventListener("DOMContentLoaded", () => {
    updateProgressBar();
});

// When everything (images, styles, subresources) is loaded
window.addEventListener("load", () => {
    // ensure all observed resources are counted
    resourceSet = new Set(performance.getEntriesByType?.("resource") || [...resourceSet]);
    totalResources = Math.max(totalResources, resourceSet.size);
    loadedResources = totalResources;
    updateProgressBar();

    // short delay so users see 100% briefly, then fade out
    setTimeout(() => {
        fadeOutAndRemove();
    }, 1000);
});

// Safety: if something stalls, force-hide after 8s
setTimeout(() => {
    loadedResources = totalResources;
    updateProgressBar();
    fadeOutAndRemove();
}, 8000);