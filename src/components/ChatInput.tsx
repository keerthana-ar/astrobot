import React, { useState, useRef, useEffect } from 'react';
import { Send, Layers, Compass, Heart, Moon, Trash2 } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynth';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
  onOpenTarotModal: () => void;
  onOpenNatalModal: () => void;
  onOpenSynastryModal: () => void;
  onClearChat: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled,
  onOpenTarotModal,
  onOpenNatalModal,
  onOpenSynastryModal,
  onClearChat,
  onSelectPrompt
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;

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

  return (
    <div className="chat-input-area">
      {/* Quick Access Floating Tools Bar */}
      <div className="input-tools-bar">
        <button
          className="input-tool-btn gold"
          onClick={onOpenTarotModal}
          type="button"
        >
          <Layers size={13} />
          <span>Draw Tarot Oracle</span>
        </button>

        <button
          className="input-tool-btn"
          onClick={onOpenNatalModal}
          type="button"
        >
          <Compass size={13} />
          <span>Natal Wheel</span>
        </button>

        <button
          className="input-tool-btn"
          onClick={onOpenSynastryModal}
          type="button"
        >
          <Heart size={13} />
          <span>Synastry Match</span>
        </button>

        <button
          className="input-tool-btn"
          onClick={() => onSelectPrompt("What is the celestial transit weather for today?")}
          type="button"
        >
          <Moon size={13} />
          <span>Today's Skies</span>
        </button>

        <button
          className="input-tool-btn"
          onClick={onClearChat}
          title="Reset conversation"
          type="button"
        >
          <Trash2 size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Glowing Input Box */}
      <form onSubmit={handleSubmit} className="chat-input-box-wrapper">
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your natal chart, love synastry, daily transits, or soul karma..."
          rows={1}
          disabled={disabled}
        />

        <button
          type="submit"
          className="send-action-btn"
          disabled={!input.trim() || disabled}
          title="Send message to oracle"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
