const Category = require('../models/category');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, item) => {
        if (err || !item) return res.status(400).json({ error: errorHandler(err) });
        res.json({ item });
    })
}