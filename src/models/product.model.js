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
    historique:{
        type: Array
    }
    
})

module.exports = mongoose.model('Product', ProductSchema);