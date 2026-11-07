const WHATSAPP_NUMBER = "32494370324";
const grid = document.getElementById("product-grid");
const euro = new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" });

function waLink(productName) {
  const message = `Hallo, ik heb interesse in ${productName}. Is deze frag nog beschikbaar?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[ch]));
}
function renderProduct(product) {
  const name = safeText(product.name || "Coral frag");
  const desc = safeText(product.description || "");
  const status = product.status || "Beschikbaar";
  const sold = status.toLowerCase() === "verkocht";
  const images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  const image = images[0] ? `<img src="${safeText(images[0])}" alt="${name}" loading="lazy">` : `<div class="image-placeholder" aria-label="Nog geen productfoto">✳</div>`;
  const price = Number(product.price) > 0 ? euro.format(Number(product.price)) : "Prijs op aanvraag";
  return `<article class="product-card">
    <div class="product-image">${image}<span class="product-status ${sold ? "sold" : ""}">${safeText(status)}</span></div>
    <div class="product-info">
      <div class="product-category">THE FRAGTORY · CORAL FRAG</div>
      <h3>${name}</h3><p>${desc}</p>
      <div class="product-bottom"><div class="product-price">${price}</div>
      <a class="product-wa" href="${waLink(product.name || "deze frag")}" target="_blank" rel="noopener">WHATSAPP ↗</a></div>
    </div>
  </article>`;
}
async function loadProducts() {
  try {
    const response = await fetch("data/products.json", { cache: "no-store" });
    if (!response.ok) throw new Error("products.json niet gevonden");
    const products = await response.json();
    const visible = products.filter(p => p && p.visible !== false);
    if (!visible.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-mark">✳</div><h3>Onze collectie groeit.</h3><p>Er staan momenteel nog geen koralen online. Neem gerust contact op via WhatsApp voor meer informatie.</p></div>`;
      return;
    }
    grid.innerHTML = visible.map(renderProduct).join("");
  } catch (error) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-mark">✳</div><h3>Onze collectie wordt klaargemaakt.</h3><p>Neem gerust contact op via WhatsApp voor meer informatie.</p></div>`;
  }
}
document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
loadProducts();
