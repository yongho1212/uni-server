const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const historySchema = new Schema({
    id: String,
    latitude: Number,
    longitude: Number,
    address: String,
    category: String,
    hostedTime: Date,
})

module.exports = mongoose.model('History', historySchema);