import Image from 'next/image';
import styles from './ImpactSection.module.scss';

export default function ImpactSection() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Where Our Impact Reaches
        </h2>
        <p className={styles.subtitle}>
          Our platform has guided 1000+ students to secure admits in top-ranking universities known for global impact.
        </p>
        
      </div>

      {/* Main Card */}
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <div className={styles.scrollContainer}>
            {/* United Kingdom Section */}
            <div className={styles.ukSection}>
              <Image
                src="/images/impact/united-kingdom.png"
                alt="United Kingdom"
                width={132}
                height={221}
                className={styles.ukFlag}
              />
              <h3 className={styles.ukTitle}>
                United Kingdom
              </h3>
            </div>

            {/* Student Profiles - Horizontal Scroll */}
            <div className={styles.profilesContainer}>
              
              {/* Profile 1 - Sam Curran (74px profile) */}
              <div className={styles.profileType1}>
                <div className={styles.profileHeader}>
                  <Image
                    src="/images/impact/dp.png"
                    alt="Sam Curran"
                    width={74}
                    height={74}
                    className={styles.avatar74}
                  />
                  <div className={styles.profileInfo}>
                    <div className={styles.nameRow}>
                      <span className={styles.name}>Sam Curran</span>
                      <LinkedInIcon />
                    </div>
                    <p className={styles.course}>MSc. Artificial Intelligence in Games</p>
                  </div>
                </div>

                {/* Admits Section */}
                <div className={styles.admitsContainer}>
                  <p className={styles.admitsLabel}>Admits:</p>
                  <div className={styles.admitsGrid}>
                    <div className={styles.admitsRow}>
                      <Image src="/images/impact/cambridge.png" alt="Cambridge" width={144} height={30} className={styles.logoCambridge} />
                      <Image src="/images/impact/manchester.png" alt="Manchester" width={133} height={45} className={styles.logoManchester} />
                    </div>
                    <div className={styles.admitsRow}>
                      <Image src="/images/impact/cambridge.png" alt="Cambridge" width={144} height={30} className={styles.logoCambridge} />
                      <Image src="/images/impact/dundee.png" alt="Dundee" width={134} height={42} className={styles.logoDundee} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile 2, 3, 4 - Sam Curran (60px profile) */}
              {[1, 2, 3].map((item) => (
                <div key={item} className={styles.profileType2}>
                  <div className={styles.profileHeaderSmall}>
                    <Image
                      src="/images/impact/dp.png"
                      alt="Sam Curran"
                      width={60}
                      height={60}
                      className={styles.avatar60}
                    />
                    <div className={styles.nameRow}>
                      <span className={styles.name}>Sam Curran</span>
                      <LinkedInIcon />
                    </div>
                  </div>

                  <div className={styles.profileDetails}>
                    <p className={styles.course}>MSc. Artificial Intelligence in Games</p>
                    <div className={styles.admitsContainer}>
                      <p className={styles.admitsLabel}>Admits:</p>
                      <div className={styles.admitsGrid}>
                        <div className={styles.admitsRow}>
                          <Image src="/images/impact/cambridge.png" alt="Cambridge" width={144} height={30} className={styles.logoCambridge} />
                          <Image src="/images/impact/manchester.png" alt="Manchester" width={133} height={45} className={styles.logoManchester} />
                        </div>
                        <div className={styles.admitsRow}>
                          <Image src="/images/impact/cambridge.png" alt="Cambridge" width={144} height={30} className={styles.logoCambridge} />
                          <Image src="/images/impact/dundee.png" alt="Dundee" width={134} height={42} className={styles.logoDundee} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Profile 5 - Sam Curran (86px profile) */}
              <div className={styles.profileType3}>
                <div className={styles.profileHeaderLarge}>
                  <Image
                    src="/images/impact/dp.png"
                    alt="Sam Curran"
                    width={86}
                    height={86}
                    className={styles.avatar86}
                  />
                  <div className={styles.nameRow}>
                    <span className={styles.nameLarge}>Sam Curran</span>
                    <LinkedInIcon />
                  </div>
                </div>

                <div className={styles.largeAdmitContainer}>
                  <p className={styles.courseBold}>MSc. Artificial Intelligence in Games</p>
                  <Image src="/images/impact/cambridge.png" alt="University logo" width={202} height={42} className={styles.universityLogoLarge} />
                </div>
              </div>

               {/* Profile 6 - Ashely Thomas (86px profile) */}
               <div className={styles.profileType3}>
                <div className={styles.profileHeaderLarge}>
                  <Image
                    src="/images/impact/dp.png"
                    alt="Ashely Thomas"
                    width={86}
                    height={86}
                    className={styles.avatar86}
                  />
                  <div className={styles.nameRow}>
                    <span className={styles.nameLarge}>Ashely Thomas</span>
                    <LinkedInIcon />
                  </div>
                </div>

                <div className={styles.largeAdmitContainer}>
                  <p className={styles.courseBold}>MSc. Organic Chemistry</p>
                  <Image src="/images/impact/university.png" alt="University logo" width={189} height={60} className={styles.universityLogoLarge} />
                </div>
              </div>

               {/* Profile 7 - Sanjay Dutt (86px profile) */}
               <div className={styles.profileType3}>
                <div className={styles.profileHeaderLarge}>
                  <Image
                    src="/images/impact/dp.png"
                    alt="Sanjay Dutt"
                    width={86}
                    height={86}
                    className={styles.avatar86}
                  />
                  <div className={styles.nameRow}>
                    <span className={styles.nameLarge}>Sanjay Dutt</span>
                    <LinkedInIcon />
                  </div>
                </div>

                <div className={styles.largeAdmitContainer}>
                  <p className={styles.courseBold}>MSc. Artificial Intelligence in Games</p>
                  <Image src="/images/impact/manchester.png" alt="University logo" width={145} height={49} className={styles.universityLogoLarge} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.linkedinIcon}>
      <path d="M14.5 0.375H1.5C1.205 0.372 0.921 0.486 0.71 0.692C0.499 0.899 0.379 1.18 0.375 1.475V14.528C0.379 14.822 0.5 15.103 0.711 15.309C0.922 15.514 1.205 15.628 1.5 15.625H14.5C14.795 15.627 15.079 15.513 15.29 15.307C15.501 15.1 15.621 14.819 15.625 14.524V1.471C15.62 1.177 15.499 0.897 15.288 0.692C15.077 0.487 14.794 0.373 14.5 0.375Z" fill="#0076B2"/>
      <path d="M2.632 6.091H4.9V13.375H2.632V6.091ZM3.765 2.466C4.025 2.466 4.278 2.543 4.494 2.688C4.71 2.832 4.878 3.037 4.978 3.277C5.077 3.517 5.103 3.781 5.052 4.035C5.001 4.29 4.876 4.524 4.693 4.707C4.509 4.891 4.275 5.016 4.02 5.066C3.766 5.117 3.502 5.091 3.262 4.991C3.022 4.892 2.817 4.723 2.673 4.507C2.529 4.291 2.452 4.037 2.452 3.778C2.453 3.43 2.591 3.096 2.838 2.85C3.084 2.604 3.417 2.466 3.765 2.466ZM6.316 6.091H8.486V7.091H8.516C8.819 6.519 9.556 5.915 10.657 5.915C12.95 5.91 13.375 7.419 13.375 9.375V13.375H11.111V9.831C11.111 8.988 11.096 7.901 9.935 7.901C8.774 7.901 8.576 8.821 8.576 9.776V13.375H6.316V6.091Z" fill="white"/>
    </svg>
  );
}
