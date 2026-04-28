"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ServicesPage.module.scss";
import {
  addOnServiceCards,
  hubbleServiceCards,
  servicesPageCopy,
} from "./servicesPage.data";

type TabId = "hubble" | "addon";

export default function ServicesPage() {
  const [tab, setTab] = useState<TabId>("hubble");
  const cards = tab === "hubble" ? hubbleServiceCards : addOnServiceCards;

  return (
    <div className={styles.page}>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="reveal">
          <p className={styles.eyebrow}>Our Services</p>
          <h1>{servicesPageCopy.heroTitle}</h1>
          <p className={styles.heroSub}>{servicesPageCopy.heroSubtitle}</p>
        </div>
      </section>

      {/* ── Cards ──────────────────────────────────────────────────────── */}
      <section className={styles.content} aria-label="Service listings">
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Service categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "hubble"}
            className={tab === "hubble" ? styles.tabActive : styles.tabInactive}
            onClick={() => setTab("hubble")}
          >
            {servicesPageCopy.tabs.primary}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "addon"}
            className={tab === "addon" ? styles.tabActive : styles.tabInactive}
            onClick={() => setTab("addon")}
          >
            {servicesPageCopy.tabs.secondary}
          </button>
        </div>

        <div className={styles.cardGrid} role="tabpanel">
          {cards.map((card) => (
            <article key={card.id} className={`${styles.card} reveal`}>
              <div className={styles.cardBody}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
              <Link
                href="/contact"
                className={styles.cardAction}
                aria-label={`Learn more: ${card.title}`}
              >
                <span className={styles.cardChevron} aria-hidden>
                  ›
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className={`${styles.cta} reveal`}>
        <h2 className={styles.ctaTitle}>
          Not sure which service is right for you?
        </h2>
        <p className={styles.ctaText}>
          Book a free discovery call. We&apos;ll figure it out together.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/contact" className={styles.ctaPrimary}>
            Book a call
          </Link>
          <Link href="/eligibility" className={styles.ctaGhost}>
            Take the eligibility Test
          </Link>
        </div>
      </section>
    </div>
  );
}
