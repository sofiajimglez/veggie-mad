import React, { useState } from 'react';
import UsersLoginForm from '../components/login/UsersLoginForm';
import PageLayout from '../components/layout/PageLayout';

export default function LoginPage() {
  const [seeUserForm, setSeeUserForm] = useState(false);
  const [seeBusinessForm, setSeeBusinessForm] = useState(false);

  return (
    <PageLayout title="Inicia sesión para acceder a tu cuenta">
      <div className='row'>

        <div className='col-sm-12 col-md-6'>
          <div class="card mb-4 p-4" >
              <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button className='btn btn-secondary w-100' onClick={() => setSeeUserForm(!seeUserForm)}>Iniciar sesión como usuario</button>
              {seeUserForm ? <div className='mt-4'><UsersLoginForm mode='user' /></div> : ''}
          </div>

          <div class="card p-4" >
              <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button className='btn btn-secondary w-100' onClick={() => setSeeBusinessForm(!seeBusinessForm)}>Iniciar sesión como empresa</button>
              {seeBusinessForm ? <div className='mt-4'><UsersLoginForm mode='business' /></div> : ''}
          </div>
        </div>

        <div className='col-sm-12 col-md-6'>
          <p>Imagen bonita próximamente</p>
        </div>

      </div>
    </PageLayout >
  )
};
