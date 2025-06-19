const express = require('express');
const userModel = require("../models/userModel");
const authenticationService = require("../services/authentication");
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * POST /api/auth/login
 * Authenticates a user based on email and password.
 * On success, returns a JWT token.
 */
router.post('/login', async (req, res) => {
    try {
        const users = await userModel.getUsers(); // Fetch all users from DB
        console.log(req.body); // Debug: logs submitted login data
        authenticationService.authenticateUser(req.body, users, res); // Handles matching + token generation
    } catch (err) {
        console.error('❌ Login failed:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

/**
 * POST /api/auth/register
 * Registers a new user with hashed password and optional profile picture.
 */
router.post('/register', userController.register);

module.exports = router;
