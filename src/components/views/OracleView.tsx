import React, { useRef, useEffect, useState } from 'react';
import { AstrologerArchetype, ChatMessage, NatalChartData } from '../../types/astrology';
import { ASTROLOGER_PROFILES } from '../../data/zodiacData';
import { Send, Sparkles, ArrowRight, Trash2 } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';

interface OracleViewProps {
  messages: ChatMessage[];
  isTyping: boolean;
  activeArchetype: AstrologerArchetype;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  natalData: NatalChartData | null;
  onNavigateToChart: () => void;
}

export const OracleView: React.FC<OracleViewProps> = ({
  messages,
  isTyping,
  activeArchetype,
  onSendMessage,
  onClearChat,
  natalData,
  onNavigateToChart
}) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const profile = ASTROLOGER_PROFILES[activeArchetype];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    onSendMessage(input.trim());
    cosmicAudio.playCrystalChime(1.0);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
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
    <div className="view-container oracle-view-layout">
      {/* Scrollable conversation stream */}
      <div className="oracle-chat-stream" ref={scrollRef}>
        {/* Welcome masthead shown if thread is fresh */}
        {messages.length <= 1 && (
          <div className="oracle-welcome-masthead">
            <div className="archetype-badge-pill">
              <span>{profile.avatar}</span>
              <span>{profile.tradition}</span>
            </div>

            <h1 className="oracle-hero-title">{profile.name}</h1>
            <p className="oracle-hero-subtitle">{profile.title}</p>

            <blockquote className="oracle-quote">
              "{profile.greeting}"
            </blockquote>

            {!natalData && (
              <div className="oracle-prompt-callout">
                <p>✦ You haven't added your birth chart yet. Add it for exact rising and moon calculations.</p>
                <button className="text-link-btn" onClick={onNavigateToChart}>
                  Enter Birth Chart →
                </button>
              </div>
            )}

            <div className="oracle-sample-prompts">
              <div className="sample-prompts-label">CONSULTATION STARTERS</div>
              <div className="prompts-list">
                {profile.samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    className="sample-prompt-pill"
                    onClick={() => onSendMessage(prompt)}
                  >
                    <span>{prompt}</span>
                    <ArrowRight size={13} className="arrow-icon" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message Stream */}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const msgArchetype = msg.archetype ? ASTROLOGER_PROFILES[msg.archetype] : profile;

          return (
            <div key={msg.id} className={`conversation-row ${isUser ? 'user' : 'oracle'}`}>
              <div className="conversation-card">
                {!isUser && (
                  <div className="oracle-meta-header">
                    <span className="oracle-avatar-tag">{msgArchetype.avatar}</span>
                    <span className="oracle-name-tag">{msgArchetype.name}</span>
                    <span className="oracle-time-tag">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                <div className="conversation-body">
                  {renderFormattedText(msg.text)}
                </div>

                {msg.metadata?.transitsCited && msg.metadata.transitsCited.length > 0 && (
                  <div className="transit-citation-group">
                    {msg.metadata.transitsCited.map((cite, i) => (
                      <span key={i} className="transit-tag">
                        ✦ {cite}
                      </span>
                    ))}
                  </div>
                )}

                {msg.metadata?.cosmicTip && (
                  <div className="cosmic-advice-callout">
                    <Sparkles size={15} className="sparkle-icon" />
                    <span>{msg.metadata.cosmicTip}</span>
                  </div>
                )}

                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="oracle-followups-container">
                    {msg.followUps.map((f, i) => (
                      <button
                        key={i}
                        className="followup-suggestion-btn"
                        onClick={() => onSendMessage(f)}
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

        {isTyping && (
          <div className="conversation-row oracle">
            <div className="typing-pill">
              <span className="typing-oracle-avatar">{profile.avatar}</span>
              <div className="typing-dots-wave">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Input Dock */}
      <div className="oracle-input-dock">
        <form onSubmit={handleSubmit} className="oracle-input-form">
          <textarea
            ref={textareaRef}
            className="oracle-input-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${profile.name} about your placements, transits, or soul path...`}
            rows={1}
            disabled={isTyping}
          />

          <div className="input-actions-bar">
            {messages.length > 1 && (
              <button
                type="button"
                className="input-util-btn"
                onClick={onClearChat}
                title="Reset conversation"
              >
                <Trash2 size={15} />
              </button>
            )}

            <button
              type="submit"
              className="oracle-send-btn"
              disabled={!input.trim() || isTyping}
              title="Send to Oracle"
            >
              <Send size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
