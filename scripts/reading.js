document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.querySelector('.button_panel button');
    if (addBtn) {
        console.log('✅ Button found and binding click handler');
        addBtn.addEventListener('click', addBook);
    } else {
        console.error('❌ Button not found in DOM');
    }
    
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
                    <button type="button" class="remove-btn">Retirer</button>
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

function addBook() {
    /* Grab the user’s data.   
       In the simplest case we still have one input for the title,
       but you can expand this block to pull an image-URL field,
       a synopsis <textarea>, a rating slider, etc. */
    // 1 - get input
    const input     = document.getElementById('bookInput');
    const bookTitle = input.value.trim();
    if (!bookTitle) return;               // nothing typed

    // 2 - find the <section class="reading_list">
    const listSection = document.querySelector('.reading_list');

    // 3 - build the <article>
    const article = document.createElement('article');

    const h3 = document.createElement('h3');
    h3.textContent = bookTitle;
    article.appendChild(h3);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Retirer';
    removeBtn.style.marginLeft = '10px';
    removeBtn.addEventListener('click', () => article.remove());
    article.appendChild(removeBtn);

    // 4 - add the new entry to the page
    listSection.appendChild(article);

    // 5 - reset the form
    input.value = '';
}