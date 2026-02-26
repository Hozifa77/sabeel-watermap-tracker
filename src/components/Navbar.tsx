'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplets, Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
            if (prefersDark) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const nextTheme = !prev;
            if (nextTheme) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            return nextTheme;
        });
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Map', path: '/map' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center h-full">
                <Link href="/" className="brand" onClick={() => setIsMobileMenuOpen(false)}>
                    <Droplets size={24} color="var(--primary)" fill="var(--primary)" />
                    Sabeel
                </Link>

                {/* Desktop Nav */}
                <div className="flex items-center gap-6 hidden-mobile nav-links">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        className="btn btn-secondary btn-icon ml-4"
                        onClick={toggleTheme}
                        title="Toggle Theme"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Nav Toggle */}
                <div className="flex items-center gap-4 hidden-desktop">
                    <button
                        className="btn btn-secondary btn-icon"
                        onClick={toggleTheme}
                        title="Toggle Theme"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        className="btn btn-icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu hidden-desktop animate-slide-up">
                    <div className="flex flex-col p-4 gap-4">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
