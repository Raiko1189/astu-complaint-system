import React from 'react';
import { InvestSection } from '../components/Sections';

const InvestInEthiopia = () => {
    return (
        <div className="page-wrapper">
            <InvestSection />
            <div style={{ padding: '8rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-4xl)',
                    letterSpacing: 'var(--ls-tight)',
                    marginBottom: '2rem'
                }}>Why Invest?</h2>
                <p style={{
                    fontSize: 'var(--text-lg)',
                    lineHeight: 'var(--lh-relaxed)',
                    color: 'var(--color-text-light)',
                    fontWeight: 300
                }}>
                    With a population of over 120 million and one of the fastest-growing economies in Africa, Ethiopia offers massive potential for investors in tourism, agriculture, and manufacturing.
                </p>
            </div>
        </div>
    );
};

export default InvestInEthiopia;
