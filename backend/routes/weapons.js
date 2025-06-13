const express = require('express');
const router = express.Router();
const weaponController = require('../controllers/weaponController');
const authenticationService = require('../services/authentication');



router.get('/', weaponController.getWeapons);

router.use(authenticationService.authenticateJWT);

router.get('/:id', weaponController.getWeaponById);



module.exports = router;