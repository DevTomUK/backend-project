const {fetchCommentsByArticleId, insertCommentByArticleId} = require("../models/comments.model")
const {checkArticleExists} = require("../models/articles.model")

function getCommentsByArticleId(req, res, next) {
    const {article_id} = req.params
    
    Promise.all([fetchCommentsByArticleId(article_id), checkArticleExists(article_id)])
    
    .then((arr)=> {

        res.status(200).send({comments: arr[0]})
    })
    .catch((err)=>{

        next(err)
    })
    
}

function postCommentByArticleId(req, res, next) {
    const {article_id} = req.params
    const {body} = req

    Promise.all([insertCommentByArticleId(article_id, body), checkArticleExists(article_id)])

    
    .then((response)=> {

        res.status(201).send(response[0])
    })
    .catch((err)=>{
        next(err)
    })
}

module.exports = {getCommentsByArticleId, postCommentByArticleId}