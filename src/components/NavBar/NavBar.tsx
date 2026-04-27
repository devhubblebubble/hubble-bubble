"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" aria-label="Hubble Bubble home">
          <Image
            src="/images/logos/logo.svg"
            alt="Hubble Bubble"
            width={119}
            height={64}
            className={styles.logo}
            priority
          />
        </Link>

        <button
          className={styles.toggle}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        </button>

        <div
          className={`${styles.links} ${mobileOpen ? styles.linksOpen : ""}`}
          onClick={() => setMobileOpen(false)}
        >
          <Link href="/services">Services</Link>
          <Link href="/about">About us</Link>
          <Link href="/blogs">More</Link>
          <Link href="/contact" className={styles.cta}>Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}
