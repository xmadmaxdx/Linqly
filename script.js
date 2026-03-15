const canvas = document.getElementById('loveCanvas');
const ctx = canvas.getContext('2d');
const quoteElement = document.getElementById('quoteStream');
const exploreBtn = document.getElementById('exploreBtn');

let width, height, particles = [];
let touchCount = 0;
let isFinished = false;
let mouse = { x: -1000, y: -1000, radius: 200 };

const quotes = [
    "Sneha, you are my favorite miracle.",
    "Every heartbeat whispers your name, Sneha.",
    "In your eyes, I found my forever home.",
    "Sneha, you make the world feel like magic.",
    "My heart belongs to you, Sneha."
];
let quoteIndex = 0;

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 250; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = this.getRandomColor();
        this.mode = 'float'; // float, rush, heart
        this.targetX = 0;
        this.targetY = 0;
        this.friction = 0.95;
    }

    getRandomColor() {
        const colors = ['#ff003c', '#ff2d55', '#ffd700', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)] + 'aa';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (Math.random() > 0.95 || this.mode === 'heart') {
            // Draw heart
            const s = this.size * 2;
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x, this.y - s/2, this.x - s, this.y - s/2, this.x - s, this.y);
            ctx.bezierCurveTo(this.x - s, this.y + s/2, this.x, this.y + s, this.x, this.y + s * 1.5);
            ctx.bezierCurveTo(this.x, this.y + s, this.x + s, this.y + s/2, this.x + s, this.y);
            ctx.bezierCurveTo(this.x + s, this.y - s/2, this.x, this.y - s/2, this.x, this.y);
        } else {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        }
        ctx.fill();
    }

    update() {
        if (this.mode === 'float') {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;

            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * 5;
                this.y -= Math.sin(angle) * 5;
            }
        } else if (this.mode === 'heart') {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            this.x += dx * 0.05;
            this.y += dy * 0.05;
        }
    }
}

function getHeartPoint(t, scale) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x * scale, y: y * scale };
}

function animate() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

exploreBtn.addEventListener('click', () => {
    if (isFinished) return;
    touchCount++;

    // Speed up effect
    particles.forEach(p => {
        p.speedX *= 1.5;
        p.speedY *= 1.5;
    });

    if (touchCount >= 10) {
        isFinished = true;
        triggerClimax();
    } else {
        exploreBtn.innerText = `Touch Heart (${10 - touchCount})`;
        exploreBtn.style.transform = `scale(${1 + touchCount * 0.1})`;
    }
});

function triggerClimax() {
    document.querySelector('.content').style.opacity = '0';
    
    // Dynamic scale based on screen size
    const heartScale = Math.min(width, height) / 45;

    // Add hearts
    for (let i = 0; i < 1500; i++) {
        const p = new Particle();
        p.mode = 'heart';
        p.color = i % 10 === 0 ? '#ffd700' : '#ff003c';
        const t = Math.random() * Math.PI * 2;
        const point = getHeartPoint(t, heartScale);
        p.targetX = width / 2 + point.x;
        p.targetY = height / 2 + point.y;
        p.speedX = (Math.random() - 0.5) * 15;
        p.speedY = (Math.random() - 0.5) * 15;
        particles.push(p);
    }

    // Set all existing particles to heart mode
    particles.forEach((p, i) => {
        p.mode = 'heart';
        const t = (i / particles.length) * Math.PI * 2;
        const point = getHeartPoint(t, heartScale);
        p.targetX = width / 2 + point.x;
        p.targetY = height / 2 + point.y;
    });

    setTimeout(() => {
        const finalDiv = document.createElement('div');
        finalDiv.className = 'final-message';
        finalDiv.innerHTML = `
            <div class="final-text">Sneha, I will always love you.</div>
            <div class="restart-btn" onclick="location.reload()">LOVE AGAIN</div>
        `;
        document.body.appendChild(finalDiv);
        setTimeout(() => finalDiv.style.opacity = '1', 100);
    }, 3000);
}

setInterval(() => {
    if (isFinished) return;
    quoteElement.style.opacity = '0';
    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteElement.innerText = quotes[quoteIndex];
        quoteElement.style.opacity = '1';
    }, 1000);
}, 5000);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', init);

init();
animate();
