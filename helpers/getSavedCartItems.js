// Source: Aula do Course 5.4 sobre Web Storage e monitoria do Thalles
const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
