const mongoose = require('mongoose');
const { ObjectId, Types } = mongoose.Schema;

const productSchema = mongoose.Schema({
    _id: Types.ObjectId,
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
    image: String,
    shipping: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('Product', productSchema);