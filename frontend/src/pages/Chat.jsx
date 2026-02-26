
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatHistory from '../components/ChatHistory.jsx';

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Welcome to the ASTU Smart Assistant. I can help you with campus-related issues, explain how to file complaints, or provide information about our tracking system. How can I assist you today?" }
    ]);
    const [loading, setLoading] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const { token } = useAuth();
    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSelectChat = (chat) => {
        setCurrentChatId(chat._id);
        const formattedMessages = chat.messages.map(msg => ({
            role: msg.role === 'assistant' ? 'bot' : msg.role, // Handle compatibility
            content: msg.content
        }));
        setMessages(formattedMessages);
    };

    const handleNewChat = () => {
        setCurrentChatId(null);
        setMessages([
            { role: 'bot', content: "Welcome to the ASTU Smart Assistant. I can help you with campus-related issues, explain how to file complaints, or provide information about our tracking system. How can I assist you today?" }
        ]);
    };

    const saveChatSession = async (updatedMessages, chatId) => {
        try {
            const title = updatedMessages.find(m => m.role === 'user')?.content.substring(0, 30) || "New Conversation";

            // Map 'bot' back to 'assistant' or 'model' if needed by backend, but backend model allows 'model' or 'assistant'.
            // Frontend uses 'bot', backend schema uses 'model' or 'assistant'. Let's stick to 'assistant' for backend consistency if preferred, 
            // or update backend enum. Backend Chat.js allows "user", "model", "assistant".
            const backendMessages = updatedMessages.map(msg => ({
                role: msg.role === 'bot' ? 'assistant' : msg.role,
                content: msg.content
            }));

            // If we have a chatId, we might update it (not implemented in backend update logic yet, usually POST save creates new if not handling upsert ID).
            // Requirement said "Save or update a chat session".
            // Backend `saveChat` creates NEW one every time currently. To update, we'd need to modify backend `saveChat` to check for ID.
            // For now, let's just save. If persistence is key, we really need `upsert`.

            // Let's assume for now we save new strings of conversation. A proper "Update" endpoint is needed to append.
            // Given the limitations of current `saveChat` (creates new), we might spam DB if we save on every message without an Update ID logic.
            // But let's verify `saveChat` logic.
            // `saveChat`: `const newChat = new Chat(...)`. It ALWAYS creates new.
            // This is suboptimal. I should update `chat.controller` to support updating, OR just save on session end? 
            // Real-time saving is better. I will update `chat.controller.js` to handle Updates first?

            // Actually, let's keep it simple: Save ONLY when requested? No, user expects auto-save.
            // I will MODIFY `chat.controller.js` to support updating if `chatId` is provided.

            const payload = {
                messages: backendMessages,
                title,
                chatId
            };

            const res = await axios.post('http://localhost:5000/api/chat/save', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // If it was a new chat, we get an ID back.
            if (!chatId && res.data.data._id) {
                setCurrentChatId(res.data.data._id);
            }

        } catch (error) {
            console.error("Failed to save chat", error);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/query',
                { query: input },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const botMessage = { role: 'bot', content: res.data.data };
            const finalMessages = [...updatedMessages, botMessage];
            setMessages(finalMessages);

            // Auto-save after response
            saveChatSession(finalMessages, currentChatId);

        } catch (err) {
            const serverError = err.response?.data?.error || err.response?.data?.message || err.message;
            setMessages(prev => [...prev, {
                role: 'bot',
                content: `I encountered a journey interruption: ${serverError}.`
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container} className="pattern-bg">
            <div style={styles.chatBox}>
                <ChatHistory
                    onSelectChat={handleSelectChat}
                    onNewChat={handleNewChat}
                    currentChatId={currentChatId}
                />

                {/* Main Chat Area */}
                <div style={styles.main}>
                    <div style={styles.header}>
                        <div style={styles.botInfo}>
                            <div style={styles.botAvatarLarge}>
                                <Bot size={24} color="white" />
                            </div>
                            <div>
                                <h2 style={styles.botName}>ASTU Smart Assistant</h2>
                                <div style={styles.status}>
                                    <div style={styles.onlineDot}></div>
                                    Online
                                </div>
                            </div>
                        </div>
                        <Sparkles color="var(--color-gold)" size={20} />
                    </div>

                    <div style={styles.messagesContainer} ref={scrollRef}>
                        <AnimatePresence>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        ...styles.messageRow,
                                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    {msg.role === 'bot' && (
                                        <div style={styles.botAvatar}>
                                            <Bot size={16} color="white" />
                                        </div>
                                    )}
                                    <div style={{
                                        ...styles.bubble,
                                        background: msg.role === 'user' ? 'var(--color-primary)' : 'white',
                                        color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                                        borderRadius: msg.role === 'user' ? '1.2rem 1.2rem 0 1.2rem' : '0 1.2rem 1.2rem 1.2rem',
                                        boxShadow: msg.role === 'user' ? 'none' : 'var(--shadow-sm)'
                                    }}>
                                        {msg.content}
                                    </div>
                                    {msg.role === 'user' && (
                                        <div style={styles.userAvatar}>
                                            <User size={16} color="white" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {loading && (
                            <div style={styles.loadingWrapper}>
                                <div className="dot-typing"></div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Processing your request...</span>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSend} style={styles.inputArea}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about dormitory maintenance, lab equipment, or how to track your ticket..."
                            style={styles.input}
                        />
                        <button type="submit" disabled={loading} style={styles.sendBtn}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    // ... (Keep existing styles, mostly same, check ChatHistory integration)
    container: {
        height: 'calc(100vh - 84px)',
        maxHeight: 'calc(100vh - 84px)',
        display: 'flex',
        padding: '2rem',
        overflow: 'hidden',
    },
    chatBox: {
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
    },
    main: { flex: 1, display: 'flex', flexDirection: 'column' },
    header: {
        padding: '1.25rem 2rem',
        borderBottom: '1px solid var(--color-border)',
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    botInfo: { display: 'flex', alignItems: 'center', gap: '1rem' },
    botAvatarLarge: {
        width: '45px',
        height: '45px',
        background: 'var(--color-secondary)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botName: { fontSize: '1.2rem', fontWeight: '700' },
    status: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-light)' },
    onlineDot: { width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%' },
    messagesContainer: {
        flex: 1,
        padding: '2rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    messageRow: { display: 'flex', alignItems: 'flex-end', gap: '0.75rem' },
    botAvatar: {
        width: '32px',
        height: '32px',
        background: 'var(--color-secondary)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    userAvatar: {
        width: '32px',
        height: '32px',
        background: 'var(--color-gold)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    bubble: {
        maxWidth: '75%',
        padding: '1rem 1.25rem',
        fontSize: '1rem',
        lineHeight: '1.5',
    },
    loadingWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.5rem 1rem',
    },
    inputArea: {
        padding: '1.5rem 2.5rem',
        background: 'white',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        gap: '1rem',
    },
    input: {
        flex: 1,
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg)',
        outline: 'none',
        fontSize: '1rem',
    },
    sendBtn: {
        width: '50px',
        height: '50px',
        background: 'var(--color-primary)',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-md)',
    }
};

export default Chat;
