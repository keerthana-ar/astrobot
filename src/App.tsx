import React, { useState, useEffect } from 'react';
import { ActiveTab, AstrologerArchetype, ChatMessage, NatalChartData, TarotCard } from './types/astrology';
import { ASTROLOGER_PROFILES } from './data/zodiacData';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { Header } from './components/Header';
import { OracleView } from './components/views/OracleView';
import { NatalChartView } from './components/views/NatalChartView';
import { DailySkyView } from './components/views/DailySkyView';
import { TarotSanctuaryView } from './components/views/TarotSanctuaryView';
import { SynastryView } from './components/views/SynastryView';
import { StoryCardModal } from './components/StoryCardModal';
import { generateAstrologerReply } from './utils/chatEngine';
import { cosmicAudio } from './utils/audioSynth';
import {
  loadNatalData,
  saveNatalData,
  loadChatMessages,
  saveChatMessages,
  loadActiveArchetype,
  saveActiveArchetype
} from './utils/storage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('oracle');
  const [activeArchetype, setActiveArchetype] = useState<AstrologerArchetype>(() => {
    return loadActiveArchetype() || 'pythia';
  });
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [isStoryCardModalOpen, setIsStoryCardModalOpen] = useState<boolean>(false);

  // User State loaded from localStorage
  const [natalData, setNatalData] = useState<NatalChartData | null>(() => {
    return loadNatalData();
  });
  const [lastTarotCard, setLastTarotCard] = useState<{ card: TarotCard; isReversed: boolean } | null>(null);

  // Conversation history loaded from localStorage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = loadChatMessages();
    if (saved && saved.length > 0) return saved;
    const initialArch = loadActiveArchetype() || 'pythia';
    return [
      {
        id: 'init-1',
        sender: 'assistant',
        archetype: initialArch,
        text: ASTROLOGER_PROFILES[initialArch].greeting,
        timestamp: new Date(),
        followUps: [
          'Decode the current Moon in Aquarius',
          'Analyze my Big Three placements',
          'Draw a 3D Tarot card for spiritual guidance'
        ]
      }
    ];
  });
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Persist messages whenever they change
  useEffect(() => {
    saveChatMessages(messages);
  }, [messages]);

  // Persist active archetype whenever it changes
  useEffect(() => {
    saveActiveArchetype(activeArchetype);
  }, [activeArchetype]);

  // Persist natal data whenever it changes
  const handleSaveNatalData = (data: NatalChartData | null) => {
    setNatalData(data);
    saveNatalData(data);
  };

  // Audio Toggle
  const handleToggleAudio = () => {
    const newState = cosmicAudio.toggleAmbient();
    setIsAudioActive(newState);
  };

  // Archetype Switch
  const handleSelectArchetype = (newArchetype: AstrologerArchetype) => {
    setActiveArchetype(newArchetype);
    const profile = ASTROLOGER_PROFILES[newArchetype];

    // Greet user with new persona
    const greetingMsg: ChatMessage = {
      id: `switch-${Date.now()}`,
      sender: 'assistant',
      archetype: newArchetype,
      text: profile.greeting,
      timestamp: new Date(),
      followUps: profile.samplePrompts
    };

    setMessages((prev) => [...prev, greetingMsg]);
  };

  // Send Message Logic
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const delay = Math.min(1600, Math.max(600, text.length * 18));

    setTimeout(() => {
      const reply = generateAstrologerReply(text, {
        archetype: activeArchetype,
        natalData,
        lastTarotCard,
        conversationHistory: [...messages, userMsg]
      });

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        archetype: activeArchetype,
        text: reply.text,
        timestamp: new Date(),
        metadata: {
          transitsCited: reply.transitsCited,
          cosmicTip: reply.cosmicTip
        },
        followUps: reply.followUps
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
      cosmicAudio.playCrystalChime(1.15);
    }, delay);
  };

  // Clear Chat
  const handleClearChat = () => {
    const profile = ASTROLOGER_PROFILES[activeArchetype];
    setMessages([
      {
        id: `clear-${Date.now()}`,
        sender: 'assistant',
        archetype: activeArchetype,
        text: profile.greeting,
        timestamp: new Date(),
        followUps: profile.samplePrompts
      }
    ]);
  };

  // Trigger Oracle consultation from any other view
  const handleConsultOracle = (prompt: string) => {
    setActiveTab('oracle');
    handleSendMessage(prompt);
  };

  // Tarot Card Draw trigger
  const handleConsultOracleWithCard = (card: TarotCard, isReversed: boolean) => {
    setLastTarotCard({ card, isReversed });
    setActiveTab('oracle');
    const prompt = `I drew the Tarot card: ${card.name} (${isReversed ? 'Reversed' : 'Upright'}). What is the cosmic and psychological message for me today?`;
    handleSendMessage(prompt);
  };

  return (
    <div className="app-container">
      {/* 60FPS Ambient Starfield Canvas */}
      <StarfieldCanvas />

      {/* Sanctuary Top Navigation Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentArchetype={activeArchetype}
        onSelectArchetype={handleSelectArchetype}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        onOpenStoryCardModal={() => setIsStoryCardModalOpen(true)}
        natalData={natalData}
      />

      {/* Main Spacious View Router */}
      <main className="sanctuary-main-viewport">
        {activeTab === 'oracle' && (
          <OracleView
            messages={messages}
            isTyping={isTyping}
            activeArchetype={activeArchetype}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
            natalData={natalData}
            onNavigateToChart={() => setActiveTab('chart')}
          />
        )}

        {activeTab === 'chart' && (
          <NatalChartView
            natalData={natalData}
            onSaveNatalData={handleSaveNatalData}
            onConsultOracle={handleConsultOracle}
          />
        )}

        {activeTab === 'sky' && (
          <DailySkyView
            onConsultOracle={handleConsultOracle}
          />
        )}

        {activeTab === 'tarot' && (
          <TarotSanctuaryView
            onConsultOracleWithCard={handleConsultOracleWithCard}
          />
        )}

        {activeTab === 'synastry' && (
          <SynastryView
            onConsultOracle={handleConsultOracle}
          />
        )}
      </main>

      {/* Shareable Story Card Modal */}
      <StoryCardModal
        isOpen={isStoryCardModalOpen}
        onClose={() => setIsStoryCardModalOpen(false)}
        natalData={natalData}
        lastTarotCard={lastTarotCard}
      />
    </div>
  );
};
export default App;
