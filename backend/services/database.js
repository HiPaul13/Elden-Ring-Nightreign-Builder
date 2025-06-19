// Load environment variables from a .env file (e.g., DB_USERNAME, DB_PASSWORD)
require('dotenv').config();

// Import mysql2 library to handle MySQL database connections
const mysql = require('mysql2');

// Create a connection object with configuration settings
const config = mysql.createConnection({
    host: 'atp.fhstp.ac.at',               // Hostname of the database server (UAS FHSTP MySQL host)
    port: 8007,                            // Port number used by the remote MySQL database
    user: process.env.DB_USERNAME,        // Securely load DB username from environment variables
    password: process.env.DB_PASSWORD,    // Securely load DB password from environment variables
    database: 'cc241055'                  // Database schema name (e.g., your student ID schema)
});

// Establish the connection to the database
config.connect((err) => {
    if (err) {
        // If there's a connection error, log it and stop the app
        throw err;
    } else {
        // Successfully connected
        console.log('Connected to database');
    }
});

// Export the config object to be used in other parts of the app (e.g., models, services)
module.exports = { config };
