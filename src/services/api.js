const ENDPOINT_CATEG = 'https://api.mercadolibre.com/sites/MLB/categories';
export async function getCategories() {
  const apiCategoryPromise = await fetch(ENDPOINT_CATEG);
  return apiCategoryPromise.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDTPOINT_CATEG_ID = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const ENDTPOINT_QUERY = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  if (categoryId) {
    const response = await fetch(ENDTPOINT_CATEG_ID);
    const data = await response.json();
    return data;
  }
  if (query) {
    const reponse = await fetch(ENDTPOINT_QUERY);
    const data = await reponse.json();
    return data.results;
  }

  const apiCategoryIDPromise = await fetch(ENDTPOINT_CATEG_ID);
  return apiCategoryIDPromise.json();
}
