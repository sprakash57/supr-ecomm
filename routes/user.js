const router = require('express').Router();
const authService = require('../authService');
const UserController = require('../controllers/user');

router.post('/register', UserController.register);
router.post('/signin', UserController.login);
router.delete('/:userId', authService, UserController.deleteUser);

module.exports = router;