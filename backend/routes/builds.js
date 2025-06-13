const express = require('express');
const router = express.Router();
const buildController = require('../controllers/buildController');
const auth = require('../services/authentication');
const authenticationService = require("../services/authentication");

router.use(authenticationService.authenticateJWT);

router.post('/', buildController.createBuild);


module.exports = router;
