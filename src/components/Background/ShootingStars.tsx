"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  opacity: number;
  active: boolean;
}

const ShootingStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starRef = useRef<Star | null>(null);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const spawnStar = () => {
      const side = Math.floor(Math.random() * 4);
      const w = canvas.width;
      const h = canvas.height;
      let x = 0, y = 0, angle = 45;

      if (side === 0) { x = Math.random() * w; y = 0; angle = 120 + Math.random() * 30; }
      else if (side === 1) { x = w; y = Math.random() * h; angle = 210 + Math.random() * 30; }
      else if (side === 2) { x = Math.random() * w; y = h; angle = 300 + Math.random() * 30; }
      else { x = 0; y = Math.random() * h; angle = 30 + Math.random() * 30; }

      starRef.current = {
        x, y,
        angle: (angle * Math.PI) / 180,
        speed: 14 + Math.random() * 10,
        length: 80 + Math.random() * 60,
        opacity: 1,
        active: true,
      };
    };

    const scheduleNext = () => {
      timerRef.current = setTimeout(spawnStar, 4200 + Math.random() * 4500);
    };

    spawnStar();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const s = starRef.current;
      if (s && s.active) {
        // Move
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.012;

        // Out of bounds or faded → schedule next
        if (
          s.opacity <= 0 ||
          s.x < -50 || s.x > canvas.width + 50 ||
          s.y < -50 || s.y > canvas.height + 50
        ) {
          starRef.current = null;
          scheduleNext();
        } else {
          // Draw tail → head gradient line
          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;
          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, `rgba(180, 242, 255, 0)`);
          grad.addColorStop(1, `rgba(72, 220, 249, ${s.opacity})`);
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default ShootingStars;
