import { AstrologerArchetype, ChatMessage, NatalChartData, TarotCard } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { ACTIVE_TRANSITS, CURRENT_MOON_PHASE } from '../data/transitPresets';

export interface ChatEngineContext {
  archetype: AstrologerArchetype;
  natalData?: NatalChartData | null;
  lastTarotCard?: { card: TarotCard; isReversed: boolean } | null;
  conversationHistory: ChatMessage[];
}

export function generateAstrologerReply(
  userPrompt: string,
  ctx: ChatEngineContext
): {
  text: string;
  transitsCited?: string[];
  cosmicTip?: string;
  followUps: string[];
} {
  const prompt = userPrompt.toLowerCase().trim();
  const { archetype, natalData, lastTarotCard } = ctx;

  // 1. Tarot Card Reading Query
  if (lastTarotCard && (prompt.includes('tarot') || prompt.includes('card') || prompt.includes('drew') || prompt.includes('meaning'))) {
    const { card, isReversed } = lastTarotCard;
    const orientation = isReversed ? 'Reversed' : 'Upright';
    const coreMeaning = isReversed ? card.reversedMeaning : card.uprightMeaning;

    let archetypeVoice = '';
    if (archetype === 'pythia') {
      archetypeVoice = `In the theater of your subconscious, ${card.name} (${orientation}) emerges not by coincidence, but as an archetypal mirror. Associated with ${card.astrologicalAssociation}, it signals that the psyche is actively renegotiating ${card.keywords.slice(0, 2).join(' and ')}. Do not rush to rationalize this symbol; let it incubate in your dreams.`;
    } else if (archetype === 'helios') {
      archetypeVoice = `By classical reckoning, ${card.name} is bound to ${card.astrologicalAssociation}. In its ${orientation.toLowerCase()} condition, the cosmic decree is unmistakable: ${coreMeaning}. Take calculated action in alignment with this planetary omen.`;
    } else if (archetype === 'nova') {
      archetypeVoice = `Okay, the cosmos did NOT stutter with this draw. You pulled **${card.name} ${orientation}** and honestly? It’s calling you out directly. You're trying to dodge ${card.keywords[0].toLowerCase()}, but the universe is literally waving a neon flag right now. Listen to it!`;
    } else {
      archetypeVoice = `Pranams. The sacred symbol of ${card.name} holds profound karmic energy. In its ${orientation.toLowerCase()} state, it asks you to balance the Graha energy of ${card.astrologicalAssociation}. Meditate upon inner purity and detachment.`;
    }

    return {
      text: `${archetypeVoice}\n\n**Key Esoteric Transmission:**\n${coreMeaning}\n\n**Cosmic Prescription:**\n"${card.cosmicAdvice}"`,
      transitsCited: [`Tarot Oracle: ${card.name} (${orientation})`, `Ruler: ${card.astrologicalAssociation}`],
      cosmicTip: `Integrate the vibration of ${card.element} into your daily routine.`,
      followUps: [
        'How does this card connect to my current transits?',
        'What action should I take in the next 24 hours?',
        'Draw another card to see the outcome.'
      ]
    };
  }

  // 2. Natal Chart / Big 3 Query
  if (natalData && (prompt.includes('chart') || prompt.includes('big 3') || prompt.includes('placements') || prompt.includes('sun') || prompt.includes('moon') || prompt.includes('rising'))) {
    const sun = ZODIAC_SIGNS[natalData.sunSign];
    const moon = ZODIAC_SIGNS[natalData.moonSign];
    const rising = ZODIAC_SIGNS[natalData.risingSign];

    let tone = '';
    if (archetype === 'nova') {
      tone = `Let's dissect your cosmic fingerprint, **${natalData.name}**: Having a **${natalData.sunSign} Sun** means you project absolute confidence, but that **${natalData.moonSign} Moon** is hiding in the corner over-analyzing everything at 2:00 AM. And your **${natalData.risingSign} Rising**? That's your armored glamour that fools everyone into thinking you have it all under control.`;
    } else if (archetype === 'helios') {
      tone = `Examining the nativity of **${natalData.name}**: The Solar luminary presides in **${natalData.sunSign}**, while the Lunar luminary commands the night in **${natalData.moonSign}**. The Horoskopos (Ascendant) rises in **${natalData.risingSign}**, establishing the essential pivots of your earthly existence. Your elemental balance carries **${natalData.elementBalance.fire}% Fire** and **${natalData.elementBalance.water}% Water**, indicating a life of high creative combustion.`;
    } else if (archetype === 'pythia') {
      tone = `Behold the mandala of your soul, **${natalData.name}**. Your **${natalData.sunSign} Sun** represents the conscious hero’s journey you came here to claim. Beneath it lies your **${natalData.moonSign} Moon**—the sacred subterranean lake of memory, intuition, and vulnerability. Greeting the world at the eastern horizon is your **${natalData.risingSign} Rising**, the sacred mask through which destiny invites experience.`;
    } else {
      tone = `Blessings, **${natalData.name}**. In your Janam Kundali, Surya (Sun) in **${natalData.sunSign}** brings divine vitality, while Chandra (Moon) in **${natalData.moonSign}** dictates the sacred rhythm of the mind and Chitta. With **${natalData.risingSign}** ascending, your karmic path demands balance between duty and soul liberation.`;
    }

    return {
      text: `${tone}\n\n**Core Cosmic Architecture:**\n• **☉ Sun in ${natalData.sunSign}**: ${sun.essence}\n• **☽ Moon in ${natalData.moonSign}**: ${moon.essence}\n• **↑ Rising in ${natalData.risingSign}**: ${rising.essence}\n\n**Soul Dominance:** ${natalData.dominantModality} Modality (${natalData.elementBalance.fire}% Fire • ${natalData.elementBalance.earth}% Earth • ${natalData.elementBalance.air}% Air • ${natalData.elementBalance.water}% Water)`,
      transitsCited: [`Natal Sun: ${natalData.sunSign}`, `Natal Moon: ${natalData.moonSign}`, `Ascendant: ${natalData.risingSign}`],
      cosmicTip: `Honor your ${natalData.dominantModality} nature—channel your primary elemental gifts into deliberate creation.`,
      followUps: [
        'Which planet in my chart is my greatest superpower?',
        'How does the current Moon phase affect my Moon sign?',
        'What kind of partner complements my Big 3 best?'
      ]
    };
  }

  // 3. Love / Relationship / Compatibility Query
  if (prompt.includes('love') || prompt.includes('ex') || prompt.includes('relationship') || prompt.includes('crush') || prompt.includes('dating') || prompt.includes('text') || prompt.includes('compatible')) {
    if (archetype === 'nova') {
      return {
        text: `Listen to me very carefully: do NOT romanticize mixed signals. The cosmos creates tension for two reasons: either to forge diamonds or to teach you that some people are meant to stay in past astrological seasons.\n\nVenus is currently demanding depth and zero BS. If someone isn't meeting your energy with clarity and respect, that is NOT "twin flame angst"—that is simply your cue to redirect your planetary energy back to yourself.`,
        transitsCited: ['Venus Transit: Depth & Sovereign Standards', 'Current Moon in Aquarius: Detached Perspective'],
        cosmicTip: 'Before you send that paragraph, wait until tomorrow morning’s solar transit.',
        followUps: [
          'Run a Synastry Match between two signs',
          'What are the cosmic red flags for my zodiac sign?',
          'Draw a Tarot card for my love life'
        ]
      };
    } else if (archetype === 'pythia') {
      return {
        text: `In psychological astrology, who we are magnetically attracted to is rarely an accident; they represent the unintegrated gold of our own shadow (the Anima / Animus). When love feels turbulent, ask yourself:\n\n*"What dormant part of my own psyche is this person reflecting back to me?"*\n\nTrue union is not the loss of sovereignty, but two complete solar systems sharing an orbit without collapsing into each other's gravity wells.`,
        transitsCited: ['Venus-Pluto Archetype: Alchemical Soul Bonding'],
        cosmicTip: 'Cultivate inner wholeness; you cannot attract what you refuse to embody in yourself.',
        followUps: [
          'Check compatibility in our Synastry Matrix',
          'What is my Venus placement trying to teach me?',
          'How do I heal past relationship karma?'
        ]
      };
    } else {
      return {
        text: `The 7th House of partnership and Venusian aspects govern relationship alchemy. When evaluating a connection, look beyond surface sun signs into elemental reciprocity (Fire/Air passion vs Earth/Water sanctuary). True cosmic compatibility requires mutual willingness to honor both boundaries and devotional warmth.`,
        transitsCited: ['7th House Planetary Dynamics', 'Venusian Transits'],
        cosmicTip: 'Measure love by peace and consistent presence rather than unpredictable adrenaline.',
        followUps: [
          'Compare two signs in the Synastry Radar',
          'What transits affect my 7th house right now?',
          'What is my ideal astrological match?'
        ]
      };
    }
  }

  // 4. Career / Money / Purpose Query
  if (prompt.includes('career') || prompt.includes('money') || prompt.includes('job') || prompt.includes('purpose') || prompt.includes('work') || prompt.includes('wealth') || prompt.includes('success')) {
    const transit = ACTIVE_TRANSITS[0];
    return {
      text: `Your worldly ambition is under direct celestial stimulation right now.\n\n**Active Celestial Blueprint:**\nWith **${transit.event}** active (${transit.influence}), the standard mundane playbook is insufficient. The universe is rewarding radical autonomy, unorthodox positioning, and disciplined structural follow-through.\n\n**Strategic Recommendation:**\n1. **Stop waiting for permission**: Solar transits favor bold initiations.\n2. **Codify your systems**: Saturn in Pisces rewards structure applied to creative dreams.\n3. **Monetize your unique quirk**: What you think is "too weird" about your perspective is your greatest unfair market advantage.`,
      transitsCited: [transit.event, 'Saturn in Pisces: Master of Systems'],
      cosmicTip: 'Focus your high-leverage work during today’s Power Window (2:00 PM - 4:30 PM).',
      followUps: [
        'What does my 10th House say about my career legacy?',
        'Is today a good day for financial decisions?',
        'Draw a Tarot card for career guidance'
      ]
    };
  }

  // 5. Transits & Current Weather Query
  if (prompt.includes('transit') || prompt.includes('retrograde') || prompt.includes('sky') || prompt.includes('weather') || prompt.includes('mercury') || prompt.includes('moon') || prompt.includes('today')) {
    return {
      text: `Here is the immediate cosmic weather currently presiding over the terrestrial sphere:\n\n🌙 **Lunar Transit:** ${CURRENT_MOON_PHASE.phaseName} in **${CURRENT_MOON_PHASE.moonSign}** (${CURRENT_MOON_PHASE.illumination}% illuminated). ${CURRENT_MOON_PHASE.meaning}\n\n⚡ **Key Transit in Motion:** **${ACTIVE_TRANSITS[0].event}** — ${ACTIVE_TRANSITS[0].influence}\n\n🪐 **Retrograde Status:** Mercury is Direct in pristine analytical focus! However, Saturn and Pluto remain in retrograde motion, enforcing deep karmic audits in long-term structures.`,
      transitsCited: [`Moon in ${CURRENT_MOON_PHASE.moonSign}`, ACTIVE_TRANSITS[0].event, 'Mercury Direct'],
      cosmicTip: 'Use this waxing lunar cycle to finish high-priority creative drafts.',
      followUps: [
        'How does this Moon phase affect my personal energy?',
        'When is the next Full Moon?',
        'Show me my full Natal Chart Wheel'
      ]
    };
  }

  // 6. General / Fallback Response tuned to active archetype
  const archetypesMap: Record<AstrologerArchetype, { intro: string; body: string; tip: string }> = {
    pythia: {
      intro: 'I hear the subtle chord vibrating beneath your question.',
      body: 'In archetypal astrology, every life situation is an initiation. You are currently standing between the conscious threshold of what has been known and the unconscious potential waiting to break through into form. The planets do not impose; they illuminate the path of individuation.',
      tip: 'Pay attention to synchronicity and recurring numbers over the next 48 hours.'
    },
    helios: {
      intro: 'Let us measure the celestial bearings of your inquiry.',
      body: 'The celestial clockwork operates with mathematical exactitude. When evaluating current questions, we look to the active planetary hour and the angular aspects forming between the transiting luminaries. Maintain classical discipline and honor your foundational responsibilities.',
      tip: 'Focus on tangible craft and structural integrity today.'
    },
    nova: {
      intro: 'Okay, real talk from the stars:',
      body: 'Whatever you\'re stressing about right now? Take a deep breath. Half of what you\'re feeling is just planetary static from current collective shifts. You don\'t need to figure out your entire 10-year master plan by tonight. Just make the cleanest, highest-integrity decision right in front of you.',
      tip: 'Drink some water, put your phone down for 30 minutes, and reclaim your peace.'
    },
    kavya: {
      intro: 'Namaste. Let us quiet the mind and look to the Grahas.',
      body: 'All movements in your life are sacred threads woven by past karma and spiritual evolution. Align yourself with your inner Dharma. When you align your daily actions with universal truth (Satya), the planets naturally bestow their highest benevolent blessings.',
      tip: 'Light a candle or dedicate 5 minutes to silent breathwork at twilight.'
    }
  };

  const selected = archetypesMap[archetype];

  return {
    text: `${selected.intro}\n\n${selected.body}\n\nWhether you wish to unpack your **Natal Chart**, examine **Synastry compatibility**, draw from the **Tarot Oracle**, or track **Current Transits**, the cosmos is ready whenever you are.`,
    transitsCited: [`Current Moon: ${CURRENT_MOON_PHASE.moonSign}`, 'Active Planetary Hour'],
    cosmicTip: selected.tip,
    followUps: [
      'Generate my Interactive Natal Chart',
      'Draw a 3D Tarot Oracle Card',
      'Calculate Synastry Compatibility',
      'What are my lucky hours today?'
    ]
  };
}
