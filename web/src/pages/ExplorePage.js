import React, { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import BusinessList from '../components/businesses/business-list/BusinessList';
import HeaderExplore from '../components/businesses/business-list/HeaderExplore';
import businessService from '../services/businesses';


export default function ExplorePage() {

  const [businesses, setBusinesses] = useState([]);

  const onSearch = (query = {}) => {
    businessService.list(query)
      .then((businesses) => setBusinesses(businesses))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    onSearch();
  }, [])


  return (
    <>
    <HeaderExplore onSearch={onSearch}/>
    <PageLayout title="Descubre todo lo que Madrid tiene reservado para ti">
      <div className='row'>
        <BusinessList businesses={businesses} />
      </div>
    </PageLayout>
    </>
  )
};
