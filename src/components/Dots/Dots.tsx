import styles from "./Dots.module.scss";

interface DotsProps {
  count: number;
  idx: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
  noMargin?: boolean;
}

export default function Dots({ count, idx, onPrev, onNext, onDot, noMargin }: DotsProps) {
  return (
    <div className={styles.controls} style={noMargin ? { marginTop: 0 } : undefined}>
      <button className={styles.btn} onClick={onPrev} aria-label="Previous">
        <svg width="9" height="18" viewBox="0 0 9 18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7.5 1.5 1.5 9l6 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={styles.dots}>
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === idx ? styles.dotActive : ""}`}
            onClick={() => onDot(i)}
          />
        ))}
      </div>
      <button className={styles.btn} onClick={onNext} aria-label="Next">
        <svg width="9" height="18" viewBox="0 0 9 18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m1.5 1.5 6 7.5-6 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
