import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import BusinessList from '../components/businesses/BusinessList';

export default function ExplorePage() {
  return (
    <PageLayout title="Descubre todo lo que Madrid tiene reservado para ti">
      <div className='row'>
        <BusinessList />
      </div>
    </PageLayout>
  )
}
