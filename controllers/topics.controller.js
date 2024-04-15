const fetchTopics = require("../models/topics.model")

function getTopics(req, res, next) {
    fetchTopics()
    .then(({rows}) => {
        res.status(200).send({topics: rows})
    })
}

module.exports = getTopics