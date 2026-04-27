"use client";

import Link from "next/link";
import Dots from "@/components/Dots/Dots";
import { useCarousel } from "@/hooks/useCarousel";
import styles from "./StoriesSection.module.scss";

const storyCards = [
  {
    image: "/images/testimonial/student1.webp",
    headline: "Leaving Law Behind to Tell Stories That Matter and Impact.",
    body: "Nihal thought law school was his only option. But his essays revealed something else — a writer's voice. Now he's studying literature and published in two journals.",
    link: "Read Nihal's story and journey →",
  },
  {
    image: "/images/testimonial/student2.webp",
    headline: "Building a Mission-Driven Career from the Ground Up.",
    body: "Serah came in considering an MBA. After career mapping sessions, she launched a social innovation project — and is now studying social entrepreneurship with a scholarship at University of St. Andrews.",
    link: "Read Serah's story and journey →",
  },
];

export default function StoriesSection() {
  const { idx, go, setPaused } = useCarousel(storyCards.length, 7000);

  return (
    <section className={styles.section} id="stories">
      <div
        className={styles.trackWrap}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {storyCards.map((s) => (
            <article className={`${styles.story} reveal`} key={s.headline}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url('${s.image}')` }}
              />
              <div>
                <h3 className={styles.headline}>{s.headline}</h3>
                <div className={styles.rule} />
                <p className={styles.body}>{s.body}</p>
                <Link href="/stories" className={styles.link}>
                  {s.link}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <Dots
          count={storyCards.length}
          idx={idx}
          onPrev={() => go(idx - 1)}
          onNext={() => go(idx + 1)}
          onDot={go}
          noMargin
        />
        <Link href="/stories" className={styles.viewAll}>
          View all stories
        </Link>
      </div>
    </section>
  );
}
