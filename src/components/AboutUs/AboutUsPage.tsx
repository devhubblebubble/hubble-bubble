"use client";

import Link from "next/link";
import styles from "./AboutUsPage.module.scss";
import {
  aboutCopy,
  aboutNavLinks,
  figmaAssetReference,
  timelineItems,
  teamMembers,
} from "./aboutUs.data";

export default function AboutUsPage() {
  const featured = teamMembers.slice(0, 2);
  const support = teamMembers.slice(2);

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.logo} aria-label="Go to homepage">
          <img src={figmaAssetReference.logo} alt="Hubble Bubble" />
        </Link>
        <nav className={styles.desktopNav} aria-label="Primary">
          {aboutNavLinks.map((item) => (
            <Link
              key={`desktop-${item.label}`}
              href={item.href}
              className={item.active ? styles.navActive : styles.navItem}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button className={styles.menuButton} type="button" aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      <section className={styles.hero}>
        <h1>
          We didn&apos;t <em>start</em> this to send students abroad.
        </h1>
        <p>{aboutCopy.heroBody}</p>
      </section>

      <section className={styles.statement}>
        <h2>
          We started it so they land in the right <em className={styles.mint}>galaxy.</em>
        </h2>
      </section>

      <section className={styles.teamSection} aria-labelledby="about-team-heading">
        <h2 id="about-team-heading">
          The <em>Team on Deck</em>
        </h2>
        <p className={styles.teamLead}>
          We&apos;re mentors, misfits, and former international students who&apos;ve made
          the mistakes-so you don&apos;t have to. We keep things real and ridiculously
          supportive.
        </p>

        <div className={styles.featuredGrid}>
          {featured.map((member) => (
            <article key={member.id} className={styles.featuredCard}>
              <div className={styles.cardImageWrap}>
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>
                <span>{member.title}</span>
                <small>a.k.a</small>
                <strong>{member.aka}</strong>
              </p>
            </article>
          ))}
        </div>

        <div className={styles.supportGrid}>
          {support.map((member) => (
            <article key={member.id} className={styles.supportCard}>
              <div className={styles.cardImageWrap}>
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.title}</p>
              <small>a.k.a {member.aka}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.timelineSection} aria-labelledby="timeline-heading">
        <h2 id="timeline-heading">
          From Stardust to Students: The <em>Hubble Bubble</em> Story
        </h2>

        <ol className={styles.timeline}>
          {timelineItems.map((item) => (
            <li key={item.id} className={styles.timelineItem}>
              <p className={styles.year}>{item.year}</p>
              <div className={styles.dot} aria-hidden />
              <article>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </li>
          ))}
        </ol>

        <Link href="/journey" className={styles.storyButton}>
          read our Big Bang Theory
        </Link>
      </section>

      <section className={styles.textSection}>
        <h2>
          <span>{aboutCopy.missionTitle}</span>
        </h2>
        <p className={styles.alias}>
          {aboutCopy.missionKicker}
          <br />
          {aboutCopy.missionSubtitle}
        </p>
        <p>
          To help students discover their dream-not just go abroad, but go in the{" "}
          <em className={styles.mint}>right direction.</em> No fake promises, no fine print,
          just honest mentoring.
        </p>
      </section>

      <section className={styles.textSection}>
        <h2>
          <span>{aboutCopy.visionTitle}</span>
        </h2>
        <p className={styles.alias}>
          {aboutCopy.visionKicker}
          <br />
          {aboutCopy.visionSubtitle}
        </p>
        <p>
          A future where every student gets real guidance, not a sales pitch. One
          where <em className={styles.mint}>purpose</em> leads the way, and{" "}
          <em className={styles.mint}>passion</em> powers the journey.
        </p>
      </section>

      <section className={styles.finalSection}>
        <h2>{aboutCopy.finalTitle}</h2>
        <p>
          We might just be the <em className={styles.mint}>crew</em> you need.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/eligibility" className={styles.primaryCta}>
            Take the eligibility Test
          </Link>
          <Link href="/contact" className={styles.ghostCta}>
            Talk to us
          </Link>
        </div>
      </section>

      <nav className={styles.bottomNav} aria-label="Primary">
        {aboutNavLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={item.active ? styles.navActive : styles.navItem}
            aria-current={item.active ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
