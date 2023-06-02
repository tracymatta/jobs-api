const mongoose = require('mongoose') 
const { Schema } = mongoose

const jobSchema = new Schema ({
    company: {
        type: String, 
        required: [true, 'must enter company name']
    },
    role: {
        type: String,
        required: [true, 'must enter role in company']
    },
    salary: {
        type: Number
    },
    status: {
        type: String,
        enum: ['accepted', 'interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
})

module.exports = mongoose.model('Job', jobSchema)