import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthUserStore';

export default function UserProfile() {

  const { user } = useContext(AuthContext);

  return (
    <div>
      <p>{user?.username}</p>
      <p>{user?.email}</p>

    </div>
  )
}
