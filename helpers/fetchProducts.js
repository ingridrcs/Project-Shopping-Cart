const fetchProducts = async () => {
  try {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const response = await fetch(url);
  const data = await response.json();
  return data;
} catch (error) {
  throw new Error('You must provide an url');
}
};
fetchProducts();
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}