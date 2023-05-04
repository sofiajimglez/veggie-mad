import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';

export default function BusinessCode() {
  const { user } = useContext(AuthContext);

  return (
    <div className='px-5'>
      <h3 className='mb-4'>Mi código</h3>
      <div className="alert alert-info w-100">
        <h4 className="alert-heading">{user?.loyaltyCode}</h4>
        <p className="mb-0">Este es tu código de fidelización. Los usuarios tendrán que proporcionarlo para poder marcar tu establecimiento como visitado. ¡Acuérdate de compartirlo!</p>
      </div>
      <p>Próximamente: ideas de dónde ponerlo (ticket), plantillas?...</p>
    </div>
  )
}
