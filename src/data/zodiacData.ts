import { ZodiacSign, ZodiacSignInfo, AstrologerProfile } from '../types/astrology';

export const ZODIAC_SIGNS: Record<ZodiacSign, ZodiacSignInfo> = {
  Aries: {
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    dates: 'Mar 21 - Apr 19',
    essence: 'The Initiator, pioneer of cosmic fire, unbridled momentum.',
    keywords: ['Courageous', 'Impulsive', 'Pioneering', 'Passionate', 'Direct'],
    color: '#FF4D4D',
    glowColor: 'rgba(255, 77, 77, 0.4)',
    traits: {
      strengths: ['Fearless leadership', 'Unstoppable drive', 'Radical honesty'],
      challenges: ['Impatience', 'Combative reactions', 'Boredom with routine'],
      compatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius']
    }
  },
  Taurus: {
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    modality: 'Fixed',
    rulingPlanet: 'Venus',
    dates: 'Apr 20 - May 20',
    essence: 'The Builder, anchor of sensual serenity, sovereign patience.',
    keywords: ['Sensual', 'Steadfast', 'Grounded', 'Resolute', 'Luxurious'],
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    traits: {
      strengths: ['Unyielding loyalty', 'Aesthetic mastery', 'Financial acumen'],
      challenges: ['Stubborn resistance to change', 'Possessiveness', 'Comfort stagnation'],
      compatibility: ['Virgo', 'Capricorn', 'Cancer', 'Pisces']
    }
  },
  Gemini: {
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    dates: 'May 21 - Jun 20',
    essence: 'The Messenger, kaleidoscope of ideas, neural quicksilver.',
    keywords: ['Curious', 'Versatile', 'Witty', 'Articulate', 'Restless'],
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    traits: {
      strengths: ['Polymathic agility', 'Magnetic conversationalist', 'Adaptive wit'],
      challenges: ['Fickle focus', 'Intellectual detachment', 'Overthinking'],
      compatibility: ['Libra', 'Aquarius', 'Aries', 'Leo']
    }
  },
  Cancer: {
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    modality: 'Cardinal',
    rulingPlanet: 'Moon',
    dates: 'Jun 21 - Jul 22',
    essence: 'The Sanctuary, deep tidal empath, guardian of ancestral memory.',
    keywords: ['Intuitive', 'Protective', 'Sentimental', 'Deep', 'Nurturing'],
    color: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.4)',
    traits: {
      strengths: ['Psychic empathy', 'Fierce loyalty', 'Emotional alchemy'],
      challenges: ['Mood swings', 'Defensive crustacean shell', 'Clinging to past hurt'],
      compatibility: ['Scorpio', 'Pisces', 'Taurus', 'Virgo']
    }
  },
  Leo: {
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    modality: 'Fixed',
    rulingPlanet: 'Sun',
    dates: 'Jul 23 - Aug 22',
    essence: 'The Sovereign, solar brilliance, regal warmth and creative fire.',
    keywords: ['Radiant', 'Generous', 'Charismatic', 'Noble', 'Dramatic'],
    color: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    traits: {
      strengths: ['Magnetic aura', 'Fierce loyalty', 'Creative genius'],
      challenges: ['Prideful ego', 'Need for constant validation', 'Authoritarian flare'],
      compatibility: ['Aries', 'Sagittarius', 'Gemini', 'Libra']
    }
  },
  Virgo: {
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    dates: 'Aug 23 - Sep 22',
    essence: 'The Alchemist, sacred geometry of refinement and devotion.',
    keywords: ['Analytical', 'Discerning', 'Pragmatic', 'Devoted', 'Precise'],
    color: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    traits: {
      strengths: ['Uncanny detail detection', 'Healing service', 'Methodical brilliance'],
      challenges: ['Hyper-critical perfectionism', 'Somatic anxiety', 'Over-analysis'],
      compatibility: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio']
    }
  },
  Libra: {
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Venus',
    dates: 'Sep 23 - Oct 22',
    essence: 'The Equilibrium, poetic harmony, seeker of divine mirror justice.',
    keywords: ['Diplomatic', 'Harmonious', 'Charming', 'Aesthetic', 'Fair-minded'],
    color: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    traits: {
      strengths: ['Supreme mediator', 'Refined aesthetic grace', 'Sociable warmth'],
      challenges: ['Agonizing indecision', 'Conflict avoidance', 'Mirror identity loss'],
      compatibility: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius']
    }
  },
  Scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    modality: 'Fixed',
    rulingPlanet: 'Pluto & Mars',
    dates: 'Oct 23 - Nov 21',
    essence: 'The Phoenix, underworld diver, shamanic transformation and truth.',
    keywords: ['Intense', 'Magnetic', 'Transformative', 'Perceptive', 'Unyielding'],
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    traits: {
      strengths: ['X-ray psychological vision', 'Unshakable resilience', 'Tempting depth'],
      challenges: ['Paranoid guardedness', 'Vindictive grudges', 'All-or-nothing obsession'],
      compatibility: ['Cancer', 'Pisces', 'Virgo', 'Capricorn']
    }
  },
  Sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    dates: 'Nov 22 - Dec 21',
    essence: 'The Cosmic Nomad, arrow aimed at the infinite zenith of truth.',
    keywords: ['Philosophical', 'Expansive', 'Optimistic', 'Free-spirited', 'Wild'],
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    traits: {
      strengths: ['Boundaryless optimism', 'Prophetic vision', 'Infectious exuberance'],
      challenges: ['Blunt tactlessness', 'Commitment phobia', 'Preachiness'],
      compatibility: ['Aries', 'Leo', 'Libra', 'Aquarius']
    }
  },
  Capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    modality: 'Cardinal',
    rulingPlanet: 'Saturn',
    dates: 'Dec 22 - Jan 19',
    essence: 'The Sovereign Architect, master of time, stone, and legacy.',
    keywords: ['Disciplined', 'Strategic', 'Ambitious', 'Resilient', 'Authoritative'],
    color: '#64748B',
    glowColor: 'rgba(100, 116, 139, 0.4)',
    traits: {
      strengths: ['Indomitable discipline', 'Legacy builder', 'Dry stoic wisdom'],
      challenges: ['Melancholy cynicism', 'Workaholic isolation', 'Emotional austerity'],
      compatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces']
    }
  },
  Aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    modality: 'Fixed',
    rulingPlanet: 'Uranus & Saturn',
    dates: 'Jan 20 - Feb 18',
    essence: 'The Visionary Promethean, electric conduit to the human future.',
    keywords: ['Original', 'Rebellious', 'Humanitarian', 'Cerebral', 'Eccentric'],
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    traits: {
      strengths: ['Genius innovation', 'Egalitarian vision', 'Fierce individuality'],
      challenges: ['Cool aloofness', 'Dogmatic obstinacy', 'Intimacy resistance'],
      compatibility: ['Gemini', 'Libra', 'Aries', 'Sagittarius']
    }
  },
  Pisces: {
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    modality: 'Mutable',
    rulingPlanet: 'Neptune & Jupiter',
    dates: 'Feb 19 - Mar 20',
    essence: 'The Mystic Ocean, dissolver of boundaries, dreamer of the cosmos.',
    keywords: ['Mystical', 'Compassionate', 'Ethereal', 'Artistic', 'Transcendent'],
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    traits: {
      strengths: ['Universal empathy', 'Channeled artistry', 'Psychic porosity'],
      challenges: ['Escapist tendencies', 'Vague boundary dissolution', 'Martyr complex'],
      compatibility: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
    }
  }
};

