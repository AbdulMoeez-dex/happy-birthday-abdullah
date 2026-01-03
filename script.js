// Setup Dates
// Current time in context is Dec 28, 2025. Birthday is Dec 29.
// But DOB 2018. 2018 + 7 = 2025. So he turns 7 TOMORROW (or today depending on timezone logic, I'll stick to fixed date).
// Target Date: Dec 29, 2025 00:00:00

const targetDate = new Date("December 29, 2025 00:00:00").getTime();

// Countdown Logic
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        // Birthday has arrived!
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = `
            <div class="col-span-2 md:col-span-4 text-center">
                <h2 class="text-4xl md:text-6xl font-fredoka font-bold text-royal-blue animate-bounce">
                    🎉 Happy Birthday! 🎉
                </h2>
            </div>
        `;
        fireConfetti();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

}, 1000);

// Confetti Effect
function fireConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

// Initial Confetti on Load
window.addEventListener('load', () => {
    setTimeout(() => {
        fireConfetti();
    }, 1000);
});

// Music Toggle
const musicBtn = document.getElementById('music-toggle');
const audio = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicBtn.innerHTML = '<i class="fa-solid fa-music text-xl"></i>';
        musicBtn.classList.add('animate-bounce-slow');
    } else {
        audio.play().catch(e => {
            console.log("Audio play failed (user interaction needed): ", e);
            alert("Tap again to play!");
        });
        musicBtn.innerHTML = '<i class="fa-solid fa-pause text-xl"></i>';
        musicBtn.classList.remove('animate-bounce-slow');
    }
    isPlaying = !isPlaying;
});


// Carousel Logic
const track = document.getElementById('carousel-slides');
const slides = track.children;
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;

function updateCarousel() {
    const width = track.clientWidth; // Use container width
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((ind, i) => {
        if (i === currentIndex) {
            ind.classList.remove('bg-white/40');
            ind.classList.add('bg-white');
            ind.classList.add('scale-125'); // Active scale
        } else {
            ind.classList.add('bg-white/40');
            ind.classList.remove('bg-white');
            ind.classList.remove('scale-125');
        }
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Auto-advance carousel
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}, 5000);

// Smooth Scroll
function scrollToGallery() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}
