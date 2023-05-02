import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';
import businessService from '../../../services/businesses';

export default function FavForm({ businessId }) {

  const { user, onUserChange } = useContext(AuthContext);

  const handleToggleFav = async () => {
    try {
      console.debug('Toggling fav...');
      const updatedUser = await businessService.fav(businessId);
      onUserChange(updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(user);

  if (!user) {
    return (
      <button className="btn btn-danger w-100" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Inicia sesión para guardar tus favoritos" disabled>
        <i className="fa-solid fa-heart me-2"></i>Fav
      </button>
    )
  } else if (user.role === 'user') {
    return (
      <button type='submit' className='btn btn-danger w-100' onClick={handleToggleFav}>
        <i className="fa-solid fa-heart me-2"></i>Fav
      </button>
    )
  } else {
    return <></>
  }

  // <button type='submit' className='btn btn-danger w-100'><i className="fa-solid fa-circle-xmark me-2"></i>Quitar de favoritos</button>

}
