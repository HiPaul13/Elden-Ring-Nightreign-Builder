const weaponModel = require("../models/weaponModel");

function getWeapons(req, res, next) {
    weaponModel.getWeapons()
        .then(weapons => res.json(weapons))
        .catch(err => next(err));
}


module.exports = {
   getWeapons
};
