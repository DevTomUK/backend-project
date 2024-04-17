const db = require("../db/connection")

function fetchCommentsByArticleId(id) {

    return db.query(
        `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [id]
    )
    .then(({rows})=>{
        return rows
    })
}

function insertCommentByArticleId(id, body) {

    return db.query(
        `INSERT INTO comments(article_id, body, author)
        VALUES ($1, $2, $3)
        RETURNING *;`, 
        [id, body.body, body.username]
    )
    .then(({rows})=>{
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "Not Found"})
        }
        return rows[0]
    })

}

function deleteComment(id) {
    return db.query(
        `DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *`,
        [id]
    )
    .then(({rows})=>{
        if (rows.length === 0) {
            console.log("HIT")
            return Promise.reject({status: 404, msg: "No comment with that ID"})
        }
        return {deleted: rows[0]}
    })
}

module.exports = {fetchCommentsByArticleId, insertCommentByArticleId, deleteComment}