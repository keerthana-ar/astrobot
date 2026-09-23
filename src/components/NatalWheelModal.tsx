import React, { useState, useEffect } from 'react';
import { NatalChartData, PlanetPlacement } from '../types/astrology';
import { calculateNatalChart } from '../utils/astrologyCalculator';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { X, Sparkles, Info, Compass, Check, Trash2 } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynth';

interface NatalWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  natalData: NatalChartData | null;
  onSaveNatalData: (data: NatalChartData | null) => void;
  onAskAboutChart: (question: string) => void;
}

export const NatalWheelModal: React.FC<NatalWheelModalProps> = ({
  isOpen,
  onClose,
  natalData,
  onSaveNatalData,
  onAskAboutChart
}) => {
  const [name, setName] = useState(natalData?.name || 'Astra Seeker');
  const [birthDate, setBirthDate] = useState(natalData?.birthDate || '1998-10-24');
  const [birthTime, setBirthTime] = useState(natalData?.birthTime || '14:30');
  const [birthLocation, setBirthLocation] = useState(natalData?.birthLocation || 'San Francisco, CA');
  const [selectedPlacement, setSelectedPlacement] = useState<PlanetPlacement | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (natalData) {
      setName(natalData.name);
      setBirthDate(natalData.birthDate);
      setBirthTime(natalData.birthTime);
      setBirthLocation(natalData.birthLocation);
    }
  }, [natalData, isOpen]);

  if (!isOpen) return null;

  const currentChart = natalData || calculateNatalChart(name, birthDate, birthTime, birthLocation);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const newChart = calculateNatalChart(name, birthDate, birthTime, birthLocation);
    onSaveNatalData(newChart);
    cosmicAudio.playCrystalChime(1.2);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClearProfile = () => {
    if (window.confirm('Clear your saved birth profile from this browser?')) {
      onSaveNatalData(null);
      setName('Astra Seeker');
      setBirthDate('1998-10-24');
      setBirthTime('14:30');
      setBirthLocation('San Francisco, CA');
    }
  };

  const loadPreset = (presetName: string, date: string, time: string, city: string) => {
    setName(presetName);
    setBirthDate(date);
    setBirthTime(time);
    setBirthLocation(city);
    const newChart = calculateNatalChart(presetName, date, time, city);
    onSaveNatalData(newChart);
    cosmicAudio.playCrystalChime(1.1);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // SVG Natal Wheel Calculations
  const centerX = 250;
  const centerY = 250;
  const outerRadius = 230;
  const zodiacRingInner = 185;
  const houseRingInner = 135;
  const centerRadius = 80;

  const signsOrder = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 880 }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Compass size={22} color="var(--accent-gold)" />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#ffffff' }}>
            Interactive Natal Chart Wheel
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
          Real-time astronomical ephemeris projection of 12 houses, zodiac bands, planetary degrees, and aspect geometry.
        </p>

        {/* Input Controls & Presets */}
        <form onSubmit={handleCalculate} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '18px', border: '1px solid var(--border-glass)', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '13px', marginTop: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>BIRTH DATE</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '13px', marginTop: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>BIRTH TIME</label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '13px', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>LOCATION</label>
              <input
                type="text"
                value={birthLocation}
                onChange={(e) => setBirthLocation(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '13px', marginTop: '4px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Try Preset:</span>
              <button
                type="button"
                className="followup-chip-btn"
                style={{ padding: '3px 8px', fontSize: '11px' }}
                onClick={() => loadPreset('Steve Jobs', '1955-02-24', '19:15', 'San Francisco, CA')}
              >
                Steve Jobs (Pisces)
              </button>
              <button
                type="button"
                className="followup-chip-btn"
                style={{ padding: '3px 8px', fontSize: '11px' }}
                onClick={() => loadPreset('Frida Kahlo', '1907-07-06', '08:30', 'Coyoacan, Mexico')}
              >
                Frida Kahlo (Cancer)
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {natalData && (
                <button
                  type="button"
                  onClick={handleClearProfile}
                  title="Clear saved profile from localStorage"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-dim)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    padding: '4px 8px'
                  }}
                >
                  <Trash2 size={13} />
                  <span>Clear Profile</span>
                </button>
              )}

              {savedSuccess && (
                <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={13} /> Saved in Browser
                </span>
              )}

              <button
                type="submit"
                className="followup-chip-btn"
                style={{ background: 'var(--accent-violet)', color: '#fff', borderColor: 'var(--accent-violet)' }}
              >
                Calculate & Save Chart ⚡
              </button>
            </div>
          </div>
        </form>

        {/* Natal Chart Visualization & Placement Explorer */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'center' }}>
          {/* Interactive SVG Natal Wheel */}
          <div style={{ position: 'relative', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)', borderRadius: '24px', padding: '10px' }}>
            <svg viewBox="0 0 500 500" className="natal-wheel-svg">
              {/* Outer Golden Border */}
              <circle cx={centerX} cy={centerY} r={outerRadius} fill="none" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="2" />
              <circle cx={centerX} cy={centerY} r={zodiacRingInner} fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              <circle cx={centerX} cy={centerY} r={houseRingInner} fill="rgba(124, 58, 237, 0.04)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              <circle cx={centerX} cy={centerY} r={centerRadius} fill="rgba(6, 4, 12, 0.85)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1.5" />

              {/* 12 Zodiac Sign Wedges */}
              {signsOrder.map((signName, index) => {
                const angle = (index * 30 - 90) * (Math.PI / 180);
                const nextAngle = ((index + 1) * 30 - 90) * (Math.PI / 180);
                const midAngle = (angle + nextAngle) / 2;

                // Radial divider lines
                const x1 = centerX + Math.cos(angle) * zodiacRingInner;
                const y1 = centerY + Math.sin(angle) * zodiacRingInner;
                const x2 = centerX + Math.cos(angle) * outerRadius;
                const y2 = centerY + Math.sin(angle) * outerRadius;

                // Glyph position
                const gx = centerX + Math.cos(midAngle) * ((outerRadius + zodiacRingInner) / 2);
                const gy = centerY + Math.sin(midAngle) * ((outerRadius + zodiacRingInner) / 2);

                const signData = ZODIAC_SIGNS[signName as keyof typeof ZODIAC_SIGNS];

                return (
                  <g key={signName}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
                    <text
                      x={gx}
                      y={gy + 5}
                      textAnchor="middle"
                      fill={signData.color}
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {signData.symbol}
                    </text>
                  </g>
                );
              })}

              {/* 12 House Lines */}
              {Array.from({ length: 12 }).map((_, h) => {
                const angle = (h * 30 - 90) * (Math.PI / 180);
                const x1 = centerX + Math.cos(angle) * centerRadius;
                const y1 = centerY + Math.sin(angle) * centerRadius;
                const x2 = centerX + Math.cos(angle) * houseRingInner;
                const y2 = centerY + Math.sin(angle) * houseRingInner;

                return (
                  <line key={h} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" />
                );
              })}

              {/* Aspect Geometric Lines in Center (Trines, Squares, Sextiles) */}
              <polygon
                points={`
                  ${centerX + Math.cos(0) * (centerRadius - 10)},${centerY + Math.sin(0) * (centerRadius - 10)}
                  ${centerX + Math.cos(2.094) * (centerRadius - 10)},${centerY + Math.sin(2.094) * (centerRadius - 10)}
                  ${centerX + Math.cos(4.188) * (centerRadius - 10)},${centerY + Math.sin(4.188) * (centerRadius - 10)}
                `}
                fill="none"
                stroke="rgba(52, 211, 153, 0.35)"
                strokeWidth="1"
              />
              <polygon
                points={`
                  ${centerX + Math.cos(0.785) * (centerRadius - 12)},${centerY + Math.sin(0.785) * (centerRadius - 12)}
                  ${centerX + Math.cos(2.356) * (centerRadius - 12)},${centerY + Math.sin(2.356) * (centerRadius - 12)}
                  ${centerX + Math.cos(3.926) * (centerRadius - 12)},${centerY + Math.sin(3.926) * (centerRadius - 12)}
                  ${centerX + Math.cos(5.497) * (centerRadius - 12)},${centerY + Math.sin(5.497) * (centerRadius - 12)}
                `}
                fill="none"
                stroke="rgba(244, 63, 94, 0.25)"
                strokeWidth="1"
              />

              {/* Center Core Glyph */}
              <text x={centerX} y={centerY - 8} textAnchor="middle" fill="#A78BFA" fontSize="20" fontWeight="bold">
                ☉ ☽ ↑
              </text>
              <text x={centerX} y={centerY + 14} textAnchor="middle" fill="#CBD5E1" fontSize="11" fontFamily="var(--font-mono)">
                {currentChart.sunSign.toUpperCase()}
              </text>

              {/* Placed Planets */}
              {currentChart.placements.map((p) => {
                const signIdx = signsOrder.indexOf(p.sign);
                const totalDegrees = signIdx * 30 + p.degree;
                const rad = (totalDegrees - 90) * (Math.PI / 180);
                const pr = (houseRingInner + zodiacRingInner) / 2;
                const px = centerX + Math.cos(rad) * pr;
                const py = centerY + Math.sin(rad) * pr;

                const isSelected = selectedPlacement?.planet === p.planet;

                return (
                  <g
                    key={p.planet}
                    className="planet-marker"
                    onClick={() => setSelectedPlacement(p)}
                  >
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? 14 : 11}
                      fill={isSelected ? '#FBBF24' : 'rgba(15, 10, 30, 0.9)'}
                      stroke={isSelected ? '#FFFFFF' : 'rgba(139, 92, 246, 0.8)'}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    <text
                      x={px}
                      y={py + 4}
                      textAnchor="middle"
                      fill={isSelected ? '#000000' : '#FFFFFF'}
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {p.symbol}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Big Three & Selected Planet Inspector */}
          <div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '18px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                PRIMARY NATAL TRIAD (THE BIG THREE)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                <div style={{ background: 'rgba(251, 191, 36, 0.08)', padding: '10px 6px', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>SUN ☉</div>
                  <div style={{ fontWeight: '700', color: '#FBBF24', fontSize: '14px' }}>{currentChart.sunSign}</div>
                </div>
                <div style={{ background: 'rgba(96, 165, 250, 0.08)', padding: '10px 6px', borderRadius: '12px', border: '1px solid rgba(96, 165, 250, 0.2)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>MOON ☽</div>
                  <div style={{ fontWeight: '700', color: '#60A5FA', fontSize: '14px' }}>{currentChart.moonSign}</div>
                </div>
                <div style={{ background: 'rgba(236, 72, 153, 0.08)', padding: '10px 6px', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>RISING ↑</div>
                  <div style={{ fontWeight: '700', color: '#EC4899', fontSize: '14px' }}>{currentChart.risingSign}</div>
                </div>
              </div>
            </div>

            {/* Selected Planet Inspector */}
            <div style={{ background: 'rgba(18, 12, 38, 0.7)', border: '1px solid var(--border-violet)', borderRadius: '18px', padding: '16px', minHeight: '180px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  {selectedPlacement ? 'PLANETARY PLACEMENT INSPECTOR' : 'CLICK ANY PLANET GLYPH ON THE WHEEL'}
                </span>
                {selectedPlacement && (
                  <span style={{ fontSize: '12px', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
                    {selectedPlacement.symbol} {selectedPlacement.planet} in {selectedPlacement.sign} ({selectedPlacement.degree}°)
                  </span>
                )}
              </div>

              {selectedPlacement ? (
                <div>
                  <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: '600', marginBottom: '6px' }}>
                    House {selectedPlacement.house} • {selectedPlacement.isRetrograde ? 'Rx Retrograde' : 'Direct Motion'}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                    {selectedPlacement.interpretation}
                  </p>
                  <button
                    className="followup-chip-btn"
                    onClick={() => {
                      onAskAboutChart(`Can you analyze my ${selectedPlacement.planet} in ${selectedPlacement.sign} in the ${selectedPlacement.house}th House in detail?`);
                      onClose();
                    }}
                  >
                    Ask Oracle about this placement ✨
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-dim)', fontSize: '13px' }}>
                  <Info size={28} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
                  Tap on any celestial glyph (☉ Sun, ☽ Moon, ♀ Venus, ♂ Mars, etc.) on the chart wheel above to unlock its esoteric meaning.
                </div>
              )}
            </div>

            {/* Integrate with Chat CTA */}
            <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
              <button
                className="followup-chip-btn"
                style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)', color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => {
                  onAskAboutChart(`I have calculated my Natal Chart: Sun in ${currentChart.sunSign}, Moon in ${currentChart.moonSign}, and Rising in ${currentChart.risingSign}. Please synthesize my soul blueprint.`);
                  onClose();
                }}
              >
                <Sparkles size={16} />
                <span>Send Chart Blueprint to Oracle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
