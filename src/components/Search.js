import React from 'react';
import { Redirect } from 'react-router';
import ProductList from './ProductList';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      query: '',
      apiProducts: [],
    };
  }

  handleSearchInput(typeEvent) {
    const input = typeEvent.target.value;
    this.setState({
      query: input,
    });
  }

  handleSearchClick(event) {
    event.preventDefault();
    const { query } = this.state;
    getProductsFromCategoryAndQuery(null, query).then((products) => {
      this.setState({
        apiProducts: products,
      });
    });
  }

  renderCart = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { redirect, apiProducts, query } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="search">
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <input
              data-testid="query-input"
              type="text"
              name="search"
              id="search"
              onChange={ this.handleSearchInput.bind(this) }
              placeholder="Digite algum termo "
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleSearchClick.bind(this) }
          >
            Pesquisar
          </button>
          <button
            type="submit"
            img="search"
            data-testid="shopping-cart-button"
            onClick={ this.renderCart }
          >
            carrinho
          </button>
        </form>
        {redirect && <Redirect to="/ShoppingCart" />}
        <ProductList />

        <div>
          {apiProducts.map((product) => (
            <section key={ product.id }>
              <p data-testid="product">{product.title}</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{product.price}</p>
            </section>
          ))}
        </div>
      </section>
    );
  }
}

export default Search;
