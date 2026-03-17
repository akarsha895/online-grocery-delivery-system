document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const cartKey = "cart_" + currentUser.email;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const cartContainer = document.getElementById("cart-items");
  const itemCount = document.getElementById("item-count");
  const totalPriceEl = document.getElementById("total-price");

  let total = 0;

  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  // EMPTY CART

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    itemCount.innerText = "0";
    totalPriceEl.innerText = "₹0";
    return;
  }

  // LOAD CART ITEMS

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const image = item.image ? item.image : "images/default.png";

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${image}" class="cart-img" />

        <div class="cart-details">
          <h3>${item.name}</h3>
        </div>

        <div class="cart-quantity">
          <input type="number" value="${item.qty}" min="1" max="10"
            onchange="updateQty(${index}, this.value)" />
        </div>

        <div class="cart-price">₹${item.price * item.qty}</div>

        <button class="remove-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;
  });

  itemCount.innerText = cart.length;
  totalPriceEl.innerText = "₹" + total;
});

function removeItem(index) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const cartKey = "cart_" + currentUser.email;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  cart.splice(index, 1);

  localStorage.setItem(cartKey, JSON.stringify(cart));

  location.reload();
}

function updateQty(index, qty) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const cartKey = "cart_" + currentUser.email;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  qty = parseInt(qty);

  if (qty <= 0) qty = 1;

  cart[index].qty = qty;

  localStorage.setItem(cartKey, JSON.stringify(cart));

  location.reload();
}
