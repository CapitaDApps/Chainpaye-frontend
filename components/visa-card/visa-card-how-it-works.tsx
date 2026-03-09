import Image from "next/image";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Fund your wallet",
    description:
      "Add USDT, USDC or any stablecoin to your Chainpaye wallet via WhatsApp.",
    image: "/assets/user.png",
  },
  {
    step: "02",
    title: "Request your Visa card",
    description:
      "Choose your card tier — Basic, Gold or Platinum — and we'll process your card.",
    image: "/assets/user2.png",
  },
  {
    step: "03",
    title: "Spend anywhere",
    description:
      "Use your physical or virtual card to shop online, in-store, or at ATMs in 80+ countries.",
    image: "/assets/Credit Card.png",
  },
];

export function VisaCardHowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-[#F8F9FB]">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block border border-[#D1D5DB] bg-white rounded-full px-4 py-1 text-sm font-medium text-gray-600 mb-4 shadow-sm">
            How it works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111528]">
            Get started in 3 simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] flex flex-col gap-6"
            >
              <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div>
                <span className="text-4xl font-black text-blue-100 leading-none">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-[#111528] mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-[#5A5F73] text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
