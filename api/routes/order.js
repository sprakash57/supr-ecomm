const router = require('express').Router();
const { createOrder } = require('../controllers/order');
const { requireLogin, isAuthUser } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/order/create/:userId', requireLogin, isAuthUser, createOrder);

router.param('userId', userById);
module.exports = router;