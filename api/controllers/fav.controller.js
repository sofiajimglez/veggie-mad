const Fav = require('../models/Fav.model');

module.exports.toggle = (req, res, next) => {
  const params = {
    user: req.loggedUser.id,
    business: req.business.id
  };

  Fav.findOne(params)
    .then(fav => {
      if (fav) { //if exists, it's deleted
        return Fav.deleteOne({ _id: fav.id })
          .then(() => -2);
      } else { //if doesn't exist, it's created
        return Fav.create(params)
          .then(() => 2);
      };
    })
    .then(accumulatedPoints => {
      const { points } = req.loggedUser;
      Object.assign(req.loggedUser, { points: points + accumulatedPoints });
      return req.loggedUser.save()
        .then((user) => res.status(201).json(user));
    })
    .catch(next);
};

module.exports.checkFav = (req, res, next) => {
  const params = {
    user: req.loggedUser.id,
    business: req.business.id
  };

  Fav.findOne(params)
    .then(fav => {
      const result = {};
      if (fav) {
        result.isFav = true;
        res.status(201).json(result);
      } else {
        result.isFav = false;
        res.status(201).json(result);
      };
    })
}