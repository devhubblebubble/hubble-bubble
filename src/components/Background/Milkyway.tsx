"use client";

import React, { useEffect, useRef } from "react";

const MilkyWay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const mwStarCount = 150000; // Reduced slightly for web performance from 100k
    const mwRandomStarProp = 0.2;
    const mwClusterCount = 500;
    const mwClusterStarCount = 2000;
    const mwClusterLayers = 8;
    const mwAngle = 0.6;
    const mwHueMin = 150;
    const mwHueMax = 300;
    const mwWhiteProportionMin = 50;
    const mwWhiteProportionMax = 65;

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawMilkyWay(width, height);
    };

    const milkyWayYFromX = (xPos: number, mode: "star" | "cluster", width: number, height: number) => {
      const offset = (width / 2 - xPos) * mwAngle;
      if (mode === "star") {
        return (
          Math.floor(
            Math.pow(Math.random(), 1.2) * height * (Math.random() - 0.5) +
              height / 2 +
              (Math.random() - 0.5) * 100
          ) + offset
        );
      } else {
        return (
          Math.floor(
            Math.pow(Math.random(), 1.5) * height * 0.6 * (Math.random() - 0.5) +
              height / 2 +
              (Math.random() - 0.5) * 100
          ) + offset
        );
      }
    };

    const drawMilkyWay = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw unclustered stars
      for (let i = 0; i < mwStarCount; i++) {
        const xPos = Math.floor(Math.random() * width);
        const yPos =
          Math.random() < mwRandomStarProp
            ? Math.floor(Math.random() * height)
            : milkyWayYFromX(xPos, "star", width, height);
        const size = Math.random() * 0.25;
        const alpha = 0.3 + Math.random() * 0.4; // Increased from 0.2 + 0.4

        ctx.beginPath();
        ctx.arc(xPos, yPos, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw clusters
      for (let i = 0; i < mwClusterCount; i++) {
        const xPos = Math.floor(Math.random() * width);
        const yPos = milkyWayYFromX(xPos, "cluster", width, height);
        const distToCenter =
          (1 - Math.abs(xPos - width / 2) / (width / 2)) *
          (1 - Math.abs(yPos - height / 2) / (height / 2));
        
        const size = 100 + Math.random() * 80;
        const hue = mwHueMin + Math.floor((Math.random() * 0.5 + distToCenter * 0.5) * (mwHueMax - mwHueMin));
        const whiteProp = mwWhiteProportionMin + Math.random() * (mwWhiteProportionMax - mwWhiteProportionMin);

        drawCluster(xPos, yPos, size, hue, whiteProp, distToCenter);
      }
    };

    const drawCluster = (
      x: number,
      y: number,
      size: number,
      hue: number,
      baseWhite: number,
      brightnessMod: number
    ) => {
      const starsPerLayer = Math.floor(mwClusterStarCount / mwClusterLayers);
      for (let layer = 1; layer < mwClusterLayers; layer++) {
        const layerRadius = (size * layer) / mwClusterLayers;
        for (let i = 1; i < starsPerLayer; i++) {
          const posX = x + 2 * layerRadius * (Math.random() - 0.5);
          const posY = y + 2 * Math.sqrt(Math.max(0, Math.pow(layerRadius, 2) - Math.pow(x - posX, 2))) * (Math.random() - 0.5);
          const starSize = 0.05 + Math.random() * 0.15;
          const alpha = 0.1 + Math.random() * 0.2;
          const whitePercentage = baseWhite + 15 + 15 * brightnessMod + Math.floor(Math.random() * 10);

          ctx.beginPath();
          ctx.arc(posX, posY, starSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 100%, ${whitePercentage}%, ${alpha})`;
          ctx.fill();
        }
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default MilkyWay;
