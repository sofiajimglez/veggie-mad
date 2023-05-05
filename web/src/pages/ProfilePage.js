import React, { useContext } from 'react';
import UserProfile from '../components/users/user-profile/UserProfile';
import BusinessProfile from '../components/businesses/business-profile/BusinessProfile';
import PageLayout from '../components/layout/PageLayout';
import { AuthContext } from '../contexts/AuthUserStore';

export default function ProfilePage({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <PageLayout title="Bienvenido a tu espacio personal">
      {user?.role === 'user' && <UserProfile>{ children }</UserProfile>}
      {user?.role === 'business' && <BusinessProfile>{ children }</BusinessProfile>}
    </PageLayout>
  )
}
