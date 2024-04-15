const db = require("../db/connection");

function fetchTopics() {
    return db.query(
        `SELECT * FROM topics;`
    )
}

module.exports = fetchTopics