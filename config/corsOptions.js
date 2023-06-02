const allowedOrigins = require('./allowedOrigins')
const { generateError } = require('../errors/generateError')

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(generateError(400, 'Not allowed by CORS'))
        }
    }
}

module.exports = corsOptions