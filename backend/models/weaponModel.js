const {config: db} = require("../services/database");


let getWeapons = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM weapons', (err, weapons) => {

        if (err) return reject(err);
        resolve(weapons);
    });
});


module.exports = {
    getWeapons
};