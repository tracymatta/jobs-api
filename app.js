const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimiter = require('express-rate-limit')
const xss = require('xss-clean')
const connectDB = require('./db/connectDB')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const jobs = require('./routes/jobs')
const login = require('./routes/login')
const register = require('./routes/register')
const auth = require('./middleware/auth')
const corsOptions = require('./config/corsOptions')
require('dotenv').config()

const PORT = process.env.PORT || 4000
const app = express()

app.use(rateLimiter({
    max: 2,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP'
}))
app.use(express.json())
app.use(cors(corsOptions))
app.use(helmet())
app.use(xss())

app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1>')
})
app.use('/login', login)
app.use('/register', register)

app.use(auth)
app.use('/jobs', jobs)
app.use(errorHandler)
app.use(notFound)

const connect = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server listening on port number ${PORT}`))
    } catch(err) {
        errorHandler(err)
    }
}

connect()