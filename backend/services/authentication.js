// Import the jsonwebtoken library to work with JWT tokens
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env

// Load the secret key used for signing tokens from environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Import bcrypt for securely comparing hashed passwords
const bcrypt = require('bcrypt');

/**
 * Authenticates a user based on provided credentials.
 * If successful, returns a signed JWT token and user info.
 *
 * @param {Object} credentials - Contains email and password from the login form
 * @param {Array} users - List of users from the database
 * @param {Object} res - Express response object
 */
async function authenticateUser({ email, password }, users, res) {
    // Find user by email
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    try {
        // Compare password with hashed password
        const isMatch = await checkPassword(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create a signed JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // Return token and user info
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error during login' });
    }
}

/**
 * Middleware to protect routes using JWT authentication.
 * Verifies the token sent in the Authorization header.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = decoded; // Attach user info to the request
        return next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ message: 'Invalid token' });
    }
}

/**
 * Compares a plain password with a hashed password using bcrypt.
 *
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password from database
 * @returns {Promise<boolean>} Whether the passwords match
 */
async function checkPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Export the authentication functions
module.exports = {
    authenticateUser,
    authenticateJWT
};
