const db = require("../db/connection")

function fetchArticlesById(id) {
    return db.query(
        `SELECT * FROM articles WHERE article_id=$1`, [id]
    )
    .then((article)=> {
        if (article.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not Found" })
        }
        return article
    })
}

async function fetchArticles() {
    
        const articlesData = await db.query(
            `SELECT * FROM articles ORDER BY created_at DESC`
        )
        const commentsData = await db.query(
            `SELECT * FROM comments`
        )
    
        const articles = articlesData.rows
        const comments = commentsData.rows

        articles.forEach((article)=>{
            let commentCount = 0
            delete article.body
            comments.forEach((comment)=>{
                if (article.article_id === comment.article_id) {
                    commentCount ++
                }            
            })
            article.comments = commentCount
        })

        return articles
}

module.exports = {fetchArticlesById, fetchArticles}