import React from 'react';
import { MapPin, Calendar, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const MOCK_EVENTS = [
    {
        id: 1,
        title: "Genna (Ethiopian Christmas)",
        location: "Addis Ababa",
        image: "https://i.pinimg.com/1200x/c3/d9/7f/c3d97f941ad725f07622f16579def834.jpg",
        date: "January 7"
    },
    {
        id: 2,
        title: "Meskel Celebration",
        location: "Addis Ababa",
        image: "https://i.pinimg.com/1200x/5c/03/b1/5c03b140b38a9bee51298341ea747f69.jpg",
        date: "September 27"
    },
    {
        id: 3,
        title: "Irreecha Festival",
        location: "Bishoftu & Addis Ababa",
        image: "https://i.pinimg.com/736x/55/f1/b3/55f1b3b4654a909a65494f4e60ef4079.jpg",
        date: "October (Annual)"
    },
    {
        id: 4,
        title: "EU–Ethiopia Business Forum 2026",
        location: "Addis Ababa",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000",
        date: "02/15/2026"
    }
];

const Events = () => {
    return (
        <div className="home-layout" style={{ background: 'white' }}>
            <div className="filter-bar">
                <div className="filter-item">
                    <MapPin size={20} color="#337ab7" />
                    <input type="text" placeholder="Where are you going?" />
                </div>
                <div className="filter-item">
                    <Calendar size={20} color="#337ab7" />
                    <input type="text" placeholder="Dates" />
                </div>
            </div>

            <div className="content-pane" style={{ height: 'calc(100vh - 180px)' }}>
                <div className="map-pane">
                    <div className="map-placeholder"></div>
                    <div className="map-controls">
                        <button className="map-btn"><Plus size={16} /></button>
                        <button className="map-btn"><Minus size={16} /></button>
                    </div>
                </div>

                <div className="list-pane">
                    <div className="list-header">
                        <h2>Events in Ethiopia</h2>
                        <p>{MOCK_EVENTS.length} events found for your search.</p>
                    </div>
                    <div className="events-grid">
                        {MOCK_EVENTS.map(event => (
                            <div key={event.id} className="event-card">
                                <img src={event.image} alt={event.title} className="event-image" />
                                <div className="event-info">
                                    <h3 className="event-title">{event.title}</h3>
                                    <div className="event-location">
                                        <MapPin size={16} />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="event-date">
                                        <Calendar size={16} />
                                        <span>{event.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
