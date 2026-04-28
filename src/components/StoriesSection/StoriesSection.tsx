"use client";

import Link from "next/link";
import StoryRow from "@/components/StoryRow/StoryRow";
import { useCarousel } from "@/hooks/useCarousel";
import Dots from "@/components/Dots/Dots";
import styles from "./StoriesSection.module.scss";

const storyCards = [
  {
    img: "/images/testimonial/student1.webp",
    headline: "Leaving Law Behind to Tell Stories That Matter and Impact.",
    body: "Nihal thought law school was his only option. But his essays revealed something else — a writer's voice. Now he's studying literature and published in two journals.",
    linkLabel: "Read Nihal's story and journey →",
    href: "/stories",
  },
  {
    img: "/images/testimonial/student2.webp",
    headline: "Building a Mission-Driven Career from the Ground Up.",
    body: "Serah came in considering an MBA. After career mapping sessions, she launched a social innovation project — and is now studying social entrepreneurship with a scholarship at University of St. Andrews.",
    linkLabel: "Read Serah's story and journey →",
    href: "/stories",
  },
];

export default function StoriesSection() {
  const { idx, go, setPaused } = useCarousel(storyCards.length, 8000);

  return (
    <section className={styles.section} id="stories">
      <div className={styles.header}>
        <div className="reveal">
          <h2>Student Stories</h2>
        </div>
        <Link href="/stories" className={styles.viewAll}>
          View all stories
        </Link>
      </div>

      {/* Carousel wrapper */}
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
            <div className={styles.slide} key={s.headline}>
              <StoryRow {...s} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dotsWrap}>
        <Dots
          count={storyCards.length}
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
