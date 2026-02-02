"use strict";
"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { TestimonialCard } from "./TestimonialCard";
import { CarouselPagination } from "./CarouselPagination";
import styles from './TestimonialSection.module.scss';

const testimonials = [
  {
    id: 1,
    image: "/images/testimonial/student1.png",
    imageAlt: "Nihal - Student Portrait",
    title: "Leaving Law Behind to Tell Stories That Matter.",
    description:
      "Nihal always believed law school was his only path — structured, safe, and expected. But during our sessions, his essays spoke louder than his plans. We helped him see what he couldn't: a gifted storyteller within. Today, he's studying literature and has already been published in two respected journals.",
    linkText: "Read Nihal's story and journey",
    linkUrl: "/story/nihal",
  },
  {
    id: 2,
    image: "/images/testimonial/student2.png",
    imageAlt: "Sarah - Student Portrait",
    title: "From Engineering to Sustainable Design.",
    description:
      "Sarah was a brilliant engineer who felt a pull towards environmental design. We helped her bridge the gap, showcasing her unique blend of technical skill and sustainable vision. She's now pursuing her Master's at a top-tier university in London.",
    linkText: "Read Sarah's story and journey",
    linkUrl: "/story/sarah",
  },
  {
    id: 3,
    image: "/images/testimonial/student3.png",
    imageAlt: "Leo - Student Portrait",
    title: "Finding the Right Path in Computer Science.",
    description:
      "Leo was overwhelmed by the choices in tech. Through our sessions, he discovered a passion for AI ethics. We helped him secure a place at an institution that values both his coding talent and his commitment to social responsibility.",
    linkText: "Read Leo's story and journey",
    linkUrl: "/story/leo",
  },
  {
    id: 4,
    image: "/images/testimonial/student4.png",
    imageAlt: "Maya - Student Portrait",
    title: "Advocating for Change through Public Policy.",
    description:
      "Maya wanted to make a difference but wasn't sure how. We explored various paths in public policy and advocacy. Today, she's working for an NGO focused on educational equity and has been recognized for her impactful research.",
    linkText: "Read Maya's story and journey",
    linkUrl: "/story/maya",
  },
  {
    id: 5,
    image: "/images/testimonial/student5.png",
    imageAlt: "Arjun - Student Portrait",
    title: "A New Vision for Architectural Heritage.",
    description:
      "Arjun wanted to preserve his heritage while building for the future. We helped him refine his portfolio to highlight his unique perspective on traditional architecture. He's now studying at a prestigious design school.",
    linkText: "Read Arjun's story and journey",
    linkUrl: "/story/arjun",
  },
  {
    id: 6,
    image: "/images/testimonial/student6.png",
    imageAlt: "Elena - Student Portrait",
    title: "The Art of Diplomacy and Global Relations.",
    description:
      "Elena had a flair for languages but struggled to find her niche. Our guidance helped her realize her potential in international relations. She's now interned at the UN and is pursuing her PhD in Diplomacy.",
    linkText: "Read Elena's story and journey",
    linkUrl: "/story/elena",
  }
];

export default function TestimonialSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const handleDotClick = (index: number) => {
    if (swiperRef.current) swiperRef.current.slideTo(index);
  };

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.wrapper}>
        {/* Navigation Arrows */}
        <button 
          className={`${styles.navButton} ${styles.prev}`} 
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.container}>
          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            allowTouchMove={true}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard
                  image={testimonial.image}
                  imageAlt={testimonial.imageAlt}
                  title={testimonial.title}
                  description={testimonial.description}
                  linkText={testimonial.linkText}
                  linkUrl={testimonial.linkUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button 
          className={`${styles.navButton} ${styles.next}`} 
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.paginationContainer}>
        <CarouselPagination
          total={testimonials.length}
          current={currentSlide}
          onDotClick={handleDotClick}
        />
      </div>
    </section>
  );
}
