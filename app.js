const express = require("express")
const app = express()
const getTopics = require("./controllers/topics.controller")
const getEndpoints = require("./controllers/app.controller")
const {getArticlesById, getArticles, patchArticleByArticleId } = require("./controllers/articles.controller")
const {getCommentsByArticleId, postCommentByArticleId, removeComment } = require("./controllers/comments.controller")
const getUsers = require("./controllers/users.controller")

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticlesById)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.use(express.json())

app.post("/api/articles/:article_id/comments", postCommentByArticleId)

app.patch("/api/articles/:article_id", patchArticleByArticleId)

app.delete("/api/comments/:comment_id", removeComment)

app.get("/api/users", getUsers)

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
       res.status(400).send({msg: "Bad Request"})
    }
    if (err.code === "23503") {
      res.status(400).send({msg: "Invalid Entry"})
    }
     res.status(err.status).send({msg: err.msg})
})

module.exports = app