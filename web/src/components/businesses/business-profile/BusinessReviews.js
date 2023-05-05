import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';
import businessService from '../../../services/businesses';
import ReviewCard from '../../reviews/ReviewCard';

export default function BusinessReviews() {

  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);

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
        <div className="alert bg-light-pink w-100">
          <p className='mb-0 fw-lighter'>Aquí mostraremos las reseñas que te dejen nuestros usuarios. ¡Vuelve pronto para leerlas! ✍🏻</p>
        </div>
      }
    </div>
  )
}
