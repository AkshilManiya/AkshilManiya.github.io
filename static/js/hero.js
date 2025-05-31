document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.illu-container');
    const logo = document.getElementById('logo');

    // Create 50 floating particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 10 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const colorVal = Math.random() > 0.5 ?
            `rgba(55, 118, 171, ${Math.random() * 0.2 + 0.1})` :
            `rgba(255, 212, 59, ${Math.random() * 0.2 + 0.1})`;

        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.background = colorVal;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

        container.appendChild(particle);
    }

    // Mouse move effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Logo follows mouse subtly
        logo.style.transform = `
                    translate(${(x - 0.5) * 30}px, ${(y - 0.5) * 30}px)
                    rotate(${(x - 0.5) * 10}deg)
                `;

        // Glow follows mouse more dramatically
        const glows = document.querySelectorAll('.glow');
        glows.forEach((glow, i) => {
            const factor = i === 0 ? 40 : 60;
            glow.style.transform = `
                        translate(${(x - 0.5) * factor}px, ${(y - 0.5) * factor}px)
                        scale(${1 + (y - 0.5) * 0.1})
                    `;
        });
    });

    // Mouse leave resets position
    document.addEventListener('mouseleave', () => {
        logo.style.transform = 'translate(0, 0) rotate(0deg)';
        const glows = document.querySelectorAll('.glow');
        glows.forEach(glow => {
            glow.style.transform = 'translate(0, 0)';
        });
    });

    // Handle resize
    const canvas = document.createElement('canvas');
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
});