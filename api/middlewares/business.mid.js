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