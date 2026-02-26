import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Briefcase } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.section}>
                    <h3 style={styles.title}>ASTU Smart Complaint</h3>
                    <p style={styles.text}>
                        Elevating administrative excellence through transparency and real-time accountability at Adama Science and Technology University.
                    </p>
                </div>

                <div style={styles.section}>
                    <h4 style={styles.heading}>Resources</h4>
                    <Link to="/" style={styles.link}>System Home</Link>
                    <Link to="/chat" style={styles.link}>AI Policy Assistant</Link>
                    <Link to="/submit-complaint" style={styles.link}>Submit Report</Link>
                </div>

                <div style={styles.section}>
                    <h4 style={styles.heading}>Institutional</h4>
                    <a href="https://astu.edu.et" target="_blank" rel="noreferrer" style={styles.link}>University Site</a>
                    <Link to="/contact" style={styles.link}>Technical Support</Link>
                </div>

                <div style={styles.section}>
                    <h4 style={styles.heading}>Oversight</h4>
                    <Link to="/staff-login" style={styles.adminPortal}>
                        <Briefcase size={14} /> Staff Portal
                    </Link>
                    <Link to="/admin-login" style={styles.adminPortal}>
                        <Shield size={14} /> Admin Access
                    </Link>
                </div>
            </div>

            <div style={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Adama Science and Technology University. Developed by Reiko Wakbeka.</p>
                <p style={{ marginTop: '0.5rem', opacity: 0.6 }}>Internal System — Authorized Access Only</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: 'var(--color-primary-dark)',
        color: 'white',
        padding: '6rem 2rem 3rem 2rem',
        marginTop: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '4rem',
        marginBottom: '6rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
    },
    title: {
        fontSize: '1.5rem',
        fontFamily: 'var(--font-heading)',
        color: 'white',
        letterSpacing: 'var(--ls-tight)'
    },
    heading: {
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: 'var(--color-gold)',
        fontWeight: 800,
        marginBottom: '0.5rem',
    },
    text: {
        fontSize: '0.95rem',
        opacity: 0.6,
        lineHeight: 1.7,
        maxWidth: '300px',
    },
    link: {
        fontSize: '0.95rem',
        opacity: 0.7,
        transition: 'var(--transition)',
        color: 'white'
    },
    adminPortal: {
        fontSize: '0.85rem',
        opacity: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '0.5rem',
        transition: 'var(--transition)',
        color: 'white'
    },
    bottom: {
        maxWidth: '1400px',
        margin: '0 auto',
        paddingTop: '3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        fontSize: '0.85rem',
        opacity: 0.5,
    }
};

export default Footer;
