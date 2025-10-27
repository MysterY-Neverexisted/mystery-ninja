import { WebLoader } from "../../classes/WebLoader.js";

// Initialize the web loader
const loader = new WebLoader();

// The elements
const progressBar = document.querySelector(".loading-bar-fill");
const loadingScreen = document.querySelector(".loading-screen");
const loadingBar = document.querySelector(".loading-bar");
const loadingHeader = document.querySelector(".loading-header");

// Fade in the loading bar
setTimeout(() => {

    // Make the loading header say "Hello! :)" first.
    let headerText = "Hello! :)";
    let currentText = "";
    let charIndex = 0;

    const typeInterval = setInterval(() => {
        if (charIndex < headerText.length) {
            currentText += headerText.charAt(charIndex);
            loadingHeader.textContent = currentText;
            charIndex++;
        } else {
            clearInterval(typeInterval);

            // then untype "Hello! :)" and type "Loading..."
            setTimeout(() => {
                let untypeIndex = headerText.length - 1;
                const untypeInterval = setInterval(() => {
                    if (untypeIndex >= 0) {
                        currentText = currentText.slice(0, untypeIndex);
                        loadingHeader.textContent = currentText;
                        untypeIndex--;
                    } else {
                        clearInterval(untypeInterval);

                        // Now type "Loading..."
                        headerText = "Loading...";
                        currentText = "";
                        charIndex = 0;

                        const loadTypeInterval = setInterval(() => {
                            if (charIndex < headerText.length) {
                                currentText += headerText.charAt(charIndex);
                                loadingHeader.textContent = currentText;
                                charIndex++;
                            } else {
                                clearInterval(loadTypeInterval);

                                setTimeout(() => {

                                    // Subscribe to progress updates
                                    loader.onProgress(progress => {
                                        // Update loading bar
                                        progressBar.style.width = progress + "%";
                                        
                                        // Hide loading screen when complete
                                        if (progress === 100) {
                                            loadingScreen.style.transition = "opacity 0.35s ease";
                                            
                                            setTimeout(() => {
                                                loadingScreen.style.opacity = "0";
                                                setTimeout(() => {
                                                    loadingScreen.style.display = "none";
                                                }, 500); // wait for fade out transition
                                            }, 1000); // wait 1 second before fading out
                                        }
                                    });
                                }, 500); // wait before starting to load
                            }
                        }, 50); // duration for typing "Loading..."
                    }
                }, 50); // duration for untyping "Hello! :)"
            }, 1000); // wait 1 second before untyping
        }
    }, 50); // duration for typing "Hello! :)"

    // fade in the loading bar
    loadingBar.style.opacity = "1";
    loadingHeader.style.opacity = "1";
}, 500);
