const router = require('express').Router();
const authService = require('../authService');
const OrderController = require('../controllers/order');

router.get('/', authService, OrderController.getAllOrders);
router.post('/', authService, OrderController.createOneOrder);
router.get('/:id', authService, OrderController.getOrder);
router.patch('/:id', authService, OrderController.updateOrder);
router.delete('/:id', authService, OrderController.deleteOrder);

module.exports = router;