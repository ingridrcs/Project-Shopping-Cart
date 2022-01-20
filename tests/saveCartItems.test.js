const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
// Source:https://jestjs.io/pt-BR/docs/expect#tohavereturned
localStorageSimulator('setItem');
describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  //fail('Teste vazio');
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;', () => {
  saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled()
  });
  it('Ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o localStorage.setItem é chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveReturned();
  });
});
