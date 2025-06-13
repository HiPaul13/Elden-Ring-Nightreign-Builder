const buildModel = require('../models/buildModel');

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

/**
 * Controller to fetch all builds for a user (optional)
 */

module.exports = {
    createBuild,
};
