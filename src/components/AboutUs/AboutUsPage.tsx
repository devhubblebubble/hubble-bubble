"use client";

import Link from "next/link";
import styles from "./AboutUsPage.module.scss";
import { teamMembers } from "./aboutUs.data";
import { TeamCard } from "@/components/MeetTheTeam";
import StoryTimeline from "./StoryTimeline/StoryTimeline";

export default function AboutUsPage() {
  return (
    <div className={styles.page}>

      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadLink}>Menu</Link>
        <span className={styles.breadSep}>›</span>
        <span className={styles.breadCurrent}>About Us</span>
      </nav>

      {/* ── Intro block 1 ───────────────────────────────────────────────── */}
      <section className={`${styles.introSection} reveal`}>
        <h1 className={styles.introH1}>
          We didn&apos;t{" "}
          <span className={styles.mint}>start</span>{" "}
          this to send students abroad.
        </h1>
        <p className={styles.introBod}>
          Too many students pick study destinations like they pick socks in the dark.{" "}
          <strong>We&apos;re here to fix that.</strong>{" "}
          With clarity and maybe a dash of cosmic stardust.
        </p>
      </section>

      {/* ── Intro block 2 ───────────────────────────────────────────────── */}
      <section className={`${styles.introSection} reveal`}>
        <h2 className={styles.introH2}>
          We started it so they land in the right{" "}
          <span className={styles.mint}>galaxy.</span>
        </h2>
        <p className={styles.introBod}>
          Because education isn&apos;t just a destination.{" "}
          <strong>It&apos;s an orbit worth calculating.</strong>
        </p>
      </section>

      {/* ── Team ────────────────────────────────────────────────────────── */}
      <section className={styles.teamSection}>
        <div className="reveal">
          <h2 className={styles.teamHeading}>
            Meet the{" "}
            <span className={styles.orange}>Team on Deck</span>
          </h2>
          <p className={styles.teamSub}>
            We&apos;re mentors, misfits, and former international students
            who&apos;ve made the mistakes—<strong>so you don&apos;t have to</strong>.
            We keep things real. And ridiculously supportive.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <div key={member.id} className="reveal">
              <TeamCard
                topImage={member.image}
                bottomImage={member.imageAlt ?? member.image}
                name={member.name}
                role={
                  <>
                    {member.title}{" "}
                    <em>a.k.a</em>{" "}
                    {member.aka}
                  </>
                }
                aspectRatio="3 / 4"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Story / Timeline — interactive carousel with rocket ───────── */}
      <StoryTimeline />

      {/* ── Mission ─────────────────────────────────────────────────────── */}
      <section className={`${styles.missionSection} reveal`}>
        <h2 className={styles.missionLabel}>
          why <span className={styles.mint}>we</span> are here?
        </h2>
        <p className={styles.missionAlias}>a. k. a the mission</p>
        <p className={styles.missionBody}>
          To help students discover their dream—not just go abroad, but go in
          the{" "}
          <span className={styles.orange}>right direction.</span>{" "}
          No fake promises, no fine print, just honest mentoring.
        </p>
      </section>

      {/* ── Vision ──────────────────────────────────────────────────────── */}
      <section className={`${styles.missionSection} reveal`}>
        <h2 className={styles.missionLabel}>
          and where we are{" "}
          <span className={styles.mint}>headed</span>?
        </h2>
        <p className={styles.missionAlias}>a. k. a the vision</p>
        <p className={styles.missionBody}>
          A future where every student gets real guidance, not a sales pitch.
          One where{" "}
          <span className={styles.orange}>purpose</span>{" "}
          leads the way, and{" "}
          <span className={styles.orange}>passion</span>{" "}
          powers the journey.
        </p>
      </section>

      {/* ── Student CTA ─────────────────────────────────────────────────── */}
      <section className={`${styles.ctaSection} reveal`}>
        <h2 className={styles.ctaHeading}>
          Feels right?{" "}
          <span className={styles.mint}>Lets Talk!</span>
          <br />
          We might just be the crew you need.
        </h2>
        <p className={styles.ctaSub}>
          Whether you&apos;re still figuring things out or already have a
          course in mind,{" "}
          <strong>we&apos;re here to guide the next move.</strong>
        </p>
        <div className={styles.ctaRow}>
          <Link href="/contact" className={styles.ctaPrimary}>
            Take the eligibility Test
          </Link>
          <Link href="/contact" className={styles.ctaGhost}>
            Book a call
          </Link>
        </div>
      </section>

      {/* ── Collab CTA ──────────────────────────────────────────────────── */}
      <section className={`${styles.collabSection} reveal`}>
        <h2 className={styles.ctaHeading}>
          Not here to study?
          <br />
          Let&apos;s talk{" "}
          <span className={styles.mint}>Ideas.</span>
        </h2>
        <p className={styles.ctaSub}>
          Have a unique vision or a partnership we should hear about?
          <br />
          <strong>
            We&apos;re always open to fresh synergies and meaningful
            collaborations!
          </strong>
        </p>
        <div className={styles.ctaRow}>
          <Link href="/contact?type=collab" className={styles.ctaPrimary}>
            Pitch your idea
          </Link>
        </div>
        <p className={styles.ctaEmail}>
          Or write to us directly at:{" "}
          <a href="mailto:hello@hubblebubble.uk" className={styles.emailLink}>
            hello@hubblebubble.uk
          </a>
        </p>
      </section>

    </div>
  );
}
