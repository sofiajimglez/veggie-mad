import React from 'react';
import './Home.css';

export default function Categories() {
  return (
    <>
      <section className='row justify-content-center text-center gap-4 mb-4'>
        <div className="col-sm-12 col-md-3 category-home py-3">
          <h1><i className="fa-solid fa-utensils"></i></h1>
          <h5 className='mb-0'>Restaurantes</h5>
        </div>
        <div className="col-sm-12 col-md-3 category-home py-3">
          <h1><i className="fa-solid fa-bed"></i></h1>
          <h5 className='mb-0'>Alojamientos</h5>
        </div>
        <div className="col-sm-12 col-md-3 category-home py-3">
          <h1><i className="fa-solid fa-shop"></i></h1>
          <h5 className='mb-0'>Tiendas</h5>
        </div>
      </section>
      <section className='row justify-content-center text-center gap-4 mb-4'>
        <div className="col-sm-12 col-md-3 category-home py-3">
          <h1><i className="fa-solid fa-paw"></i></h1>
          <h5 className='mb-0'>Asociaciones benéficas</h5>
        </div>
        <div className="col-sm-12 col-md-3 category-home py-3">
          <h1><i className="fa-solid fa-bell-concierge"></i></h1>
          <h5 className='mb-0'>Servicios</h5>
        </div>
        <div className="col-sm-12 col-md-3 category-home py-3">
          <h1><i className="fa-solid fa-seedling"></i></h1>
          <h5 className='mb-0'>Otros</h5>
        </div>
      </section>
    </>
  )
}
