// Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage e aula do Course 5.4 sobre Web Storage.
const saveCartItems = (item) => {
  localStorage.setItem('cartItems', JSON.stringify(item));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
