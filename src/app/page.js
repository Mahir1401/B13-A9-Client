import Hero from "@/components/Hero";
import FeaturedPets from "@/components/FeaturedSection";
import WhyAdopt from "@/components/WhyAdopt";
import HowItWorks from "@/components/HowItWorks";
import SuccessStories from "@/components/SuccessStories";
import PetCareTips from "@/components/PetCareTips";
import Community from "@/components/Community";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Hero />
      <FeaturedPets />
      <WhyAdopt />
      <HowItWorks />
      <SuccessStories />
      <PetCareTips />
      <Community />
    </div>
  );
}