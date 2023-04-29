import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import BusinessRegisterForm from '../components/businesses/BusinessRegisterForm';
import { Link } from 'react-router-dom';

export default function BusinessRegisterPage() {
  return (
    <PageLayout title="Regístrate y comienza a conectar con tu audiencia">
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
          <p className='m-0 text-muted'>¿Eres un particular? <Link to="/businesses/register">Regístrate aquí</Link> y comienza a disfrutrar de la vida <i>veggie</i> madrileña</p>
        </div>

        <div className='col-sm-12 col-md-7 px-5'>
          <BusinessRegisterForm />
          <hr />
          <p className='m-0 text-muted'>¿Ya estás registrado? Inicia sesión <Link to="/login">aquí</Link></p>
        </div>
      </div>
    </PageLayout>
  )
}
