document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.projects-container');
    const projects = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    const dots = document.querySelectorAll('.track-project .dot');

    let currentIndex = 0;
    let projectsPerView = 3;
    const totalProjects = projects.length;

    // Initialize carousel
    function updateCarousel() {
        // Calculate the width of one project card including gap
        const projectWidth = projects[0].offsetWidth +
            parseInt(getComputedStyle(carousel).gap.replace('px', ''));

        // Calculate the transform value
        const transformValue = -currentIndex * projectWidth;
        carousel.style.transform = `translateX(${transformValue}px)`;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Disable/enable navigation buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalProjects - projectsPerView;
    }

    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalProjects - projectsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Responsive adjustments
    function handleResponsive() {
        // Adjust projects per view based on screen size
        if (window.innerWidth <= 768) {
            projectsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            projectsPerView = 2;
        } else {
            projectsPerView = 3;
        }

        updateCarousel();
    }

    // Initial setup
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});