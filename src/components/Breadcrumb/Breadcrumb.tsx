import Link from "next/link";
import styles from "./Breadcrumb.module.scss";

type Props = {
  /** Current page label (after Home) */
  current: string;
  /**
   * Set when the parent already applies horizontal padding (e.g. Stories `.page`,
   * Privacy `.inner`) so we do not double `--pad-x`.
   */
  inset?: boolean;
  /** Slim bar (e.g. playground header): no large bottom margin */
  flush?: boolean;
};

export default function Breadcrumb({
  current,
  inset = false,
  flush = false,
}: Props) {
  const rootClass = [styles.root, inset && styles.rootInset, flush && styles.rootFlush]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <nav className={styles.nav} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadLink}>
          Home
        </Link>
        <span className={styles.breadSep} aria-hidden="true">
          ›
        </span>
        <span className={styles.breadCurrent}>{current}</span>
      </nav>
    </div>
  );
}
