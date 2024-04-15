const express = require("express")
const app = express()
const getTopics = require("./controllers/topics.controller")
const getEndpoints = require("./controllers/app.controller")

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

// app.get("/api/articles/:article_id", getArticles)

module.exports = app