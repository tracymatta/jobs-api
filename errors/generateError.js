class CustomError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}

const generateError = (status, message) => {
    return new CustomError(status, message)
}

module.exports = { CustomError, generateError }