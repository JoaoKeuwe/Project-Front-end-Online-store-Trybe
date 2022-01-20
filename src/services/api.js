const ENDPOINT_CATEG = 'https://api.mercadolibre.com/sites/MLB/categories';
export async function getCategories() {
  const apiCategoryPromise = await fetch(ENDPOINT_CATEG);
  return apiCategoryPromise.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDTPOINT_CATEG_ID = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const ENDTPOINT_QUERY = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const BOTH_ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

  if (query && categoryId) {
    const reponse = await fetch(BOTH_ENDPOINT);
    const data = await reponse.json();
    return data;
  }

  if (categoryId) {
    const response = await fetch(ENDTPOINT_CATEG_ID);
    const data = await response.json();
    return data.results;
  }
  if (query) {
    const reponse = await fetch(ENDTPOINT_QUERY);
    const data = await reponse.json();
    return data.results;
  }
}
