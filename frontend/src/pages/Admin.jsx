import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const [documents, setDocuments] = useState([]);
    const [loadingDocs, setLoadingDocs] = useState(true);
    const { token } = useAuth();

    // Fetch documents on mount
    React.useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/upload', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDocuments(res.data.data);
        } catch (error) {
            console.error("Failed to fetch documents", error);
        } finally {
            setLoadingDocs(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus('idle');
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setStatus('loading');
        try {
            await axios.post('http://localhost:5000/api/upload/upload-file', formData, {

                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setStatus('success');
            setMessage(`Successfully integrated "${file.name}" into the knowledge base.`);
            setFile(null);
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.message || 'Knowledge integration failed');
        }
    };

    return (
        <div style={styles.container} className="pattern-bg">
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.iconContainer}>
                        <ShieldCheck color="white" />
                    </div>
                    <h2 style={styles.title}>Intelligence Engine</h2>
                    <p style={styles.subtitle}>Upload institutional documents to expand the AI's understanding of ASTU regulations</p>
                </div>

                <form onSubmit={handleUpload} style={styles.form}>
                    <div
                        style={{
                            ...styles.dropzone,
                            borderColor: file ? 'var(--color-gold)' : 'var(--color-border)',
                            background: file ? 'rgba(212, 175, 55, 0.05)' : 'var(--color-bg)'
                        }}
                        onClick={() => document.getElementById('file-input').click()}
                    >
                        <input
                            id="file-input"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept=".pdf,.doc,.docx,.txt"
                        />

                        <div style={styles.dropzoneContent}>
                            {file ? (
                                <>
                                    <FileText size={48} color="var(--color-gold)" />
                                    <p style={styles.fileName}>{file.name}</p>
                                    <p style={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </>
                            ) : (
                                <>
                                    <Upload size={48} color="var(--color-border)" />
                                    <p style={styles.dropText}>Click or drag document here</p>
                                    <p style={styles.dropHint}>Supports PDF, DOC, and TXT (Max 20MB)</p>
                                </>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!file || status === 'loading'}
                        style={{
                            ...styles.submitBtn,
                            opacity: !file || status === 'loading' ? 0.6 : 1
                        }}
                    >
                        {status === 'loading' ? (
                            <><RefreshCw className="spin" style={{ marginRight: '10px' }} /> Processing Knowledge...</>
                        ) : 'Integrate Document'}
                    </button>
                </form>

                {status === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.successBox}>
                        <CheckCircle size={20} />
                        <span>{message}</span>
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.errorBox}>
                        <AlertCircle size={20} />
                        <span>{message}</span>
                    </motion.div>
                )}
            </div>

            <div style={styles.card}>
                <div style={styles.header}>
                    <h3 style={styles.title}>Knowledge Base</h3>
                    <p style={{ ...styles.subtitle, marginBottom: '2rem' }}>Recently processed knowledge fragments</p>
                </div>

                {loadingDocs ? (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>Loading knowledge base...</p>
                ) : documents.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>No knowledge found in archives.</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>Content Snippet</th>
                                    <th style={styles.th}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc) => (
                                    <tr key={doc._id}>
                                        <td style={{ ...styles.td, fontFamily: 'monospace', color: 'var(--color-gold)' }}>
                                            {doc._id.substring(doc._id.length - 6)}
                                        </td>
                                        <td style={styles.td}>
                                            {doc.content ? doc.content.substring(0, 100) : "No Content"}...
                                        </td>
                                        <td style={styles.td}>
                                            {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <style>{`
        .spin { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

const styles = {
    // ... (Keep existing styles)
    container: {
        minHeight: 'calc(100vh - 84px)',
        display: 'flex',
        flexDirection: 'column', // Changed to column to stack cards
        alignItems: 'center',
        padding: '2rem',
        gap: '2rem', // Space between cards
    },
    card: {
        background: 'white',
        width: '100%',
        maxWidth: '800px', // Detailed table needs width
        padding: '3rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)',
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    iconContainer: {
        width: '50px',
        height: '50px',
        background: 'var(--color-secondary)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
    },
    title: { fontSize: '2rem', marginBottom: '0.5rem' },
    subtitle: { color: 'var(--color-text-light)', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    dropzone: {
        border: '2px dashed',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'var(--transition)',
    },
    dropzoneContent: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    dropText: { fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text)' },
    dropHint: { fontSize: '0.9rem', color: 'var(--color-text-light)' },
    fileName: { fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-gold)' },
    fileSize: { fontSize: '0.8rem', color: 'var(--color-text-light)' },
    submitBtn: {
        background: 'var(--color-gold)',
        color: 'var(--color-text)',
        padding: '1.2rem',
        borderRadius: 'var(--radius-md)',
        fontWeight: '700',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        background: '#F0FDF4',
        color: '#166534',
        borderRadius: 'var(--radius-md)',
        marginTop: '2rem',
        fontSize: '0.95rem',
        border: '1px solid #DCFCE7',
    },
    errorBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        background: '#FEF2F2',
        color: '#991B1B',
        borderRadius: 'var(--radius-md)',
        marginTop: '2rem',
        fontSize: '0.95rem',
        border: '1px solid #FEE2E2',
    },
    // New Table Styles
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '1rem',
    },
    th: {
        textAlign: 'left',
        padding: '1rem',
        borderBottom: '2px solid var(--color-border)',
        color: 'var(--color-text-light)',
        fontWeight: '600',
    },
    td: {
        padding: '1rem',
        borderBottom: '1px solid var(--color-border)',
        color: 'var(--color-text)',
        fontSize: '0.9rem',
    }
};

export default Admin;
