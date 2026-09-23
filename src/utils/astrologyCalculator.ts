import { ZodiacSign, Modality, NatalChartData, PlanetPlacement, SynastryReport } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';

const SIGN_ORDER: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export function getSunSign(month: number, day: number): ZodiacSign {
  // month is 1-12, day is 1-31
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

export function calculateNatalChart(
  name: string,
  birthDate: string, // YYYY-MM-DD
  birthTime: string, // HH:MM
  birthLocation: string
): NatalChartData {
  const parts = birthDate.split('-').map(Number);
  const year = parts[0] || 2000;
  const month = parts[1] || 1;
  const day = parts[2] || 1;

  const timeParts = (birthTime || '12:00').split(':').map(Number);
  const hour = timeParts[0] || 12;
  const minute = timeParts[1] || 0;

  const sunSign = getSunSign(month, day);
  const sunIndex = SIGN_ORDER.indexOf(sunSign);

  // Approximate Moon Sign using lunar cycle (~2.5 days per sign)
  const dayOfYear = Math.floor((month - 1) * 30.4 + day);
  const moonOffset = Math.floor(((year * 12.368 + dayOfYear * 0.55 + hour / 24) % 12));
  const moonIndex = (sunIndex + moonOffset + 12) % 12;
  const moonSign = SIGN_ORDER[moonIndex];

  // Approximate Ascendant / Rising Sign based on birth time (Earth rotates 360 deg every 24h = 1 sign every 2 hours)
  const risingShift = Math.floor((hour + minute / 60) / 2);
  const risingIndex = (sunIndex + risingShift) % 12;
  const risingSign = SIGN_ORDER[risingIndex];

  // Generate Placements for 10 Planets
  const planetDefs = [
    { planet: 'Sun', symbol: '☉', offset: 0, house: 1 + (risingIndex - sunIndex + 12) % 12, interpretation: 'Core identity, solar vitality, conscious ego and destiny path.' },
    { planet: 'Moon', symbol: '☽', offset: moonOffset, house: 1 + (moonIndex - risingIndex + 12) % 12, interpretation: 'Emotional underworld, intuitive reflexes, subconscious safety.' },
    { planet: 'Mercury', symbol: '☿', offset: (moonOffset % 3) - 1, house: ((sunIndex + 1) % 12) + 1, interpretation: 'Intellect, perception, conversational flow, cognitive wiring.' },
    { planet: 'Venus', symbol: '♀', offset: ((sunIndex + 2) % 4) - 2, house: ((sunIndex + 3) % 12) + 1, interpretation: 'Aesthetic pleasure, romantic attraction, values, magnetic allure.' },
    { planet: 'Mars', symbol: '♂', offset: (year % 5) - 2, house: ((sunIndex + 5) % 12) + 1, interpretation: 'Passionate drive, willpower, instinctive courage, assertion.' },
    { planet: 'Jupiter', symbol: '♃', offset: (year % 12), house: ((year * 3) % 12) + 1, interpretation: 'Cosmic expansion, abundance, philosophical luck, higher wisdom.' },
    { planet: 'Saturn', symbol: '♄', offset: Math.floor(year / 2.5) % 12, house: ((year * 7) % 12) + 1, interpretation: 'Karmic mastery, structural discipline, boundaries, enduring legacy.' },
    { planet: 'Uranus', symbol: '♅', offset: Math.floor(year / 7) % 12, house: ((year + 4) % 12) + 1, interpretation: 'Electric awakening, revolutionary genius, lightning breakthroughs.' },
    { planet: 'Neptune', symbol: '♆', offset: Math.floor(year / 14) % 12, house: ((year + 8) % 12) + 1, interpretation: 'Mystical dissolution, channeled imagination, spiritual empathy.' },
    { planet: 'Pluto', symbol: '♇', offset: Math.floor(year / 20) % 12, house: ((year + 11) % 12) + 1, interpretation: 'Phoenix alchemy, regenerative power, depth psychology, sovereignty.' }
  ];

  const placements: PlanetPlacement[] = planetDefs.map(def => {
    const pSignIndex = (sunIndex + def.offset + 24) % 12;
    const sign = SIGN_ORDER[pSignIndex];
    const degree = Math.floor((Math.abs(Math.sin(year + def.offset * 17)) * 28)) + 1;
    const isRetrograde = def.planet !== 'Sun' && def.planet !== 'Moon' && ((def.offset + year) % 4 === 0);

    return {
      planet: def.planet,
      symbol: def.symbol,
      sign,
      degree,
      house: Math.max(1, Math.min(12, def.house)),
      isRetrograde,
      interpretation: `${def.planet} in ${sign} (${degree}° House ${def.house}): ${def.interpretation}`
    };
  });

  // Calculate Elemental Balance
  let fire = 0, earth = 0, air = 0, water = 0;
  placements.forEach(p => {
    const el = ZODIAC_SIGNS[p.sign].element;
    if (el === 'Fire') fire++;
    else if (el === 'Earth') earth++;
    else if (el === 'Air') air++;
    else if (el === 'Water') water++;
  });

  // Modality dominance
  let cardinal = 0, fixed = 0, mutable = 0;
  placements.forEach(p => {
    const mod = ZODIAC_SIGNS[p.sign].modality;
    if (mod === 'Cardinal') cardinal++;
    else if (mod === 'Fixed') fixed++;
    else if (mod === 'Mutable') mutable++;
  });

  let dominantModality: Modality = 'Fixed';
  if (cardinal >= fixed && cardinal >= mutable) dominantModality = 'Cardinal';
  else if (mutable >= fixed && mutable >= cardinal) dominantModality = 'Mutable';

  const vibes = [
    `Magnetic & Visionary: Anchored by ${sunSign}'s fire and refined by ${risingSign}'s rising aura.`,
    `Deeply Intuitive Alchemist: Driven by ${moonSign} moon tides and grounded in celestial purpose.`,
    `Promethean Trailblazer: A radiant fusion of ${sunSign} drive and ${risingSign} presence.`
  ];

  return {
    name: name || 'Cosmic Seeker',
    birthDate,
    birthTime,
    birthLocation: birthLocation || 'The Cosmos',
    sunSign,
    moonSign,
    risingSign,
    placements,
    elementBalance: {
      fire: Math.round((fire / placements.length) * 100),
      earth: Math.round((earth / placements.length) * 100),
      air: Math.round((air / placements.length) * 100),
      water: Math.round((water / placements.length) * 100)
    },
    dominantModality,
    coreVibe: vibes[(sunIndex + moonIndex) % vibes.length]
  };
}

export function calculateSynastry(
  person1: { name: string; sign: ZodiacSign },
  person2: { name: string; sign: ZodiacSign }
): SynastryReport {
  const sign1 = ZODIAC_SIGNS[person1.sign];
  const sign2 = ZODIAC_SIGNS[person2.sign];

  const element1 = sign1.element;
  const element2 = sign2.element;

  const idx1 = SIGN_ORDER.indexOf(person1.sign);
  const idx2 = SIGN_ORDER.indexOf(person2.sign);
  const diff = Math.abs(idx1 - idx2);
  const distance = Math.min(diff, 12 - diff);

  let elementalChemistry = '';
  let baseScore = 75;

  if (element1 === element2) {
    elementalChemistry = `Same Element (${element1}): Instinctive, mirror-like emotional familiarity and effortless rhythm.`;
    baseScore = 90;
  } else if (
    (element1 === 'Fire' && element2 === 'Air') ||
    (element1 === 'Air' && element2 === 'Fire')
  ) {
    elementalChemistry = 'Fire + Air: Dynamic combustion! Air feeds the flames of inspiration and sparks endless creative passion.';
    baseScore = 92;
  } else if (
    (element1 === 'Earth' && element2 === 'Water') ||
    (element1 === 'Water' && element2 === 'Earth')
  ) {
    elementalChemistry = 'Earth + Water: Fertile sanctuary. Water hydrates and softens Earth, while Earth gives shape to Water\'s depths.';
    baseScore = 91;
  } else if (
    (element1 === 'Fire' && element2 === 'Water') ||
    (element1 === 'Water' && element2 === 'Fire')
  ) {
    elementalChemistry = 'Fire + Water: Steam and raw intensity. Passion is hypnotic and deeply transformative, though emotional care is needed.';
    baseScore = 74;
  } else if (
    (element1 === 'Air' && element2 === 'Earth') ||
    (element1 === 'Earth' && element2 === 'Air')
  ) {
    elementalChemistry = 'Air + Earth: Practical brilliance. Ideas meet grounded execution, requiring intentional heart connection.';
    baseScore = 76;
  } else {
    elementalChemistry = 'Fire + Earth: Volcanic ambition. High productivity and undeniable drive when respect is preserved.';
    baseScore = 78;
  }

  // Modulate based on traditional aspect distance (0=Conjunction, 4=Trine, 2=Sextile, 3=Square, 6=Opposition)
  let aspectBonus = 0;
  if (distance === 4) aspectBonus = 12; // Trine (harmony)
  else if (distance === 2) aspectBonus = 8; // Sextile (supportive)
  else if (distance === 0) aspectBonus = 7; // Conjunction
  else if (distance === 6) aspectBonus = 5; // Opposition (magnetic attraction)
  else if (distance === 3) aspectBonus = -4; // Square (dynamic friction)

  const overall = Math.min(98, Math.max(55, baseScore + aspectBonus));
  const emotional = Math.min(99, Math.max(50, Math.round(overall * 0.95 + (element1 === 'Water' || element2 === 'Water' ? 6 : 0))));
  const intellectual = Math.min(99, Math.max(52, Math.round(overall * 0.92 + (element1 === 'Air' || element2 === 'Air' ? 7 : 0))));
  const passion = Math.min(99, Math.max(55, Math.round(overall * 0.98 + (element1 === 'Fire' || element2 === 'Fire' || distance === 6 ? 8 : 0))));
  const longevity = Math.min(99, Math.max(50, Math.round(overall * 0.9 + (element1 === 'Earth' || element2 === 'Earth' ? 8 : 0))));

  const strengths = [
    `${sign1.name} and ${sign2.name} share an instinctive curiosity for each other's hidden layers.`,
    `Strong telepathic resonance: conversations flow from cosmic philosophy to playful banter with ease.`,
    `Natural mutual respect for each other's core sovereignty and life missions.`
  ];

  const cosmicFriction = [
    `${sign1.name}'s default mode is ${sign1.traits.strengths[0]}, whereas ${sign2.name} thrives on ${sign2.traits.strengths[0]}.`,
    `During high stress, watch for ${sign1.name}'s ${sign1.traits.challenges[0]} conflicting with ${sign2.name}'s ${sign2.traits.challenges[0]}.`,
    `Remember to translate your emotional needs into clear words rather than expecting psychic mind-reading.`
  ];

  let verdict = '';
  if (overall >= 90) {
    verdict = 'Cosmic Soul Alignment: Rare elemental synergy that effortlessly bridges emotional vulnerability with magnetic excitement.';
  } else if (overall >= 80) {
    verdict = 'Dynamic Alchemy: High mutual attraction and complementary gifts. A relationship that constantly accelerates personal growth.';
  } else {
    verdict = 'Karmic Catalyst: A powerful mirror designed to break old ego patterns. Requires conscious communication and patient grace.';
  }

  return {
    person1,
    person2,
    overallCompatibility: overall,
    categories: {
      emotional,
      intellectual,
      passion,
      longevity
    },
    elementalChemistry,
    strengths,
    cosmicFriction,
    astrologerVerdict: verdict
  };
}
