import React from 'react';

import BusinessCard from '../BusinessCard';
// import { useSearchParams } from 'react-router-dom';

export default function BusinessList({ businesses }) {



  return (
    <>
      {businesses.map((business) => <BusinessCard styles='col-sm-12 col-md-3 mb-4' business={business} key={business.id} />)}
    </>
  )
}
