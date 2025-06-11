// Load environment variables from a .env file (e.g., DB_USERNAME, DB_PASSWORD)
require('dotenv').config();

// Import mysql2 library to handle MySQL database connections
const mysql = require('mysql2');

// Create a connection object with configuration settings
const config = mysql.createConnection({
    host: 'atp.fhstp.ac.at',               // Hostname of the database server
    port: 8007,                            // Port number used by the database
    user: process.env.DB_USERNAME,        // Username loaded from .env file
    password: process.env.DB_PASSWORD,    // Password loaded from .env file
    database: 'cc241055'                  // Name of the database
});

// Establish the connection to the database
config.connect((err) => {
    if (err) {
        // If there's an error, stop the application and throw the error
        throw err;
    } else {
        // Successfully connected to the database
        console.log('Connected to database');
    }
});

// Export the config object to be used in other parts of the app (e.g., models)
module.exports = { config };
