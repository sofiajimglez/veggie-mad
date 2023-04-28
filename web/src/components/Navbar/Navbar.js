import React, { useContext } from 'react';
import logo from '../../assets/img/veggie-mad-isotipo.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthUserStore';

const renderNavLinkClassName = ({ isActive }) => isActive ? 'block py-2 pl-3 pr-4 font-secondary text-3xl text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 active' : 'block py-2 pl-3 pr-4 font-secondary text-3xl text-white bg-blue-700 rounded md:bg-transparent md:text-gray-700 md:p-0';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
    <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
      <div className='flex flex-wrap items-center justify-between mx-auto p-4'>

        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <img src={logo} className='h-12 mr-3' alt='VeggieMAD Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap font-primary text-green-950'>veggieMAD</span>
        </Link>

        <div className='flex items-baseline md:order-2 gap-4'>

          {/* Search Menu */}
          <button type='button' data-collapse-toggle='navbar-search' aria-controls='navbar-search' aria-expanded='false' className='md:hidden text-gray-500 hover:bg-gray-100 rounded-lg text-sm p-2.5 mr-1' >
            <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path></svg>
            <span className='sr-only'>Buscar</span>
          </button>
          <div className='relative hidden md:block'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg className='w-5 h-5 text-gray-500' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path></svg>
              <span className='sr-only'>Lupa</span>
            </div>
            <input type='text' id='search-navbar' className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500' placeholder='Buscar...' />
          </div>

          {/* Burger Menu */}
          <button data-collapse-toggle='navbar-search' type='button' className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100' aria-controls='navbar-search' aria-expanded='false'>
            <span className='sr-only'>Open menu</span>
            <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd'></path></svg>
          </button>

          {/* Buttons */}
          {(user?.username) ? (
            <>
              <Link to='/profile'>{user.username}</Link>
              <button onClick={() => logout()}>Logout</button>
            </>
          ) : (
            <>
              <Link to='/register' className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2 text-center'>Registrarse</Link>
              <Link to='/login' className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center'>Entrar</Link>
            </>
          )}
        </div>

        {/* Main Menu */}
        <div className='items-baseline justify-between hidden w-full md:flex md:w-auto md:order-1'>

          <div className='relative mt-3 md:hidden'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg className='w-5 h-5 text-gray-500' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path></svg>
            </div>
            <input type='text' id='search-navbar' className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50' placeholder='Search...' />
          </div>

          <ul className='flex flex-col gap-10 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white'>
            <li>
              <NavLink to='/' className={renderNavLinkClassName}>Inicio</NavLink>
            </li>
            <li>
              <NavLink to='/explora-madrid' className={renderNavLinkClassName}>Explora Madrid</NavLink>
            </li>
            <li>
              <NavLink to='/sobre-veggie-mad' className={renderNavLinkClassName}>Sobre el proyecto</NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>


    
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}
