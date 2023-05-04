import React from 'react';
import { Link } from 'react-router-dom';
import businessImg from '../../assets/img/alta-negocios-home.png'

export default function BusinessBanner() {
  return (
    <section className='row bg-light my-5 gap-4 justify-content-end align-items-end banner-left'>
      <div className='col-sm-12 col-md-8 py-4'>
        <h4>¿Tienes un establecimiento vegano en Madrid?</h4>
        <p>Aquí tendrás la oportunidad de promocionar tu negocio a una audiencia altamente enfocada en la comunidad vegana de la ciudad. Al unirte a veggieMAD, podrás llegar a un público apasionado por el estilo de vida vegano, lo que te permitirá aumentar tu visibilidad y atraer nuevos clientes.</p>
        <Link to={'/business/register'} className='btn btn-main' >¡Haz crecer tu negocio! Regístrate aquí <i className="fa-solid fa-arrow-right-long"></i></Link>
      </div>
      <div className='col-sm-12 col-md-3 p-0'>
        <img src={businessImg} alt="Date de alta en veggieMAD" className='banner-img' />
      </div>

    </section>
  )
}
