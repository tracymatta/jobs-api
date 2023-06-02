const mongoose = require('mongoose')

const connectDB = (database) => {
    return mongoose.connect(database) 
}

module.exports = connectDB