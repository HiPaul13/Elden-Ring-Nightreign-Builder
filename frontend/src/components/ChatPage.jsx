import { useEffect, useRef, useState } from 'react';
import '../styles/ChatPage.css';
import Footer from "./Footer.jsx";

/**
 * ChatPage Component
 * Provides real-time chat functionality using WebSocket.
 * Users are auto-identified by their JWT username and can switch between rooms.
 */
function ChatPage() {
    // Component state
    const [messages, setMessages] = useState([]);         // Stores chat messages
    const [input, setInput] = useState('');               // Message input field
    const [username, setUsername] = useState('');         // Username from JWT
    const [connected, setConnected] = useState(false);    // WebSocket connection status
    const [room, setRoom] = useState('global');           // Current chatroom

    const ws = useRef(null);                              // WebSocket reference

    // Available chatrooms
    const rooms = ['global', 'builds', 'pvp', 'lore', 'weapons', 'bosses'];

    // On first render: decode token to get username
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1])); // decode base64 payload
                setUsername(payload.username);
            } catch {
                console.error("Invalid token");
            }
        }
    }, []);

    // Handle WebSocket connection whenever the username or room changes
    useEffect(() => {
        if (!username) return;

        // Open WebSocket connection
        ws.current = new WebSocket('ws://localhost:8080');

        // On connection open, join the selected room
        ws.current.onopen = () => {
            setConnected(true);
            ws.current.send(JSON.stringify({ joinRoom: room }));
        };

        // Handle incoming messages
        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message && data.user) {
                setMessages(prev => [...prev, data]);
            }
        };

        // Clean up WebSocket on component unmount or room change
        return () => ws.current.close();
    }, [room, username]);

    // Send message via WebSocket
    const sendMessage = () => {
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            console.warn("WebSocket not connected yet.");
            return;
        }

        if (input.trim()) {
            ws.current.send(JSON.stringify({
                room,
                user: username,
                message: input
            }));
            setInput(''); // Clear input field
        }
    };

    return (
            <div className="page-container-chat">
                <div className="chat-wrapper">
                    <h2 className="chat-title">Chatroom</h2>
                    <div className="chat-layout">

                        {/* Left side: message area */}
                        <div className="chat-box">
                            <div className="chat-header">{room}</div>
                            <div className="chat-log">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`chat-bubble ${msg.user === username ? 'mine' : 'theirs'}`}
                                    >
                                        <div className="chat-user">{msg.user}</div>
                                        <div>{msg.message}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Input row */}
                            <div className="chat-input-row">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <button onClick={sendMessage} disabled={!connected}>Send</button>
                            </div>
                        </div>

                        {/* Right side: room list */}
                        <div className="chat-room-list">
                            <h3>Chatrooms</h3>
                            {rooms.map((r) => (
                                <button
                                    key={r}
                                    className={`room-button ${r === room ? 'active' : ''}`}
                                    onClick={() => {
                                        setMessages([]); // Clear messages when switching rooms
                                        setRoom(r);       // Change current room
                                    }}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>




    );
}

export default ChatPage;
