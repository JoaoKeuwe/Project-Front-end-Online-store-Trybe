import React from 'react';
import { Link } from 'react-router-dom';

export default class ShoppingCartButton extends React.Component {
  render() {
    return (
      <Link to="/shoppingcart">
        <button
          type="button"
          img="search"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </button>
      </Link>
    );
  }
}
