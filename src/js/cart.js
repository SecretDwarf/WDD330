import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");

  if (cartItems !== null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item)).join("");
    productList.innerHTML = htmlItems;

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
      <img src="${item.Image}" alt="${item.Name}" />
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
    localStorage.setItem("so-cart", JSON.stringify(updatedCart));
    renderCartContents();
  }
}

renderCartContents();
