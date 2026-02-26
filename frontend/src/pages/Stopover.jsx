import React from 'react';
import { StopoverSection } from '../components/Sections';

const Stopover = () => {
    return (
        <div className="page-wrapper">
            <StopoverSection />
            <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                <h2>Make the most of your transit</h2>
                <p style={{ marginTop: '1.5rem' }}>Ethiopian Airlines and the Ministry of Tourism offer a specialized stopover program for passengers transiting through Addis Ababa. Enjoy a complimentary hotel stay and a city tour if your transit is between 8 and 24 hours.</p>
            </div>
        </div>
    );
};

export default Stopover;
