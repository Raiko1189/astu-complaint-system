import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, ShieldCheck, Clock, CheckCircle2,
    ArrowRight, Search, Filter, MessageSquare,
    X, ExternalLink, User, MoreHorizontal,
    LayoutDashboard, AlertCircle, TrendingUp,
    FileText, UserCheck, Inbox
} from 'lucide-react';
import './Dashboards.css';

const ManageComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [remark, setRemark] = useState('');
    const [statusLoading, setStatusLoading] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        inProgress: 0,
        resolved: 0
    });

    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        if (complaints.length > 0) {
            setStats({
                total: complaints.length,
                open: complaints.filter(c => c.status === 'open').length,
                inProgress: complaints.filter(c => c.status === 'in_progress').length,
                resolved: complaints.filter(c => c.status === 'resolved').length
            });
        }
    }, [complaints]);

    const fetchAll = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/complaints/admin/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComplaints(res.data.data);
        } catch (error) {
            console.error('Error fetching complaints', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        setStatusLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:5000/api/complaints/${id}/status`,
                { status, comment: remark },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setRemark('');
            setComplaints(prev => prev.map(c => c._id === id ? { ...c, status } : c));
            setSelectedItem(null);
        } catch (error) {
            alert('Failed to update ticket status');
        } finally {
            setStatusLoading(false);
        }
    };

    const StatusBadge = ({ status }) => {
        const configs = {
            open: { icon: Inbox, class: 'badge-open', text: 'New Case' },
            in_progress: { icon: Clock, class: 'badge-progress', text: 'Active' },
            resolved: { icon: CheckCircle2, class: 'badge-resolved', text: 'Closed' }
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
            <p>Syncing Personnel Data...</p>
        </div>
    );

    return (
        <div className="workspace-layout">
            <header className="workspace-header-v2">
                <div className="header-brand">
                    <div className="brand-icon-wrapper">
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <h1>Command Center</h1>
                        <p>Managing {complaints.length} active institutional nodes</p>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="search-pill">
                        <Search size={18} />
                        <input placeholder="Search records..." />
                    </div>
                    <button className="btn-refresh" onClick={fetchAll}>
                        <TrendingUp size={18} /> Refresh Insight
                    </button>
                </div>
            </header>

            <div className="stats-dashboard-grid">
                <div className="metric-card">
                    <div className="metric-icon total"><FileText /></div>
                    <div className="metric-data">
                        <span className="label">Total Reports</span>
                        <span className="value">{stats.total}</span>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon open"><AlertCircle /></div>
                    <div className="metric-data">
                        <span className="label">New Queue</span>
                        <span className="value">{stats.open}</span>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon active"><Clock /></div>
                    <div className="metric-data">
                        <span className="label">In Resolution</span>
                        <span className="value">{stats.inProgress}</span>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon closed"><UserCheck /></div>
                    <div className="metric-data">
                        <span className="label">Resolved</span>
                        <span className="value">{stats.resolved}</span>
                    </div>
                </div>
            </div>

            <main className="content-panel">
                <div className="panel-header">
                    <h3>Case Management Matrix</h3>
                    <div className="filter-group">
                        <button className="filter-pill active">All Nodes</button>
                        <button className="filter-pill">High Priority</button>
                        <button className="filter-pill">Departmental</button>
                    </div>
                </div>

                <div className="table-responsive-v2">
                    <table className="workspace-table">
                        <thead>
                            <tr>
                                <th>Subject Identifier</th>
                                <th>Requester</th>
                                <th>Domain</th>
                                <th>Status State</th>
                                <th>Timestamp</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((item) => (
                                <tr key={item._id} onClick={() => setSelectedItem(item)}>
                                    <td className="subject-cell">
                                        <div className="subject-icon">
                                            <FileText size={18} />
                                        </div>
                                        <div className="subject-content">
                                            <span className="title">{item.title}</span>
                                            <span className="preview">{item.description.substring(0, 40)}...</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="user-pill">
                                            <div className="user-avatar">{item.studentId?.email?.[0].toUpperCase()}</div>
                                            <span>{item.studentId?.email?.split('@')[0]}</span>
                                        </div>
                                    </td>
                                    <td><span className="domain-tag">{item.categoryId?.name}</span></td>
                                    <td><StatusBadge status={item.status} /></td>
                                    <td><span className="timestamp-text">{new Date(item.createdAt).toLocaleDateString()}</span></td>
                                    <td>
                                        <button className="btn-manage-icon">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <AnimatePresence>
                {selectedItem && (
                    <div className="global-drawer-overlay">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="overlay-blur"
                            onClick={() => setSelectedItem(null)}
                        />
                        <motion.aside
                            initial={{ x: '100%', opacity: 0.5 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0.5 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="case-drawer"
                        >
                            <div className="drawer-inner">
                                <header className="drawer-header">
                                    <div className="title-area">
                                        <span className="case-id">TICKET-#{selectedItem._id.slice(-6).toUpperCase()}</span>
                                        <h2>{selectedItem.title}</h2>
                                    </div>
                                    <button className="btn-close-drawer" onClick={() => setSelectedItem(null)}>
                                        <X size={24} />
                                    </button>
                                </header>

                                <div className="drawer-content">
                                    <div className="content-section">
                                        <label>Operational Description</label>
                                        <div className="description-well">
                                            {selectedItem.description}
                                        </div>
                                    </div>

                                    {selectedItem.attachments?.length > 0 && (
                                        <div className="content-section">
                                            <label>Evidence Artifacts</label>
                                            <div className="artifact-scroll">
                                                {selectedItem.attachments.map((img, idx) => (
                                                    <div key={idx} className="artifact-card" onClick={() => window.open(`http://localhost:5000${img}`, '_blank')}>
                                                        <img src={`http://localhost:5000${img}`} alt="Evidence" />
                                                        <div className="artifact-hover">
                                                            <ExternalLink size={20} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="resolution-section">
                                        <label>Resolution Intelligence Payload</label>
                                        <textarea
                                            placeholder="Synthesize resolution steps here..."
                                            value={remark}
                                            onChange={(e) => setRemark(e.target.value)}
                                        />
                                        <div className="action-grid-premium">
                                            <button
                                                className="btn-action in-progress"
                                                onClick={() => handleUpdateStatus(selectedItem._id, 'in_progress')}
                                                disabled={statusLoading}
                                            >
                                                <Clock size={18} /> Transition to Active
                                            </button>
                                            <button
                                                className="btn-action resolve"
                                                onClick={() => handleUpdateStatus(selectedItem._id, 'resolved')}
                                                disabled={statusLoading}
                                            >
                                                <CheckCircle2 size={18} /> Commit Resolution
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageComplaints;
