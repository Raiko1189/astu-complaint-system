import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Send, User, Bot, MessageCircle, X, Minimize2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Hi! I'm your Ethiopian AI guide. How can I help you today?" }
    ]);
    const [loading, setLoading] = useState(false);
    const { token, user } = useAuth();
    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        if (!user) {
            setMessages(prev => [...prev, { role: 'bot', content: "Please login to chat with me!" }]);
            setInput('');
            return;
        }

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/query',
                { query: input },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const botMessage = { role: 'bot', content: res.data.data };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'bot',
                content: "Sorry, I hit a snag. Please try again later."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.widgetContainer}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        style={styles.chatWindow}
                    >
                        {/* Header */}
                        <div style={styles.header}>
                            <div style={styles.headerInfo}>
                                <div style={styles.avatarMini}>
                                    <Bot size={18} color="white" />
                                </div>
                                <div>
                                    <div style={styles.title}>AITopia Guide</div>
                                    <div style={styles.status}>Online</div>
                                </div>
                            </div>
                            <div style={styles.headerActions}>
                                <button onClick={() => setIsOpen(false)} style={styles.iconBtn}>
                                    <Minimize2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={styles.messagesList} ref={scrollRef}>
                            {messages.map((msg, i) => (
                                <div key={i} style={{
                                    ...styles.messageRow,
                                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                                }}>
                                    <div style={{
                                        ...styles.bubble,
                                        background: msg.role === 'user' ? 'var(--color-primary)' : '#f3f4f6',
                                        color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                                        borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '0 12px 12px 12px',
                                    }}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div style={styles.loading}>
                                    <div className="dot-typing-sm"></div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} style={styles.inputArea}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                style={styles.input}
                            />
                            <button type="submit" disabled={loading} style={styles.sendBtn}>
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    ...styles.toggleBtn,
                    background: isOpen ? 'var(--color-secondary)' : 'var(--color-primary)'
                }}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                {!isOpen && !user && (
                    <div style={styles.notificationBadge}>1</div>
                )}
            </motion.button>
        </div>
    );
};

const styles = {
    widgetContainer: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '1rem',
    },
    toggleBtn: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        border: 'none',
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: '-2px',
        right: '-2px',
        background: 'var(--color-gold)',
        color: 'white',
        fontSize: '10px',
        fontWeight: 'bold',
        padding: '2px 6px',
        borderRadius: '10px',
        border: '2px solid white',
    },
    chatWindow: {
        width: '350px',
        height: '500px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
    },
    header: {
        padding: '1rem',
        background: 'var(--color-primary)',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    avatarMini: {
        width: '32px',
        height: '32px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
    },
    status: {
        fontSize: '0.7rem',
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    headerActions: {
        display: 'flex',
        gap: '0.5rem',
    },
    iconBtn: {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        opacity: 0.8,
    },
    messagesList: {
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    messageRow: {
        display: 'flex',
        width: '100%',
    },
    bubble: {
        maxWidth: '85%',
        padding: '0.75rem 1rem',
        fontSize: '0.9rem',
        lineHeight: '1.4',
    },
    loading: {
        padding: '0.5rem',
    },
    inputArea: {
        padding: '1rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        gap: '0.5rem',
    },
    input: {
        flex: 1,
        padding: '0.6rem 1rem',
        borderRadius: '20px',
        border: '1px solid var(--color-border)',
        fontSize: '0.9rem',
        outline: 'none',
    },
    sendBtn: {
        width: '36px',
        height: '36px',
        background: 'var(--color-primary)',
        color: 'white',
        borderRadius: '50%',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    }
};

export default ChatWidget;
