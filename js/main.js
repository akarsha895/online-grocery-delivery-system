document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.getElementById("nav-links");
  const navUser = document.getElementById("nav-user");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!navLinks || !navUser) return;

  navLinks.innerHTML = `
    <a href="index.html">Home</a>
    <a href="products.html">Products</a>
    <a href="cart.html">Cart</a>
  `;

  if (currentUser) {
    navUser.innerHTML = `
      <span class="user-name">${currentUser.name}</span>
      <a href="#" class="logout-btn" onclick="logout()">Logout</a>
    `;
  } else {
    navUser.innerHTML = `
      <a href="login.html">Login</a>
      <a href="sign-up.html">Sign Up</a>
    `;
  }

  const links = document.querySelectorAll(".navbar a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged out successfully");
  window.location.href = "login.html";
}
