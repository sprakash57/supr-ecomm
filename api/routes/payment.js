const router = require('express').Router();
const { requireLogin, isAuthUser } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { generateToken, processPayment } = require('../controllers/payment');

router.get('/payment/getToken/:userId', requireLogin, isAuthUser, generateToken);
router.post('/payment/process/:userId', requireLogin, isAuthUser, processPayment);

router.param('userId', userById);

module.exports = router;