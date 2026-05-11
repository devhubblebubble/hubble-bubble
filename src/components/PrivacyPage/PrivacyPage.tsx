import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./PrivacyPage.module.scss";

const sections = [
  {
    id: "who-we-are",
    title: "Who We Are",
    body: `Hubble Bubble is an educational consultancy based in Edinburgh, Scotland, UK. We help students discover their study destinations and navigate the university application process. Our registered address is 9 Sighthill Ct, Edinburgh, EH11 4BN, United Kingdom. You can contact us at hello@hubblebubble.uk.`,
  },
  {
    id: "what-we-collect",
    title: "What Information We Collect",
    body: `We collect information you give us directly — such as your name, email address, phone number, educational background, and study preferences — when you fill in our contact form, take the eligibility test, or book a call with us.\n\nWe may also collect anonymised usage data (such as pages visited and session duration) through analytics tools to help us improve our website. This data cannot be used to identify you personally.`,
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    body: `We use your personal information to:\n• Respond to your enquiries and provide the guidance you've asked for\n• Send you relevant information about our services (only if you've opted in)\n• Improve our website and service based on anonymised usage patterns\n• Comply with any legal obligations\n\nWe will never use your data for automated decision-making or profiling in a way that significantly affects you.`,
  },
  {
    id: "legal-basis",
    title: "Our Legal Basis for Processing",
    body: `We process your data on the following legal bases under UK GDPR:\n• Consent — when you submit a form or opt into communications\n• Legitimate interests — when we analyse anonymised site usage to improve our services\n• Contract — when you engage us for our services\n\nYou can withdraw your consent at any time by emailing hello@hubblebubble.uk.`,
  },
  {
    id: "sharing",
    title: "Who We Share Your Data With",
    body: `We do not sell, rent, or trade your personal information. We may share your data with trusted third-party service providers who help us operate our business (such as email platforms or analytics tools), but only to the extent necessary and under strict data processing agreements.\n\nAll third parties are required to keep your information secure and use it only for the purpose it was shared.`,
  },
  {
    id: "retention",
    title: "How Long We Keep Your Data",
    body: `We keep your personal data only for as long as necessary for the purposes described in this policy, or as required by law. If you are a client, we retain records for up to 7 years after your last interaction with us. If you submitted an enquiry but didn't become a client, we typically retain your data for up to 2 years.`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: `Under UK data protection law, you have the right to:\n• Access the personal data we hold about you\n• Correct any inaccurate data\n• Request deletion of your data ("right to be forgotten")\n• Object to or restrict how we process your data\n• Request portability of your data\n• Withdraw consent at any time\n\nTo exercise any of these rights, contact us at hello@hubblebubble.uk. We will respond within one calendar month.`,
  },
  {
    id: "cookies",
    title: "Cookies",
    body: `Our website uses cookies to improve your experience. Essential cookies are required for the site to function. We may also use analytics cookies to understand how visitors use our site — these are only set with your consent.\n\nYou can manage cookie preferences through your browser settings at any time.`,
  },
  {
    id: "security",
    title: "Security",
    body: `We take appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. However, no internet transmission is ever completely secure. We encourage you to use a secure connection when submitting personal information.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. When we do, we will revise the date at the top of this page. We encourage you to review this page periodically. Continued use of our services after changes are posted constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "Contact & Complaints",
    body: `If you have questions or concerns about how we handle your data, please contact us at hello@hubblebubble.uk.\n\nIf you believe we have not addressed your concern satisfactorily, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at ico.org.uk.`,
  },
];

export default function PrivacyPage() {
  const lastUpdated = "April 2025";

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Breadcrumb current="Privacy Policy" inset />

        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className={`${styles.header} reveal`}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: {lastUpdated}</p>
          <p className={styles.intro}>
            At Hubble Bubble, we take your privacy seriously. This policy
            explains what personal data we collect, why we collect it, how we
            use it, and your rights under UK data protection law.
          </p>
        </header>

        {/* ── Table of Contents ───────────────────────────────────────── */}
        <nav className={`${styles.toc} reveal`} aria-label="Table of contents">
          <p className={styles.tocLabel}>Contents</p>
          <ol className={styles.tocList}>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={styles.tocLink}>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Sections ────────────────────────────────────────────────── */}
        <div className={styles.sections}>
          {sections.map((s) => (
            <section key={s.id} id={s.id} className={`${styles.section} reveal`}>
              <h2 className={styles.sectionTitle}>{s.title}</h2>
              <div className={styles.sectionBody}>
                {s.body.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── Footer note ─────────────────────────────────────────────── */}
        <div className={`${styles.footNote} reveal`}>
          <p>
            Questions?{" "}
            <Link href="/contact" className={styles.footLink}>
              Get in touch
            </Link>{" "}
            — we&apos;re happy to help.
          </p>
        </div>
      </div>
    </div>
  );
}
