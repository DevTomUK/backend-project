const endpoints = require("../endpoints.json")

function getEndpoints(req, res, next) {
    return res.status(200).send({endpoints})
}

module.exports = getEndpoints