const buildModel = require('../models/buildModel');
const weaponModel = require("../models/weaponModel");

/**
 * Creates a new empty build for a user.
 * Expects user_id in the request body.
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
 * Updates the weapons assigned to a build.
 * Expects buildId in URL params and weapon data in request body.
 */
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

/**
 * Retrieves all builds (with weapons) for a specific user.
 * Expects userId in URL params.
 */
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
 * Retrieves public builds.
 * Optional filters:
 *  - character (via query string)
 *  - sort by likes (via query string ?sort=likes)
 */
const getPublicBuilds = async (req, res) => {
    const character = req.query.character;
    const sort = req.query.sort === 'likes';

    try {
        const builds = await buildModel.getPublicBuilds(character, sort);
        res.json(builds);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load public builds' });
    }
};

/**
 * Increments the like count for a given build.
 * Expects buildId in URL params.
 */
const likeBuild = async (req, res) => {
    try {
        const { buildId } = req.params;
        const result = await buildModel.likeBuild(buildId);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to like build' });
    }
};

/**
 * Fetches a single build by ID.
 * Only returns it if it's public.
 */
const getBuildById = async (req, res) => {
    try {
        const build = await buildModel.getBuildById(req.params.buildId);
        if (!build) {
            return res.status(404).json({ message: 'Build not found or not public' });
        }
        res.json(build);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching build' });
    }
};

/**
 * Shares a build (makes it public).
 * Requires the build to belong to the logged-in user.
 * Expects buildId in URL params and user ID from decoded token.
 */
const shareBuild = async (req, res) => {
    const buildId = req.params.buildId;
    const userId = req.user.id;

    try {
        const result = await buildModel.shareBuild(buildId, userId);
        if (!result.shared) {
            return res.status(403).json({ message: 'Unauthorized or build not found' });
        }
        res.json({ message: 'Build shared successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to share build' });
    }
};

// Export all controller methods for routing
module.exports = {
    createBuild,
    updateBuildWeapons,
    getBuildsByUser,
    likeBuild,
    getPublicBuilds,
    getBuildById,
    shareBuild,
};
