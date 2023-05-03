const Review = require('../models/Review.model');
const Comment = require('../models/comment.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
  const params = {
    user: req.loggedUser.id,
    business: req.business.id,
    rating: req.body.rating,
    text: req.body.text
  }

  if (req.loggedUser.points >= 10) {
    Review.create(params)
      .then(() => {
        const { points } = req.loggedUser;
        Object.assign(req.loggedUser, { points: points + 4 });
        return req.loggedUser.save()
          .then((user) => res.status(201).json(user));
        })
      .catch(next);
  } else {
    return next(createError(403, 'Necesitas al menos 10 puntos para realizar esta acción'));
  }
}

module.exports.update = (req, res, next) => {
  Review.findByIdAndUpdate(
    req.params.reviewId, 
    req.body, 
    { runValidators: true, returnDocument: 'after', timestamps: 'true', upsert: 'true' }
  )
    .then(review => res.json(review))
    .catch(next); 
};

module.exports.delete = (req, res, next) => {
  Review.deleteOne({ _id: req.params.reviewId })
    .then(() => res.status(204).send())
    .catch(next)
}

module.exports.comment = (req, res, next) => {
  const params = {
    business: req.loggedBusiness.id,
    review: req.params.reviewId,
    text: req.body.text
  }

  Comment.create(params)
    .then(comment => res.status(201).json(comment))
    .catch(next);
}