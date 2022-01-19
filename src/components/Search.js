import React from 'react';
import { Redirect } from 'react-router';

class Search extends React.Component {
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
              type="text"
              name="search"
              id="search"
              placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
            />
          </label>
          <button
            type="submit"
            img="search"
            data-testid="shopping-cart-button"
            onClick={ this.renderCart }
          >
            carrinho

          </button>
        </form>
        {redirect && <Redirect to="/ShoppingCart" /> }
      </section>
    );
  }
}

export default Search;
