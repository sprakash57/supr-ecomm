const Category = require('../models/category');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, item) => {
        if (err || !item) res.status(404).json({ errors: errorHandler(err) });
        req.category = item;
        next();
    })
}

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, item) => {
        if (err || !item) return res.status(400).json({ error: errorHandler(err) });
        res.json({ item });
    })
}

exports.read = (req, res) => {
    return res.json(req.category);
}

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, item) => {
        if (err) return res.status(400).json({ error: errorHandler(err) });
        res.json({ message: 'Category updated', item });
    })
}

exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, item) => {
        if (err) return res.status(400).json({ error: errorHandler(err) });
        res.json({ message: 'Category deleted', item });
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, item) => {
        if (err) return res.status(400).json({ error: errorHandler(err) });
        res.json(item);
    })
}