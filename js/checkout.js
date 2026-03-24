document.addEventListener("DOMContentLoaded", () => {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex((u) => u.email === currentUser.email);

  if (userIndex !== -1) {
    currentUser = users[userIndex];
  }

  currentUser.addresses = (currentUser.addresses || []).map((addr) => {
    if (typeof addr === "string") {
      return { id: Date.now(), text: addr };
    }
    return addr;
  });

  const cartKey = "cart_" + currentUser.email;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const addressList = document.getElementById("address-list");

  function renderAddresses() {
    addressList.innerHTML = "";

    if (currentUser.addresses.length === 0) {
      addressList.innerHTML = "<p>No address found. Add one.</p>";
      return;
    }

    currentUser.addresses.forEach((addr, index) => {
      addressList.innerHTML += `
        <label class="address-card">
          <input type="radio" name="address" value="${index}" ${
            index === 0 ? "checked" : ""
          }/>
          <span>${addr.text}</span>
        </label>
      `;
    });
  }

  renderAddresses();

  document.getElementById("add-address-btn").addEventListener("click", () => {
    const input = document.getElementById("new-address");
    const newAddress = input.value.trim();

    if (!newAddress) {
      alert("Enter address");
      return;
    }

    currentUser.addresses.push({
      id: Date.now(),
      text: newAddress,
    });

    if (userIndex !== -1) {
      users[userIndex] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    input.value = "";
    renderAddresses();
  });

  // ORDER SUMMARY
  let itemCount = 0;
  let subtotal = 0;

  cart.forEach((item) => {
    itemCount += item.qty;
    subtotal += item.price * item.qty;
  });

  const deliveryFee = 30;
  const total = subtotal + deliveryFee;

  document.getElementById("item-count").innerText = itemCount;
  document.getElementById("subtotal").innerText = "₹" + subtotal;
  document.getElementById("delivery-fee").innerText = "₹" + deliveryFee;
  document.getElementById("total").innerText = "₹" + total;

  document.getElementById("place-order-btn").addEventListener("click", () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }

    const selectedAddress = document.querySelector(
      'input[name="address"]:checked',
    );
    const selectedPayment = document.querySelector(
      'input[name="payment"]:checked',
    );

    if (!selectedAddress) {
      alert("Select address");
      return;
    }

    if (!selectedPayment) {
      alert("Select payment");
      return;
    }

    const address = currentUser.addresses[selectedAddress.value].text;

    const payment = selectedPayment.nextElementSibling.innerText;

    const order = {
      id: Date.now(),
      items: cart,
      address,
      payment,
      subtotal,
      deliveryFee,
      total,
      date: new Date().toLocaleString(),
    };

    const orderKey = "orders_" + currentUser.email;
    let orders = JSON.parse(localStorage.getItem(orderKey)) || [];

    orders.push(order);
    localStorage.setItem(orderKey, JSON.stringify(orders));

    localStorage.removeItem(cartKey);

    localStorage.setItem("latestOrder", JSON.stringify(order));

    window.location.href = "order-confirmation.html";
  });
});
