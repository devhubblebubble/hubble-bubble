"use client";

import React from 'react';
import Globe from '../JourneySection/Globe/Globe';
import styles from './AdvancedCapabilitiesCard.module.scss';

const features = [
  "Advanced card acquiring, including incremental auth, multicapture, and more",
  "Local acquiring in global markets",
  "Access to regional debit networks",
  "Ability to pass product line-item data",
  "Support for multiprocessor setups",
];

const AdvancedCapabilitiesCard = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <header>
              <h2 className={styles.title}>Advanced payments capabilities</h2>
            </header>
            
            <div className={styles.body}>
              Use Stripe to easily customise your payments setup with more accessible, 
              enterprise-grade capabilities that can accelerate time to market, increase revenue, and reduce costs.
              <span className={styles.tooltipIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#E6EBF1" />
                  <path d="M10 13.13a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm0-9.07c2 0 3.44 1.31 3.44 3.44 0 1.26-.72 2.25-2 2.92a.93.93 0 0 0-.5.7v.13a.94.94 0 1 1-1.88 0c0-1.05.59-2 1.52-2.5.7-.36.98-.75.98-1.25 0-1.05-.56-1.56-1.56-1.56-.8 0-1.47.61-1.55 1.4l-.01.16a.94.94 0 0 1-1.88 0c0-1.9 1.54-3.44 3.44-3.44z" fill="#4F566B" />
                </svg>
              </span>
            </div>

            <ul className={styles.list}>
              {features.map((feature, index) => (
                <li key={index} className={styles.listItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.1" />
                    <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z" fill="currentColor" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
              <li className={styles.listItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.1" />
                  <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z" fill="currentColor" />
                </svg>
                <span>
                  Manage all lines of business or subsidiaries across multiple Stripe accounts with{' '}
                  <a href="#" className={styles.link}>Organisations</a>
                </span>
              </li>
            </ul>

            <a href="#" className={styles.cta}>
              Contact sales
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5h7M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className={styles.background}>
            <figure className={styles.globeFigure}>
              <div className={styles.globeContainer}>
                <Globe mode="day" autoRotate={true} className={styles.globe} />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedCapabilitiesCard;
