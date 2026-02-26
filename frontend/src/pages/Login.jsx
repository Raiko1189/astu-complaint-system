import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await login(email, password);
            if (res.data.user.role === 'admin') navigate('/admin');
            else if (res.data.user.role === 'staff') navigate('/manage-complaints');
            else navigate('/chat');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container} className="pattern-bg">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={styles.card}
            >
                <div style={styles.header}>
                    <div style={styles.iconContainer}>
                        <LogIn color="white" />
                    </div>
                    <h2 style={styles.title}>Student Portal</h2>
                    <p style={styles.subtitle}>Secure access for current students</p>
                </div>

                {error && (
                    <div style={styles.errorBanner}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={18} style={styles.inputIcon} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
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
                        {loading ? 'Authenticating...' : 'Login'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            try {
                                setLoading(true);
                                await googleLogin(credentialResponse.credential);
                                navigate('/chat');
                            } catch (err) {
                                console.error("Google login failed", err);
                                setError('Google Login Failed');
                            } finally {
                                setLoading(false);
                            }
                        }}
                        onError={() => {
                            setError('Google Login Failed');
                        }}
                    />
                </div>

                <p style={styles.footer}>
                    Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
                </p>
                <p style={{ ...styles.footer, marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    Staff member? <Link to="/staff-login" style={styles.link}>Access Staff Portal</Link>
                </p>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: 'calc(100vh - 84px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
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
        width: '50px',
        height: '50px',
        background: 'var(--color-primary)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
    },
    title: { fontSize: '1.8rem', marginBottom: '0.5rem' },
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
    inputIcon: { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-border)' },
    input: {
        width: '100%',
        padding: '0.8rem 1rem 0.8rem 3rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'var(--transition)',
    },
    submitBtn: {
        background: 'var(--color-primary)',
        color: 'white',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        fontWeight: '700',
        fontSize: '1rem',
        marginTop: '1rem',
    },
    footer: { textAlign: 'center', marginTop: '2rem', color: 'var(--color-text-light)', fontSize: '0.9rem' },
    link: { color: 'var(--color-accent)', fontWeight: '600' }
};

export default Login;
