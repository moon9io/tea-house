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

function createPetal(e) {
    for (let i = 0; i < 5; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = `${e.clientX}px`;
        petal.style.top = `${e.clientY}px`;
        petal.style.width = `${Math.random() * 10 + 5}px`;
        petal.style.height = `${Math.random() * 10 + 5}px`;
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 3000);
    }
}

function updateGreeting() {
    const greetingEl = document.getElementById('dynamic-greeting');
    if (!greetingEl) return;
    const hour = new Date().getHours();
    let msg = "مرحباً بك في رحلتنا";
    if (hour < 12) msg = "صباح الخير.. رحلة جديدة تبدأ";
    else if (hour < 18) msg = "طاب يومك.. استمتع ببعض الشاي";
    else msg = "مساء هادئ.. وقت مثالي للقراءة";
    greetingEl.innerText = msg;
}

function showAchievement(name) {
    const toast = document.getElementById('achievement-toast');
    const nameEl = document.getElementById('achievement-name');
    if (!toast || !nameEl) return;
    nameEl.innerText = name;
    toast.style.right = '30px';
    setTimeout(() => toast.style.right = '-300px', 5000);
}

function initAll() {
    createRain();
    initAudio();
    handleImages();
    updateGreeting();
    
    // Show achievement on first click
    document.addEventListener('click', () => {
        if (!localStorage.getItem('ach_first_click')) {
            showAchievement('أول تعويذة سحرية!');
            localStorage.setItem('ach_first_click', 'true');
        }
    }, { once: true });

    window.addEventListener('scroll', updateReadingProgress);
    document.addEventListener('click', createPetal);
    
    // Ctrl+K Search
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.search-input')?.focus();
        }
    });

    // Hide Loader
    const loader = document.getElementById('magic-loader');
    if (loader) {
        setTimeout(() => loader.style.opacity = '0', 500);
        setTimeout(() => loader.style.display = 'none', 1300);
    }
}

// Initialize on load
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initAll();
} else {
    document.addEventListener('DOMContentLoaded', initAll);
}

// Re-init on navigation (for SPAs or Turbo links)
window.addEventListener('popstate', initAll);
window.addEventListener('load', initAll);
