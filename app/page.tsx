import { Navbar } from "@/components/v2/navbar";
import { Hero } from "@/components/v2/hero";
import { WhatsappFeature } from "@/components/v2/whatsapp-feature";
import { CryptoCashout } from "@/components/v2/crypto-cashout";
import { VisaCard } from "@/components/v2/visa-card";
import { Steps } from "@/components/v2/steps";
import { Features } from "@/components/v2/features";
import { RealWorld } from "@/components/v2/real-world";
import { Footer } from "@/components/v2/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EFEFF1] text-[#111528] dark:bg-[#202024] dark:text-[#FFFFFF] transition-colors duration-300">
      <Navbar />
      <Hero />
      <WhatsappFeature />
      <CryptoCashout />
      <VisaCard />
      <Steps />
      <Features />
      <RealWorld />
      <Footer />
    </div>
  );
}
