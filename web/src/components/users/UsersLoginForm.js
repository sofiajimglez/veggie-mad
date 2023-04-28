import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import usersService from '../../services/users';
import { AuthContext } from '../../contexts/AuthUserStore';

export default function UsersLoginForm() {
  const location = useLocation();
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: { username: location?.state?.user?.username } });
  const [serverError, setServerError] = useState();
  const { onUserChange } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLoginSubmit = async (user) => {
    try {
      setServerError();
      user = await usersService.login(user);
      onUserChange(user);
      navigate('/');
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
    <form onSubmit={handleSubmit(onLoginSubmit)}>
      {/* Server error feedback */}
      <div className='mb-6'>
        {serverError && <p className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg block w-full p-2.5">{serverError}</p>}
      </div>

      {/* Confirm account feedback */}
      <div className='mb-6'> 
        {location?.state?.user?.confirm === false && <p className="bg-blue-50 border border-blue-500 text-blue-900 placeholder-blue-700 text-sm rounded-lg block w-full p-2.5">Revisa tu bandeja de entrada y confirma tu cuenta para acceder</p>}
      </div>

      {/* Username */}
      <div className='mb-4'>
        <label htmlFor='username' className='block mb-1 text-sm font-medium text-gray-900'>Alias de usuario</label>
        <input
          id='username'
          type='text'
          className={`rounded-lg block flex-1 min-w-0 w-full text-sm p-2.5 border border-gray-300 text-gray-900 ${errors.username ? 'bg-red-50 placeholder-red-700' : 'bg-gray-50'}`}
          placeholder='manuelamalasaña'
          {...register('username', { required: 'El nombre de usuario es obligatorio' })} />
        {errors.username && <p className='mt-2 text-sm text-red-600'>{errors.username?.message}</p>}
      </div>

      {/* Password */}
      <div className='mb-4'>
        <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>Contraseña</label>
        <input
          type='password'
          id='password'
          className={`rounded-lg block flex-1 min-w-0 w-full text-sm p-2.5 border border-gray-300 text-gray-900 ${errors.password ? 'bg-red-50 placeholder-red-700' : 'bg-gray-50'}`}
          placeholder='••••••••'
          {...register('password', { required: 'La contraseña es obligatoria' })} />
        {errors.password && <p className='mt-2 text-sm text-red-600'>{errors.password?.message}</p>}
      </div>

      <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'>Acceder</button>

    </form>
  )
}
