import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import usersService from '../../services/users';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

export default function UsersUpdateForm({ user }) {
  const { register, handleSubmit, setError, control, formState: { errors } } = useForm(
    {
      mode: 'onBlur',
      defaultValues: {
        username: user.username,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl
      }
    });

  const [serverError, setServerError] = useState();
  const navigate = useNavigate();

  const onUserUpdate = async (user) => {
    try {
      setServerError();
      console.debug('Updating user...');
      user.location = user.location.location;
      await usersService.patch(user, user.id);
      navigate('/profile');
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
    <form onSubmit={handleSubmit(onUserUpdate)} className='px-5 py-3'>
      <h3 className='mb-4'>Edita tus datos</h3>

      {/* Server error feedback */}
      <div className='mb-6'>
        {serverError && <p className="alert alert-danger d-none d-lg-block">{serverError}</p>}
      </div>

      {/* Username */}
      <div className='mb-3'>
        <div className='input-group'>
          <span className="input-group-text"><i className='fa-solid fa-at'></i></span>
          <input
            id='username'
            type='text'
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder='manuelamalasaña'
            {...register('username', {
              required: 'El nombre de usuario es obligatorio',
              pattern: {
                value: /^[a-z0-9]+$/,
                message: 'Solo letras minúsuculas o números, sin espacios'
              }
            })} />
        {errors.username && <p className='invalid-feedback'>{errors.username?.message}</p>}
        </div>
      </div>

      {/* Name */}
      <div className='mb-3'>
        <div className='input-group'>
          <span className="input-group-text"><i className='fa-solid fa-face-smile'></i></span>
          <input
            type='text'
            id='name'
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder='Manuela Malasaña'
            {...register('name', { required: 'El nombre es obligatorio' })} />
          {errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div className='mb-3'>
        <div className='input-group'>
          <span className="input-group-text"><i className='fa-solid fa-envelope'></i></span>
          <input
            type='email'
            id='email'
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder='manuela@example.com'
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Por favor, introduce un email válido'
              }
            })} />
        {errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>}
        </div>
      </div>

      {/* Location */}
      <div className='mb-3'>
        <div className='input-group flex-nowrap'>
          <span className="input-group-text"><i className='fa-solid fa-location-dot'></i></span>
          <Controller
            control={control}
            name='location'
            rules={{
              required: 'La dirección es obligatoria'
            }}
            render={({ field: { onChange, value } }) => (
              <GooglePlacesAutocomplete
                autocompletionRequest={{
                  componentRestrictions: {
                    country: ['es'],
                  }
                }}
                selectProps={{
                  styles: {
                    valueContainer: (provided) => ({ ...provided, fontSize: '1rem', fontWeight: '400', border: 'none' }),
                    container: (provided) => ({ ...provided, borderRadius: '0.37rem', border: 'none', display: 'block', width: '100%' })
                  },
                  placeholder: 'Calle de Manuela Malasaña, s/n, Madrid',
                  value: value?.result,
                  onChange: async (result) => {
                    console.log(result);
                    const places = await geocodeByPlaceId(result.value.place_id);
                    const { lat, lng } = await getLatLng(places[0]);
                    onChange({ result, location: { address: result.label, coordinates: [lat, lng] } });
                  },
                }}
              />
            )}
          />
        {errors.location && <p className='invalid-feedback'>{errors.location?.message}</p>}
        </div>
      </div>

      {/* imageUrl */}
      <div className='mb-3'>
        <div className='input-group'>
        <span className="input-group-text"><i className='fa-solid fa-image'></i></span>
          <input
            type='file'
            id='imageUrl'
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
            placeholder='Selecciona una imagen de perfil'
            {...register('imageUrl')} />
          {errors.imageUrl && <p className='invalid-feedback'>{errors.imageUrl?.message}</p>}
        </div>
      </div>

      <button type='submit' className='btn btn-primary w-100'>Actualizar perfil</button>

    </form>
  )
}
