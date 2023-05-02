import React, { useEffect, useState } from 'react';
import businessService from '../../../services/businesses';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import es from "dayjs/locale/es";
dayjs.extend(relativeTime);
dayjs.locale('es');

export default function BusinessFavs({ user }) {

  const [favs, setFavs] = useState([]);

  useEffect(() => {
    businessService.get(user.id)
      .then(user => {
        const favsList = user?.favs;
        setFavs(favsList);
      })
      .catch(error => console.error(error));
  }, [user.id])

  return (
    <div className="row px-5 py-3">
      <h3 className='mb-4'>Mis favoritos</h3>
      {favs.length > 0 ?
        <section>
          <div className="alert alert-info w-100 mb-5">
            <h4 className="alert-heading"><i className="fa-solid fa-heart"></i> {favs.length}</h4>
            <p className="mb-0">Ya estás en la lista de favoritos de {favs.length} {favs.length < 2 ? 'usuario' : 'usuarios'}. ¡Buen trabajo! 😍 </p>
          </div>

          <h5 className='my-3'>Actividad reciente</h5>
          {favs.map((fav) => <div className="card mb-3" key={fav.id}>
            <div className="card-body">
              <p className='mb-0'>🐻 <strong>{fav.user.name}</strong> te ha marcado como favorito {dayjs(fav.createdAt).fromNow()}</p>
            </div>
          </div>)}
        </section>
        :
        <div className="alert alert-info w-100">
          <p className='mb-0 fw-lighter'>Aquí mostraremos el número de personas que marquen tu establecimiento como favorito. ¡Vuelve muy pronto! 😍</p>
        </div>
      }
    </div>
  )
}
