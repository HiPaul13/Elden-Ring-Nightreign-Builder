const {config: db} = require("../services/database");

let createBuild = (user_id,) => new Promise((resolve, reject) => {
    const sql = "INSERT INTO builds (user_id) VALUES (?)";
    db.query(sql, [user_id], (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, user_id});
    });
});

module.exports = {
    createBuild
};