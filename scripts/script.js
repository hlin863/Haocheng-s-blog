document.querySelectorAll('.star-rating').forEach(rating => {
    const stars = rating.querySelectorAll('span');
    const setRating = (index) => {
        stars.forEach((star, i) => {
            star.classList.toggle('filled', i < index);
        });
        console.log("Index: ", index);
        rating.dataset.rating = index;
    };

    // Initialize the rating immediately on page load
    setRating(parseInt(rating.dataset.rating));

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            setRating(index + 1);
        });
    });
});
