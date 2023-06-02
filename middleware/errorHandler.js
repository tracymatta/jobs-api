const { CustomError } = require('../errors/generateError')

const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomError) {
        console.log("hhh");
        //res.status(err.status).send(err.message)
    } else {
        //res.status(404).send(err.message)
        console.log("khh");
    }
}

module.exports = errorHandler