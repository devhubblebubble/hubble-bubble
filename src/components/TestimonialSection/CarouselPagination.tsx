import styles from './TestimonialSection.module.scss';

interface CarouselPaginationProps {
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
}

export function CarouselPagination({
  total,
  current,
  onDotClick,
}: CarouselPaginationProps) {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick?.(index)}
          className={`${styles.dot} ${index === current ? styles.active : ''}`}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current ? "true" : "false"}
        />
      ))}
    </div>
  );
}
