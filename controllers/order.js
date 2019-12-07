const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.getAllOrders = (req, res, next) => {
    Order.find()
        .select('_id  product quantity')
        .populate('product', '_id name price')
        .exec()
        .then(orders => {
            res.status(200).json({ count: orders.length, orders });
        })
        .catch(error => { next(error) });
}

exports.createOneOrder = (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.id,
        quantity: req.body.quantity
    });
    Product.findById(req.params.id)
        .exec()
        .then(product => {
            if (!product) return res.status(404).json({ message: 'Product not found' });
            return order
        })
        .then(order => order.save())
        .then(order => {
            return res.status(201).json({
                message: 'Order created',
                order: {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity
                }
            });
        })
        .catch(error => { next(error) })
}

exports.getOrder = (req, res, next) => {
    const { id } = req.params;
    Order.findById(id)
        .select('_id product quantity')
        .populate('product', '_id name price')
        .exec()
        .then(order => res.status(201).json(order))
        .catch(error => { next(error) })
}

exports.updateOrder = (req, res, next) => {
    const { id } = req.params;
    Order.update({ _id: id }, { $set: req.body })
        .exec()
        .then(result => res.status(200).json({ message: 'Order updated', result }))
        .catch(error => { next(error) })
}

exports.deleteOrder = (req, res, next) => {
    const { id } = req.params;
    Order.remove({ _id: id })
        .exec()
        .then(result => res.status(200).json({ message: 'Order deleted', result }))
        .catch(error => { next(error) })
}