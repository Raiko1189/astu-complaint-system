import React from 'react';
import { PlanTripSection } from '../components/Sections';

const PlanYourTrip = () => {
    return (
        <div className="page-wrapper">
            <PlanTripSection />
            <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                <h2>Logistics & Support</h2>
                <p style={{ marginTop: '1.5rem' }}>We help you with everything from e-visas to booking the perfect hotel. Our guides are verified professionals dedicated to making your Ethiopian journey seamless.</p>
            </div>
        </div>
    );
};

export default PlanYourTrip;
