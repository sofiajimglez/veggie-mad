const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const businesses = require('../controllers/business.controller');
const review = require('../controllers/reviews.controller');

const usersMid = require('../middlewares/users.mid');
const businessMid = require('../middlewares/business.mid');
const secure = require('../middlewares/secure.mid')

/* User routes */
router.post('/users', users.create);
router.get('/users/:id', secure.userAuth, usersMid.exists, usersMid.isOwned, users.detail);
router.patch('/users/:id', secure.userAuth, usersMid.exists, usersMid.isOwned, users.update);
router.delete('/users/:id', secure.userAuth, usersMid.exists, usersMid.isOwned, users.delete);

/* Business routes */
router.post('/businesses', businesses.create);
router.get('/businesses', businesses.list);
router.get('/businesses/:id', businessMid.exists, businesses.detail);
router.patch('/businesses/:id', secure.businessAuth, businessMid.exists, businessMid.isOwned, businesses.update);
router.delete('/businesses/:id', secure.businessAuth, businessMid.exists, businessMid.isOwned, businesses.delete);

router.post('/businesses/:id/fav', secure.userAuth, businessMid.exists, businesses.toggleFav);

router.post('/businesses/:id/review', secure.userAuth, businessMid.exists, review.create);
router.patch('/businesses/:id/review/:reviewId', secure.userAuth, businessMid.exists, review.update);
router.delete('/businesses/:id/review/:reviewId', secure.userAuth, businessMid.exists, review.delete);

/* Login routes */
router.post('/login/users', users.login);
router.post('/login/businesses', businesses.login);


module.exports = router;
