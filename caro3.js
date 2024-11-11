let currentIndex = 0;
let autoRotateInterval;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const carousel = document.querySelector('.carousel');
const playPauseButton = document.querySelector('.play-pause-button');

function moveSlide(direction) {
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentIndex * 100; // Move to the next item (100% width)
    carousel.style.transform = `translateX(${offset}%)`;
    
    // Update aria-hidden for accessibility
    items.forEach((item, index) => {
        item.setAttribute('aria-hidden', index !== currentIndex);
    });
}

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        moveSlide(1);  // Automatically move to the next slide
    }, 3000);  // 3-second interval

    // Change the button to show "pause" icon
    playPauseButton.innerHTML = '&#10074;&#10074;';  // Pause icon
}

function stopAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;

    // Change the button to show "play" icon
    playPauseButton.innerHTML = '&#9654;';  // Play icon
}

function toggleAutoRotate() {
    if (autoRotateInterval) {
        stopAutoRotate();  // If already rotating, stop it and show play icon
    } else {
        startAutoRotate();  // If paused, start auto-rotation and show pause icon
    }
}

// Start auto-rotation when the page loads
startAutoRotate();
