const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { generateError } = require('../errors/generateError')

const userRegister = async (req, res, next) => {
    try{
        const { firstName, lastName, email, password } = req.body
        if(!(firstName && lastName && email && password)) return next(generateError(400, 'All input is required'))
        const oldUser = await User.findOne({ email })
        if(oldUser) return next(generateError(400, 'User already exists, enter another email'))
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword
        })
        if(!user) return next(generateError(400, 'couldn\'t create'))
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

module.exports = userRegister