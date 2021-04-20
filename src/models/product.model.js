const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'History'
    }]
})

module.exports = mongoose.model('Product', ProductSchema);