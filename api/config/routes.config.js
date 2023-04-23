const express = require('express');
const router = express.Router();

const storage = require('../config/storage.config');

const users = require('../controllers/users.controller');
const businesses = require('../controllers/business.controller');
const fav = require('../controllers/fav.controller');
const review = require('../controllers/reviews.controller');
const visit = require('../controllers/visits.controller');

const usersMid = require('../middlewares/users.mid');
const businessMid = require('../middlewares/business.mid');
const secure = require('../middlewares/secure.mid')

/* User routes */
router.post('/users', storage.single('imageUrl'), users.create);
router.get('/users/:id', secure.userAuth, usersMid.exists, usersMid.isOwned, users.detail);
router.get('/users/:id/confirm', usersMid.exists, users.confirm);
router.patch('/users/:id', secure.userAuth, usersMid.exists, usersMid.isOwned, users.update);
router.delete('/users/:id', secure.userAuth, usersMid.exists, usersMid.isOwned, users.delete);

/* Business routes */
router.post('/businesses', storage.single('imageUrl'), storage.array('gallery'), businesses.create);
router.get('/businesses', businesses.list);
router.get('/businesses/:id', businessMid.exists, businesses.detail);
router.get('/businesses/:id/confirm', businessMid.exists, businesses.confirm);
router.patch('/businesses/:id', secure.businessAuth, businessMid.exists, businessMid.isOwned, businesses.update);
router.delete('/businesses/:id', secure.businessAuth, businessMid.exists, businessMid.isOwned, businesses.delete);

router.post('/businesses/:id/fav', secure.userAuth, businessMid.exists, fav.toggle);

router.post('/businesses/:id/visit', secure.userAuth, businessMid.exists, visit.create);

router.post('/businesses/:id/review', secure.userAuth, businessMid.exists, review.create);
router.patch('/businesses/:id/review/:reviewId', secure.userAuth, businessMid.exists, review.update);
router.delete('/businesses/:id/review/:reviewId', secure.userAuth, businessMid.exists, review.delete);

/* Login routes */
router.post('/login/users', users.login);
router.post('/login/businesses', businesses.login);


module.exports = router;
