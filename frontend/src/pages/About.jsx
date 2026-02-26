import React from 'react';

const About = () => {
    return (
        <div className="page-wrapper" style={{ padding: '10rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-5xl)',
                marginBottom: '3rem',
                letterSpacing: 'var(--ls-tight)'
            }}>About Our System</h1>
            <p style={{
                fontSize: 'var(--text-lg)',
                lineHeight: 'var(--lh-relaxed)',
                color: 'var(--color-text-light)',
                fontWeight: 300
            }}>
                ASTU Smart Complaint is a digital platform designed to streamline issue reporting and resolution within the Adama Science and Technology University campus. Our goal is to ensure students have a clear channel to report dormitory, laboratory, and classroom issues while providing departments with efficient tracking tools.
            </p>
            <div style={{ marginTop: '6rem' }}>
                <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=2070" alt="ASTU Campus" style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
            </div>
        </div>
    );
};

export default About;
