import React from 'react';
import { getCategories } from '../services/api';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      apiProducts: [],
    };
  }

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories() {
    getCategories().then((products) => {
      this.setState({
        apiProducts: products,
      });
    });
  }

  render() {
    const { apiProducts } = this.state;

    return (
      <section>
        {apiProducts.map((category) => (
          <button
            key={ category.id }
            data-testid="category"
            type="button"
          >
            { category.name }
          </button>
        ))}
      </section>
    );
  }
}

export default ProductList;
