// Source: O uso do try/catch foi devido a sugestões dos alunos no slack e
// https://ricardo-reis.medium.com/try-catch-tratando-erros-no-javascript-91bcce0b93ae#:~:text=Introdu%C3%A7%C3%A3o%20%C3%A0%20instru%C3%A7%C3%A3o%20try%E2%80%A6,catch&text=Nesta%20instru%C3%A7%C3%A3o%2C%20voc%C3%AA%20coloca%20o,salta%20para%20o%20bloco%20catch%20.
// O uso do 'return error' foi devido a uma dúvida do slack https://trybecourse.slack.com/archives/C02HY11SPJP/p1642634735460400
// que conseguiu solucionar meu problema pois meu teste não estava passando no Evaluator.
const fetchProducts = async (item) => {
  try {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
} catch (error) {
  return error;
}
};
fetchProducts();
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}