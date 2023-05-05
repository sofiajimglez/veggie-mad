const Visit = require('../models/visit.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
  const params = {
    user: req.loggedUser.id,
    business: req.business.id
  };

  Visit.findOne(params)
    .then(visit => {
      if (visit) {
        return next(createError(403, 'Ya has marcado como visitado este establecimiento'));
      } else if (!req.body.loyaltyCode) {
        return next(createError(403, 'Por favor, introduce el código de visita del establecimiento'));
      } else if (req.body.loyaltyCode !== req.business.loyaltyCode) {
        return next(createError(403, 'El código de visita es incorrecto'));
      } else {
        return Visit.create(params)
          .then(() => {
            const { points } = req.loggedUser;
            Object.assign(req.loggedUser, { points: points + 6 });
            return req.loggedUser.save()
              .then((user) => res.status(201).json(user))
          })
          .catch(next);
      }
    })
};

module.exports.checkVisit = (req, res, next) => {
  const params = {
    user: req.loggedUser.id,
    business: req.business.id
  };

  Visit.findOne(params)
    .then(visit => {
      const result = {};
      if (visit) {
        result.isVisited = true;
        res.status(201).json(result);
      } else {
        result.isVisited = false;
        res.status(201).json(result);
      };
    })
}