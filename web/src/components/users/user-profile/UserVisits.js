import React, { useEffect, useState, useContext } from 'react';
import BusinessCard from '../../businesses/BusinessCard';
import usersService from '../../../services/users';
import { AuthContext } from '../../../contexts/AuthUserStore';

export default function UserVisits() {
  const { user } = useContext(AuthContext);
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    usersService.get(user.id)
      .then(user => {
        const visitsList = user?.visits?.map(business => business.business);
        setVisits(visitsList);
      })
      .catch(error => console.error(error));
  }, [user.id])

  return (
    <div className="row px-5 py-3">
      <h3 className='mb-4'>Mis lugares visitados</h3>
      {visits.length > 0 ? visits.map(business => <BusinessCard styles='col-sm-12 col-md-4' business={business} key={business.id} />) :
        <div className="alert alert-info w-100">
          <p className='mb-0 fw-lighter'>Aquí mostraremos los lugares que marques como visitados. Recuerda que para marcar un sitio como visitado necesitarás su código de veggieMAD. ¡Recuerda solicitarlo durante tu visita! 😉</p>
        </div>

      }
    </div>
  )
}
