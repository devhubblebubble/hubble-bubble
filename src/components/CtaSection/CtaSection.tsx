"use client";

import Link from "next/link";
import { useState } from "react";
import EligibilityModal from "@/components/EligibilityModal";
import styles from "./CtaSection.module.scss";

export default function CtaSection() {
  const [eligibilityOpen, setEligibilityOpen] = useState(false);

  return (
    <>
      <section className={styles.section} id="contact">
        <div className={styles.grid}>
          <div className={`${styles.figure} reveal`} />
          <div className={`${styles.text} reveal`}>
            <h2>
              Still not sure<br />where to start?<br />That's why we're here!
            </h2>
            <p>Our experts have guided hundreds of students from uncertainty to success. Now it's your turn.</p>
            <div className={styles.buttons}>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => setEligibilityOpen(true)}
              >
                Take the eligibility Test
              </button>
              <Link href="/contact" className={`${styles.btn} ${styles.btnGhost}`}>
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {eligibilityOpen && (
        <EligibilityModal isOpen={eligibilityOpen} onClose={() => setEligibilityOpen(false)} />
      )}
    </>
  );
}
