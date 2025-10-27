/**
 * Class representing a web loader that tracks loading progress of resources.
 * @class
 */
export class WebLoader {
    /**
     * Create a WebLoader instance.
     * @param {Object} options - Configuration options for the loader.
     * @param {number} [options.timeout=8000] - Timeout duration in milliseconds.
     */

    constructor(options = {}) {
        this.totalResources = 0;
        this.loadedResources = 0;
        this.resourceSet = new Set();
        this.callbacks = new Set();
        this.timeoutDuration = options.timeout || 8000;
        this.initialized = false;

        this.init();
    }

    /**
     * Initialize the loader and set up event listeners.
     * @private
     */
    init() {
        if (this.initialized) return;
        this.initialized = true;

        // Set up PerformanceObserver if available
        if ("PerformanceObserver" in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (!this.resourceSet.has(entry.name)) {
                        this.resourceSet.add(entry.name);
                        this.totalResources = this.resourceSet.size;
                        this.loadedResources = Math.min(this.totalResources, this.loadedResources + 1);
                        this.notifyProgress();
                    }
                });
            });

            try {
                observer.observe({ entryTypes: ["resource"] });
            } catch (e) {
                // Fallback if observation fails
                this.initFallback();
            }
        } else {
            this.initFallback();
        }

        // Set up event listeners
        document.addEventListener("DOMContentLoaded", () => this.notifyProgress());
        
        window.addEventListener("load", () => {
            this.resourceSet = new Set(performance.getEntriesByType?.("resource") || [...this.resourceSet]);
            this.totalResources = Math.max(this.totalResources, this.resourceSet.size);
            this.loadedResources = this.totalResources;
            this.notifyProgress();
        });

        // Safety timeout
        setTimeout(() => {
            this.loadedResources = this.totalResources;
            this.notifyProgress();
        }, this.timeoutDuration);
    }

    /**
     * Fallback initialization for browsers that do not support PerformanceObserver.
     * @private
     */
    initFallback() {
        this.resourceSet = new Set(performance.getEntriesByType?.("resource") || []);
        this.totalResources = this.resourceSet.size;
    }

    /**
     * Get the current loading progress as a percentage.
     * @returns {number} The loading progress (0-100).
     */
    getProgress() {
        const total = Math.max(this.totalResources, 1);
        return Math.round((this.loadedResources / total) * 100);
    }

    /**
     * Subscribe to progress updates.
     * @param {Function} callback - The function to call with the current progress.
     * @returns {Function} A function to unsubscribe from progress updates.
     */
    onProgress(callback) {
        this.callbacks.add(callback);
        // Immediately call with current progress
        callback(this.getProgress());
        return () => this.callbacks.delete(callback); // Returns cleanup function
    }

    /**
     * Notify all subscribed callbacks of the current progress.
     * @private
     */
    notifyProgress() {
        const progress = this.getProgress();
        this.callbacks.forEach(callback => callback(progress));
    }

    /**
     * Display help information about the WebLoader class.
     * @public 
     */
    static
    help() {
        console.log("WebLoader");
        console.log("Usage: WebLoader({ timeout: <milliseconds> })");
    }
}