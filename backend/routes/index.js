const express = require('express');
const userModel = require("../models/userModel");
const authenticationService = require("../services/authentication");
const userController = require('../controllers/userController')

const router = express.Router();

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

router.post('/register', userController.register);

module.exports = router;
