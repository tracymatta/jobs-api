const notFound = (req, res) => {
    res.status(404).send("Invalid path")
}

module.exports = notFound