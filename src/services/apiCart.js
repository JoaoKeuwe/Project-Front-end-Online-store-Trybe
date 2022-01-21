const SHOPPING_CART_KEY = 'shopping_cart';

// Remove do local storage se houver
if (!JSON.parse(localStorage.getItem(SHOPPING_CART_KEY))) {
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify([]));
}

// lê o local storage
const readShoppingCart = () => JSON.parse(localStorage.getItem(SHOPPING_CART_KEY));

// salva para o local storage
const saveToShoppingCart = (product) => localStorage
  .setItem(SHOPPING_CART_KEY, JSON.stringify(product));

// função que retorna o shopping cart
export const getShoppingCart = () => readShoppingCart();

// função que adiciona um novo produto ao shopping cart
export const addToShoppingCart = (product) => {
  if (product) {
    const { id, title } = product;
    const productToCart = {
      id,
      title,
      qtd: 1,
    };
    const shoppingCart = readShoppingCart();
    const productFound = shoppingCart.find((productInCart) => productInCart.id === id);
    if (productFound) {
      const qtdAdded = shoppingCart.map((productInCart) => {
        if (productInCart.id === id) {
          productInCart.qtd += 1;
        }
        return productInCart;
      });
      saveToShoppingCart([...qtdAdded]);
    } else {
      saveToShoppingCart([...shoppingCart, productToCart]);
    }
  }
};

// função que remove o item do shopping cart
export const removeFromShoppingCart = (product) => {
  const shoppingCart = readShoppingCart();
  const { id } = product;
  const productFound = shoppingCart.find((productInCart) => productInCart.id === id);
  if (productFound) {
    const qtdAdded = shoppingCart.map((productInCart) => {
      if (productInCart.id === id) {
        productInCart.qtd -= 1;
      }
      return productInCart;
    });
    saveToShoppingCart([...qtdAdded]);
  } else {
    saveToShoppingCart(shoppingCart.filter((s) => s.id !== product.id));
  }
};
