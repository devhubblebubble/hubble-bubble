import Link from "next/link";
import styles from './TestimonialSection.module.scss';

interface TestimonialCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

export function TestimonialCard({
  image,
  imageAlt,
  title,
  description,
  linkText,
  linkUrl,
}: TestimonialCardProps) {
  return (
    <div className={styles.testimonialCard}>
      {/* Image Section */}
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={imageAlt}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        <div className={styles.headerGroup}>
          <h2 className={styles.title}>
            {title}
          </h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <p className={styles.description}>
          {description}
        </p>

        <Link
          href={linkUrl}
          className={styles.link}
        >
          {linkText}
          <svg 
            className={styles.arrowIcon} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14m-7-7 7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
