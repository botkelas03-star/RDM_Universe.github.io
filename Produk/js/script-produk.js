// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#item-detail-modal");
  const closeBtn = document.querySelector(".modal .close-icon");
  const detailButtons = document.querySelectorAll(".item-detail-button");

  detailButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      modal.querySelector("img").src = "../img/" + this.dataset.img;
      modal.querySelector("h3").textContent = this.dataset.name;
      modal.querySelector("p").textContent = this.dataset.desc;
      modal.querySelector(".produk-price").textContent =
        "IDR " + this.dataset.price;

      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) modal.style.display = "none";
  });
});
