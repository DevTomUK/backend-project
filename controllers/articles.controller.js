const {fetchArticlesById, fetchArticles, updateArticleByArticleId } = require("../models/articles.model")


function getArticlesById(req, res, next) {
    const {article_id} = req.params

    fetchArticlesById(article_id)

    .then((data) => {

        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
    
}

function getArticles(req, res, next) {
    const { query } = req

    fetchArticles(query)
    .then((body) => {
        res.status(200).send({articles: body})
    })
    .catch((err) => {
        next(err)
    })
}

function patchArticleByArticleId(req, res, next) {
    const { body } = req
    const {article_id} = req.params
    updateArticleByArticleId(body, article_id)
    .then((body)=>{
       res.status(200).send({updatedRow: body[0]}) 
    })
    .catch((err)=>{
        next(err)
    })
    
}

module.exports = {getArticlesById, getArticles, patchArticleByArticleId }