'use client';

import { useState, useEffect } from 'react';
import { MOCK_REGIONS, RegionData } from '@/lib/data';
import Sidebar from '@/components/Sidebar';
import MapWrapper from '@/components/MapWrapper';

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mount dark mode locally or checking from system
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

  return (
    <div className="app-layout" style={{ height: '100vh' }}>
      <Sidebar
        regions={MOCK_REGIONS}
        selectedRegion={selectedRegion}
        onRegionSelect={setSelectedRegion}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
      <div className="map-container flex-1 relative h-full">
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
