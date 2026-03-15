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
    
    // Intensify on each click
    particles.forEach(p => {
        p.velocity += 0.2;
        p.density += 2;
    });

    if (touchCount >= 10) {
        triggerClimax();
    } else {
        // Feedback on click
        exploreBtn.innerText = `Touch Heart (${10 - touchCount})`;
        exploreBtn.style.transform = `scale(${1 + touchCount * 0.05})`;
    }
});

function triggerClimax() {
    isFinished = true;
    document.body.classList.add('climax');
    document.querySelector('.content').style.opacity = '0';
    
    // Explosion of particles
    particles.forEach(p => {
        p.velocity = (Math.random() - 0.5) * 20;
        p.spin = (Math.random() - 0.5) * 1;
        p.color = '#ff003c';
        p.size *= 3;
    });

    setTimeout(() => {
        // Show final message
        document.body.innerHTML += `
            <div id="finalMessage" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:100; color:#ff003c; font-family:'Playfair Display', serif; font-size:5vw; text-align:center; opacity:0; transition:opacity 2s ease;">
                Sneha, I Love You Forever.
                <br>
                <span style="font-size:1.5rem; cursor:pointer; color:#888;" onclick="resetExperience()">Restart</span>
            </div>
        `;
        setTimeout(() => {
            document.getElementById('finalMessage').style.opacity = '1';
        }, 100);
    }, 2000);
}

function resetExperience() {
    location.reload(); // Simplest way to restart Level 1 with all states cleared
}

init();
animate();
