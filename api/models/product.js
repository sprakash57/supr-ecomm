const mongoose = require('mongoose');
const { ObjectId, Types } = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: ObjectId,
        required: true,
        refer: 'Category'
    },
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema);