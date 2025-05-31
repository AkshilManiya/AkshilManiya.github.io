// Mouse Trail Animation
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    let mouseX = 0, mouseY = 0;
    let trailElements = [];
    let previousPosition = { x: 0, y: 0 };

    // Create initial trail elements
    for (let i = 0; i < 15; i++) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        body.appendChild(trail);
        trailElements.push(trail);

        // Add line elements between dots
        if (i > 0) {
            const line = document.createElement('div');
            line.className = 'trail-line';
            body.appendChild(line);
            trail.line = line;
        }
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        body.classList.add('trail-active');
    });

    // Animation loop
    function animate() {
        let posX = mouseX;
        let posY = mouseY;

        trailElements.forEach((trail, i) => {
            // The first element follows the mouse directly
            if (i === 0) {
                trail.style.left = posX + 'px';
                trail.style.top = posY + 'px';
                trail.style.opacity = '1';
                previousPosition = { x: posX, y: posY };
            } else {
                // Subsequent elements follow the previous one with delay
                const prevTrail = trailElements[i - 1];
                const prevX = parseFloat(prevTrail.style.left);
                const prevY = parseFloat(prevTrail.style.top);

                // Calculate distance for smoother movement
                const dx = previousPosition.x - prevX;
                const dy = previousPosition.y - prevY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Update position with easing
                trail.style.left = (parseFloat(trail.style.left || prevX) + (prevX - parseFloat(trail.style.left || prevX)) * 0.4) + 'px';
                trail.style.top = (parseFloat(trail.style.top || prevY) + (prevY - parseFloat(trail.style.top || prevY)) * 0.4) + 'px';

                // Update opacity based on position
                const opacity = 1 - (i * 0.1);
                trail.style.opacity = opacity.toString();

                // Update line between dots if it exists
                if (trail.line) {
                    const line = trail.line;
                    const currentX = parseFloat(trail.style.left);
                    const currentY = parseFloat(trail.style.top);

                    // Calculate line length and angle
                    const length = Math.sqrt(Math.pow(prevX - currentX, 2) + Math.pow(prevY - currentY, 2));
                    const angle = Math.atan2(prevY - currentY, prevX - currentX) * 180 / Math.PI;

                    // Position and style the line
                    line.style.width = length + 'px';
                    line.style.left = currentX + 'px';
                    line.style.top = currentY + 'px';
                    line.style.transform = `rotate(${angle}deg)`;
                    line.style.opacity = (opacity * 0.7).toString();
                }

                previousPosition = { x: prevX, y: prevY };
            }
        });

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Hide trail when mouse leaves window
    document.addEventListener('mouseout', () => {
        trailElements.forEach(trail => {
            trail.style.opacity = '0';
            if (trail.line) trail.line.style.opacity = '0';
        });
        body.classList.remove('trail-active');
    });
});