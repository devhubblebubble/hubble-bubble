import Image from "next/image";
import Link from "next/link";
import styles from "./FooterSection.module.scss";

export default function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Image src="/images/logos/logo.svg" alt="Hubble Bubble" width={158} height={94} />
          <p>9 Sighthill Ct,<br />Edinburgh<br />EH11 4BN, United Kingdom</p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <Link href="/services">Services</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/collaborate">Collaborate</Link>
        </nav>

        <div className={styles.contact}>
          <p><a href="tel:+444342343242">+44 43423 43242</a></p>
          <p><a href="mailto:contact@hubblebubble.uk">contact@hubblebubble.uk</a></p>
        </div>

        <div className={styles.app}>
          <div className={styles.twitterLockup}>
            <Image src="/images/logos/logo.svg" alt="" width={36} height={22} />
            <span>X</span>
          </div>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.5a3 3 0 0 0-2.1-2.13C19.5 4 12 4 12 4s-7.5 0-9.4.37A3 3 0 0 0 .5 6.5C.13 8.4.13 12 .13 12s0 3.6.37 5.5a3 3 0 0 0 2.1 2.13C4.5 20 12 20 12 20s7.5 0 9.4-.37a3 3 0 0 0 2.1-2.13c.37-1.9.37-5.5.37-5.5s0-3.6-.37-5.5zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
              </svg>
            </a>
          </div>
          <div className={styles.appBadge}>
            <span>HubbleX</span>
            <small>Coming soon on mobile</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
