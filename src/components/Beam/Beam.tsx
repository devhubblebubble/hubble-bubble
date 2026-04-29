import styles from "./Beam.module.scss";

type BeamProps = {
  className?: string;
};

export default function Beam({ className }: BeamProps) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <div className={styles.line} />
    </div>
  );
}
