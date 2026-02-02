import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoLink}>
          <img
            className={styles.logo}
            alt="Hubble Works Logo"
            src="/images/logos/logo.svg"
          />
        </Link>
        <div className={styles.navActions}>
          <nav className={styles.navMenu}>
            <Link href="/stories" className={styles.navLink}>Stories</Link>
            <Link href="/services" className={styles.navLink}>Services</Link>
            <Link href="/about" className={styles.navLink}>About us</Link>
            <Link href="/blogs" className={styles.navLink}>Blogs</Link>
          </nav>
          <div className={styles.ctaWrapper}>
            <button className={styles.ctaButton}>Talk to us</button>
          </div>
        </div>
      </div>
    </header>
  );
}