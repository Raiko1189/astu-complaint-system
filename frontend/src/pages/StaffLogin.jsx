import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const StaffLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await login(email, password);
            const userRole = res.user ? res.user.role : res.data.user.role;

            if (userRole === 'staff') {
                navigate('/manage-complaints');
            } else if (userRole === 'admin') {
                navigate('/admin');
            } else {
                setError('Access denied. This portal is for departmental staff only.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid staff credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container} className="pattern-bg">
            <Link to="/" style={styles.backLink}>
                <ArrowLeft size={18} /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={styles.card}
            >
                <div style={styles.header}>
                    <div style={styles.iconContainer}>
                        <Briefcase color="white" size={30} />
                    </div>
                    <h2 style={styles.title}>Department Portal</h2>
                    <p style={styles.subtitle}>Institutional access for staff members</p>
                </div>

                {error && (
                    <div style={styles.errorBanner}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Staff Email</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={18} style={styles.inputIcon} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="staff@astu.edu.et"
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <Lock size={18} style={styles.inputIcon} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} style={styles.submitBtn}>
                        {loading ? 'Authenticating...' : 'Login to Dashboard'}
                    </button>
                </form>

                <p style={styles.footerNote}>
                    For system-level administration, use the <Link to="/admin-login" style={{ color: 'var(--color-primary)' }}>Admin Portal</Link>
                </p>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--color-bg)',
    },
    backLink: {
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        color: 'var(--color-text)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '500',
    },
    card: {
        background: 'white',
        width: '100%',
        maxWidth: '450px',
        padding: '3rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)',
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    iconContainer: {
        width: '60px',
        height: '60px',
        background: 'var(--color-accent)', // Use gold/accent for staff
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
    },
    title: { fontSize: '1.8rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' },
    subtitle: { color: 'var(--color-text-light)', fontSize: '0.95rem' },
    errorBanner: {
        background: '#FFF5F5',
        color: '#C53030',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.9rem',
        border: '1px solid #FED7D7',
    },
    form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)' },
    inputWrapper: { position: 'relative' },
    inputIcon: { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)', opacity: 0.5 },
    input: {
        width: '100%',
        padding: '0.8rem 1rem 0.8rem 3rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '1rem',
        outline: 'none',
        background: 'var(--color-bg)',
    },
    submitBtn: {
        background: 'var(--color-primary)',
        color: 'white',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        fontWeight: '700',
        fontSize: '1rem',
        marginTop: '1rem',
        border: 'none',
    },
    footerNote: {
        textAlign: 'center',
        marginTop: '2rem',
        color: 'var(--color-text-light)',
        fontSize: '0.85rem'
    }
};

export default StaffLogin;
