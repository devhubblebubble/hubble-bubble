"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EligibilityModal from "@/components/EligibilityModal";
import Dots from "@/components/Dots/Dots";
import { useCarousel } from "@/hooks/useCarousel";
import styles from "./HeroSection.module.scss";

const students = [
  {
    name: "Jagadesh Kaliappan",
    course: "MSc. Artificial Intelligence in Games",
    flag: "🇬🇧",
    linkedin: false,
    admits: [
      { type: "img" as const, src: "/images/impact/cambridge.png", alt: "Cambridge" },
      { type: "text" as const, label: "NORTHUMBRIA" },
      { type: "img" as const, src: "/images/impact/cambridge.png", alt: "Cambridge" },
      { type: "img" as const, src: "/images/impact/dundee.png", alt: "Durham" },
    ],
  },
  {
    name: "Rupsee Padhi",
    course: "MSc. Social Innovation & Entrepreneurship",
    flag: "🇬🇧",
    linkedin: true,
    admits: [
      { type: "img" as const, src: "/images/impact/cambridge.png", alt: "Cambridge" },
      { type: "text" as const, label: "ST ANDREWS" },
      { type: "img" as const, src: "/images/impact/dundee.png", alt: "Durham" },
      { type: "text" as const, label: "SUSSEX" },
    ],
  },
  {
    name: "Amir Shah",
    course: "BA (Hons) Game Design",
    flag: "🇬🇧",
    linkedin: true,
    admits: [
      { type: "img" as const, src: "/images/impact/dundee.png", alt: "Durham" },
      { type: "img" as const, src: "/images/impact/cambridge.png", alt: "Cambridge" },
      { type: "text" as const, label: "UAL" },
      { type: "text" as const, label: "GOLDSMITHS" },
    ],
  },
];

export default function HeroSection() {
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const { idx, go, setPaused } = useCarousel(students.length, 6500);

  return (
    <>
      <section className={`${styles.hero} reveal`} id="top">
        <div className={styles.grid}>
          <div className="reveal">
            <h1 className={styles.headline}>
              We are the<br />Anti-Agent Agents!<br />We Actually Care<br />Where You End Up.
            </h1>
            <div className={styles.rule} />
            <p className={styles.sub}>
              So stop guessing. Let's find the degree<br />that fits your personality and passion!
            </p>
            <div className={styles.ctas}>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => setEligibilityOpen(true)}
              >
                Take the eligibility Test
              </button>
              <Link href="/contact" className={`${styles.btn} ${styles.btnGhost}`}>
                Book a call
              </Link>
            </div>
            <div className={styles.accred}>
              <div className={styles.accredLabel}>Accredited by:</div>
              <div className={styles.accredRow}>
                <span className={styles.accredWordmark}>UCAS</span>
                <span className={styles.accredWordmark}>BAC</span>
                <Image
                  src="/images/herosection/accreditations/icef.png"
                  alt="ICEF"
                  width={99}
                  height={34}
                  className={styles.icefLogo}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.right} reveal`}>
            <div
              className={styles.carousel}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className={styles.track}
                style={{ transform: `translateX(-${idx * 100}%)` }}
              >
                {students.map((s) => (
                  <article className={styles.card} key={s.name}>
                    <div className={styles.photoWrap}>
                      <div
                        className={styles.photo}
                        style={{ backgroundImage: "url('/images/impact/dp.png')" }}
                      />
                      <div className={styles.flag}>{s.flag}</div>
                    </div>
                    <div className={styles.name}>
                      {s.name}
                      {s.linkedin && <span className={styles.linkedinPill}>in</span>}
                    </div>
                    <div className={styles.course}>{s.course}</div>
                    <div className={styles.admitsLabel}>Admits:</div>
                    <div className={styles.admits}>
                      {s.admits.map((a, i) =>
                        a.type === "img" ? (
                          <Image
                            key={i}
                            src={a.src!}
                            alt={a.alt!}
                            width={160}
                            height={56}
                            className={styles.admitImg}
                          />
                        ) : (
                          <span key={i} className={styles.admitWordmark}>
                            {a.label}
                          </span>
                        )
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <Dots
                count={students.length}
                idx={idx}
                onPrev={() => go(idx - 1)}
                onNext={() => go(idx + 1)}
                onDot={go}
              />
            </div>
          </div>
        </div>
      </section>

      {eligibilityOpen && (
        <EligibilityModal isOpen={eligibilityOpen} onClose={() => setEligibilityOpen(false)} />
      )}
    </>
  );
}
