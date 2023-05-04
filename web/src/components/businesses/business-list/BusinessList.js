import React, { useEffect, useState } from 'react';
import businessService from '../../../services/businesses';
import BusinessCard from '../BusinessCard';
import { useSearchParams } from 'react-router-dom';

export default function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = {}

    const categories = searchParams.get('category');
    const tags = searchParams.get('tags');
    const prices = searchParams.get('price');

    if (categories) query.category = categories;
    if (tags) query.tags = tags;
    if (prices) query.price = prices;

    businessService.list(query)
      .then((businesses) => setBusinesses(businesses))
      .catch(error => console.error(error));
  }, [searchParams])

  return (
    <>
      {businesses.map((business) => <BusinessCard styles='col-sm-12 col-md-3 mb-4' business={business} key={business.id} />)}
    </>
  )
}
