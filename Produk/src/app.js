document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Star Chrome RDM VOL 1",
        img: "VOL 1.jpg",
        price: 150000,
        desc: "Kaos ini dibuat dari bahan katun premium yang lembut, adem, dan nyaman dipakai seharian. Cutting-an regular fit memberikan tampilan rapi tanpa mengurangi ruang gerak. Material: 100% Cotton Combed 30s – ringan, adem, dan tidak mudah melar Cutting: Regular fit, nyaman untuk semua aktivitas blon: Plastisol / HD berkualitas tinggi, awet dan solid Finishing: Jahitan rapi overdeck + rantai, meningkatkan durability Cocok untuk: Daily wear, casual outfit, streetwear look",
      },
      {
        id: 2,
        name: "Star Chrome RDM VOL 2",
        img: "VOL 2.jpg",
        price: 150000,
        desc: "Dirancang untuk kamu yang suka tampil simpel tapi tetap standout. Kaos ini memakai bahan katun berkualitas dengan tekstur halus yang terasa nyaman saat menyentuh kulit. Material: 100% Cotton Combed 30s – ringan, adem, dan tidak mudah melar. Cutting: Regular fit, nyaman untuk semua aktivitas. Sablon: Plastisol / HD berkualitas tinggi, awet dan solid. Finishing: Jahitan rapi overdeck + rantai, meningkatkan durability. Cocok untuk: Daily wear, casual outfit, streetwear look",
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) return item;

          item.quantity++;
          item.total = item.quantity * item.price;
          this.quantity++;
          this.total += item.price;
          return item;
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) return item;

          item.quantity--;
          item.total = item.quantity * item.price;
          this.quantity--;
          this.total -= item.price;
          return item;
        });
      } else {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// ====================================================
// Form Validation
// ====================================================

const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  let allFilled = true;

  for (let el of form.elements) {
    if (el.value.trim().length === 0) {
      allFilled = false;
      break;
    }
  }

  checkoutButton.disabled = !allFilled;
  checkoutButton.classList.toggle("disabled", !allFilled);
});

// ====================================================
// Checkout Submit
// ====================================================

checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  data.items = JSON.stringify(Alpine.store("cart").items);

  console.log(data);

  const whatsappMessage = formatMessage(data);
  const url = `https://wa.me/6281234567890?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  window.open(url, "_blank");
});

// ====================================================
// Format WhatsApp Message
// ====================================================

const formatMessage = (obj) => {
  const items = JSON.parse(obj.items)
    .map(
      (item) =>
        `- ${item.name} (${item.quantity} x ${rupiah(item.price)}) = ${rupiah(
          item.total
        )}`
    )
    .join("\n");

  return `
📦 *DATA PEMESANAN*
-----------------------------
👤 Nama: ${obj.nama}
📧 Email: ${obj.email}
📱 No HP: ${obj.phone}

🛍 *Pesanan*:
${items}

💰 Total: ${rupiah(Alpine.store("cart").total)}

Terima kasih sudah berbelanja 🙌
  `;
};

// ====================================================
// Konversi Ke Rupiah (dibuat global agar bisa dipakai Alpine)
// ====================================================

window.rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
