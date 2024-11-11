// Declare necessary variables
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let autoRotateInterval;
let isAutoRotating = false;

// Update the visibility of carousel items based on current index
function updateCarousel() {
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.setAttribute('aria-hidden', 'false');
        } else {
            item.setAttribute('aria-hidden', 'true');
        }
    });
}

// Move the carousel to the next or previous slide
function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= totalItems) {
        currentIndex = 0; // Wrap around
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1; // Wrap around
    }
    updateCarousel();
}

// Toggle auto-rotation on and off
function toggleAutoRotate() {
    const playPauseButton = document.querySelector('.play-pause-button');
    if (isAutoRotating) {
        clearInterval(autoRotateInterval); // Stop auto-rotation
        isAutoRotating = false;
        playPauseButton.textContent = '▶️'; // Show play symbol
    } else {
        autoRotateInterval = setInterval(() => {
            moveSlide(1); // Auto-rotate every 3 seconds
        }, 3000);
        isAutoRotating = true;
        playPauseButton.textContent = '⏸️'; // Show pause symbol
    }
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    // Start the carousel and auto-rotate
    updateCarousel();
    toggleAutoRotate(); // Start auto-rotation immediately
});

console.log('Hello!')