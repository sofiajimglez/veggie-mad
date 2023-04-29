import React from 'react';
import UsersRegisterForm from '../components/users/UsersRegisterForm';
import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';

export default function UserRegisterPage() {
  return (
    <PageLayout title="Regístrate y comienza a disfrutar de la vida veggie en Madrid">
      <div className='row'>

        <div className='col-sm-12 col-md-5'>
          <h2>Crea tu cuenta</h2>
          <p>Próximamente: ventajas de darte de alta</p>
          <ul>
            <li>Ventaja 1</li>
            <li>Ventaja 2</li>
            <li>Ventaja 3</li>
          </ul>
          <hr />
          <p className='m-0 text-muted'>¿Eres una empresa? <Link to="/business/register">Regístrate aquí</Link> y comienza a conectar con tu audiencia potencial en minutos</p>
        </div>

        <div className='col-sm-12 col-md-7 px-5'>
          <UsersRegisterForm />
          <hr />
          <p className='m-0 text-muted'>¿Ya estás registrado? Inicia sesión <Link to="/login">aquí</Link></p>
        </div>
      </div>
    </PageLayout>
  )
}
