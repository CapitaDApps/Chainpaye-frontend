import { Navbar } from "@/components/v2/navbar";
import { Footer } from "@/components/v2/footer";
import { VisaCard } from "@/components/v2/visa-card";
import { ProductHero } from "@/components/products/product-hero";
import { ProductStablecoins } from "@/components/products/product-stablecoins";
import { ProductGetPaid } from "@/components/products/product-get-paid";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white text-[#111528] overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <ProductHero />
        <ProductStablecoins />
        <VisaCard />
        <ProductGetPaid />
      </div>
      <Footer />
    </div>
  );
}
