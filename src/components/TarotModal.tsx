import React, { useState } from 'react';
import { TarotCard } from '../types/astrology';
import { TAROT_DECK } from '../data/tarotData';
import { X, Sparkles, RefreshCw, Send } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface TarotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCardForReading: (card: TarotCard, isReversed: boolean) => void;
}

export const TarotModal: React.FC<TarotModalProps> = ({
  isOpen,
  onClose,
  onSelectCardForReading
}) => {
  const [currentCard, setCurrentCard] = useState<TarotCard>(TAROT_DECK[0]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDrawCard = () => {
    setIsShuffling(true);
    setIsFlipped(false);
    cosmicAudio.playCardFlip();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * TAROT_DECK.length);
      const reversed = Math.random() < 0.25; // 25% chance of reversed
      setCurrentCard(TAROT_DECK[randomIndex]);
      setIsReversed(reversed);
      setIsFlipped(true);
      setIsShuffling(false);
      cosmicAudio.playCrystalChime(1.2);

      // Celestial gold confetti burst
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FBBF24', '#C084FC', '#38BDF8', '#FFFFFF']
        });
      } catch {
        // ignore
      }
    }, 600);
  };

  const handleSendToChat = () => {
    onSelectCardForReading(currentCard, isReversed);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 650, textAlign: 'center' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={20} color="var(--accent-gold)" />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#ffffff' }}>
            Sacred Tarot Oracle Draw
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>
          Focus on a question in your mind, then tap the card to draw an archetypal oracle transmission.
        </p>

        {/* 3D Interactive Card Stage */}
        <div className="tarot-stage-container">
          <div
            className="tarot-card-flipper"
            onClick={!isShuffling ? (isFlipped ? handleDrawCard : () => setIsFlipped(true)) : undefined}
          >
            <div className={`tarot-card-inner ${isFlipped ? 'flipped' : ''}`}>
              {/* Card Back */}
              <div className="tarot-card-back">
                <div className="tarot-back-pattern">
                  <span style={{ fontSize: '32px' }}>🔮</span>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', letterSpacing: '3px', color: 'var(--accent-gold)' }}>
                    ✦ ASTRA ORACLE ✦
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    TAP TO REVEAL
                  </span>
                </div>
              </div>

              {/* Card Front */}
              <div className={`tarot-card-front ${isReversed ? 'reversed' : ''}`}>
                <div style={{ fontSize: '64px', margin: '14px 0' }}>
                  {currentCard.symbol}
                </div>

                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: '700', color: '#ffffff' }}>
                  {currentCard.name}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: isReversed ? '#F87171' : '#34D399', marginTop: '4px', letterSpacing: '1px' }}>
                  {isReversed ? '✦ REVERSED TRANSIT ✦' : '✦ UPRIGHT ESSENCE ✦'}
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '8px' }}>
                  {currentCard.astrologicalAssociation}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', marginTop: '12px' }}>
                  {currentCard.keywords.map((kw, i) => (
                    <span key={i} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#CBD5E1' }}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Meaning Details (Displayed once flipped) */}
          {isFlipped && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '18px', textAlign: 'left', width: '100%' }}>
              <div style={{ fontSize: '11px', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                ORACLE TRANSMISSION
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '12px' }}>
                {isReversed ? currentCard.reversedMeaning : currentCard.uprightMeaning}
              </p>

              <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: '#C4B5FD', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Sparkles size={16} style={{ flexShrink: 0 }} />
                <span><strong>Cosmic Prescription:</strong> "{currentCard.cosmicAdvice}"</span>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
            <button
              className="followup-chip-btn"
              onClick={handleDrawCard}
              disabled={isShuffling}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px' }}
            >
              <RefreshCw size={14} className={isShuffling ? 'animate-spin' : ''} />
              <span>{isFlipped ? 'Draw Another Card' : 'Draw A Card'}</span>
            </button>

            {isFlipped && (
              <button
                className="followup-chip-btn"
                onClick={handleSendToChat}
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)', color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', border: 'none' }}
              >
                <Send size={14} />
                <span>Ask Oracle to Interpret in Chat</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
