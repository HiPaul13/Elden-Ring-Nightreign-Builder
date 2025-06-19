const { config: db } = require("../services/database");

/**
 * Fetches all weapons from the database.
 * @returns {Promise<Array>} Resolves to an array of weapon objects.
 */
let getWeapons = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM weapons', (err, weapons) => {
        if (err) return reject(err);         // If query fails, reject the promise with error
        resolve(weapons);                     // Resolve with the list of weapons
    });
});

/**
 * Fetches a single weapon by its ID.
 * @param {number} id - ID of the weapon to retrieve.
 * @returns {Promise<Object>} Resolves to a single weapon object.
 */
const getWeaponById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM weapons WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);      // If query fails, reject the promise
            resolve(results[0]);              // Return the first (and only) matching result
        });
    });
};

// Export the functions so they can be used in controllers
module.exports = {
    getWeapons,
    getWeaponById
};
