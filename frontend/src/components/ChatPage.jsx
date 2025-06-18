import { useEffect, useRef, useState } from 'react';
import '../styles/ChatPage.css';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [connected, setConnected] = useState(false);
    const [room, setRoom] = useState('global');
    const ws = useRef(null);

    const rooms = ['global', 'builds', 'pvp', 'lore', 'weapons', 'bosses'];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUsername(payload.username); // or payload.name, adjust as needed
            } catch {
                console.error("Invalid token");
            }
        }
    }, []);


    useEffect(() => {
        if (!username) return;

        ws.current = new WebSocket('ws://localhost:8080');

        ws.current.onopen = () => {
            setConnected(true);
            ws.current.send(JSON.stringify({ joinRoom: room }));
        };


        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message && data.user) {
                setMessages(prev => [...prev, data]);
            }
        };

        return () => ws.current.close();
    }, [room, username]);

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
            setInput('');
        }
    };


    return (
        <div className="chat-wrapper">
            <img src="/images/logo.png" alt="logo" className="chat-logo" />
            <h2 className="chat-title">Chatroom</h2>
            <div className="chat-layout">
                {/* Chat log and input */}
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

                {/* Room list */}
                <div className="chat-room-list">
                    <h3>Chatrooms</h3>
                    {rooms.map((r) => (
                        <button
                            key={r}
                            className={`room-button ${r === room ? 'active' : ''}`}
                            onClick={() => {
                                setMessages([]); // clear messages on room switch
                                setRoom(r);
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
