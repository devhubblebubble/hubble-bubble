"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PartnerCardsSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const collabs = [
  "amber", "Revolut", "Graduate Talent Pool",
  "Erasmus+", "HSBC", "British Council", "Wise", "UNiDAYS",
];

export default function PartnerCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards      = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      const totalCards = cards.length;           // 3
      const segmentSize   = 1 / totalCards;
      const cardYOffset   = 5;     // px% stagger between waiting cards
      const cardScaleStep = 0.075; // scale step per card behind active

      /* ── Initial stack: first card centred, rest offset + scaled ── */
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + i * cardYOffset,
          scale:     1 - i * cardScaleStep,
        });
      });

      // Only the first (totalCards-1) cards flip away.
      // The last card stays centred — it's the resting state when the section unpins.
      const flipCount = totalCards - 1; // 2 for 3 cards

      /* ── ScrollTrigger — pin section, scrub animation ── */
      ScrollTrigger.create({
        trigger:    sectionRef.current,
        start:      "top top",
        // scroll distance = one segment per flip + half a segment so the last card sits a beat
        end:        `+=${window.innerHeight * (flipCount * 2.5 + 0.75)}px`,
        pin:        true,
        pinSpacing: true,
        scrub:      1,

        onUpdate: (self) => {
          const progress    = self.progress;
          // Only count progress within the flip segments (0 → flipCount/totalCards)
          const activeIndex = Math.min(
            Math.floor(progress / segmentSize),
            flipCount, // cap at flipCount so we never "activate" beyond last flip
          );
          const segProgress =
            (progress - activeIndex * segmentSize) / segmentSize;

          cards.forEach((card, i) => {
            if (i < activeIndex) {
              // Already flipped → park above viewport
              gsap.set(card, { yPercent: -250, rotationX: 35 });

            } else if (i === activeIndex && i < flipCount) {
              // Currently flipping — animate upward
              gsap.set(card, {
                yPercent:  gsap.utils.interpolate(-50, -200, segProgress),
                rotationX: gsap.utils.interpolate(0,   35,   segProgress),
                scale: 1,
              });

            } else {
              // Waiting cards (including the permanent last card) — stay centred/stacked
              const behind = Math.max(0, i - activeIndex);
              gsap.set(card, {
                yPercent:  -50 + (behind - (i === activeIndex ? segProgress : 0)) * cardYOffset,
                rotationX: 0,
                scale:     1 - (behind - (i === activeIndex ? segProgress : 0)) * cardScaleStep,
              });
            }
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>

      {/* ── Card 1 — Scottish EDGE ──────────────────────────── */}
      <article className={`${styles.card} ${styles.cardEdge}`}>
        <div className={styles.col}>
          <div>
            <p className={styles.label}>Funded by</p>
            <h3 className={styles.heading}>
              Scottish<br />EDGE
            </h3>
          </div>
          <Image
            src="/images/logos/footer-hubblebubble.png"
            alt="Scottish Edge"
            width={280}
            height={74}
            className={styles.logo}
          />
        </div>
        <div className={`${styles.col} ${styles.colRight}`}>
          <p className={styles.text}>
            Being named Winner of the 2023 Scottish EDGE is more than an award
            for Hubble Bubble — it&apos;s a promise to students. Our mission of
            honest guidance, passion-driven mentoring, and building credible
            opportunities is recognised as innovative and transformative for
            study-abroad journeys.
          </p>
        </div>
      </article>

      {/* ── Card 2 — Bank of Scotland ───────────────────────── */}
      <article className={`${styles.card} ${styles.cardBos}`}>
        <div className={`${styles.col} ${styles.colRight}`}>
          <p className={styles.text}>
            Supported by the Bank of Scotland, Hubble Bubble is rewriting what
            a study-abroad consultancy should be. We&apos;re not here to sell
            quick fixes — we back student dreams with substance and prove that
            startups with integrity can reshape futures on a global scale.
          </p>
        </div>
        <div className={styles.col}>
          <div>
            <p className={styles.label}>Backed by</p>
            <h3 className={styles.heading}>
              Bank of<br />Scotland
            </h3>
          </div>
          <Image
            src="/images/logos/footer-hubblex.png"
            alt="Bank of Scotland"
            width={280}
            height={74}
            className={styles.logo}
          />
        </div>
      </article>

      {/* ── Card 3 — Collaborations ─────────────────────────── */}
      <article className={`${styles.card} ${styles.cardCollab}`}>
        <div className={styles.collabInner}>
          <div>
            <p className={styles.label}>Our Network</p>
            <h3 className={styles.heading}>
              Key collaborations<br />— and a lot more!
            </h3>
          </div>
          <p className={styles.text}>
            From top UK universities to global scholarship bodies, trusted
            banks, housing providers, and student support organisations — our
            wide network ensures students thrive at every stage abroad.
          </p>
          <div className={styles.strip}>
            {collabs.map((name) => (
              <div key={name} className={styles.collabLogo}>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </article>

    </section>
  );
}
