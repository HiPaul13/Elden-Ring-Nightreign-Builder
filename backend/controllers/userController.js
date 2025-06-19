const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * GET /users
 * Retrieves all users from the database.
 */
function getUsers(req, res, next) {
    userModel.getUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

/**
 * GET /users/:id
 * Retrieves a single user by ID.
 */
function getUser(req, res, next) {
    userModel.getUser(req.params.id)
        .then(user => res.json(user))
        .catch(err => next(err));
}

/**
 * PUT /users/:id
 * Updates an existing user with data from the request body.
 * The body should contain user data, including ID.
 */
function updateUser(req, res, next) {
    userModel.updateUser(req.body)
        .then(() => res.json({ message: 'User updated successfully' }))
        .catch(err => next(err));
}

/**
 * POST /users
 * Creates a new user from the request body.
 * Used primarily by admin interfaces, not for self-registration.
 */
function createUser(req, res, next) {
    userModel.addUser(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => next(err));
}

/**
 * DELETE /users/:id
 * Deletes a user from the system by ID.
 */
function deleteUser(req, res, next) {
    userModel.deleteUser(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(err => next(err));
}

/**
 * POST /auth/register
 * Handles user registration.
 * Hashes the password before saving to the database.
 * Validates required fields: username, email, password.
 * Stores profilePicture as base64 (optional).
 */
function register(req, res, next) {
    const { username, email, password, profilePicture } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hash password
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) return next(err);

        try {
            await userModel.createUser({
                username,
                email,
                password: hash,
                profile_picture: profilePicture
            });

            res.status(201).json({ message: 'User registered successfully' });

        } catch (error) {
            // Duplicate email error
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ message: 'Email already in use' });
            } else {
                next(error);
            }
        }
    });
}

// Export all user-related controller functions
module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser,
    register
};
