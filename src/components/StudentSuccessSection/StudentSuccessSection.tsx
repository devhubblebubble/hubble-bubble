"use strict";
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

import styles from './StudentSuccessSection.module.scss';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  degree: string;
  university: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "I walked in with plans to study engineering. Through conversations and career mapping, I realised game design was where I truly belonged. I can't thank the team enough for helping me see my potential clearly and guiding me every step of the way — from building my portfolio to writing my personal statement.",
    name: "Rhea Menon",
    degree: "BA (Hons) Game Design",
    university: "University of the Arts London",
    imageUrl: "/images/testimonial/student2.png"
  },
  {
    id: 2,
    quote: "Hubble Bubble didn't just help with applications — they helped me discover why I was applying. They saw the 'social' in my engineering background and helped me pivot towards social entrepreneurship.",
    name: "Priya Sinha",
    degree: "MSc Social Innovation and Entrepreneurship",
    university: "London School of Economics",
    imageUrl: "/images/testimonial/student3.png"
  },
  {
    id: 3,
    quote: "The personalized attention I received was incredible. Mapping out my career goals helped me realize my passion for sustainable architecture. The portfolio support was a game-changer for my admissions.",
    name: "Arjun Mehta",
    degree: "MArch Architecture",
    university: "Architectural Association School of Architecture",
    imageUrl: "/images/testimonial/student4.png"
  },
  {
    id: 4,
    quote: "I was confused between finance and data science. The team helped me find a niche in Fintech. Their guidance on university selection was spot on, and I'm now at my dream university.",
    name: "Ananya Rao",
    degree: "MSc Financial Technology",
    university: "Imperial College London",
    imageUrl: "/images/testimonial/student5.png"
  }
];

export default function StudentSuccessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = React.useRef<any>(null);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.innerContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            They Made It. So Can You.
          </h2>
          <p className={styles.subtitle}>
            Hear from our students who found their place in the world.
          </p>
        </div>

        {/* Main Content - Text Left, Cards Right */}
        <div className={styles.grid}>
          {/* Left side - Quote and Text */}
          <div className={styles.content}>
            {/* Quote marks */}
            <svg
              className={styles.quoteIcon}
              viewBox="0 0 97 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8557 33.5667C25.7607 33.5667 32.3333 35.6778 36.5738 39.9C40.8142 44.1222 42.9344 49.0833 42.9344 54.7833C42.9344 60.9056 40.8142 65.9722 36.5738 69.9833C32.5454 73.9945 27.4568 76 21.3082 76C15.5836 76 10.6011 74.2056 6.36066 70.6167C2.12022 66.8167 0 61.5389 0 54.7833C0 51.6167 0.636066 48.6611 1.9082 45.9167C3.18033 42.9611 4.45246 40.2167 5.72459 37.6833L25.7607 0H46.4328L27.0328 52.5667L16.8557 33.5667ZM67.4229 33.5667C76.3279 33.5667 82.7945 35.6778 86.8229 39.9C91.0634 44.1222 93.1836 49.0833 93.1836 54.7833C93.1836 60.9056 91.1694 65.9722 87.141 69.9833C83.1126 73.9945 78.024 76 71.8754 76C66.1508 76 61.1683 74.2056 56.9279 70.6167C52.6874 66.8167 50.5672 61.5389 50.5672 54.7833C50.5672 51.6167 51.0973 48.6611 52.1574 45.9167C53.4295 42.9611 54.8076 40.2167 56.2918 37.6833L76.3279 0H97L77.6 52.5667L67.4229 33.5667Z"
                fill="currentColor"
              />
            </svg>

            {/* Testimonial Content */}
            <div className={styles.testimonialContent}>
              <p className={styles.quoteText}>
                "{currentTestimonial.quote}"
              </p>

              <div className={styles.authorInfo}>
                <h3 className={styles.authorName}>
                  {currentTestimonial.name}
                </h3>
                <div className={styles.authorDetails}>
                  <p className={styles.authorDegree}>
                    {currentTestimonial.degree}
                  </p>
                  <p className={styles.authorUniversity}>
                    {currentTestimonial.university}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Stacked Cards with Swiper */}
          <div className={styles.cardsWrapper}>
            <div className={styles.cardsContainer}>
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, Pagination]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className={styles.mySwiper}
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className={styles.card}>
                    <Image
                      src={testimonial.imageUrl.replace('.png', '.webp')}
                      alt={testimonial.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className={styles.cardImage}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Custom Pagination or Swiper's Pagination can be used. 
            Keeping custom dots for finer control over styling. */}
        <div className={styles.pagination}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideTo(index);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
