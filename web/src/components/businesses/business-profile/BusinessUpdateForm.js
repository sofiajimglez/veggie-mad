import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import businessesService from '../../../services/businesses';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

export default function BusinessUpdateForm() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, setError, control, formState: { errors } } = useForm(
    {
      mode: 'onBlur',
      defaultValues: {
        username: user.username,
        name: user.name,
        email: user.email,
        description: user.description,
        category: user.category,
        price: user.price || 3,
        tags: user.tags || [],
        imageUrl: user.imageUrl,
        facebookUrl: user.facebookUrl,
        instagramUrl: user.instagramUrl,
        twitterUrl: user.twitterUrl,
        location: user.location
      }
    });

  const [serverError, setServerError] = useState();
  const navigate = useNavigate();

  const categoryOptions = ['Restaurante', 'Alojamiento', 'Tienda', 'Asociación benéfica', 'Servicio', 'Otro'].map(category => ({ value: category, label: category }));

  // Tags config
  const components = { DropdownIndicator: null };
  const createOption = (label) => ({
    label,
    value: label,
  });

  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(user.tags);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
        break;
      default:
        break;
    }
  };
  // Ends tags config

  const onBusinessUpdate =  async (updatedBusiness) => {
    try {
      setServerError();
      console.debug('Updating business...');
      updatedBusiness.location = updatedBusiness.location.location;
      await businessesService.update( user, updatedBusiness);
      navigate('/profile');
    } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
          Object.keys(errors)
            .forEach((inputName) => setError(inputName, { message: errors[inputName] }));
        } else {
          setServerError(error.message);
        };
      };
  };

  return (
    <form onSubmit={handleSubmit(onBusinessUpdate)} encType='multipart/form-data' className='px-5 py-3'>
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
            placeholder='tiendavegana'
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

      {/* Category */}
      <div className='mb-3'>
        <div className='input-group'>
          <span className="input-group-text"><i className='fa-solid fa-briefcase'></i></span>
          <Controller
            control={control}
            name='category'
            rules={{
              required: 'Por favor, selecciona una categoría'
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                inputRef={ref}
                className={`form-control p-0 ${errors.category ? 'is-invalid' : ''}`}
                placeholder='Selecciona una categoría...'
                options={categoryOptions}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    border: 'none',
                  }),
                }}
                value={categoryOptions.find(option => option.value === value)}
                onChange={(option) => onChange(option.value)}
              />
            )}
          />
          {errors.category && <p className='invalid-feedback'>{errors.category?.message}</p>}
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
            placeholder='Tienda Vegana'
            {...register('name', { required: 'El nombre es obligatorio' })} />
          {errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>}
        </div>
      </div>

      {/* Description */}
      <div className='mb-3'>
        <div className='input-group'>
          <span className="input-group-text"><i className="fa-solid fa-paragraph"></i></span>
          <input
            type='text'
            id='description'
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder='Tienda Vegana es un negocio libre de crueldad animal y respetuoso con el planeta'
            {...register('description')} />
          {errors.description && <p className='invalid-feedback'>{errors.description?.message}</p>}
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
            placeholder='tiendavegana@example.com'
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

      {/* Price */}
      <div className='mb-3'>
        <label htmlFor='price' className='form-label'>Rango de precio</label>
        <p id='location-helper' className='form-text fst-italic'>Selecciona un valor entre 1 (menor precio) y 5 (mayor precio)</p>
        <input
          type='range'
          id='description'
          className={`form-range ${errors.name ? 'is-invalid' : ''}`}
          min='1'
          max='5'
          {...register('price')} />
        {errors.price && <p className='invalid-feedback'>{errors.price?.message}</p>}
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
                  placeholder: 'Calle de Concepción Arenal, s/n, Madrid',
                  value: value?.result,
                  onChange: async (result) => {
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
        {/* <p id='location-helper' className='form-text fst-italic'>¡Queremos mostrarte los lugares más cercanos a ti! Nunca compartiremos esta información con terceros.</p> */}
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

      {/* Tags */}
      <div className='mb-3 w-100'>
        <div className='input-group flex-fill'>
          <span className="input-group-text"><i className='fa-solid fa-tags'></i></span>
          <Controller
            control={control}
            name='tags'
            render={() => (
              <CreatableSelect
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => setValue(newValue)}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe una etiqueta y pulsa enter: pet-friendly, opciones veganas..."
                value={value}
                styles={{
                  input: (baseStyles) => ({
                    ...baseStyles,
                    width: 'auto'
                  }),
                }}
              />
            )}
          />
          {errors.category && <p className='invalid-feedback'>{errors.category?.message}</p>}
        </div>
      </div>

      {/* Facebook */}
      <div className='mb-3'>
        <div className='input-group'>
          <span className="input-group-text"><i className="fa-brands fa-facebook-f"></i></span>
          <input
            id='facebookUrl'
            type='text'
            className={`form-control ${errors.facebookUrl ? 'is-invalid' : ''}`}
            placeholder='https://www.facebook.com/tiendavegana'
            {...register('facebookUrl')} />
          {errors.facebookUrl && <p className='invalid-feedback'>{errors.facebookUrl?.message}</p>}
        </div>
      </div>

      {/* Instagram */}
      <div className='mb-3'>
        <div className='input-group'>
          <span className="input-group-text"><i className="fa-brands fa-instagram"></i></span>
          <input
            id='instagramUrl'
            type='text'
            className={`form-control ${errors.instagramUrl ? 'is-invalid' : ''}`}
            placeholder='https://www.instagram.com/tiendavegana'
            {...register('instagramUrl')} />
          {errors.instagramUrl && <p className='invalid-feedback'>{errors.instagramUrl?.message}</p>}
        </div>
      </div>

      {/* Twitter */}
      <div className='mb-3'>
        <div className='input-group'>
          <span className="input-group-text"><i className="fa-brands fa-twitter"></i></span>
          <input
            id='twitterUrl'
            type='text'
            className={`form-control ${errors.twitterUrl ? 'is-invalid' : ''}`}
            placeholder='https://twitter.com/tiendavegana'
            {...register('twitterUrl')} />
          {errors.twitterUrl && <p className='invalid-feedback'>{errors.twitterUrl?.message}</p>}
        </div>
      </div>

      <button type='submit' className='btn btn-main w-100'>Actualizar perfil</button>

    </form>
  )
}
