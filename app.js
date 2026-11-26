// Datos del portafolio de productos (Diapositiva 5)
const productsData = [
  {
    id: 1,
    name: "Pepsi Clásica",
    category: "clasica",
    badge: "MÁS VENDIDO",
    badgeClass: "",
    canClass: "can-classic",
    shortDesc: "La versión clásica de la cola con su sabor original.",
    fullDesc: "Refresco carbonatado tipo cola con el equilibrio icónico de dulzor y frescura que distingue a Pepsi en todo el mundo.",
    price: 3.50,
    format: "Lata 355 ml"
  },
  {
    id: 2,
    name: "Pepsi Zero Sugar",
    category: "sin-azucar",
    badge: "0% AZÚCAR",
    badgeClass: "zero",
    canClass: "can-zero",
    shortDesc: "Alternativa sin azúcar con máximo sabor intenso.",
    fullDesc: "Diseñada para quienes buscan todo el carácter refrescante de Pepsi con cero calorías y cero azúcar.",
    price: 3.50,
    format: "Lata 355 ml"
  },
  {
    id: 3,
    name: "Diet Pepsi",
    category: "sin-azucar",
    badge: "LIGHT",
    badgeClass: "",
    canClass: "can-diet",
    shortDesc: "Variante dietética ligera en mercados internacionales.",
    fullDesc: "Fórmula ligera y burbujeante creada como pionera en opciones bajas en calorías dentro del portafolio.",
    price: 3.80,
    format: "Lata 355 ml"
  },
  {
    id: 4,
    name: "Pepsi Wild Cherry",
    category: "sabores",
    badge: "SABOR CEREZA",
    badgeClass: "cherry",
    canClass: "can-cherry",
    shortDesc: "Variante con un toque dulce y audaz de cereza.",
    fullDesc: "Combina el sabor tradicional de cola con notas intensas de cereza silvestre para una experiencia diferente.",
    price: 4.20,
    format: "Lata 355 ml"
  }
];

// Datos de la línea de tiempo (Diapositiva 3)
const timelineData = [
  {
    year: "1893",
    short: "Caleb Bradham crea “Brad’s Drink”.",
    detail: "En New Bern, Carolina del Norte, el farmacéutico Caleb Bradham formula una bebida refrescante y digestiva llamada originalmente 'Brad’s Drink'.",
    icon: "ph-flask"
  },
  {
    year: "1898",
    short: "La bebida adopta el nombre Pepsi-Cola.",
    detail: "Tras ganar popularidad local, la fórmula pasa a llamarse oficialmente Pepsi-Cola, sentando las bases de una marca icónica.",
    icon: "ph-tag"
  },
  {
    year: "1965",
    short: "Pepsi-Cola y Frito-Lay forman PepsiCo.",
    detail: "La fusión estratégica entre Pepsi-Cola y Frito-Lay da origen a PepsiCo, creando uno de los gigantes globales de alimentos y bebidas.",
    icon: "ph-buildings"
  },
  {
    year: "2023",
    short: "La marca presenta una nueva identidad.",
    detail: "Con motivo de su 125 aniversario, Pepsi lanza una identidad visual audaz con tipografía centrada y paleta de alto contraste.",
    icon: "ph-sparkle"
  }
];

// Estado del carrito
let cart = [];

// Referencias al DOM
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");
const timelineNodes = document.getElementById("timelineNodes");
const timelineDetail = document.getElementById("timelineDetail");

