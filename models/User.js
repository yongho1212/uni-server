const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    id: String,
    email: String,
    gender: { type: String, default: '' },
    age: { type: Number, default: 0 },
    birth: { type: Date, default: '' },    
    profile: { type: [String], default: new Array(6) },
    hobby: { type: String, default: '' },
    complete: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', userSchema);