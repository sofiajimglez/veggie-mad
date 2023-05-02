import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import BusinessDetail from '../components/businesses/BusinessDetail';

export default function BusinessPage() {
  return (
    <PageLayout title="Descubre todo lo que Madrid tiene reservado para ti">
        <BusinessDetail />
    </PageLayout>
  )
}
