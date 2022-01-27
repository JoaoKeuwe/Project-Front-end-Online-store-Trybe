import React from 'react';
import { Link } from 'react-router-dom';
import
{ getShoppingCart, addToShoppingCart, removeFromShoppingCart } from '../services/apiCart';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
    };
  }

  componentDidMount() {
    this.handleShoppingCart();
  }

  // Pega os dados do Local Storage e salva no state shoppingCart
  handleShoppingCart = () => {
    const shoppingCart = getShoppingCart();
    this.setState({
      shoppingCart,
    });
  }

  // Aumenta a quantidade de produtos no carrinho
  increaseQuantity = (event, product) => {
    const { availableQuantity, qtd } = product;
    if (qtd >= availableQuantity) {
      event.target.disabled = true;
    } else {
      addToShoppingCart(product);
      this.handleShoppingCart();
    }
  }

  // Diminui a quantidade de produtos no carrinho
  decreaseQuantity = (product) => {
    removeFromShoppingCart(product);
    this.handleShoppingCart();
  }

  render() {
    const { shoppingCart } = this.state;
    return (
      shoppingCart.length > 0 ? (
        // Renderiza os produtos que estão no estado shoppingCart na pagina
        <>
          {
            shoppingCart.map((product) => (
              <div key={ product.id }>
                <h4 data-testid="shopping-cart-product-name">{ product.title }</h4>
                <h5 data-testid="shopping-cart-product-quantity">{product.qtd}</h5>
                {/* Botão para aumentar a quantidade do produto no carrinho */}
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ (event) => this.increaseQuantity(event, product) }
                >
                  +
                </button>
                {/* Botão para diminuir a quantidade do produto no carrinho */}
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => this.decreaseQuantity(product) }
                >
                  -
                </button>
              </div>
            ))
          }

          <Link to="/checkout">
            <button
              type="button"
              data-testid="checkout-products"
            >
              Finalizar Compra
            </button>
          </Link>

        </>
      ) : (
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      )
    );
  }
}

export default ShoppingCart;
