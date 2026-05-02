"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import styles from './JourneySection.module.scss';
const AtlasGlobeEmbed = dynamic(() => import("./AtlasGlobeEmbed"), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', background: 'transparent' }} />
});


interface Step {
  id: string;
  number: string;
  title: string;
  titleHighlight: string;
  description: string;
  tags: string[];
}

const steps: Step[] = [
  {
    id: "01",
    number: "01",
    title: "Your journey starts with the",
    titleHighlight: "real you.",
    description:
      'While other consultants shove random degrees down your Oesophagus, we actually care about who you are. Our Magic-Spell "Revelio" blends your passion, dreams, and skillset into one powerful profile so we can finally understand the complete, complex, amazing human that is you.',
    tags: ["Personality Trait", "Skillset Audit", "Career Blueprint"],
  },
  {
    id: "02",
    number: "02",
    title: "Find your",
    titleHighlight: "real path.",
    description:
      "No more guessing games. We map your unique profile to the world's best-fit universities and courses. It's not about where everyone is going—it's about where you will thrive, grow, and conquer.",
    tags: ["University Search", "Course Selection", "Application Strategy"],
  },
  {
    id: "03",
    number: "03",
    title: "Fuel your",
    titleHighlight: "real growth.",
    description:
      "From visas to pre-departure, we're with you till the very end. But our support doesn't stop at the airport. We provide career guidance and networking to ensure your international journey turns into a lifetime of success.",
    tags: ["Visa Support", "Pre-departure", "Career Guidance"],
  },
];

export default function JourneySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  const computeAndApplyProgress = useCallback(() => {
    rafRef.current = null;
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const scrolled = -rect.top;
    const totalScroll = sectionHeight - window.innerHeight;
    if (totalScroll <= 0) return;

    const rawProgress = Math.max(0, Math.min(1, scrolled / totalScroll));

    // Skip near-identical updates so we don't churn React/three.js on every
    // sub-pixel scroll event. Always honor the 0/1 endpoints.
    const isEndpoint = rawProgress === 0 || rawProgress === 1;
    if (!isEndpoint && Math.abs(rawProgress - lastProgressRef.current) < 0.001) {
      return;
    }
    lastProgressRef.current = rawProgress;
    setProgress(rawProgress);

    const index = Math.min(
      Math.floor(rawProgress * steps.length * 0.999),
      steps.length - 1,
    );
    setActiveIndex((prev) => (prev !== index ? index : prev));
  }, []);

  const handleScroll = useCallback(() => {
    // Coalesce rapid scroll events into a single update per animation frame.
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(computeAndApplyProgress);
  }, [computeAndApplyProgress]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    computeAndApplyProgress();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [handleScroll, computeAndApplyProgress]);

  const currentStep = steps[activeIndex];

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ height: `${(steps.length + 1) * 100}vh` }}
    >
      <div className={styles.stickyViewport}>

        <div className={styles.layout}>
          <div className={styles.globeWrapper}>
            <AtlasGlobeEmbed rotation={progress} className={styles.globe} />
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.slideContent}>
              <span className={styles.stepNumber}>
                {currentStep.number}
              </span>

              <h2 className={styles.stepTitle}>
                {currentStep.title}{" "}
                <span className={styles.titleHighlight}>
                  {currentStep.titleHighlight}
                </span>
              </h2>

              <p className={styles.description}>
                {currentStep.description}
              </p>

              <span className={styles.keyOutputsLabel}>
                Key Outputs
              </span>

              <div className={styles.tagCloud}>
                {currentStep.tags.map((tag) => (
                  <span
                    key={tag}
                    className={styles.tagButton}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.progressWrapper}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressLine}
                  style={{ height: `${progress * 100}%` }}
                />
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

        <div className={styles.paginationDots}>
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
