import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class CategList extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.handleCategories();
  }

  // Salva o retorno de getCategories no estado categories
  handleCategories() {
    getCategories().then((categories) => {
      this.setState({
        categories,
      });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <nav>
        {/* Renderiza as categorias em um botão e adiciona link para cada categoria */}
        {categories.map((category) => (
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
      </nav>
    );
  }
}

export default CategList;
