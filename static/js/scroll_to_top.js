document.addEventListener('DOMContentLoaded', function () {
            const scrollToTopButton = document.querySelector('.scroll-to-top');
            const scrollableContent = document.querySelector('.scrollable-content');

            // Show/hide button based on scroll position of the scrollable frame
            scrollableContent.addEventListener('scroll', function () {
                if (scrollableContent.scrollTop > 300) {
                    scrollToTopButton.classList.add('visible');
                } else {
                    scrollToTopButton.classList.remove('visible');
                }
            });

            // Smooth scroll to top of the scrollable frame when clicked
            scrollToTopButton.addEventListener('click', function (e) {
                e.preventDefault();
                scrollableContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });