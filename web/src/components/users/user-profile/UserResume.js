import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { AuthContext } from '../../../contexts/AuthUserStore';

export default function UserResume() {
  const { user } = useContext(AuthContext);

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 px-5 py-3">
        <img src={user?.imageUrl} className="rounded-circle" alt={user?.username} />
        <div className='d-flex flex-column justify-content-center gap-2'>
          <h2>{user?.name}</h2>
          <h5>@{user?.username}</h5>
          <h5><i className="fa-solid fa-location-dot"></i> {user?.location.address}</h5>
          <p className="fs-6 fst-italic">En veggieMAD desde el {dayjs(user?.createdAt).format('DD/MM/YYYY')}</p>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 p-5 py-3 mt-2">
        <div className='d-flex flex-nowrap flex-column justify-content-center align-items-center gap-2 bg-success-subtle px-5 py-4 rounded'>
          <i className="fa-solid fa-xl fa-leaf my-3"></i>
          <h6 className='mb-0'>Puntos</h6>
          <h3 className='mb-0'>{user?.points}</h3>
        </div>
        <div className='d-flex flex-nowrap flex-column justify-content-center align-items-center gap-2 bg-success-subtle px-5 py-4 rounded'>
          <i className="fa-solid fa-xl fa-heart my-3"></i>
          <h6 className='mb-0'>Favoritos</h6>
          <h3 className='mb-0'>{user?.favs?.length || 0 }</h3>
        </div>
        <div className='d-flex flex-nowrap flex-column justify-content-center align-items-center gap-2 bg-success-subtle px-5 py-4 rounded'>
          <i className="fa-solid fa-xl fa-star my-3"></i>
          <h6 className='mb-0'>Reseñas</h6>
          <h3 className='mb-0'>{user?.reviews?.length || 0}</h3>
        </div>
        <div className='d-flex flex-nowrap flex-column justify-content-center align-items-center gap-2 bg-success-subtle px-5 py-4 rounded'>
          <i className="fa-solid fa-xl fa-store my-3"></i>
          <h6 className='mb-0'>Visitados</h6>
          <h3 className='mb-0'>{user?.visits?.length || 0}</h3>
        </div>
      </div>

    </section>
  )
}
