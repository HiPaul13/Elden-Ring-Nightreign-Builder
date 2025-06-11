const userModel = require('../models/userModel');

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

module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
};

