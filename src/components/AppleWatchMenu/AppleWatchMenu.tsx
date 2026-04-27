"use client";

import * as React from "react";
import { motion, useMotionValue } from "framer-motion";
import { Item } from "./Item";
import { brands } from "./settings";
import styles from "./AppleWatchMenu.module.scss";

// We'll create a larger grid and assign brands to it
const gridRows = 8;
const gridCols = 10;

export function AppleWatchMenu() {
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const deviceConfig = React.useMemo(() => {
    if (isMobile) return { width: 300, height: 300 };
    if (isTablet) return { width: 500, height: 500 };
    return { width: 700, height: 700 };
  }, [isMobile, isTablet]);

  const iconConfig = React.useMemo(() => {
    if (isMobile) return { size: 64, margin: 16 };
    if (isTablet) return { size: 110, margin: 30 };
    return { size: 140, margin: 40 };
  }, [isMobile, isTablet]);

  // Initial offsets to center the grid based on device size
  const x = useMotionValue(-deviceConfig.width / 2);
  const y = useMotionValue(-deviceConfig.height / 3);

  const getItemBrand = (row: number, col: number) => {
    const index = (row * gridCols + col) % brands.length;
    if ((row + col) % 3 === 0) {
        return brands[index];
    }
    return undefined;
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
            <h2 className={styles.title}>Look Who’ve Noticed Us!</h2>
            <p className={styles.subtitle}>Big names, real impact — and we’re just getting started.</p>
        </div>
        
        <div className={styles.deviceWrapper}>
          <div className={styles.device} style={{ width: deviceConfig.width, height: deviceConfig.height }}>
            <motion.div
              drag
              dragConstraints={{ 
                left: -1200, 
                right: 400, 
                top: -1000, 
                bottom: 400 
              }}
              style={{
                width: 2500,
                height: 2000,
                x,
                y,
                background: "transparent",
                cursor: "grab"
              }}
              whileTap={{ cursor: "grabbing" }}
            >
              {[...Array(gridRows)].map((_, rowIndex) =>
                [...Array(gridCols)].map((_, colIndex) => (
                  <Item 
                    key={`${rowIndex}-${colIndex}`} 
                    row={rowIndex} 
                    col={colIndex} 
                    planeX={x} 
                    planeY={y}
                    brand={getItemBrand(rowIndex, colIndex)}
                    iconConfig={iconConfig}
                    deviceConfig={deviceConfig}
                  />
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppleWatchMenu;
