const weaponModel = require("../models/weaponModel");

/**
 * GET /weapons
 * Retrieves all weapons from the database.
 */
function getWeapons(req, res, next) {
    weaponModel.getWeapons()
        .then(weapons => res.json(weapons))
        .catch(err => next(err));
}

/**
 * GET /weapons/:id
 * Retrieves a single weapon by its ID.
 * Returns 404 if not found.
 */
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

// Export controller methods
module.exports = {
    getWeapons,
    getWeaponById
};
