const fetchUsers = require("../models/users.model")

function getUsers(req, res, next){
fetchUsers()
.then((response)=>{
    res.status(200).send({users: response})
})
}

module.exports = getUsers