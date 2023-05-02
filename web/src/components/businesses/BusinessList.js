import React, { useEffect, useState } from 'react';
import businessService from '../../services/businesses';
import BusinessCard from './BusinessCard';

export default function BusinessList() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    businessService.list()
      .then((businesses) => setBusinesses(businesses))
      .catch(error => console.error(error));
  }, [])

  return (
    <>
      {businesses.map((business) => <BusinessCard styles='col-sm-12 col-md-3 mb-4' business={business} key={business.id} />)}
    </>
  )
}
