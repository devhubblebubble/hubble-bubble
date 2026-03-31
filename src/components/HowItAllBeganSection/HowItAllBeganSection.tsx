import styles from "./HowItAllBeganSection.module.scss";

export default function HowItAllBeganSection() {
  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.visualWrap}>
          <video
            className={styles.visual}
            src="/Video/brown.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Animated nebula visual"
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>
            How It All <span>Began</span>
          </h2>
          <p className={styles.description}>
            From one spark came a
            <br />
            constellation - our very own
            <br />
            <strong>Big Bang Theory</strong>
          </p>
          <button type="button" className={styles.cta}>
            Read the Big Bang Theory
          </button>
        </div>
      </div>
    </section>
  );
}
