import React from 'react';
import { Link } from 'react-router-dom';
import pointsImg from '../../assets/img/programa-puntos-home.png';

export default function PointsBanner({ user }) {
  return (
    <section className='row bg-light mt-5 mb-2 gap-4 justify-content-start align-items-center banner-right'>
      <div className='col-sm-12 col-md-3 p-4'>
        <img src={pointsImg} alt="Date de alta en veggieMAD" className='banner-img' />
      </div>
      <div className='col-sm-12 col-md-8 py-4'>
        <h4>¿Conoces nuestro programa de puntos?</h4>
        <p>Gracias a nuestro programa de fidelización podrás acumular puntos por cada acción que realices en la plataforma, como dejar reseñas o marcar establecimientos como favoritos. Cuanto más interactúes con nuestra plataforma, más puntos obtendrás. Y, lo mejor de todo, ¡podrás canjear tus puntos por recompensas exclusivas!</p>
        {!user && <Link to={'/login'} className='btn btn-second'>Crea tu cuenta aquí <i className="fa-solid fa-arrow-right-long"></i></Link>}
        {user?.role === 'user' && <Link to={'/profile'} className='btn btn-second'>Más información <i className="fa-solid fa-arrow-right-long"></i></Link>}
      </div>
    </section>
  )
}
