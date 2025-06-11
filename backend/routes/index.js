const express = require('express');
const userModel = require("../models/userModel");
const authenticationService = require("../services/authentication");

const router = express.Router();

/**
 * Route: POST /login
 * Authenticate user using email/password and return token
 */
router.post('/login', async (req, res) => {
    try {
        const users = await userModel.getUsers();
        console.log(req.body);
        authenticationService.authenticateUser(req.body, users, res);

    } catch (err) {
        console.error('❌ Login failed:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
