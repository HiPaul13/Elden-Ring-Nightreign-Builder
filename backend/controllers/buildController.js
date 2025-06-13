const buildModel = require('../models/buildModel');
const weaponModel = require("../models/weaponModel");

/**
 * Controller to create a new build for a user
 */
async function createBuild(req, res) {

    try {
        const { user_id } = req.body;
        const newBuild = await buildModel.createBuild(user_id);
        console.log(newBuild);
        res.status(201).json(newBuild);
    } catch (err) {
        console.error('Error creating build:', err);
        res.status(500).json({ message: 'Failed to create build' });
    }
}

const updateBuildWeapons = async (req, res) => {
    const { buildId } = req.params;
    const weaponData = req.body;

    try {
        const result = await buildModel.updateBuildWeapons(buildId, weaponData);
        res.json(result);
    } catch (err) {
        console.error('Error updating build weapons:', err);
        res.status(500).json({ message: 'Failed to update build' });
    }
};

const getBuildsByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const builds = await buildModel.getBuildsWithWeaponsByUser(userId);
        res.json(builds);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch builds' });
    }
};


/**
 * Controller to fetch all builds for a user (optional)
 */

module.exports = {
    createBuild,
    updateBuildWeapons,
    getBuildsByUser
};
