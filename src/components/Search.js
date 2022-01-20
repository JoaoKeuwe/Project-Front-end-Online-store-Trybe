import React from 'react';

import { Redirect } from 'react-router';

import ProductList from './ProductList';
import { getProductsFromCategoryAndQuery } from '../services/api';


class Search extends React.Component {
  constructor(){
    super();

    this.state = {
      query: '',
      apiProducts: [],
    }
  }

handleSearchInput(typeEvent){
  const input = typeEvent.target.value;
  this.setState({
    query: input,
  })
}

handleSearchClick() {
  const query = this.state
  getProductsFromCategoryAndQuery(null, query).then((products) => {
   this.setState({
    apiProducts: products,
   })
  })
}

  render() {
    const { apiProducts } = this.state;
=======
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.renderCart = this.renderCart.bind(this);
  }

  renderCart = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;

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
              onChange={this.handleSearchInput.bind(this)}
              placeholder="Digite algum termo "
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={this.handleSearchClick.bind(this)}
          >
            Pesquisar
            type="submit"
            img="search"
            data-testid="shopping-cart-button"
            onClick={ this.renderCart }
          >
            carrinho
          </button>
        </form>

        {redirect && <Redirect to="/ShoppingCart" /> }

        <ProductList />
        <div>
          {apiProducts.map((product) => (
                     <section key={product.id}>
                     <p data-testid="product">{product.title}</p>
                     <img src={product.thumbnail} alt={product.title} />
                     <p>{product.price}</p>
                     </section>
          ))}
        </div>
      </section>
    );
  }
}

export default Search;
