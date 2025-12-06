import FeatureSection from "@/components/featureSection/FeatureSection";
import HeroSection from "@/components/heroSection/HeroSection";
import ReadyWithMe from "@/components/readyWithMe/ReadyWithMe";
import TopCategory from "@/components/topCategory/TopCategory";
import WhyChoose from "@/components/whyChoose/WhyChoose";

export default function Home() {
  return (
    <>
      <div>
        <HeroSection />
        <WhyChoose/>
        <TopCategory/>
        <FeatureSection/>
        <ReadyWithMe/>
      </div>
    </>
  );
}
