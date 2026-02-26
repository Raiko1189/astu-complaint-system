import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Wifi, MessageSquare, ShieldCheck,
    ArrowRight, ArrowLeft, CloudRain, Hammer,
    CheckCircle2, AlertCircle, FileText, Camera,
    Plus, X, AlertTriangle
} from 'lucide-react';
import './SubmitComplaint.css';

const SubmitComplaint = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryName: '',
    });
    const [selectedFiles, setSelectedFiles] = useState([]);

    const categories = [
        { name: "Emergency", icon: <AlertTriangle size={28} />, desc: "Immediate safety or security threats", image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800" },
        { name: "Dormitory", icon: <Building2 size={24} />, desc: "Residential hall issues", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800" },
        { name: "Internet", icon: <Wifi size={24} />, desc: "Network & connectivity", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800" },
        { name: "Laboratory", icon: <CloudRain size={24} />, desc: "Lab equipment & safety", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
        { name: "Classroom", icon: <MessageSquare size={24} />, desc: "Academic spaces", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800" },
        { name: "Maintenance", icon: <Hammer size={24} />, desc: "General infrastructure", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
    ];

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('categoryName', formData.categoryName);

            selectedFiles.forEach(file => {
                data.append('images', file);
            });

            await axios.post('http://localhost:5000/api/complaints/submit', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Your report has been submitted successfully.');
            setStep(3); // Success state
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred during submission.');
        } finally {
            setLoading(false);
        }
    };

    const stepVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="submit-complaint-container">
            {/* Step Progress */}
            <div className="step-progress-bar">
                {[1, 2, 3].map(num => (
                    <div
                        key={num}
                        className={`step-node ${step === num ? 'active' : ''} ${step > num ? 'completed' : ''}`}
                    >
                        {step > num ? <CheckCircle2 size={18} /> : num}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="step-content-card"
                >
                    {step === 1 && (
                        <div className="step-orchestrator">
                            <div className="step-title-group">
                                <h2>Select Domain</h2>
                                <p>Please select the most appropriate category for your issue.</p>
                            </div>
                            <div className="category-grid">
                                {categories.map(cat => (
                                    <div
                                        key={cat.name}
                                        data-category={cat.name}
                                        className={`category-card-premium ${formData.categoryName === cat.name ? 'selected' : ''}`}
                                        onClick={() => setFormData({ ...formData, categoryName: cat.name })}
                                    >
                                        <div className="category-image-wrapper">
                                            <img src={cat.image} alt={cat.name} />
                                            <div className="category-overlay"></div>
                                        </div>
                                        <div className="category-card-content">
                                            <div className="category-icon-box">{cat.icon}</div>
                                            <div className="category-text">
                                                <h4>{cat.name}</h4>
                                                <p>{cat.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="step-navigation">
                                <div />
                                <button
                                    className="btn-premium-primary"
                                    disabled={!formData.categoryName}
                                    onClick={nextStep}
                                >
                                    Continue <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form-orchestrator">
                            <div className="step-title-group">
                                <h2>Complaint Intelligence</h2>
                                <p>Provide a detailed narrative and supporting evidence for your report.</p>
                            </div>

                            <div className="input-container">
                                <label>Operational Title</label>
                                <input
                                    className="premium-input"
                                    placeholder="Brief summary of the issue..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="input-container">
                                <label>Detailed Description</label>
                                <textarea
                                    className="premium-textarea"
                                    rows="4"
                                    placeholder="Describe the situation in detail..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="evidence-section-v2">
                                <label className="evidence-label">Visual Artifacts (Recommended)</label>
                                <div
                                    className={`evidence-upload-zone ${selectedFiles.length > 0 ? 'has-files' : ''}`}
                                    onClick={() => document.getElementById('file-upload').click()}
                                >
                                    <div className="upload-icon-stack">
                                        <Camera size={32} />
                                        <div className="plus-badge">+</div>
                                    </div>
                                    <div className="upload-text">
                                        <h3>Add Photos</h3>
                                        <p>Click to capture or upload evidence</p>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {selectedFiles.length > 0 && (
                                    <div className="evidence-preview-grid">
                                        {selectedFiles.map((file, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                key={i}
                                                className="preview-card"
                                            >
                                                <img src={URL.createObjectURL(file)} alt="Preview" />
                                                <button
                                                    className="remove-preview"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedFiles(prev => prev.filter((_, idx) => idx !== i));
                                                    }}
                                                >
                                                    <X size={14} />
                                                </button>
                                            </motion.div>
                                        ))}
                                        {selectedFiles.length < 5 && (
                                            <div className="add-more-small" onClick={() => document.getElementById('file-upload').click()}>
                                                <Plus size={20} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="step-navigation">
                                <button className="btn-back" onClick={prevStep}>
                                    <ArrowLeft size={20} /> Back to Domain
                                </button>
                                <button
                                    className="btn-premium-primary"
                                    disabled={!formData.title || !formData.description || loading}
                                    onClick={handleSubmit}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="spinner-xs" />
                                            Submitting...
                                        </div>
                                    ) : (
                                        <>Finalize & Submit Report <ArrowRight size={20} /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="success-state text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 10 }}
                            >
                                {message.includes('success') ? (
                                    <CheckCircle2 size={120} color="var(--color-accent)" />
                                ) : (
                                    <AlertCircle size={120} color="#ef4444" />
                                )}
                            </motion.div>
                            <h2 className="mt-4">{message.includes('success') ? 'Submission Successful' : 'Submission Error'}</h2>
                            <p className="mt-2">{message}</p>
                            <div className="step-navigation center">
                                <button
                                    className="btn-premium-primary"
                                    onClick={() => window.location.href = '/my-complaints'}
                                >
                                    View Tracking Dashboard
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SubmitComplaint;
