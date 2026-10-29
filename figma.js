// ---------- Product data ----------
// Images are loaded from assets/ by position: f1..f5, b1..b4, e1..e8
const flash = [
  { name: "HAVIT HV-G92 Gamepad", price: 120, old: 160, off: 40, stars: 5, n: 88 },
  { name: "AK-900 Wired Keyboard", price: 960, old: 1160, off: 35, stars: 4, n: 75 },
  { name: "IPS LCD Gaming Monitor", price: 370, old: 400, off: 30, stars: 5, n: 99 },
  { name: "S-Series Comfort Chair", price: 375, old: 400, off: 25, stars: 4, n: 99 },
  { name: "S-Series Comfort Chair", price: 375, old: 400, off: 25, stars: 4, n: 99 },
];
const best = [
  { name: "The north coat", price: 260, old: 360, stars: 5, n: 65 },
  { name: "Gucci duffle bag", price: 960, old: 1160, stars: 4, n: 65 },
  { name: "RGB liquid CPU Cooler", price: 160, old: 170, stars: 5, n: 65 },
  { name: "Small BookSelf", price: 360, old: 0, stars: 5, n: 65 },
];
const explore = [
  { name: "Breed Dry Dog Food", price: 100, stars: 3, n: 35 },
  { name: "CANON EOS DSLR Camera", price: 360, stars: 4, n: 95 },
  { name: "ASUS FHD Gaming Laptop", price: 700, stars: 5, n: 325 },
  { name: "Curology Product Set", price: 500, stars: 4, n: 145 },
  { name: "Kids Electric Car", sw: ["#a00", "#db4444"], price: 960, stars: 5, n: 65, badge: "NEW" },
  { name: "Jr. Zoom Soccer Cleats", sw: ["#e5f23a", "#db4444"], price: 1160, stars: 5, n: 35 },
  { name: "GP11 Shooter USB Gamepad", sw: ["#000", "#db4444"], price: 660, stars: 4, n: 55, badge: "NEW" },
  { name: "Quilted Satin Jacket", sw: ["#0d3b2e", "#db4444"], price: 660, stars: 4, n: 55 },
];
const categories = [
  ["📱", "Phones"], ["🖥️", "Computers"], ["⌚", "SmartWatch"],
  ["📷", "Camera"], ["🎧", "HeadPhones"], ["🎮", "Gaming"],
];

// ---------- Helpers ----------
const starText = (n) => "★".repeat(n) + "☆".repeat(5 - n);

function cardHTML(p, inline) {
  const badge = p.off ? `<span class="badge">-${p.off}%</span>`
              : p.badge ? `<span class="badge new">${p.badge}</span>` : "";
  const old = p.old ? `<s>$${p.old}</s>` : "";
  const sw = p.sw ? `<div class="sw">${p.sw.map((c) => `<i style="background:${c}"></i>`).join("")}</div>` : "";
  return `
    <article class="card">
      <div class="img">
        ${badge}
        <div class="icons"><button aria-label="Add to wishlist">♡</button><button aria-label="Quick view">👁</button></div>
        <img src="assets/${p.img}.png" alt="${p.name}">
        <button class="add">Add To Cart</button>
      </div>
      <h3>${p.name}</h3>
      <div class="meta ${inline ? "inline" : ""}"><span class="price">$${p.price}${old}</span>
      <span class="stars" aria-label="${p.stars} out of 5">${starText(p.stars)}<em>(${p.n})</em></span></div>
      ${sw}
    </article>`;
}

const fill = (id, list, pre, inline) => {
  document.getElementById(id).innerHTML = list.map((p, i) => cardHTML({ ...p, img: pre + (i + 1) }, inline)).join("");
};
fill("flash", flash, "f");
fill("best", best, "b");
fill("explore", explore, "e", true);

// Categories (4th one starts highlighted, like the design)
document.getElementById("cats").innerHTML = categories
  .map(([i, n], idx) => `<button class="cat ${idx === 3 ? "on" : ""}"><span>${i}</span>${n}</button>`)
  .join("");
document.getElementById("cats").addEventListener("click", (e) => {
  const btn = e.target.closest(".cat");
  if (!btn) return;
  document.querySelectorAll(".cat").forEach((c) => c.classList.remove("on"));
  btn.classList.add("on");
});

// ---------- Countdown ----------
const end = Date.now() + (3 * 86400 + 23 * 3600 + 19 * 60 + 56) * 1000;
const pad = (n) => String(n).padStart(2, "0");
function tick() {
  let left = Math.max(0, Math.floor((end - Date.now()) / 1000));
  const d = Math.floor(left / 86400); left %= 86400;
  const h = Math.floor(left / 3600); left %= 3600;
  const m = Math.floor(left / 60);
  const s = left % 60;
  document.getElementById("d").textContent = pad(d);
  document.getElementById("h").textContent = pad(h);
  document.getElementById("m").textContent = pad(m);
  document.getElementById("s").textContent = pad(s);
}
tick();
setInterval(tick, 1000);

// ---------- Flash sale arrows ----------
document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const row = document.getElementById(btn.dataset.scroll);
    row.scrollBy({ left: Number(btn.dataset.dir) * 300, behavior: "smooth" });
  });
});

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// ---------- Banner dots ----------
const dots = document.querySelectorAll("#dots span");
dots.forEach((dot, i) => dot.addEventListener("click", () => {
  dots.forEach((d) => d.classList.remove("on"));
  dots[i].classList.add("on");
}));
