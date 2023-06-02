const jwt = require('jsonwebtoken')
const { generateError } = require('../errors/generateError')

const authenticateUser = (req, res, next) => {
    const auth = req.headers.Authentication || req.headers.authentication
    if(!auth) return next(generateError(403, 'token required'))
    const token = (auth.split(" "))[1]
    if(!token) return next(generateError(403, 'token required'))
    try {
        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = decodedUser
        next()
    } catch(err) {
        next(generateError(401, 'Invalid token'))
    }
}

module.exports = authenticateUser