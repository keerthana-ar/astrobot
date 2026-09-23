import React from 'react';
import { ActiveTab, AstrologerArchetype, NatalChartData } from '../types/astrology';
import { ASTROLOGER_PROFILES } from '../data/zodiacData';
import { Volume2, VolumeX, Share2, Compass, Orbit, Layers, Heart, MessageSquare } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynth';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentArchetype: AstrologerArchetype;
  onSelectArchetype: (archetype: AstrologerArchetype) => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  onOpenStoryCardModal: () => void;
  natalData?: NatalChartData | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  currentArchetype,
  onSelectArchetype,
  isAudioActive,
  onToggleAudio,
  onOpenStoryCardModal,
  natalData
}) => {
  const archetypes: AstrologerArchetype[] = ['pythia', 'helios', 'nova', 'kavya'];

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'oracle', label: 'Oracle', icon: <MessageSquare size={14} /> },
    { id: 'chart', label: 'Birth Chart', icon: <Compass size={14} /> },
    { id: 'sky', label: "Tonight's Sky", icon: <Orbit size={14} /> },
    { id: 'tarot', label: 'Tarot Deck', icon: <Layers size={14} /> },
    { id: 'synastry', label: 'Compatibility', icon: <Heart size={14} /> },
  ];

  return (
    <header className="sanctuary-header">
      {/* Clean Wordmark (No Box / No Icon) */}
      <div className="sanctuary-brand" onClick={() => onSelectTab('oracle')}>
        <div className="sanctuary-brand-text">
          <span className="brand-name">astra</span>
          <span className="brand-dot">.</span>
        </div>
      </div>

      {/* Center Navigation Tabs */}
      <nav className="sanctuary-nav-tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                onSelectTab(tab.id);
                cosmicAudio.playCrystalChime(1.1);
              }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {isActive && <div className="active-tab-glow" />}
            </button>
          );
        })}
      </nav>

      {/* Right Controls Bar */}
      <div className="sanctuary-right-tools">
        {/* Saved User Profile Pill */}
        {natalData ? (
          <button
            className="user-profile-badge"
            onClick={() => onSelectTab('chart')}
            title={`Your Chart: ${natalData.name} (☉ ${natalData.sunSign} • ☽ ${natalData.moonSign} • ↑ ${natalData.risingSign})`}
          >
            <span className="profile-star">✦</span>
            <span className="profile-name">{natalData.name}</span>
            <span className="profile-signs">
              ☉ {natalData.sunSign} · ☽ {natalData.moonSign}
            </span>
          </button>
        ) : (
          <button
            className="add-chart-hint-btn"
            onClick={() => onSelectTab('chart')}
          >
            <Compass size={13} />
            <span>Add Chart</span>
          </button>
        )}

        {/* Archetype Selector */}
        <div className="archetype-compact-selector">
          {archetypes.map((id) => {
            const profile = ASTROLOGER_PROFILES[id];
            const isCurrent = currentArchetype === id;
            return (
              <button
                key={id}
                className={`archetype-chip ${isCurrent ? 'active' : ''}`}
                onClick={() => {
                  onSelectArchetype(id);
                  cosmicAudio.playCrystalChime(1.15);
                }}
                title={`${profile.name} — ${profile.title}`}
              >
                <span>{profile.avatar}</span>
                <span className="archetype-chip-name">{profile.name}</span>
              </button>
            );
          })}
        </div>

        {/* Social Story Card Generator */}
        <button
          className="util-icon-btn"
          onClick={onOpenStoryCardModal}
          title="Generate Shareable Story Card"
        >
          <Share2 size={16} />
        </button>

        {/* 432Hz Audio Synth Toggle */}
        <button
          className={`util-icon-btn ${isAudioActive ? 'active' : ''}`}
          onClick={onToggleAudio}
          title={isAudioActive ? 'Mute Celestial Soundscape' : 'Play 432Hz Celestial Soundscape'}
        >
          {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </header>
  );
};
