const {fetchArticlesById, fetchArticles} = require("../models/articles.model")

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

function getArticles(req, res, next) {
    fetchArticles()
    .then((body) => {
        res.status(200).send({articles: body})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getArticlesById, getArticles }