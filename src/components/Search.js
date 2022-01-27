import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { addToShoppingCart, getTotalInShoppingCart } from '../services/apiCart';
import ShoppingCartButton from './ShoppingCartButton';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      query: '',
      products: [],
      totalInCart: 0,
    };
  }

  componentDidMount() {
    this.setTotalInCart();
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
    this.setTotalInCart();
  }

  setTotalInCart = () => {
    const totalInCart = getTotalInShoppingCart();
    this.setState({ totalInCart });
  }

  render() {
    const { products, totalInCart } = this.state;
    return (
      <main>
        <header className="header">
          <form>
            <label htmlFor="search">
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
          <h6 data-testid="shopping-cart-size">{ totalInCart }</h6>
          <ShoppingCartButton />
        </header>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
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
      </main>
    );
  }
}

export default Search;
