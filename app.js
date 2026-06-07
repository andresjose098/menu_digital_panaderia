const phone = '573001234567'; // Cambia este número por el WhatsApp real de la panadería.
const message = encodeURIComponent('Hola, quiero hacer un pedido en Panadería La Sucursal de Cali.');
const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

const whatsappBtn = document.getElementById('whatsappBtn');
const whatsappBtn2 = document.getElementById('whatsappBtn2');
if (whatsappBtn) whatsappBtn.href = whatsappUrl;
if (whatsappBtn2) whatsappBtn2.href = whatsappUrl;

const products = [
{
  name: 'Pandebono tradicional',
  description: 'Calientico, suave y con queso. Sabor típico valluno.',
  price: '$2.500',
  category: 'panaderia',
  image: 'https://cdn.pixabay.com/photo/2017/06/23/23/57/bread-2436370_1280.jpg'
},
  {
    name: 'Pan de yuca',
    description: 'Perfecto para acompañar café o chocolate.',
    price: '$2.300',
    category: 'panaderia',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Croissant de queso',
    description: 'Masa hojaldrada, dorada y rellena de queso.',
    price: '$5.500',
    category: 'panaderia',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Pan aliñado',
    description: 'Pan fresco artesanal, ideal para llevar a casa.',
    price: '$4.000',
    category: 'panaderia',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Café con leche',
    description: 'Café colombiano recién preparado.',
    price: '$4.000',
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Chocolate caliente',
    description: 'Cremoso, dulce y perfecto para el desayuno.',
    price: '$4.500',
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Avena caleña',
    description: 'Fría, cremosa y refrescante.',
    price: '$5.000',
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Torta de vainilla',
    description: 'Porción de torta suave con crema de la casa.',
    price: '$7.000',
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Milhoja',
    description: 'Capas crocantes con crema pastelera.',
    price: '$6.500',
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Cupcake artesanal',
    description: 'Ideal para detalles, cumpleaños y antojos.',
    price: '$5.000',
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80'
  }
];

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const chips = document.querySelectorAll('.chip');
let currentCategory = 'todos';

function renderProducts() {
  if (!grid || !searchInput) return;

  const term = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(product => {
    const matchesCategory = currentCategory === 'todos' || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
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

if (searchInput) searchInput.addEventListener('input', renderProducts);

document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (!target) return;
    target.classList.add('active');
    target.setAttribute('aria-hidden', 'false');
    document.body.classList.add('panel-open');
  });
});

document.querySelectorAll('.back-btn').forEach(button => {
  button.addEventListener('click', () => {
    const panel = button.closest('.panel');
    if (!panel) return;
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('panel-open');
  });
});

renderProducts();
