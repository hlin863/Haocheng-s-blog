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
    const input = document.getElementById('bookInput');
    const bookName = input.value.trim();

    console.log('📚 Book entered:', bookName); // Debug log

    if (!bookName) return;

    const list = document.getElementById('bookList');
    const item = document.createElement('li');
    item.textContent = bookName;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Retirer";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => list.removeChild(item);

    item.appendChild(removeBtn);
    list.appendChild(item);

    input.value = '';
}