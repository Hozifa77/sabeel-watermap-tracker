'use client';

import Link from 'next/link';
import { MapPin, Users, Droplets, TrendingUp, ArrowRight, Globe, Database, Share2, ChevronDown, Activity, AlertTriangle } from 'lucide-react';
import { MOCK_REGIONS, getSeverityLabel, calculatePriorityScore } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-background" style={{ padding: '8rem 0 4rem', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, overflow: 'hidden' }}>
          <motion.div
            style={{ y: y1 }}
            className="absolute"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div style={{
              position: 'absolute', top: '10%', left: '-10%', width: '40vw', height: '40vw',
              background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
              opacity: 0.1, filter: 'blur(80px)'
            }} />
            <div style={{
              position: 'absolute', top: '40%', right: '-5%', width: '30vw', height: '30vw',
              background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
              opacity: 0.1, filter: 'blur(60px)'
            }} />
          </motion.div>
        </div>

        <div className="container relative" style={{ zIndex: 1, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-8"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--primary)',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              borderRadius: '2rem',
              border: '1px solid rgba(56, 189, 248, 0.2)'
            }}
          >
            <Droplets size={16} /> Free Open Data Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: 'var(--foreground)',
              letterSpacing: '-0.02em'
            }}
          >
            Water Doesn't Reach <span style={{ color: 'var(--primary)', backgroundImage: 'linear-gradient(135deg, var(--primary), #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Billions</span>.<br />
            We Map Every Region.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{
              fontSize: '1.2rem',
              color: 'var(--muted)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '700px',
              margin: '0 auto 2.5rem'
            }}
          >
            Sabeel is a free public platform that visualizes global water scarcity regions on an interactive map — helping individuals, NGOs, and governments identify the most critical areas in need of water access projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex gap-4 flex-wrap justify-center mb-12"
          >
            <Link href="/map" className="btn btn-primary btn-lg" style={{ padding: '1rem 2rem', fontSize: '1.1rem', boxShadow: '0 8px 20px rgba(56, 189, 248, 0.3)' }}>
              Explore Water Map <ArrowRight size={20} />
            </Link>
            <Link href="/map?tab=urgent" className="btn btn-secondary btn-lg" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              View Critical Areas
            </Link>
          </motion.div>

          <motion.a
            href="#stats"
            style={{ opacity }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="inline-flex justify-center flex-col items-center"
            aria-label="Scroll down"
          >
            <span style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>Scroll to explore</span>
            <ChevronDown size={24} color="var(--muted)" />
          </motion.a>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="stats-section relative z-10" style={{ marginTop: '-4rem' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, value: stats.regions, label: 'Regions Tracked', color: 'var(--primary)' },
              { icon: Users, value: stats.people.toLocaleString(), label: 'People Affected', color: '#ef4444' },
              { icon: Globe, value: stats.countries, label: 'Countries Mapped', color: '#f97316' },
              { icon: TrendingUp, value: `$${(stats.avgCost / 1000).toFixed(0)}k`, label: 'Avg. Project Cost', color: '#10b981' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="panel"
                style={{
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  borderTop: `4px solid ${stat.color}`
                }}
              >
                <div style={{ backgroundColor: `${stat.color}15`, width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <stat.icon size={28} color={stat.color} />
                </div>
                <p style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem', color: 'var(--foreground)' }}>{stat.value}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-surface" style={{ padding: '6rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>How Sabeel Works</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>Three simple steps from raw data to global impact</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[2px]" style={{ background: 'linear-gradient(90deg, var(--primary) 0%, #10b981 100%)', opacity: 0.2 }} />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div style={{
                  position: 'absolute', top: '-1rem', left: '50%', transform: 'translateX(-50%)',
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: 'var(--background)', border: `2px solid ${step.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, color: step.color, zIndex: 10
                }}>
                  {i + 1}
                </div>
                <div style={{ backgroundColor: 'var(--background)', width: '96px', height: '96px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0 1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
                  <step.icon size={40} color={step.color} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP CRITICAL REGIONS PREVIEW */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--foreground)' }}>Most Critical Regions</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="#ef4444" /> Real-time priorities based on severity & density
              </p>
            </div>
            <Link href="/map" className="btn btn-secondary mt-4 md:mt-0">
              View All on Map <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topUrgent.map((region, i) => {
              const { label, className } = getSeverityLabel(region.water_scarcity_severity_index_0_100);
              const score = calculatePriorityScore(region);

              return (
                <motion.div
                  key={region.region_id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="panel hover:border-primary transition-colors"
                  style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{region.region_name}</h3>
                      <p style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                        <MapPin size={14} /> {region.country}
                      </p>
                    </div>
                    <span className={`badge ${className}`}>{label}</span>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div className="flex justify-between text-xs text-muted font-medium uppercase mb-2">
                      <span>Severity</span>
                      <span>{region.water_scarcity_severity_index_0_100}/100</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${region.water_scarcity_severity_index_0_100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{
                          height: '100%',
                          backgroundColor: `var(--severity-${label.toLowerCase()})`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-border">
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Affected</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{(region.total_population_affected / 1000).toFixed(0)}k</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Est. Cost</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>${(region.average_project_cost_usd / 1000).toFixed(0)}k</span>
                    </div>
                  </div>

                  <Link href={`/map?region=${region.region_id}`} className="btn" style={{ width: '100%', marginTop: 'auto', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
                    Analyze Data <ArrowRight size={16} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DATA SOURCES */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>Powered by Global Open Data</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>We normalize and integrate data from the world's most trusted humanitarian databases</p>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {dataSources.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2 px-6 py-3 bg-background border border-border rounded-full hover:border-primary transition-colors cursor-default shadow-sm"
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: src.color }} />
                <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>{src.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, var(--primary), #0284c7)',
              padding: '5rem 2rem',
              boxShadow: '0 20px 40px rgba(14, 165, 233, 0.2)'
            }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10">
              <Droplets size={48} color="white" fill="white" style={{ opacity: 0.9, margin: '0 auto 1.5rem' }} />
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Every Drop of Data Counts
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                Start exploring the water scarcity map, simulate project impact, and share critical regions with organizations that can help.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/map" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', fontWeight: 700, padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '2rem' }}>
                  Open the Map <ArrowRight size={20} />
                </Link>
                <Link href="/about" className="btn" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', fontWeight: 600, padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '2rem' }}>
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
