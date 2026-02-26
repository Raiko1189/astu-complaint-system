import React from 'react';
import { DestinationsSection } from '../components/Sections';

const Destinations = () => {
    return (
        <div className="page-wrapper">
            <DestinationsSection />
            <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>Explore Regions</h3>
                <p>Ethiopia is a land of diverse landscapes and ancient history. From the peaks of the Simien Mountains to the depths of the Danakil Depression, there is something for every traveler.</p>
                {/* More detailed content would go here */}
            </div>
        </div>
    );
};

export default Destinations;
