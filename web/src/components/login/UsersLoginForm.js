import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import usersService from '../../services/users';
import businessesService from '../../services/businesses';
import { AuthContext } from '../../contexts/AuthUserStore';

export default function UsersLoginForm({ mode }) {
  const location = useLocation();
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: { username: location?.state?.user?.username } });
  const [serverError, setServerError] = useState();
  const { onUserChange } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLoginSubmit = async (user) => {
    try {
      setServerError();
      user = await (mode === 'user' ? usersService.login(user) : businessesService.login(user));
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
        {serverError && <p className="alert alert-danger d-none d-lg-block">{serverError}</p>}
      </div>

      {/* Confirm account feedback */}
      <div className='mb-6'> 
        {location?.state?.user?.confirm === false && <p className='alert alert-info'>Revisa tu bandeja de entrada y confirma tu cuenta para acceder</p>}
        {location?.state?.business?.confirm === false && <p className='alert alert-info'>Revisa tu bandeja de entrada y confirma tu cuenta para acceder</p>}
      </div>

      {/* Username */}
      <div className='mb-3'>
        <label htmlFor='username' className='form-label'>Alias de usuario</label>
        <div className='input-group'>
          <span className="input-group-text"><i className='fa-solid fa-at'></i></span>
          <input
            id='username'
            type='text'
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder='manuelamalasaña'
            {...register('username', { required: 'El nombre de usuario es obligatorio' })} />
        {errors.username && <p className='invalid-feedback'>{errors.username?.message}</p>}
        </div>
      </div>

      {/* Password */}
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>Contraseña</label>
        <div className='input-group'>
          <span className="input-group-text"><i className='fa-solid fa-lock'></i></span>
          <input
            type='password'
            id='password'
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder='••••••••'
            {...register('password', { required: 'La contraseña es obligatoria' })} />
        {errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>}
        </div>
      </div>

      <button type='submit' className='btn btn-primary w-100'>Acceder</button>

    </form>
  )
}

UsersLoginForm.defaultProps = {
  mode: 'user'
}
