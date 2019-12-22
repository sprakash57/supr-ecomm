const fs = require('fs');
const mongoose = require('mongoose');
const _ = require('lodash');
const Product = require('../models/product');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.create = (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        category: req.body.category,
        shipping: req.body.shipping,
        image: req.file.path
    })
    if (req.file && req.file.size > 1000000) {
        return res.status(400).json({ error: 'Image size is more than 1 MB' });
    }
    const { name, price, quantity, description, category, shipping } = req.body;
    if (!name || !price || !quantity || !description || !category || !shipping) {
        return res.status(400).json({ error: 'All fields are mandatory' });
    }
    product.save((err, item) => {
        if (err) return res.status(400).json({ error: errorHandler(err) });
        res.json({
            message: 'Product added successfully',
            product: {
                _id: item._id,
                name: item.name,
                image: item.image
            }
        })
    })
}

exports.read = (req, res) => {
    req.product.image = undefined;
    return res.json(req.product)
}

exports.updateProduct = (req, res) => {
    console.log(req.body);
    const product = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        category: req.body.category,
        shipping: req.body.shipping,
        image: req.file.path
    }
    console.log('product', product);
    if (req.file && req.file.size > 1000000) {
        return res.status(400).json({ error: 'Image size is more than 1 MB' });
    }
    const { name, price, quantity, description, category, shipping } = req.body;
    if (!name || !price || !quantity || !description || !category || !shipping || !req.file.path) {
        return res.status(400).json({ error: 'All fields are mandatory' });
    }
    Product.update({ _id: req.product._id }, product, (err, item) => {
        if (err) return res.status(400).json({ error: errorHandler(err) });
        res.json({
            message: 'Product updated successfully',
            product: {
                _id: item._id,
                name: item.name,
                image: item.image
            }
        })
    })
}

exports.deleteProduct = (req, res) => {
    const product = req.product;
    product.remove((err, item) => {
        if (err) return res.status(404).json({ error: errorHandler(err) });
        res.json({ message: 'Product deleted successfully', product: { name: item.name } });
    })
}

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) return res.status(404).json({ error: 'Product not found' });
        req.product = product;
        next();
    })
}