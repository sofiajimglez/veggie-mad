module.exports.cleanBody = (req, res, next) => {
  //deletes inputs from req.body to protect the update
  if (req.body) {
    delete req.body._id;
    delete req.body.createdAt;
    delete req.body.updatedAt;
    delete req.body.confirm;
    delete req.body.privacy;
    delete req.body.points;
    delete req.body.loyaltyCode;
  }

  next()
}