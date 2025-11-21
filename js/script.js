// Toggle class active untuk humberger menu
const NavbarNav = document.querySelector(".navbar-nav");
// Ketika Menu di Kilk
document.querySelector("#hamburger-menu").onclick = () => {
  NavbarNav.classList.toggle("active");
};

// Toggle class active untuk Search form
const Searchform = document.querySelector(".search-form");
const searchBox = document.querySelector("#Search-Box");

document.querySelector("#search-button").onclick = (e) => {
  Searchform.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active shopping cart
const Shoppingcart = document.querySelector(".shooping-cart");

document.querySelector("#shopping-cart-button").onclick = (e) => {
  Shoppingcart.classList.toggle("active");
  e.preventDefault();
};
// Klik di luar sidebar untuk dihilangkan
const hamburger = document.querySelector("#hamburger-menu");
const searchbutton = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !NavbarNav.contains(e.target)) {
    NavbarNav.classList.remove("active");
  }

  if (!searchbutton.contains(e.target) && !Searchform.contains(e.target)) {
    Searchform.classList.remove("active");
  }
  if (!sc.contains(e.target) && !Shoppingcart.contains(e.target)) {
    Shoppingcart.classList.remove("active");
  }
});

// Modal Box
const itemdetailModal = document.querySelector("#item-detail-modal");
const itemdetailbutton = document.querySelector(".item-detail-button");

itemdetailbutton.onclick = (e) => {
  itemdetailModal.style.display = "flex";
  e.preventDefault();
};

// Klik tombol close (X)
document.querySelector(".close-icon").addEventListener("click", function (e) {
  itemdetailModal.style.display = "none";
  e.preventDefault();
});

// Klik area luar modal untuk menutup
window.addEventListener("click", function (e) {
  if (e.target === itemdetailModal) {
    itemdetailModal.style.display = "none";
  }
});
