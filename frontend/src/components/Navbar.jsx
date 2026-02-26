import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, User as UserIcon, Shield,
    Twitter, Facebook, Instagram, Youtube,
    Mail, Phone, ChevronDown, Globe, Search,
    Cpu, Activity, LayoutDashboard, Send, Bot, MapPin
} from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="navbar-wrapper">
            {/* Elite Top System Rail */}
            <div className="top-bar-premium">
                <div className="top-bar-container">
                    <div className="top-bar-left">
                        <div className="system-status">
                            <Activity size={12} className="status-dot" />
                            <span>System Operational: Institutional Grid Alpha</span>
                        </div>
                    </div>
                    <div className="top-bar-right">
                        <div className="contact-info">
                            <Phone size={12} />
                            <span>Intra-Grid: +251 22 111 1234</span>
                        </div>
                        <div className="divider"></div>
                        {user ? (
                            <div className="user-profile-nav">
                                <div className="user-info">
                                    <span className="user-name">{user.email.split('@')[0]}</span>
                                    <span className="user-role">{user.role.toUpperCase()} CORE</span>
                                </div>
                                <button onClick={logout} className="logout-icon-btn" title="Decommission Session">
                                    <LogOut size={14} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/staff-login" className="login-link-premium">
                                <Shield size={12} />
                                <span>Administrative Portal</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Cinematic Main Nav */}
            <nav className="main-nav">
                <div className="main-nav-container">
                    <Link to="/" className="hero-logo">
                        <Cpu size={28} className="logo-icon-pulse" />
                        <div className="logo-stack">
                            <span className="logo-text">ASTU</span>
                            <span className="logo-sub">INTELLIGENCE GRID</span>
                        </div>
                    </Link>

                    <div className="nav-links">
                        <Link to="/" className="nav-item">Interface</Link>

                        {user?.role === 'student' && (
                            <>
                                <Link to="/submit-complaint" className="nav-item">
                                    <Send size={16} /> Submit
                                </Link>
                                <Link to="/my-complaints" className="nav-item">
                                    <LayoutDashboard size={16} /> Portal
                                </Link>
                            </>
                        )}

                        {(user?.role === 'staff' || user?.role === 'admin') && (
                            <>
                                <Link to="/manage-complaints" className="nav-item">
                                    <Shield size={16} /> Ops Center
                                </Link>
                            </>
                        )}

                        {user?.role === 'admin' && (
                            <>
                                <Link to="/analytics" className="nav-item">
                                    <Activity size={16} /> Analytics
                                </Link>
                                <Link to="/admin/map" className="nav-item">
                                    <MapPin size={16} /> Map Config
                                </Link>
                                <Link to="/admin" className="nav-item">
                                    <Cpu size={16} /> Engine
                                </Link>
                            </>
                        )}

                        <Link to="/campus-map" className="nav-item">
                            <MapPin size={16} /> Campus Map
                        </Link>

                        <Link to="/chat" className="nav-item ai-link-glow">
                            <Bot size={16} /> AI Consult
                        </Link>
                    </div>

                    <div className="nav-actions">
                        <button className="search-silk-btn">
                            <Search size={18} />
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
