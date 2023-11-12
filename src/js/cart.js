import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems !== null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Add event listeners to the remove buttons (X icons)
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const productId = this.getAttribute('data-id');
        removeFromCart(productId);
      });
    });
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.ProductId}">
  <span class="remove-item" data-id="${item.ProductId}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeFromCart(productId) {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems !== null) {
    const updatedCart = cartItems.filter(item => item.ProductId !== productId);

    // Update the cart in local storage
    localStorage.setItem("so-cart", JSON.stringify(updatedCart));

    // Re-render the cart
    renderCartContents();
  }
}

renderCartContents();
