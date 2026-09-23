import React, { useState } from 'react';
import { ZodiacSign } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { calculateSynastry } from '../utils/astrologyCalculator';
import { X, Heart, Sparkles, Flame, ShieldAlert } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynth';

interface SynastryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAboutSynastry: (prompt: string) => void;
}

const ALL_SIGNS: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const SynastryModal: React.FC<SynastryModalProps> = ({
  isOpen,
  onClose,
  onAskAboutSynastry
}) => {
  const [person1Name, setPerson1Name] = useState('You');
  const [person1Sign, setPerson1Sign] = useState<ZodiacSign>('Scorpio');
  const [person2Name, setPerson2Name] = useState('Partner');
  const [person2Sign, setPerson2Sign] = useState<ZodiacSign>('Pisces');

  if (!isOpen) return null;

  const report = calculateSynastry(
    { name: person1Name, sign: person1Sign },
    { name: person2Name, sign: person2Sign }
  );

  const sign1 = ZODIAC_SIGNS[person1Sign];
  const sign2 = ZODIAC_SIGNS[person2Sign];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 840 }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Heart size={22} color="var(--accent-rose)" />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#ffffff' }}>
            Synastry Compatibility Matrix
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
          Compare planetary resonance, elemental chemistry, passion dynamics, and long-term durability between any two signs.
        </p>

        {/* Dual Sign Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {/* Person 1 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '18px', border: '1px solid var(--border-glass)' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>PERSON 1 (NAME & SIGN)</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <input
                type="text"
                value={person1Name}
                onChange={(e) => setPerson1Name(e.target.value)}
                style={{ flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '13px' }}
                placeholder="Name"
              />
              <select
                value={person1Sign}
                onChange={(e) => {
                  setPerson1Sign(e.target.value as ZodiacSign);
                  cosmicAudio.playCrystalChime(1.1);
                }}
                style={{ flex: 1.2, background: 'rgba(20, 14, 40, 0.9)', border: '1px solid var(--border-violet)', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '13px' }}
              >
                {ALL_SIGNS.map(s => (
                  <option key={s} value={s}>{ZODIAC_SIGNS[s].symbol} {s}</option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: sign1.color }}>
              {sign1.element} • {sign1.modality} • Ruled by {sign1.rulingPlanet}
            </div>
          </div>

          {/* Person 2 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '18px', border: '1px solid var(--border-glass)' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>PERSON 2 (NAME & SIGN)</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <input
                type="text"
                value={person2Name}
                onChange={(e) => setPerson2Name(e.target.value)}
                style={{ flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '13px' }}
                placeholder="Partner Name"
              />
              <select
                value={person2Sign}
                onChange={(e) => {
                  setPerson2Sign(e.target.value as ZodiacSign);
                  cosmicAudio.playCrystalChime(1.1);
                }}
                style={{ flex: 1.2, background: 'rgba(20, 14, 40, 0.9)', border: '1px solid var(--border-violet)', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '13px' }}
              >
                {ALL_SIGNS.map(s => (
                  <option key={s} value={s}>{ZODIAC_SIGNS[s].symbol} {s}</option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: sign2.color }}>
              {sign2.element} • {sign2.modality} • Ruled by {sign2.rulingPlanet}
            </div>
          </div>
        </div>

        {/* Compatibility Score Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%)', border: '1px solid var(--border-rose)', borderRadius: '22px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--accent-rose)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
              COSMIC HARMONY INDEX
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: '700', color: '#ffffff', marginTop: '4px' }}>
              {sign1.symbol} {person1Sign} + {sign2.symbol} {person2Sign}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '460px' }}>
              {report.astrologerVerdict}
            </p>
          </div>

          <div style={{ textAlign: 'center', padding: '16px 24px', background: 'rgba(0,0,0,0.4)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: '800', color: '#F43F5E', textShadow: '0 0 20px rgba(244, 63, 94, 0.5)' }}>
              {report.overallCompatibility}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>OVERALL MATCH</div>
          </div>
        </div>

        {/* 4 Category Pillar Progress Bars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'EMOTIONAL DEPTH', score: report.categories.emotional, color: '#60A5FA' },
            { label: 'INTELLECTUAL SPARK', score: report.categories.intellectual, color: '#FBBF24' },
            { label: 'RAW PASSION', score: report.categories.passion, color: '#F43F5E' },
            { label: 'LONG-TERM ANCHOR', score: report.categories.longevity, color: '#34D399' }
          ].map((cat) => (
            <div key={cat.label} style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '16px', border: '1px solid var(--border-glass)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                <span>{cat.label}</span>
                <span style={{ color: cat.color, fontWeight: 'bold' }}>{cat.score}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${cat.score}%`, height: '100%', background: cat.color, borderRadius: '999px' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Elemental Chemistry & Cosmic Friction */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '18px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34D399', fontSize: '12px', fontWeight: 'bold', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
              <Sparkles size={15} />
              <span>COSMIC STRENGTHS</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {report.strengths.map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#34D399' }}>✦</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '18px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F87171', fontSize: '12px', fontWeight: 'bold', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
              <ShieldAlert size={15} />
              <span>POTENTIAL FRICTION ZONES</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {report.cosmicFriction.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#F87171' }}>•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ask in Chat Button */}
        <button
          className="followup-chip-btn"
          style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          onClick={() => {
            onAskAboutSynastry(`Please analyze the relationship dynamic between ${person1Name} (${person1Sign}) and ${person2Name} (${person2Sign}). Their overall compatibility is ${report.overallCompatibility}%. What are their deepest karmic lessons?`);
            onClose();
          }}
        >
          <Flame size={16} />
          <span>Ask Astrologer to Decode This Dynamic in Chat</span>
        </button>
      </div>
    </div>
  );
};
