"use client";

import { Navbar } from "../../components/v2/navbar";
import { Footer } from "../../components/v2/footer";
import { BusinessHero } from "../../components/business/business-hero";
import { BusinessHowItWorks } from "../../components/business/business-how-it-works";
import { BusinessPlatforms } from "../../components/business/business-platforms";
import { BusinessApi } from "../../components/business/business-api";

export default function BusinessesPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-24 md:pt-32 pb-16">
        <BusinessHero />
        <BusinessHowItWorks />
        <BusinessPlatforms />
        <BusinessApi />
      </main>

      <Footer />
    </div>
  );
}
