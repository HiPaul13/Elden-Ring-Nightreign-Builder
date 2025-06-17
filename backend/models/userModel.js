const db = require('../services/database').config;
const bcrypt = require('bcrypt');

// Get all users
let getUsers = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, users) => {

        if (err) return reject(err);
        resolve(users);
    });
});

// Get one user by ID
let getUser = (id) => new Promise((resolve, reject) => {
    db.query("SELECT id, username, email, role, created_at, profile_picture FROM users WHERE id = ?",
        [id], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
    });
});

// Update a user (without password)
let updateUser = (userData) => new Promise((resolve, reject) => {
    const sql = "UPDATE users SET username = ?, email = ?, profile_picture = ? WHERE id = ?";

    db.query(
        sql,
        [userData.username, userData.email, userData.profile_picture, parseInt(userData.id)],
        (err, result) => {
            if (err) return reject(err);
            resolve(result);
        }
    );
});

// Add a new user
let addUser = (userData) => new Promise(async (resolve, reject) => {
    try {
        const passwordHash = await bcrypt.hash(userData.password, 10);
        const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
        db.query(sql, [userData.username, userData.email, passwordHash], (err, result) => {
            if (err) {
                console.error("❌ SQL error:", err);
                return reject(err);
            }
            resolve({ id: result.insertId, ...userData });
        });
    } catch (err) {
        reject(err);
    }
});




// Delete a user
let deleteUser = (id) => new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err) => {
        if (err) return reject(err);
        resolve();
    });
});

// Get user by email (for login)
let getUserByEmail = (email) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
    });
});

let createUser = (userData) => new Promise((resolve, reject) => {
    const sql = `
        INSERT INTO users (username, email, password, profile_picture)
        VALUES (?, ?, ?, ?)
    `;
    const values = [
        userData.username,
        userData.email,
        userData.password,
        userData.profile_picture || null
    ];
    db.query(sql, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
    });
});


module.exports = {
    getUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser,
    getUserByEmail,
    createUser
};
