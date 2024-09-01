"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiCopy, FiFile, FiUser, FiCpu, FiMoreVertical } from 'react-icons/fi'; 
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'highlight.js/styles/github-dark.css';
import Sidebar from './Sidebar';
import { useRouter } from 'next/navigation';

const ChatArea = ({ onBack }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState('llama3-8b-8192');
    const messagesEndRef = useRef(null);
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false); 

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

    const handleClearChat = () => {
        setMessages([]);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleOptionClick = (option) => {
        // Handle menu option clicks here hehehe done 
        console.log(option);
        setShowMenu(false); 
        router.push('/profile');
    };

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
                                <code className="p-1 bg-gray-800 rounded text-yellow-300" {...props}>
                                    {children}
                                </code>
                            );
                        },
                        table: ({ children }) => (
                            <div className="overflow-x-auto">
                                <table className="table-auto border-collapse border border-gray-400">
                                    {children}
                                </table>
                            </div>
                        ),
                        th: ({ children }) => (
                            <th className="border border-gray-300 px-4 py-2 bg-gray-200 text-center">
                                {children}
                            </th>
                        ),
                        td: ({ children }) => (
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {children}
                            </td>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            );
        }
    };
    

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800 font-serif">
        {/* Top Section with Back Button, Model Selection, and Menu */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-600 bg-black">
            <button
                onClick={onBack}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-full"
            >
                ⬅ LIZA AI
            </button>
            <div className="flex items-center space-x-4">
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 text-black rounded-lg p-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                >
                <option value="gemma-7b-it">Gemma 7B</option>
                <option value="gemma2-9b-it">Gemma 2 9B</option>
                <option value="llama3-70b-8192">Llama 3 70B</option>
                <option value="llama3-8b-8192">Llama 3 8B</option>
                <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
               </select>
                <button
                    onClick={handleClearChat}
                    className="bg-black-500 text-black p-2 rounded-full hover:bg-red-600"
                    title="Clear Chat"
                >
                    🗑️
                </button>
                <div className="relative">
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-gray-500 dark:text-gray-300"
                    >
                        <FiMoreVertical size={24} />
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                            <ul className="list-none p-2">
                                <li onClick={() => handleOptionClick('profile')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                                    <FiUser className="inline-block mr-2" /> Profile
                                </li>
                                <li onClick={() => handleOptionClick('settings')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                                    <FiMoreVertical className="inline-block mr-2" /> Settings
                                </li>
                                <li onClick={() => handleOptionClick('logout')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                                    <FiCopy className="inline-block mr-2" /> Log Out
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>



            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-6 bg-black-50 dark:bg-gray-900">
    {messages.length === 0 && !loading && (
        <div className="text-center text-gray-500 dark:text-gray-400">
            Start the conversation by typing a message...
        </div>
    )}
    {messages.map((message, index) => (
        <motion.div
            key={index}
            className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={`flex items-stretch space-x-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {message.role === 'user' ? (
                    <>
                        <FiUser className="text-blue-500" /> 
                        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg shadow">
                            {renderMessageContent(message.content)}
                        </div>
                    </>
                ) : (
                    <>
                        <FiCpu className="text-green-500" /> 
                        <div className="bg-gray-900 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg shadow">
                            {renderMessageContent(message.content)}
                            {index === messages.length - 1 && (
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Generated by {selectedModel}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    ))}
    <div ref={messagesEndRef} />
</div>



            {/* Input Section */}
            <div className="flex items-center p-2 border-t border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                <label htmlFor="file-upload" className="cursor-pointer">
                    <FiFile className="text-gray-500 dark:text-gray-300 mr-3" size={24} />
                </label>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                /> 
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    rows={1}
                    className="flex-1 resize-none bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg focus:outline-none"
                />
                <button
                    onClick={handleSend}
                    className="ml-4 bg-blue-500 text-white p-3 rounded-lg focus:outline-none hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : <FiSend />}
                </button>
            </div>

            <ToastContainer />
        </div>
    );
};

export default ChatArea;
