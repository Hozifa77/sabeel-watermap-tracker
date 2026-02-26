'use client';

import { ArrowRight, Droplets, Eye, Database, Shield, Users, Code2 } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const team = [
    { role: 'Founder & Data Lead', name: 'Sabeel Initiative', avatar: '💧' },
    { role: 'Map & GIS Engineer', name: 'Open Source Contributors', avatar: '🗺️' },
    { role: 'Data Partnerships', name: 'UN / WHO / UNICEF APIs', avatar: '🌍' },
];

const techStack = [
    { name: 'Next.js', desc: 'Frontend framework', color: '#000' },
    { name: 'React-Leaflet', desc: 'Interactive map engine', color: '#1CABE2' },
    { name: 'Supabase (PostgreSQL)', desc: 'Database & backend', color: '#3ECF8E' },
    { name: 'Vercel', desc: 'Cloud deployment', color: '#000' },
    { name: 'PostGIS', desc: 'Geo-spatial queries', color: '#336791' },
    { name: 'Node.js / Express', desc: 'API server', color: '#68A063' },
];

export default function AboutPage() {
    return (
        <main>
            {/* PAGE HEADER */}
            <section className="page-header-section">
                <div className="container">
                    <h1 className="page-header-title">About Sabeel</h1>
                    <p className="page-header-subtitle">
                        A free, open-data platform dedicated to mapping and sharing water scarcity data to accelerate humanitarian impact.
                    </p>
                </div>
                <div className="hero-gradient" />
            </section>

            <div className="container page-content">

                {/* MISSION & VISION */}
                <section className="about-section">
                    <div className="about-section-label">
                        <Droplets size={18} color="var(--primary)" />
                        Mission & Vision
                    </div>
                    <h2 className="about-section-title">Water is a Human Right. Data Can Save Lives.</h2>
                    <div className="about-section-grid">
                        <div className="about-card">
                            <h3>Our Mission</h3>
                            <p>Sabeel (سبيل — meaning "a free public wellspring" in Arabic) exists to provide open, transparent, and accessible data about global water scarcity crises. We believe better data leads to faster, smarter humanitarian action.</p>
                        </div>
                        <div className="about-card">
                            <h3>Our Vision</h3>
                            <p>A world where every organization, donor, and volunteer can instantly identify the most critical water access gaps — and act on them with data they can trust and share freely.</p>
                        </div>
                    </div>
                </section>

                {/* WHY IT MATTERS */}
                <section className="about-section">
                    <div className="about-section-label">
                        <Eye size={18} color="var(--severity-high)" />
                        Why Water Data Matters
                    </div>
                    <h2 className="about-section-title">The Scale of the Crisis</h2>
                    <div className="facts-grid">
                        {[
                            { stat: '2.2B', desc: 'People lack safe drinking water worldwide' },
                            { stat: '4.2B', desc: 'People lack safely managed sanitation' },
                            { stat: '785M', desc: 'People lack basic drinking water service' },
                            { stat: '$28B', desc: 'Annual investment gap needed to achieve SDG 6' },
                        ].map((f, i) => (
                            <div key={i} className="fact-card">
                                <span className="fact-stat">{f.stat}</span>
                                <span className="fact-desc">{f.desc}</span>
                            </div>
                        ))}
                    </div>
                    <p className="about-text">
                        Despite the scale of the crisis, water scarcity data remains fragmented, siloed, and inaccessible to many frontline organizations. Sabeel bridges that gap by aggregating, normalizing, and visualizing data from the world's leading humanitarian data sources on a single free platform.
                    </p>
                </section>

                {/* HOW DATA IS COLLECTED */}
                <section className="about-section">
                    <div className="about-section-label">
                        <Database size={18} color="var(--severity-low)" />
                        How Data Is Collected
                    </div>
                    <h2 className="about-section-title">Our Data Pipeline</h2>
                    <div className="pipeline-steps">
                        {[
                            { step: '01', title: 'API Ingestion', desc: 'We connect to public APIs from UNICEF, the World Bank, WHO, UN OCHA, and others via scheduled daily sync jobs.' },
                            { step: '02', title: 'Normalization', desc: 'Raw data is normalized into a unified schema — mapping country codes, coordinates, severity scores, and population figures.' },
                            { step: '03', title: 'GPS Validation', desc: 'All coordinates are validated against known geographic boundaries to ensure map accuracy.' },
                            { step: '04', title: 'Fallback Redundancy', desc: 'If one data source fails or is unavailable, we automatically fall back to the next available source to ensure continuity.' },
                            { step: '05', title: 'Admin Review', desc: 'A human admin can review, flag, or approve new data submissions before they go live on the public map.' },
                        ].map((s, i) => (
                            <div key={i} className="pipeline-step">
                                <div className="pipeline-step-num">{s.step}</div>
                                <div>
                                    <h4 className="pipeline-step-title">{s.title}</h4>
                                    <p className="pipeline-step-desc">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TRANSPARENCY */}
                <section className="about-section">
                    <div className="about-section-label">
                        <Shield size={18} color="var(--primary)" />
                        Data Transparency Policy
                    </div>
                    <h2 className="about-section-title">Open by Design</h2>
                    <div className="transparency-grid">
                        {[
                            'All data is publicly accessible — no login required.',
                            'Every data point links back to its original source.',
                            'Our data normalization formula is fully documented.',
                            'No data is sold, licensed, or behind a paywall.',
                            'Community data submissions are reviewed before publishing.',
                            'All code is open-source on GitHub.',
                        ].map((item, i) => (
                            <div key={i} className="transparency-item">
                                <span className="transparency-check">✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TEAM */}
                <section className="about-section">
                    <div className="about-section-label">
                        <Users size={18} color="var(--severity-medium)" />
                        Team & Background
                    </div>
                    <h2 className="about-section-title">Built by People Who Care</h2>
                    <p className="about-text">Sabeel is an open-source humanitarian initiative. It was built to fill the gap between raw data availability and practical, accessible insight for water access programs globally.</p>
                    <div className="team-grid">
                        {team.map((member, i) => (
                            <div key={i} className="team-card">
                                <div className="team-avatar">{member.avatar}</div>
                                <div className="team-name">{member.name}</div>
                                <div className="team-role">{member.role}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TECH STACK */}
                <section className="about-section">
                    <div className="about-section-label">
                        <Code2 size={18} color="var(--muted)" />
                        Technology Stack
                    </div>
                    <h2 className="about-section-title">Built to Scale</h2>
                    <div className="tech-grid">
                        {techStack.map((tech, i) => (
                            <div key={i} className="tech-card">
                                <div className="tech-dot" style={{ backgroundColor: tech.color }} />
                                <div>
                                    <div className="tech-name">{tech.name}</div>
                                    <div className="tech-desc">{tech.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="about-cta">
                    <Link href="/map" className="btn btn-primary btn-lg">
                        Explore the Map <ArrowRight size={18} />
                    </Link>
                    <Link href="/contact" className="btn btn-secondary btn-lg">
                        Get in Touch
                    </Link>
                </div>

            </div>
            <Footer />
        </main>
    );
}
