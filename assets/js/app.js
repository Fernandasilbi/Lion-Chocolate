let cartCount = 0;
        let selectedRating = 0;

        function addToCart() {
            cartCount++;
            document.getElementById('cart-count').textContent = cartCount;
            const cartInfo = document.createElement('p');
            cartInfo.className = 'cart-info';
            cartInfo.textContent = `${productName} - R$ ${price} adicionado ao carrinho para retirada na loja.`;
            document.body.appendChild(cartInfo);
        }

        const stars = document.querySelectorAll('#stars span');
        const ratingsList = document.getElementById('ratings-list');
        const testimonialList = document.getElementById('testimonial-list');

        stars.forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.getAttribute('data-value'));
                highlightStars(selectedRating);
            });
        });

        function highlightStars(rating) {
            stars.forEach(star => {
                star.classList.remove('selected');
                if (parseInt(star.getAttribute('data-value')) <= rating) {
                    star.classList.add('selected');
                }
            });
        }

        function submitRating() {
            if (selectedRating === 0) {
                alert('Por favor, selecione uma quantidade de estrelas!');
                return;
            }

            const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
            ratings.push(selectedRating);
            localStorage.setItem('ratings', JSON.stringify(ratings));

            displayRatings();
            selectedRating = 0;
            highlightStars(selectedRating);
        }

        function displayRatings() {
            ratingsList.innerHTML = '';
            const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
            ratings.forEach(rating => {
                const li = document.createElement('li');
                li.textContent = `Cliente avaliou com ${rating} estrelas.`;
                ratingsList.appendChild(li);
            });
        }

        function submitComment() {
            const commentText = document.getElementById('comment-text').value.trim();
            if (!commentText) {
                alert('Por favor, escreva um comentário.');
                return;
            }

            const comments = JSON.parse(localStorage.getItem('comments') || '[]');
            comments.push(commentText);
            localStorage.setItem('comments', JSON.stringify(comments));

            document.getElementById('comment-text').value = '';
            displayComments();
        }

        function displayComments() {
            testimonialList.innerHTML = '';
            const comments = JSON.parse(localStorage.getItem('comments') || '[]');
            comments.forEach(comment => {
                const div = document.createElement('div');
                div.className = 'testimonial';
                div.innerHTML = `<p>"${comment}"</p>`;
                testimonialList.appendChild(div);
            });
        }
        
        displayRatings();
        displayComments();