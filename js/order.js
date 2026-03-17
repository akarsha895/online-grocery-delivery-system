document.addEventListener("DOMContentLoaded", () => {
  const order = JSON.parse(localStorage.getItem("latestOrder"));
  if (!order) return;

  document.getElementById("order-details").innerHTML = `
    <p><strong>Order ID:</strong> #${order.id}</p>
    <p><strong>Estimated Delivery:</strong> Arriving today</p>
    <p><strong>Delivery Address:</strong> ${order.address}</p>
    <p><strong>Payment Method:</strong> ${order.payment}</p>
  `;

  const container = document.getElementById("order-summary");
  container.innerHTML = "";

  order.items.forEach((item) => {
    container.innerHTML += `
      <div class="summary-item">
        <span>${item.name} x ${item.qty}</span>
        <span>₹${item.price * item.qty}</span>
      </div>
    `;
  });

  container.innerHTML += `
    <hr />
    <div class="summary-item total">
      <span>Total Amount</span>
      <span>₹${order.total}</span>
    </div>
  `;
});
