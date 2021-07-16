const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const roomSchema = new Schema({
    id: String,
    latitude: Number,
    longitude: Number,
    address: String,
    category: String,
    title: String,
    time: Date,
    timeInfo: String,
})

module.exports = mongoose.model('Room', roomSchema);