'use client';

import Link from 'next/link';
import { Droplets, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6" style={{ padding: '3rem 0', borderTop: '1px solid var(--border)' }}>
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link href="/" className="brand" style={{ fontSize: '1.25rem' }}>
                            <Droplets size={20} color="var(--primary)" fill="var(--primary)" />
                            Sabeel
                        </Link>
                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Open access data for water scarcity.</p>
                    </div>
                    <div className="flex gap-6 text-sm text-muted">
                        <Link href="/about" className="footer-link">About</Link>
                        <Link href="/map" className="footer-link">Map</Link>
                        <Link href="/contact" className="footer-link">Contact</Link>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                        Built with <Heart size={14} color="var(--severity-critical)" fill="var(--severity-critical)" /> by <a href="#" target="_blank" rel="noreferrer" className="footer-link" style={{ marginLeft: '4px' }}>Sabeel Team</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
