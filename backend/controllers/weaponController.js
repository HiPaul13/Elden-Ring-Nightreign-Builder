const weaponModel = require("../models/weaponModel");

function getWeapons(req, res, next) {
    weaponModel.getWeapons()
        .then(weapons => res.json(weapons))
        .catch(err => next(err));
}

const getWeaponById = async (req, res) => {
    const id = req.params.id;
    try {
        const weapon = await weaponModel.getWeaponById(id);
        if (!weapon) {
            return res.status(404).json({ message: "Weapon not found" });
        }
        res.json(weapon);
    } catch (err) {
        res.status(500).json({ message: "Error fetching weapon", error: err.message });
    }
};

module.exports = {
   getWeapons,
    getWeaponById
};
