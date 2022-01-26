import React from 'react';
import { getReviews } from '../services/reviews';

export default class ReviewsList extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    this.reviewsSetState();
  }

  reviewsSetState = () => {
    const reviews = getReviews();
    this.setState({ reviews });
  }

  render() {
    const { reviews } = this.state;
    // const { productId } = this.props;
    return (
      reviews
        // .filter((review) => (review.id === productId))
        .map((review, index) => (
          <div key={ index }>
            <h3>{review.email}</h3>
            <h4>{review.rating}</h4>
            {review.detail}
          </div>
        ))
    );
  }
}
