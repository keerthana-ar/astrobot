import React, { useState } from 'react';
import { ZodiacSign } from '../../types/astrology';
import { calculateSynastry } from '../../utils/astrologyCalculator';
import { ZODIAC_SIGNS } from '../../data/zodiacData';
import { Heart, Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';

const ALL_SIGNS: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

interface SynastryViewProps {
  onConsultOracle: (prompt: string) => void;
}

export const SynastryView: React.FC<SynastryViewProps> = ({ onConsultOracle }) => {
  const [signA, setSignA] = useState<ZodiacSign>('Scorpio');
  const [signB, setSignB] = useState<ZodiacSign>('Pisces');

  const report = calculateSynastry(
    { name: 'Person A', sign: signA },
    { name: 'Person B', sign: signB }
  );

  const handleSelectSignA = (sign: ZodiacSign) => {
    setSignA(sign);
    cosmicAudio.playCrystalChime(1.1);
  };

  const handleSelectSignB = (sign: ZodiacSign) => {
    setSignB(sign);
    cosmicAudio.playCrystalChime(1.2);
  };

  return (
    <div className="view-container synastry-view-layout">
      {/* Header Introduction */}
      <div className="view-header-intro">
        <div className="view-tag-pill">
          <Heart size={13} />
          <span>CELESTIAL CHEMISTRY</span>
        </div>
        <h1 className="view-title">Synastry & Compatibility Radar</h1>
        <p className="view-subtitle">
          Interlocking geometric aspects and elemental resonance between two zodiac archetypes.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="synastry-selectors-deck">
        <div className="sign-select-col">
          <label>PERSON A (OR YOUR SUN SIGN)</label>
          <div className="sign-pill-grid">
            {ALL_SIGNS.map((s) => (
              <button
                key={`a-${s}`}
                className={`sign-select-btn ${signA === s ? 'active' : ''}`}
                onClick={() => handleSelectSignA(s)}
              >
                <span>{ZODIAC_SIGNS[s].symbol}</span>
                <span>{s}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="chemistry-connector">
          <div className="connector-heart">
            <Heart size={20} fill="#f3cf7a" color="#f3cf7a" />
          </div>
        </div>

        <div className="sign-select-col">
          <label>PERSON B (PARTNER / CRUSH / FRIEND)</label>
          <div className="sign-pill-grid">
            {ALL_SIGNS.map((s) => (
              <button
                key={`b-${s}`}
                className={`sign-select-btn ${signB === s ? 'active' : ''}`}
                onClick={() => handleSelectSignB(s)}
              >
                <span>{ZODIAC_SIGNS[s].symbol}</span>
                <span>{s}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Synastry Report Card */}
      <div className="synastry-report-card">
        <div className="report-hero-header">
          <div className="signs-match-title">
            <span className="sign-hero">{signA}</span>
            <span className="match-amp">&</span>
            <span className="sign-hero">{signB}</span>
          </div>

          <div className="overall-score-pill">
            <Sparkles size={16} className="score-icon" />
            <span>{report.overallCompatibility}% COSMIC HARMONY</span>
          </div>
        </div>

        {/* 4 Dimension Gauges */}
        <div className="dimension-metrics-grid">
          <div className="dimension-bar-card">
            <div className="dim-header">
              <span>Overall Compatibility</span>
              <span>{report.overallCompatibility}%</span>
            </div>
            <div className="dim-progress-track">
              <div className="dim-progress-fill" style={{ width: `${report.overallCompatibility}%` }} />
            </div>
          </div>

          <div className="dimension-bar-card">
            <div className="dim-header">
              <span>Emotional Resonance</span>
              <span>{report.categories.emotional}%</span>
            </div>
            <div className="dim-progress-track">
              <div className="dim-progress-fill" style={{ width: `${report.categories.emotional}%` }} />
            </div>
          </div>

          <div className="dimension-bar-card">
            <div className="dim-header">
              <span>Intellectual Chemistry</span>
              <span>{report.categories.intellectual}%</span>
            </div>
            <div className="dim-progress-track">
              <div className="dim-progress-fill" style={{ width: `${report.categories.intellectual}%` }} />
            </div>
          </div>

          <div className="dimension-bar-card">
            <div className="dim-header">
              <span>Long-Term Longevity</span>
              <span>{report.categories.longevity}%</span>
            </div>
            <div className="dim-progress-track">
              <div className="dim-progress-fill" style={{ width: `${report.categories.longevity}%` }} />
            </div>
          </div>
        </div>

        {/* Breakdown Narrative */}
        <div className="synastry-narrative-box">
          <h4 className="narrative-heading">ELEMENTAL DYNAMICS</h4>
          <p className="narrative-text">{report.elementalChemistry}</p>
        </div>

        <div className="synastry-aspects-grid">
          <div className="aspect-card strengths">
            <div className="aspect-title">
              <ShieldCheck size={16} />
              <span>Cosmic Strengths</span>
            </div>
            <ul>
              {report.strengths.map((st: string, i: number) => (
                <li key={i}>✦ {st}</li>
              ))}
            </ul>
          </div>

          <div className="aspect-card challenges">
            <div className="aspect-title">
              <Flame size={16} />
              <span>Cosmic Friction</span>
            </div>
            <ul>
              {report.cosmicFriction.map((ch: string, i: number) => (
                <li key={i}>✦ {ch}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="consult-synastry-btn"
          onClick={() => onConsultOracle(`Perform a deep dive Synastry compatibility reading between ${signA} and ${signB}. What are our karmic lessons, communication triggers, and highest potential together?`)}
        >
          <span>Ask Oracle to Decode the {signA} & {signB} Bond</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
