import React, { useContext } from 'react';
import usersService from '../../services/users';
import businessService from '../../services/businesses';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthUserStore';

export default function DeleteAccountBtn({ isExpanded }) {
  const { user, onUserChange } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    if (user.role === 'user') {
      usersService.remove(user.id)
        .then(() => {
          onUserChange();
          navigate('/');
          console.info('Account succesfully deleted');
        })
        .catch(error => console.error(error))
    } else if (user.role === 'business') {
      businessService.remove(user.id)
        .then(() => {
          onUserChange();
          navigate('/');
          console.info('Account succesfully deleted')
        })
        .catch(error => console.error(error))
    }
  }

  return (
    <button className='btn btn-second-reverse mb-2' onClick={() => handleDeleteClick()}>
      <i className="fa-solid fa-trash-can"></i>
      {isExpanded ? '' : <span className='mx-2'>Eliminar cuenta</span>}
    </button>
  )
}
