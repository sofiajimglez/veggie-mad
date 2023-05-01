import React, { useEffect, useState } from 'react';
import BusinessCard from '../../businesses/BusinessCard';
import usersService from '../../../services/users';

export default function UserVisits({ user }) {

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
        {visits.map(business => <BusinessCard styles='col-sm-12 col-md-4' business={business} key={business.id} />)}
    </div>
  )
}
