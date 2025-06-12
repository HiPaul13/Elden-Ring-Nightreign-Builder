const express = require('express');
const router = express.Router();
const buildController = require('../controllers/buildController');
const auth = require('../services/authentication');

router.post('/', auth.authenticateJWT, buildController.createBuild);

module.exports = router;
