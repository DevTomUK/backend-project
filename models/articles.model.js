const db = require("../db/connection")

function fetchArticlesById(id) {
    return db.query(
        `SELECT articles.*, COUNT(comments.comment_id)::INT AS comment_count
        FROM articles
        JOIN comments ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id;
        `, [id]
    )

    

    .then((article)=> {
        if (article.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not Found" })
        }
        
        return article.rows[0]
    })
}

// async function fetchArticles(query) {

//     let articlesData

//     if (query.topic) {
//         articlesData = await db.query(
//             `SELECT * FROM articles WHERE topic = $1 ORDER BY created_at DESC`, 
//             [query.topic]
//         )
//     } else {
//         articlesData = await db.query(
//             `SELECT * FROM articles ORDER BY created_at DESC`
//         )
//     }
    
        
//         const commentsData = await db.query(
//             `SELECT * FROM comments`
//         )

//         if (articlesData.rows.length === 0) {
//             return Promise.reject({ status: 404, msg: "No articles found" })
//         }
    
//         const articles = articlesData.rows
//         const comments = commentsData.rows

//         articles.forEach((article)=>{
//             let commentCount = 0
//             delete article.body
//             comments.forEach((comment)=>{
//                 if (article.article_id === comment.article_id) {
//                     commentCount ++
//                 }            
//             })
//             article.comment_count = commentCount
//         })

//         return articles
// }

function fetchArticles(sort_by = "created_at", order = "DESC", topic) {

    const validSortBy = ["created_at", "title", "topic", "author", "votes", "comment_count", "body"]
    const validOrder = ["ASC", "DESC"]

    if (!validSortBy.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "Incorrect sort by request" })
    }

    if (!validOrder.includes(order)) {
      return Promise.reject({ status: 400, msg: "Incorrect order by request" })
    }

    let sqlString = 
    `SELECT articles.article_id, 
    articles.title, 
    articles.topic, 
    articles.author, 
    articles.created_at, 
    articles.votes, 
    articles.article_img_url, 
    COUNT (comments.article_id)::int AS comment_count 
    FROM articles 
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id `;
  
    let queryVal = [];

    if (topic) {
        sqlString += `WHERE topic=$1 `
        queryVal.push(topic);
    }
  
    sqlString += `GROUP BY articles.article_id 
        ORDER BY ${sort_by} ${order};`
  
    return db.query(sqlString, queryVal).then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "No articles found" })
        }
      return result.rows
    })
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