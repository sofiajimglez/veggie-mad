import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import businessService from '../../../services/businesses';
import Price from '../Price';
import FavForm from '../business-actions/FavForm';
import VisitForm from '../business-actions/VisitForm';

export default function BusinessDetailHeader() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState();
  const [seeVisitForm, setSeeVisitForm] = useState(false);

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
    backgroundPosition: ' center',
    backgroundSize: 'cover',
    color: 'whitesmoke',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndez: 1
  }

  if (!business) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="text-center p-5" style={bgImgStyles}>
        <h1 className="display-5 pt-5">{business?.name}</h1>
        <div className='d-flex justify-content-center'>
          <h5 className='me-3'>{<Price price={business.price} />}</h5>
          <h5>{business?.category}</h5>
          <Price num={business?.price} />
        </div>
        <div className='d-flex justify-content-center my-2'>
          <h5 className='me-3'><i className='fa-solid fa-location-dot me-2'></i>{business?.location.address}</h5>
        </div>
        <div className='d-flex justify-content-center gap-4 mt-2'>
          <Link to={business?.facebookUrl} className='text-white'>
            <h5 className='mb-0'><i className="fa-brands fa-facebook-f"></i></h5>
          </Link>
          <Link to={business?.instagramUrl} className='text-white'>
            <h5 className='mb-0'><i className="fa-brands fa-instagram"></i></h5>
          </Link>
          <Link to={business?.twitterUrl} className='text-white'>
            <h5 className='mb-0'><i className="fa-brands fa-twitter"></i></h5>
          </Link>
        </div>
        <div className='row justify-content-center mt-4'>
          <div className='col-sm-12 col-md-3'>
            <FavForm businessId={businessId} />
          </div>
          <div className='col-sm-12 col-md-3 pb-5'>
            {seeVisitForm ?
              <div>
                <button className='btn btn-main w-100 mb-2' onClick={() => setSeeVisitForm(!seeVisitForm)}>
                  <i class="fa-sharp fa-solid fa-location-dot me-2"></i>Registrar visita
                </button>
                <VisitForm businessId={businessId} />
              </div>
              : <button className='btn btn-main w-100' onClick={() => setSeeVisitForm(!seeVisitForm)}>
                <i class="fa-sharp fa-solid fa-location-dot me-2"></i>Registrar visita
              </button>}
          </div>
        </div>
      </div>
    )
  }
}
