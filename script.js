const canvas = document.getElementById('loveCanvas');
const ctx = canvas.getContext('2d');
const quoteElement = document.getElementById('quoteStream');
const exploreBtn = document.getElementById('exploreBtn');

let width, height, particles = [];
const particleCount = 200;
const mouse = { x: null, y: null, radius: 200 };

let touchCount = 0;
let isFinished = false;

const quotes = [
    "Sneha, you are my favorite miracle.",
    "Every heartbeat whispers your name, Sneha.",
    "In your eyes, I found my forever home.",
    "Sneha, you make the world feel like magic.",
    "My heart belongs to you, Sneha."
];

let quoteIndex = 0;

window.addEventListener('resize', init);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height + 100);
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 10;
        this.color = `rgba(255, ${Math.random() * 30}, ${Math.random() * 100 + 50}, ${Math.random() * 0.4 + 0.1})`;
        this.velocity = Math.random() * 0.8 + 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.1 - 0.05;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (this.density > 40) {
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x, this.y - 3, this.x - 5, this.y - 3, this.x - 5, this.y);
            ctx.bezierCurveTo(this.x - 5, this.y + 3, this.x, this.y + 5, this.x, this.y + 7);
            ctx.bezierCurveTo(this.x, this.y + 5, this.x + 5, this.y + 3, this.x + 5, this.y);
            ctx.bezierCurveTo(this.x + 5, this.y - 3, this.x, this.y - 3, this.x, this.y);
        } else {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        }
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.y -= this.velocity;
        this.angle += this.spin;
        this.x += Math.sin(this.angle) * 0.5;

        if (this.y < -20) {
            this.y = height + 20;
            this.x = Math.random() * width;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            let directionX = (dx / distance) * force * this.density;
            let directionY = (dy / distance) * force * this.density;
            this.x -= directionX;
            this.y -= directionY;
        }
    }
}

function animate() {
    ctx.fillStyle = isFinished ? 'rgba(255, 255, 255, 0.1)' : 'rgba(5, 5, 5, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

// Quote Streamer
setInterval(() => {
    if (isFinished) return;
    quoteElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteElement.innerText = quotes[quoteIndex];
        quoteElement.style.opacity = '0.6';
        quoteElement.style.transform = 'translateY(0)';
    }, 1000);
}, 6000);

exploreBtn.addEventListener('click', (e) => {
    if (isFinished) return;

    touchCount++;
    
    // Aggressive speed-up
    particles.forEach(p => {
        p.velocity *= 1.4; // 40% increase per click
        p.density += 5;
        // Shift colors towards gold as speed increases
        if (touchCount > 5) {
            p.color = `rgba(255, ${200 + touchCount * 5}, ${Math.random() * 50}, ${0.6 + touchCount * 0.04})`;
        }
    });

    if (touchCount >= 10) {
        triggerClimax();
    } else {
        exploreBtn.innerText = `Touch Heart (${10 - touchCount})`;
        exploreBtn.style.transform = `scale(${1 + touchCount * 0.15}) rotate(${touchCount * 2}deg)`;
        exploreBtn.style.boxShadow = `0 0 ${20 + touchCount * 20}px rgba(255, 0, 60, ${0.2 + touchCount * 0.1})`;
    }
});

function triggerClimax() {
    isFinished = true;
    document.querySelector('.content').style.opacity = '0';
    document.querySelector('.content').style.transform = 'scale(0.8) translateY(-50px)';
    
    // Transform particles into a swirling galaxy of hearts
    particles.forEach((p, i) => {
        p.isGalaxyMember = true;
        p.angleOffset = (i / particles.length) * Math.PI * 2;
        p.distanceFromCenter = Math.random() * 20 + 5;
        p.color = i % 2 === 0 ? '#ff003c' : '#ffd700';
        p.size = Math.random() * 4 + 2;
    });

    // Intensify the "Motion Blur" for the transition
    let blurIntensity = 0.1;
    const climaxInterval = setInterval(() => {
        blurIntensity -= 0.005;
        if (blurIntensity < 0.01) blurIntensity = 0.01;
        
        ctx.fillStyle = `rgba(5, 5, 5, ${blurIntensity})`;
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            p.distanceFromCenter += 2;
            let targetX = width / 2 + Math.cos(p.angleOffset + p.distanceFromCenter * 0.01) * p.distanceFromCenter;
            let targetY = height / 2 + Math.sin(p.angleOffset + p.distanceFromCenter * 0.01) * p.distanceFromCenter;
            
            p.x += (targetX - p.x) * 0.1;
            p.y += (targetY - p.y) * 0.1;
            p.draw();
        });

        if (blurIntensity <= 0.01 && particles[0].distanceFromCenter > width) {
            clearInterval(climaxInterval);
            showFinalMessage();
        }
    }, 16);
}

function showFinalMessage() {
    const finalMsg = document.createElement('div');
    finalMsg.id = "finalMessage";
    finalMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        color: #fff;
        font-family: 'Playfair Display', serif;
        font-size: 6vw;
        letter-spacing: 2px;
        text-align: center;
        opacity: 0;
        transition: all 3s cubic-bezier(0.16, 1, 0.3, 1);
        text-shadow: 0 0 50px rgba(255, 0, 60, 0.8);
    `;
    finalMsg.innerHTML = `
        <span style="display:block; transform:translateY(20px); transition:inherit;">Sneha, You Are My Galaxy.</span>
        <span style="display:block; font-size:1.2rem; margin-top:2rem; cursor:pointer; color:#ff003c; opacity:0.6; letter-spacing:8px;" onclick="resetExperience()">LOVE AGAIN</span>
    `;
    document.body.appendChild(finalMsg);
    
    setTimeout(() => {
        finalMsg.style.opacity = '1';
        finalMsg.querySelector('span').style.transform = 'translateY(0)';
    }, 500);
}

function resetExperience() {
    location.reload(); // Simplest way to restart Level 1 with all states cleared
}

init();
animate();
