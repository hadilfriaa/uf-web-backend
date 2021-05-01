const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    priceH: {
        type: Number,
        required: true
    },
    dateH: {
        type: String,
        required: true
    },
    timeH: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

module.exports = mongoose.model('History', HistorySchema);