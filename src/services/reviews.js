const REVIEWS_KEY = 'reviews';

// Remove do local storage se houver
if (!JSON.parse(localStorage.getItem(REVIEWS_KEY))) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify([]));
}

// lê o local storage
const readReviews = () => JSON.parse(localStorage.getItem(REVIEWS_KEY));

// salva para o local storage
const saveReview = (review) => localStorage
  .setItem(REVIEWS_KEY, JSON.stringify(review));

// função que retorna o shopping cart
export const getReviews = () => readReviews();

// função que adiciona um novo produto ao shopping cart
export const addToReviews = (review) => {
  if (review) {
    const reviews = readReviews();
    saveReview([...reviews, review]);
  }
};

// função que remove o item do shopping cart
export const removeFromShoppingCart = (review) => {
  const shoppingCart = readReviews();
  const { id } = review;
  const productFound = shoppingCart.find((productInCart) => productInCart.id === id);
  if (productFound) {
    const qtdAdded = shoppingCart.map((productInCart) => {
      if (productInCart.id === id) {
        productInCart.qtd -= 1;
      }
      return productInCart;
    });
    saveReview([...qtdAdded]);
  } else {
    saveReview(shoppingCart.filter((s) => s.id !== review.id));
  }
};
