import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';
import businessService from '../../../services/businesses';
import { Link } from 'react-router-dom';

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

  if (!user) {
    return (
      <Link className="btn btn-danger w-100" to='/login'>
        <i className="fa-solid fa-heart me-2"></i>Fav
      </Link>
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
