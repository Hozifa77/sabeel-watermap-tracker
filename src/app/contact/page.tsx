'use client';

import { useState } from 'react';
import { Mail, Send, AlertCircle, Database, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/Footer';

type FormType = 'general' | 'data-request' | 'report-issue';

export default function ContactPage() {
    const [formType, setFormType] = useState<FormType>('general');
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setSubmitted(true);
    };

    const formTabs: { key: FormType; label: string; icon: any; desc: string }[] = [
        { key: 'general', label: 'General Contact', icon: Mail, desc: 'Ask questions, share feedback, or connect with the Sabeel team.' },
        { key: 'data-request', label: 'Submit Data', icon: Database, desc: 'Have water scarcity data to share? Submit it here for admin review.' },
        { key: 'report-issue', label: 'Report Issue', icon: AlertCircle, desc: 'Found incorrect data or a bug? Report it so we can fix it.' },
    ];

    const current = formTabs.find(t => t.key === formType)!;

    return (
        <main>
            <section className="page-header-section">
                <div className="container">
                    <h1 className="page-header-title">Contact Sabeel</h1>
                    <p className="page-header-subtitle">
                        Questions, data contributions, or issues — we're here.
                    </p>
                </div>
                <div className="hero-gradient" />
            </section>

            <div className="container page-content">
                <div className="contact-layout">

                    {/* LEFT: Info */}
                    <div className="contact-info-col">
                        <div className="contact-info-card">
                            <Mail size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>Direct Email</h3>
                            <a href="mailto:data@sabeel.org" style={{ color: 'var(--primary)', textDecoration: 'underline', fontSize: '1rem' }}>
                                data@sabeel.org
                            </a>
                            <p style={{ color: 'var(--muted)', marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                We typically respond within 2–3 business days. For data emergencies, mark your subject as <strong>URGENT</strong>.
                            </p>
                        </div>
                        <div className="contact-info-card" style={{ marginTop: '1.5rem' }}>
                            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>What can you reach us about?</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    'Sharing new data from your organization',
                                    'Reporting incorrect or outdated region data',
                                    'Partnerships and data-sharing agreements',
                                    'Media inquiries and press coverage',
                                    'Technical bugs and feature requests',
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '0.5rem', color: 'var(--secondary-foreground)', fontSize: '0.875rem' }}>
                                        <span style={{ color: 'var(--primary)', marginTop: '2px' }}>→</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="contact-form-col">
                        {/* Form type selector */}
                        <div className="form-type-tabs">
                            {formTabs.map(tab => (
                                <button
                                    key={tab.key}
                                    className={`form-type-tab ${formType === tab.key ? 'active' : ''}`}
                                    onClick={() => { setFormType(tab.key); setSubmitted(false); }}
                                >
                                    <tab.icon size={16} />
                                    <span className="hidden-mobile">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="panel contact-form-panel">
                            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.5rem', padding: '0.75rem 1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--primary)' }}>
                                {current.desc}
                            </p>

                            {submitted ? (
                                <div className="flex flex-col items-center justify-center" style={{ padding: '3rem 1rem', textAlign: 'center', gap: '1rem' }}>
                                    <CheckCircle2 size={56} color="var(--severity-low)" />
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Message Sent!</h3>
                                    <p style={{ color: 'var(--muted)' }}>
                                        Thank you for reaching out. We'll review your {formType === 'data-request' ? 'data submission' : formType === 'report-issue' ? 'issue report' : 'message'} and get back to you within 2–3 business days.
                                    </p>
                                    <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', organization: '', message: '' }); }}>
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name <span style={{ color: 'var(--severity-critical)' }}>*</span></label>
                                            <input
                                                id="name"
                                                type="text"
                                                required
                                                placeholder="Your full name"
                                                className="form-input"
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address <span style={{ color: 'var(--severity-critical)' }}>*</span></label>
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                placeholder="your@email.com"
                                                className="form-input"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="org">Organization (Optional)</label>
                                        <input
                                            id="org"
                                            type="text"
                                            placeholder="Your NGO, company, or institution"
                                            className="form-input"
                                            value={form.organization}
                                            onChange={e => setForm({ ...form, organization: e.target.value })}
                                        />
                                    </div>
                                    {formType === 'data-request' && (
                                        <div className="form-group">
                                            <label htmlFor="region">Region / Country</label>
                                            <input id="region" type="text" placeholder="Which region does this data cover?" className="form-input" />
                                        </div>
                                    )}
                                    {formType === 'report-issue' && (
                                        <div className="form-group">
                                            <label htmlFor="region-id">Region ID (if known)</label>
                                            <input id="region-id" type="text" placeholder="e.g. RGN-1001" className="form-input" />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label htmlFor="message">Message <span style={{ color: 'var(--severity-critical)' }}>*</span></label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            placeholder={
                                                formType === 'data-request'
                                                    ? 'Describe the data you have: source, format, coverage...'
                                                    : formType === 'report-issue'
                                                        ? 'Describe the data issue in detail...'
                                                        : 'Your message...'
                                            }
                                            className="form-input"
                                            value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', gap: '0.5rem' }}>
                                        <Send size={18} />
                                        {formType === 'data-request' ? 'Submit Data Request' : formType === 'report-issue' ? 'Report Issue' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
