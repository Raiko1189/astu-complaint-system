import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
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
            // Check based on the structure returned by updated login()
            const userRole = res.user ? res.user.role : res.data.user.role;

            if (userRole === 'admin') {
                navigate('/admin');
            } else if (userRole === 'staff') {
                navigate('/manage-complaints');
            } else {
                setError('Access denied. This portal is for administrative staff only.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid admin credentials');
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={styles.card}
            >
                <div style={styles.header}>
                    <div style={styles.iconContainer}>
                        <Shield color="white" size={30} />
                    </div>
                    <h2 style={styles.title}>Admin Portal</h2>
                    <p style={styles.subtitle}>Secure access for system administrators</p>
                </div>

                {error && (
                    <div style={styles.errorBanner}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Admin Email</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={18} style={styles.inputIcon} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@aitopia.com"
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Secure Password</label>
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
                        {loading ? 'Verifying Identity...' : 'Access Admin Panel'}
                    </button>
                </form>

                <div style={styles.footerNote}>
                    <p>Protected by end-to-end JWT encryption</p>
                </div>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--color-text)', // Darker background for admin feel
    },
    backLink: {
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '500',
        opacity: 0.8,
    },
    card: {
        background: 'white',
        width: '100%',
        maxWidth: '480px',
        padding: '3.5rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
    },
    header: { textAlign: 'center', marginBottom: '3rem' },
    iconContainer: {
        width: '64px',
        height: '64px',
        background: 'var(--color-primary)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
        boxShadow: '0 8px 16px rgba(139, 69, 19, 0.2)',
    },
    title: { fontSize: '2.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' },
    subtitle: { color: 'var(--color-text-light)', fontSize: '1rem' },
    errorBanner: {
        background: '#FFF5F5',
        color: '#C53030',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.9rem',
        border: '1px solid #FED7D7',
    },
    form: { display: 'flex', flexDirection: 'column', gap: '1.8rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
    label: { fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em' },
    inputWrapper: { position: 'relative' },
    inputIcon: { position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)', opacity: 0.5 },
    input: {
        width: '100%',
        padding: '1rem 1rem 1rem 3.2rem',
        borderRadius: 'var(--radius-md)',
        border: '2px solid #F1F1F1',
        fontSize: '1rem',
        outline: 'none',
        transition: 'var(--transition)',
        background: '#FAFAFA',
    },
    submitBtn: {
        background: 'var(--color-text)',
        color: 'white',
        padding: '1.2rem',
        borderRadius: 'var(--radius-md)',
        fontWeight: '700',
        fontSize: '1.1rem',
        marginTop: '1rem',
        letterSpacing: '0.02em',
        boxShadow: 'var(--shadow-md)',
    },
    footerNote: {
        marginTop: '2.5rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--color-text-light)',
        opacity: 0.7,
    }
};

export default AdminLogin;
