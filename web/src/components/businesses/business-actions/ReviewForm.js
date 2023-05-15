import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import reviewService from '../../../services/review';
import { useNavigate } from 'react-router-dom';

export default function ReviewForm({ business }) {
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm(
    {
      mode: 'onBlur',
      defaultValues: {
        rating: 3
      }
    });

  const [serverError, setServerError] = useState();
  const navigate = useNavigate();

  const onReviewSubmit = async (review) => {
    try {
      setServerError();
      reset();
      console.debug('Creating review...');
      review = await reviewService.create(business, review);
      navigate('../explora-madrid', { replace: true });
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

  return (
    <form onSubmit={handleSubmit(onReviewSubmit)}>
      {/* Server error feedback */}
      <div className='mb-6'>
        {serverError && <p className="alert alert-danger d-none d-lg-block">{serverError}</p>}
      </div>

      {/* Rating */}
      <div className='mb-3'>
        <label htmlFor='price' className='form-label'>Puntuación</label>
        <p id='location-helper' className='form-text fst-italic'>Selecciona un valor entre 1 ⭐️ y 5 ⭐️⭐️⭐️⭐️⭐️</p>
        <input
          type='range'
          id='rating'
          className={`form-range ${errors.name ? 'is-invalid' : ''}`}
          min='1'
          max='5'
          {...register('rating')} />
        {errors.rating && <p className='invalid-feedback'>{errors.rating?.message}</p>}
      </div>

      {/* Text */}
      <div className='mb-3'>
        <textarea
          id='text'
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder='¿Qué te ha parecido este sitio? Cuéntanos...'
          {...register('text', { required: 'El texto es obligatorio' })} />
      </div>
      {errors.text && <p className='invalid-feedback'>{errors.text?.message}</p>}

      <button type='submit' className='btn btn-second w-100 mb-3'>Enviar</button>

    </form>
  )
}
