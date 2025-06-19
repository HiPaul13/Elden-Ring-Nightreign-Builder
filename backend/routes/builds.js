const express = require('express');
const router = express.Router();
const buildController = require('../controllers/buildController');
const authenticationService = require("../services/authentication");

// PUBLIC ROUTES

/**
 * GET /api/builds/public
 * Retrieves all public builds with optional filtering (e.g., by character or likes).
 */
router.get('/public', buildController.getPublicBuilds);

/**
 * GET /api/builds/:buildId
 * Retrieves a single public build by its ID.
 */
router.get('/:buildId', buildController.getBuildById);

// AUTHENTICATED ROUTES (requires JWT)

router.use(authenticationService.authenticateJWT); // Middleware to protect all routes below

/**
 * GET /api/builds/user/:userId
 * Retrieves all builds for a specific user.
 */
router.get('/user/:userId', buildController.getBuildsByUser);

/**
 * POST /api/builds/:buildId/like
 * Increments the like count for a given build.
 */
router.post('/:buildId/like', buildController.likeBuild);

/**
 * POST /api/builds/
 * Creates a new empty build for the authenticated user.
 */
router.post('/', buildController.createBuild);

/**
 * PUT /api/builds/:buildId
 * Updates the weapon selections or metadata for a build.
 */
router.put('/:buildId', buildController.updateBuildWeapons);

/**
 * PUT /api/builds/:buildId/share
 * Marks a build as public (visible on browse page).
 */
router.put('/:buildId/share', buildController.shareBuild);

module.exports = router;
