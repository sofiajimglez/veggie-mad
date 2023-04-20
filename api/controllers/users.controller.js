const User = require('../models/user.model');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
  User.create(req.body)
  .then(user => res.status(201).json(user))
  .catch(next);
};

module.exports.detail = (req, res, next) => res.json(req.user);

module.exports.update = (req, res, next) => {
  Object.assign(req.user, req.body);
  req.user.save()
    .then(user => res.json(user))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  User.deleteOne({ _id: req.user.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username }) 
    .then((user) => {
      if (!user || !req.body.password) {
        return next(createError(401, 'Por favor, revisa el nombre de usuario y la contraseña'));
      }; 

      user.checkPassword(req.body.password) //checkPassword is defined in the model
        .then((match) => {
          if (!match) {
            return next(createError(401, 'Por favor, revisa el nombre de usuario y la contraseña'));
          } else if (!user.confirm) {
            return next(createError(401, 'Revisa tu bandeja de entrada y confirma tu cuenta para acceder'));
          };

          const token = jwt.sign({ sub: user.id, exp: Date.now() / 1000 + 3_600 }, process.env.JWT_SECRET); //generates a token for authentication that expirates in 1 hour
          res.json({ token });
        });
    })
    .catch(next);
};