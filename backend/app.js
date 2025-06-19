// Import required modules
const express = require('express');
const app = express();                 // Create an Express application
const port = 3000;                     // Port the server will listen on

const cors = require('cors');
// Enable CORS to allow communication from the frontend (e.g., React at localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Import custom services and route modules
const db = require('./services/database');     // Database connection setup
const ws = require('./services/websockets');   // WebSocket server setup

const path = require('path');                  // Utility for working with file and directory paths
// const ejs = require('ejs');                 // If templating is needed in the future

// Serve static files (e.g., images, CSS) from the 'public' directory
app.use(express.static('public'));

// Middleware for parsing cookies (attaches cookies to req.cookies)
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware for parsing incoming request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '2mb' }));               // Handle JSON bodies with a max size
app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' })); // Handle form submissions

// Import route handlers
const indexRouter = require('./routes/index');     // Routes for login, register, etc.
const usersRouter = require('./routes/users');     // Routes for user CRUD operations
const weaponsRouter = require('./routes/weapons'); // Routes to fetch weapon data
const buildsRouter = require('./routes/builds');   // Routes for build creation and viewing

// Register route handlers under API prefixes
app.use('/api/auth', indexRouter);       // Auth-related routes
app.use('/api/users', usersRouter);      // User-related routes
app.use('/api/weapons', weaponsRouter);  // Weapon-related routes
app.use('/api/builds', buildsRouter);    // Build-related routes

// Centralized error handler
function errorHandler(err, req, res, next) {
    console.error('❌ Error:', err);
    res.status(500).json({
        error: err.message || 'Internal Server Error'
    });
}
app.use(errorHandler);

// Start the Express server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
