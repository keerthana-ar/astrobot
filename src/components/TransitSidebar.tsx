import React from 'react';
import { Orbit, AlertCircle, Compass, Zap, Sparkles, X } from 'lucide-react';
import { CURRENT_MOON_PHASE, ACTIVE_RETROGRADES, DAILY_COSMIC_WEATHER, ACTIVE_TRANSITS } from '../data/transitPresets';

interface TransitSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export const TransitSidebar: React.FC<TransitSidebarProps> = ({
  isOpen,
  onClose,
  onSelectPrompt
}) => {
  return (
    <aside className={`transit-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-title">
          <Orbit size={18} />
          <span>CELESTIAL RADAR</span>
        </div>
        <button className="icon-action-btn" onClick={onClose} style={{ width: 30, height: 30 }}>
          <X size={16} />
        </button>
      </div>

      {/* Moon Phase Widget */}
      <div className="sidebar-card">
        <div className="moon-visual-display">
          <div className="moon-avatar">
            <span>{CURRENT_MOON_PHASE.symbol}</span>
          </div>
          <div>
            <div className="moon-phase-name">{CURRENT_MOON_PHASE.phaseName}</div>
            <div className="moon-phase-sub">Moon in {CURRENT_MOON_PHASE.moonSign}</div>
          </div>
        </div>

        <div className="illumination-bar-container">
          <div
            className="illumination-bar-fill"
            style={{ width: `${CURRENT_MOON_PHASE.illumination}%` }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          <span>Illumination: {CURRENT_MOON_PHASE.illumination}%</span>
          <span>{CURRENT_MOON_PHASE.nextFullMoon}</span>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: '1.5' }}>
          {CURRENT_MOON_PHASE.meaning}
        </p>

        <button
          className="followup-chip-btn"
          style={{ marginTop: '12px', width: '100%', textAlign: 'center' }}
          onClick={() => onSelectPrompt(`How does the ${CURRENT_MOON_PHASE.phaseName} in ${CURRENT_MOON_PHASE.moonSign} affect my personal energy right now?`)}
        >
          Ask about this Moon Phase ✨
        </button>
      </div>

      {/* Daily Cosmic Lucky Index */}
      <div className="sidebar-card">
        <div className="sidebar-panel-title" style={{ marginBottom: '14px', fontSize: '12px' }}>
          <Sparkles size={14} color="var(--accent-gold)" />
          <span>DAILY COSMIC WEATHER</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cosmic Harmony Score</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 'bold', color: '#34d399' }}>
            {DAILY_COSMIC_WEATHER.cosmicScore}/100
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
            <div style={{ color: 'var(--text-dim)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>POWER COLOR</div>
            <div style={{ color: '#ffffff', fontWeight: '600', marginTop: '3px' }}>{DAILY_COSMIC_WEATHER.powerColor}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
            <div style={{ color: 'var(--text-dim)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>POWER STONE</div>
            <div style={{ color: '#ffffff', fontWeight: '600', marginTop: '3px' }}>{DAILY_COSMIC_WEATHER.powerStone}</div>
          </div>
        </div>

        <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          <div style={{ color: 'var(--text-dim)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>PEAK ALIGNMENT HOURS</div>
          <div style={{ color: 'var(--accent-gold)', fontSize: '12px', fontWeight: '600', marginTop: '3px' }}>
            {DAILY_COSMIC_WEATHER.powerHours}
          </div>
        </div>

        <div style={{ marginTop: '12px', padding: '10px 12px', background: 'rgba(239,68,68,0.08)', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.25)', fontSize: '12px', color: '#fca5a5', display: 'flex', gap: '8px' }}>
          <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>{DAILY_COSMIC_WEATHER.cautionTheme}</span>
        </div>
      </div>

      {/* Planetary Retrogrades */}
      <div className="sidebar-card">
        <div className="sidebar-panel-title" style={{ marginBottom: '12px', fontSize: '12px' }}>
          <Zap size={14} color="var(--accent-rose)" />
          <span>RETROGRADE AUDIT</span>
        </div>

        {ACTIVE_RETROGRADES.map((r) => (
          <div key={r.planet} className="retrograde-row">
            <div className="retrograde-planet">
              <span style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>{r.symbol}</span>
              <div>
                <div style={{ fontSize: '13px', color: '#ffffff' }}>{r.planet} in {r.sign}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{r.retrogradePeriod}</div>
              </div>
            </div>
            <span className={`retrograde-badge ${r.isRetrograde ? 'rx' : 'direct'}`}>
              {r.isRetrograde ? 'Rx Retrograde' : 'Direct'}
            </span>
          </div>
        ))}
      </div>

      {/* Active Transits */}
      <div className="sidebar-card">
        <div className="sidebar-panel-title" style={{ marginBottom: '12px', fontSize: '12px' }}>
          <Compass size={14} color="var(--accent-cyan)" />
          <span>MAJOR TRANSITS</span>
        </div>

        {ACTIVE_TRANSITS.map((t) => (
          <div key={t.event} style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', fontSize: '13px', color: '#ffffff' }}>{t.event}</span>
              <span style={{ fontSize: '10px', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>Until {t.activeUntil}</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
              {t.influence}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
};
