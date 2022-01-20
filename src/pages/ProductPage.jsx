import React from 'react';
import PropTypes from 'prop-types';
import { getNameProducts } from '../services/api';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getNameProducts(id).then((response) => this.setState({ produto: response }));
  }

  render() {
    const { produto } = this.state;
    return (
      <>
        <h2 data-testid="product-detail-name">
          {produto.title}

        </h2>
        <img src={ produto.thumbnail } alt="" />
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
