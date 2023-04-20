const User = require('../models/user.model');
const createError = require('http-errors');

module.exports.exists = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        next(createError(404, 'User not found'));
      }
    })
    .catch(next)
};

module.exports.isOwned = (req, res, next) => {
  if (req.user.id !== req.loggedUser.id) {
    return next(createError(403, 'No tienes permiso para realizar esta acción'));
  } else {
    next();
  }
}