const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports = (error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error); //reassigns the value of error
  } else if (error instanceof mongoose.Error.CastError && error.path === '_id') { //invalid id
    const resourceName = error.model().constructor.modelName;
    error = createError(404, `${resourceName} no encontrado`);
  } else if (error.message.includes("E11000")) { // duplicated keys
    Object.keys(error.keyValue).forEach((key) => error.keyValue[key] = 'No está disponible');
    error = createError(409, { errors: error.keyValue }); //409 Conflict Error
  } else if(!error.status) {
    error = createError(500, error);
  };

  console.error(error);

  const data = {
    message: error.message
  };

  if (error.errors) {
    const errors = Object.keys(error.errors).reduce((errors, errorKey) => { //each key is the name of the field with validation errors
      errors[errorKey] = error.errors[errorKey]?.message || error.errors[errorKey]; //(accumulator, currentValue) - currentValue: key
      return errors;
    }, {});
    data.errors = errors;
  };

  res.status(error.status).json(data);
};