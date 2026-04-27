"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ServicesPage.module.scss";
import {
  addOnServiceCards,
  hubbleServiceCards,
  servicesPageAssets,
  servicesPageCopy,
} from "./servicesPage.data";

type TabId = "hubble" | "addon";

export default function ServicesPage() {
  const [tab, setTab] = useState<TabId>("hubble");
  const cards = tab === "hubble" ? hubbleServiceCards : addOnServiceCards;

  return (
    <div className={styles.page}>
      <div className={styles.heroBg} aria-hidden>
        <img
          src={servicesPageAssets.heroBg}
          alt=""
          className={styles.heroBgImage}
        />
        <div className={styles.heroBgOverlay} />
      </div>

      <div className={styles.headerShell}>
        <header className={styles.header}>
          <Link href="/" className={styles.logoLink}>
            <img src={servicesPageAssets.logo} alt="Hubble Bubble" />
          </Link>
          <nav className={styles.headerNav} aria-label="Main">
            <div className={styles.headerNavGroup}>
              <Link href="/services" className={styles.headerNavLink}>
                Services
              </Link>
              <Link href="/blogs" className={styles.headerNavLink}>
                Blogs
              </Link>
              <Link href="/about" className={styles.headerNavLink}>
                About us
              </Link>
            </div>
            <Link href="/contact" className={styles.headerNavCta}>
              Contact Us
            </Link>
          </nav>
        </header>
      </div>

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        {servicesPageCopy.breadcrumb.map((item, index) => (
          <span key={item.label} className={styles.breadcrumbSegment}>
            {index > 0 ? <span className={styles.breadcrumbSep}>{">"}</span> : null}
            {item.current ? (
              <span className={styles.breadcrumbCurrent} aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </span>
        ))}
      </nav>

      <section className={styles.hero} aria-labelledby="services-hero-title">
        <h1 id="services-hero-title">{servicesPageCopy.heroTitle}</h1>
        <p>{servicesPageCopy.heroSubtitle}</p>
      </section>

      <section className={styles.content} aria-label="Service listings">
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Service categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "hubble"}
            className={tab === "hubble" ? styles.tabActive : styles.tabInactive}
            onClick={() => setTab("hubble")}
          >
            {servicesPageCopy.tabs.primary}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "addon"}
            className={tab === "addon" ? styles.tabActive : styles.tabInactive}
            onClick={() => setTab("addon")}
          >
            {servicesPageCopy.tabs.secondary}
          </button>
        </div>

        <div className={styles.cardGrid} role="tabpanel">
          {cards.map((card) => (
            <article key={card.id} className={styles.card}>
              <div className={styles.cardBody}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
              <Link
                href="/contact"
                className={styles.cardAction}
                aria-label={`Learn more: ${card.title}`}
              >
                <span className={styles.cardChevron} aria-hidden>
                  ›
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerDivider}>
          <img src={servicesPageAssets.footerDivider} alt="" />
        </div>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <img src={servicesPageAssets.logo} alt="Hubble Bubble" />
            </div>
            <address>
              {servicesPageCopy.footerAddress.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          </div>
          <nav className={styles.footerLinks} aria-label="Footer">
            {servicesPageCopy.footerLinks.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.footerContact}>
            <a href={`tel:${servicesPageCopy.phone.replace(/\s/g, "")}`}>
              {servicesPageCopy.phone}
            </a>
            <a href={`mailto:${servicesPageCopy.email}`}>
              {servicesPageCopy.email}
            </a>
          </div>
          <div className={styles.footerApps}>
            <p className={styles.hubbleX}>hubbleX</p>
            <div className={styles.appBadges}>
              <img
                src={servicesPageAssets.socialGroup}
                alt="Get it on Google Play"
              />
              <img
                src={servicesPageAssets.appStoreBadge}
                alt="Download on the App Store"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
