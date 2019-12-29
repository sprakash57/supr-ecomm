const router = require('express').Router();
const { userById, read, update } = require('../controllers/user');
const { requireLogin, isAuthUser } = require('../controllers/auth');

router.get('/:userId', requireLogin, isAuthUser, read);
router.put('/:userId', requireLogin, isAuthUser, update);

router.param('userId', userById);

module.exports = router;