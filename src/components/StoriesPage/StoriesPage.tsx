"use client";

import { useState } from "react";
import StoryRow from "@/components/StoryRow/StoryRow";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./StoriesPage.module.scss";

const ALL_STORIES = [
  {
    id: "nihal",
    img: "/images/testimonial/student1.webp",
    headline: "Leaving Law Behind to Tell Stories That Matter and Impact.",
    body: "Nihal thought law school was his only option. But his essays revealed something else — a writer's voice. Now he's studying literature and published in two journals.",
    linkLabel: "Read Nihal's story and journey →",
    href: "#",
  },
  {
    id: "serah",
    img: "/images/testimonial/student2.webp",
    headline: "Building a Mission-Driven Career from the Ground Up.",
    body: "Serah came in considering an MBA. After career mapping sessions, she launched a social innovation project — and is now studying social entrepreneurship with a scholarship at University of St. Andrews.",
    linkLabel: "Read Serah's story and journey →",
    href: "#",
  },
  {
    id: "jessica",
    img: "/images/testimonial/student3.webp",
    headline: "Transforming Passion into Impactful Solutions.",
    body: "Jessica always had a flair for design. With guidance from mentors, she pivoted from graphic design to creating sustainable fashion, and she is now enrolled in a program at the Fashion Institute of Technology focusing on eco-friendly practices.",
    linkLabel: "Discover Jessica's evolution and insights →",
    href: "#",
  },
  {
    id: "amir",
    img: "/images/testimonial/student4.webp",
    headline: "Harnessing Technology for Social Good.",
    body: "Amir had a background in computer science. Inspired by a hackathon, he developed an app that connects underserved communities with local services, and he is now pursuing a degree in social impact technology at Stanford University.",
    linkLabel: "Explore Amir's project and vision →",
    href: "#",
  },
  {
    id: "priya",
    img: "/images/testimonial/student5.webp",
    headline: "She Didn't Know What She Wanted. Until She Did.",
    body: "Priya came in with no clear direction and a lot of pressure from home. We didn't push a path on her — we helped her discover one. The result? A course she's passionate about at a university that fits her perfectly.",
    linkLabel: "Read Priya's story and journey →",
    href: "#",
  },
  {
    id: "maya",
    img: "/images/testimonial/student6.webp",
    headline: "Three Countries, One Right Choice.",
    body: "Maya had shortlisted universities across three countries and was completely overwhelmed. We mapped out her priorities and guided her toward the one destination that actually matched her goals — not just the rankings.",
    linkLabel: "Read Maya's story and journey →",
    href: "#",
  },
];

const PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(ALL_STORIES.length / PER_PAGE);

export default function StoriesPage() {
  const [page, setPage] = useState(1);
  const stories = ALL_STORIES.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.page}>

      <Breadcrumb current="Stories" inset />

      {/* Title */}
      <h1 className={styles.title}>Stories</h1>

      {/* Story rows — reusable StoryRow component */}
      <div className={styles.list}>
        {stories.map((s, i) => (
          <StoryRow key={s.id} {...s} />
        ))}
      </div>

      {/* Pagination */}
      {TOTAL_PAGES > 1 && (
        <nav className={styles.pagination} aria-label="Pages">
          <button
            className={styles.pageArrow}
            onClick={() => goTo(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ""}`}
              onClick={() => goTo(p)}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ))}

          <button
            className={styles.pageArrow}
            onClick={() => goTo(Math.min(TOTAL_PAGES, page + 1))}
            disabled={page === TOTAL_PAGES}
            aria-label="Next page"
          >
            ›
          </button>
        </nav>
      )}
    </div>
  );
}
