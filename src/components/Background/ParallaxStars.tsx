"use client";

import React, { useEffect, useRef, useState } from "react";

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
  type: "circle" | "sparkle";
}

interface ParallaxStarsProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  sparkleProbability?: number;
}

const Star: React.FC<StarProps> = ({ x, y, radius, opacity, twinkleSpeed, type }) => {
  const animation = twinkleSpeed !== null && (
    <animate
      attributeName="opacity"
      values={`${opacity};${opacity * 0.3};${opacity}`}
      dur={`${twinkleSpeed}s`}
      repeatCount="indefinite"
    />
  );

  if (type === "sparkle") {
    const size = radius * 4;
    const inner = radius * 0.4;
    const d = `M ${x} ${y - size}
               Q ${x + inner} ${y - inner} ${x + size} ${y}
               Q ${x + inner} ${y + inner} ${x} ${y + size}
               Q ${x - inner} ${y + inner} ${x - size} ${y}
               Q ${x - inner} ${y - inner} ${x} ${y - size} Z`;

    return (
      <path d={d} fill="white" opacity={opacity}>
        {animation}
      </path>
    );
  }

  return (
    <circle cx={x} cy={y} r={radius} fill="white" opacity={opacity}>
      {animation}
    </circle>
  );
};

const ParallaxStars: React.FC<ParallaxStarsProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  sparkleProbability = 0.1,
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const generateStars = (width: number, height: number): StarProps[] => {
    const area = width * height;
    const numStars = Math.floor(area * starDensity);

    return Array.from({ length: numStars }, () => {
      const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
      const isSparkle = Math.random() < sparkleProbability;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isSparkle ? Math.random() * 0.4 + 0.7 : Math.random() * 0.05 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: shouldTwinkle
          ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
          : null,
        type: isSparkle ? "sparkle" : "circle",
      };
    });
  };

  useEffect(() => {
    const updateStars = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setStars(generateStars(width, height));
    };

    updateStars();

    const resizeObserver = new ResizeObserver(updateStars);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
    sparkleProbability,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        // background: "radial-gradient(circle at center, #100826 0%, #060212 100%)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "transparent",
          zIndex: 1,
        }}
        preserveAspectRatio="none"
      >
        <rect width="100%" height="100%" fill="none" />
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}
      </svg>
    </div>
  );
};

export default ParallaxStars;
