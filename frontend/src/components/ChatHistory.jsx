
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MessageSquare, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatHistory = ({ onSelectChat, onNewChat, currentChatId }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/chat/history', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(res.data.data);
        } catch (error) {
            console.error("Failed to fetch chat history", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [currentChatId]); // Refresh when chat changes (e.g. after save)

    const deleteChat = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this chat?")) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/chat/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(history.filter(chat => chat._id !== id));
            if (currentChatId === id) onNewChat();
        } catch (error) {
            console.error("Failed to delete chat", error);
        }
    };

    return (
        <div style={styles.container}>
            <button onClick={onNewChat} style={styles.newChatBtn}>
                <Plus size={18} />
                New Chat
            </button>

            <div style={styles.list}>
                {loading ? (
                    <p style={styles.loading}>Loading history...</p>
                ) : history.length === 0 ? (
                    <p style={styles.empty}>No chat history found</p>
                ) : (
                    history.map(chat => (
                        <motion.div
                            key={chat._id}
                            style={{
                                ...styles.chatItem,
                                background: chat._id === currentChatId ? 'var(--color-bg-secondary)' : 'transparent'
                            }}
                            onClick={() => onSelectChat(chat)}
                            whileHover={{ scale: 1.02, backgroundColor: 'var(--color-bg-secondary)' }}
                        >
                            <div style={styles.chatInfo}>
                                <MessageSquare size={16} style={{ minWidth: '16px' }} />
                                <span style={styles.title}>{chat.title || "Untitled Chat"}</span>
                            </div>
                            <button
                                onClick={(e) => deleteChat(e, chat._id)}
                                style={styles.deleteBtn}
                            >
                                <Trash2 size={14} />
                            </button>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '260px',
        borderRight: '1px solid var(--color-border)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        background: 'var(--color-bg-primary)',
    },
    newChatBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem',
        background: 'var(--color-primary)',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontWeight: '600',
        marginBottom: '1rem',
    },
    list: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    loading: { textAlign: 'center', color: 'var(--color-text-light)', fontSize: '0.9rem' },
    empty: { textAlign: 'center', color: 'var(--color-text-light)', fontSize: '0.9rem', marginTop: '1rem' },
    chatItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        transition: 'background 0.2s',
        color: 'var(--color-text)',
    },
    chatInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        overflow: 'hidden',
    },
    title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '0.9rem',
    },
    deleteBtn: {
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text-light)',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
    },
};

export default ChatHistory;
