import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { addToShoppingCart, getTotalInShoppingCart } from '../services/apiCart';
import ShoppingCartButton from '../components/ShoppingCartButton';

class CategProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      productByCategory: [],
      totalInCart: 0,
    };
  }

  componentDidMount() {
    this.handleProducts();
    this.setTotalInCart();
  }

  // Salva o retorno da API com o parametro id da categoria no estado productByCategory
  handleProducts = async () => {
    const { match: { params: { id } } } = this.props;
    const getProducts = await getProductsFromCategoryAndQuery(id);
    this.setState({
      productByCategory: getProducts,
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
    const { productByCategory, totalInCart } = this.state;
    return (
      <>
        <section>
          <h6 data-testid="shopping-cart-size">{ totalInCart }</h6>
          <ShoppingCartButton />
        </section>
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

            {
              product
                .shipping
                .free_shipping && <p data-testid="free-shipping"> FRETE GRATIS </p>
            }

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
