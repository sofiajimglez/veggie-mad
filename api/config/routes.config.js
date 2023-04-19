const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const usersMid = require('../middlewares/users.mid');

/* User routes */
router.post('/users', users.create);
router.get('/users/:id', usersMid.exists, users.detail);
router.patch('/users/:id', usersMid.exists, users.update);
router.delete('/users/:id', usersMid.exists, users.delete);


module.exports = router;
