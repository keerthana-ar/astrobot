import React, { useState } from 'react';
import { TarotCard } from '../../types/astrology';
import { TAROT_DECK } from '../../data/tarotData';
import { Layers, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';

interface TarotSanctuaryViewProps {
  onConsultOracleWithCard: (card: TarotCard, isReversed: boolean) => void;
}

export const TarotSanctuaryView: React.FC<TarotSanctuaryViewProps> = ({
  onConsultOracleWithCard
}) => {
  const [currentCard, setCurrentCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const drawCard = () => {
    setIsDrawing(true);
    setIsFlipped(false);
    cosmicAudio.playCrystalChime(1.1);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * TAROT_DECK.length);
      const chosenCard = TAROT_DECK[randomIndex];
      const reversed = Math.random() < 0.3; // 30% chance of reversal

      setCurrentCard(chosenCard);
      setIsReversed(reversed);
      setIsFlipped(true);
      setIsDrawing(false);
      cosmicAudio.playCrystalChime(1.3);
    }, 600);
  };

  return (
    <div className="view-container tarot-view-layout">
      {/* Header Introduction */}
      <div className="view-header-intro">
        <div className="view-tag-pill">
          <Layers size={13} />
          <span>MAJOR ARCANA ORACLE</span>
        </div>
        <h1 className="view-title">The Tarot Sanctuary</h1>
        <p className="view-subtitle">
          Sacred archetypal mirrors reflecting the current state of your subconscious psyche.
        </p>
      </div>

      <div className="tarot-altar-container">
        {/* The 3D Interactive Card Stage */}
        <div className="tarot-card-stage">
          <div
            className={`tarot-card-3d-wrapper ${isFlipped ? 'flipped' : ''} ${isDrawing ? 'drawing' : ''}`}
            onClick={drawCard}
            title="Click to draw card from deck"
          >
            {/* Back of Card */}
            <div className="tarot-card-face card-back">
              <div className="card-back-frame">
                <div className="card-back-ornament">
                  <span className="back-emblem">✦</span>
                  <p className="back-caption">TAP TO DRAW</p>
                </div>
              </div>
            </div>

            {/* Front of Card */}
            <div className={`tarot-card-face card-front ${isReversed ? 'is-reversed' : ''}`}>
              {currentCard && (
                <div className="card-front-content">
                  <div className="card-top-header">
                    <span className="card-numeral">Card {currentCard.number}</span>
                    <span className="card-ruler-tag">{currentCard.astrologicalAssociation}</span>
                  </div>

                  <div className="card-image-emblem">
                    <span className="card-core-symbol">{currentCard.symbol}</span>
                  </div>

                  <div className="card-title-footer">
                    <h4>{currentCard.name}</h4>
                    <span className="card-orientation-badge">
                      {isReversed ? 'Reversed' : 'Upright'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="draw-action-row">
            <button className="draw-deck-btn" onClick={drawCard} disabled={isDrawing}>
              <RotateCcw size={15} />
              <span>{currentCard ? 'Draw Another Card' : 'Pull Sacred Card'}</span>
            </button>
          </div>
        </div>

        {/* Card Interpretation Panel */}
        <div className="tarot-reading-panel">
          {currentCard ? (
            <div className="reading-content-card">
              <div className="reading-header">
                <div>
                  <span className="card-kicker">Card {currentCard.number} • {currentCard.astrologicalAssociation}</span>
                  <h2 className="reading-card-title">
                    {currentCard.name} <span className="reading-orientation">({isReversed ? 'Reversed' : 'Upright'})</span>
                  </h2>
                </div>

                <span className="element-badge">{currentCard.element} Element</span>
              </div>

              <div className="keywords-chip-row">
                {currentCard.keywords.map((kw, i) => (
                  <span key={i} className="tarot-keyword-chip">
                    {kw}
                  </span>
                ))}
              </div>

              <div className="reading-section">
                <h4 className="section-eyebrow">ESOTERIC TRANSMISSION</h4>
                <p className="reading-body-text">
                  {isReversed ? currentCard.reversedMeaning : currentCard.uprightMeaning}
                </p>
              </div>

              <div className="cosmic-advice-box">
                <Sparkles size={16} className="advice-icon" />
                <div>
                  <div className="advice-label">COSMIC PRESCRIPTION</div>
                  <p className="advice-quote">"{currentCard.cosmicAdvice}"</p>
                </div>
              </div>

              <button
                className="consult-oracle-with-card-btn"
                onClick={() => onConsultOracleWithCard(currentCard, isReversed)}
              >
                <span>Decode this Card with the Oracle</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div className="tarot-empty-state">
              <span className="empty-symbol">✦</span>
              <h3>Draw from the Cosmic Deck</h3>
              <p>Center your mind, formulate an unspoken inquiry, and click the card deck on the left to draw your archetypal mirror.</p>
              <button className="draw-deck-btn" onClick={drawCard}>
                <Sparkles size={15} />
                <span>Begin Oracle Draw</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
