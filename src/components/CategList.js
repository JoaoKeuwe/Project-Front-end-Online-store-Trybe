import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class CategList extends React.Component {
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
          <Link
            key={ category.id }
            to={ `/categproducts/${category.id}` }
          >
            <button
              id={ category.id }
              data-testid="category"
              type="button"
            >
              { category.name }
            </button>
          </Link>
        ))}
      </section>
    );
  }
}

export default CategList;
