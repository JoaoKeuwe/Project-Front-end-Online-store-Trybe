import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { getNameProducts } from '../services/api';
import { addToShoppingCart } from '../services/apiCart';
import { addToReviews } from '../services/reviews';
import ReviewForm from '../components/ReviewForm';
import ReviewsList from '../components/ReviewsList';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      produto: {},
      email: '',
      rating: 0,
      detail: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getNameProducts(id).then((response) => this.setState({ produto: response }));
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  setRating = (e, index) => {
    this.setState({
      rating: index,
    });
  }

  renderCart = () => {
    this.setState({
      redirect: true,
    });
  };

  addToCart = (product) => {
    addToShoppingCart(product);
  }

  submitReview = (e) => {
    e.preventDefault();
    const { produto: { id }, email, rating, detail } = this.state;
    const toSubmit = { id, email, rating, detail };
    addToReviews(toSubmit);
  }

  render() {
    const { produto, redirect, email, rating, detail } = this.state;
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
        <ReviewForm
          email={ email }
          rating={ rating }
          detail={ detail }
          handleChange={ this.handleChange }
          setRating={ this.setRating }
          submitReview={ this.submitReview }
        />
        <ReviewsList />
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
