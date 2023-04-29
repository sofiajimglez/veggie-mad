import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import usersService from '../../services/users';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

export default function UsersRegisterForm() {
  const { register, handleSubmit, setError, control, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();

  const onUserSubmit = async (user) => {
    try {
      setServerError();
      console.debug('Registering user...');
      user.location = user.location.location;
      user = await usersService.create(user);
      navigate('/login', { state: { user } });
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
    <form onSubmit={handleSubmit(onUserSubmit)}>
      {/* Server error feedback */}
      <div className='mb-6'>
        {serverError && <p className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400">{serverError}</p>}
      </div>

      {/* Username */}
      <div className='mb-4'>
        <label htmlFor='username' className='block mb-1 text-sm font-medium text-gray-900'>Alias de usuario</label>
        <input
          id='username'
          type='text'
          className={`rounded-lg block flex-1 min-w-0 w-full text-sm p-2.5 border border-gray-300 text-gray-900 ${errors.username ? 'bg-red-50 placeholder-red-700' : 'bg-gray-50'}`}
          placeholder='manuelamalasaña'
          {...register('username', {
            required: 'El nombre de usuario es obligatorio',
            pattern: {
              value: /^[a-z0-9]+$/,
              message: 'Solo letras minúsuculas o números, sin espacios'
            }
          })} />
        {errors.username && <p className='mt-2 text-sm text-red-600'>{errors.username?.message}</p>}
      </div>

      {/* Name */}
      <div className='mb-4'>
        <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>Nombre y apellidos</label>
        <input
          type='text'
          id='name'
          className={`rounded-lg block flex-1 min-w-0 w-full text-sm p-2.5 border border-gray-300 text-gray-900 ${errors.name ? 'bg-red-50 placeholder-red-700' : 'bg-gray-50'}`}
          placeholder='Manuela Malasaña'
          {...register('name', { required: 'El nombre es obligatorio' })} />
        {errors.name && <p className='mt-2 text-sm text-red-600'>{errors.name?.message}</p>}
      </div>

      {/* Email */}
      <div className='mb-4'>
        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>Correo electrónico</label>
        <input
          type='email'
          id='email'
          className={`rounded-lg block flex-1 min-w-0 w-full text-sm p-2.5 border border-gray-300 text-gray-900 ${errors.email ? 'bg-red-50 placeholder-red-700' : 'bg-gray-50'}`}
          placeholder='✉️ manuela@example.com'
          {...register('email', {
            required: 'El email es obligatorio',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Por favor, introduce un email válido'
            }
          })} />
        {errors.email && <p className='mt-2 text-sm text-red-600'>{errors.email?.message}</p>}
      </div>

      {/* Location */}
      <div className='mb-4'>
        <label htmlFor='location' className='block mb-2 text-sm font-medium text-gray-900'>Localización</label>
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
                  valueContainer: (provided) => ({ ...provided, fontSize: '1rem', borderRadius: '0.37rem', border: 'none'})
                },
                placeholder: '📍 Calle de Manuela Malasaña, s/n, Madrid',
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
        <p id='location-helper' className='mt-2 text-sm text-gray-500 italic'>¡Queremos mostrarte los lugares más cercanos a ti! Nunca compartiremos esta información con terceros.</p>
        {errors.location && <p className='mt-2 text-sm text-red-600'>{errors.location?.message}</p>}

        <input type='hidden' name='lat' {...register('lat')} />
        <input type='hidden' name='lng' {...register('lng')} />
      </div>

      {/* Password */}
      <div className='mb-4'>
        <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>Contraseña</label>
        <input
          type='password'
          id='password'
          className={`rounded-lg block flex-1 min-w-0 w-full text-sm p-2.5 border border-gray-300 text-gray-900 ${errors.password ? 'bg-red-50 placeholder-red-700' : 'bg-gray-50'}`}
          placeholder='••••••••'
          {...register('password', {
            required: 'Por favor, establece una contraseña',
            minLength: {
              value: 8,
              message: 'Mínimo 8 caracteres'
            }
          })} />
        {errors.password && <p className='mt-2 text-sm text-red-600'>{errors.password?.message}</p>}
      </div>

      {/* Privacy */}
      <div className='mb-4'>
        <div className='flex items-center'>
          <input
            id='privacy'
            type='checkbox'
            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300'
            {...register('privacy', { required: 'Tienes que aceptar la política de privacidad para crear tu cuenta' })} />
          <label htmlFor='privacy' className='ml-2 text-sm font-medium text-gray-900'>Acepto la Política de Privacidad</label>
        </div>
        {errors.privacy && <p className='mt-2 text-sm text-red-600'>{errors.privacy?.message}</p>}
      </div>

      <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'>Crear cuenta</button>

    </form>
  )
}
