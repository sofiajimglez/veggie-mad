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
router.post('/users', users.create);
router.get('/users/:id', secure.userAuth, usersMid.exists, usersMid.isOwned, users.detail);
router.get('/users/:id/confirm', usersMid.exists, users.confirm);
router.patch('/users/:id', storage.single('imageUrl'), secure.userAuth, usersMid.exists, usersMid.isOwned, users.update);
router.delete('/users/:id', secure.userAuth, usersMid.exists, usersMid.isOwned, users.delete);

/* Business routes */
router.post('/businesses', businesses.create);
router.get('/businesses', businesses.list);
router.get('/businesses/:id', businessMid.exists, businesses.detail);
router.get('/businesses/:id/confirm', businessMid.exists, businesses.confirm);
router.patch('/businesses/:id', secure.businessAuth, businessMid.exists, businessMid.isOwned, storage.single('imageUrl'), storage.array('gallery'), businesses.update);
router.delete('/businesses/:id', secure.businessAuth, businessMid.exists, businessMid.isOwned, businesses.delete);

router.post('/businesses/:id/fav', secure.userAuth, businessMid.exists, fav.toggle);
router.get('/businesses/:id/fav', secure.userAuth, businessMid.exists, fav.checkFav);

router.post('/businesses/:id/visit', secure.userAuth, businessMid.exists, visit.create);
router.get('/businesses/:id/visit', secure.userAuth, businessMid.exists, visit.checkVisit);

router.post('/businesses/:id/review', secure.userAuth, businessMid.exists, review.create);
router.patch('/businesses/:id/review/:reviewId', secure.userAuth, businessMid.exists, review.update);
router.delete('/businesses/:id/review/:reviewId', secure.userAuth, businessMid.exists, review.delete);
router.post('/businesses/:id/review/:reviewId/comment', secure.businessAuth, businessMid.exists, businessMid.isOwned, review.comment);

/* Login routes */
router.post('/login/users', users.login);
router.post('/login/businesses', businesses.login);


module.exports = router;
