const express = require("express")
const app = express()
const getTopics = require("./controllers/topics.controller")
const getEndpoints = require("./controllers/app.controller")
const {getArticlesById, getArticles} = require("./controllers/articles.controller")
const getCommentsByArticleId = require("./controllers/comments.controller")

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticlesById)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
       res.status(400).send({msg: "Bad Request"})
    }
     res.status(err.status).send({msg: err.msg})
})

module.exports = app