import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthUserStore';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (<Navigate to='/login' replace={true} />);
  } else if (role && user.role !== role) {
    return (<Navigate to='/403' replace={true} />);
  } else {
    return (<>{children}</>)
  }

};
