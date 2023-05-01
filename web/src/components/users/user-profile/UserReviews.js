import React, { useState, useEffect } from 'react';
import usersService from '../../../services/users';
import ReviewCard from '../../reviews/ReviewCard';

export default function UserReviews({ user }) {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    usersService.get(user.id)
      .then(user => {
        const reviewsList = user.reviews;
        setReviews(reviewsList);
      })
      .catch(error => console.error(error));
  }, [user.id])

  return (
    <div className="row px-5 py-3">
      <h3 className='mb-4'>Mis reseñas</h3>
      {reviews.map(review => <ReviewCard review={review} key={review.id} />)}
    </div>
  )
}
