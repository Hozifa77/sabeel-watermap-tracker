'use client';

import Link from 'next/link';
import { MapPin, Users, Droplets, TrendingUp, ArrowRight, Globe, Database, Share2, ChevronDown } from 'lucide-react';
import { MOCK_REGIONS, getSeverityLabel, calculatePriorityScore } from '@/lib/data';
import Footer from '@/components/Footer';

const stats = {
  regions: MOCK_REGIONS.length,
  people: MOCK_REGIONS.reduce((sum, r) => sum + r.total_population_affected, 0),
  avgCost: Math.round(MOCK_REGIONS.reduce((sum, r) => sum + r.average_project_cost_usd, 0) / MOCK_REGIONS.length),
  countries: [...new Set(MOCK_REGIONS.map(r => r.country))].length,
};

const topUrgent = [...MOCK_REGIONS]
  .sort((a, b) => b.water_scarcity_severity_index_0_100 - a.water_scarcity_severity_index_0_100)
  .slice(0, 3);

const dataSources = [
  { name: 'UNICEF', color: '#1CABE2' },
  { name: 'World Bank', color: '#009CA7' },
  { name: 'WHO', color: '#0099CC' },
  { name: 'UN OCHA', color: '#007DC5' },
  { name: 'NASA Earth', color: '#0B3D91' },
  { name: 'UNRWA', color: '#44A0DB' },
];

const steps = [
  {
    icon: Database,
    title: 'Data Ingested',
    description: 'Water scarcity data is automatically collected and normalized from 6+ global open-data sources including UNICEF, WHO, and the World Bank.',
    color: 'var(--primary)',
  },
  {
    icon: Globe,
    title: 'Mapped & Analyzed',
    description: 'Each region is plotted on an interactive map with a color-coded severity scale and smart priority ranking using our open formula.',
    color: 'var(--severity-high)',
  },
  {
    icon: Share2,
    title: 'Share & Act',
    description: 'Anyone can explore, filter, simulate impact, and share specific regions via unique shareable public links — completely free.',
    color: 'var(--severity-low)',
  },
];

export default function LandingPage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-badge animate-fade-in">
            <Droplets size={14} />
            <span>Free Open Data Platform</span>
          </div>
          <h1 className="hero-title animate-slide-up">
            Water Doesn't Reach <span className="hero-highlight">Billions</span>.<br />
            We Map Every Region.
          </h1>
          <p className="hero-subtitle animate-slide-up">
            Sabeel is a free public platform that visualizes global water scarcity regions on an interactive map — helping individuals, NGOs, and governments identify the most critical areas in need of water access projects.
          </p>
          <div className="flex gap-4 flex-wrap justify-center animate-slide-up">
            <Link href="/map" className="btn btn-primary btn-lg">
              Explore Water Map <ArrowRight size={18} />
            </Link>
            <Link href="/map?tab=urgent" className="btn btn-secondary btn-lg">
              View Most Critical Areas
            </Link>
          </div>
          <a href="#stats" className="scroll-hint">
            <ChevronDown size={24} />
          </a>
        </div>
        <div className="hero-gradient" />
      </section>

      {/* STATS */}
      <section id="stats" className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: MapPin, value: stats.regions, label: 'Regions Tracked', color: 'var(--primary)' },
              { icon: Users, value: stats.people.toLocaleString(), label: 'People Affected', color: 'var(--severity-critical)' },
              { icon: Globe, value: stats.countries, label: 'Countries Mapped', color: 'var(--severity-high)' },
              { icon: TrendingUp, value: `$${(stats.avgCost / 1000).toFixed(0)}k`, label: 'Avg. Project Cost', color: 'var(--severity-low)' },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon-wrap" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How Sabeel Works</h2>
            <p className="section-subtitle">Three simple steps from raw data to global impact</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number" style={{ borderColor: step.color, color: step.color }}>
                  {i + 1}
                </div>
                <div className="step-icon-wrap" style={{ backgroundColor: `${step.color}15` }}>
                  <step.icon size={28} color={step.color} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP CRITICAL REGIONS PREVIEW */}
      <section className="regions-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Most Critical Regions Right Now</h2>
            <p className="section-subtitle">Real-time severity rankings updated from open data sources</p>
          </div>
          <div className="regions-grid">
            {topUrgent.map((region, i) => {
              const { label, className } = getSeverityLabel(region.water_scarcity_severity_index_0_100);
              const score = calculatePriorityScore(region);
              return (
                <div key={region.region_id} className="region-preview-card">
                  <div className="region-rank">#{i + 1}</div>
                  <div className="flex justify-between items-start" style={{ marginBottom: '0.75rem' }}>
                    <div>
                      <h3 className="region-name">{region.region_name}</h3>
                      <p className="region-country"><MapPin size={13} />{region.country}</p>
                    </div>
                    <span className={`badge ${className}`}>{label}</span>
                  </div>
                  <div className="severity-bar-wrap">
                    <div
                      className="severity-bar-fill"
                      style={{
                        width: `${region.water_scarcity_severity_index_0_100}%`,
                        backgroundColor: `var(--severity-${label.toLowerCase()})`,
                      }}
                    />
                  </div>
                  <div className="region-stats-row">
                    <div>
                      <span className="stat-mini-label">Affected</span>
                      <span className="stat-mini-val">{(region.total_population_affected / 1000).toFixed(0)}k</span>
                    </div>
                    <div>
                      <span className="stat-mini-label">Est. Cost</span>
                      <span className="stat-mini-val">${(region.average_project_cost_usd / 1000).toFixed(0)}k</span>
                    </div>
                    <div>
                      <span className="stat-mini-label">Priority</span>
                      <span className="stat-mini-val">{score.toFixed(1)}</span>
                    </div>
                  </div>
                  <Link href={`/map?region=${region.region_id}`} className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
                    View on Map <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link href="/map" className="btn btn-primary btn-lg">
              Explore All Regions <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* DATA SOURCES */}
      <section className="sources-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powered by Global Open Data</h2>
            <p className="section-subtitle">We normalize and integrate data from the world's most trusted humanitarian databases</p>
          </div>
          <div className="sources-grid">
            {dataSources.map((src, i) => (
              <div key={i} className="source-badge" style={{ borderColor: `${src.color}30`, backgroundColor: `${src.color}08` }}>
                <span className="source-dot" style={{ backgroundColor: src.color }} />
                <span className="source-name" style={{ color: src.color }}>{src.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <Droplets size={48} color="white" fill="white" style={{ opacity: 0.8, marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
              Every Drop of Data Counts
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Start exploring the water scarcity map, simulate project impact, and share critical regions with organizations that can help.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/map" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', fontWeight: 600, padding: '0.75rem 2rem' }}>
                Open the Map <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '0.75rem 2rem' }}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
