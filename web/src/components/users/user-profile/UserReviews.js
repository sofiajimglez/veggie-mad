import React, { useState, useEffect, useContext } from 'react';
import usersService from '../../../services/users';
import ReviewCard from '../../reviews/ReviewCard';
import { AuthContext } from '../../../contexts/AuthUserStore';

export default function UserReviews() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    usersService.get(user.id)
      .then(user => {
        const reviewsList = user?.reviews;
        setReviews(reviewsList);
      })
      .catch(error => console.error(error));
  }, [user.id])

  return (
    <div className="row px-5 py-3">
      <h3 className='mb-4'>Mis reseñas</h3>
      {reviews.length > 0 ? reviews.map(review => <ReviewCard review={review} user={user} key={review.id} />) :
        <div className="alert alert-info w-100">
          <p className='mb-0 fw-lighter'>Aquí mostraremos las reseñas que dejes en los establecimientos. ¡Vuelve cuando hayas escrito alguna! ✍🏻</p>
        </div>
      }
    </div>
  )
}
