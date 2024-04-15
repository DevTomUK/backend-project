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

module.exports = fetchArticlesById