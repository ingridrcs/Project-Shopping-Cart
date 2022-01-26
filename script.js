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
// Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/substring
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
// https://github.com/tryber/sd-018-b-project-shopping-cart/pull/53/files

const newSession = document.createElement('section');
  newSession.className = 'total-price';
  newSession.innerHTML = 0;
  const getCart = document.querySelector('.cart');
  
  function finalPrice() {
  let plus = 0;
  getCart.appendChild(newSession);
  addLi.childNodes.forEach((item) => {
    const search = item.innerText.indexOf('$');
    const findPrice = item.innerText.substring(search + 1);
    const lastPrice = parseFloat(findPrice);
    plus += lastPrice;
  });
  newSession.innerText = plus;
}
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(addLi.innerHTML);
  finalPrice();
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
      finalPrice();
    });
  });
}
function emptyLocalStorage() {
  addLi.innerHTML = '';
  saveCartItems(addLi);
  finalPrice();
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
  finalPrice();
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
