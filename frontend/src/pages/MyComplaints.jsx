import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Inbox, Search, Filter, Clock, CheckCircle2,
    AlertCircle, FileText, ArrowRight, Plus,
    MessageSquare, ExternalLink, Calendar
} from 'lucide-react';
import './Dashboards.css';

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/complaints/my', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setComplaints(res.data.data);
            } catch (error) {
                console.error('Error fetching complaints', error);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    const StatusBadge = ({ status }) => {
        const configs = {
            open: { icon: Inbox, class: 'badge-open', text: 'Submitted' },
            in_progress: { icon: Clock, class: 'badge-progress', text: 'In Review' },
            resolved: { icon: CheckCircle2, class: 'badge-resolved', text: 'Resolved' }
        };
        const config = configs[status] || { icon: AlertCircle, class: '', text: status };
        const Icon = config.icon;

        return (
            <span className={`badge-premium ${config.class}`}>
                <Icon size={12} /> {config.text}
            </span>
        );
    };

    if (loading) return (
        <div className="workspace-loading">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="spinner-premium"
            />
            <p>Syncing your reports...</p>
        </div>
    );

    const filtered = complaints.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="workspace-layout">
            <header className="workspace-header-v2">
                <div className="header-brand">
                    <div className="brand-icon-wrapper">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1>My Reports</h1>
                        <p>Tracking {complaints.length} institutional cases</p>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="search-pill">
                        <Search size={18} />
                        <input
                            placeholder="Filter your cases..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-refresh" onClick={() => window.location.href = '/submit-complaint'}>
                        <Plus size={18} /> New Report
                    </button>
                </div>
            </header>

            <main className="complaint-matrix-grid">
                {filtered.length === 0 ? (
                    <div className="empty-state-card">
                        <div className="empty-icon">
                            <Inbox size={64} />
                        </div>
                        <h3>No records found</h3>
                        <p>You haven't submitted any reports matching your search.</p>
                        <button
                            className="btn-premium-primary mt-4"
                            onClick={() => window.location.href = '/submit-complaint'}
                        >
                            Launch New Case
                        </button>
                    </div>
                ) : (
                    <div className="case-grid">
                        {filtered.map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={item._id}
                                className="case-card-premium"
                            >
                                <div className="case-card-header">
                                    <StatusBadge status={item.status} />
                                    <span className="case-date">
                                        <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="case-body">
                                    <span className="case-domain">{item.categoryId?.name}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description.substring(0, 120)}...</p>
                                </div>
                                {item.attachments?.length > 0 && (
                                    <div className="case-attachments-preview">
                                        {item.attachments.slice(0, 3).map((img, i) => (
                                            <div key={i} className="attachment-mini">
                                                <img src={`http://localhost:5000${img}`} alt="Preview" />
                                            </div>
                                        ))}
                                        {item.attachments.length > 3 && (
                                            <div className="attachment-more">+{item.attachments.length - 3}</div>
                                        )}
                                    </div>
                                )}
                                <div className="case-card-footer">
                                    <div className="case-metrics">
                                        <MessageSquare size={14} /> <span>{item.adminComments?.length || 0}</span>
                                    </div>
                                    <button className="btn-view-details">
                                        Manage Case <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyComplaints;
