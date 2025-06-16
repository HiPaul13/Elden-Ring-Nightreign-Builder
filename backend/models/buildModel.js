const {config: db} = require("../services/database");

let createBuild = (user_id,) => new Promise((resolve, reject) => {
    const sql = "INSERT INTO builds (user_id) VALUES (?)";
    db.query(sql, [user_id], (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, user_id});
    });
});

const updateBuildWeapons = (buildId, buildData) => new Promise((resolve, reject) => {
    const fields = [];
    const values = [];


    // Optional: build name
    if (buildData.name) {
        fields.push(`name = ?`);
        values.push(buildData.name);
    }

    if (buildData.character) {
        fields.push('`character` = ?');
        values.push(buildData.character);
    }

    for (let i = 1; i <= 6; i++) {
        const key = `weapon_${i}_id`;
        if (buildData[key]) {
            fields.push(`${key} = ?`);
            values.push(buildData[key]);
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
            b.id, b.name, b.character,
            w1.id AS w1_id, w1.name AS w1_name, w1.image_url AS w1_image,
            w2.id AS w2_id, w2.name AS w2_name, w2.image_url AS w2_image,
            w3.id AS w3_id, w3.name AS w3_name, w3.image_url AS w3_image,
            w4.id AS w4_id, w4.name AS w4_name, w4.image_url AS w4_image,
            w5.id AS w5_id, w5.name AS w5_name, w5.image_url AS w5_image,
            w6.id AS w6_id, w6.name AS w6_name, w6.image_url AS w6_image
        FROM builds b
                 LEFT JOIN weapons w1 ON b.weapon_1_id = w1.id
                 LEFT JOIN weapons w2 ON b.weapon_2_id = w2.id
                 LEFT JOIN weapons w3 ON b.weapon_3_id = w3.id
                 LEFT JOIN weapons w4 ON b.weapon_4_id = w4.id
                 LEFT JOIN weapons w5 ON b.weapon_5_id = w5.id
                 LEFT JOIN weapons w6 ON b.weapon_6_id = w6.id
        WHERE b.user_id = ?
    `;

    db.query(sql, [userId], (err, rows) => {
        if (err) return reject(err);

        const builds = rows.map(row => {
            const weapons = [];

            for (let i = 1; i <= 6; i++) {
                const wid = row[`w${i}_id`];
                if (wid) {
                    weapons.push({
                        id: wid,
                        name: row[`w${i}_name`],
                        image_url: row[`w${i}_image`]
                    });
                }
            }

            return {
                id: row.id,
                name: row.name || 'Unnamed Build',
                character: row.character,
                weapons
            };
        });

        resolve(builds);
    });
});

const getPublicBuilds = (characterFilter, sortByLikes) => new Promise((resolve, reject) => {
    let sql = `
        SELECT b.*,
               u.username AS creator_username,
            w1.name AS w1_name, w1.image_url AS w1_image,
            w2.name AS w2_name, w2.image_url AS w2_image,
            w3.name AS w3_name, w3.image_url AS w3_image,
            w4.name AS w4_name, w4.image_url AS w4_image,
            w5.name AS w5_name, w5.image_url AS w5_image,
            w6.name AS w6_name, w6.image_url AS w6_image
        FROM builds b
        LEFT JOIN users u ON b.user_id = u.id
        LEFT JOIN weapons w1 ON b.weapon_1_id = w1.id
        LEFT JOIN weapons w2 ON b.weapon_2_id = w2.id
        LEFT JOIN weapons w3 ON b.weapon_3_id = w3.id
        LEFT JOIN weapons w4 ON b.weapon_4_id = w4.id
        LEFT JOIN weapons w5 ON b.weapon_5_id = w5.id
        LEFT JOIN weapons w6 ON b.weapon_6_id = w6.id
        WHERE b.is_public = TRUE
    `;

    const params = [];

    if (characterFilter) {
        sql += ` AND b.character = ?`;
        params.push(characterFilter);
    }

    if (sortByLikes) {
        sql += ` ORDER BY b.likes DESC`;
    } else {
        sql += ` ORDER BY b.created_at DESC`;
    }

    db.query(sql, params, (err, rows) => {
        if (err) return reject(err);

        const builds = rows.map(row => {
            const weapons = [];
            for (let i = 1; i <= 6; i++) {
                if (row[`w${i}_name`]) {
                    weapons.push({
                        name: row[`w${i}_name`],
                        image_url: row[`w${i}_image`]
                    });
                }
            }

            return {
                id: row.id,
                user_id: row.user_id,
                name: row.name,
                character: row.character,
                likes: row.likes || 0,
                creator_username: row.creator_username || 'Unknown',
                weapons
            };
        });

        resolve(builds);
    });
});

const likeBuild = (buildId) => new Promise((resolve, reject) => {
    const sql = `UPDATE builds SET likes = likes + 1 WHERE id = ?`;
    db.query(sql, [buildId], (err, result) => {
        if (err) return reject(err);
        resolve({ success: true, affectedRows: result.affectedRows });
    });
});

const getBuildById = (buildId) => new Promise((resolve, reject) => {
    const sql = `
        SELECT b.*, 
            w1.name AS w1_name, w1.image_url AS w1_image,
            w2.name AS w2_name, w2.image_url AS w2_image,
            w3.name AS w3_name, w3.image_url AS w3_image,
            w4.name AS w4_name, w4.image_url AS w4_image,
            w5.name AS w5_name, w5.image_url AS w5_image,
            w6.name AS w6_name, w6.image_url AS w6_image
        FROM builds b
        LEFT JOIN weapons w1 ON b.weapon_1_id = w1.id
        LEFT JOIN weapons w2 ON b.weapon_2_id = w2.id
        LEFT JOIN weapons w3 ON b.weapon_3_id = w3.id
        LEFT JOIN weapons w4 ON b.weapon_4_id = w4.id
        LEFT JOIN weapons w5 ON b.weapon_5_id = w5.id
        LEFT JOIN weapons w6 ON b.weapon_6_id = w6.id
        WHERE b.id = ? AND b.is_public = TRUE
    `;

    db.query(sql, [buildId], (err, rows) => {
        if (err) return reject(err);
        if (rows.length === 0) return resolve(null);

        const row = rows[0];
        const weapons = [];

        for (let i = 1; i <= 6; i++) {
            if (row[`w${i}_name`]) {
                weapons.push({
                    name: row[`w${i}_name`],
                    image_url: row[`w${i}_image`]
                });
            }
        }

        resolve({
            id: row.id,
            name: row.name,
            character: row.character,
            likes: row.likes || 0,
            weapons
        });
    });
});

const shareBuild = (buildId, userId) => new Promise((resolve, reject) => {
    const sql = `UPDATE builds SET is_public = TRUE WHERE id = ? AND user_id = ?`;
    db.query(sql, [buildId, userId], (err, result) => {
        if (err) return reject(err);
        resolve({ shared: result.affectedRows > 0 });
    });
});




module.exports = {
    createBuild,
    updateBuildWeapons,
    getBuildsWithWeaponsByUser,
    getPublicBuilds,
    likeBuild,
    getBuildById,
    shareBuild,
};