const express = require('express')
const router = express.Router()
const userLogin = require('../controllers/login')

router.route('/')
    .post(userLogin)

module.exports = router