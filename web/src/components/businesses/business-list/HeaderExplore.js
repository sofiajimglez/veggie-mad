import React from 'react';
import FilterForm from './FilterForm';

export default function HeaderExplore({ onSearch }) {
  return (
    <div className="top-header text-center py-5">
      <h1 className="display-5 ">Explora Madrid</h1>
      <div className="col-lg-6 mx-auto">
        <p>Encuentra el lugar perfecto para tus planes veganos</p>
        <p className="lead mb-4">¿Qué estás buscando?</p>
        <FilterForm onSearch={onSearch} />
      </div>
    </div>
  )
}
