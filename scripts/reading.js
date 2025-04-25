document.addEventListener("DOMContentLoaded", function () {
    fetch('data/reading_list.json')
        .then(response => response.json())
        .then(data => {
            const section = document.querySelector('.reading_list');
            data.forEach(book => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <img src="${book.image}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <div class="star-rating" data-rating="${book.rating}">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <p>${book.description}</p>
                    <small>${book.date}</small>
                `;
                section.appendChild(article);
            });

            // Initialize star ratings after articles are added
            initStarRatings();
        });

    // Function to initialize stars
    function initStarRatings() {
        document.querySelectorAll('.star-rating').forEach(rating => {
            const stars = rating.querySelectorAll('span');
            const setRating = (index) => {
                stars.forEach((star, i) => {
                    star.classList.toggle('filled', i < index);
                });
                rating.dataset.rating = index;
            };

            // Initialize with default rating
            setRating(parseInt(rating.dataset.rating));

            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    setRating(index + 1);
                });
            });
        });
    }
});