const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const businesses = require('../controllers/business.controller');

const usersMid = require('../middlewares/users.mid');
const businessMid = require('../middlewares/business.mid');

/* User routes */
router.post('/users', users.create);
router.get('/users/:id', usersMid.exists, users.detail);
router.patch('/users/:id', usersMid.exists, users.update);
router.delete('/users/:id', usersMid.exists, users.delete);

/* Business routes */
router.post('/businesses', businesses.create);
router.get('/businesses', businesses.list);
router.get('/businesses/:id', businessMid.exists, businesses.detail);
router.patch('/businesses/:id', businessMid.exists, businesses.update);
router.delete('/businesses/:id', businessMid.exists, businesses.delete);


module.exports = router;
