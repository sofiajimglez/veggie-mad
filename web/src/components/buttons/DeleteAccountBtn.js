import React from 'react';
import usersService from '../../services/users';
import businessService from '../../services/businesses';

export default function DeleteAccountBtn({ user, isExpanded }) {

  const handleDeleteClick = () => {
    if (user.role === 'user') {
      usersService.remove(user.id)
        .then(() => console.info('Account succesfully deleted'))
        .catch(error => console.error(error))
    } else if (user.role === 'business') {
      businessService.remove(user.id)
      .then(() => console.info('Account succesfully deleted'))
      .catch(error => console.error(error))
    }
  }

  return (
    <button className='btn btn-danger mb-2' onClick={() => handleDeleteClick()}>
      <i className="fa-solid fa-trash-can"></i>
      {isExpanded ? '' : <span className='mx-2'>Eliminar cuenta</span>}
    </button>
  )
}
