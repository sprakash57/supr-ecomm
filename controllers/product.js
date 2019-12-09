const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .exec()
        .then(products => {
            const response = {
                count: products.length,
                products: products.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(error => next(error));
}

exports.createProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        image: req.file.path
    })
    product.save()
        .then(product => {
            res.status(200).json({
                message: 'Product added successfully',
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                }
            })
        })
        .catch(error => next(error));
}

exports.getProduct = (req, res, next) => {
    const { id } = req.params;
    Product.findById(id)
        .exec()
        .then(item => {
            if (item) res.status(200).json(item);
            else res.status(404).json({ message: 'Product not found' });
        })
        .catch(error => {
            next(error);
        })
}

exports.updateProduct = (req, res, next) => {
    const { id } = req.params;
    Product.update({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({ message: "Product updated", result });
        })
        .catch(error => { next(error) })
}

exports.deleteProduct = (req, res, next) => {
    const { id } = req.params;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'Product deleted', result })
        })
        .catch(error => { next(error) })
}