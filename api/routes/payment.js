const router = require('express').Router();
const { requireLogin, isAuthUser } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { generateToken } = require('../controllers/payment');

router.get('/payment/getToken/:userId', requireLogin, isAuthUser, generateToken);

router.param('userId', userById);

module.exports = router;