"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PartnerCardsSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

type CollabWithImage = {
  name: string;
  src: string;
  width: number;
  height: number;
};

type CollabNameOnly = { name: string };

type Collab = CollabWithImage | CollabNameOnly;

const COLLABS_DATA: Collab[] = [
  { name: "amber", src: "/images/partner-cards/amber.png", width: 267, height: 111 },
  { name: "Revolut", src: "/images/partner-cards/revolut.png", width: 270, height: 74 },
  {
    name: "graduate talent pool",
    src: "/images/partner-cards/graduate-talent-pool.png",
    width: 299,
    height: 118,
  },
  { name: "Erasmus+", src: "/images/partner-cards/erasmus.png", width: 270, height: 98 },
  { name: "HSBC" },
  { name: "British Council" },
  { name: "Wise" },
  { name: "UNiDAYS" },
];

const collabs = [...COLLABS_DATA].sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
);

export default function PartnerCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollVhPerFlip = 1.12; // viewport heights of scroll per flip (was 2.5 — felt endless)
    const scrollVhTail   = 0.28; // short pause on last card before unpin (was 0.75)

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

      const pinScrollPx = () =>
        window.innerHeight * (flipCount * scrollVhPerFlip + scrollVhTail);

      /* ── ScrollTrigger — pin section, scrub animation ── */
      ScrollTrigger.create({
        trigger:    sectionRef.current,
        start:      "top top",
        // Function + refresh on resize keeps pin length in sync with the viewport
        end:        () => `+=${pinScrollPx()}px`,
        pin:        true,
        pinSpacing: true,
        scrub:      0.45,

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

            } else if (i === totalCards - 1 && activeIndex >= flipCount) {
              // Last card is now the frontmost — lock it perfectly centred, never flip
              gsap.set(card, { yPercent: -50, rotationX: 0, scale: 1 });

            } else {
              // Waiting cards — drift up and scale in as the card ahead flips
              const behind = i - activeIndex;
              gsap.set(card, {
                yPercent:  -50 + (behind - segProgress) * cardYOffset,
                rotationX: 0,
                scale:     1 - (behind - segProgress) * cardScaleStep,
              });
            }
          });
        },
      });
    }, sectionRef);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>

      {/* ── Card 1 — Scottish EDGE ──────────────────────────── */}
      <article className={`${styles.card} ${styles.cardEdge}`}>
        <div className={styles.cardGrid}>
          <p className={styles.text}>
            Being named Winner of the 2023 Scottish EDGE is more than an award for
            Hubble Bubble—it&apos;s a promise to students. It shows that our mission of
            honest guidance, passion-driven mentoring, and building credible
            opportunities is not only possible but recognised as innovative and
            transformative for study abroad journeys.
          </p>
          <div className={styles.partnerBlock}>
            <h3 className={styles.heading}>
              Funded by
              <br />
              Scottish Edge
            </h3>
            <Image
              src="/images/partner-cards/scottish-edge.png"
              alt="Scottish EDGE"
              width={543}
              height={198}
              className={styles.partnerLogo}
            />
          </div>
        </div>
      </article>

      {/* ── Card 2 — Bank of Scotland ───────────────────────── */}
      <article className={`${styles.card} ${styles.cardBos}`}>
        <div className={`${styles.cardGrid} ${styles.flip}`}>
          <div className={styles.partnerBlock}>
            <h3 className={styles.heading}>
              Backed by the
              <br />
              Bank of Scotland
            </h3>
            <Image
              src="/images/partner-cards/bank-of-scotland.png"
              alt="Bank of Scotland"
              width={543}
              height={227}
              className={styles.partnerLogo}
            />
          </div>
          <p className={`${styles.text} ${styles.textRight}`}>
            Supported by the Bank of Scotland, Hubble Bubble is rewriting what a
            study abroad consultancy should be. We&apos;re not here to sell quick fixes;
            we&apos;re here to challenge the norm, back student dreams with substance,
            and prove that startups with integrity can reshape futures on a global
            scale.
          </p>
        </div>
      </article>

      {/* ── Card 3 — Collaborations ─────────────────────────── */}
      <article className={`${styles.card} ${styles.cardCollab}`}>
        <div className={styles.collabInner}>
          <h3 className={styles.heading}>
            And key collaborations
            <br />
            With a lot more!
          </h3>
          <p className={styles.text}>
            From top UK universities to global scholarship bodies, trusted
            banks, housing providers, and student support organisations — our
            wide network of collaborations ensures students thrive at every stage
            abroad.
          </p>
          <div className={styles.strip}>
            {collabs.map((collab) => (
              <div key={collab.name} className={styles.collabLogo}>
                {"src" in collab ? (
                  <Image
                    src={collab.src}
                    alt={collab.name}
                    width={collab.width}
                    height={collab.height}
                    className={styles.collabLogoImage}
                  />
                ) : (
                  <span>{collab.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </article>

    </section>
  );
}
