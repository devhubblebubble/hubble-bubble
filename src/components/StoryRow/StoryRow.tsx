import Image from "next/image";
import Link from "next/link";
import styles from "./StoryRow.module.scss";

export interface StoryRowProps {
  img: string;
  headline: string;
  body: string;
  linkLabel: string;
  href: string;
}

export default function StoryRow({
  img,
  headline,
  body,
  linkLabel,
  href,
}: StoryRowProps) {
  return (
    <article className={`${styles.row} reveal`}>

      {/* ── Photo — border-radius: 32px 0 0 32px (Figma) ── */}
      <div className={styles.photoWrap}>
        <Image
          src={img}
          alt={headline}
          fill
          sizes="(max-width: 900px) 100vw, 52vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        <div className={styles.fade} />
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className={styles.content}>

        {/* Frame 186: heading + mint rule */}
        <div className={styles.headingBlock}>
          <h2 className={styles.headline}>{headline}</h2>
          <div className={styles.rule} />
        </div>

        {/* Frame 304: body text + link */}
        <div className={styles.bodyBlock}>
          <p className={styles.body}>{body}</p>
          <Link href={href} className={styles.link}>
            {linkLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
