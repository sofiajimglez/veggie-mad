import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthUserStore';

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="top-header text-center py-5">
    <h1 className="display-5 ">Descubre Madrid</h1>
    <div className="col-lg-6 mx-auto">
      <p>La capital cuenta con una vibrante comunidad vegana que ha dado lugar a una amplia variedad de establecimientos comprometidos con una forma de vida sostenible, responsable con el medio ambiente y libre de sufrimiento animal.</p>
      <p className="lead mb-4">¡Únete y descubre todo lo que la ciudad tiene que ofrecer!</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        {!user && <Link  to='/login' className="btn btn-main px-4 gap-3">Regístrate ahora</Link>}
        <Link  to='/explora-madrid' className={`px-4 btn ${!user ? 'btn-second-line' : 'btn-second'}`}>Explora Madrid <i className="fa-solid fa-arrow-right-long"></i></Link>
      </div>
    </div>
  </div>

  )
}
