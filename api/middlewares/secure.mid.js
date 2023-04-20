module.exports.cleanBody = (req, res, next) => { //deletes inputs from req.body to protect update process
  if (req.body) {
    delete req.body._id;
    delete req.body.createdAt;
    delete req.body.updatedAt;
    delete req.body.confirm;
    delete req.body.points;
    delete req.body.loyaltyCode;
  }
  next();
}