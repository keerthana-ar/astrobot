import { NatalChartData, TarotCard } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { DAILY_COSMIC_WEATHER, CURRENT_MOON_PHASE } from '../data/transitPresets';

export type StoryCardType = 'big3' | 'daily' | 'tarot';

export interface StoryCardOptions {
  type: StoryCardType;
  natalData?: NatalChartData;
  tarotCard?: TarotCard;
  isReversed?: boolean;
}

export function generateStoryCardCanvas(options: StoryCardOptions): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      resolve('');
      return;
    }

    // 1. Deep Space Cosmic Background
    const bgGradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    bgGradient.addColorStop(0, '#06040C');
    bgGradient.addColorStop(0.3, '#100B26');
    bgGradient.addColorStop(0.7, '#190E38');
    bgGradient.addColorStop(1, '#080512');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Cosmic Nebula Glow
    const drawGlow = (x: number, y: number, radius: number, color: string) => {
      const radial = ctx.createRadialGradient(x, y, 10, x, y, radius);
      radial.addColorStop(0, color);
      radial.addColorStop(1, 'transparent');
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    drawGlow(200, 300, 450, 'rgba(124, 58, 237, 0.22)');
    drawGlow(880, 1200, 500, 'rgba(236, 72, 153, 0.18)');
    drawGlow(540, 960, 400, 'rgba(6, 182, 212, 0.15)');

    // 3. Procedural Stardust & Stars
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 280; i++) {
      const x = Math.random() * 1080;
      const y = Math.random() * 1920;
      const r = Math.random() * 2 + 0.5;
      const opacity = Math.random() * 0.8 + 0.2;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // 4. Sacred Geometry Decorative Border
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.25)';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, 960, 1800);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(80, 80, 920, 1760);

    // Corner decorative diamonds
    const drawDiamond = (cx: number, cy: number, size: number) => {
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.moveTo(cx, cy - size);
      ctx.lineTo(cx + size, cy);
      ctx.lineTo(cx, cy + size);
      ctx.lineTo(cx - size, cy);
      ctx.closePath();
      ctx.fill();
    };
    drawDiamond(60, 60, 12);
    drawDiamond(1020, 60, 12);
    drawDiamond(60, 1860, 12);
    drawDiamond(1020, 1860, 12);

    // Top Branding
    ctx.textAlign = 'center';
    ctx.font = '600 32px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#A78BFA';
    ctx.letterSpacing = '6px';
    ctx.fillText('✦ ASTROCHAT ELEVATE ✦', 540, 150);

    ctx.font = '300 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.letterSpacing = '2px';
    ctx.fillText('THE AMBIENT CELESTIAL ORACLE', 540, 195);

    // Content based on card type
    if (options.type === 'big3' && options.natalData) {
      const { name, sunSign, moonSign, risingSign, coreVibe } = options.natalData;
      const sun = ZODIAC_SIGNS[sunSign];
      const moon = ZODIAC_SIGNS[moonSign];
      const rising = ZODIAC_SIGNS[risingSign];

      ctx.font = '700 68px "Cinzel", serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.letterSpacing = '3px';
      ctx.fillText(name.toUpperCase(), 540, 360);

      ctx.font = '400 28px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FCD34D';
      ctx.letterSpacing = '4px';
      ctx.fillText('NATAL BIG THREE ESSENCE', 540, 420);

      // 3 Celestial Placement Cards
      const placements = [
        { label: 'SUN SIGN', sign: sunSign, symbol: sun.symbol, title: 'Soul Essence', color: '#FBBF24', desc: sun.essence },
        { label: 'MOON SIGN', sign: moonSign, symbol: moon.symbol, title: 'Subconscious Depths', color: '#60A5FA', desc: moon.essence },
        { label: 'RISING SIGN', sign: risingSign, symbol: rising.symbol, title: 'Aura & First Impression', color: '#EC4899', desc: rising.essence }
      ];

      placements.forEach((p, idx) => {
        const cardY = 510 + idx * 340;
        // Glassmorphic card rect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(140, cardY, 800, 290, 24);
        ctx.fill();
        ctx.stroke();

        // Symbol circle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.beginPath();
        ctx.arc(240, cardY + 145, 65, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '64px "Space Grotesk", sans-serif';
        ctx.fillStyle = p.color;
        ctx.fillText(p.symbol, 240, cardY + 168);

        // Details
        ctx.textAlign = 'left';
        ctx.font = '600 22px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#94A3B8';
        ctx.fillText(p.label, 340, cardY + 75);

        ctx.font = '700 48px "Cinzel", serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(p.sign, 340, cardY + 130);

        ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        wrapText(ctx, p.desc, 340, cardY + 180, 560, 32);
        ctx.textAlign = 'center';
      });

      // Bottom Vibe Box
      ctx.fillStyle = 'rgba(124, 58, 237, 0.12)';
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(140, 1560, 800, 160, 20);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'italic 500 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#E2E8F0';
      wrapText(ctx, `"${coreVibe}"`, 540, 1625, 740, 36);

    } else if (options.type === 'tarot' && options.tarotCard) {
      const card = options.tarotCard;
      const isRev = options.isReversed || false;

      ctx.font = '400 26px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FCD34D';
      ctx.letterSpacing = '4px';
      ctx.fillText('SACRED TAROT ORACLE TRANSMISSION', 540, 310);

      // Card illustration frame
      const frameY = 380;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(280, frameY, 520, 780, 30);
      ctx.fill();
      ctx.stroke();

      // Card Inner Glow
      drawGlow(540, frameY + 390, 260, 'rgba(245, 158, 11, 0.15)');

      // Symbol
      ctx.font = '140px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(card.symbol, 540, frameY + 340);

      // Card Name
      ctx.font = '700 48px "Cinzel", serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(card.name, 540, frameY + 480);

      ctx.font = '600 24px "Space Grotesk", sans-serif';
      ctx.fillStyle = isRev ? '#F87171' : '#34D399';
      ctx.fillText(isRev ? '✦ REVERSED TRANSIT ✦' : '✦ UPRIGHT ESSENCE ✦', 540, frameY + 540);

      ctx.font = '400 22px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(`Association: ${card.astrologicalAssociation}`, 540, frameY + 600);

      // Oracle Advice Box
      const adviceY = 1240;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(140, adviceY, 800, 460, 24);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 28px "Cinzel", serif';
      ctx.fillStyle = '#FBBF24';
      ctx.fillText('CELESTIAL REVELATION', 540, adviceY + 70);

      ctx.font = '400 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#E2E8F0';
      const meaning = isRev ? card.reversedMeaning : card.uprightMeaning;
      wrapText(ctx, meaning, 540, adviceY + 140, 720, 38);

      ctx.font = 'italic 500 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#A78BFA';
      wrapText(ctx, `Cosmic Remedy: "${card.cosmicAdvice}"`, 540, adviceY + 330, 720, 36);

    } else {
      // Daily Cosmic Weather Card
      ctx.font = '700 64px "Cinzel", serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.letterSpacing = '3px';
      ctx.fillText('DAILY COSMIC WEATHER', 540, 340);

      ctx.font = '500 26px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FCD34D';
      ctx.fillText(`${DAILY_COSMIC_WEATHER.date} • ${DAILY_COSMIC_WEATHER.season}`, 540, 400);

      // Moon Phase Circle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(140, 480, 800, 360, 24);
      ctx.fill();
      ctx.stroke();

      ctx.font = '80px "Space Grotesk", sans-serif';
      ctx.fillText(CURRENT_MOON_PHASE.symbol, 540, 590);

      ctx.font = '700 38px "Cinzel", serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`${CURRENT_MOON_PHASE.phaseName} in ${CURRENT_MOON_PHASE.moonSign}`, 540, 660);

      ctx.font = '500 22px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#67E8F9';
      ctx.fillText(`${CURRENT_MOON_PHASE.illumination}% Illumination • Next Full Moon ${CURRENT_MOON_PHASE.nextFullMoon}`, 540, 710);

      ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#CBD5E1';
      wrapText(ctx, CURRENT_MOON_PHASE.meaning, 540, 760, 720, 32);

      // Cosmic Metric Grid
      const metrics = [
        { label: 'COSMIC HARMONY', value: `${DAILY_COSMIC_WEATHER.cosmicScore}/100`, color: '#34D399' },
        { label: 'POWER COLOR', value: DAILY_COSMIC_WEATHER.powerColor, color: '#F472B6' },
        { label: 'SACRED STONE', value: DAILY_COSMIC_WEATHER.powerStone, color: '#A78BFA' },
        { label: 'WINDOW OF POWER', value: DAILY_COSMIC_WEATHER.powerHours, color: '#FBBF24' }
      ];

      metrics.forEach((m, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const cardX = 140 + col * 420;
        const cardY = 880 + row * 220;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, 380, 180, 20);
        ctx.fill();
        ctx.stroke();

        ctx.font = '600 18px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#94A3B8';
        ctx.fillText(m.label, cardX + 190, cardY + 55);

        ctx.font = '700 24px "Cinzel", serif';
        ctx.fillStyle = m.color;
        wrapText(ctx, m.value, cardX + 190, cardY + 105, 340, 30);
      });

      // Bottom transit tip
      ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
      ctx.strokeStyle = 'rgba(248, 113, 113, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(140, 1400, 800, 260, 20);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 24px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#F87171';
      ctx.fillText('✦ CELESTIAL CAUTION ✦', 540, 1470);

      ctx.font = '400 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#E2E8F0';
      wrapText(ctx, DAILY_COSMIC_WEATHER.cautionTheme, 540, 1530, 720, 36);
    }

    // Bottom Footer
    ctx.font = '400 20px "Space Grotesk", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.letterSpacing = '3px';
    ctx.fillText('DISCOVER YOUR CONSTELLATION • ASTROCHAT ELEVATE', 540, 1820);

    resolve(canvas.toDataURL('image/png'));
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}
