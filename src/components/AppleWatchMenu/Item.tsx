"use client";

import * as React from "react";
import { motion, useMotionValue, MotionValue } from "framer-motion";
import { useIconTransform } from "./useIconTransform";
import styles from "./AppleWatchMenu.module.scss";

interface ItemProps {
  row: number;
  col: number;
  planeX: MotionValue<number>;
  planeY: MotionValue<number>;
  brand?: {
      id: string;
      name: string;
      color: string;
      type: string;
  };
  iconConfig: {
      size: number;
      margin: number;
  };
  deviceConfig: {
      width: number;
      height: number;
  };
}

export function Item({ row, col, planeX, planeY, brand, iconConfig, deviceConfig }: ItemProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const xOffset =
    col * (iconConfig.size + iconConfig.margin) +
    (row % 2) * ((iconConfig.size + iconConfig.margin) / 2);
  const yOffset = row * iconConfig.size;

  useIconTransform({ 
    x, 
    y, 
    scale, 
    planeX, 
    planeY, 
    xOffset, 
    yOffset, 
    device: deviceConfig, 
    icon: iconConfig 
  });

  const bgColor = brand?.color || React.useMemo(() => `hsla(${Math.random() * 360}, 95%, 55%, 1)`, [brand]);

  return (
    <motion.div
      className={styles.item}
      style={{
        position: "absolute",
        left: xOffset,
        top: yOffset,
        x,
        y,
        scale,
        width: iconConfig.size,
        height: iconConfig.size,
        borderRadius: "50%",
        background: brand?.type === 'image' ? '#333' : bgColor,
        boxShadow: "0 10px 40px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
        border: brand?.type === 'logo' ? '1px solid rgba(255,255,255,0.1)' : 'none'
      }}
    >
        <div className={styles.itemContent}>
            {brand?.id === 'linkedin' && <span className={styles.logoText} style={{ fontSize: iconConfig.size * 0.2 }}>in</span>}
            {brand?.id === 'isic' && <span className={styles.logoText} style={{ fontSize: iconConfig.size * 0.15 }}>ISIC</span>}
            {brand?.id === 'bankofscotland' && (
                <div style={{ textAlign: 'center', lineHeight: 1 }}>
                    <div style={{ fontSize: iconConfig.size * 0.08 }}>BANK OF</div>
                    <div style={{ fontSize: iconConfig.size * 0.1, fontWeight: 900 }}>SCOTLAND</div>
                </div>
            )}
            {brand?.id === 'scottishedge' && (
                 <div style={{ textAlign: 'center', lineHeight: 1 }}>
                 <div style={{ fontSize: iconConfig.size * 0.08 }}>SCOTTISH</div>
                 <div style={{ fontSize: iconConfig.size * 0.1, fontWeight: 900 }}>EDGE</div>
             </div>
            )}
            {brand?.type === 'image' && (
                <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: `linear-gradient(45deg, ${bgColor}, #222)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: iconConfig.size * 0.1,
                    color: 'rgba(255,255,255,0.5)'
                }}>
                    PHOTO
                </div>
            )}
        </div>
    </motion.div>
  );
}
