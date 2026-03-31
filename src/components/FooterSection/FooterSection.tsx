import Image from "next/image";
import styles from "./FooterSection.module.scss";

const LINKS = ["Services", "Contact Us", "Blogs", "About Us", "Careers", "Collaborate"];

export default function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Image
            src="/images/logos/footer-hubblebubble.png"
            alt="Hubble Bubble"
            width={196}
            height={88}
            className={styles.logo}
          />
          <address className={styles.address}>
            9 Sighthill Ct,
            <br />
            Edinburgh
            <br />
            EH11 4BN, United Kingdom
          </address>
        </div>

        <nav className={styles.linksCol} aria-label="Footer links">
          {LINKS.map((link) => (
            <a key={link} href="#" className={styles.link}>
              {link}
            </a>
          ))}
        </nav>

        <div className={styles.contactCol}>
          <a href="tel:+444342343242" className={styles.contactLink}>
            +44 43423 43242
          </a>
          <a href="mailto:contact@hubblebubble.uk" className={styles.contactLink}>
            contact@hubblebubble.uk
          </a>
        </div>

        <div className={styles.storeCol}>
          <Image
            src="/images/logos/footer-hubblex.png"
            alt="HubbleX"
            width={170}
            height={58}
            className={styles.hubbleXLogo}
          />
          <a href="#" className={styles.storeBadge} aria-label="Get it on Google Play">
            <i className={styles.playIcon} />
            <div>
              <small>GET IT ON</small>
              <strong>Google Play</strong>
            </div>
          </a>
          <a href="#" className={styles.storeBadge} aria-label="Download on the App Store">
            <i className={styles.appleIcon}></i>
            <div>
              <small>Download on the</small>
              <strong>App Store</strong>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