// Renderizar productos en tarjetas estilo e-commerce
function renderProducts(list) {
  if (list.length === 0) {
    productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding:30px;">No se encontraron productos con ese criterio.</p>`;
    return;
  }

  productsGrid.innerHTML = list.map(prod => `
    <article class="product-card">
      <span class="product-badge ${prod.badgeClass}">${prod.badge}</span>
      <div class="product-img-box" onclick="openQuickView(${prod.id})">
        <div class="can-graphic ${prod.canClass}">
          <div class="can-circle-mini"></div>
          <span style="font-size:0.8rem; letter-spacing:1px;">PEPSI</span>
        </div>
      </div>
      <div>
        <h3 class="product-title">${prod.name}</h3>
        <p class="product-desc">${prod.shortDesc}</p>
        <div class="product-price-row">
          <span class="price-now">S/ ${prod.price.toFixed(2)}</span>
          <span class="price-unit">${prod.format}</span>
        </div>
        <div class="card-actions">
          <button class="btn-add-cart" onclick="addToCart(${prod.id})">
            <i class="ph ph-shopping-cart-simple"></i> Agregar
          </button>
          <button class="btn-quick-view" onclick="openQuickView(${prod.id})" title="Vista rápida">
            <i class="ph ph-eye"></i>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// Filtros de categoría de producto
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.filter;
    const filtered = category === "all"
      ? productsData
      : productsData.filter(p => p.category === category);
    renderProducts(filtered);
  });
});

// Buscador en tiempo real estilo retail
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase().trim();
  const filtered = productsData.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.shortDesc.toLowerCase().includes(term)
  );
  renderProducts(filtered);
});

// Renderizar Línea de Tiempo interactiva
function renderTimeline(activeIndex = 0) {
  timelineNodes.innerHTML = timelineData.map((item, idx) => `
    <div class="timeline-node ${idx === activeIndex ? "active" : ""}" onclick="renderTimeline(${idx})">
      <div class="year-circle">${item.year}</div>
      <p>${item.short}</p>
    </div>
  `).join("");

  const current = timelineData[activeIndex];
  timelineDetail.innerHTML = `
    <div class="timeline-detail-icon"><i class="ph ${current.icon}"></i></div>
    <div>
      <span class="section-tag">HITO HISTÓRICO · AÑO ${current.year}</span>
      <h3>${current.short}</h3>
      <p>${current.detail}</p>
    </div>
  `;
}

// Tabs interactivos de Personalidad & Marketing
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Funciones del Carrito de Compras
function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = `S/ ${total.toFixed(2)}`;

  const container = document.getElementById("cartItemsContainer");
  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#6b7280; margin-top:40px;">Tu carrito está vacío. Agrega una Pepsi del catálogo.</p>`;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <div>
        <strong>${item.name}</strong>
        <div style="font-size:0.85rem; color:#4b5563;">${item.qty} x S/ ${item.price.toFixed(2)}</div>
      </div>
      <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:#e32934; cursor:pointer; font-weight:700;">
        Quitar
      </button>
    </div>
  `).join("");
}

// Control del Drawer del Carrito
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("openCartBtn").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Agrega al menos un producto para simular tu pedido.");
    return;
  }
  alert("¡Pedido simulado con éxito! Gracias por explorar el portafolio Pepsi.");
  cart = [];
  updateCartUI();
  closeCart();
});

// Modal de Vista Rápida
const productModal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");

function openQuickView(productId) {
  const prod = productsData.find(p => p.id === productId);
  modalBody.innerHTML = `
    <span class="section-tag">${prod.badge}</span>
    <h2 style="margin-bottom:8px;">${prod.name}</h2>
    <p style="color:#4b5563; margin-bottom:16px;">${prod.fullDesc}</p>
    <p style="margin-bottom:16px;"><strong>Presentación:</strong> ${prod.format} · <strong>Precio:</strong> S/ ${prod.price.toFixed(2)}</p>
    <button class="btn-add-cart" onclick="addToCart(${prod.id}); productModal.classList.remove('open');">
      <i class="ph ph-shopping-cart-simple"></i> Agregar al Carrito
    </button>
  `;
  productModal.classList.add("open");
}

document.getElementById("closeModalBtn").addEventListener("click", () => {
  productModal.classList.remove("open");
});

document.getElementById("openHistoryModalBtn").addEventListener("click", () => {
  document.getElementById("historia").scrollIntoView({ behavior: "smooth" });
});

// Inicializar aplicación
renderProducts(productsData);
renderTimeline(0);
updateCartUI();
