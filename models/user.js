const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'must have a first name']
    },
    lastName: {
        type: String,
        required: [true, 'must have a last name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'must enter email']
    },
    password: {
        type: String,
        required: [true, 'must enter password']
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model("User", userSchema)