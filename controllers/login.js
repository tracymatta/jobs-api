const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { generateError } = require('../errors/generateError')

const userLogin = async (req, res, next) => {
    try{
        const { email, password } = req.body
        if(!(email && password)) return next(generateError(400, 'All input is required'))
        const user = await User.findOne({ email })
        if(!user || !(await bcrypt.compare(password, user.password))) return next(generateError(400, 'Invalid credentials'))
        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: email
            },
            process.env.ACCESS_TOKEN + '',
            {
                expiresIn: '2h'
            }
        )
        user.token = token
        res.status(200).json(user)
    } catch(err) {
        next(err)
    }
}

module.exports = userLogin