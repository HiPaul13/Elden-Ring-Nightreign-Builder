const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// GET all users
function getUsers(req, res, next) {
    userModel.getUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

// GET single user by ID
function getUser(req, res, next) {
    userModel.getUser(req.params.id)
        .then(user => res.json(user))
        .catch(err => next(err));
}

// UPDATE user (from edit form)
function updateUser(req, res, next) {
    userModel.updateUser(req.body)
        .then(() => res.json({ message: 'User updated successfully' }))
        .catch(err => next(err));
}

// CREATE user (from register form)
function createUser(req, res, next) {
    userModel.addUser(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => next(err));
}

// DELETE user
function deleteUser(req, res, next) {
    userModel.deleteUser(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(err => next(err));
}


function register(req, res, next) {
    const { username, email, password, profilePicture } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) return next(err);

        try {
            await userModel.createUser({ username, email, password: hash, profile_picture: profilePicture });
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ message: 'Email already in use' });
            } else {
                next(error);
            }
        }
    });
}


module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser,
    register
};

