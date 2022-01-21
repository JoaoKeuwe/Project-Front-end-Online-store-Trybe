import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { getNameProducts } from '../services/api';
import { addToShoppingCart } from '../services/apiCart';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      produto: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getNameProducts(id).then((response) => this.setState({ produto: response }));
  }

  renderCart = () => {
    this.setState({
      redirect: true,
    });
  };

  addToCart = (product) => {
    console.log(product);
    addToShoppingCart(product);
  }

  render() {
    const { produto, redirect } = this.state;
    return (
      <>
        <button
          type="submit"
          img="search"
          data-testid="shopping-cart-button"
          onClick={ this.renderCart }
        >
          Carrinho de Compras
        </button>
        {redirect && <Redirect to="/ShoppingCart" />}
        <h2 data-testid="product-detail-name">
          {produto.title}
          <p>{`R$ ${produto.price}`}</p>
        </h2>
        <img src={ produto.thumbnail } alt="" />
        {/* Botão para adicionar ao carrinho */}
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(produto) }
        >
          adicionar ao carrinho
        </button>
      </>
    );
  }
}
ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
export default ProductPage;
