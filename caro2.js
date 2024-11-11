let currentIndex = 0;
let isAutoRotating = false;
let autoRotateInterval;

// Get all carousel items
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

// Update visibility of the carousel items
function updateCarousel() {
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.setAttribute('aria-hidden', 'false');
        } else {
            item.setAttribute('aria-hidden', 'true');
        }
    });
}

// Toggle auto-rotation on and off
function toggleAutoRotate() {
    const playPauseButton = document.querySelector('.play-pause-button');

    if (isAutoRotating) {
        clearInterval(autoRotateInterval);
        isAutoRotating = false;
        playPauseButton.textContent = 'Play';
    } else {
        autoRotateInterval = setInterval(() => {
            moveSlide(1); // Move to the next slide every 3 seconds
        }, 3000);
        isAutoRotating = true;
        playPauseButton.textContent = 'Pause';
    }
}

// Move to the next or previous slide
function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= totalItems) {
        currentIndex = 0; // Wrap around
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1; // Wrap around
    }
    updateCarousel();
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel(); // Initialize carousel
    toggleAutoRotate(); // Start auto-rotation immediately
});
