import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import reviewService from '../../services/review';
import { useNavigate } from 'react-router-dom';

export default function CommentForm({ review, business }) {
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({ mode: 'onBlur' });

  const [serverError, setServerError] = useState();
  const navigate = useNavigate();

  const onCommentSubmit = async (comment) => {
    try {
      setServerError();
      reset();
      console.debug('Creating comment...');
      comment = await reviewService.comment(business, review, comment);
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
    <form onSubmit={handleSubmit(onCommentSubmit)}>

      {/* Server error feedback */}
      <div className='mb-6'>
        {serverError && <p className="alert alert-danger d-none d-lg-block">{serverError}</p>}
      </div>

      {/* Text */}
      <div className='mb-3 form-floating'>
        <textarea
          id='text'
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder='Deja una respuesta a la reseña...'
          {...register('text', { required: 'El texto es obligatorio' })} />
        {errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>}
        <label htmlFor="floatingTextarea">Deja tu comentario...</label>
      </div>

      <button type='submit' className='btn btn-second-line w-100'>Enviar</button>

    </form>
  )
}
