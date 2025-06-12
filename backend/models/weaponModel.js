const {config: db} = require("../services/database");


let getWeapons = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM weapons', (err, weapons) => {

        if (err) return reject(err);
        resolve(weapons);
    });
});

const getWeaponById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM weapons WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); // return a single weapon
        });
    });
};

module.exports = {
    getWeapons,
    getWeaponById
};