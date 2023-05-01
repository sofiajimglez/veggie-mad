import React, { useState, useEffect } from 'react';
import businessService from '../../../services/businesses';
import ReviewCard from '../../reviews/ReviewCard';

export default function BusinessReviews({ user }) {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    businessService.get(user.id)
      .then(user => {
        const reviewsList = user?.reviews;
        setReviews(reviewsList);
      })
      .catch(error => console.error(error));
  }, [user.id])

  return (
    <div className="row px-5 py-3">
      <h3 className='mb-4'>Mis reseñas</h3>
      {reviews.length > 0 ? reviews.map(review => <ReviewCard review={review} key={review.id} user={user} />) :
        <div className="alert alert-info w-100">
          <p className='mb-0 fw-lighter'>Aquí mostraremos las reseñas que te dejen nuestros usuarios. ¡Vuelve pronto para leerlas! ✍🏻</p>
        </div>
      }
    </div>
  )
}
