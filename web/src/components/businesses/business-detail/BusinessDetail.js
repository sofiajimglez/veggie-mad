import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import businessService from '../../../services/businesses';
import ReviewForm from '../business-actions/ReviewForm';
import ReviewCard from '../../reviews/ReviewCard';

export default function BusinessDetail() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState();
  const [seeReviewForm, setSeeReviewForm] = useState(false);

  useEffect(() => {
    businessService.get(businessId)
      .then(business => setBusiness(business))
      .catch(error => {
        console.error(error);
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          navigate('/');
        }
      })
  }, [businessId]);

  if (!business) {
    return <p><i className='fa fa-gear fa-spin'></i>Cargando...</p>
  } else {
    return (
      <>
        {business?.description && <div className='row mb-5'>
          <div className='col-sm-12 col-md-4 me-5 border-end border-dark border-5'>
            <h3>Descripción</h3>
          </div>
          <div className='col-sm-12 col-md-6'>
          <p>{business.description}</p>
          </div>
        </div>
        }

        {business?.tags.length > 0 && <div className='row mb-5'>
          <div className='col-sm-12 col-md-4 me-5 border-end border-dark border-5'>
            <h3>Etiquetas</h3>
          </div>
          <div className='col-sm-12 col-md-6'>
            <div className='my-3'>{business?.tags.map((tag, i) => <span className='business-card-tag me-2 pb-2 align-text-middle' key={i}>#{tag}</span>)}</div>
          </div>
        </div>
        }

        <div className='row mb-3'>
          <div className='col-sm-12 col-md-4 me-5 border-end border-dark border-5'>
            <h3>Reseñas</h3>
          </div>
          <div className='col-sm-12 col-md-6'>
            {seeReviewForm ?
              <div>
                <button className='btn btn-main w-100 mb-4' onClick={() => setSeeReviewForm(!seeReviewForm)}>
                  <i class="fa-solid fa-star me-2"></i>Dejar una reseña
                </button>
                <ReviewForm business={businessId} />
              </div>
              : <button className='btn btn-main w-100 mb-4' onClick={() => setSeeReviewForm(!seeReviewForm)}>
                <i class="fa-solid fa-star me-2"></i>Dejar una reseña
              </button>
            }
            {business.reviews.length > 0 ? business.reviews.map(review => <ReviewCard review={review} key={review.id} user={business} />) :
              <div className="card-body w-100">
                <p className='mb-0 fw-lighter'>Todavía no hay reseñas para este establecimiento. ¡Sé el primero en dejar una! ✍🏻</p>
              </div>
            }
          </div>
        </div>
      </>
    )

  }

}
