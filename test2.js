let currentIndex = 0;
let autoRotateInterval;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const carousel = document.querySelector('.carousel');
const playPauseButton = document.querySelector('.play-pause-button');
const carouselContainer = document.querySelector('.carousel-container');

// Timeout ID for resetting aria-live
let ariaLiveTimeout;

// Function to move to the next or previous slide
function moveSlide(direction) {
    // Update the currentIndex based on the direction
    currentIndex = (currentIndex + direction + totalItems) % totalItems;

    // Ensure that we update the carousel
    updateCarousel();

    // Set aria-live to polite for manual navigation
    carouselContainer.setAttribute('aria-live', 'polite');

    // Clear any existing timeout to reset aria-live
    clearTimeout(ariaLiveTimeout);

    // Set a timeout to reset aria-live to "off" after 2 seconds
    ariaLiveTimeout = setTimeout(() => {
        carouselContainer.setAttribute('aria-live', 'off');
    }, 2000); // Reset after 2 seconds
}

// Update the carousel transform to show the correct image
function updateCarousel() {
    const offset = -currentIndex * 100; // Move to the next item (100% width)
    carousel.style.transition = "transform 0.5s ease"; // smooth transition

    carousel.style.transform = `translateX(${offset}%)`;

    // Update aria-hidden for accessibility
    items.forEach((item, index) => {
        item.setAttribute('aria-hidden', index !== currentIndex);
    });
}

// Start auto-rotation
function startAutoRotate() {
    // Set aria-live to off when auto-rotation is active
    carouselContainer.setAttribute('aria-live', 'off');
    
    autoRotateInterval = setInterval(() => {
        moveSlide(1);  // Automatically move to the next slide
    }, 3000);  // 3-second interval

    // Change the button to show "pause" icon
    playPauseButton.innerHTML = '&#10074;&#10074;';  // Pause icon
}

// Stop auto-rotation
function stopAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;

    // Set aria-live to polite when auto-rotation is stopped
    carouselContainer.setAttribute('aria-live', 'polite');

    // Change the button to show "play" icon
    playPauseButton.innerHTML = '&#9654;';  // Play icon
}

// Toggle play/pause
function toggleAutoRotate() {
    if (autoRotateInterval) {
        stopAutoRotate();  // If already rotating, stop it and show play icon
    } else {
        startAutoRotate();  // If paused, start auto-rotation and show pause icon
    }
}

// Start auto-rotation when the page loads
startAutoRotate();
