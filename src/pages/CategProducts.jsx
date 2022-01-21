import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { addToShoppingCart } from '../services/apiCart';

class CategProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      productByCategory: [],
    };
  }

  componentDidMount() {
    this.handleProducts();
  }

  // Salva o retorno da API com o parametro id da categoria no estado productByCategory
  handleProducts = async () => {
    const { match: { params: { id } } } = this.props;
    const getProducts = await getProductsFromCategoryAndQuery(id);
    this.setState({
      productByCategory: getProducts,
    });
  }

  // Salva value do input no estado query
  handleSearchInput(typeEvent) {
    const input = typeEvent.target.value;
    this.setState({
      query: input,
    });
  }

  // Salva o retorno da API com o parametro query no estado productByCategory
  handleSearchClick(event) {
    event.preventDefault();
    const { query } = this.state;
    getProductsFromCategoryAndQuery(null, query).then((products) => {
      this.setState({
        productByCategory: products,
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
    const { productByCategory, redirect } = this.state;
    return (
      <>
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
          {/* Botão Carrinho de Compras */}
          <button
            type="submit"
            img="search"
            data-testid="shopping-cart-button"
            onClick={ this.renderCart }
          >
            Carrinho de Compras
          </button>
        </form>
        {redirect && <Redirect to="/ShoppingCart" />}

        <div>
          {/* Renderiza produtos da categoria selecionada */}
          {productByCategory.map((product) => (
            <section key={ product.id }>
              <Link
                to={ `/ProductPage/${product.id}` }
                data-testid="product-detail-link"
              >
                <p data-testid="product">{product.title}</p>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{product.price}</p>
              </Link>
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
      </>

    );
  }
}

CategProducts.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
export default CategProducts;
