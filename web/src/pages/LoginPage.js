import React, { useState } from 'react';
import UsersLoginForm from '../components/login/UsersLoginForm';
import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import loginImg from '../assets/img/veggie-mad-login.png';

export default function LoginPage() {
  const [seeUserForm, setSeeUserForm] = useState(false);
  const [seeBusinessForm, setSeeBusinessForm] = useState(false);

  return (
    <PageLayout title="Inicia sesión para acceder a tu cuenta">
      <div className='row justify-content-center align-items-center'>

        <div className='col-sm-12 col-md-6'>
          <h2 className='mb-4'>Inicia sesión en tu cuenta</h2>
          <div className="card mb-4 p-4" >
            <p>¡Te echábamos de menos! Inicia sesión ahora y accede a tu cuenta personalizada para explorar y descubrir nuevos establecimientos y planes veganos en Madrid.</p>
            <button className='btn btn-second w-100' onClick={() => setSeeUserForm(!seeUserForm)}>Iniciar sesión como usuario</button>
            {seeUserForm ? <div className='mt-4'><UsersLoginForm mode='user' /></div> : ''}
            <hr />
            <p className='m-0 fw-bolder'>¿Aún no estás registrado? <Link to="/users/register" className='btn-main veggie-link p-1'>Crea tu cuenta aquí</Link></p>
          </div>

          <div className="card p-4" >
            <p>¡Te echábamos de menos! Inicia sesión en tu cuenta para administrar tu perfil de empresa, donde podrás fidelizar a tus clientes y destacar entre nuestra comunidad de negocios veganos en Madrid.</p>
            <button className='btn btn-second w-100' onClick={() => setSeeBusinessForm(!seeBusinessForm)}>Iniciar sesión como empresa</button>
            {seeBusinessForm ? <div className='mt-4'><UsersLoginForm mode='business' /></div> : ''}
            <hr />
            <p className='m-0 fw-bolder'>¿Aún no estás registrado? <Link to="/business/register" className='btn-main veggie-link p-1'>Crea tu cuenta aquí</Link></p>
          </div>
        </div>

        <div className='col-sm-12 col-md-6 justify-content-center'>
          <center><img src={loginImg} className='auth-img' alt='VeggieMAD Logo' /></center>
        </div>

      </div>
    </PageLayout >
  )
};
