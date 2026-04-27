"use client";

import Image from "next/image";
import Dots from "@/components/Dots/Dots";
import { useCarousel } from "@/hooks/useCarousel";
import styles from "./TestimonialsSection.module.scss";

const testimonials = [
  {
    img1: "/images/testimonial/student3.webp",
    img2: "/images/testimonial/student4.webp",
    quote:
      "I walked in with plans to study engineering. Through conversations and career mapping, I realised game design was where I truly belonged. I can't thank the team enough for helping me see my potential clearly and guiding me every step of the way — from building my portfolio to writing my personal statement.",
    name: "Rhea Menon",
    course: "BA (Hons) Game Design",
    uni: "University of the Arts London",
    large: false,
  },
  {
    img1: "/images/testimonial/student4.webp",
    img2: "/images/testimonial/student3.webp",
    quote: "Hubble Bubble didn't just help with applications — they helped me discover why I was applying.",
    name: "Priya Sinha",
    course: "MSc Social Innovation and Entrepreneurship",
    uni: "University of Sussex",
    large: true,
  },
];

export default function TestimonialsSection() {
  const { idx, go, setPaused } = useCarousel(testimonials.length, 7000);

  return (
    <section className={styles.section}>
      <div className="reveal">
        <h2>They Made It. So Can You!</h2>
        <p className={styles.lead}>
          Hear from our students who turned uncertainty into confidence and found their place in the world.
        </p>
      </div>

      <div
        className={styles.trackWrap}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {testimonials.map((t) => (
            <article className={styles.testimonial} key={t.name}>
              <div className={styles.photos}>
                <div className={styles.photoBack}>
                  <Image src={t.img1} alt="" fill style={{ objectFit: "cover" }} sizes="400px" />
                </div>
                <div className={styles.photoFront}>
                  <Image src={t.img2} alt="" fill style={{ objectFit: "cover" }} sizes="400px" />
                </div>
              </div>
              <div className={styles.quote}>
                <p className={`${styles.quoteText} ${t.large ? styles.quoteLarge : ""}`}>
                  {t.quote}
                </p>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.course}>{t.course}</div>
                <div className={styles.uni}>{t.uni}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <Dots
          count={testimonials.length}
          idx={idx}
          onPrev={() => go(idx - 1)}
          onNext={() => go(idx + 1)}
          onDot={go}
          noMargin
        />
      </div>
    </section>
  );
}
