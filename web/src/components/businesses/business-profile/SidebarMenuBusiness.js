import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import DeleteAccountBtn from '../../buttons/DeleteAccountBtn';

const renderNavLinkActive = ({ isActive }) => isActive ? 'active' : '';

export default function SidebarMenuBusiness({ isExpanded, user }) {
  return (
    <>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/profile/" className={`nav-link sidebar-text ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-store"></i>
            {isExpanded ? '' : <span className='mx-2 '>Resumen</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile/code" className={`nav-link sidebar-text ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-key"></i>
            {isExpanded ? '' : <span className='mx-2'>Mi código</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile/gallery" className={`nav-link sidebar-text ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-images"></i>
            {isExpanded ? '' : <span className='mx-2'>Mi galería</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/business-favs" className={`nav-link sidebar-text ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-heart"></i>
            {isExpanded ? '' : <span className='mx-2'>Mis favoritos</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/business-reviews" className={`nav-link sidebar-text ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-star"></i>
            {isExpanded ? '' : <span className='mx-2'>Mis reseñas</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/business-visits" className={`nav-link sidebar-text ${renderNavLinkActive} ${isExpanded ? 'd-inline-block' : ''}`}>
            <i className="fa-solid fa-user"></i>
            {isExpanded ? '' : <span className='mx-2'>Mis visitas</span>}
          </NavLink>
        </li>
      </ul>
      <hr />
      <Link to='/profile/edit' className='btn btn-second mb-2'>
        <i className="fa-solid fa-pen-to-square"></i>
        {isExpanded ? '' : <span className='mx-2'>Editar info</span>}
      </Link>
      <DeleteAccountBtn user={user} isExpanded={isExpanded} />
    </>
  )
}

SidebarMenuBusiness.defaultProps = {
  isExpanded: false
}
