// const { inherits } = require('mocha/lib/utils');
// const getSavedCartItems = require("./helpers/getSavedCartItems");
// const saveCartItems = require("./helpers/saveCartItems");
// const { fetchItem } = require("./helpers/fetchItem");
const addLi = document.querySelector('.cart__items');
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} 

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
} 
// Source: Consegui fazer o requisito através da ajuda do Mário que explicou passo a passo a ser feito.
async function addProduct() {
  const findButtom = document.querySelectorAll('.item__add');
  return findButtom.forEach((buttom) => {
    buttom.addEventListener('click', async (event) => {
    const itemId = await getSkuFromProductItem(event.target.parentNode);
    const { id: sku, title: name, price: salePrice } = await fetchItem(itemId);
      addLi.appendChild(createCartItemElement({ sku, name, salePrice }));
    });
  });
}

async function init() {
  const data = await fetchProducts();
  const { results } = data;
  console.log(results);
  results.forEach((item) => {
  const {
    id: sku,
    title: name,
    thumbnail: image,
  } = item;
  const elementProduct = createProductItemElement({ sku, name, image });
  const items = document.querySelector('.items');
  items.appendChild(elementProduct);
  });
  addProduct(); 
  }
  
window.onload = () => { 
  init();
};
