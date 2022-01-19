const ENDPOINT_CATEG = 'https://api.mercadolibre.com/sites/MLB/categories';
export async function getCategories() {
  const apiCategoryPromise = await fetch(ENDPOINT_CATEG);
  return apiCategoryPromise.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDTPOINT_CATEG_ID = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const ENDTPOINT_QUERY = `https://api.mercadolibre.com/sites/MLB/search?category=${query}`;

  if (categoryId) {
    const apiCategoryPromiseID = await fetch(ENDTPOINT_CATEG_ID);
    return apiCategoryPromiseID.json();
  }
  if (query) {
    const apiCategoryPromiseQUERY = await fetch(ENDTPOINT_QUERY);
    return apiCategoryPromiseQUERY.json();
  }

  const apiCategoryIDPromise = await fetch(ENDTPOINT_CATEG_ID);
  return apiCategoryIDPromise.json();
}
