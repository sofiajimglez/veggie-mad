const User = require('../models/user.model');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const mailer = require('../config/mailer.config');

const maxSessionTime = parseInt(process.env.MAX_SESSION_TIME || 3_600);

module.exports.create = (req, res, next) => {
  
  const { location } = req.body;
  req.body.address = location?.address;
  req.body.location = {
    type: 'Point',
    coordinates: location?.coordinates?.reverse(),
  }

  User.create(req.body)
  .then(user => {
    mailer.sendUserConfirmationEmail(user);
    res.status(201).json(user);
  })
  .catch(next);
};

module.exports.confirm = (req, res, next) => {
  req.user.confirm = true;
  req.user.save()
    .then(() => res.redirect(`${process.env.WEB_URL}`))
    .catch(next);
}

module.exports.detail = (req, res, next) => res.json(req.user);

module.exports.update = (req, res, next) => {
  if (req.file) {
    req.body.imageUrl = req.file.path;
  };

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
        return next(createError(401, { errors: { password: 'Por favor, revisa el nombre de usuario y la contraseña' }}));
      }; 

      user.checkPassword(req.body.password) //checkPassword is defined in the model
        .then((match) => {
          if (!match) {
            return next(createError(401, { errors: { password: 'Por favor, revisa el nombre de usuario y la contraseña' }}));
          } else if (!user.confirm) {
            return next(createError(401, { errors: { username: 'Revisa tu bandeja de entrada y confirma tu cuenta para acceder' }}));
          };

          const token = jwt.sign({ sub: user.id, exp: Date.now() / maxSessionTime }, process.env.JWT_SECRET); //generates a token for authentication that expirates in 1 hour
          res.json({ token, ...user.toJSON() });
        });
    })
    .catch(next);
};