'use client'

import React, { useState } from 'react';

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; content: string; imageUrl?: string }[]>([]);
    const [input, setInput] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleSend = async () => {
        if (!input.trim() && !selectedImage) return; // Prevent sending empty messages

        const newMessage = { role: 'user', content: input, imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setSelectedImage(null); // Reset selected image

        try {
            const formData = new FormData();
            formData.append('prompt', input);
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            const response = await fetch('/api/users/generate/openai', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            const assistantMessage = { role: 'assistant', content: data.result };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Unable to get response.' }]);
        }
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