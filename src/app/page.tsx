import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import StatsSection from "@/components/StatsSection/Statssection";
import TestimonialSection from "@/components/TestimonialSection";
import StudentSuccessSection from "@/components/StudentSuccessSection";
import AppleWatchMenu from "@/components/AppleWatchMenu";
import JourneySection from "@/components/JourneySection";
import AdvancedCapabilitiesCard from "@/components/AdvancedCapabilitiesCard";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ImpactSection />
      <StatsSection />
      <TestimonialSection />
      <StudentSuccessSection />
      <JourneySection />
      {/* <AdvancedCapabilitiesCard /> */}
      <AppleWatchMenu />
    </main>
  );
}
