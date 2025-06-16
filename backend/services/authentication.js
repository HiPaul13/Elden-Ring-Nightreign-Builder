// Import the jsonwebtoken library to work with JWT tokens
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Load the secret key used for signing tokens from environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Import bcrypt for securely comparing hashed passwords
const bcrypt = require('bcrypt');

async function authenticateUser({ email, password }, users, res) {
    const user = users.find(u => u.email === email);


    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    try {
        const isMatch = await checkPassword(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // ✅ Send token and user as JSON
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
 * Verifies the token stored in the cookie and attaches the decoded user info to req.user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
function authenticateJWT(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("auth")
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        console.log(req.user);
        return next();
    } catch (err) {
        res.status(401);
        next(err);
    }
}


async function checkPassword(password, hash) {
    let pw = await bcrypt.compare(password, hash);
    return pw;
}

// Export the functions for use in route files or middleware
module.exports = {
    authenticateUser,
    authenticateJWT
}
