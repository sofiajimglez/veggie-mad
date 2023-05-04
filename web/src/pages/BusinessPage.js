import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import BusinessDetail from '../components/businesses/business-detail/BusinessDetail';
import BusinessDetailHeader from '../components/businesses/business-detail/BusinessDetailHeader';

export default function BusinessPage() {
  return (
    <>
    <BusinessDetailHeader />
    <PageLayout title="Encuentra el lugar perfecto para tus planes veganos en la capital">
        <BusinessDetail />
    </PageLayout>
    </>
  )
}
