"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface StarLayer {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
  layer: number; // 1 = closest (fastest), 3 = farthest (slowest)
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
  const [stars, setStars] = useState<StarLayer[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const generateStars = useCallback(
    (width: number, height: number): StarLayer[] => {
      const area = width * height;
      const numStars = Math.floor(area * starDensity);
      
      return Array.from({ length: numStars }, (_, i) => {
        const layer = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
        const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        
        return {
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.05 + 0.5, // Same as StarBackground: 0.5 to 0.55
          opacity: Math.random() * 0.5 + 0.5, // Same as StarBackground: 0.5 to 1
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
          layer,
        };
      });
    },
    [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]
  );

  useEffect(() => {
    const updateStars = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setStars(generateStars(width, height));
      }
    };

    updateStars();

    const resizeObserver = new ResizeObserver(updateStars);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [generateStars]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const x = (e.clientX - rect.left - centerX) / centerX;
      const y = (e.clientY - rect.top - centerY) / centerY;
      
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothness,
        y: prev.y + (mousePosition.y - prev.y) * smoothness,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, smoothness]);

  const getLayerTransform = (layer: number) => {
    const intensity = parallaxIntensity * (4 - layer) / 3;
    const x = -smoothPosition.x * intensity;
    const y = -smoothPosition.y * intensity;
    return `translate(${x}px, ${y}px)`;
  };

  const renderStarsByLayer = (layer: number) => {
    const layerStars = stars.filter((s) => s.layer === layer);

    return (
      <g
        key={layer}
        style={{
          transform: getLayerTransform(layer),
          transition: "none",
        }}
      >
        {layerStars.map((star) => (
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
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none",
        background: "transparent",
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
          backgroundColor: "transparent",
        }}
        preserveAspectRatio="none"
      >
        <rect width="100%" height="100%" fill="none" />
        {[3, 2, 1].map((layer) => renderStarsByLayer(layer))}
      </svg>
    </div>
  );
};

export default ParallaxStars;
