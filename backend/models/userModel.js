const db = require('../services/database').config;
const bcrypt = require('bcrypt');

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} List of all users.
 */
let getUsers = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, users) => {
        if (err) return reject(err);
        resolve(users);
    });
});

/**
 * Retrieves a single user by their ID, excluding sensitive fields like password.
 * @param {number} id - The user ID.
 * @returns {Promise<Object>} User object.
 */
let getUser = (id) => new Promise((resolve, reject) => {
    db.query(
        "SELECT id, username, email, role, created_at, profile_picture FROM users WHERE id = ?",
        [id],
        (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        }
    );
});

/**
 * Updates a user’s username, email, and profile picture (not password).
 * @param {Object} userData - Object containing updated user fields.
 */
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

/**
 * Adds a new user, hashing their password before storing.
 * @param {Object} userData - Contains username, email, and plaintext password.
 */
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

/**
 * Deletes a user from the database by ID.
 * @param {number} id - The user ID.
 */
let deleteUser = (id) => new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err) => {
        if (err) return reject(err);
        resolve();
    });
});

/**
 * Finds a user by their email address (used for login).
 * @param {string} email - Email to search for.
 * @returns {Promise<Object>} User object if found.
 */
let getUserByEmail = (email) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
    });
});

/**
 * Inserts a new user into the database with optional profile picture.
 * Note: Assumes password is already hashed.
 * @param {Object} userData - Full user object with hashed password.
 */
let createUser = (userData) => new Promise((resolve, reject) => {
    const sql = `
        INSERT INTO users (username, email, password_hash, profile_picture)
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

// Export all functions for use in controllers
module.exports = {
    getUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser,
    getUserByEmail,
    createUser
};
