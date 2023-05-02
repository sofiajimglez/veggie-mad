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
      const { currentPoints } = req.loggedUser;
      Object.assign(req.loggedUser, { points: currentPoints + accumulatedPoints });
      return req.loggedUser.save()
        .then((user) => res.status(201).json(user));
    })
    .catch(next);
};