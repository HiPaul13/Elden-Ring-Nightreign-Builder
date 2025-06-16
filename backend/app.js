// Import required modules
const express = require('express');
const app = express();                 // Create Express application
const port = 3000;                     // Define the port the server will run on

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));




// Import custom modules
const db = require('./services/database');     // MySQL DB connection setup
//const ws = require('./services/websockets');   // WebSocket server

const path = require('path');                  // Node.js path utility
//const ejs = require('ejs');                    // EJS templating engine

// Serve static files from the 'public' directory (e.g., CSS, images)
app.use(express.static('public'));

// Middleware for parsing cookies // Attaches cookies object to request //parse cookies from HTTP Headers
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Helps express to read the body of incoming HTTP requests/ ecample req.body.username
const bodyParser = require('body-parser');
app.use(bodyParser.json());                         // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data

// Route modules
const indexRouter = require('./routes/index');   // Routes for login, register, chat, etc.
const usersRouter = require('./routes/users');   // Routes for user CRUD
const weaponsRouter = require('./routes/weapons')
const buildsRouter = require('./routes/builds');


// Register routers for route groups
app.use('/api/auth', indexRouter);        // Base route handler ("/")
app.use('/api/users', usersRouter);  // User-related route handler ("/users")
app.use('/api/weapons', weaponsRouter);
app.use('/api/builds', buildsRouter);
// Error-handling middleware
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
