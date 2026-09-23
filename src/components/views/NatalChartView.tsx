import React, { useState, useEffect } from 'react';
import { NatalChartData, PlanetPlacement } from '../../types/astrology';
import { calculateNatalChart } from '../../utils/astrologyCalculator';
import { ZODIAC_SIGNS } from '../../data/zodiacData';
import { Compass, Sparkles, Check, Trash2, ArrowRight } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';

interface NatalChartViewProps {
  natalData: NatalChartData | null;
  onSaveNatalData: (data: NatalChartData | null) => void;
  onConsultOracle: (prompt: string) => void;
}

export const NatalChartView: React.FC<NatalChartViewProps> = ({
  natalData,
  onSaveNatalData,
  onConsultOracle
}) => {
  const [name, setName] = useState(natalData?.name || 'Astra Seeker');
  const [birthDate, setBirthDate] = useState(natalData?.birthDate || '1998-10-24');
  const [birthTime, setBirthTime] = useState(natalData?.birthTime || '14:30');
  const [birthLocation, setBirthLocation] = useState(natalData?.birthLocation || 'San Francisco, CA');
  const [selectedPlacement, setSelectedPlacement] = useState<PlanetPlacement | null>(null);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    if (natalData) {
      setName(natalData.name);
      setBirthDate(natalData.birthDate);
      setBirthTime(natalData.birthTime);
      setBirthLocation(natalData.birthLocation);
    }
  }, [natalData]);

  const currentChart = natalData || calculateNatalChart(name, birthDate, birthTime, birthLocation);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const newChart = calculateNatalChart(name, birthDate, birthTime, birthLocation);
    onSaveNatalData(newChart);
    cosmicAudio.playCrystalChime(1.2);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const handleClear = () => {
    if (window.confirm('Clear saved birth profile from this browser?')) {
      onSaveNatalData(null);
      setName('Astra Seeker');
      setBirthDate('1998-10-24');
      setBirthTime('14:30');
      setBirthLocation('San Francisco, CA');
      setSelectedPlacement(null);
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
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
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
    <div className="view-container chart-view-layout">
      {/* Header Introduction */}
      <div className="view-header-intro">
        <div className="view-tag-pill">
          <Compass size={13} />
          <span>NATAL ARCHITECTURE</span>
        </div>
        <h1 className="view-title">Birth Chart & Placements</h1>
        <p className="view-subtitle">
          Your celestial blueprint at the exact moment and coordinate you entered earthly existence.
        </p>
      </div>

      {/* Birth Coordinates Form */}
      <form onSubmit={handleCalculate} className="chart-form-card">
        <div className="form-inputs-grid">
          <div className="input-field-group">
            <label>YOUR NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya"
              required
            />
          </div>

          <div className="input-field-group">
            <label>BIRTH DATE</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div className="input-field-group">
            <label>EXACT BIRTH TIME</label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
            />
          </div>

          <div className="input-field-group">
            <label>BIRTH CITY & REGION</label>
            <input
              type="text"
              value={birthLocation}
              onChange={(e) => setBirthLocation(e.target.value)}
              placeholder="e.g. Paris, France"
            />
          </div>
        </div>

        <div className="form-footer-bar">
          <div className="preset-shortcuts">
            <span className="preset-label">Explore Preset:</span>
            <button
              type="button"
              className="preset-chip"
              onClick={() => loadPreset('Steve Jobs', '1955-02-24', '19:15', 'San Francisco, CA')}
            >
              Steve Jobs (Pisces)
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => loadPreset('Frida Kahlo', '1907-07-06', '08:30', 'Coyoacan, Mexico')}
            >
              Frida Kahlo (Cancer)
            </button>
          </div>

          <div className="form-action-group">
            {natalData && (
              <button
                type="button"
                className="clear-btn"
                onClick={handleClear}
                title="Clear saved profile"
              >
                <Trash2 size={13} />
                <span>Reset</span>
              </button>
            )}

            {savedFeedback && (
              <span className="saved-indicator">
                <Check size={13} /> Saved in Browser
              </span>
            )}

            <button type="submit" className="save-chart-btn">
              <span>Calculate & Save</span>
              <Sparkles size={14} />
            </button>
          </div>
        </div>
      </form>

      {/* Big Three Summary Cards */}
      <div className="big-three-grid">
        <div className="big-three-card sun">
          <div className="big-three-top">
            <span className="planet-symbol">☉</span>
            <span className="placement-type">SUN SIGN</span>
          </div>
          <h3 className="placement-sign">{currentChart.sunSign}</h3>
          <p className="placement-essence">{ZODIAC_SIGNS[currentChart.sunSign].essence}</p>
        </div>

        <div className="big-three-card moon">
          <div className="big-three-top">
            <span className="planet-symbol">☽</span>
            <span className="placement-type">MOON SIGN</span>
          </div>
          <h3 className="placement-sign">{currentChart.moonSign}</h3>
          <p className="placement-essence">{ZODIAC_SIGNS[currentChart.moonSign].essence}</p>
        </div>

        <div className="big-three-card rising">
          <div className="big-three-top">
            <span className="planet-symbol">↑</span>
            <span className="placement-type">RISING / ASCENDANT</span>
          </div>
          <h3 className="placement-sign">{currentChart.risingSign}</h3>
          <p className="placement-essence">{ZODIAC_SIGNS[currentChart.risingSign].essence}</p>
        </div>
      </div>

      {/* Main Wheel & Placements Breakdown */}
      <div className="chart-visual-layout">
        {/* SVG Natal Wheel */}
        <div className="chart-wheel-container">
          <svg viewBox="0 0 500 500" className="natal-wheel-svg">
            <circle cx={centerX} cy={centerY} r={outerRadius} fill="rgba(8, 6, 16, 0.9)" stroke="rgba(243, 207, 122, 0.3)" strokeWidth="1.5" />
            <circle cx={centerX} cy={centerY} r={zodiacRingInner} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <circle cx={centerX} cy={centerY} r={houseRingInner} fill="none" stroke="rgba(243, 207, 122, 0.15)" strokeWidth="1" />
            <circle cx={centerX} cy={centerY} r={centerRadius} fill="rgba(5, 3, 10, 0.95)" stroke="rgba(243, 207, 122, 0.4)" strokeWidth="1.5" />

            {/* 12 Zodiac Segments */}
            {signsOrder.map((sign, i) => {
              const startAngle = (i * 30 - 90) * (Math.PI / 180);
              const midAngle = (i * 30 + 15 - 90) * (Math.PI / 180);
              const textR = (outerRadius + zodiacRingInner) / 2;
              const textX = centerX + textR * Math.cos(midAngle);
              const textY = centerY + textR * Math.sin(midAngle) + 5;

              const lineX = centerX + outerRadius * Math.cos(startAngle);
              const lineY = centerY + outerRadius * Math.sin(startAngle);
              const innerX = centerX + zodiacRingInner * Math.cos(startAngle);
              const innerY = centerY + zodiacRingInner * Math.sin(startAngle);

              const isSunSign = currentChart.sunSign === sign;
              const isMoonSign = currentChart.moonSign === sign;
              const isRisingSign = currentChart.risingSign === sign;
              const isProminent = isSunSign || isMoonSign || isRisingSign;

              return (
                <g key={sign}>
                  <line x1={lineX} y1={lineY} x2={innerX} y2={innerY} stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    fill={isProminent ? '#f3cf7a' : 'rgba(255, 255, 255, 0.45)'}
                    fontSize={isProminent ? "15" : "13"}
                    fontWeight={isProminent ? "bold" : "normal"}
                  >
                    {ZODIAC_SIGNS[sign as keyof typeof ZODIAC_SIGNS].symbol}
                  </text>
                </g>
              );
            })}

            {/* 12 House Cusps & Radians */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x1 = centerX + houseRingInner * Math.cos(angle);
              const y1 = centerY + houseRingInner * Math.sin(angle);
              const x2 = centerX + centerRadius * Math.cos(angle);
              const y2 = centerY + centerRadius * Math.sin(angle);

              const midAngle = (i * 30 + 15 - 90) * (Math.PI / 180);
              const numR = (houseRingInner + centerRadius) / 2;
              const numX = centerX + numR * Math.cos(midAngle);
              const numY = centerY + numR * Math.sin(midAngle) + 4;

              return (
                <g key={`house-${i}`}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
                  <text x={numX} y={numY} textAnchor="middle" fill="rgba(255, 255, 255, 0.3)" fontSize="9" fontFamily="var(--font-mono)">
                    {i + 1}
                  </text>
                </g>
              );
            })}

            {/* Planetary Placements plotted onto wheel */}
            {currentChart.placements.map((p) => {
              const signIdx = signsOrder.indexOf(p.sign);
              const degOffset = p.degree || 15;
              const totalAngle = (signIdx * 30 + degOffset - 90) * (Math.PI / 180);
              const pR = (zodiacRingInner + houseRingInner) / 2;
              const pX = centerX + pR * Math.cos(totalAngle);
              const pY = centerY + pR * Math.sin(totalAngle) + 4;

              return (
                <g
                  key={p.planet}
                  className="interactive-planet-glyph"
                  onClick={() => setSelectedPlacement(p)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={pX} cy={pY - 4} r="10" fill="rgba(14, 10, 24, 0.85)" stroke="rgba(243, 207, 122, 0.4)" strokeWidth="1" />
                  <text x={pX} y={pY} textAnchor="middle" fill="#f3cf7a" fontSize="11" fontWeight="bold">
                    {p.symbol}
                  </text>
                </g>
              );
            })}

            {/* Center Core Emblem */}
            <circle cx={centerX} cy={centerY} r="28" fill="rgba(243, 207, 122, 0.08)" stroke="rgba(243, 207, 122, 0.3)" />
            <text x={centerX} y={centerY + 4} textAnchor="middle" fill="#f3cf7a" fontSize="14" fontFamily="var(--font-serif)">
              ✦
            </text>
          </svg>
        </div>

        {/* Placements Explorer List */}
        <div className="placements-list-card">
          <div className="placements-list-header">
            <h3>Planetary Placements</h3>
            <span className="count-tag">10 CELESTIAL BODIES</span>
          </div>

          <div className="placements-scroll-deck">
            {currentChart.placements.map((p) => {
              const isSelected = selectedPlacement?.planet === p.planet;
              return (
                <div
                  key={p.planet}
                  className={`placement-row-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedPlacement(p)}
                >
                  <div className="placement-left-col">
                    <span className="symbol-badge">{p.symbol}</span>
                    <div>
                      <div className="placement-name">{p.planet} in {p.sign}</div>
                      <div className="placement-house">House {p.house} • {p.degree}°</div>
                    </div>
                  </div>

                  <span className="sign-symbol-tag">
                    {ZODIAC_SIGNS[p.sign].symbol}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected Placement Deep Dive Card */}
          {selectedPlacement ? (
            <div className="placement-deep-dive">
              <div className="deep-dive-title">
                <span>{selectedPlacement.symbol} {selectedPlacement.planet} in {selectedPlacement.sign}</span>
                <span className="house-pill">House {selectedPlacement.house}</span>
              </div>
              <p className="deep-dive-text">{selectedPlacement.interpretation}</p>
              <button
                className="ask-oracle-chip"
                onClick={() => onConsultOracle(`Explain how my ${selectedPlacement.planet} in ${selectedPlacement.sign} in the ${selectedPlacement.house}th House influences my subconscious patterns and life purpose.`)}
              >
                <span>Ask Oracle About This Placement</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ) : (
            <button
              className="consult-chart-btn"
              onClick={() => onConsultOracle(`Analyze my Big Three placements: ${currentChart.sunSign} Sun, ${currentChart.moonSign} Moon, and ${currentChart.risingSign} Rising.`)}
            >
              <span>Deeply Analyze My Big 3 with the Oracle</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
