import React from 'react';
import UsersRegisterForm from '../components/users/UsersRegisterForm';
import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import userRegisterImg from '../assets/img/users-register.png';

export default function UserRegisterPage() {
  return (
    <PageLayout title="Regístrate y comienza a disfrutar de la vida veggie en Madrid">
      <div className='row justify-content-center align-items-center'>

        <div className='col-sm-12 col-md-5'>
          <center><img src={userRegisterImg} className='auth-img-small' alt='VeggieMAD Logo' /></center>
          <hr />
          <p className='m-0 fw-bolder'><Link to="/business/register" className='btn-main veggie-link p-1 me-2'>¿Eres una empresa? </Link> Regístrate aquí y comienza a conectar con tu audiencia potencial en minutos</p>
        </div>

        <div className='col-sm-12 col-md-7 px-5'>
          <h2 className='mb-4'>Crea tu cuenta</h2>
          <UsersRegisterForm />
          <hr />
          <p className='m-0 fw-bolder'>¿Ya estás registrado? <Link to="/login" className='btn-main veggie-link p-1'> Inicia sesión aquí</Link></p>
        </div>
      </div>
    </PageLayout>
  )
}
