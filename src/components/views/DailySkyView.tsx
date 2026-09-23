import React from 'react';
import { CURRENT_MOON_PHASE, DAILY_COSMIC_WEATHER, ACTIVE_TRANSITS, ACTIVE_RETROGRADES } from '../../data/transitPresets';
import { Moon, Sparkles, Orbit, Clock, ShieldAlert, ArrowRight } from 'lucide-react';

interface DailySkyViewProps {
  onConsultOracle: (prompt: string) => void;
}

export const DailySkyView: React.FC<DailySkyViewProps> = ({ onConsultOracle }) => {
  return (
    <div className="view-container daily-sky-layout">
      {/* Header Introduction */}
      <div className="view-header-intro">
        <div className="view-tag-pill">
          <Orbit size={13} />
          <span>EPHEMERIS & LUNAR WEATHER</span>
        </div>
        <h1 className="view-title">Tonight's Sky & Transits</h1>
        <p className="view-subtitle">
          Real-time astronomical alignment, lunar illumination, and planetary transits shaping collective consciousness.
        </p>
      </div>

      {/* Moon Phase Hero Banner */}
      <div className="lunar-hero-card">
        <div className="lunar-left-info">
          <div className="lunar-badge">
            <Moon size={14} />
            <span>{CURRENT_MOON_PHASE.phaseName} ({CURRENT_MOON_PHASE.symbol})</span>
          </div>

          <h2 className="lunar-sign-title">Moon in {CURRENT_MOON_PHASE.moonSign}</h2>
          <div className="lunar-metrics">
            <span>Illumination: {CURRENT_MOON_PHASE.illumination}%</span>
            <span>•</span>
            <span>Full Moon: {CURRENT_MOON_PHASE.nextFullMoon}</span>
          </div>

          <p className="lunar-essence-text">
            {CURRENT_MOON_PHASE.meaning}
          </p>

          <button
            className="lunar-action-btn"
            onClick={() => onConsultOracle(`How does the current ${CURRENT_MOON_PHASE.phaseName} Moon in ${CURRENT_MOON_PHASE.moonSign} affect my emotional and spiritual state today?`)}
          >
            <span>Ask Oracle about this Moon Phase</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="lunar-graphic-display">
          <div className="lunar-orb-halo" />
          <div className="lunar-orb">
            <div className="lunar-texture" />
          </div>
        </div>
      </div>

      {/* Cosmic Weather Dashboard Grid */}
      <div className="cosmic-weather-grid">
        <div className="weather-metric-card">
          <div className="metric-header">
            <Sparkles size={16} className="metric-icon" />
            <span className="metric-title">COSMIC HARMONY SCORE</span>
          </div>
          <div className="metric-huge-value">
            {DAILY_COSMIC_WEATHER.cosmicScore}
            <span className="metric-sub">/ 100</span>
          </div>
          <p className="metric-desc">Aspect: {DAILY_COSMIC_WEATHER.rulingPlanetaryAspect}</p>
        </div>

        <div className="weather-metric-card">
          <div className="metric-header">
            <Clock size={16} className="metric-icon" />
            <span className="metric-title">PEAK ALIGNMENT HOURS</span>
          </div>
          <div className="metric-string-value">{DAILY_COSMIC_WEATHER.powerHours}</div>
          <p className="metric-desc">Season: {DAILY_COSMIC_WEATHER.season}</p>
        </div>

        <div className="weather-metric-card">
          <div className="metric-header">
            <Sparkles size={16} className="metric-icon" />
            <span className="metric-title">DAILY TALISMAN STONE</span>
          </div>
          <div className="metric-string-value">{DAILY_COSMIC_WEATHER.powerStone}</div>
          <p className="metric-desc">Resonates with: {DAILY_COSMIC_WEATHER.powerColor}</p>
        </div>
      </div>

      {/* Cosmic Caution Banner */}
      <div className="cosmic-caution-banner">
        <ShieldAlert size={18} className="caution-icon" />
        <div>
          <span className="caution-heading">Cosmic Weather Notice: </span>
          <span className="caution-body">{DAILY_COSMIC_WEATHER.cautionTheme}</span>
        </div>
      </div>

      {/* Active Planetary Transits Section */}
      <div className="active-transits-section">
        <div className="section-title-bar">
          <h3>Active Planetary Transits</h3>
          <span className="section-count">{ACTIVE_TRANSITS.length} KEY INFLUENCES</span>
        </div>

        <div className="transits-deck-grid">
          {ACTIVE_TRANSITS.map((t, idx) => (
            <div
              key={idx}
              className="transit-item-card"
              onClick={() => onConsultOracle(`What does the transit "${t.event}" (${t.influence}) mean for my astrological journey?`)}
            >
              <div className="transit-top-row">
                <span className="transit-planet-badge">{t.event}</span>
                <span className="retrograde-badge">{t.intensity}</span>
              </div>

              <div className="transit-aspect-title">{t.influence}</div>
              <p className="transit-effect-text">{t.guidance}</p>

              <div className="transit-footer">
                <span className="transit-date">Active until {t.activeUntil}</span>
                <span className="ask-transit-link">Ask Oracle →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retrogrades Section */}
      <div className="active-transits-section" style={{ marginTop: '24px' }}>
        <div className="section-title-bar">
          <h3>Retrograde Radar</h3>
          <span className="section-count">{ACTIVE_RETROGRADES.length} MONITORED</span>
        </div>

        <div className="transits-deck-grid">
          {ACTIVE_RETROGRADES.map((r, idx) => (
            <div
              key={idx}
              className="transit-item-card"
              onClick={() => onConsultOracle(`How does ${r.planet} in ${r.sign} (${r.retrogradePeriod}) affect my life right now?`)}
            >
              <div className="transit-top-row">
                <span className="transit-planet-badge">{r.symbol} {r.planet} in {r.sign}</span>
                <span className="retrograde-badge" style={{ background: r.isRetrograde ? 'rgba(244, 114, 182, 0.15)' : 'rgba(52, 211, 153, 0.15)', color: r.isRetrograde ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
                  {r.isRetrograde ? 'Rx Retrograde' : 'Direct'}
                </span>
              </div>

              <div className="transit-aspect-title">{r.retrogradePeriod}</div>
              <p className="transit-effect-text">{r.impactTheme}</p>

              <div className="transit-footer">
                <span className="ask-transit-link">Ask Oracle About This →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
