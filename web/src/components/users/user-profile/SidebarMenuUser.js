import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import DeleteAccountBtn from '../../buttons/DeleteAccountBtn';

const renderNavLinkActive = ({ isActive }) => isActive ? 'active' : '';

export default function SidebarMenuUser( { isExpanded, user } ) {
  return (
    <>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/profile" className={`nav-link ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-user"></i>
            {isExpanded ? '' : <span className='mx-2'>Resumen</span>}
          </NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/profile/points" className={`nav-link ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-leaf"></i>
            {isExpanded ? '' : <span className='mx-2'>Mis puntos</span>}
          </NavLink>
        </li>
        <li>
        <NavLink to="/profile/user-favs" className={`nav-link ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-heart"></i>
            {isExpanded ? '' : <span className='mx-2'>Mis favoritos</span>}
          </NavLink>
        </li>
        <li>
        <NavLink to="/profile/user-reviews" className={`nav-link ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-star"></i>
            {isExpanded ? '' : <span className='mx-2'>Mis reseñas</span>}
          </NavLink>
        </li>
        <li>
        <NavLink to="/profile/user-visits" className={`nav-link ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-store"></i>
            {isExpanded ? '' : <span className='mx-2'>Sitios visitados</span>}
          </NavLink>
        </li>
      </ul>
      <hr />
      <Link to='/profile/edit' className='btn btn-primary mb-2'>
        <i className="fa-solid fa-pen-to-square"></i>
        {isExpanded ? '' : <span className='mx-2'>Editar info</span>}
      </Link>
      <DeleteAccountBtn user={user} isExpanded={isExpanded} />
    </>
  )
}

SidebarMenuUser.defaultProps = {
  isExpanded: false
}
