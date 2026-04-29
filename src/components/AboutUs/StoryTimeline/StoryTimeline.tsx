"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { timelineItems } from "../aboutUs.data";
import styles from "./StoryTimeline.module.scss";

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const prevIdx = useRef(0);

  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [animKey, setAnimKey] = useState(0);

  const total = timelineItems.length;
  const item = timelineItems[idx];
  const progress = total > 1 ? idx / (total - 1) : 0;

  /* ── Scroll → item index ── */
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;                          // px scrolled into section
      const scrollable = rect.height - window.innerHeight; // total scrollable distance
      const pct = Math.max(0, Math.min(1, scrolled / scrollable));
      const next = Math.min(total - 1, Math.round(pct * (total - 1)));

      if (next !== prevIdx.current) {
        setDirection(next > prevIdx.current ? "up" : "down");
        setIdx(next);
        setAnimKey((k) => k + 1);
        prevIdx.current = next;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [total]);

  return (
    /* Section height = total items × 100vh — gives each item its own scroll "page" */
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ height: `${total * 100}vh` }}
    >
      {/* Sticky frame — stays in view while the section scrolls past */}
      <div className={styles.sticky}>
        <div className={styles.layout}>

          {/* ── Left — heading ──────────────────────────────────── */}
          <div className={styles.left}>
            <h2 className={styles.heading}>
              From Stardust to Students:{" "}
              <span className={styles.mint}>The Hubble Bubble</span>{" "}
              Story
            </h2>
            <Link href="/about" className={styles.btn}>
              Read our Big Bang Theory
            </Link>
          </div>

          {/* ── Right — slide content + rocket ──────────────────── */}
          <div className={styles.right}>

            {/* Vertical slide viewport */}
            <div className={styles.sliderWrap}>
              {/* Re-keyed on every change so CSS animation replays */}
              <div
                key={animKey}
                className={`${styles.slide} ${
                  direction === "up" ? styles.slideFromBottom : styles.slideFromTop
                }`}
              >
                {/* Year pill */}
                <div className={styles.yearPill}>{item.year}</div>

                {/* Connector */}
                <div className={styles.connector} />

                {/* Crosshair node */}
                <div className={styles.node}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="#78E1C5" strokeWidth="1.5" />
                    <line x1="9" y1="2" x2="9" y2="16" stroke="#78E1C5" strokeWidth="1" />
                    <line x1="2" y1="9" x2="16" y2="9" stroke="#78E1C5" strokeWidth="1" />
                  </svg>
                </div>

                {/* Connector */}
                <div className={styles.connector} />

                {/* Text */}
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.description}</p>
              </div>
            </div>

            {/* ── Rocket progress bar ──────────────────────────── */}
            <div className={styles.progressWrapper}>
              <div className={styles.progressBar}>
                {/* Dim full track is the progressBar background itself */}

                {/* Bright fill — grows upward from bottom */}
                <div
                  className={styles.progressLine}
                  style={{ height: `${progress * 100}%` }}
                />

                {/* Rocket — climbs from bottom (0%) to top (100%) */}
                <div
                  className={styles.rocketContainer}
                  style={{ bottom: `calc(${progress * 100}% - 24px)` }}
                >
                  <div className={styles.rocketIcon}>
                    <Image
                      src="/images/journey/rocket.png"
                      alt="Rocket"
                      width={36}
                      height={48}
                      priority
                    />
                    <div className={styles.rocketFlame} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
