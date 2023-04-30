import React, { useState } from 'react';
import UsersLoginForm from '../components/login/UsersLoginForm';
import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [seeUserForm, setSeeUserForm] = useState(false);
  const [seeBusinessForm, setSeeBusinessForm] = useState(false);

  return (
    <PageLayout title="Inicia sesión para acceder a tu cuenta">
      <div className='row'>

        <div className='col-sm-12 col-md-6'>
          <div className="card mb-4 p-4" >
            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button className='btn btn-secondary w-100' onClick={() => setSeeUserForm(!seeUserForm)}>Iniciar sesión como usuario</button>
            {seeUserForm ? <div className='mt-4'><UsersLoginForm mode='user' /></div> : ''}
            <hr />
            <p className='m-0 text-muted'>¿Aún no estás registrado? Crea tu cuenta <Link to="/users/register">aquí</Link></p>
          </div>

          <div className="card p-4" >
            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button className='btn btn-secondary w-100' onClick={() => setSeeBusinessForm(!seeBusinessForm)}>Iniciar sesión como empresa</button>
            {seeBusinessForm ? <div className='mt-4'><UsersLoginForm mode='business' /></div> : ''}
            <hr />
            <p className='m-0 text-muted'>¿Aún no estás registrado? Crea tu cuenta <Link to="/business/register">aquí</Link></p>
          </div>
        </div>

        <div className='col-sm-12 col-md-6'>
          <p>Imagen bonita próximamente</p>
        </div>

      </div>
    </PageLayout >
  )
};
