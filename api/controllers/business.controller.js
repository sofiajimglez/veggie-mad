const Business = require('../models/business.model');
const Fav = require('../models/Fav.model');

const { generateLoyaltyCode } = require('../utils/loyaltyCode');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
  const { lat, lng } = req.body;
  if (lat && lng) { //transforms data from form to the format needed by mongoose
    req.body.location = {
      type: 'Point',
      coordinates: [lng, lat]
    }
  }

  req.body.loyaltyCode = generateLoyaltyCode(); //creates random code

  Business.create(req.body)
    .then(business => res.status(201).json(business))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  Business.find()
    .populate('favs')
    .then(businesses => res.json(businesses))
    .catch(next)
}

module.exports.detail = (req, res, next) => res.json(req.business);

module.exports.update = (req, res, next) => {
  Object.assign(req.business, req.body);
  req.business.save()
    .then(business => res.json(business))
    .catch(next)
};

module.exports.delete = (req, res, next) => {
  Business.deleteOne({ _id: req.business.id })
    .then(() => res.status(204).send())
    .catch(next)
}

module.exports.login = (req, res, next) => {
  Business.findOne({ username: req.body.username })
    .then((business) => {
      if (!business || !req.body.password) {
        return next(createError(401, 'Por favor, revisa el nombre de usuario y la contraseña'));
      };

      business.checkPassword(req.body.password) //checkPassword is defined in the model
        .then((match) => {
          if (!match) {
            return next(createError(401, 'Por favor, revisa el nombre de usuario y la contraseña'));
          } else if (!business.confirm) {
            return next(createError(401, 'Revisa tu bandeja de entrada y confirma tu cuenta para acceder'));
          };

          const token = jwt.sign({ sub: business.id, exp: Date.now() / 1000 + 3_600 }, process.env.JWT_SECRET) //generates a token for authentication that expirates
          res.json({ token });
        });
    })
    .catch(next);
};

module.exports.toggleFav = (req, res, next) => {
  const params = {
    user: req.loggedUser.id,
    business: req.business.id
  };

  Fav.findOne(params)
    .then(fav => {
      if (fav) { //if exists, it's deleted
        return Fav.deleteOne({ _id: fav.id })
          .then(() => res.status(204).send());
      } else { //if doesn't exist, it's created
        return Fav.create(params)
          .then(fav => res.json(fav));
      };
    })
    .catch(next);
};