import { Navbar } from "@/components/v2/navbar";
import { Footer } from "@/components/v2/footer";
import { AboutHero } from "@/components/about/about-hero";
import { AboutAbout } from "@/components/about/about-about";
import { AboutTeam } from "@/components/about/about-team";
import { AboutRoadmap } from "@/components/about/about-roadmap";
import { AboutInvestors } from "@/components/about/about-investors";

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <Navbar variant="dark" />
      <AboutHero />
      <div className="bg-white">
        <AboutAbout />
        <AboutTeam />
        <AboutRoadmap />
        <AboutInvestors />
      </div>
      <Footer />
    </main>
  );
}
