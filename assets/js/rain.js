function createRain() {
    const container = document.getElementById('rain-container');
    if (!container) return;

    const dropCount = 150;
    for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        const left = Math.random() * 100;
        const duration = Math.random() * 0.5 + 0.5;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;
        
        drop.style.left = `${left}vw`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.opacity = opacity;
        
        container.appendChild(drop);
    }
}

// Re-run on navigation if using PJAX/Turbo
document.addEventListener('DOMContentLoaded', createRain);
window.addEventListener('popstate', createRain);
