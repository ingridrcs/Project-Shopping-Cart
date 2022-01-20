// Source: O uso do try/catch foi devido a sugestões dos alunos no slack.
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