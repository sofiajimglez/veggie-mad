import React, { useContext } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Header from '../components/home/HeaderHome';
import Categories from '../components/home/Categories';
import BusinessBanner from '../components/home/BusinessBanner';
import PointsBanner from '../components/home/PointsBanner';
import { AuthContext } from '../contexts/AuthUserStore';
import SocialMedia from '../components/home/SocialMedia';

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header user={user} />
      <PageLayout title='¡Bienvenido! • Welcome! • Bem-vindo! • Bienvenue! • Benvenuto! • Willkommen! • 喜ばしい! • 환영하다! • 受欢迎的!' >
        <Categories />
        <BusinessBanner />
        <PointsBanner user={user} />
        <SocialMedia />
      </PageLayout>
    </>
  )
}
