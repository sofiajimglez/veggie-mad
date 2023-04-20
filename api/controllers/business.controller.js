const Business = require('../models/business.model');
const { generateLoyaltyCode } = require('../utils/loyaltyCode');

module.exports.create = (req, res, next) => {
  req.body.loyaltyCode = generateLoyaltyCode(); //creates random code

  Business.create(req.body)
    .then(business => res.status(201).json(business))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  Business.find()
    //.populate('favs reviews visits')
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