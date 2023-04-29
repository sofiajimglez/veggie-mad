import React, { useContext } from 'react';
import logo from '../../assets/img/veggie-mad-isotipo.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthUserStore';

const renderNavLinkClassName = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">

          {/* Burguer menu */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Brand */}
          <Link to='/' className='navbar-brand'>
            <img src={logo} className='nav-img' alt='VeggieMAD Logo' />
            <span className=''>veggieMAD</span>
          </Link>

          {/* Main menu inside burguer */}
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink to='/' className={renderNavLinkClassName}>Inicio</NavLink></li>
              <li className="nav-item"><NavLink to='/explora-madrid' className={renderNavLinkClassName}>Explora Madrid</NavLink></li>
              <li className="nav-item"><NavLink to='/sobre-veggie-mad' className={renderNavLinkClassName}>Sobre el proyecto</NavLink></li>
              {user?.role === 'business' && <li><NavLink to='/negocio' className={renderNavLinkClassName}>Negocio</NavLink></li>}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>

          {/* Auth options */}
          <div className='mx-3 d-flex gap-2 align-items-baseline'>
            {(user?.username) ? (
              <>
                <Link to='/profile'>{user.username}</Link>
                <button className='btn btn-secondary' onClick={() => logout()}>Logout</button>
              </>
            ) : (
              <>
                <Link to='/users/register' className='btn btn-primary'>Registrarse</Link>
                <Link to='/login' className='btn btn-primary'>Entrar</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
