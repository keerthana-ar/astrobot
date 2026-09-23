import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const starColors = ['#FFFFFF', '#E0E7FF', '#C7D2FE', '#FDE68A', '#FBCFE8', '#BAE6FD'];
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 4500);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          color: starColors[Math.floor(Math.random() * starColors.length)]
        });
      }
    };

    const maybeAddShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.012) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 10 + 12,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1
        });
      }
    };

    initStars();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Twinkling Stars
      stars.forEach((s) => {
        s.alpha += s.alphaSpeed;
        if (s.alpha > 0.95 || s.alpha < 0.15) {
          s.alphaSpeed = -s.alphaSpeed;
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Shooting Stars
      maybeAddShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.02;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="starfield-canvas-container">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};
