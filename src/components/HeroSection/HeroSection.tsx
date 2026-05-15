"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EligibilityModal from "@/components/EligibilityModal";
import { useCarousel } from "@/hooks/useCarousel";
import styles from "./HeroSection.module.scss";
import MilkyWay from "../Background/Milkyway";

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
  const { idx, setPaused } = useCarousel(students.length, 6500);

  return (
    <>
      <section className={`${styles.hero} reveal`} id="top">
      {/* <MilkyWay /> */}
        <div className={styles.grid}>
          <div className="reveal">
            <h1 className={styles.headline}>
              We are the<br /><span className={styles.accent}>Anti-Agent Agents!</span><br />We Actually Care<br />Where You End Up.
            </h1>
            <div className={styles.rule} />
            <p className={styles.sub}>
              <span className={styles.subMuted}>So stop guessing. </span>
              <span className={styles.subHighlight}>Let&apos;s find the degree</span>
              <br />
              <span className={styles.subMuted}>that fits your personality and passion!</span>
            </p>
           
            <div className={styles.accred}>
              <div className={styles.accredLabel}>Accredited by:</div>
              <div className={styles.accredRow}>
                <Image
                  src="/images/herosection/accreditations/ucas.png"
                  alt="UCAS"
                  width={115}
                  height={34}
                  className={styles.accredLogo}
                />
                <Image
                  src="/images/herosection/accreditations/british-council.png"
                  alt="British Council"
                  width={118}
                  height={34}
                  className={styles.accredLogo}
                />
                <Image
                  src="/images/herosection/accreditations/icef.png"
                  alt="ICEF Accredited Agency"
                  width={99}
                  height={34}
                  className={styles.accredLogo}
                />
              </div>
            </div>
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
