let currentIndex = 0;
let autoRotateInterval;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const carousel = document.querySelector('.carousel');
const playPauseButton = document.querySelector('.play-pause-button');
const carouselContainer = document.querySelector('.carousel-container');
let ariaLiveTimeout;
let isAutoRotating = false;

function moveSlide(direction) {
    // Handle movement to next/previous slide
    if (direction === 1 && currentIndex === totalItems - 1) {
        carousel.style.transition = "none";  // Remove transition for "wraparound"
        currentIndex = 0;
    } else if (direction === -1 && currentIndex === 0) {
        carousel.style.transition = "none";  // Remove transition for "wraparound"
        currentIndex = totalItems - 1;
    } else {
        currentIndex = (currentIndex + direction + totalItems) % totalItems;
    }

    updateCarousel();

    // Set aria-live on carousel container for manual navigation
    if (!isAutoRotating) {
        carouselContainer.setAttribute('aria-live', 'polite');  // Announce the change to screen readers
        clearTimeout(ariaLiveTimeout);  // Clear existing timeout
        ariaLiveTimeout = setTimeout(() => {
            // carouselContainer.setAttribute('aria-live', 'off');  // Reset after a brief delay
        }, 2000);
    }
}

function updateCarousel() {
    const offset = -currentIndex * 100;  // Calculate the offset for the slide
    carousel.style.transform = `translateX(${offset}%)`;

    // Update aria-hidden for the items, so screen readers ignore non-visible items
    items.forEach((item, index) => {
        item.setAttribute('aria-hidden', index !== currentIndex);
    });
}

function startAutoRotate() {
    isAutoRotating = true;
    carouselContainer.setAttribute('aria-live', 'off');  // Disable live announcements during auto-rotation

    autoRotateInterval = setInterval(() => {
        moveSlide(1);  // Move to the next slide automatically
    }, 3000);

    playPauseButton.innerHTML = '&#10074;&#10074;';  // Change button to "pause"
    playPauseButton.setAttribute('aria-label', 'Pause')
}

function stopAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;
    isAutoRotating = false;
    carouselContainer.setAttribute('aria-live', 'polite');  // Re-enable live announcements when rotation is paused

    playPauseButton.innerHTML = '&#9654;';  // Change button to "play"
    playPauseButton.setAttribute('aria-label', 'Play')
}

function toggleAutoRotate() {
    if (autoRotateInterval) {
        stopAutoRotate();  // Stop rotation and change to "play" icon
    } else {
        startAutoRotate();  // Start rotation and change to "pause" icon
    }
}

// Keyboard Navigation
function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowLeft':
            moveSlide(-1);  // Move to the previous slide
            break;
        case 'ArrowRight':
            moveSlide(1);  // Move to the next slide
            break;
        case 'Enter':
        case ' ':
            toggleAutoRotate();  // Toggle play/pause on Enter or Space
            break;
        default:
            break;
    }
}

// Initialize auto-rotation when the page loads
startAutoRotate();

// Optionally, allow keyboard navigation of carousel items
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'ArrowLeft') {
//         moveSlide(-1);
//     } else if (event.key === 'ArrowRight') {
//         moveSlide(1);
//     }
// });
