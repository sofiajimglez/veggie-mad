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
          .then(() => res.status(204).send());
      } else { //if doesn't exist, it's created
        return Fav.create(params)
          .then(fav => {
            const { points } = req.loggedUser;
            Object.assign(req.loggedUser, { points: points + 2 });
            return req.loggedUser.save()
              .then(() => res.json(fav));
          });
      };
    })
    .catch(next);
};