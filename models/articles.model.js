const db = require("../db/connection")

function fetchArticlesById(id) {
    return db.query(
        `SELECT * FROM articles WHERE article_id=$1`, [id]
    )
    .then((article)=> {
        if (article.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not Found" })
        }
        
        return article.rows[0]
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

function checkArticleExists(id) {
    return db.query(
        `SELECT * FROM articles WHERE article_id = $1`, [id]
    )
    
    .then(({rows})=>{
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "Not Found"})
        }

        return rows
    }) 
}

function updateArticleByArticleId(body, id){
    return db.query(
    `UPDATE articles
    SET
    votes = votes + $1
    WHERE article_id = $2
    RETURNING *`,
    [body.inc_votes, id]
    )
    .then(({rows}) => {
        return rows
    })
}

module.exports = {fetchArticlesById, fetchArticles, checkArticleExists, updateArticleByArticleId }