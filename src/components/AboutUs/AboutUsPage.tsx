"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./AboutUsPage.module.scss";
import { aboutCopy, timelineItems, teamMembers } from "./aboutUs.data";

export default function AboutUsPage() {
  const featured = teamMembers.slice(0, 2);

  return (
    <div className={styles.page}>

      {/* ── Hero Intro ─────────────────────────────────────────────────── */}
      <section className={styles.introSection}>
        <div className={`${styles.introBlock} reveal`}>
          <h1 className={styles.introHeading}>
            We didn&apos;t <em>start</em> this to send students abroad.
          </h1>
          <p className={styles.introBod}>{aboutCopy.heroBody}</p>
        </div>

        <div className={`${styles.introBlock} reveal`}>
          <h2 className={styles.introHeading2}>
            We started it so they land in the{" "}
            <em className={styles.orange}>right galaxy.</em>
          </h2>
          <p className={styles.introBod}>{aboutCopy.galaxy}</p>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────────────────── */}
      <section className={styles.teamSection}>
        <div className="reveal">
          <p className={styles.sectionLabel}>Meet the Team on Deck</p>
        </div>

        <div className={styles.teamGrid}>
          {featured.map((member) => (
            <article key={member.id} className={`${styles.teamCard} reveal`}>
              <div className={styles.cardPhoto}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>
                {member.title}&nbsp;
                <span className={styles.aka}>a.k.a&nbsp;</span>
                <span className={styles.akaRole}>{member.aka}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Story / Timeline ───────────────────────────────────────────── */}
      <section className={styles.storySection}>
        <div className={styles.storyLayout}>
          <div className={`${styles.storyLeft} reveal`}>
            <h2 className={styles.storyHeading}>
              From Stardust to Students: The{" "}
              <em className={styles.orange}>Hubble Bubble</em> Story
            </h2>
            <Link href="/journey" className={styles.storyBtn}>
              Read our Big Bang Theory
            </Link>
          </div>

          <div className={styles.timeline}>
            {timelineItems.map((item, i) => (
              <div key={item.id} className={`${styles.timelineItem} reveal`}>
                <div className={styles.timelineLeft}>
                  {i % 2 === 0 && (
                    <div className={styles.timelineContent}>
                      <h4 className={styles.timelineTitle}>{item.title}</h4>
                      <p className={styles.timelineDesc}>{item.description}</p>
                    </div>
                  )}
                </div>
                <div className={styles.timelineCenter}>
                  <div className={styles.timelineDot} />
                </div>
                <div className={styles.timelineRight}>
                  <div className={styles.timelineYear}>{item.year}</div>
                  {i % 2 !== 0 && (
                    <div className={styles.timelineContent}>
                      <h4 className={styles.timelineTitle}>{item.title}</h4>
                      <p className={styles.timelineDesc}>{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ────────────────────────────────────────────────────── */}
      <section className={`${styles.textSection} reveal`}>
        <h2 className={styles.textLabel}>{aboutCopy.missionTitle}</h2>
        <p className={styles.textAlias}>a. k. a the mission</p>
        <p className={styles.textBody}>
          To help students discover their dream — not just go abroad, but go in
          the <em className={styles.mint}>right direction.</em> No fake
          promises, no fine print, just honest mentoring.
        </p>
      </section>

      {/* ── Vision ─────────────────────────────────────────────────────── */}
      <section className={`${styles.textSection} reveal`}>
        <h2 className={styles.textLabel}>{aboutCopy.visionTitle}</h2>
        <p className={styles.textAlias}>a. k. a the vision</p>
        <p className={styles.textBody}>
          A future where every student gets real guidance, not a sales pitch. One
          where <em className={styles.mint}>purpose</em> leads the way, and{" "}
          <em className={styles.mint}>passion</em> powers the journey.
        </p>
      </section>

      {/* ── Student CTA ────────────────────────────────────────────────── */}
      <section className={`${styles.ctaSection} reveal`}>
        <h2 className={styles.ctaHeading}>
          Feels right?{" "}
          <em className={styles.orange}>Let&apos;s talk!</em>
          <br />
          We might just be the crew you need.
        </h2>
        <p className={styles.ctaMuted}>
          No pressure. No sales pitch. Just an honest conversation about your future.
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

      {/* ── Collab CTA ─────────────────────────────────────────────────── */}
      <section className={`${styles.collabSection} reveal`}>
        <h2 className={styles.collabHeading}>
          Not here to study?{" "}
          <em className={styles.orange}>Let&apos;s talk ideas.</em>
        </h2>
        <p className={styles.collabMuted}>
          We&apos;re open to collaborations, partnerships, and projects that align
          with our mission. If you&apos;ve got something cooking, we want to hear it.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/contact?type=collab" className={styles.ctaPrimary}>
            Pitch your idea
          </Link>
        </div>
        <p className={styles.email}>
          Or write to us directly at:{" "}
          <a href="mailto:hello@hubblebubble.uk" className={styles.emailLink}>
            hello@hubblebubble.uk
          </a>
        </p>
      </section>
    </div>
  );
}
