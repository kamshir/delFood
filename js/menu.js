if (localStorage.getItem('restaurant')){
  const restaurant = JSON.parse(localStorage.getItem('restaurant'));

  const cardsMenu = document.querySelector('.cards-menu');

  const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  const changeRestData = (restaurant) => {
    const restaurantTitle = document.querySelector('.restaurant-title');
    restaurantTitle.textContent = restaurant.name;
    const rating = document.querySelector('.rating');
    rating.textContent = restaurant.stars;
    const price = document.querySelector('.text-price');
    price.textContent = restaurant.price;
    const category = document.querySelector('.category');
    category.textContent = restaurant.kitchen;
  }

  const addToCart = (cartItem) => {
    cartArray.push(cartItem);

    localStorage.setItem('cart', JSON.stringify(cartArray));
  }

  const renderItems = (data) => {
    data.forEach(({ id, description, image, name, price }) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">
            ${description}
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
          </div>
        </div>
      `;

      card.querySelector('.button-card-text').addEventListener('click', () => {
        const cartItem = { name, price,
          count: 1
        }

        addToCart(cartItem)
      });

      cardsMenu.append(card);
    });
  }

  changeRestData(restaurant);

  fetch(`https://test-f368b-default-rtdb.firebaseio.com/db/${restaurant.products}`)
  .then(response => response.json())
  .then(data => {
    renderItems(data);
  })
  .catch(error => {
    console.log(error);
  });
} else {
  window.location.href = '/';
}