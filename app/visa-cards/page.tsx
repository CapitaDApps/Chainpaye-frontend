import { Navbar } from "@/components/v2/navbar";
import { Footer } from "@/components/v2/footer";
import { VisaCard } from "@/components/v2/visa-card";
import { CardSelection } from "@/components/v2/visa-cards/card-selection";

export default function VisaCardsPage() {
  return (
    <div className="min-h-screen bg-[#EFEFF1] text-[#111528] transition-colors duration-300">
      <Navbar />
      <div className="pt-20">
        <VisaCard />
        <CardSelection />
      </div>
      <Footer />
    </div>
  );
}
