import React from 'react';
import { getShoppingCart } from '../services/apiCart';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
      total: 0,
    };
  }

  componentDidMount() {
    this.handleShoppingCart();
  }

  // Pega os dados do Local Storage e salva no state shoppingCart
  handleShoppingCart = () => {
    const shoppingCart = getShoppingCart();
    let total = 0;
    shoppingCart.forEach((product) => { total += product.price * product.qtd; });
    this.setState({
      shoppingCart,
      total,
    });
  }

  render() {
    const { shoppingCart, total } = this.state;
    return (
      <>
        {
          shoppingCart.length > 0 ? (
            shoppingCart.map((product) => (
              <div key={ product.id }>
                <h4 data-testid="shopping-cart-product-name">{ product.title }</h4>
                <h5 data-testid="shopping-cart-product-quantity">{product.qtd}</h5>
              </div>
            ))
          ) : (
            <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
          )
        }
        <h2>{ total }</h2>
        <section>
          <form onSubmit={ console.log('Comprou') }>
            <label htmlFor="fullname">
              <input name="fullname" type="text" data-testid="checkout-fullname" />
            </label>
            <label htmlFor="email">
              <input name="email" type="email" data-testid="checkout-email" />
            </label>
            <label htmlFor="cpf">
              <input name="cpf" type="text" data-testid="checkout-cpf" />
            </label>
            <label htmlFor="phone">
              <input name="phone" type="text" data-testid="checkout-phone" />
            </label>
            <label htmlFor="cep">
              <input name="cep" type="text" data-testid="checkout-cep" />
            </label>
            <label htmlFor="address">
              <input name="address" type="text" data-testid="checkout-address" />
            </label>
            <button type="submit" onClick={ console.log('Clicou') }>Finalizar</button>
          </form>
        </section>
      </>
    );
  }
}

export default Checkout;
