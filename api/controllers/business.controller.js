const Business = require('../models/business.model');
const { generateLoyaltyCode } = require('../utils/loyaltyCode');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const mailer = require('../config/mailer.config');
const moment = require('moment');

const MAX_SESSION_DAYS = parseInt(process.env.MAX_SESSION_DAYS || 1);

module.exports.create = (req, res, next) => {
  const { location } = req.body;
  req.body.address = location?.address;
  req.body.location = {
    type: 'Point',
    coordinates: location?.coordinates?.reverse()
  };

  req.body.loyaltyCode = generateLoyaltyCode(); //creates random code

  Business.create(req.body)
    .then(business => {
      mailer.sendBusinessConfirmationEmail(business);
      res.status(201).json(business);
    })
    .catch(next);
};

module.exports.confirm = (req, res, next) => {
  req.business.confirm = true;
  req.business.save()
    .then(() => res.redirect(`${process.env.WEB_URL}`))
    .catch(next);
}

module.exports.list = (req, res, next) => {
  Business.find()
    .populate('favs reviews visits')
    .then(businesses => res.json(businesses))
    .catch(next);
};

module.exports.detail = (req, res, next) => res.json(req.business);

module.exports.update = (req, res, next) => {
  delete req.body.loyaltyCode;

  if (req.file) {
    req.body.imageUrl = req.file.path;
  } else if (req.files) {
    req.body.gallery = req.files.map(file => file.path);
  };

  const { location } = req.body;
  req.body.address = location?.address;
  req.body.location = {
    type: 'Point',
    coordinates: location?.coordinates?.reverse(),
  }

  Object.assign(req.business, req.body);
  req.business.save()
    .then(business => res.json(business))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Business.deleteOne({ _id: req.business.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.login = (req, res, next) => {
  Business.findOne({ username: req.body.username })
    .then((business) => {
      if (!business || !req.body.password) {
        return next(createError(401, { errors: { password: 'Por favor, revisa el nombre de usuario y la contraseña' }}));
      };

      business.checkPassword(req.body.password) //checkPassword is defined in the model
        .then((match) => {
          if (!match) {
            return next(createError(401, { errors: { password: 'Por favor, revisa el nombre de usuario y la contraseña' }}));
          } else if (!business.confirm) {
            return next(createError(401, { errors: { username: 'Revisa tu bandeja de entrada y confirma tu cuenta para acceder' }}));
          };
          
          const token = jwt.sign({ sub: business.id, exp: moment().add(MAX_SESSION_DAYS, 'days').valueOf() / 1000 }, process.env.JWT_SECRET); //generates a token for authentication
          res.json({ token, ...business.toJSON() });
        });
    })
    .catch(next);
};

