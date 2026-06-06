const phone = '573001234567'; // Cambia este número por el WhatsApp real de la panadería.
const message = encodeURIComponent('Hola, quiero hacer un pedido en Panadería La Sucursal de Cali.');
const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

document.getElementById('whatsappBtn').href = whatsappUrl;
document.getElementById('whatsappBtn2').href = whatsappUrl;

const products = [
  {
    name: 'Pandebono tradicional',
    description: 'Calientico, suave y con queso. Sabor típico valluno.',
    price: '$2.500',
    category: 'panaderia',
    icon: '🧀'
  },
  {
    name: 'Pan de yuca',
    description: 'Perfecto para acompañar café o chocolate.',
    price: '$2.300',
    category: 'panaderia',
    icon: '🥯'
  },
  {
    name: 'Croissant de queso',
    description: 'Masa hojaldrada, dorada y rellena de queso.',
    price: '$5.500',
    category: 'panaderia',
    icon: '🥐'
  },
  {
    name: 'Pan aliñado',
    description: 'Pan fresco artesanal, ideal para llevar a casa.',
    price: '$4.000',
    category: 'panaderia',
    icon: '🥖'
  },
  {
    name: 'Café con leche',
    description: 'Café colombiano recién preparado.',
    price: '$4.000',
    category: 'bebidas',
    icon: '☕'
  },
  {
    name: 'Chocolate caliente',
    description: 'Cremoso, dulce y perfecto para el desayuno.',
    price: '$4.500',
    category: 'bebidas',
    icon: '🍫'
  },
  {
    name: 'Avena caleña',
    description: 'Fría, cremosa y refrescante.',
    price: '$5.000',
    category: 'bebidas',
    icon: '🥛'
  },
  {
    name: 'Torta de vainilla',
    description: 'Porción de torta suave con crema de la casa.',
    price: '$7.000',
    category: 'postres',
    icon: '🍰'
  },
  {
    name: 'Milhoja',
    description: 'Capas crocantes con crema pastelera.',
    price: '$6.500',
    category: 'postres',
    icon: '🥮'
  },
  {
    name: 'Cupcake artesanal',
    description: 'Ideal para detalles, cumpleaños y antojos.',
    price: '$5.000',
    category: 'postres',
    icon: '🧁'
  }
];

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const chips = document.querySelectorAll('.chip');
let currentCategory = 'todos';

function renderProducts() {
  const term = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(product => {
    const matchesCategory = currentCategory === 'todos' || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-img">${product.icon}</div>
      <div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price">${product.price}</span>
      </div>
    </article>
  `).join('');

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="list-card"><h3>No encontramos productos</h3><p>Intenta buscar con otra palabra.</p></div>`;
  }
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(item => item.classList.remove('active'));
    chip.classList.add('active');
    currentCategory = chip.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener('input', renderProducts);

document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (target) target.classList.add('active');
  });
});

document.querySelectorAll('.back-btn').forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.panel').classList.remove('active');
  });
});

renderProducts();
