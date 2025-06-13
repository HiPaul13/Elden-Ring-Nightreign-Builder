const {config: db} = require("../services/database");

let createBuild = (user_id,) => new Promise((resolve, reject) => {
    const sql = "INSERT INTO builds (user_id) VALUES (?)";
    db.query(sql, [user_id], (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, user_id});
    });
});

const updateBuildWeapons = (buildId, weaponData) => new Promise((resolve, reject) => {
    const fields = [];
    const values = [];

    for (let i = 1; i <= 6; i++) {
        const key = `weapon_${i}_id`;
        if (weaponData[key]) {
            fields.push(`${key} = ?`);
            values.push(weaponData[key]);
        }
    }

    if (!fields.length) return reject(new Error('No weapon data provided'));

    const sql = `UPDATE builds SET ${fields.join(', ')} WHERE id = ?`;
    values.push(buildId);

    db.query(sql, values, (err, result) => {
        if (err) return reject(err);
        resolve({ updated: result.affectedRows });
    });
});

const getBuildsWithWeaponsByUser = (userId) => new Promise((resolve, reject) => {
    const sql = `
        SELECT 
            b.id,
            w1.id as w1_id, w1.name as w1_name, w1.image_url as w1_image,
            w2.id as w2_id, w2.name as w2_name, w2.image_url as w2_image,
            w3.id as w3_id, w3.name as w3_name, w3.image_url as w3_image,
            w4.id as w4_id, w4.name as w4_name, w4.image_url as w4_image,
            w5.id as w5_id, w5.name as w5_name, w5.image_url as w5_image,
            w6.id as w6_id, w6.name as w6_name, w6.image_url as w6_image
        FROM builds b
        LEFT JOIN weapons w1 ON b.weapon_1_id = w1.id
        LEFT JOIN weapons w2 ON b.weapon_2_id = w2.id
        LEFT JOIN weapons w3 ON b.weapon_3_id = w3.id
        LEFT JOIN weapons w4 ON b.weapon_4_id = w4.id
        LEFT JOIN weapons w5 ON b.weapon_5_id = w5.id
        LEFT JOIN weapons w6 ON b.weapon_6_id = w6.id
        WHERE b.user_id = ?`;

    db.query(sql, [userId], (err, rows) => {
        if (err) return reject(err);

        const builds = rows.map(row => ({
            id: row.id,
            weapon_1: row.w1_id ? { id: row.w1_id, name: row.w1_name, image_url: row.w1_image } : null,
            weapon_2: row.w2_id ? { id: row.w2_id, name: row.w2_name, image_url: row.w2_image } : null,
            weapon_3: row.w3_id ? { id: row.w3_id, name: row.w3_name, image_url: row.w3_image } : null,
            weapon_4: row.w4_id ? { id: row.w4_id, name: row.w4_name, image_url: row.w4_image } : null,
            weapon_5: row.w5_id ? { id: row.w5_id, name: row.w5_name, image_url: row.w5_image } : null,
            weapon_6: row.w6_id ? { id: row.w6_id, name: row.w6_name, image_url: row.w6_image } : null,
        }));

        resolve(builds);
    });
});



module.exports = {
    createBuild,
    updateBuildWeapons,
    getBuildsWithWeaponsByUser,
};