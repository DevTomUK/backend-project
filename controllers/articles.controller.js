const fetchArticlesById = require("../models/articles.model")

function getArticlesById(req, res, next) {
    const {article_id} = req.params
    fetchArticlesById(article_id)
    .then(({rows}) => {
        res.status(200).send({article: rows[0]})
    })
    .catch((err) => {
        next(err)
    })
    
}

module.exports = getArticlesById