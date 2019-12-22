const router = require('express').Router();
const { create } = require('../controllers/category');
const { requireLogin, isAuthUser, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/category/create/:userId', requireLogin, isAuthUser, isAdmin, create);
router.param('userId', userById);
module.exports = router;