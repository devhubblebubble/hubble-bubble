import { Suspense } from "react";
import NavBar from "@/components/NavBar/NavBar";
import ContactPage from "@/components/ContactPage/ContactPage";
import FooterSection from "@/components/FooterSection/FooterSection";

export const metadata = {
  title: "Contact Us | Hubble Bubble",
  description:
    "Get in touch with Hubble Bubble. Whether you're a student, a partner, or just curious — we'd love to hear from you.",
};

export default function ContactPageRoute() {
  return (
    <main>
      <NavBar />
      <Suspense fallback={null}>
        <ContactPage />
      </Suspense>
      <FooterSection />
    </main>
  );
}
