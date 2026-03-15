@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

:root {
    --primary-love: #ff003c;
    --deep-crimson: #4a0000;
    --velvet-rose: #2d0010;
    --gold-shimmer: #ffd700;
    --obsidian: #050505;
    --glass-bg: rgba(255, 0, 60, 0.05);
    --glass-border: rgba(255, 255, 255, 0.08);
    --text-color: #ffffff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    user-select: none;
}

body {
    background-color: var(--obsidian);
    color: var(--text-color);
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    transition: background-color 4s cubic-bezier(0.16, 1, 0.3, 1);
}

.vignette {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.95) 100%);
    pointer-events: none;
    z-index: 5;
    transition: opacity 3s ease;
}

.background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(135deg, #050505 0%, #1a0000 100%);
}

#loveCanvas {
    display: block;
    filter: blur(1px);
}

.content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    padding: 4rem;
    text-align: center;
    transition: opacity 1s ease;
}

.logo {
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 12px;
    color: var(--primary-love);
    text-shadow: 0 0 20px rgba(255, 0, 60, 0.6);
    opacity: 0.8;
}

.hero {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 1s ease;
}

.hyper-title {
    font-family: 'Playfair Display', serif;
    font-size: 15vw; /* Even bigger */
    font-weight: 600;
    font-style: italic;
    letter-spacing: -2px;
    line-height: 0.8;
    background: linear-gradient(to bottom, #fff 20%, var(--primary-love) 80%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0.8)); /* Stronger shadow for visibility */
    margin-bottom: 2rem;
    animation: pulseScale 8s ease-in-out infinite;
}

.romantic-quote {
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
    color: #ffd7d7;
    max-width: 800px;
    opacity: 0.9; /* More visible */
    letter-spacing: 1px;
    transition: all 1s ease;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.cta-pulse {
    margin-top: 4rem;
}

button {
    background: transparent;
    border: 1px solid var(--glass-border);
    padding: 1.5rem 4rem;
    color: white;
    font-size: 0.8rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    border-radius: 2px;
    cursor: pointer;
    backdrop-filter: blur(20px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
}

button:hover {
    border-color: var(--primary-love);
    background: rgba(255, 0, 60, 0.1);
    transform: scale(1.1);
    letter-spacing: 6px;
    box-shadow: 0 0 100px rgba(255, 0, 60, 0.2);
}

.floating-aura {
    position: fixed;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 0, 60, 0.1) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 2;
    animation: floatAura 20s infinite alternate linear;
}

footer {
    opacity: 0.2;
    font-size: 0.6rem;
    letter-spacing: 2px;
}

@keyframes pulseScale {
    0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 50px rgba(255, 0, 60, 0.3)); }
    50% { transform: scale(1.05); filter: brightness(1.2) drop-shadow(0 0 80px rgba(255, 0, 60, 0.5)); }
}

@keyframes floatAura {
    from { transform: translate(-70%, -30%); }
    to { transform: translate(-30%, -70%); }
}

.content > * {
    animation: fadeInLarge 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInLarge {
    from { opacity: 0; transform: translateY(100px) scale(0.9); filter: blur(20px); }
    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
