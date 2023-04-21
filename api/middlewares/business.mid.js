const Business = require('../models/business.model');
const createError = require('http-errors');

module.exports.exists = (req, res, next) => {
  Business.findById(req.params.id)
    .then(business => {
      if (business) {
        req.business = business;
        next();
      } else {
        next(createError(404, 'Business not found'));
      }
    })
    .catch(next)
};

module.exports.isOwned = (req, res, next) => {
  if (req.business.id !== req.loggedBusiness.id) {
    return next(createError(403, 'No tienes permiso para realizar esta acción'));
  } else {
    next();
  }
}