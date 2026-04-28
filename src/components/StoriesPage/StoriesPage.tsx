"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./StoriesPage.module.scss";

const stories = [
  {
    id: "nihal",
    img: "/images/testimonial/student1.webp",
    tag: "Law → Literature",
    name: "Nihal Sharma",
    headline: "Leaving Law Behind to Tell Stories That Matter.",
    body: "Nihal thought law school was his only option — it was what everyone expected. Through deep-dive career mapping sessions with us, his essays revealed something else entirely: a writer's voice waiting to be heard. Now he studies literature and has been published in two academic journals.",
    uni: "University of Edinburgh",
    course: "MA English Literature",
    year: "2023",
  },
  {
    id: "serah",
    img: "/images/testimonial/student2.webp",
    tag: "MBA → Social Impact",
    name: "Serah Thomas",
    headline: "Building a Mission-Driven Career from the Ground Up.",
    body: "Serah came in considering an MBA because that's what successful people did, right? After career mapping, she launched a social innovation project, secured a full scholarship, and is now studying social entrepreneurship at the University of St. Andrews.",
    uni: "University of St. Andrews",
    course: "MSc Social Innovation",
    year: "2023",
  },
  {
    id: "rhea",
    img: "/images/testimonial/student3.webp",
    tag: "Engineering → Game Design",
    name: "Rhea Menon",
    headline: "From Engineering Plans to Game Design Dreams.",
    body: "Rhea walked in with a plan to study engineering — a safe, sensible choice. Through honest conversations and portfolio work, she discovered game design was where she truly belonged. We helped her build her portfolio and write her personal statement from scratch.",
    uni: "University of the Arts London",
    course: "BA (Hons) Game Design",
    year: "2024",
  },
  {
    id: "priya",
    img: "/images/testimonial/student4.webp",
    tag: "Lost → Found",
    name: "Priya Sinha",
    headline: "She Didn't Know What She Wanted. Until She Did.",
    body: "Priya came in with no clear direction and a lot of pressure from home. We didn't push a path on her — we helped her discover one. The result? A course she's passionate about at a university that was perfect for where she is in life.",
    uni: "University of Sussex",
    course: "MSc Social Innovation and Entrepreneurship",
    year: "2024",
  },
  {
    id: "arjun",
    img: "/images/testimonial/student5.webp",
    tag: "Finance → Psychology",
    name: "Arjun Patel",
    headline: "Numbers Were Safe. People Were His Passion.",
    body: "Arjun had been studying finance because it seemed secure. But every conversation kept circling back to human behaviour. We helped him pivot into psychology, find the right programme, and write an application that got him multiple offers.",
    uni: "King's College London",
    course: "BSc Psychology",
    year: "2024",
  },
  {
    id: "maya",
    img: "/images/testimonial/student6.webp",
    tag: "Confusion → Clarity",
    name: "Maya Krishnan",
    headline: "Three Countries, One Right Choice.",
    body: "Maya had shortlisted universities across three countries and was completely overwhelmed. We mapped out her priorities, helped her ask the right questions, and guided her toward the one destination that actually matched her goals — not just the rankings.",
    uni: "University of Glasgow",
    course: "MEng Biomedical Engineering",
    year: "2023",
  },
];

export default function StoriesPage() {
  return (
    <div className={styles.page}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="reveal">
          <p className={styles.heroEyebrow}>Student Stories</p>
          <h1 className={styles.heroTitle}>
            They Made It.{" "}
            <em className={styles.orange}>So Can You.</em>
          </h1>
          <p className={styles.heroLead}>
            Real students. Real journeys. Zero sales pitch. Every story here is
            about someone who was exactly where you are — uncertain, pressured, or
            just plain lost — and found their way.
          </p>
        </div>
      </section>

      {/* ── Stories Grid ─────────────────────────────────────────────────── */}
      <section className={styles.grid}>
        {stories.map((s, i) => (
          <article
            key={s.id}
            className={`${styles.card} ${i === 0 ? styles.featured : ""} reveal`}
          >
            <div className={styles.cardPhoto}>
              <Image
                src={s.img}
                alt={s.name}
                fill
                sizes={i === 0 ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 30vw"}
                style={{ objectFit: "cover" }}
              />
              <span className={styles.tag}>{s.tag}</span>
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.cardHeadline}>{s.headline}</h2>
              <p className={styles.cardText}>{s.body}</p>
              <div className={styles.cardMeta}>
                <span className={styles.metaName}>{s.name}</span>
                <span className={styles.metaCourse}>{s.course}</span>
                <span className={styles.metaUni}>{s.uni}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className={`${styles.cta} reveal`}>
        <h2 className={styles.ctaTitle}>
          Your story could be{" "}
          <em className={styles.orange}>next.</em>
        </h2>
        <p className={styles.ctaLead}>
          Start with a free eligibility check. No commitment, no hard sell —
          just an honest conversation about where you could go.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/eligibility" className={styles.ctaPrimary}>
            Take the eligibility Test
          </Link>
          <Link href="/contact" className={styles.ctaGhost}>
            Book a call
          </Link>
        </div>
      </section>
    </div>
  );
}
