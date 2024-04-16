const fetchCommentsByArticleId = require("../models/comments.model")
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

module.exports = getCommentsByArticleId