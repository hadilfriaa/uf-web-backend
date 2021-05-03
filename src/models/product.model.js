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
    time: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'History'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Product', ProductSchema);