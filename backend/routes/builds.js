const express = require('express');
const router = express.Router();
const buildController = require('../controllers/buildController');
const auth = require('../services/authentication');
const authenticationService = require("../services/authentication");

router.use(authenticationService.authenticateJWT);

router.get('/user/:userId', buildController.getBuildsByUser);


router.post('/', buildController.createBuild);

router.put('/:buildId', buildController.updateBuildWeapons);



module.exports = router;
