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

/** Order preserved for the marquee (UK business network narrative). */
const COLLABS_DATA: Collab[] = [
  { name: "Barclays Eagle Labs" },
  { name: "Revolut bank", src: "/images/partner-cards/revolut.png", width: 270, height: 74 },
  { name: "RBS Accelerator" },
  { name: "Converge" },
  { name: "Elevator Scotland" },
  { name: "Asian Business Chamber Glasgow" },
  {
    name: "Scottish EDGE",
    src: "/images/partner-cards/scottish-edge.png",
    width: 543,
    height: 198,
  },
  { name: "Scottish Gov" },
  { name: "The Challenges Group" },
  { name: "University of Dundee's Centre for Entrepreneurship" },
  { name: "The UK Law Firm" },
  { name: "Europe Enterprise Network" },
];

const collabs = COLLABS_DATA;

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

      {/* ── Card 1 — Scottish EDGE / government backing ───── */}
      <article className={`${styles.card} ${styles.cardEdge}`}>
        <div className={styles.cardGrid}>
          <p className={styles.text}>
            We won the UK&apos;s biggest start-up competition (Scottish EDGE) for
            disrupting a broken industry. Supported by TheVenturesLab as an official
            Social Enterprise, we are backed by national institutions because we
            prioritise your long-term career over short-term commissions.
          </p>
          <div className={styles.partnerBlock}>
            <h3 className={styles.heading}>
              Backed by the
              <br />
              Scottish Government
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

      {/* ── Card 2 — British Council & ICEF ───────────────── */}
      <article className={`${styles.card} ${styles.cardBos}`}>
        <div className={`${styles.cardGrid} ${styles.flip}`}>
          <div className={styles.partnerBlock}>
            <h3 className={styles.heading}>
              Certified by
              <br />
              British Council and ICEF
            </h3>
            <div className={styles.partnerLogoRow} aria-label="British Council and ICEF">
              <Image
                src="/images/herosection/accreditations/british-council.png"
                alt="British Council"
                width={118}
                height={34}
                className={styles.partnerLogoDual}
              />
              <Image
                src="/images/herosection/accreditations/icef.png"
                alt="ICEF Accredited Agency"
                width={99}
                height={34}
                className={styles.partnerLogoDual}
              />
            </div>
          </div>
          <p className={`${styles.text} ${styles.textRight}`}>
            Our entire team is trained and certified by the world&apos;s leading
            international education authorities. You get expert, unbiased guidance
            on universities and visas, ensuring your application meets the highest
            global standards.
          </p>
        </div>
      </article>

      {/* ── Card 3 — UK business network marquee ───────────── */}
      <article className={`${styles.card} ${styles.cardCollab}`}>
        <div className={styles.collabInner}>
          <h3 className={styles.heading}>
            Embedded in the UK&apos;s
            <br />
            Elite Business Network.
          </h3>
          <p className={styles.text}>
            We aren&apos;t just an agency; we are a high-growth UK enterprise. Backed
            by top-tier accelerators (Barclays Eagle Labs, RBS), leading universities,
            and national business chambers, our global infrastructure is built on the
            same institutional trust and rigorous standards as the companies we
            partner with.
          </p>
          <div
            className={styles.strip}
            aria-label="Accelerators, institutions, and enterprise partners"
          >
            <div className={styles.stripTrack}>
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

              {/* Duplicate set for seamless loop (hidden from screen readers) */}
              {collabs.map((collab) => (
                <div
                  key={`${collab.name}-dup`}
                  className={styles.collabLogo}
                  aria-hidden="true"
                >
                  {"src" in collab ? (
                    <Image
                      src={collab.src}
                      alt=""
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
        </div>
      </article>

    </section>
  );
}
