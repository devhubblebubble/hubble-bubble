import NavBar from "@/components/NavBar/NavBar";
import StoriesPage from "@/components/StoriesPage/StoriesPage";
import FooterSection from "@/components/FooterSection/FooterSection";

export const metadata = {
  title: "Student Stories | Hubble Bubble",
  description:
    "Real students. Real journeys. Read how Hubble Bubble helped them find their path and land where they truly belong.",
};

export default function StoriesPageRoute() {
  return (
    <main>
      <NavBar />
      <StoriesPage />
      <FooterSection />
    </main>
  );
}
