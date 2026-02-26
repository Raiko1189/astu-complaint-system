import React from 'react';
import { ThingsToDoSection } from '../components/Sections';

const ThingsToDo = () => {
    return (
        <div className="page-wrapper">
            <ThingsToDoSection />
            <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h3>Experiences Await</h3>
                <p>Discover the rich cultural heritage of Ethiopia through immersive experiences. Whether you're interested in traditional music, ancient religious ceremonies, or breathtaking natural wonders, Ethiopia has it all.</p>
            </div>
        </div>
    );
};

export default ThingsToDo;
