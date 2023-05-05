import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import BusinessRegisterForm from '../components/businesses/BusinessRegisterForm';
import businessRegisterImg from '../assets/img/business-register.png';
import { Link } from 'react-router-dom';

export default function BusinessRegisterPage() {
  return (
    <PageLayout title="Regístrate y comienza a conectar con tu audiencia">
      <div className='row justify-content-center align-items-center'>

        <div className='col-sm-12 col-md-5'>
          <center><img src={businessRegisterImg} className='auth-img-small' alt='VeggieMAD Logo' /></center>
          <hr />
          <p className='m-0 fw-bolder'><Link to="/users/register" className='btn-main veggie-link p-1 me-2'>¿Eres un particular?</Link> Regístrate aquí y comienza a disfrutrar de la vida <i>veggie</i> madrileña</p>
        </div>

        <div className='col-sm-12 col-md-7 px-5'>
          <h2 className='mb-4'>Crea tu cuenta</h2>
          <BusinessRegisterForm />
          <hr />
          <p className='m-0 fw-bolder'>¿Ya estás registrado? <Link to="/login" className='btn-main veggie-link p-1'>Inicia sesión aquí</Link></p>
        </div>
      </div>
    </PageLayout>
  )
}
