import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import businessService from '../../../services/businesses';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export default function FilterForm() {
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

// Tags config
const components = { DropdownIndicator: null };
const createOption = (label) => ({
  label,
  value: label,
});

const [inputValue, setInputValue] = useState('');
const [value, setValue] = useState();

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

  const onSearchSubmit = async (query) => {
    try {
      setServerError();
      console.debug('Sending search request...');
      console.log('query', query);
      await businessService.list(query);
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
        <label className="visually-hidden"htmlFor="inlineFormSelectPref">Preference</label>
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
              onChange={(option) => onChange(option.value)}
            />
          )}
        />
      </div>

      {/* Tags */}
      <div className='col-sm-12 col-md-6 mb-3'>
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
              placeholder="Etiquetas de búsqueda"
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

      {/* Price */}
      <div className="col-sm-12 col-md-6">
        <label className="visually-hidden"htmlFor="inlineFormSelectPref">Preference</label>
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
              onChange={(option) => onChange(option.value)}
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
