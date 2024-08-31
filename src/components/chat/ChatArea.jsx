"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiCopy, FiFile } from 'react-icons/fi'; // Import the file icon
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'highlight.js/styles/github-dark.css';

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
        if (input.trim() === '' || loading) return;

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

            try {
                const formData = new FormData();
                formData.append('file', file);

                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const uploadResult = await uploadResponse.json();

                if (uploadResponse.ok && uploadResult.uri) {
                    const prompt = `Describe how this product might be manufactured.`;
                    await handleSendFile(prompt, uploadResult.uri, file.type);
                } else {
                    toast.error('File upload failed.');
                }
            } catch (error) {
                console.error('File upload error:', error);
                toast.error('Error uploading file.');
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

    const renderMessageContent = (content) => {
        try {
            const parsedContent = JSON.parse(content);
            return (
                <pre className="bg-gray-800 text-gray-100 p-2 rounded-lg overflow-x-auto">
                    {JSON.stringify(parsedContent, null, 2)}
                </pre>
            );
        } catch {
            return (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <pre className="overflow-x-auto bg-gray-800 text-gray-100 p-2 rounded-lg">
                                    <code className={`language-${match[1]}`} {...props}>
                                        {children}
                                    </code>
                                </pre>
                            ) : (
                                <code className={`p-1 bg-gray-800 rounded text-yellow-300`} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            );
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800 font-sans">
            {/* Top Section with Back Button and Model Selection */}
            <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-600 bg-black">
                <button
                    onClick={onBack}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-full"
                >
                    ⬅ Back
                </button>
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                >
                    <option value="gemma-7b-it">Gemma 7B</option>
                    <option value="gemma2-9b-it">Gemma 2 9B</option>
                    <option value="llama3-70b-8192">Llama 3 70B</option>
                    <option value="llama3-8b-8192">Llama 3 8B</option>
                    <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
                </select>
            </div>

            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
                {messages.length === 0 && !loading && (
                    <div className="text-center text-gray-500 dark:text-gray-400">
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
                            message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}>
                            {renderMessageContent(message.content)}
                            <button
                                onClick={() => handleCopy(message.content)}
                                className="absolute top-2 right-2 p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                            >
                                <FiCopy />
                            </button>
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 flex items-center">
                <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <label
                    htmlFor="fileUpload"
                    className="cursor-pointer text-gray-600 dark:text-gray-300 mr-2"
                >
                    <FiFile size={24} />
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none"
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-300"
                >
                    <FiSend size={24} />
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChatArea;
