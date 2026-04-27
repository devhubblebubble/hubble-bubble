import Image from "next/image";
import styles from "./PartnerCardsSection.module.scss";

const collabs = ["amber", "Revolut", "graduate talent pool", "Erasmus+", "HSBC", "British Council", "Wise", "UNiDAYS"];

export default function PartnerCardsSection() {
  return (
    <section className={styles.section} id="about">
      <article className={`${styles.card} ${styles.cardEdge} reveal`}>
        <div className={styles.grid}>
          <p className={styles.text}>
            Being named Winner of the 2023 Scottish EDGE is more than an award for Hubble Bubble—it's a promise
            to students. It shows that our mission of honest guidance, passion-driven mentoring, and building
            credible opportunities is not only possible but recognised as innovative and transformative for study
            abroad journeys.
          </p>
          <div>
            <h3 className={styles.heading}>
              Funded by<br />Scottish Edge
            </h3>
            <Image
              src="/images/logos/footer-hubblebubble.png"
              alt="Scottish Edge"
              width={460}
              height={120}
              className={styles.logo}
            />
          </div>
        </div>
      </article>

      <article className={`${styles.card} ${styles.cardBos} reveal`}>
        <div className={`${styles.grid} ${styles.gridFlip}`}>
          <div>
            <h3 className={styles.heading}>
              Backed by the<br />Bank of Scotland
            </h3>
            <Image
              src="/images/logos/footer-hubblex.png"
              alt="Bank of Scotland"
              width={460}
              height={120}
              className={styles.logo}
            />
          </div>
          <p className={`${styles.text} ${styles.textRight}`}>
            Supported by the Bank of Scotland, Hubble Bubble is rewriting what a study abroad consultancy should
            be. We're not here to sell quick fixes; we're here to challenge the norm, back student dreams with
            substance, and prove that startups with integrity can reshape futures on a global scale.
          </p>
        </div>
      </article>

      <article className={`${styles.card} ${styles.cardCollab} reveal`}>
        <div className={styles.collabInner}>
          <h3 className={styles.heading}>
            and key collaborations<br />with a lot more!
          </h3>
          <p className={styles.text}>
            From top UK universities to global scholarship bodies, trusted banks, housing providers, and student
            support organisations — our wide network of collaborations ensures students thrive at every stage abroad.
          </p>
          <div className={styles.strip}>
            {collabs.map((name) => (
              <div key={name} className={styles.collabLogo}>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
