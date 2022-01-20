require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
// Source: https://jestjs.io/pt-BR/docs/expect,monitoria de Casa de Cambio com Carol e Hugo sobre o uso do fetch e https://jestjs.io/pt-BR/docs/expect#rejects.
// Meus testes nao estavam passando no Evaluator do GitHub, consegui resolver através do slack: https://trybecourse.slack.com/archives/C02HY11SPJP/p1642675773483000
// e https://trybecourse.slack.com/archives/C02HY11SPJP/p1642634735460400
describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  //fail('Teste vazio');
  
  it('Deve testar se fetchProduct é uma função', () => {
    expect(typeof (fetchProducts)).toBe('function');
  });
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Quando chama fetchProducts com "computador", é utilizado o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
  const result = await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Se o retorno da função fetchProducts com "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {   
    expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  });
});
