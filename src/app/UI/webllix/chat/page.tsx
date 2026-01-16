'use client'

import React, { useState } from 'react';

interface ChatInterfaceProps {
    messages: { role: string; content: string; imageUrl?: string }[]; // Accept messages as props
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages }) => {
    const [input, setInput] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleSend = async () => {
        if (!input.trim() && !selectedImage) return; // Prevent sending empty messages

        const newMessage = { role: 'user', content: input, imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined };
        // Here you would typically send the newMessage to your backend or OpenAI API

        setInput('');
        setSelectedImage(null); // Reset selected image

        // Handle sending the message to the OpenAI API as before...
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
        <div className="chat-interface border p-4 rounded bg-gray-100">
            <div className="messages mb-4 max-h-60 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.role}>
                        <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
                        {msg.imageUrl && <img src={msg.imageUrl} alt="User sent" className="mt-2 max-w-xs" />}
                    </div>
                ))}
            </div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-2 border rounded"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
            <button onClick={handleSend} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Send
            </button>
        </div>
    );
};

export default ChatInterface;