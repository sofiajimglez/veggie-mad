import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';
import businessService from '../../../services/businesses';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import es from "dayjs/locale/es";
dayjs.extend(relativeTime);
dayjs.locale('es');

export default function BusinessVisits() {

  const [visits, setVisits] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    businessService.get(user.id)
      .then(user => {
        const visitsList = user?.visits;
        setVisits(visitsList);
      })
      .catch(error => console.error(error));
  }, [user.id])

  return (
    <div className="row px-5 py-3">
      <h3 className='mb-4'>Mis visitas</h3>
      {visits.length > 0 ?
        <section>
          <div className="alert bg-dark-pink w-100 mb-5">
            <h4 className="alert-heading"><i className="fa-solid fa-user"></i> {visits.length}</h4>
            <p className="mb-0">Ya estás en la lista de visitados de {visits.length} {visits.length < 2 ? 'usuario' : 'usuarios'}. ¡Sigue así! 😉 </p>
          </div>

          <h5 className='my-3'>Actividad reciente</h5>
          {visits.map((visit) => <div className="card mb-3" key={visit.id}>
            <div className="card-body">
              <p className='mb-0'>🐻 <strong>{visit.user.name}</strong> te ha marcado como visitado {dayjs(visit.createdAt).fromNow()}</p>
            </div>
          </div>)}
        </section>
        :
        <div className="alert bg-light-pink w-100">
          <p className='mb-0 fw-lighter'>Aquí mostraremos el número de personas que marquen tu establecimiento como visitado. ¡Vuelve muy pronto! 😉</p>
        </div>
      }
    </div>
  )
}
