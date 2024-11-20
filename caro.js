let currentIndex = 0;
let autoRotateInterval;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const carousel = document.querySelector('.carousel');
const playPauseButton = document.querySelector('.play-pause-button');
const carouselContainer = document.querySelector('.carousel-container');

// Timeout ID for resetting aria-live
let ariaLiveTimeout;

// Flag to track whether auto-rotation is active
let isAutoRotating = false;

// Function to move to the next or previous slide
function moveSlide(direction) {
    // If the user is at the last slide and presses 'next' or at the first slide and presses 'prev'
    if (direction === 1 && currentIndex === totalItems - 1) {
        // Transition immediately to the first slide (no animation)
        carousel.style.transition = "none"; // No transition for the jump
        currentIndex = 0;  // Move to the first slide
    } else if (direction === -1 && currentIndex === 0) {
        // Transition immediately to the last slide (no animation)
        carousel.style.transition = "none"; // No transition for the jump
        currentIndex = totalItems - 1;  // Move to the last slide
    } else {
        // Move normally within the carousel
        currentIndex = (currentIndex + direction + totalItems) % totalItems;
    }

    updateCarousel();

    // Set aria-live to polite only for manual navigation
    if (!isAutoRotating) {
        carouselContainer.setAttribute('aria-live', 'polite');

        // Clear any existing timeout to reset aria-live
        clearTimeout(ariaLiveTimeout);

        // Set a timeout to reset aria-live to "off" after 2 seconds
        ariaLiveTimeout = setTimeout(() => {
            carouselContainer.setAttribute('aria-live', 'off');
        }, 2000); // Reset after 2 seconds
    }
}

// Update the carousel transform to show the correct image
function updateCarousel() {
    const offset = -currentIndex * 100; // Move to the next item (100% width)
    carousel.style.transform = `translateX(${offset}%)`;

    // Update aria-hidden for accessibility
    items.forEach((item, index) => {
        item.setAttribute('aria-hidden', index !== currentIndex);
    });
}

// Start auto-rotation
function startAutoRotate() {
    // Mark that auto-rotation is active
    isAutoRotating = true;

    // Set aria-live to off when auto-rotation is active
    carouselContainer.setAttribute('aria-live', 'off');

    autoRotateInterval = setInterval(() => {
        moveSlide(1);  // Automatically move to the next slide
    }, 3000);  // 3-second interval

    // Change the button to show "pause" icon
    playPauseButton.innerHTML = '&#10074;&#10074;';  // Pause icon
    playPauseButton.setAttribute('aria-label', 'Pause auto-rotation');
}

// Stop auto-rotation
function stopAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;

    // Mark that auto-rotation is inactive
    isAutoRotating = false;

    // Set aria-live to polite when auto-rotation is stopped
    carouselContainer.setAttribute('aria-live', 'polite');

    // Change the button to show "play" icon
    playPauseButton.innerHTML = '&#9654;';  // Play icon
    playPauseButton.setAttribute('aria-label', 'Start auto-rotation'); 
}

// Toggle play/pause
function toggleAutoRotate() {
    if (autoRotateInterval) {
        stopAutoRotate();  // If already rotating, stop it and show play icon
    } else {
        startAutoRotate();  // If paused, start auto-rotation and show pause icon
    }
}

// Handle keyboard interactions
function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
        moveSlide(-1); // Previous slide
    } else if (event.key === 'ArrowRight') {
        moveSlide(1); // Next slide
    } else if (event.key === ' ') {  // Spacebar toggles play/pause
        toggleAutoRotate();
    }
}

// Start auto-rotation when the page loads
startAutoRotate();
