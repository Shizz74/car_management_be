const { array } = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        require: true,
        max: 255
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 1024
    },
    role: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    vehicle: {
        type: Array,
    }
})

module.exports = mongoose.model('User', userSchema);