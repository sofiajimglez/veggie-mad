import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';

export default function UserPoints() {
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column justify-content-center align-items-start px-5">
      <h3 className='mb-4'>Mis puntos</h3>
      <div className="alert alert-info w-100" role="alert">
        <p className='mb-0 fs-5 py-2'><i className="fa-solid fa-circle-info me-2"></i>Actualmente tienes {user.points} puntos</p>
        <hr />
        <p className="mb-0 fs-6 fw-lighter fst-italic">Puedes ganar puntos guardando tus favoritos, haciendo reseñas en los establecimientos y marcando como visitados los lugares a los que vayas.</p>
      </div>
      <h5 className='my-3'>Objetivos</h5>
      <div className="alert alert-success w-100" role="alert">
        <h4 className="alert-heading">5 puntos</h4>
        <p className="mb-0">¡Holi! Nos hace muy felices verte por aquí, así que te regalamos cinco puntos de bienvenida.</p>
      </div>
      <div className="alert alert-success w-100" role="alert">
        <h4 className="alert-heading">10 puntos</h4>
        <p className="mb-0">¡Ya tienes tus primeros 10 puntos! A partir de ahora podrás dejar reseñas en los establecimientos.</p>
      </div>
      <div className="alert alert-success w-100" role="alert">
        <h4 className="alert-heading">50 puntos</h4>
        <p className="mb-0">¡Guau! Gracias por estar tan activo en nuestra plataforma. Benefíciate de un 3% de descuento en establecimientos seleccionados*.</p>
      </div>
      <div className="alert alert-success w-100" role="alert">
        <h4 className="alert-heading">150 puntos</h4>
        <p className="mb-0">Nos encanta ver que has venido para quedarte. Por ello, ¡te regalamos nuestra totebag exlusiva!</p>
      </div>
      <div className="alert alert-success w-100" role="alert">
        <h4 className="alert-heading">300 puntos</h4>
        <p className="mb-0">Gracias por contribuir a un mundo más respetuoso con los animales y el medio ambiente. Disfruta de un 5% de descuento en establecimientos seleccionados*, ¡te lo mereces!</p>
      </div>
    </div>
  )
}
