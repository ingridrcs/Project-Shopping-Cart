// Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage, aula do Course 5.4 sobre Web Storage.
// Source: Monitoria do Thalles
const saveCartItems = (item) => {
  localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
