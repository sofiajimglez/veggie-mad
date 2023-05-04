import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import BusinessList from '../components/businesses/business-list/BusinessList';
import HeaderExplore from '../components/businesses/business-list/HeaderExplore';

export default function ExplorePage() {
  return (
    <>
    <HeaderExplore />
    <PageLayout title="Descubre todo lo que Madrid tiene reservado para ti">
      <div className='row'>
        <BusinessList />
      </div>
    </PageLayout>
    </>
  )
}
