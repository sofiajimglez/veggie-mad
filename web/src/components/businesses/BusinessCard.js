import React from 'react';
import { Link } from 'react-router-dom';
import './Businesses.css';

export default function BusinessCard({ business, styles }) {
  return (
    <div className={styles}>
      <div className='card business-card h-100 justify-content-end'>
        <img src={business.imageUrl} className="card-img-top" alt={business.name} />
        <div className="card-body">
          <h5 className="card-title">{business.name}</h5>
          <p className="card-text mb-3">{business.category}</p>
          {business?.tags.map((tag, i) => <span className='business-card-tag me-2 pb-2 align-text-middle' key={i}>#{tag}</span>)}
          <Link to={`/explora-madrid/${business.id}`} className="btn btn-main w-100 mt-3">Ver </Link>
        </div>
      </div>
    </div>
  )
}
