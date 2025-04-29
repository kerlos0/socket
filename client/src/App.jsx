import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4500'); 

function App() {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setReceivedMessages(prevMessages => [...prevMessages, message]);
        })
    },[]); 
  
    const sendMessage = (e) => {
        e.preventDefault()
        if (message !== '') {
            socket.emit('message', message );
            setMessage('');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <br /><br />
            <form onSubmit={(e) => {
                sendMessage(e); 
            }}>
                <input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button type="submit">Click</button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '400px', margin: 'auto' }}>
                <h3>Chat Messages:</h3>
                {receivedMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );
}

export default App;
