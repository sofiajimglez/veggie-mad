import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import businessService from '../../../services/businesses';
import { AuthContext } from '../../../contexts/AuthUserStore';

export default function VisitForm({ businessId }) {
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({ mode: 'onBlur' });

  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  const { user, onUserChange } = useContext(AuthContext);

  const onVisitSubmit = async (visit) => {
    try {
      setServerError();
      reset();
      console.debug('Registering visit...');
      const updatedUser = await businessService.visit(businessId, visit);
      onUserChange(updatedUser);
      navigate(`/explora-madrid/${businessId}`, { replace: true });
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.keys(errors)
          .forEach((inputName) => setError(inputName, { message: errors[inputName] }));
      } else {
        setServerError(error.message);
      };
    }
  };

  if (user?.role === 'user') {
    return <form onSubmit={handleSubmit(onVisitSubmit)}>
      {/* Server error feedback */}
      <div className='mb-6'>
        {serverError && <p className="alert alert-danger d-none d-lg-block">{serverError}</p>}
      </div>

      {/* loyaltyCode */}
      <div className='mb-3'>
        <div className='input-group'>
          <span className="input-group-text"><i className="fa-solid fa-message"></i></span>
          <input
            type='text'
            id='loyaltyCode'
            className={`form-control ${errors.loyaltyCode ? 'is-invalid' : ''}`}
            placeholder='Introduce el código de fidelización'
            {...register('loyaltyCode', { required: 'Campo obligatorio' })} />
          {errors.loyaltyCode && <p className='invalid-feedback'>{errors.loyaltyCode?.message}</p>}
        </div>
      </div>

      <button type='submit' className='btn btn-primary w-100'>Enviar</button>

    </form>

  } else {
    return <></>;
  }
}
