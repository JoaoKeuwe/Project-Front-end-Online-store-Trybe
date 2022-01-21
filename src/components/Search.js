import React from 'react';
import { Redirect } from 'react-router';
import CategList from './CategList';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { addToShoppingCart } from '../services/apiCart';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      query: '',
      products: [],
    };
  }

  // Salva value do input no estado query
  handleSearchInput(typeEvent) {
    const input = typeEvent.target.value;
    this.setState({
      query: input,
    });
  }

  // Salva o retorno da API com o parametro query no estado products
  handleSearchClick(event) {
    event.preventDefault();
    const { query } = this.state;
    getProductsFromCategoryAndQuery(null, query).then((products) => {
      this.setState({
        products,
      });
    });
  }

  // salva o produto no LocalStorage
  addToCart = (product) => {
    addToShoppingCart(product);
  }

  // redireciona para a pagina ShoppingCart
  renderCart = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { redirect, products } = this.state;
    return (
      <section>
        {/* form de pesquisa */}
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
        </form>
        {/* Botão Carrinho de Compras */}
        <button
          type="submit"
          img="search"
          data-testid="shopping-cart-button"
          onClick={ this.renderCart }
        >
          Carrinho de Compras
        </button>

        {/* Redireciona caso redirect seja true */}
        {redirect && <Redirect to="/ShoppingCart" />}

        {/* Renderiza as categorias */}
        <CategList />

        {/* Renderiza produtos pesquisados */}
        <div>
          {products.map((product) => (
            <section key={ product.id }>
              <p data-testid="product">{product.title}</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{product.price}</p>
              {/* Botão para adicionar ao carrinho */}
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.addToCart(product) }
              >
                Adicionar ao Carrinho
              </button>
            </section>
          ))}
        </div>
      </section>
    );
  }
}

export default Search;
