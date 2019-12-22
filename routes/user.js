const router = require('express').Router();
const { userById } = require('../controllers/user');

router.param('userId', userById);

module.exports = router;