'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { RegionData, getSeverityLabel } from '@/lib/data';
import { Users, Droplets, Banknote, Share2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const getMarkerIcon = (severity: string) => {
    let color = 'blue';
    if (severity === 'Critical') color = 'red';
    if (severity === 'High') color = 'orange';
    if (severity === 'Medium') color = 'yellow';
    if (severity === 'Low') color = 'green';

    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

interface MapComponentProps {
    regions: RegionData[];
    selectedRegion: RegionData | null;
    onRegionSelect: (region: RegionData) => void;
    isDarkMode: boolean;
}

export default function MapComponent({ regions, selectedRegion, onRegionSelect, isDarkMode }: MapComponentProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div style={{ width: '100%', height: '100%', background: 'var(--surface)' }}></div>;

    const defaultCenter: [number, number] = [20, 40];
    const center: [number, number] = selectedRegion
        ? [selectedRegion.latitude, selectedRegion.longitude]
        : defaultCenter;

    const zoom = selectedRegion ? 8 : 4;

    // Custom tiles based on theme
    const lightTiles = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
    const darkTiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    return (
        <MapContainer
            center={defaultCenter}
            zoom={4}
            style={{ height: '100%', width: '100%', zIndex: 10 }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url={isDarkMode ? darkTiles : lightTiles}
            />
            <MapUpdater center={center} zoom={zoom} />

            <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover={false}
                spiderfyOnMaxZoom={true}
            >
                {regions.map(region => {
                    const { label, className } = getSeverityLabel(region.water_scarcity_severity_index_0_100);

                    return (
                        <Marker
                            key={region.region_id}
                            position={[region.latitude, region.longitude]}
                            icon={getMarkerIcon(label)}
                            eventHandlers={{
                                click: () => onRegionSelect(region),
                            }}
                        >
                            <Popup className="sabeel-popup">
                                <div className="flex flex-col gap-3" style={{ minWidth: '220px', padding: '0.5rem' }}>
                                    <div className="flex justify-between items-center gap-2">
                                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem', color: '#111827' }}>
                                            {region.region_name}
                                        </h3>
                                        <span className={`badge ${className}`}>{label}</span>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <div className="flex items-center gap-2">
                                            <Users size={14} />
                                            <span>{region.total_population_affected.toLocaleString()} affected</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Droplets size={14} />
                                            <span>{region.intervention_type}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Banknote size={14} />
                                            <span>${region.average_project_cost_usd.toLocaleString()} est. cost</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
                                        <button
                                            className="btn btn-primary"
                                            style={{ flex: 1, padding: '0.4rem' }}
                                            onClick={(e) => { e.stopPropagation(); onRegionSelect(region); }}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-icon"
                                            title="Share Region"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert(`Sharing URL: https://sabeel.org/region/${region.region_id}`);
                                            }}
                                        >
                                            <Share2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MarkerClusterGroup>
        </MapContainer>
    );
}
