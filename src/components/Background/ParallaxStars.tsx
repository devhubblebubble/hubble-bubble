"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
  layer: number;
}

interface ParallaxStarsProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  parallaxIntensity?: number;
  smoothness?: number;
}

const ParallaxStars: React.FC<ParallaxStarsProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  parallaxIntensity = 30,
  smoothness = 0.08,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // One ref per layer — transforms applied directly to DOM, no React re-renders
  const layerRefs = useRef<(SVGGElement | null)[]>([null, null, null]);
  const [stars, setStars] = useState<Star[]>([]);

  // All animation state lives in refs — never triggers React re-renders
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const generateStars = useCallback(
    (width: number, height: number): Star[] => {
      const numStars = Math.floor(width * height * starDensity);
      return Array.from({ length: numStars }, (_, i) => {
        const layer = Math.floor(Math.random() * 3) + 1;
        const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.05 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
          layer,
        };
      });
    },
    [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]
  );

  // Generate stars once on mount / resize
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setStars(generateStars(width, height));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [generateStars]);

  // Track mouse in a ref — no setState, no re-renders
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - left - width / 2) / (width / 2),
        y: (e.clientY - top - height / 2) / (height / 2),
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // RAF loop — updates SVG transforms directly via DOM refs, never via React state
  useEffect(() => {
    const animate = () => {
      const s = smoothRef.current;
      const m = mouseRef.current;
      s.x += (m.x - s.x) * smoothness;
      s.y += (m.y - s.y) * smoothness;

      layerRefs.current.forEach((g, i) => {
        if (!g) return;
        // layer index 0 = layer 1 (closest/most movement), 2 = layer 3 (least)
        const intensity = parallaxIntensity * (3 - i) / 3;
        g.style.transform = `translate(${-s.x * intensity}px, ${-s.y * intensity}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [smoothness, parallaxIntensity]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "120%",
          height: "120%",
        }}
        preserveAspectRatio="none"
      >
        <rect width="100%" height="100%" fill="none" />
        {[1, 2, 3].map((layer, i) => (
          <g
            key={layer}
            ref={(el) => { layerRefs.current[i] = el; }}
          >
            {stars
              .filter((s) => s.layer === layer)
              .map((star) => (
                <circle
                  key={star.id}
                  cx={star.x}
                  cy={star.y}
                  r={star.radius}
                  fill="white"
                  opacity={star.opacity}
                >
                  {star.twinkleSpeed !== null && (
                    <animate
                      attributeName="opacity"
                      values={`${star.opacity};${star.opacity * 0.3};${star.opacity}`}
                      dur={`${star.twinkleSpeed}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ParallaxStars;
