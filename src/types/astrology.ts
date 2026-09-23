export type ZodiacSign = 
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' 
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' 
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export type Element = 'Fire' | 'Earth' | 'Air' | 'Water';
export type Modality = 'Cardinal' | 'Fixed' | 'Mutable';
export type ActiveTab = 'oracle' | 'chart' | 'sky' | 'tarot' | 'synastry';

export interface ZodiacSignInfo {
  name: ZodiacSign;
  symbol: string;
  element: Element;
  modality: Modality;
  rulingPlanet: string;
  dates: string;
  essence: string;
  keywords: string[];
  color: string;
  glowColor: string;
  traits: {
    strengths: string[];
    challenges: string[];
    compatibility: ZodiacSign[];
  };
}

export type AstrologerArchetype = 'pythia' | 'helios' | 'nova' | 'kavya';

export interface AstrologerProfile {
  id: AstrologerArchetype;
  name: string;
  title: string;
  description: string;
  tradition: string;
  avatar: string;
  accentColor: string;
  greeting: string;
  samplePrompts: string[];
}

export interface PlanetPlacement {
  planet: string;
  symbol: string;
  sign: ZodiacSign;
  degree: number;
  house: number;
  isRetrograde: boolean;
  dignity?: 'Domicile' | 'Exaltation' | 'Fall' | 'Detriment' | 'Neutral';
  interpretation: string;
}

export interface NatalChartData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  sunSign: ZodiacSign;
  moonSign: ZodiacSign;
  risingSign: ZodiacSign;
  placements: PlanetPlacement[];
  elementBalance: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  dominantModality: Modality;
  coreVibe: string;
}

export interface TarotCard {
  id: number;
  name: string;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  number: number;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  cosmicAdvice: string;
  astrologicalAssociation: string;
  element: Element;
  symbol: string;
}

export interface SynastryAspect {
  planet1: string;
  planet2: string;
  type: 'Conjunction' | 'Trine' | 'Sextile' | 'Square' | 'Opposition';
  harmony: 'Harmonious' | 'Dynamic' | 'Challenging';
  description: string;
}

export interface SynastryReport {
  person1: { name: string; sign: ZodiacSign };
  person2: { name: string; sign: ZodiacSign };
  overallCompatibility: number;
  categories: {
    emotional: number;
    intellectual: number;
    passion: number;
    longevity: number;
  };
  elementalChemistry: string;
  strengths: string[];
  cosmicFriction: string[];
  astrologerVerdict: string;
}

export interface TransitInfo {
  event: string;
  influence: string;
  intensity: 'Mild' | 'Moderate' | 'Intense' | 'Transformative';
  activeUntil: string;
  guidance: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  archetype?: AstrologerArchetype;
  text: string;
  timestamp: Date;
  metadata?: {
    natalHighlight?: {
      sun: ZodiacSign;
      moon: ZodiacSign;
      rising: ZodiacSign;
    };
    tarotCard?: TarotCard;
    isReversed?: boolean;
    transitsCited?: string[];
    synastryScore?: number;
    cosmicTip?: string;
  };
  followUps?: string[];
}
