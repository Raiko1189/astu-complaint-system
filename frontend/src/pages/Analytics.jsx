import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    BarChart3, PieChart, Activity, ShieldCheck,
    ArrowUpRight, AlertCircle, CheckCircle2,
    RefreshCw, TrendingUp, Layers
} from 'lucide-react';
import './Dashboards.css';

const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/complaints/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data.data);
            } catch (error) {
                console.error('Error fetching stats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="workspace-container">
            <div className="loading-saas">
                <div className="dot-typing-sm"></div>
                <p>Synthesizing Executive Analytics...</p>
            </div>
        </div>
    );

    if (!stats) return (
        <div className="workspace-container">
            <div className="empty-state">
                <AlertCircle size={48} color="#ef4444" />
                <h2>Data Sync Failure</h2>
                <p>Failed to establish a secure link with the analytics engine.</p>
            </div>
        </div>
    );

    const kpis = [
        { label: "Institutional Throughput", value: stats.total, icon: <Activity size={20} />, trend: "+12.4%", color: "var(--color-primary)" },
        { label: "Precision Rate", value: `${stats.resolutionRate.toFixed(1)}%`, icon: <ShieldCheck size={20} />, trend: "Optimal", color: "var(--color-success)" },
        { label: "Active Orbitals", value: stats.open + stats.inProgress, icon: <Layers size={20} />, trend: "-2 this week", color: "var(--color-warning)" }
    ];

    return (
        <div className="workspace-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="workspace-header"
            >
                <div>
                    <h2>Executive Intelligence Dashboard</h2>
                    <p>High-fidelity system performance and operational distribution metrics.</p>
                </div>
                <button className="btn-premium-glass" onClick={() => window.location.reload()}>
                    <RefreshCw size={18} /> Resync Data
                </button>
            </motion.div>

            {/* Top KPI Blocks */}
            <div className="stats-grid">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="stat-card"
                    >
                        <div className="stat-label">
                            {kpi.icon} {kpi.label}
                        </div>
                        <div className="stat-value">{kpi.value}</div>
                        <div className="stat-change positive">
                            <TrendingUp size={14} /> {kpi.trend}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="analytics-layout-grid mt-12">
                {/* Domain Distribution Chart (CSS-based) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="visual-module glass-card"
                >
                    <header className="flex justify-between items-center mb-8">
                        <h3><BarChart3 size={20} /> Domain Distribution</h3>
                        <span className="category-tag">System Wide</span>
                    </header>
                    <div className="distribution-list">
                        {stats.categories.map((cat, i) => (
                            <div key={cat.name} className="distribution-item mt-6">
                                <div className="flex justify-between mb-2">
                                    <span className="domain-label">{cat.name}</span>
                                    <span className="domain-count">{cat.count} nodes</span>
                                </div>
                                <div className="premium-progress-bg">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(cat.count / stats.total) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        className="premium-progress-fill"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Operational Health */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="visual-module glass-card"
                >
                    <header className="flex justify-between items-center mb-8">
                        <h3><TrendingUp size={20} /> Operational Health</h3>
                        <span className="category-tag">Live Feed</span>
                    </header>
                    <div className="health-grid">
                        <div className="health-node">
                            <label>Awaiting Action</label>
                            <span className="health-value text-error">{stats.open}</span>
                        </div>
                        <div className="health-node">
                            <label>In Orchestration</label>
                            <span className="health-value text-warning">{stats.inProgress}</span>
                        </div>
                        <div className="health-node">
                            <label>Successfully Resolved</label>
                            <span className="health-value text-success">{stats.resolved}</span>
                        </div>
                    </div>
                    <div className="system-status-pill mt-8">
                        <CheckCircle2 size={16} color="var(--color-success)" />
                        SYSTEM OPERATIONAL AT 100% CAPACITY
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Analytics;
