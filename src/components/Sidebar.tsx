'use client';

import { useState } from 'react';
import { RegionData, getSeverityLabel, calculatePriorityScore } from '@/lib/data';
import { X, Search, Filter, Droplets, MapPin, Share2, FileText, ChevronRight, Activity, TrendingUp, Moon, Sun } from 'lucide-react';

interface SidebarProps {
    regions: RegionData[];
    selectedRegion: RegionData | null;
    onRegionSelect: (region: RegionData | null) => void;
    isDarkMode: boolean;
    onToggleTheme: () => void;
}

export default function Sidebar({ regions, selectedRegion, onRegionSelect, isDarkMode, onToggleTheme }: SidebarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'All' | 'Urgent' | 'Cost-Effective'>('All');

    const sortedRegions = [...regions].sort((a, b) => {
        if (activeTab === 'Urgent') {
            return b.water_scarcity_severity_index_0_100 - a.water_scarcity_severity_index_0_100;
        }
        if (activeTab === 'Cost-Effective') {
            return calculatePriorityScore(b) - calculatePriorityScore(a);
        }
        return 0; // default order
    }).filter(r => r.region_name.toLowerCase().includes(searchTerm.toLowerCase()) || r.country.toLowerCase().includes(searchTerm.toLowerCase()));

    // Detail View
    if (selectedRegion) {
        const { label, className } = getSeverityLabel(selectedRegion.water_scarcity_severity_index_0_100);
        const score = calculatePriorityScore(selectedRegion);

        return (
            <div className="sidebar" style={{ gap: '0' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <button
                        className="flex items-center gap-2"
                        style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1rem' }}
                        onClick={() => onRegionSelect(null)}
                    >
                        <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to map
                    </button>
                    <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
                        <span className={`badge ${className}`} style={{ fontSize: '0.875rem', padding: '0.3rem 0.8rem' }}>{label} Priority</span>
                        <div className="flex gap-2">
                            <button
                                className="btn btn-secondary btn-icon"
                                title="Share via URL"
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://sabeel.org/region/${selectedRegion.region_id}`);
                                    alert('Shareable link copied to clipboard!');
                                }}
                            >
                                <Share2 size={16} />
                            </button>
                            <button className="btn btn-secondary btn-icon" title="Download Report">
                                <FileText size={16} />
                            </button>
                        </div>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{selectedRegion.region_name}</h2>
                    <p style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={16} /> {selectedRegion.country}
                    </p>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="panel" style={{ padding: '1.25rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={18} color="var(--primary)" /> Severity Metrics
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Severity Index</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{selectedRegion.water_scarcity_severity_index_0_100}<span style={{ fontSize: '1rem', color: 'var(--muted)' }}>/100</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Smart Score</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{score.toFixed(1)}</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: `${selectedRegion.water_scarcity_severity_index_0_100}%`,
                                backgroundColor: `var(--severity-${label.toLowerCase()})`,
                                transition: 'width 1s ease-in-out'
                            }} />
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.75rem' }}>Demographics & Impact</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li className="flex justify-between items-center" style={{ padding: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                                <span style={{ color: 'var(--secondary-foreground)' }}>Population Affected</span>
                                <span style={{ fontWeight: 600 }}>{selectedRegion.total_population_affected.toLocaleString()}</span>
                            </li>
                            <li className="flex justify-between items-center" style={{ padding: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                                <span style={{ color: 'var(--secondary-foreground)' }}>Density (per km²)</span>
                                <span style={{ fontWeight: 600 }}>{selectedRegion.population_density_per_km2}</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.75rem' }}>Project Details</h3>
                        <div className="panel" style={{ padding: '1.25rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none' }}>
                            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                                <span style={{ opacity: 0.9 }}>Est. Average Cost</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>${selectedRegion.average_project_cost_usd.toLocaleString()}</span>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '0.875rem', opacity: 0.9, display: 'block', marginBottom: '0.25rem' }}>Recommended Intervention</span>
                                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Droplets size={16} /> {selectedRegion.intervention_type}
                                </span>
                            </div>

                            <button
                                className="btn"
                                style={{ width: '100%', backgroundColor: 'white', color: 'var(--primary)', fontWeight: 600 }}
                                onClick={() => alert('Impact Simulator: Opening...')}
                            >
                                Launch Impact Simulator
                            </button>
                        </div>
                    </div>

                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center', marginTop: 'auto', paddingTop: '1rem' }}>
                        Data Source: <a href={selectedRegion.data_source_link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{selectedRegion.data_source_name}</a><br />
                        Last updated: {new Date(selectedRegion.last_updated_date).toLocaleDateString()}
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="sidebar animate-fade-in" style={{ padding: '1.5rem', gap: '1.5rem' }}>

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="brand" style={{ fontSize: '2rem' }}>
                        <Droplets size={28} color="var(--primary)" fill="var(--primary)" />
                        Sabeel
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Public Water Scarcity Tracker</p>
                </div>
                <button
                    className="btn btn-secondary btn-icon"
                    onClick={onToggleTheme}
                    title="Toggle Theme"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Search by region or country..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem 0.875rem 2.5rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        fontFamily: 'inherit',
                        fontSize: '0.875rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <Search size={18} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            </div>

            <div className="flex gap-2" style={{ borderBottom: '1px solid var(--border)' }}>
                {['All', 'Urgent', 'Cost-Effective'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        style={{
                            padding: '0.75rem 0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: activeTab === tab ? 'var(--primary)' : 'var(--muted)',
                            borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                            flex: 1,
                            transition: 'var(--transition)'
                        }}
                    >
                        {tab === 'Urgent' && <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />}
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex-col gap-3" style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem', margin: '0 -0.5rem', paddingLeft: '0.5rem' }}>
                {sortedRegions.map(region => {
                    const { label, className } = getSeverityLabel(region.water_scarcity_severity_index_0_100);

                    return (
                        <div
                            key={region.region_id}
                            className="panel animate-slide-up"
                            style={{
                                padding: '1rem',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                marginBottom: '0.75rem'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            onClick={() => onRegionSelect(region)}
                        >
                            <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.2, maxWidth: '70%' }}>
                                    {region.region_name}
                                </h3>
                                <span className={`badge ${className}`} style={{ fontSize: '0.7rem' }}>{label}</span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                                <MapPin size={14} /> {region.country}
                            </p>

                            <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Affected</span>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{region.total_population_affected.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Est. Cost</span>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>${(region.average_project_cost_usd / 1000).toFixed(1)}k</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
