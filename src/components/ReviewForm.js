import React from 'react';
import PropTypes from 'prop-types';

const STAR_NUMBER = 5;

export default class ReviewForm extends React.Component {
  render() {
    const { email, detail, handleChange, setRating, submitReview } = this.props;
    return (
      <form onSubmit={ this.saveEval }>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            data-testid="product-detail-email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        {/* partes do codigo de https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 */}

        <div className="star-rating">
          <p>Avaliação</p>
          {[...Array(STAR_NUMBER)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                data-testid={ `${index}-rating` }
                key={ index }
                index={ index }
                className={ index <= star ? 'on' : 'off' }
                onClick={ (e) => setRating(e, index) }
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>

        <label htmlFor="detail">
          Avaliação detalhada
          <textarea
            id="detail"
            name="detail"
            value={ detail }
            onChange={ handleChange }
            data-testid="product-detail-evaluation"
          />
        </label>
        <button
          type="submit"
          data-testid="submit-review-btn"
          onClick={ submitReview }
        >
          Avaliar
        </button>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  email: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired,
  submitReview: PropTypes.func.isRequired,
};
