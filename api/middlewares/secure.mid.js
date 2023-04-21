const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/user.model');
const Business = require('../models/business.model');

module.exports.cleanBody = (req, res, next) => { //deletes inputs from req.body to protect update process
  if (req.body) {
    delete req.body._id;
    delete req.body.createdAt;
    delete req.body.updatedAt;
    delete req.body.confirm;
    delete req.body.points;
    delete req.body.loyaltyCode;
  }
  next();
}

module.exports.userAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')?.[1]; //[0]-Bearer [1]-token

  if (!token) {
    return next(createError(401, 'No se encuentra el token de acceso'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded.sub)
      .then(user => {
        if (user) {
          req.loggedUser = user;
          next();
        } else {
          next(createError(401, 'Propietario del token no encontrado'));
        }
      })
      .catch(next);
  } catch (error) {
    next(createError(401, 'El token de acceso no es válido'));
  }
};

module.exports.businessAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')?.[1]; //[0]-Bearer [1]-token

  if (!token) {
    return next(createError(401, 'No se encuentra el token de acceso'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    Business.findById(decoded.sub)
      .then(business => {
        if (business) {
          req.loggedBusiness = business;
          next();
        } else {
          next(createError(401, 'Propietario del token no encontrado'));
        }
      })
      .catch(next);
  } catch (error) {
    next(createError(401, 'El token de acceso no es válido'));
  }
};