'use client';

import dynamic from 'next/dynamic';
import { RegionData } from '@/lib/data';

// Dynamically import MapComponent to prevent SSR issues with Leaflet
const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface)', color: 'var(--muted)' }}>
            Loading Map Data...
        </div>
    ),
});

interface MapWrapperProps {
    regions: RegionData[];
    selectedRegion: RegionData | null;
    onRegionSelect: (region: RegionData) => void;
    isDarkMode: boolean;
}

export default function MapWrapper(props: MapWrapperProps) {
    return <MapComponent {...props} />;
}
