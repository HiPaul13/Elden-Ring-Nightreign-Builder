// Import the 'ws' WebSocket library
const Websockets = require('ws');

// Create a new WebSocket server listening on port 8080
const wss = new Websockets.Server({ port: 8080 });

/**
 * When a new client connects to the server
 */
wss.on('connection', ws => {
    // Initialize a property to track which room this client is in
    ws.room = '';

    /**
     * When the server receives a message from a client
     */
    ws.on('message', message => {
        console.log(`Received message: ${message}`);

        // Convert the incoming JSON string into a JavaScript object
        let msg = JSON.parse(message);

        // Handle room joining request
        if (msg.joinRoom) {
            ws.room = msg.joinRoom;
        }

        // Broadcast the message to all users in the same room
        if (msg.room) {
            websocketSendToAll(JSON.stringify(msg)); // Re-stringify message before broadcasting
        }
    });

    // Send a welcome message to the newly connected client
    ws.send(JSON.stringify({ message: 'Welcome from server' }));
});

/**
 * Broadcasts a message to all clients in the same room
 * @param {string} text - A JSON stringified message to send
 */
function websocketSendToAll(text) {
    // Loop through all connected clients
    wss.clients.forEach(client => {
        // Only send to clients that are connected and in the same room
        if (client.readyState === Websockets.OPEN) {
            const message = JSON.parse(text);
            if (client.room === message.room) {
                client.send(text);
            }
        }
    });
}
