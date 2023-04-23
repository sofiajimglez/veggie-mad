const Business = require('../models/business.model');
const createError = require('http-errors');

module.exports.exists = (req, res, next) => {
  Business.findById(req.params.id)
    .populate({ path: 'favs', populate: 'user' })
    .populate({ path: 'visits', populate: 'user' })
    .populate({ path: 'reviews', populate: 'user comments' })
    .then(business => {
      if (business) {
        req.business = business;
        next();
      } else {
        next(createError(404, 'Establecimiento no encontrado'));
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