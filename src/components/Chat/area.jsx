"use client";
import React, { useState } from 'react';
import './ChatArea.css';

const ChatArea = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, user: 'me' }]);
            // Simulate a response from the AI agent (placeholder for actual agent integration)
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: `AI's response to "${input}"`, user: 'ai' },
                ]);
            }, 1000);
            setInput('');
        }
    };

    return (
        <div className="chat-area">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.user}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatArea;
