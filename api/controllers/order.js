const { Order } = require('../models/order');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((error, order) => {
            if (error) return res.status(400).json({ error: errorHandler(error) })
            req.order = order;
        })
    next();
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) return res.status(400).json({ error: errorHandler(err) });
            res.json(orders);
        })
}

exports.getStatus = (req, res) => res.json(Order.schema.path('status').enumValues);

exports.updateStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (error, data) => {
        if (error) return res.status(400).json({ error: errorHandler(error) });
        res.json(data);
    })
}
