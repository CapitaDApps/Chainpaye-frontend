import { Navbar } from "@/components/v2/navbar";
import { Hero } from "@/components/v2/hero";
import { Partners } from "@/components/v2/partners";
import { WhatsappFeature } from "@/components/v2/whatsapp-feature";
import { CryptoCashout } from "@/components/v2/crypto-cashout";
import { Steps } from "@/components/v2/steps";
import { Features } from "@/components/v2/features";
import { RealWorld } from "@/components/v2/real-world";
import { FAQ } from "@/components/v2/faq";
import { Investors } from "@/components/v2/investors";
import { Footer } from "@/components/v2/footer";

export default function Home() {
  return (
    <div className="min-h-screen text-[#111528] transition-colors duration-300">
      <Navbar />
      <Hero />
      <Partners />
      <WhatsappFeature />
      <CryptoCashout />
      <Steps />
      <Features />
      <RealWorld />
      <FAQ />
      <Investors />
      <Footer />
    </div>
  );
}
