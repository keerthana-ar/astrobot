import { TransitInfo } from '../types/astrology';

export interface MoonPhaseData {
  phaseName: string;
  illumination: number; // 0 to 100%
  moonSign: string;
  symbol: string;
  meaning: string;
  nextFullMoon: string;
  nextNewMoon: string;
}

export interface RetrogradeData {
  planet: string;
  symbol: string;
  isRetrograde: boolean;
  sign: string;
  retrogradePeriod: string;
  impactTheme: string;
}

export interface DailyCosmicForecast {
  date: string;
  season: string;
  cosmicScore: number; // out of 100
  powerColor: string;
  powerHex: string;
  powerStone: string;
  powerHours: string;
  cautionTheme: string;
  rulingPlanetaryAspect: string;
}

export const CURRENT_MOON_PHASE: MoonPhaseData = {
  phaseName: 'Waxing Gibbous',
  illumination: 78,
  moonSign: 'Aquarius',
  symbol: '🌔',
  meaning: 'Peak momentum and final refinement. Cultivate mental clarity, visionary networks, and breakthrough ideas before the emotional illumination of the full moon.',
  nextFullMoon: 'in 3 days (Pisces)',
  nextNewMoon: 'in 17 days (Libra)'
};

export const ACTIVE_RETROGRADES: RetrogradeData[] = [
  {
    planet: 'Mercury',
    symbol: '☿',
    isRetrograde: false,
    sign: 'Virgo',
    retrogradePeriod: 'Direct Station (Crisp mental clarity returning)',
    impactTheme: 'Contracts, messaging, and tech agreements moving forward smoothly.'
  },
  {
    planet: 'Saturn',
    symbol: '♄',
    isRetrograde: true,
    sign: 'Pisces',
    retrogradePeriod: 'Until Nov 15',
    impactTheme: 'Restructuring spiritual boundaries, dissolving illusions, building endurance.'
  },
  {
    planet: 'Pluto',
    symbol: '♇',
    isRetrograde: true,
    sign: 'Aquarius / Capricorn',
    retrogradePeriod: 'Until Oct 11',
    impactTheme: 'Deep societal transformations, releasing outdated power hierarchies.'
  }
];

export const DAILY_COSMIC_WEATHER: DailyCosmicForecast = {
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  season: 'Virgo / Libra Cusp',
  cosmicScore: 88,
  powerColor: 'Electric Violet & Starlight Gold',
  powerHex: '#8B5CF6',
  powerStone: 'Amethyst & Labradorite',
  powerHours: '2:00 PM – 4:30 PM & 8:00 PM – 10:00 PM',
  cautionTheme: 'Avoid making knee-jerk assumptions; verify before you react.',
  rulingPlanetaryAspect: 'Sun Trine Uranus (Sudden creative breakthroughs)'
};

export const ACTIVE_TRANSITS: TransitInfo[] = [
  {
    event: 'Sun Trine Uranus',
    influence: 'Electrifying flashes of insight, bold individuality, breaking out of creative ruts.',
    intensity: 'Intense',
    activeUntil: 'Sept 25',
    guidance: 'Trust unconventional impulses. The universe favors the unorthodox move today.'
  },
  {
    event: 'Venus Entering Scorpio',
    influence: 'Deepening intimacy, magnetic allure, financial restructuring, zero tolerance for superficiality.',
    intensity: 'Transformative',
    activeUntil: 'Oct 17',
    guidance: 'Dive beneath the surface. Real passion requires radical emotional honesty.'
  },
  {
    event: 'Jupiter Sextile Chiron',
    influence: 'Profound spiritual healing through vulnerability and empathetic wisdom.',
    intensity: 'Moderate',
    activeUntil: 'Oct 02',
    guidance: 'Your past wounds hold the sacred medicine someone else desperately needs.'
  }
];
