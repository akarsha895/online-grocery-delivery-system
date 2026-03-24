// GET CATEGORY FROM URL
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

document.addEventListener("DOMContentLoaded", () => {
  const noResults = document.getElementById("no-results");
  const sections = document.querySelectorAll(".category-section");

  sections.forEach((section) => {
    const category = section.dataset.category;
    const container = section.querySelector(".product-grid");

    const filteredProducts = allProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );

    container.innerHTML = "";

    filteredProducts.forEach((product) => {
      container.innerHTML += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" title="${product.name}" />
        <h3 >${product.name}</h3>
          <p class="price">₹${product.price}</p>

          <input type="number" min="1" value="1" max="10" oninput="validateQty(this)"/>

          <button class="btn" onclick="addToCart(${product.id}, this)">
            Add to Cart
          </button>
        </div>
      `;
    });
  });

  // FILTER BUTTON LOGIC

  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.innerText.toLowerCase();
      const sections = document.querySelectorAll(".category-section");

      sections.forEach((section) => {
        const title = section.querySelector("h2").innerText.toLowerCase();

        if (text === "all" || title.includes(text)) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // HANDLE CATEGORY FROM INDEX PAGE

  if (selectedCategory) {
    sections.forEach((section) => {
      const category = section.dataset.category;

      if (category === selectedCategory) {
        section.style.display = "block";
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        section.style.display = "none";
      }
    });
  }

  // LIVE SEARCH FUNCTIONALITY

  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();

      // PRODUCTS PAGE SEARCH

      const sections = document.querySelectorAll(".category-section");
      if (sections.length > 0) {
        let hasResults = false;

        sections.forEach((section) => {
          const category = section.dataset.category;
          const container = section.querySelector(".product-grid");

          const filtered = allProducts.filter(
            (p) =>
              p.category === category && p.name.toLowerCase().includes(query),
          );

          container.innerHTML = "";

          if (filtered.length === 0) {
            section.style.display = "none";
          } else {
            hasResults = true;
            section.style.display = "block";

            let html = "";
            filtered.forEach((product) => {
              html += `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}" title="${product.name}" />
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <input type="number" min="1" value="1" max="10" oninput="validateQty(this)" />
            <button class="btn" onclick="addToCart(${product.id}, this)">
              Add to Cart
            </button>
          </div>
        `;
            });

            container.innerHTML = html;
          }
        });

        if (noResults) {
          noResults.style.display = hasResults ? "none" : "block";
        }
      }

      // INDEX PAGE SEARCH (Featured products)

      const featuredContainer = document.getElementById("featured-products");

      if (featuredContainer) {
        featuredContainer.innerHTML = "";

        const filtered = allProducts.filter((p) =>
          p.name.toLowerCase().includes(query),
        );
        if (noResults) {
          noResults.style.display = filtered.length === 0 ? "block" : "none";
        }

        filtered.forEach((product) => {
          featuredContainer.innerHTML += `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}" title="${product.name}" />
           <h3 >${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <input type="number" min="1" value="1" max="10" oninput="validateQty(this)" />
            <button class="btn" onclick="addToCart(${product.id}, this)">
              Add to Cart
            </button>
          </div>
        `;
        });
      }
    });
  }

  const searchBtn = document.querySelector(".search-bar .btn");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      searchInput.dispatchEvent(new Event("input"));
    });
  }
});

function addToCart(id, btn) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const cartKey = "cart_" + currentUser.email;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const product = allProducts.find((p) => p.id === id);

  if (!product) return;

  let qty = 1;

  if (btn) {
    const input = btn.closest(".product-card").querySelector("input");
    if (input) {
      qty = parseInt(input.value) || 1;

      if (qty < 1) qty = 1;
      if (qty > 10) qty = 10;
    }
  }

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty += qty;

    if (existing.qty > 10) {
      existing.qty = 10;
    }
  } else {
    cart.push({ ...product, qty });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));

  alert(product.name + " added to cart");

  // reset input
  if (btn) {
    const input = btn.closest(".product-card").querySelector("input");
    if (input) input.value = 1;
  }
}

function validateQty(input) {
  let value = parseInt(input.value);

  if (isNaN(value) || value < 1) {
    input.value = 1;
  } else if (value > 10) {
    input.value = 10;
  }
}

// FEATURED PRODUCTS (INDEX PAGE)

const featuredContainer = document.getElementById("featured-products");

if (featuredContainer) {
  featuredContainer.innerHTML = "";

  featuredProducts.forEach((id) => {
    const product = allProducts.find((p) => p.id === id);

    if (!product) return;

    featuredContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" title="${product.name}" />
     <h3 >${product.name}</h3>
        <p class="price">₹${product.price}</p>

        <input type="number" min="1" value="1" max="10" oninput="validateQty(this)" />

        <button class="btn" onclick="addToCart(${product.id}, this)">
          Add to Cart
        </button>
      </div>
    `;
  });
}
