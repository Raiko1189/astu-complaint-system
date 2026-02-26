import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="page-wrapper" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '2rem' }}>Contact Us</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
                <div style={styles.infoCard}>
                    <Mail color="var(--color-primary)" />
                    <div>
                        <div style={styles.label}>Email</div>
                        <div style={styles.value}>info@mot.gov.et</div>
                    </div>
                </div>
                <div style={styles.infoCard}>
                    <Phone color="var(--color-primary)" />
                    <div>
                        <div style={styles.label}>Phone</div>
                        <div style={styles.value}>+251 (0) 11 668 4572</div>
                    </div>
                </div>
                <div style={styles.infoCard}>
                    <MapPin color="var(--color-primary)" />
                    <div>
                        <div style={styles.label}>Address</div>
                        <div style={styles.value}>Ministry of Tourism, Addis Ababa, Ethiopia</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    infoCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '2rem',
        background: 'white',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)'
    },
    label: { fontSize: '0.9rem', color: 'var(--color-text-light)', fontWeight: 600 },
    value: { fontSize: '1.2rem', fontWeight: 700 }
};

export default Contact;
