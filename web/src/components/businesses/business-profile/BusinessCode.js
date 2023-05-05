import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';

export default function BusinessCode() {
  const { user } = useContext(AuthContext);

  return (
    <div className='px-5'>
      <h3 className='mb-4'>Mi código</h3>
      <div className="alert bg-dark-pink w-100">
        <h4 className="alert-heading">{user?.loyaltyCode}</h4>
        <p className="mb-0">Este es tu código de fidelización. Los usuarios tendrán que proporcionarlo para poder marcar tu establecimiento como visitado. ¡Acuérdate de compartirlo!</p>
      </div>
      <p>Haz que tus clientes vuelvan por más y fomenta su fidelidad con tu negocio vegano en Madrid. Con nuestro código de fidelización personalizado, podrás recompensar a tus clientes por su lealtad y alentarlos a regresar.</p>
      <p>Aquí tienes algunas ideas para incorporarlo a tu proceso de venta:</p>
      <ul>
        <li>Imprimir el código en el ticket de compra o en la bolsa de papel.</li>
        <li>Ofrecer una tarjeta de fidelización que incluya el código, y entregarla junto con la compra.</li>
        <li>Incluir el código en el correo electrónico de confirmación de la reserva de mesa o pedido online.</li>
        <li>Mostrar el código en la pantalla de la tablet o terminal al momento de pagar.</li>
      </ul>
    </div>
  )
}
