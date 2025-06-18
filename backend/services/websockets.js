
// Import the 'ws' WebSocket library
const Websockets = require('ws');

// Create a new WebSocket server listening on port 8080
const wss = new Websockets.Server({ port: 8080 });

// Event: When a new client connects
wss.on('connection', ws => {
    // Initialize a custom property on the socket to track the user's room
    //object for each user on connection
    ws.room = '';

    // Event: When the server receives a message from a client
    ws.on('message', message => {
        console.log(`Received message: ${message}`);

        // Parse the incoming JSON message
        //takes json string and converts it into a js object
        let msg = JSON.parse(message);

        // If the message contains a 'joinRoom' field, assign the user to that room
        if (msg.joinRoom) {
            ws.room = msg.joinRoom;
        }

        // If the message has a room specified, broadcast it to all clients in the same room
        if (msg.room) {
            websocketSendToAll(JSON.stringify(msg)); //stringify msg
        }
    });

    // Send a welcome message to the newly connected client //stringify the object
    ws.send(JSON.stringify({ message: 'Welcome from to server' }));
});

/**
 * Broadcasts a message to all clients in the same room
 * @param {string} text - The message stringified as JSON
 */


function websocketSendToAll(text) {
    wss.clients.forEach(function each(client) { //wss.clients = all clients connected // function each(client) for each client
        // Only send to clients that are open and in the same room
        if (client.readyState === Websockets.OPEN) { //readyState = tells status of the connection //Websockets.OPEN = Connection is open
            if (client.room === JSON.parse(text).room) { //checks for room, JSON.parse converts text into an js object again
                client.send(text); //send text to client
            }
        }
    });
}
