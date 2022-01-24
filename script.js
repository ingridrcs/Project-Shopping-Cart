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
  saveCartItems(addLi.innerHTML);
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
      saveCartItems(addLi.innerHTML);
    });
  });
}
function emptyLocalStorage() {
  addLi.innerHTML = '';
  saveCartItems(addLi);
}
function eraseAll() {
const allLi = document.querySelector('.empty-cart');
allLi.addEventListener('click', () => {
const list = document.querySelectorAll('.cart__item');
  return list.forEach((item) => {
    item.remove();
    emptyLocalStorage();
  });
});
}
// Source: Guthias tirou minha dúvida sobre o requisito 4.
function saveOnPage() {
  const saveCard = getSavedCartItems();
  addLi.innerHTML = saveCard;
  addLi.childNodes.forEach((item) => item.addEventListener('click', cartItemClickListener));
}
function loading() {
  const load = document.querySelector('.items');
  const newP = document.createElement('p');
  newP.className = 'loading';
  newP.innerHTML = 'loading...';
  load.appendChild(newP);
}
function removeLoading() {
  const removeLoad = document.querySelector('.loading');
  return removeLoad.remove();
}
async function init() {
  loading();
  const data = await fetchProducts();
  const { results } = data;
  removeLoading();
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
  eraseAll();
  saveOnPage();
};
