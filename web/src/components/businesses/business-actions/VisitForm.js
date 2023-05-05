import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import businessService from '../../../services/businesses';
import { AuthContext } from '../../../contexts/AuthUserStore';

export default function VisitForm({ businessId }) {
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({ mode: 'onBlur' });

  const [serverError, setServerError] = useState();
  const [isVisited, setIsVisited] = useState();
  const { user, onUserChange } = useContext(AuthContext);

  const onVisitSubmit = async (visit) => {
    try {
      setServerError();
      reset();
      console.debug('Registering visit...');
      const updatedUser = await businessService.visit(businessId, visit);
      onUserChange(updatedUser);
      setIsVisited(!isVisited);
    } catch (error) {
      const errors = error.response?.data?.errors;
      const statusCode = error.response?.status;
      if (errors) {
        Object.keys(errors)
          .forEach((inputName) => setError(inputName, { message: errors[inputName] }));
      } else if (statusCode === 403) {
        error.message = 'Código incorrecto';
        setServerError(error.message);
      } else {
        setServerError(error.message);
      };
    }
  };

  useEffect(() => {
    businessService.checkVisit(businessId)
      .then(response => setIsVisited(response.isVisited))
      .catch(error => console.error(error))
  }, [businessId]);



  if (user?.role === 'user' && !isVisited) {
    return <form onSubmit={handleSubmit(onVisitSubmit)}>
      {/* Server error feedback */}
      <div className='mb-2'>
        {serverError && <p className="alert alert-danger d-none d-lg-block p-1">{serverError}</p>}
      </div>

      {/* loyaltyCode */}
      <div className='mb-3'>
        <input
          type='text'
          id='loyaltyCode'
          className={`form-control ${errors.loyaltyCode ? 'is-invalid' : ''}`}
          placeholder='Introduce el código'
          {...register('loyaltyCode', { required: 'Campo obligatorio' })} />
        {errors.loyaltyCode && <p className='invalid-feedback'>{errors.loyaltyCode?.message}</p>}
      </div>
      <button type='submit' className='btn btn-second-line w-100'>Enviar</button>
    </form>
  } else if (user?.role === 'user' && isVisited) {
    return <h5>¡Has visitado este sitio!</h5>
  } else {
    return <></>;
  }
}
