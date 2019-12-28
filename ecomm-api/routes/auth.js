const router = require('express').Router();
const { register, login, logout } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
// router.delete('/:userId', authService, UserController.deleteUser);

module.exports = router;