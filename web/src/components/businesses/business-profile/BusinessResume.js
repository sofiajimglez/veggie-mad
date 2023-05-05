import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';
import dayjs from 'dayjs';
import Price from '../Price';

export default function BusinessResume() {

  const { user } = useContext(AuthContext);

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 px-5 py-3">
        <img src={user?.imageUrl} className="rounded w-50" alt={user?.username} />
        <div className='d-flex flex-column justify-content-center gap-2'>
          <h2>{user?.name}</h2>
          <h5>@{user?.username}</h5>
          <h5><i className="fa-solid fa-location-dot"></i> {user?.location.address}</h5>
          <p className="fs-6 fst-italic">En veggieMAD desde el {dayjs(user?.createdAt).format('DD/MM/YYYY')}</p>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 p-5 py-3 mt-2 mb-4">
        <div className='d-flex flex-nowrap flex-column justify-content-center align-items-center gap-2 outline-pink-box px-5 py-4 rounded'>
          <i className="fa-solid fa-xl fa-heart my-3"></i>
          <h6 className='mb-0'>Favoritos</h6>
          <h3 className='mb-0'>{user?.favs?.length || 0}</h3>
        </div>
        <div className='d-flex flex-nowrap flex-column justify-content-center align-items-center gap-2 outline-pink-box px-5 py-4 rounded'>
          <i className="fa-solid fa-xl fa-star my-3"></i>
          <h6 className='mb-0'>Reseñas</h6>
          <h3 className='mb-0'>{user?.reviews?.length || 0}</h3>
        </div>
        <div className='d-flex flex-nowrap flex-column justify-content-center align-items-center gap-2 outline-pink-box px-5 py-4 rounded'>
          <i className="fa-solid fa-xl fa-store my-3"></i>
          <h6 className='mb-0'>Visitas</h6>
          <h3 className='mb-0'>{user?.visits?.length || 0}</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {user?.description && <div className="card mb-4">
            <div className="card-header bg-dark-green">
              <i className="fa-solid fa-paragraph me-2"></i>
                Descripción
            </div>
            <div className="card-body"><p className='mb-0'>{user?.description}</p></div>
          </div>}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-4">
          {user?.category && <div className="card mb-4">
            <div className="card-header bg-dark-green">
              <i className='fa-solid fa-briefcase me-2'></i>
              Área profesional
            </div>
            <div className="card-body"><p className='mb-0'>{user?.category}</p></div>
          </div>}
        </div>
        <div className="col-sm-12 col-md-4">
          {user?.price && <div className="card mb-4">
            <div className="card-header bg-dark-green">
              <i class="fa-solid fa-coins me-2"></i>
              Rango de precios
            </div>
            <div className="card-body"><p className='mb-0'><Price price={user?.price} /></p></div>
          </div>}
        </div>
        <div className="col-sm-12 col-md-4">
          {user?.tags > 0 && <div className="card mb-4">
            <div className="card-header bg-dark-green">
              <i className='fa-solid fa-tags me-2'></i>
              Etiquetas
            </div>
            <div className="card-body">
              {user?.tags.map(tag => <div className="badge bg-primary">
                {tag}
              </div>)}
            </div>
          </div>}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-4">
          {user?.facebookUrl && <div className="card mb-3">
            <div className="card-header bg-dark-green">
              <i className="fa-brands fa-facebook-f me-2"></i>
              Facebook
            </div>
            <div className="card-body"><p className='mb-0'>{user?.facebookUrl}</p></div>
          </div>}
        </div>
        <div className="col-sm-12 col-md-4">
          {user?.instagramUrl && <div className="card mb-3">
            <div className="card-header bg-dark-green">
              <i className="fa-brands fa-instagram me-2"></i>
              Instagram
            </div>
            <div className="card-body"><p className='mb-0'>{user?.instagramUrl}</p></div>
          </div>}
        </div>
        <div className="col-sm-12 col-md-4">
          {user?.twitterUrl && <div className="card mb-3">
            <div className="card-header bg-dark-green">
              <i className="fa-brands fa-twitter me-2"></i>
              Twitter
            </div>
            <div className="card-body"><p className='mb-0'>{user?.twitterUrl}</p></div>
          </div>}
        </div>
      </div>
    </section>
  )
}
