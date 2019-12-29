const router = require('express').Router();
const { create, read, categoryById, update, remove, list } = require('../controllers/category');
const { requireLogin, isAuthUser, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/:categoryId', read);
router.get('/categories', list);
router.post('/create/:userId', requireLogin, isAuthUser, isAdmin, create);
router.put('/:categoryId/:userId', requireLogin, isAuthUser, isAdmin, update);
router.delete('/:categoryId/:userId', requireLogin, isAuthUser, isAdmin, remove);

router.param('categoryId', categoryById);
router.param('userId', userById);
module.exports = router;