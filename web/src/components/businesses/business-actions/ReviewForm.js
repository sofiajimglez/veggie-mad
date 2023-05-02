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
      navigate('../profile', { replace: true });
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
        <p id='location-helper' className='form-text fst-italic'>Selecciona un valor entre 1 (menor puntuación) y 5 (mayor puntuación)</p>
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
      <div className='mb-3 form-floating'>
        <textarea
          id='text'
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder='Escribe tu reseña'
          {...register('text', { required: 'El texto es obligatorio' })} />
        <label htmlFor="floatingTextarea">Puedes escribir aquí tu reseña.</label>
      </div>
      {errors.text && <p className='invalid-feedback'>{errors.text?.message}</p>}

      <button type='submit' className='btn btn-primary w-100'>Enviar</button>

    </form>
  )
}
