"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-cards";

import Dots from "@/components/Dots/Dots";
import styles from "./TestimonialsSection.module.scss";

const testimonials = [
  {
    img: "/images/testimonial/student3.webp",
    quote:
      "I walked in with plans to study engineering. Through conversations and career mapping, I realised game design was where I truly belonged. I can't thank the team enough for helping me see my potential clearly and guiding me every step of the way — from building my portfolio to writing my personal statement.",
    name: "Rhea Menon",
    course: "BA (Hons) Game Design",
    uni: "University of the Arts London",
    large: false,
  },
  {
    img: "/images/testimonial/student4.webp",
    quote: "Hubble Bubble didn't just help with applications — they helped me discover why I was applying.",
    name: "Priya Sinha",
    course: "MSc Social Innovation and Entrepreneurship",
    uni: "University of Sussex",
    large: true,
  },
];

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const go = (i: number) => {
    if (!swiperRef.current) return;
    const count = testimonials.length;
    const next = ((i % count) + count) % count;
    swiperRef.current.slideTo(next);
  };

  const t = testimonials[idx];

  return (
    <section className={styles.section}>
      <div className="reveal">
        <h2>They Made It. So Can You!</h2>
        <p className={styles.lead}>
          Hear from our students who turned uncertainty into confidence and found their place in the world.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.cardsWrapper}>
          <div className={styles.cardsContainer}>
            <Swiper
              effect="cards"
              grabCursor
              modules={[EffectCards]}
              onSwiper={(s) => (swiperRef.current = s)}
              onSlideChange={(s) => setIdx(s.activeIndex)}
              className={styles.swiper}
            >
              {testimonials.map((tm) => (
                <SwiperSlide key={tm.name} className={styles.card}>
                  <Image
                    src={tm.img}
                    alt={tm.name}
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1100px) 76vw, min(440px, 48vw)"
                    style={{ objectFit: "cover" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
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
