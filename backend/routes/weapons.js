const express = require('express');
const router = express.Router();
const weaponController = require('../controllers/weaponController');
//const authenticationService = require('../services/authentication');



router.get('/', weaponController.getWeapons);


module.exports = router;