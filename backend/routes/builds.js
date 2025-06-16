const express = require('express');
const router = express.Router();
const buildController = require('../controllers/buildController');
const auth = require('../services/authentication');
const authenticationService = require("../services/authentication");


router.get('/public', buildController.getPublicBuilds);
router.get('/:buildId', buildController.getBuildById);


router.use(authenticationService.authenticateJWT);

router.get('/user/:userId', buildController.getBuildsByUser);

router.post('/:buildId/like', buildController.likeBuild);

router.post('/', buildController.createBuild);

router.put('/:buildId', buildController.updateBuildWeapons);

router.put('/:buildId/share', buildController.shareBuild);








module.exports = router;
