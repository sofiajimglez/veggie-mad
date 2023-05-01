import React from 'react';
import { Link } from 'react-router-dom';

export default function BusinessCard({ business, styles }) {
  return (
    <div className={styles}>
      <div className='card'>
        <img src={business.imageUrl} className="card-img-top" alt={business.name} />
        <div className="card-body">
          <h5 className="card-title">{business.name}</h5>
          <p className="card-text">{business.category}</p>
          <Link to={`/businesses/${business.id}`} className="btn btn-primary w-100">Ver</Link>
        </div>
      </div>
    </div>
  )
}
