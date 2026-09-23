import { AstrologerArchetype, ChatMessage, NatalChartData } from '../types/astrology';

const STORAGE_KEYS = {
  NATAL_DATA: 'astra_natal_chart_data_v1',
  CHAT_MESSAGES: 'astra_chat_history_v1',
  ACTIVE_ARCHETYPE: 'astra_active_archetype_v1'
} as const;

export function saveNatalData(data: NatalChartData | null): void {
  try {
    if (data) {
      localStorage.setItem(STORAGE_KEYS.NATAL_DATA, JSON.stringify(data));
    } else {
      localStorage.removeItem(STORAGE_KEYS.NATAL_DATA);
    }
  } catch (err) {
    console.error('Failed to save natal data to localStorage:', err);
  }
}

export function loadNatalData(): NatalChartData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NATAL_DATA);
    if (!raw) return null;
    return JSON.parse(raw) as NatalChartData;
  } catch (err) {
    console.error('Failed to load natal data from localStorage:', err);
    return null;
  }
}

export function saveChatMessages(messages: ChatMessage[]): void {
  try {
    // Keep at most 50 recent messages in localStorage to prevent storage bloat
    const trimmed = messages.slice(-50);
    localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(trimmed));
  } catch (err) {
    console.error('Failed to save chat history to localStorage:', err);
  }
}

export function loadChatMessages(): ChatMessage[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Array<Omit<ChatMessage, 'timestamp'> & { timestamp: string }>;
    return parsed.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch (err) {
    console.error('Failed to load chat history from localStorage:', err);
    return null;
  }
}

export function saveActiveArchetype(archetype: AstrologerArchetype): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ARCHETYPE, archetype);
  } catch (err) {
    console.error('Failed to save archetype to localStorage:', err);
  }
}

export function loadActiveArchetype(): AstrologerArchetype | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_ARCHETYPE);
    if (raw && ['pythia', 'helios', 'nova', 'kavya'].includes(raw)) {
      return raw as AstrologerArchetype;
    }
    return null;
  } catch (err) {
    console.error('Failed to load archetype from localStorage:', err);
    return null;
  }
}

export function clearCosmicStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.NATAL_DATA);
    localStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ARCHETYPE);
  } catch (err) {
    console.error('Failed to clear cosmic storage:', err);
  }
}
