import React, { useEffect, useRef } from 'react';
import { ChatMessage, AstrologerArchetype } from '../types/astrology';
import { ASTROLOGER_PROFILES } from '../data/zodiacData';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

interface ChatContainerProps {
  messages: ChatMessage[];
  isTyping: boolean;
  activeArchetype: AstrologerArchetype;
  onSelectPrompt: (prompt: string) => void;
  onOpenNatalModal: () => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isTyping,
  activeArchetype,
  onSelectPrompt,
  onOpenNatalModal
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const profile = ASTROLOGER_PROFILES[activeArchetype];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const renderFormattedText = (text: string) => {
    // Basic Markdown bold and list formatting
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Handle bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <React.Fragment key={idx}>
          {formattedParts}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="chat-scroll-area" ref={scrollRef}>
      {/* Welcome Masthead shown if conversation is fresh */}
      {messages.length <= 1 && (
        <div className="welcome-hero-card">
          <div className="welcome-header">
            <div className="archetype-avatar-large">
              <span>{profile.avatar}</span>
            </div>
            <div className="welcome-title-group">
              <h2>{profile.name}</h2>
              <p>✦ {profile.title.toUpperCase()} ✦</p>
            </div>
          </div>

          <p className="welcome-description">
            "{profile.greeting}"
          </p>

          <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              ✦ Oracle Consultations
            </span>
            <button
              className="followup-chip-btn"
              onClick={onOpenNatalModal}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Compass size={13} />
              <span>Natal Placements</span>
            </button>
          </div>

          <div className="quick-prompts-grid">
            {profile.samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                className="quick-prompt-card"
                onClick={() => onSelectPrompt(prompt)}
              >
                <span>{prompt}</span>
                <ArrowRight size={13} style={{ opacity: 0.5, flexShrink: 0, marginLeft: '6px' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Stream */}
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        const msgArchetype = msg.archetype ? ASTROLOGER_PROFILES[msg.archetype] : profile;

        return (
          <div key={msg.id} className={`message-row ${isUser ? 'user' : 'assistant'}`}>
            <div className="message-bubble">
              {!isUser && (
                <div className="message-header-meta">
                  <span style={{ fontSize: '16px' }}>{msgArchetype.avatar}</span>
                  <span className="message-archetype-name">{msgArchetype.name}</span>
                  <span className="message-timestamp">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}

              <div className="message-text">
                {renderFormattedText(msg.text)}
              </div>

              {/* Citations & Chips */}
              {msg.metadata?.transitsCited && msg.metadata.transitsCited.length > 0 && (
                <div className="message-citations">
                  {msg.metadata.transitsCited.map((cite, i) => (
                    <span key={i} className="transit-chip">
                      <span>✦</span>
                      <span>{cite}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Cosmic Tip Box */}
              {msg.metadata?.cosmicTip && (
                <div className="cosmic-tip-box">
                  <Sparkles size={16} style={{ flexShrink: 0 }} />
                  <span>{msg.metadata.cosmicTip}</span>
                </div>
              )}

              {/* Follow-up Question Chips */}
              {msg.followUps && msg.followUps.length > 0 && (
                <div className="message-followups">
                  {msg.followUps.map((f, i) => (
                    <button
                      key={i}
                      className="followup-chip-btn"
                      onClick={() => onSelectPrompt(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Typing Dot Indicator */}
      {isTyping && (
        <div className="message-row assistant">
          <div className="typing-bubble">
            <span style={{ fontSize: '16px', marginRight: '6px' }}>{profile.avatar}</span>
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>
      )}
    </div>
  );
};
