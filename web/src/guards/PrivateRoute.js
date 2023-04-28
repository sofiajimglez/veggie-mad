import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthUserStore';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <>{user ? children : <Navigate to='/login' replace={true} />}</>
  )
};
