'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_REGIONS, RegionData } from '@/lib/data';
import Sidebar from '@/components/Sidebar';
import MapWrapper from '@/components/MapWrapper';

function MapPageContent() {
    const searchParams = useSearchParams();
    const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
            if (prefersDark) document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    useEffect(() => {
        const regionId = searchParams.get('region');
        if (regionId) {
            const found = MOCK_REGIONS.find(r => r.region_id === regionId);
            if (found) setSelectedRegion(found);
        }
    }, [searchParams]);

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const next = !prev;
            if (next) document.documentElement.setAttribute('data-theme', 'dark');
            else document.documentElement.removeAttribute('data-theme');
            return next;
        });
    };

    return (
        <div className="map-page-layout">
            <Sidebar
                regions={MOCK_REGIONS}
                selectedRegion={selectedRegion}
                onRegionSelect={setSelectedRegion}
                isDarkMode={isDarkMode}
                onToggleTheme={toggleTheme}
            />
            <div className="map-page-map">
                <MapWrapper
                    regions={MOCK_REGIONS}
                    selectedRegion={selectedRegion}
                    onRegionSelect={setSelectedRegion}
                    isDarkMode={isDarkMode}
                />
            </div>
        </div>
    );
}

export default function MapPage() {
    return (
        <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)', color: 'var(--muted)' }}>Loading Map...</div>}>
            <MapPageContent />
        </Suspense>
    );
}
