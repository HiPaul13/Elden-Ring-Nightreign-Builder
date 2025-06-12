const express = require('express');
const router = express.Router();
const weaponController = require('../controllers/weaponController');
const weaponModel = require("../models/weaponModel");
const authenticationService = require('../services/authentication');



router.get('/', weaponController.getWeapons);

router.use(authenticationService.authenticateJWT);

router.get('/:id', weaponController.getWeaponById);

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const weapon = await weaponModel.getWeaponById(id); // Adjust as needed
        res.json(weapon);
    } catch (err) {
        res.status(500).json({ message: "Error fetching weapon" });
    }
});



module.exports = router;