const router = require('express').Router();
const { userById, read, update, purchaseHistory } = require('../controllers/user');
const { requireLogin, isAuthUser } = require('../controllers/auth');

router.get('/user/:userId', requireLogin, isAuthUser, read);
router.put('/user/:userId', requireLogin, isAuthUser, update);
router.get('/orders/by/user/:userId', requireLogin, isAuthUser, purchaseHistory)

router.param('userId', userById);

module.exports = router;