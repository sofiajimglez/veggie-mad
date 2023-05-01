import React, { useEffect, useState } from 'react';
import BusinessCard from '../../businesses/BusinessCard';
import usersService from '../../../services/users';

export default function UserFavs({ user }) {

  const [favs, setFavs] = useState([]);

  useEffect(() => {
    usersService.get(user.id)
      .then(user => {
        const favsList = user?.favs.map(business => business.business);
        setFavs(favsList);
      })
      .catch(error => console.error(error));
  }, [user.id])

  return (
    <div className="row px-5 py-3">
        <h3 className='mb-4'>Mis favoritos</h3>
        {favs.map(business => <BusinessCard styles='col-sm-12 col-md-4' business={business} key={business.id} />)}
    </div>
  )
}
