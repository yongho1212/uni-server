const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const categorySchema = new Schema({
    area: String,
    category: String,
    no: Number,
})

module.exports = mongoose.model('Category', categorySchema);