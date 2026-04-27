import Link from "next/link";
import styles from "./OriginSection.module.scss";

export default function OriginSection() {
  return (
    <section className={`${styles.section} reveal`} id="more">
      <div className={styles.bg}>
        <video
          src="/Video/brown.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={styles.video}
        />
      </div>
      <div className={styles.content}>
        <h2>How It All Began</h2>
        <p className={styles.lead}>
          From one spark came a constellation - our very own<br />Big Bang Theory
        </p>
        <Link href="/about" className={styles.readNow}>
          Read now!
        </Link>
      </div>
    </section>
  );
}
