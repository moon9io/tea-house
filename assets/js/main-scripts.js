// Rain Effect
function createRain() {
    const container = document.getElementById('rain-container');
    if (!container) return;
    container.innerHTML = '';
    const dropCount = 100;
    for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        drop.style.opacity = Math.random() * 0.3;
        container.appendChild(drop);
    }
}

// Reading Progress
function updateReadingProgress() {
    const progress = document.getElementById('reading-progress');
    if (!progress) return;
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollTotal) * 100;
    progress.style.width = `${scrolled}%`;
}

// Skeleton Loading for Images
function handleImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('skeleton');
            img.onload = () => img.classList.remove('skeleton');
        }
    });
}

// Audio Player Toggle
function initAudio() {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-toggle');
    if (!audio || !btn) return;
    
    btn.onclick = () => {
        if (audio.paused) {
            audio.play();
            btn.innerHTML = '⏸️';
        } else {
            audio.pause();
            btn.innerHTML = '🎵';
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    createRain();
    initAudio();
    handleImages();
    window.addEventListener('scroll', updateReadingProgress);
});

// Re-init on navigation
window.addEventListener('popstate', () => {
    createRain();
    handleImages();
});
