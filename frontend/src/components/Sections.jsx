import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Globe, Shield, Zap,
    Hotel, Plane, Ticket, CreditCard,
    Briefcase, TrendingUp, Anchor, Coffee
} from 'lucide-react';

export const HeroSection = () => (
    <section id="hero" style={{
        height: '90vh',
        background: 'linear-gradient(rgba(26, 15, 6, 0.5), rgba(26, 15, 6, 0.4)), url("https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop") center/cover no-repeat',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
    }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', padding: '0 2rem' }}>
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    fontSize: 'clamp(3rem, 8vw, var(--text-6xl))',
                    marginBottom: '2rem',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 'var(--lh-tight)',
                    letterSpacing: 'var(--ls-tight)'
                }}
            >
                Discover the Soul of <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Ethiopia</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                    fontSize: 'var(--text-xl)',
                    opacity: 0.95,
                    marginBottom: '3.5rem',
                    fontWeight: 300,
                    letterSpacing: 'var(--ls-wide)'
                }}
            >
                Experience the land of origins, from ancient history to vibrant modern culture.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <a href="#events" style={{
                    background: 'var(--color-gold)',
                    color: 'var(--color-text)',
                    padding: '1.25rem 3.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: 'var(--text-base)',
                    letterSpacing: 'var(--ls-widest)',
                    textTransform: 'uppercase',
                    boxShadow: 'var(--shadow-md)'
                }}>Start Exploring</a>
            </motion.div>
        </div>
    </section>
);

export const DestinationsSection = () => (
    <section id="destinations" style={{ padding: '10rem 2rem', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h2 style={{
                    fontSize: 'var(--text-4xl)',
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: 'var(--ls-tight)'
                }}>Destinations Beyond Imagination</h2>
                <div className="ornament-line" style={{ maxWidth: '200px', margin: '0 auto' }}></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                {[
                    { name: 'Addis Ababa', img: 'https://images.unsplash.com/photo-1756721501583-e24c2864faa6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                    { name: 'Lalibela', img: 'https://i.pinimg.com/736x/85/1c/f1/851cf11b2e484fe5ff75bdb5a69195d0.jpg' },
                    { name: 'Wenchi Resort', img: 'https://i.pinimg.com/736x/07/bb/d7/07bbd7ccd455897e00fdad21ee52a41a.jpg' },
                    { name: 'Bale Forest', img: 'https://i.pinimg.com/1200x/fc/04/59/fc045970c7abfb3141568fc4da87b600.jpg' },
                    { name: 'Axum', img: 'https://i.pinimg.com/736x/4a/b7/06/4ab706e09f12908efdb40ce28c7aad53.jpg' },
                    { name: 'Simien Mountains', img: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072' },
                    { name: 'Sof Omar', img: 'https://i.pinimg.com/736x/fe/a9/5b/fea95b99c92e5f6a42ed0b6aad372d48.jpg' },
                    { name: 'Omo Valley', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1974' },
                    { name: 'Al nejashi Mosque', img: 'https://i.pinimg.com/1200x/b7/99/86/b79986059d79e88d655cadf50d0edeb5.jpg' }

                ].map((dest, idx) => (
                    <motion.div
                        whileHover={{ y: -15 }}
                        key={dest.name}
                        style={{
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-md)',
                            background: 'white',
                            position: 'relative'
                        }}
                    >
                        <div style={{ height: '450px', overflow: 'hidden' }}>
                            <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '2.5rem 1.5rem',
                            background: 'linear-gradient(transparent, rgba(26,15,6,0.9))',
                            color: 'white'
                        }}>
                            <div style={{
                                fontStyle: 'italic',
                                fontSize: 'var(--text-sm)',
                                opacity: 0.8,
                                marginBottom: '0.5rem',
                                letterSpacing: 'var(--ls-widest)',
                                textTransform: 'uppercase'
                            }}>Region 0{idx + 1}</div>
                            <div style={{
                                fontWeight: 700,
                                fontSize: 'var(--text-2xl)',
                                fontFamily: 'var(--font-heading)',
                                letterSpacing: 'var(--ls-tight)'
                            }}>{dest.name}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export const PlanTripSection = () => (
    <section id="plan-trip" style={{ padding: '10rem 2rem', background: 'var(--color-gray-50)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h2 style={{
                    fontSize: 'var(--text-4xl)',
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: 'var(--ls-tight)'
                }}>Plan Your Masterpiece</h2>
                <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto', fontSize: 'var(--text-lg)' }}>Everything you need to craft an unforgettable Ethiopian journey.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
                <PlanCard icon={<Ticket size={40} />} title="Visa Information" desc="Seamless e-visa application to open the gates to an ancient world." />
                <PlanCard icon={<Hotel size={40} />} title="Hotels & Stay" desc="From grand urban luxury to authentic mountain retreats." />
                <PlanCard icon={<Plane size={40} />} title="Travel Guides" desc="Curated experiences led by experts of the Land of Origins." />
            </div>
        </div>
    </section>
);

const PlanCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ boxShadow: 'var(--shadow-float)', y: -5 }}
        style={{
            background: 'white',
            padding: '4rem 3rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'var(--transition-base)',
            border: '1px solid var(--color-border-light)'
        }}
    >
        <div style={{ color: 'var(--color-gold)', marginBottom: '2.5rem' }}>{icon}</div>
        <h3 style={{ marginBottom: '1.25rem', fontSize: 'var(--text-xl)', letterSpacing: 'var(--ls-tight)' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-light)', lineHeight: 'var(--lh-relaxed)', fontSize: 'var(--text-base)' }}>{desc}</p>
    </motion.div>
);

export const ThingsToDoSection = () => (
    <section id="things-to-do" style={{ padding: '8rem 2rem', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
                fontSize: 'var(--text-3xl)',
                textAlign: 'center',
                marginBottom: '5rem',
                fontFamily: 'var(--font-heading)',
                letterSpacing: 'var(--ls-tight)'
            }}>Boundless Experiences</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                <ActivityTag icon={<Coffee />} label="Coffee Ceremonies" />
                <ActivityTag icon={<MapPin />} label="Historic Site Tours" />
                <ActivityTag icon={<Globe />} label="Wild-life Safari" />
                <ActivityTag icon={<Zap />} label="Mountain Hiking" />
                <ActivityTag icon={<Shield />} label="Cultural Festivals" />
            </div>
        </div>
    </section>
);

const ActivityTag = ({ icon, label }) => (
    <motion.div
        whileHover={{ scale: 1.05, background: 'var(--color-primary)', color: 'white' }}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.25rem 2.5rem',
            background: 'var(--color-gray-100)',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            letterSpacing: 'var(--ls-wide)',
            textTransform: 'uppercase',
            transition: 'var(--transition-fast)',
            cursor: 'pointer'
        }}
    >
        <span style={{ color: 'var(--color-gold)' }}>{icon}</span>
        {label}
    </motion.div>
);

export const InvestSection = () => (
    <section id="invest" style={{
        padding: '10rem 2rem',
        background: 'var(--color-primary)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1 }} className="pattern-bg"></div>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{
                fontSize: 'var(--text-5xl)',
                marginBottom: '2.5rem',
                color: 'white',
                fontFamily: 'var(--font-heading)',
                letterSpacing: 'var(--ls-tight)'
            }}>Invest In Ethiopia</h2>
            <p style={{
                fontSize: 'var(--text-xl)',
                opacity: 0.9,
                marginBottom: '4.5rem',
                fontWeight: 300,
                lineHeight: 'var(--lh-relaxed)'
            }}>Explore business opportunities in Africa's fastest-growing economy. From tourism to manufacturing, the potential is limitless.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap' }}>
                <InvestmentStat value="90%" label="Investor Satisfaction" />
                <InvestmentStat value="120M" label="Market Reach" />
            </div>
        </div>
    </section>
);

