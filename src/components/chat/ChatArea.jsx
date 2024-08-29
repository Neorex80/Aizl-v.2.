"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiCopy, FiFile } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Choose your preferred highlight.js theme

const ChatArea = ({ onBack }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState('llama3-8b-8192');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' && !loading) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedModel,
                    messages: [...messages, userMessage],
                }),
            });

            const data = await response.json();
            console.log('API Response:', data);

            if (response.ok) {
                const assistantMessage = {
                    role: 'assistant',
                    content: data.response ? data.response : 'No content received',
                };
                setMessages((prevMessages) => [...prevMessages, assistantMessage]);
            } else {
                toast.error('Error: ' + data.error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: 'assistant', content: 'Error: ' + data.error },
                ]);
            }
        } catch (error) {
            console.error('Error fetching AI response:', error);
            toast.error('Error fetching response.');
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: 'Error fetching response.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const userMessage = { role: 'user', content: `Uploaded file: ${file.name}`, file };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            // Implement file upload logic here
            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: file,
            }).then(res => res.json());

            if (uploadResponse && uploadResponse.uri) {
                const prompt = `Describe how this product might be manufactured.`;
                handleSendFile(prompt, uploadResponse.uri, file.type);
            }
        }
    };

    const handleSendFile = async (prompt, fileUri, mimeType) => {
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedModel,
                    messages: [
                        ...messages,
                        { role: 'user', content: prompt, fileUri, mimeType },
                    ],
                }),
            });

            const data = await response.json();
            if (response.ok) {
                const assistantMessage = {
                    role: 'assistant',
                    content: data.response ? data.response : 'No content received',
                };
                setMessages((prevMessages) => [...prevMessages, assistantMessage]);
            } else {
                toast.error('Error: ' + data.error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: 'assistant', content: 'Error: ' + data.error },
                ]);
            }
        } catch (error) {
            console.error('Error fetching AI response:', error);
            toast.error('Error fetching response.');
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: 'Error fetching response.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (content) => {
        navigator.clipboard.writeText(content);
        toast.info('Copied to clipboard!');
    };

    return (
        <div className="flex flex-col h-screen bg-black text-white">
            {/* Top Section with Back Button and Model Selection */}
            <div className="flex items-center justify-between p-4 border-b border-gray-600">
                <button 
                    onClick={onBack}  
                    className="bg-gray-700 text-gray-200 p-2 rounded-full"
                >
                    ⬅ Back
                </button>
                <select 
                    value={selectedModel} 
                    onChange={(e) => setSelectedModel(e.target.value)} 
                    className="border border-transparent rounded-lg p-2 focus:outline-none bg-black text-white font-bold"
                    style={{
                        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
                        borderImageSlice: 1,
                    }}
                >
                    <option value="gemma-7b-it">Gemma 7B</option>
                    <option value="gemma2-9b-it">Gemma 2 9B</option>
                    <option value="llama3-70b-8192">Llama 3 70B</option>
                    <option value="llama3-8b-8192">Llama 3 8B</option>
                    <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
                </select>
            </div>

            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-6">
                {messages.length === 0 && !loading && (
                    <div className="text-center text-gray-400">
                        Start the conversation by typing a message...
                    </div>
                )}
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow ${
                            message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-100'
                        }`}>
                            {message.file ? (
                                <div className="relative">
                                    <p>{message.content}</p>
                                    {message.file.type.startsWith('image/') && (
                                        <img src={URL.createObjectURL(message.file)} alt={message.file.name} className="rounded-lg mt-2" />
                                    )}
                                    {message.file.type === 'application/pdf' && (
                                        <a href={URL.createObjectURL(message.file)} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2">View PDF</a>
                                    )}
                                </div>
                            ) : (
                                <div className="relative">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                        components={{
                                            code({ node, inline, className, children, ...props }) {
                                                return !inline ? (
                                                    <pre className="p-2 overflow-x-auto bg-gray-800 rounded-lg">
                                                        <code {...props} className={className}>
                                                            {children}
                                                        </code>
                                                    </pre>
                                                ) : (
                                                    <code className="bg-gray-700 rounded-sm px-1">
                                                        {children}
                                                    </code>
                                                );
                                            },
                                            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-lg font-medium" {...props} />,
                                            p: ({ node, ...props }) => <p className="text-gray-300" {...props} />,
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                    <button
                                        onClick={() => handleCopy(message.content)}
                                        className="absolute top-0 right-0 p-1 m-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        <FiCopy size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <motion.div
                        className="flex justify-start mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow bg-gray-700 text-gray-100 animate-pulse">
                            Typing...
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="border-t border-gray-600 p-4 flex items-center">
                <input 
                    type="file" 
                    accept="image/*,application/pdf" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="mr-4 cursor-pointer text-gray-400 hover:text-gray-200">
                    <FiFile size={20} />
                </label>
                <textarea
                    disabled={loading}
                    className="flex-1 resize-none border border-gray-600 rounded-lg p-2 mr-4 focus:outline-none focus:border-blue-500 bg-gray-800 text-gray-100"
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FiSend size={20} />
                </button>
            </div>

            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default ChatArea;
