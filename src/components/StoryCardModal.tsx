import React, { useState, useEffect } from 'react';
import { NatalChartData, TarotCard } from '../types/astrology';
import { generateStoryCardCanvas, StoryCardType } from '../utils/storyCardGenerator';
import { X, Download, Copy, Share2, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/audioSynth';

interface StoryCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  natalData: NatalChartData | null;
  lastTarotCard: { card: TarotCard; isReversed: boolean } | null;
}

export const StoryCardModal: React.FC<StoryCardModalProps> = ({
  isOpen,
  onClose,
  natalData,
  lastTarotCard
}) => {
  const [cardType, setCardType] = useState<StoryCardType>('daily');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    generateStoryCardCanvas({
      type: cardType,
      natalData: natalData || undefined,
      tarotCard: lastTarotCard?.card,
      isReversed: lastTarotCard?.isReversed
    }).then((url) => {
      if (isMounted) {
        setPreviewUrl(url);
        setIsGenerating(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen, cardType, natalData, lastTarotCard]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement('a');
    link.download = `astra-cosmic-story-${cardType}.png`;
    link.href = previewUrl;
    link.click();
    cosmicAudio.playCrystalChime(1.2);

    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  const handleCopy = async () => {
    if (!previewUrl) return;
    try {
      const res = await fetch(previewUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      cosmicAudio.playCrystalChime(1.3);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: download
      handleDownload();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 750, textAlign: 'center' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
          <Share2 size={20} color="var(--accent-gold)" />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#ffffff' }}>
            Viral Cosmic Story Card Generator
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '18px' }}>
          Generate high-resolution (9:16 Instagram Story) celestial cards to share your cosmic fingerprint with the world.
        </p>

        {/* Card Type Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            className={`archetype-btn ${cardType === 'daily' ? 'active' : ''}`}
            onClick={() => setCardType('daily')}
          >
            <span>🌙 Daily Cosmic Weather</span>
          </button>

          <button
            className={`archetype-btn ${cardType === 'big3' ? 'active' : ''}`}
            onClick={() => setCardType('big3')}
          >
            <span>☉ Big Three Identity</span>
          </button>

          <button
            className={`archetype-btn ${cardType === 'tarot' ? 'active' : ''}`}
            onClick={() => setCardType('tarot')}
          >
            <span>🔮 Sacred Tarot Draw</span>
          </button>
        </div>

        {/* Card Preview */}
        <div style={{ position: 'relative', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'center', minHeight: '380px', alignItems: 'center' }}>
          {isGenerating ? (
            <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles className="animate-spin" size={20} color="var(--accent-gold)" />
              <span>Rendering celestial starlight canvas...</span>
            </div>
          ) : (
            previewUrl && (
              <img
                src={previewUrl}
                alt="Cosmic Story Card"
                className="story-preview-img"
              />
            )
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="followup-chip-btn"
            onClick={handleDownload}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)', color: '#fff', fontWeight: '600', border: 'none' }}
          >
            <Download size={16} />
            <span>Download High-Res PNG (1080x1920)</span>
          </button>

          <button
            className="followup-chip-btn"
            onClick={handleCopy}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px' }}
          >
            {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Image'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
