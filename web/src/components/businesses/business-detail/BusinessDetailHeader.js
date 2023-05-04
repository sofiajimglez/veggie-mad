import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import businessService from '../../../services/businesses';

export default function BusinessDetailHeader() {
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
          navigate('/');
        }
      })
  }, [businessId]);

  const bgImgStyles = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${business?.imageUrl})`,
    backgroundPosition:' center',
    backgroundSize: 'cover',
    color: 'whitesmoke',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndez: 1
  }

  if (!business) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="text-center py-5" style={bgImgStyles}>
        <h1 className="display-5">{business.name}</h1>
        <div className="col-lg-6 mx-auto">
          <p>Encuentra el lugar perfecto para tus planes veganos</p>
          <p className="lead mb-4">¿Qué estás buscando?</p>
        </div>
      </div>
    )
  }

}
