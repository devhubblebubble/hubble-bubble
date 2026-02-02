import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import StatsSection from "@/components/StatsSection/Statssection";
import TestimonialSection from "@/components/TestimonialSection";
import StudentSuccessSection from "@/components/StudentSuccessSection";
import AppleWatchMenu from "@/components/AppleWatchMenu";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ImpactSection />
      <StatsSection />
      <TestimonialSection />
      <StudentSuccessSection />
      <AppleWatchMenu />
      {/* Home page sections will be added here block by block */}
    </main>
  );
}
