import Image from 'next/image';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column - Content */}
          <div className={styles.content}>
            {/* Main Heading */}
            <div className={styles.headingWrapper}>
              <h1 className={styles.heading}>
                Fuel your
                <br />
                 <span className={styles.bold}>Passion</span>
                <br />
                with the <span className={styles.bold}>Perfect Course!</span>
              </h1>
              <p className={styles.subheading}>
                Let us help you make it a reality.
              </p>
            </div>

            {/* Accreditation Section */}
            <div className={styles.accreditation}>
              <p className={styles.accreditationLabel}>accredited by:</p>
              <div className={styles.logoGrid}>
                <div className={styles.logoCard}>
                  <Image
                    src="/images/herosection/accreditations/icef.png"
                    alt="IAS Accreditation"
                    width={55}
                    height={52}
                    className={styles.logo}
                  />
                </div>
                <div className={styles.logoCard}>
                  <Image
                    src="/images/herosection/accreditations/bc.png"
                    alt="British Council Accreditation"
                    width={84}
                    height={48}
                    className={styles.logo}
                  />
                </div>
                <div className={styles.logoCard}>
                  <Image
                    src="/images/herosection/accreditations/pier.png"
                    alt="PIER Accreditation"
                    width={153}
                    height={48}
                    className={styles.logo}
                  />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaGroup}>
              <button className={`${styles.button} ${styles.buttonOutline}`}>
                Talk to us
              </button>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                Take the eligibility Test
              </button>
            </div>
          </div>

          {/* Right Column - Astronaut Image */}
          <div className={styles.imageWrapper}>
            <Image
              src="/images/herosection/astronaut.png"
              alt="Astronaut floating in space"
              width={862}
              height={862}
              priority
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}