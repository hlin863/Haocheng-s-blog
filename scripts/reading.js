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
    const title = document.getElementById('bookInput').value.trim();
    const description = document.getElementById('bookDescription').value.trim();
    const rating = parseInt(document.getElementById('bookRating').value);
    const date = document.getElementById('readDate').value;
    const coverInput = document.getElementById('bookCover');
    const coverFile = coverInput.files[0];

    if (!title) return;

    const listSection = document.querySelector('.reading_list');
    const article = document.createElement('article');

    // Title element
    const h3 = document.createElement('h3');
    h3.textContent = title;

    // Image element
    if (coverFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = title;
            article.insertBefore(img, article.firstChild);
        };
        reader.readAsDataURL(coverFile);
    }

    // Star rating
    const starDiv = document.createElement('div');
    starDiv.classList.add('star-rating');
    starDiv.setAttribute('data-rating', rating);

    for (let i = 0; i < 5; i++) {
        const span = document.createElement('span');
        if (i < rating) span.classList.add('filled');
        starDiv.appendChild(span);
    }

    // Description
    const desc = document.createElement('p');
    desc.textContent = description;

    // Read date
    const dateElem = document.createElement('small');
    if (date) {
        const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        dateElem.textContent = formattedDate;
    }

    // Remove button
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('remove-btn');
    btn.textContent = 'Retirer';
    btn.addEventListener('click', () => article.remove());

    // Append all
    article.appendChild(h3);
    article.appendChild(starDiv);
    article.appendChild(desc);
    article.appendChild(dateElem);
    article.appendChild(btn);

    listSection.appendChild(article);

    // Reset form
    document.getElementById('bookInput').value = '';
    document.getElementById('bookDescription').value = '';
    document.getElementById('bookRating').value = '5';
    document.getElementById('readDate').value = '';
    document.getElementById('bookCover').value = '';
}