export const ASTROLOGER_PROFILES: Record<string, AstrologerProfile> = {
  pythia: {
    id: 'pythia',
    name: 'Pythia',
    title: 'The Jungian Mystic & Soul Oracle',
    description: 'Blends depth psychology, archetypal astrology, and poetic shadow-work to decode your unconscious celestial blueprints.',
    tradition: 'Psychological & Archetypal',
    avatar: '🔮',
    accentColor: '#C084FC',
    greeting: 'Welcome, seeker. The cosmos does not force our fate—it mirrors the architecture of your soul. Speak into the quiet of the stars: what threshold are you crossing today?',
    samplePrompts: [
      'What does my Moon sign reveal about my deepest emotional needs?',
      'Decode the psychological lesson behind current Saturn transits.',
      'How do I integrate my shadow aspects and reclaim my creative power?'
    ]
  },
  helios: {
    id: 'helios',
    name: 'Helios',
    title: 'Master of Hellenistic Ephemeris',
    description: 'Strict, classical astrological rigor. Evaluates essential dignities, sect, planetary lots, and time-lord timing techniques.',
    tradition: 'Classical Hellenistic & Predictive',
    avatar: '☀️',
    accentColor: '#FBBF24',
    greeting: 'Greetings. The planetary rulers govern the hour with mathematical precision. Give me your placements or your query, and let us dissect the celestial geometries without illusion.',
    samplePrompts: [
      'Evaluate the essential dignity and condition of my ruling planet.',
      'What major transit peaks in my chart over the next 90 days?',
      'Analyze the 10th House of career through Hellenistic sect.'
    ]
  },
  nova: {
    id: 'nova',
    name: 'Nova',
    title: 'The Real-Talk Cosmic Bestie',
    description: 'Witty, brutally honest, and deeply relatable. Think Co-Star meets your smartest friend with a velvet tongue.',
    tradition: 'Modern Pop & Intuitive Realism',
    avatar: '⚡',
    accentColor: '#F43F5E',
    greeting: 'Hey babe. Let\'s cut through the generic horoscope fluff: what chaos are you brewing, and who are you stalking right now? Let\'s check the skies before you text them back.',
    samplePrompts: [
      'Should I text my ex or is Mercury retrograde just frying my brain?',
      'Roast my Big 3 placements with love and no mercy.',
      'What is my true aura vibe and what red flags do I ignore?'
    ]
  },
  kavya: {
    id: 'kavya',
    name: 'Kavya',
    title: 'Vedic Jyotish & Karmic Seer',
    description: 'Rooted in sacred Vedic astronomy, Nakshatras, Rahu-Ketu karmic axes, and balancing gemstone/remedial cosmic energies.',
    tradition: 'Vedic Jyotish & Nakshatras',
    avatar: '🕉️',
    accentColor: '#34D399',
    greeting: 'Namaste, divine soul. The Grahas move according to our karmic ripples. Let us understand the Dharma of your birth chart and the Nakshatra guiding your spirit.',
    samplePrompts: [
      'What is the karmic purpose of my Rahu and Ketu axis?',
      'Which Nakshatra rules my inner mind and how do I align with it?',
      'What cosmic remedies or mantra intentions balance my energies today?'
    ]
  }
};
