import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

export default function FilterForm({ onSearch }) {
  const { handleSubmit, reset, setError, control, formState: { errors } } = useForm({ mode: 'onBlur' });

  const [serverError, setServerError] = useState();

  const categoryOptions = ['Restaurante', 'Alojamiento', 'Tienda', 'Asociación benéfica', 'Servicio', 'Otro'].map(category => ({ value: category, label: category }));

  const priceOptions = [
    { value: 1, label: '€' },
    { value: 2, label: '€€' },
    { value: 3, label: '€€€' },
    { value: 4, label: '€€€€' },
    { value: 5, label: '€€€€€' },
  ];

  const tagsOptions = [
    { value: 'opciones veganas', label: 'opciones veganas' },
    { value: 'pet-friendly', label: 'pet-friendly' },
    { value: 'delivery', label: 'delivery' },
    { value: 'peluquería', label: 'peluquería' },
    { value: 'ecológico', label: 'ecológico' },
    { value: 'km 0', label: 'km 0' },
    { value: 'producto local', label: 'producto local' },
    { value: 'vegetariano', label: 'vegetariano' },
    { value: 'protectora', label: 'protectora' },
    { value: 'segunda mano', label: 'segunda mano' },
  ];

  const onSearchSubmit = async (query) => {
    try {
      setServerError();
      console.debug('Sending search request...');
      console.log('query', query);
      onSearch(query);
      reset();
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
    <form onSubmit={handleSubmit(onSearchSubmit)} className="row align-items-center">
      {/* Server error feedback */}
      <div className='mb-6'>
        {serverError && <p className="alert alert-danger d-none d-lg-block">{serverError}</p>}
      </div>

      {/* Category */}
      <div className="col-sm-12 col-md-6 mb-3">
        <label className="visually-hidden" htmlFor="inlineFormSelectPref">Cetgoría</label>
        <Controller
          control={control}
          name='category'
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              placeholder='Selecciona una categoría'
              className={`basic-multi-select form-control p-0 ${errors.category ? 'is-invalid' : ''}`}
              options={categoryOptions}
              isMulti
              classNamePrefix="Selecciona una categoría"
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: 'none',
                }),
              }}
              value={categoryOptions.find(option => option.value === value)}
              onChange={(option) => {
                onChange(option.map(opt => opt.value))
              }}
            />
          )}
        />
      </div>

      {/* Tags */}
      <div className='col-sm-12 col-md-6 mb-3'>
      <label className="visually-hidden" htmlFor="inlineFormSelectPref">Tags</label>
        <Controller
          control={control}
          name='tags'
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              placeholder='Selecciona las etiquetas'
              className={`basic-multi-select form-control p-0 ${errors.tags ? 'is-invalid' : ''}`}
              options={tagsOptions}
              isMulti
              classNamePrefix="Selecciona una categoría"
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: 'none',
                }),
              }}
              value={tagsOptions.find(option => option.value === value)}
              onChange={(option) => {
                onChange(option.map(opt => opt.value))
              }}
            />
          )}
        />
        {errors.tags && <p className='invalid-feedback'>{errors.tags?.message}</p>}
      </div>

      {/* Price */}
      <div className="col-sm-12 col-md-6">
        <label className="visually-hidden" htmlFor="inlineFormSelectPref">Price</label>
        <Controller
          control={control}
          name='price'
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              placeholder='Rango de precio'
              className={`basic-multi-select form-control p-0 ${errors.price ? 'is-invalid' : ''}`}
              options={priceOptions}
              isMulti
              classNamePrefix="Selecciona una categoría"
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: 'none',
                }),
              }}
              value={priceOptions.find(option => option.value === value)}
              onChange={(option) => onChange(option.map(x => x.value))}
            />
          )}
        />
      </div>

      <div className="col-sm-12 col-md-6">
        <button type="submit" className="btn btn-second w-100"><i className="fa-solid fa-magnifying-glass me-2"></i> Buscar</button>
      </div>
    </form>
  )
}
