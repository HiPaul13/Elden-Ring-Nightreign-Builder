const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticationService = require('../services/authentication');


router.use(authenticationService.authenticateJWT);

// GET all users
router.get('/', userController.getUsers);

// GET user by ID
router.get('/:id', userController.getUser);

// CREATE new user
router.post('/', userController.createUser);
// changed from /add

// UPDATE existing user
router.put('/:id', userController.updateUser); // changed from POST

// DELETE user
router.delete('/:id', userController.deleteUser); // changed from POST /delete

module.exports = router;
