import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';
import businessService from '../../../services/businesses';
import { Link } from 'react-router-dom';

export default function FavForm({ businessId }) {

  const { user, onUserChange } = useContext(AuthContext);
  const [isFav, setIsFaved] = useState();
  
  const handleToggleFav = async () => {
    try {
      console.debug('Toggling fav...');
      const updatedUser = await businessService.fav(businessId);
      onUserChange(updatedUser);
      setIsFaved(!isFav);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    businessService.checkFav(businessId)
      .then(response => setIsFaved(response.isFav))
      .catch(error => console.error(error))
  }, [businessId]);

  if (!user) {
    return (
      <Link className="btn btn-second w-100" to='/login'>
        <i className="fa-solid fa-heart me-2"></i>Me gusta
      </Link>
    )
  } else if (user.role === 'user' && !isFav) {
    return (
      <button type='submit' className='btn btn-second w-100' onClick={handleToggleFav}>
        <i className="fa-solid fa-heart me-2"></i>Me gusta
      </button>
    )
  } else if (user.role === 'user' && isFav) {
    return (
      <button type='submit' className='btn btn-second w-100' onClick={handleToggleFav}>
        <i className="fa-solid fa-heart me-2"></i>Ya no me gusta
      </button>
    )
  } else {
    return <></>
  }

  // <button type='submit' className='btn btn-danger w-100'><i className="fa-solid fa-circle-xmark me-2"></i>Quitar de favoritos</button>

}
