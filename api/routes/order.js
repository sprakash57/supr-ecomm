const router = require('express').Router();
const { createOrder, listOrders, getStatus, orderById, updateStatus } = require('../controllers/order');
const { updateStock } = require('../controllers/product');
const { requireLogin, isAuthUser, isAdmin } = require('../controllers/auth');
const { userById, addOrderToHistory } = require('../controllers/user');

router.post('/order/create/:userId', requireLogin, isAuthUser, addOrderToHistory, updateStock, createOrder);
router.get('/order/list/:userId', requireLogin, isAuthUser, isAdmin, listOrders);
router.get('/order/status/:userId', requireLogin, isAuthUser, isAdmin, getStatus);
router.put('/order/:orderId/status/:userId', requireLogin, isAuthUser, isAdmin, updateStatus);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;