import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import businessService from '../../services/businesses';
import FavForm from './business-actions/FavForm';
import ReviewForm from './business-actions/ReviewForm';
import VisitForm from './business-actions/VisitForm';

export default function BusinessDetail() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState();

  useEffect(() => {
    businessService.get(businessId)
      .then(business => setBusiness(business))
      .catch(error => {
        console.error(error);
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          navigate('/explora-madrid');
        }
      })
  }, [businessId]);

  return (
    <>
      {!business ? <p><i className='fa fa-gear fa-spin'></i>Cargando...</p> :
        <div>
          <h1>{business.name}</h1>
          <FavForm businessId={businessId} />
          <h3>Reseñas</h3>
          <ReviewForm business={businessId} />
          <h3>Visita</h3>
          <VisitForm businessId={businessId} />
        </div>
      }
    </>
  )
}