const InvestmentStat = ({ value, label }) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 'var(--text-5xl)', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-gold)' }}>{value}</div>
        <div style={{ fontSize: 'var(--text-sm)', opacity: 0.6, letterSpacing: 'var(--ls-widest)', textTransform: 'uppercase' }}>{label}</div>
    </div>
);

export const StopoverSection = () => (
    <section id="stopover" style={{ padding: '10rem 2rem', background: 'var(--color-gray-50)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '400px' }}>
                <div style={{ fontStyle: 'italic', color: 'var(--color-gold)', marginBottom: '1.5rem', fontSize: 'var(--text-lg)' }}>Exclusive Program</div>
                <h2 style={{
                    fontSize: 'var(--text-4xl)',
                    marginBottom: '2rem',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: 'var(--ls-tight)'
                }}>Heart of Africa Stopover</h2>
                <p style={{
                    marginBottom: '3rem',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--color-text-light)',
                    lineHeight: 'var(--lh-relaxed)'
                }}>Experience the soul of Ethiopia even if you only have a few hours. We provide seamless transit visas and curated city tours for passengers at Bole International Airport.</p>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <StopoverTag label="8-24 hrs" sub="Transit Duration" />
                    <StopoverTag label="Complimentary" sub="Visa Included*" />
                </div>
            </div>
            <div style={{ flex: 1, minWidth: '400px' }}>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-float)' }}
                >
                    <img src="https://i.pinimg.com/736x/4a/3f/f4/4a3ff49dd1a7f5e3eb5115004c7906a4.jpg" alt="Addis Ababa Experience" style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
                </motion.div>
            </div>
        </div>
    </section>
);

const StopoverTag = ({ label, sub }) => (
    <div>
        <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>{label}</div>
        <div style={{ fontSize: 'var(--text-xs)', opacity: 0.6, textTransform: 'uppercase', letterSpacing: 'var(--ls-wide)' }}>{sub}</div>
    </div>
);
