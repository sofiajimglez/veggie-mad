import React, { useContext } from 'react';
import UserProfile from '../components/users/user-profile/UserProfile';
import PageLayout from '../components/layout/PageLayout';
import { AuthContext } from '../contexts/AuthUserStore';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <PageLayout title="Bienvenido a tu espacio personal">
      {user?.role === 'user' && <UserProfile />}
    </PageLayout>
  )
}
