const WHATSAPP_NUMBER = "32494370324";
const grid = document.getElementById("product-grid");
const euro = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });

function waLink(productName) {
  const message = `Hi, I'm interested in ${productName}. Is this frag still available?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[ch]));
}
function formatPrice(value) {
  if (typeof value === "number" || (typeof value === "string" && value.trim() !== "")) {
    const amount = Number(String(value).replace(/[^0-9.,-]/g, "").replace(",", "."));
    if (Number.isFinite(amount) && amount > 0) return euro.format(amount);
  }
  return "Price on request";
}
function renderProduct(product, index) {
  const name = safeText(product.name || "Coral frag");
  const desc = safeText(product.description || "");
  const status = product.status || "Available";
  const sold = /sold|out of stock/i.test(status);
  const images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  const galleryId = `gallery-${index}`;
  const gallery = images.length
    ? `<div class="product-image" data-gallery="${galleryId}">
         <img class="gallery-image" src="${safeText(images[0])}" alt="${name}" loading="lazy">
         ${images.length > 1 ? `<button class="gallery-arrow previous" type="button" aria-label="Previous photo" data-step="-1">‹</button><button class="gallery-arrow next" type="button" aria-label="Next photo" data-step="1">›</button><span class="gallery-count">1 / ${images.length}</span>` : ""}
         <script type="application/json" class="gallery-data">${JSON.stringify(images).replace(/</g, "\\u003c")}</script>
       </div>`
    : `<div class="product-image"><div class="image-placeholder" aria-label="No product photo">✳</div></div>`;
  return `<article class="product-card">
    ${gallery}
    <div class="product-info">
      <div class="product-category">CORAL FRAG</div>
      <h3>${name}</h3>${desc ? `<p>${desc}</p>` : ""}
      <div class="product-bottom"><div class="product-price">${formatPrice(product.price)}</div>
      <span class="product-status ${sold ? "sold" : ""}">${safeText(status)}</span></div>
      <a class="product-wa" href="${waLink(product.name || "this frag")}" target="_blank" rel="noopener">ENQUIRE ON WHATSAPP <span>↗</span></a>
    </div>
  </article>`;
}
async function loadProducts() {
  try {
    const response = await fetch("data/products.json", { cache: "no-store" });
    if (!response.ok) throw new Error("products.json not found");
    const products = await response.json();
    const visible = products.filter(p => p && p.visible !== false);
    if (!visible.length) {
      grid.innerHTML = `<div class="empty-state"><h3>New frags coming soon.</h3><a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">Contact us on WhatsApp ↗</a></div>`;
      return;
    }
    grid.innerHTML = visible.map(renderProduct).join("");
  } catch (error) {
    grid.innerHTML = `<div class="empty-state"><h3>Collection temporarily unavailable.</h3><a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">Contact us on WhatsApp ↗</a></div>`;
  }
}

grid.addEventListener("click", event => {
  const button = event.target.closest(".gallery-arrow");
  if (!button) return;
  const gallery = button.closest("[data-gallery]");
  const data = JSON.parse(gallery.querySelector(".gallery-data").textContent);
  const image = gallery.querySelector(".gallery-image");
  const count = gallery.querySelector(".gallery-count");
  let current = Number(gallery.dataset.current || 0);
  current = (current + Number(button.dataset.step) + data.length) % data.length;
  gallery.dataset.current = current;
  image.src = data[current];
  count.textContent = `${current + 1} / ${data.length}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
loadProducts();
